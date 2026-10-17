const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityCombat}=require('../utils/activityCombat');
const {reflecting}=require('../activity/projectile-reflection.cjs');
const grid={origin:{x:-10,z:-10},width:25,height:25,step:1,cells:Array(625).fill(0)};
test('an airborne Bleublanc reflects a gunshot back with a travelling return shot',()=>{
 let time=0;const bleu={id:'b',character:'Bleublanc',hp:500,x:0,y:0,z:4},gun={id:'g',character:'Josette',hp:500,x:0,y:0,z:0},room=new Map([['b',bleu],['g',gun]]),combat=createActivityCombat({grid,now:()=>time});
 assert.ok(combat.action(bleu,{id:'dive',kind:'craft',aim:{x:0,y:0,z:0}},room).combatId);time=500;combat.tick(room);assert.equal(bleu.y,4);
 const dy=bleu.y+.85-1.45,length=Math.hypot(dy,4),ray={origin:{x:0,y:1.45,z:0},direction:{x:0,y:dy/length,z:4/length}};
 assert.ok(combat.action(gun,{id:'shot',kind:'basic',ray},room).combatId);time=combat.snapshot().attacks.find(a=>a.id==='shot').impactAt;combat.tick(room);assert.equal(bleu.hp,500);
 const reflected=combat.snapshot().attacks.find(a=>a.reflectedProjectile);assert.ok(reflected);assert.equal(reflected.actor,'b');assert.equal(gun.hp,500);time=reflected.impactAt;combat.tick(room);assert.ok(gun.hp<500);
 time=2500;combat.tick(room);assert.equal(reflecting(bleu,time),false);
});
test('reflection requires the active aerial craft and expires exactly at landing',()=>{const p={character:'Bleublanc',hp:500,combatDash:'a',projectileReflection:{id:'a',from:1,until:2500}};assert.ok(!reflecting(p,0));assert.ok(reflecting(p,1000));assert.ok(!reflecting(p,2500));p.combatDash=null;assert.ok(!reflecting(p,1000));});
test('monster fire physically reverses toward its source',()=>{let time=0;const {createDungeonFire}=require('../utils/activityDungeonFire'),fire=createDungeonFire({now:()=>time});const bleu={id:'b',character:'Bleublanc',hp:500,x:0,y:0,z:2,combatDash:'a',projectileReflection:{id:'a',from:1,until:2500}},source={id:'s',character:'MishyArdent',enemy:true,hp:100,x:0,y:0,z:0},room=new Map([['b',bleu],['s',source]]);fire.launch({x:0,y:.7,z:0},{x:0,y:0,z:1},{speed:7,damage:12,source:'s'});time=250;fire.tick(room);assert.equal(bleu.hp,500);const shot=fire.snapshot()[0];assert.equal(shot.source,'b');assert.ok(shot.vz<0);time=500;fire.tick(room);assert.equal(source.hp,88);});
