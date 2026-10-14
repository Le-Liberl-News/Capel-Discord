const test=require('node:test'),assert=require('node:assert/strict');
const {pickupCandidate}=require('../activity/pom-input.cjs');
const p={x:0,y:0,z:0,hp:500},pom={id:'world:pom:0',x:.3,y:.25,z:0,mode:'rest',owner:null};
test('walking onto a resting Pom selects it, while nearby, airborne and carried Poms are not picked up',()=>{
 assert.equal(pickupCandidate([pom],p,'a'),pom);
 for(const override of [{x:1},{y:3},{mode:'flight'},{mode:'held',owner:'b'}])assert.equal(pickupCandidate([{...pom,...override}],p,'a'),null);
 assert.equal(pickupCandidate([pom,{...pom,mode:'held',owner:'a'}],p,'a'),null);
 for(const override of [{hp:0},{dead:true},{spectator:true},{duelProtected:true}])assert.equal(pickupCandidate([pom],{...p,...override},'a'),null);
});
test('the closest eligible Pom is picked once and uses the existing atomic server pickup',()=>{
 const {createActivityWorld}=require('../utils/activityWorld'),grid={origin:{x:-5,z:-5},width:11,height:11,step:1,cells:Array(121).fill(0),spawn:{x:0,y:0,z:0}},world=createActivityWorld({grid,ballSpawns:[pom,{...pom,x:.5}],now:()=>1000}),a={...p,id:'a'},b={...p,id:'b'},players=new Map([['a',a],['b',b]]);
 const candidate=pickupCandidate(world.snapshot().poms,a,'a');assert.equal(candidate.id,'world:pom:0');
 assert.deepEqual(world.action(a,{type:'pickup',target:candidate.id},players),{});
 assert.ok(world.action(b,{type:'pickup',target:candidate.id},players).error);
 assert.equal(pickupCandidate(world.snapshot().poms,a,'a'),null);
 assert.deepEqual(world.action(a,{type:'throw',aim:{x:4,y:.7,z:0}},players),{});assert.equal(world.snapshot().poms[0].mode,'flight');
});

test('a click or tap carrying a Pom takes priority over FPS firing and movement',()=>{
 const source=require('fs').readFileSync('activity/sky-scene.mjs','utf8'),body=source.match(/function click\(event\) \{([\s\S]*?)\n  \}/)[1],calls=[];
 const click=new Function('event','menu','environment','localId','interaction','fpsActive',body);
 click({button:0,clientX:12,clientY:15},{},{poms:[{owner:'a'}]},'a',(event,throwOnly)=>calls.push({event,throwOnly}),()=>{throw Error('must not fire the gun');});
 assert.equal(calls.length,1);assert.equal(calls[0].throwOnly,true);assert.equal(calls[0].event.clientX,12);
});
