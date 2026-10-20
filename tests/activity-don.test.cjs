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
 const f=fixture();f.enemy.z=2;f.ally.z=2;f.send('craft');f.tick(550);assert.ok(f.actor.y>1);assert.equal(f.enemy.hp,500);f.tick(1250);assert.equal(f.actor.y,0);assert.equal(f.enemy.hp,452);assert.ok(f.enemy.stunUntil>=4300);assert.equal(f.ally.stunUntil,undefined);f.tick(2650);assert.ok(f.event().dashFinished);
 const g=fixture();g.enemy.z=2;g.send('craft');g.tick(550);g.actor.stunUntil=9000;g.tick(600);assert.equal(g.actor.y,0);assert.ok(g.event().cancelled);g.tick(1000);assert.equal(g.enemy.hp,500);
});
test('a parry stops the cannon slam without stunning the defender',()=>{const f=fixture();f.enemy.z=2;f.send('craft');f.enemy.parry={at:2250};f.tick(1250);assert.equal(f.enemy.hp,500);assert.equal(f.enemy.stunUntil,undefined);assert.ok(f.event().cancelled);});
test('shared ballistic aiming solves the low arc, and Don has a strong single camera kick',async()=>{
 const o={x:0,y:1.45,z:0},end={x:0,y:.9,z:10},d=cannon.aimDirection(o,end),p=cannon.launch(o,d);assert.ok(Math.abs(Math.hypot(d.x,d.y,d.z)-1)<1e-6);const t=(end.z-p.origin.z)/p.velocity.z*1000;assert.ok(Math.abs(cannon.ballPoint(p,t).y-end.y)<1e-5);
 const {createGunRecoil}=await import('../activity/gun-recoil.mjs'),kick=createGunRecoil((c,k)=>cannon.ACTIONS[k],()=>1),a={id:'shot',kind:'basic',started:0,localStart:0};assert.equal(kick(a,'Don',139,true).pitch,0);const once=kick(a,'Don',140,true);assert.ok(Math.abs(once.pitch+.3)<1e-9&&once.yaw>.05);assert.equal(kick(a,'Don',150,true).pitch,0);assert.equal(kick({...a,id:'craft',kind:'craft'},'Don',900,true).pitch,0);
});

test('downward shots explode on a thin floor even if the next sample is already below it',()=>{
 const geometry={floor:(x,z,ceiling)=>ceiling>=0?0:null,sweep:()=>null},f=fixture(geometry);
 f.send('basic',{origin:{x:0,y:1.45,z:0},direction:{x:0,y:-.999,z:.0447}});
 for(let t=140;t<=500;t+=33)f.tick(t);
 assert.ok(f.event().explodedAt);assert.equal(f.event().explosionPoint.y,0);assert.equal(f.event().expired,undefined);
});
test('the cannon leap follows a continuous parabola, and shot vibration decays without changing aim',async()=>{
 assert.equal(cannon.hop(910),2.7);assert.ok(cannon.hop(800)<cannon.hop(900));assert.ok(cannon.hop(920)>cannon.hop(1020));assert.ok(cannon.hop(810)>cannon.hop(1010));assert.equal(cannon.hop(1250),0);
 const speed=(t)=>(cannon.hop(t+1)-cannon.hop(t-1))/2;assert.ok(Math.abs(speed(1240))>.00783*1.8);assert.ok(Math.abs(speed(1240))>.015);assert.equal(cannon.hammer(1000).behind,false);assert.equal(cannon.hammer(1040).behind,true);assert.equal(cannon.hammer(1500).behind,true);
 const {donShotShake}=await import('../activity/gun-recoil.mjs'),a={character:'Don',kind:'basic',localStart:0};
 assert.deepEqual(donShotShake(a,139),{x:0,y:0,roll:0});assert.notEqual(donShotShake(a,175).x,0);assert.deepEqual(donShotShake(a,500),{x:0,y:0,roll:0});
});

test('the blast is placed at the surface itself, not at the swept sphere centre',()=>{
 const geometry={floor:()=>0,sweep:(a,b)=>a.z<=4&&b.z>4?{point:{x:0,y:a.y,z:3.86},surfacePoint:{x:0,y:a.y,z:4}}:null},f=fixture(geometry);
 f.send();for(let t=140;t<600;t+=20)f.tick(t);assert.equal(f.event().explosionPoint.z,4);
});

test('Don stays in FPS, tilts toward the ground during descent and keeps that pitch after landing',async()=>{
 const {createDonCraftCamera}=await import('../activity/don-craft-camera.mjs'),update=createDonCraftCamera(),event={id:'slam',character:'Don',kind:'craft',localStart:0,origin:{x:0,y:0,z:0},aim:{x:0,y:0,z:2.1}};
 assert.equal(cannon.ACTIONS.craft.thirdPersonCraft,false);assert.equal(update(event,800,-.1,{x:0,y:2.6,z:0}),-.1);
 const during=update(event,1100,-.1,{x:0,y:cannon.hop(1100),z:0});assert.ok(during>0&&during<1.3);
 const landed=update(event,1250,during,{x:0,y:0,z:0});assert.ok(Math.abs(landed-Math.atan2(1.45,2.1))<1e-9);
 assert.equal(update(null,2300,landed,{x:0,y:0,z:0}),landed);
 assert.equal(cannon.pose(event,1100).bank,2);assert.equal(cannon.pose(event,1400).pose,5);
});
