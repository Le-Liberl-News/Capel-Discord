const {test}=require('node:test'),assert=require('node:assert/strict');
const {createDungeonJumps}=require('./activityDungeonJumps');
test('a delayed surface jump confirmation uses the predicted start time instead of replaying the jump',()=>{
 let time=12000;const p={id:'p',x:0,y:0,z:0,hp:500},geometry={floor:()=>0,sweep:()=>null};
 const jumps=createDungeonJumps({grid:{},geometry,surfaceJumps:true,now:()=>time});
 const result=jumps.action(p,{id:'delayed',started:10000,direction:{dx:1,dz:0}});
 assert.equal(result.error,undefined);assert.equal(p.jump,null);assert.equal(p.lastLandedJump,'delayed');assert.ok(p.x>4);assert.equal(p.y,0);
 assert.equal(p.jumpReadyAt,11250);
 assert.equal(jumps.action(p,{id:'next',started:11250,direction:{dx:1,dz:0}}).error,undefined);
});
test('an ordinary arena jump retains its short start-time tolerance',()=>{
 const p={id:'p',x:1,y:0,z:1,hp:500};const jumps=createDungeonJumps({grid:{origin:{x:0,z:0},step:1,width:20,height:20,cells:Array(400).fill(0)},geometry:{floor:()=>0,sweep:()=>null},now:()=>12000});
 jumps.action(p,{id:'arena',started:10000,direction:{dx:0,dz:0}});assert.equal(p.jump.started,11750);
});
test('a reachable nearby predicted takeoff point prevents a shifted authoritative trajectory',()=>{
 const p={id:'p',x:1.5,y:0,z:0,hp:500};const jumps=createDungeonJumps({grid:{},geometry:{floor:()=>0,sweep:()=>null},surfaceJumps:true,now:()=>10000});
 jumps.action(p,{id:'origin',started:10000,origin:{x:0,y:0,z:0},direction:{dx:1,dz:0}});assert.equal(p.jump.origin.x,0);
});
test('a takeoff origin across an obstacle cannot reposition the player',()=>{
 const p={id:'p',x:1.5,y:0,z:0,hp:500};const jumps=createDungeonJumps({grid:{},geometry:{floor:()=>0,sweep:()=>({normal:{x:1,y:0,z:0},distance:0})},surfaceJumps:true,now:()=>10000});
 jumps.action(p,{id:'blocked-origin',origin:{x:0,y:0,z:0},direction:{dx:0,dz:0}});assert.equal(p.jump.origin.x,1.5);
});
