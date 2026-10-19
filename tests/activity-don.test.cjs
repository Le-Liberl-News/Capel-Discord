const test=require('node:test'),assert=require('node:assert/strict');
const cannon=require('../activity/don-cannon.cjs'),{createActivityCombat}=require('../utils/activityCombat');
const grid={origin:{x:-50,z:-50},step:1,width:101,height:101,cells:Array(10201).fill(0)};
function fixture(geometry=null){let time=1000;const actor={id:'don',character:'Don',x:0,y:0,z:0,hp:500,team:'blue',heading:{dx:0,dz:1}},enemy={id:'enemy',character:'Estelle',x:0,y:0,z:9,hp:500,team:'red'},ally={id:'ally',character:'Joshua',x:.8,y:0,z:9,hp:500,team:'blue'},room=new Map([actor,enemy,ally].map(a=>[a.id,a])),combat=createActivityCombat({grid,geometry,now:()=>time,canDamage:(a,b)=>a.team!==b.team});return {actor,enemy,ally,room,combat,send(kind='basic',ray){const origin={x:actor.x,y:actor.y+1.45,z:actor.z};return combat.action(actor,{id:kind,kind,ray:ray??{origin,direction:cannon.aimDirection(origin,{x:enemy.x,y:enemy.y+.85,z:enemy.z})}},room);},tick(age){time=1000+age;combat.tick(room);},event(){return combat.snapshot().attacks[0];}};}
test('Don validates the FPS ray and launches a real arc, recoils physically and explodes only on arrival',()=>{
 const bad=fixture();assert.match(bad.send('basic',{origin:{x:20,y:1.45,z:0},direction:{x:0,y:0,z:1}}).error,/Visée/);assert.equal(bad.combat.snapshot().attacks.length,0);
 const f=fixture();assert.ok(f.send().combatId);f.tick(139);assert.equal(f.event().projectile,undefined);assert.equal(f.enemy.hp,500);f.tick(150);assert.ok(f.event().projectile);assert.ok(f.actor.knockback);f.tick(380);assert.ok(f.actor.z<-.5);
 for(let age=400;age<1500&&!f.event().resolved;age+=20)f.tick(age);assert.equal(f.enemy.hp,468);assert.equal(f.ally.hp,500);assert.ok(f.event().explodedAt);const hp=f.enemy.hp;f.tick(1900);assert.equal(f.enemy.hp,hp);
});
test('cannon ball hits walls and its explosion cannot damage through them',()=>{
 const geometry={floor:()=>0,sweep:(a,b)=>a.z<=4&&b.z>4?{point:{x:0,y:a.y+(b.y-a.y)*(4-a.z)/(b.z-a.z),z:4}}:null},f=fixture(geometry);f.enemy.z=6;f.ally.z=6;f.send();for(let t=0;t<1300;t+=20)f.tick(t);assert.ok(f.event().explodedAt);assert.ok(f.event().explosionPoint.z<=4);assert.equal(f.enemy.hp,500);
});
test('Don leaps, slams with an AoE stun only on damaged enemies, and lands after interruption',()=>{
 const f=fixture();f.enemy.z=2;f.ally.z=2;f.send('craft');f.tick(550);assert.ok(f.actor.y>1);assert.equal(f.enemy.hp,500);f.tick(900);assert.equal(f.actor.y,0);assert.equal(f.enemy.hp,452);assert.ok(f.enemy.stunUntil>=4300);assert.equal(f.ally.stunUntil,undefined);f.tick(1400);assert.ok(f.event().dashFinished);
 const g=fixture();g.enemy.z=2;g.send('craft');g.tick(550);g.actor.stunUntil=9000;g.tick(600);assert.equal(g.actor.y,0);assert.ok(g.event().cancelled);g.tick(1000);assert.equal(g.enemy.hp,500);
});
test('a parry stops the cannon slam without stunning the defender',()=>{const f=fixture();f.enemy.z=2;f.send('craft');f.enemy.parry={at:1900};f.tick(900);assert.equal(f.enemy.hp,500);assert.equal(f.enemy.stunUntil,undefined);assert.ok(f.event().cancelled);});
test('shared ballistic aiming solves the low arc, and Don has a strong single camera kick',async()=>{
 const o={x:0,y:1.45,z:0},end={x:0,y:.9,z:10},d=cannon.aimDirection(o,end),p=cannon.launch(o,d);assert.ok(Math.abs(Math.hypot(d.x,d.y,d.z)-1)<1e-6);const t=(end.z-p.origin.z)/p.velocity.z*1000;assert.ok(Math.abs(cannon.ballPoint(p,t).y-end.y)<1e-5);
 const {createGunRecoil}=await import('../activity/gun-recoil.mjs'),kick=createGunRecoil((c,k)=>cannon.ACTIONS[k],()=>1),a={id:'shot',kind:'basic',started:0,localStart:0};assert.equal(kick(a,'Don',139,true).pitch,0);const once=kick(a,'Don',140,true);assert.ok(once.pitch<=-.2&&once.yaw>.05);assert.equal(kick(a,'Don',150,true).pitch,0);assert.equal(kick({...a,id:'craft',kind:'craft'},'Don',900,true).pitch,0);
});
