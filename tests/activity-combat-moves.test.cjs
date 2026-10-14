const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityCombat}=require('../utils/activityCombat');
const {combatSpec}=require('../activity/native-combat.cjs');
const moves=require('../activity/combat-moves.cjs');
const grid={origin:{x:-10,z:-10},step:.25,width:81,height:81,cells:Array(81*81).fill(0)};
const fighter=(id,character,x,z=0)=>({id,character,x,y:0,z,hp:500,maxHp:500,heading:{dx:1,dz:0}});
function arena(...fighters){let time=1000;const room=new Map(fighters.map(f=>[f.id,f])),combat=createActivityCombat({grid,now:()=>time});return {room,combat,at:t=>{time=t;},step(ms){const end=time+ms;while(time<end){time=Math.min(end,time+20);combat.tick(room);}},time:()=>time};}

test('the art key dodges for everyone except Kloe, who keeps her healing art',()=>{
 for(const name of ['Joshua','Estelle','Walter','Renne','Nial'])assert.equal(combatSpec(name,'art')?.dodge,true,name);
 assert.equal(combatSpec('Kloe','art').effect,'heal');
});

test('a dodge dashes about four metres along the movement direction, then waits seven seconds',()=>{
 const a=fighter('a','Joshua',0),{room,combat,step}=arena(a);
 assert.ok(combat.action(a,{id:'d1',type:'attack',kind:'art',direction:{x:0,z:1}},room).combatId);
 step(moves.DODGE.dashDuration+40);
 assert.ok(Math.abs(a.x)<.01&&a.z>3.5,`landed at ${a.x},${a.z}`);
 assert.match(combat.action(a,{id:'d2',type:'attack',kind:'art',direction:{x:1,z:0}},room).error,/récupération/);
 step(moves.DODGE.cooldown);assert.ok(combat.action(a,{id:'d3',type:'attack',kind:'art',direction:{x:1,z:0}},room).combatId);
});

test('a dodge stops at the edge of the walkable area and is refused during a craft',()=>{
 const a=fighter('a','Joshua',9),{room,combat,step}=arena(a);
 combat.action(a,{id:'edge',type:'attack',kind:'art',direction:{x:1,z:0}},room);step(400);assert.ok(a.x<=10.01&&a.x>9.4,`x ${a.x}`);
 const b=fighter('b','Walter',0),c=fighter('c','Joshua',3),{room:r2,combat:c2}=arena(b,c);
 assert.ok(c2.action(b,{id:'craft',type:'attack',kind:'craft',aim:{x:3,y:0,z:0}},r2).combatId);
 assert.match(c2.action(b,{id:'dodge',type:'attack',kind:'art',direction:{x:-1,z:0}},r2).error,/craft/);
});

test('a parry timed on the impact blocks the craft and counters its caster, pushing them back',()=>{
 const a=fighter('a','Walter',0),b=fighter('b','Joshua',2),{room,combat,step}=arena(a,b);
 const spec=combatSpec('Walter','craft');
 combat.action(a,{id:'kick',type:'attack',kind:'craft',aim:{x:2,y:0,z:0}},room);
 step(spec.windup-100);assert.ok(combat.parry(b,room).parry);
 step(400);
 assert.equal(b.hp,500,'the craft is blocked');
 assert.equal(a.hp,500-moves.PARRY.counterDamage);
 assert.ok(a.damageEvents.at(-1).parry&&a.damageEvents.at(-1).nativeEffect===moves.PARRY.effect);
 assert.ok(a.x<-1.5,`pushed back to ${a.x}`);
 const kick=combat.snapshot().attacks.find(x=>x.id==='kick');assert.ok(kick.cancelled&&kick.hits.some(h=>h.parried&&h.id==='b'));
});

test('a parry pressed too early fails, and the key cannot be spammed through the impact',()=>{
 const a=fighter('a','Walter',0),b=fighter('b','Joshua',2),{room,combat,step}=arena(a,b);
 assert.ok(combat.parry(b,room).parry);step(moves.PARRY.window+50);
 combat.action(a,{id:'kick',type:'attack',kind:'craft',aim:{x:2,y:0,z:0}},room);
 step(200);assert.match(combat.parry(b,room).error,/récupération/);
 step(700);assert.ok(b.hp<500,'the craft lands');assert.equal(a.hp,500);
});

test('basic attacks build a combo that speeds them up, and a miss resets it with its own effect',()=>{
 const a=fighter('a','Estelle',0),b=fighter('b','Joshua',1.5),{room,combat,step,time}=arena(a,b);
 const normal=combatSpec('Estelle','basic');
 for(let n=1;n<=3;n++){
  assert.ok(combat.action(a,{id:'hit'+n,type:'attack',kind:'basic',aim:{x:1.5,y:0,z:0}},room).combatId);
  const attack=combat.snapshot().attacks.find(x=>x.id==='hit'+n);
  assert.equal(attack.tempo??1,moves.comboFactor(n-1));
  step(Math.max(normal.cooldown,normal.duration)+20);
  assert.equal(moves.comboOf(a,time()),n);
  assert.equal(b.damageEvents.at(-1).combo,n);assert.equal(b.damageEvents.at(-1).nativeEffect,moves.COMBO.hitEffect);
 }
 assert.ok(moves.comboFactor(3)<1);
 combat.action(a,{id:'miss',type:'attack',kind:'basic',aim:{x:-1.5,y:0,z:0}},room);step(normal.duration+20);
 assert.equal(moves.comboOf(a,time()),0);assert.ok(combat.snapshot().attacks.find(x=>x.id==='miss').missed);
});
