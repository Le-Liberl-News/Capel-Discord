const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityCombat}=require('../utils/activityCombat');
const {createActivityLobby}=require('../utils/activityLobby');
const {rayBody}=require('../activity/fps-combat.cjs');
const grid={origin:{x:-5,z:-5},step:.5,width:30,height:30,cells:Array(900).fill(0),spawn:{x:0,y:0,z:0}};
function shoot(height,{geometry,miss=false,guard=false}={}){
 let time=0;const actor={id:'a',character:'Josette',x:0,y:0,z:0,hp:100},target={id:'b',character:'Joshua',x:0,y:0,z:4,hp:100,...(guard?{guard:{until:1000}}:{})},room=new Map([['a',actor],['b',target]]);
 const combat=createActivityCombat({grid,geometry,now:()=>time}),origin={x:0,y:1.45,z:0},dz=miss?4:0,dy=height-1.45,len=Math.hypot(dz,dy,4),direction={x:dz/len,y:dy/len,z:4/len};
 const result=combat.action(actor,{id:'shot',kind:'basic',ray:{origin,direction},aim:{x:direction.x*30,y:origin.y+direction.y*30,z:direction.z*30}},room);time=1000;combat.tick(room);return {actor,target,combat,result};
}
test('FPS validates the ray, applies double headshot damage and records the exact impact point',()=>{
 const head=shoot(1.5),body=shoot(.8);assert.ok(head.result.combatId);assert.equal(head.target.hp,72);assert.equal(body.target.hp,86);assert.equal(head.target.damageEvents[0].headshot,true);assert.ok(head.target.damageEvents[0].point.y>1.28);assert.equal(head.target.damageEvents[0].point.z,4-require('../activity/assets/sky/combat/hit-volumes.json').Joshua.radius);
 const combat=createActivityCombat({grid}),actor={id:'a',character:'Josette',x:0,y:0,z:0,hp:100};assert.ok(combat.action(actor,{id:'fake',kind:'basic',ray:{origin:{x:4,y:1.45,z:0},direction:{x:0,y:0,z:1}},aim:{x:0,y:1,z:4}},new Map()).error);
});
test('FPS misses, scenery and guards prevent damage; vertical rays remain valid',()=>{
 assert.equal(shoot(.8,{miss:true}).target.hp,100);assert.equal(shoot(.8,{guard:true}).target.hp,100);
 const geometry={sweep:from=>({point:{x:0,y:from.y,z:2},distance:2})};assert.equal(shoot(.8,{geometry}).target.hp,100);
 assert.equal(rayBody({x:0,y:4,z:0},{x:0,y:-1,z:0},{x:0,y:0,z:0,character:'Joshua'}).headshot,true);
});
test('Sturm passes an actual tower enemy through anonymous lobby targeting and interrupts its attack',async()=>{
 let time=1000;const lobby=createActivityLobby({grid,tower:[{grid,layout:{start:grid.spawn,exit:{x:7,y:0,z:7}},enemySpawns:[{x:1.4,y:0,z:0}]}],now:()=>time,resolveCharacter:async()=> 'Kloe'});lobby.enterTower('private');const session=await lobby.join({id:'private',channel:'dm'});let state=await lobby.state(session.activity_token);const enemy=state.enemies[0];assert.ok(enemy.attack);
 state=await lobby.state(session.activity_token,{...state.position,action:{id:'sturm',type:'attack',kind:'craft',target:enemy.id,aim:{x:enemy.x,y:enemy.y,z:enemy.z}}});assert.equal(state.actionResult.error,undefined);
 time+=400;state=await lobby.state(session.activity_token);assert.equal(state.enemies[0].hp,65);assert.equal(state.enemies[0].attack,null);assert.ok(state.enemies[0].stunUntil>time);
});
