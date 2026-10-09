const test=require('node:test'),assert=require('node:assert/strict');
const flight=require('../activity/flight.cjs');
const {createActivityService}=require('../utils/activityService');
const {createActivityLobby}=require('../utils/activityLobby');
const {createActivityTerminal}=require('../utils/activityTerminal');
const {createTestCharacters,TEST_CHARACTER_EXPIRY}=require('../utils/activityTestCharacters');
const grid={origin:{x:0,z:0},step:1,width:10,height:10,cells:Array(100).fill(0),spawn:{x:2,y:0,z:2}};
test('test character choice expires at midnight Paris, affects only its owner and keeps daily assignment intact',async()=>{
 let time=TEST_CHARACTER_EXPIRY-1,originalCalls=0;const choices=createTestCharacters({characters:{Sieg:{},Renne:{}},now:()=>time});const original=async()=>{originalCalls++;return 'Estelle';};
 choices.set('one','Sieg');assert.equal(await choices.resolve('one',original),'Sieg');assert.equal(await choices.resolve('two',original),'Estelle');assert.equal(originalCalls,1);
 assert.throws(()=>choices.set('one','Not a character'),{status:400});assert.equal(choices.menu('one').selected,'Sieg');
 time=TEST_CHARACTER_EXPIRY;assert.equal(choices.menu('one'),null);assert.equal(await choices.resolve('one',original),'Estelle');assert.throws(()=>choices.set('one','Renne'),{status:403});
});
test('Capel choice requires authenticated proximity and updates the sprite immediately, with reset and expiry',async()=>{
 let time=0;const choices=createTestCharacters({characters:{Sieg:{},Renne:{}},now:()=>time,expires:10000});const resolver=id=>choices.resolve(id,async()=> 'Estelle');
 const lobby=createActivityLobby({grid,now:()=>time,resolveCharacter:resolver});const joined=await lobby.join({id:'one',channel:'room'});await lobby.state(joined.activity_token);
 const terminal=createActivityTerminal({lobby,testCharacters:choices,terminal:{position:grid.spawn},duels:{pending:()=>[]},assignedCharacters:async()=>['Estelle'],resolveCharacter:async()=> 'Estelle',now:()=>time});
 assert.ok((await terminal.menu(joined.activity_token)).testCharacters.characters.includes('Sieg'));
 await assert.rejects(()=>terminal.action('invalid',{request:'choice-000',action:'test_character',character:'Sieg'}));
 await terminal.action(joined.activity_token,{request:'choice-001',action:'test_character',character:'Sieg',user:'two'});
 let state=await lobby.state(joined.activity_token);assert.equal(state.character,'Sieg');assert.equal(state.characterChanged,true);assert.ok(state.position.y>0);
 time+=1000;state=await lobby.state(joined.activity_token,{x:2,y:2,z:2});assert.equal(state.position.y,2);
 await assert.rejects(()=>terminal.action(joined.activity_token,{request:'choice-002',action:'test_character',character:'Renne'}),{status:403});
 time+=1000;await lobby.state(joined.activity_token,{x:2,y:.4,z:2});await terminal.action(joined.activity_token,{request:'choice-003',action:'test_character',character:''});state=await lobby.state(joined.activity_token);assert.equal(state.character,'Estelle');assert.equal(state.position.y,0);
 choices.set('one','Sieg');lobby.refreshCharacter('one');await lobby.state(joined.activity_token);time=11000;lobby.refreshCharacter('one');state=await lobby.state(joined.activity_token);assert.equal(state.character,'Estelle');assert.equal(state.position.y,0);
});
test('Sieg accepts three-dimensional traces including vertical movement and retries, walkers cannot spoof flight',async()=>{
 let time=0;const g={...grid,cells:[...grid.cells]};g.cells[33]=null;
 const service=createActivityService({grid:g,now:()=>time,resolveCharacter:async id=>id==='bird'?'Sieg':'Estelle'});const bird=await service.join({id:'bird',channel:'room'}),human=await service.join({id:'human',channel:'room'});await service.state(bird.activity_token);await service.state(human.activity_token);
 time=1000;const point={x:3,y:1,z:3,trace:[{x:2,y:1,z:2,sequence:1},{x:3,y:1,z:3,sequence:2}]};let result=await service.state(bird.activity_token,point);assert.deepEqual(result.position,{x:3,y:1,z:3});assert.equal(result.movementSequence,2);
 const seen=await service.state(human.activity_token);assert.equal(seen.joueurs.find(p=>p.id==='bird').y,1);
 time+=1000;await service.state(bird.activity_token,{x:3,y:3,z:3,trace:[{x:3,y:3,z:3,sequence:3}]});await service.state(bird.activity_token,point);result=await service.state(bird.activity_token);assert.equal(result.position.y,3);
 time+=1000;const ground=await service.state(human.activity_token,{x:2,y:12,z:2,flying:true});assert.equal(ground.position.y,0);
});
test('flight validation bounds altitude and total 3D speed, and rejects missing or nonfinite trace height',async()=>{
 let time=0;const service=createActivityService({grid,now:()=>time,resolveCharacter:async()=> 'Sieg'}),bird=await service.join({id:'bird',channel:'room'});const initial=(await service.state(bird.activity_token)).position;
 time=100;for(const p of [{x:2,y:99,z:2},{x:2,y:4,z:2},{x:2,y:-2,z:2},{x:99,y:1,z:2}])assert.deepEqual((await service.state(bird.activity_token,p)).position,initial);
 await assert.rejects(()=>service.state(bird.activity_token,{x:2,z:2}),/Altitude/);
 await assert.rejects(()=>service.state(bird.activity_token,{x:2,y:1,z:2,trace:[{x:2,z:2,sequence:1}]}),/trace/);
});
test('local flight keeps normalized speed at all headings and frame rates, and respects walls and ceilings',()=>{
 const bounds=flight.flightBounds(grid),a={x:2,y:1,z:2},b={...a};for(let i=0;i<30;i++)flight.moveFlight(a,{x:1,y:1,z:1},1/30,bounds,null);for(let i=0;i<60;i++)flight.moveFlight(b,{x:1,y:1,z:1},1/60,bounds,null);assert.ok(Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z)<1e-8);assert.ok(Math.abs(Math.hypot(a.x-2,a.y-1,a.z-2)-4)<1e-8);
 const p={x:2,y:1,z:2},solid={sweep:()=>({distance:.05})};flight.moveFlight(p,{x:0,y:1,z:0},.1,bounds,solid);assert.ok(p.y<1.03);assert.equal(flight.clearFlight({x:2,y:1,z:2},{x:2,y:2,z:2},solid),false);
});
test('remote Sieg interpolation changes altitude smoothly even without horizontal displacement',()=>{
 const p={x:2,y:1,z:2};flight.approachFlight(p,{x:2,y:4,z:2},.1);assert.equal(p.y,1.6);for(let i=0;i<10;i++)flight.approachFlight(p,{x:2,y:4,z:2},.1);assert.equal(p.y,4);
});
test('vertical corrections apply only to flight, preserving stair acknowledgements',async()=>{
 const {needsCorrection}=await import('../activity/reconciliation.mjs');const current={x:2,y:5,z:2},accepted={x:2,y:1,z:2},sent={...current};assert.equal(needsCorrection(current,accepted,sent),false);assert.equal(needsCorrection(current,accepted,sent,true),true);assert.equal(needsCorrection(current,sent,sent,true),false);
});
test('flight glides along a ceiling instead of blocking its horizontal direction',()=>{
 const p={x:2,y:1,z:2},geometry={sweep:(from,to)=>to.y>from.y?{distance:.03,normal:{x:0,y:-1,z:0}}:null};
 flight.moveFlight(p,{x:1,y:1,z:0},.1,flight.flightBounds(grid),geometry);assert.equal(p.y,1);assert.ok(p.x>2.2);
});
test('real restaurant flight traces agree with server geometry and stay below ceilings',async()=>{
 const fs=require('node:fs'),path=require('node:path'),root=path.join(__dirname,'../activity/assets/sky'),g=require('../activity/assets/sky/navigation.json'),terminal=require('../activity/assets/sky/capel.json');
 const geometry=require('../utils/activityGeometry').createActivityGeometry(JSON.parse(fs.readFileSync(path.join(root,'anterose.gltf'))),[{...terminal,model:JSON.parse(fs.readFileSync(path.join(root,terminal.model)))}]);let time=0;
 const service=createActivityService({grid:g,geometry,now:()=>time,resolveCharacter:async()=> 'Sieg'}),bird=await service.join({id:'bird',channel:'room'});const p={...(await service.state(bird.activity_token)).position},bounds=flight.flightBounds(g);let sequence=0,trace=[];
 for(let i=1;i<=90;i++){flight.moveFlight(p,i<30?{x:0,y:1,z:0}:{x:1,y:.5,z:1},1/30,bounds,geometry,q=>trace.push({...q,sequence:++sequence}));time=i*1000/30;if(i%10===0){const state=await service.state(bird.activity_token,{...p,trace});assert.ok(Math.hypot(state.position.x-p.x,state.position.y-p.y,state.position.z-p.z)<.02,'server rejected local flight');trace=[];}}
 assert.ok(p.y>.5);assert.ok(Math.hypot(p.x-g.spawn.x,p.z-g.spawn.z)>.5);
});


test('Sieg turns toward a right camera drag and uses only native wingbeats in flight',()=>{
 assert.ok(flight.cameraTurn(60,true)>0);assert.ok(flight.cameraTurn(-60,true)<0);assert.ok(flight.cameraTurn(60,false)<0);
 assert.equal(flight.wingbeats(false,.08,0),false);assert.equal(flight.wingbeats(true,.08,0),true);
 assert.equal(flight.wingbeats(false,3,0),true);assert.equal(flight.wingbeats(false,3,null),true);
 const sieg=require('../activity/assets/sky/characters.json').Sieg;assert.deepEqual(sieg.idle,[0]);assert.deepEqual(sieg.run,[3,4]);assert.equal(sieg.fps,6);
});


test('Sieg perches on the actual restaurant furniture without falling through its top',()=>{
 const fs=require('node:fs'),geometry=require('../utils/activityGeometry').createActivityGeometry(JSON.parse(fs.readFileSync(require('node:path').join(__dirname,'../activity/assets/sky/anterose.gltf')))),g=require('../activity/assets/sky/navigation.json');
 for(const [x,z]of [[-6.5,-4.5],[4,-4.5],[2.2,11.4]]){const floor=geometry.floor(x,z,4),p={x,y:floor+.7,z};for(let i=0;i<40;i++)flight.moveFlight(p,{x:0,y:-1,z:0},1/30,flight.flightBounds(g),geometry);assert.ok(Math.abs(p.y-floor-.08)<.03);assert.equal(flight.wingbeats(false,p.y,geometry.floor(x,z,p.y+.1)),false);assert.ok(flight.clearFlight({x,y:floor+.25,z},p,geometry));}
});
