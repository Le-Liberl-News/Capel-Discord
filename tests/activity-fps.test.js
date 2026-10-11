const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityCombat}=require('../utils/activityCombat');
const {createActivityLobby}=require('../utils/activityLobby');
const {rayBody}=require('../activity/fps-combat.cjs');
const grid={origin:{x:-5,z:-5},step:.5,width:30,height:30,cells:Array(900).fill(0),spawn:{x:0,y:0,z:0}};
test('Josette craft uses AS 16 and resolves exactly two distinct shots, respecting dungeon allies',()=>{
 const {combatSpec,COMBAT}=require('../activity/native-combat.cjs');
 assert.equal(COMBAT.Josette.source.craftSlot,16);assert.ok(COMBAT.Josette.sequences.craft.every(f=>f.bank===12));
 assert.deepEqual(combatSpec('Josette','craft').hitOffsets,[0,150]);
 let time=0;const actor={id:'a',character:'Josette',x:0,y:0,z:0,hp:100},enemy={id:'e',enemy:true,character:'Joshua',x:0,y:0,z:4,hp:100},ally={id:'ally',character:'Ries',x:0,y:0,z:2,hp:100},room=new Map([['a',actor],['e',enemy],['ally',ally]]);
 const combat=createActivityCombat({grid,now:()=>time,dungeon:{},canDamage:(_a,b)=>!!b.enemy});
 assert.ok(combat.action(actor,{id:'dual',kind:'craft',ray:{origin:{x:0,y:.85,z:0},direction:{x:0,y:0,z:1}},aim:{x:0,y:.85,z:30}},room).error);
 assert.ok(combat.action(actor,{id:'dual',kind:'craft',ray:{origin:{x:0,y:1.45,z:0},direction:{x:0,y:-.15,z:Math.sqrt(1-.15**2)}},aim:{x:0,y:-3.05,z:29.66}},room).combatId);
 const impact=combat.snapshot().attacks[0].impactAt;
 time=impact-1;combat.tick(room);assert.equal(enemy.hp,100);
 time=impact;combat.tick(room);assert.equal(enemy.hp,82);
 time=impact+149;combat.tick(room);assert.equal(enemy.hp,82);
 time=impact+150;combat.tick(room);assert.equal(enemy.hp,64);assert.equal(enemy.damageEvents.length,2);assert.equal(ally.hp,100);
 time=impact+1000;combat.tick(room);assert.equal(enemy.hp,64);
});
test('Josette camera travels smoothly out and back; click replaces F but G remains craft',async()=>{
 const {craftViewBlend,gunPose,combatKeyAction}=await import('../activity/josette-view.mjs');
 assert.equal(craftViewBlend(0,1040),0);assert.equal(craftViewBlend(220,1040),1);assert.equal(craftViewBlend(1040,1040),0);
 assert.ok(craftViewBlend(110,1040)>.4&&craftViewBlend(110,1040)<.6);
 assert.ok(craftViewBlend(930,1040)>.4&&craftViewBlend(930,1040)<.6);
 assert.equal(combatKeyAction('KeyF','Josette'),null);assert.equal(combatKeyAction('KeyG','Josette'),'craft');assert.equal(combatKeyAction('KeyF','Ries'),'basic');
 assert.deepEqual(gunPose(null),{frame:0,recoil:0});assert.equal(gunPose(30).frame,1);assert.equal(gunPose(90).frame,2);assert.equal(gunPose(200).recoil,0);
});
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


test('Double tir locks the aimed enemy and recalculates each release after movement, without shooting through walls',()=>{
 let time=0,wall=false;const actor={id:'a',character:'Josette',x:0,y:0,z:0,hp:100},enemy={id:'b',character:'Joshua',x:0,y:0,z:4,hp:100};const room=new Map([['a',actor],['b',enemy]]);
 const combat=createActivityCombat({grid,now:()=>time,geometry:{floor:()=>0,sweep:(from,to)=>wall?{point:{x:(from.x+to.x)/2,y:1,z:2}}:null}});
 combat.action(actor,{id:'locked',kind:'craft',ray:{origin:{x:0,y:1.45,z:0},direction:{x:0,y:-.15,z:Math.sqrt(1-.15**2)}}},room);
 const attack=combat.snapshot().attacks[0];assert.equal(attack.target,'b');
 enemy.x=2;time=630;combat.tick(room);const first=combat.snapshot().attacks[0].shots[0];assert.ok(first.aim.x>1.5);
 time=first.impactAt+1;combat.tick(room);assert.equal(enemy.hp,82);assert.ok(enemy.damageEvents[0].point.x>1.5);
 enemy.x=-2;wall=true;time=780;combat.tick(room);const second=combat.snapshot().attacks[0].shots[1];assert.equal(second.blocked,true);time=second.impactAt+1;combat.tick(room);assert.equal(enemy.hp,82);
});

test('FPS obstacle contact carries an impact, but a nearer body replaces it',()=>{
 const wall={sweep:from=>({point:{x:0,y:from.y,z:2}})};
 const stopped=shoot(.8,{geometry:wall});const a=stopped.combat.snapshot().attacks[0];assert.equal(a.obstacleImpact,true);assert.equal(a.aim.z,2);
 const behind={sweep:from=>({point:{x:0,y:from.y,z:8}})};assert.equal(shoot(1.45,{geometry:behind}).combat.snapshot().attacks[0].obstacleImpact,false);
});

test('native gun spark advances through its complete assembly and disappears after the shot',async()=>{
 const {muzzleFrame}=await import('../activity/josette-view.mjs');assert.equal(muzzleFrame(null),null);assert.equal(muzzleFrame(-1),null);assert.equal(muzzleFrame(0),0);assert.equal(muzzleFrame(219),89);assert.equal(muzzleFrame(220),null);
});
