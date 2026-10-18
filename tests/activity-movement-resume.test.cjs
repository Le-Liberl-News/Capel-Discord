const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{createActivityService}=require('../utils/activityService');
function client(sequence=0,trace=[]){
 const source=fs.readFileSync('activity/sky-scene.mjs','utf8'),body=source.match(/acknowledgeMovement\(sequence\) \{([\s\S]*?)\n    \},/)[1];
 return new Function('movementSequence','movementTrace','return {acknowledgeMovement(sequence){'+body+'},move(p){const sample={...p,sequence:++movementSequence};movementTrace.push(sample);return {...p,sequence:movementSequence,trace:[...movementTrace]};},state(){return {sequence:movementSequence,trace:movementTrace};}}')(sequence,trace);
}
test('returning to Capel resumes above the server sequence and the very first new movement is accepted',async()=>{
 let time=1000;const grid={origin:{x:0,z:0},step:.25,width:41,height:41,cells:Array(1681).fill(0),spawn:{x:2,y:0,z:2}},service=createActivityService({grid,now:()=>time,resolveCharacter:async()=>'Estelle',residents:{npcs:[],disablePoms:true}}),joined=await service.join({id:'walker',channel:'capel'});
 await service.state(joined.activity_token);time+=1000;
 let state=await service.state(joined.activity_token,{x:2.25,z:2,trace:[{x:2.25,z:2,sequence:45}]});assert.equal(state.movementSequence,45);
 // Scene reconstruction resets the local counter, while the session survives the trip.
 const resumed=client();resumed.acknowledgeMovement(state.movementSequence);const point=resumed.move({x:2.5,y:0,z:2});assert.equal(point.sequence,46);
 time+=200;state=await service.state(joined.activity_token,point);assert.equal(state.position.x,2.5);assert.equal(state.movementSequence,46);
});
test('late acknowledgements preserve newer pending movement and never rewind the counter',()=>{
 const resumed=client(50,[{sequence:48},{sequence:49},{sequence:50}]);resumed.acknowledgeMovement(49);assert.deepEqual(resumed.state(),{sequence:50,trace:[{sequence:50}]});resumed.acknowledgeMovement(45);assert.equal(resumed.move({x:1,z:1}).sequence,51);
 for(const invalid of [undefined,null,-1,NaN,Infinity,1.5])resumed.acknowledgeMovement(invalid);assert.equal(resumed.state().sequence,51);
 resumed.acknowledgeMovement(97);assert.deepEqual(resumed.state(),{sequence:97,trace:[]});assert.equal(resumed.move({x:2,z:1}).sequence,98);
});
