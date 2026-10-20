const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityCombat}=require('../utils/activityCombat'),{combatSpec}=require('../activity/native-combat.cjs');
const grid={origin:{x:-20,z:-20},step:1,width:41,height:41,cells:Array(1681).fill(0)};
function fixture(geometry){let time=1000;const actor={id:'a',character:'Anelace',x:0,y:0,z:0,hp:100,team:'blue'},enemy={id:'enemy',character:'Estelle',x:6,y:0,z:.9,hp:100,team:'red'},ally={...enemy,id:'ally',x:3,team:'blue'},room=new Map([[actor.id,actor],[enemy.id,enemy],[ally.id,ally]]),combat=createActivityCombat({grid,geometry,now:()=>time,canDamage:(a,b)=>a.team!==b.team});return {actor,enemy,room,combat,cast(){return combat.action(actor,{id:'wave',kind:'craft',aim:{x:12,y:0,z:0}},room)},tick(age){time=1000+age;combat.tick(room)},event(){return combat.snapshot().attacks[0]}};}
test('Piercing Wave doubles its speed, narrows its marker and sweeps the whole enemy body between ticks',()=>{
 const s=combatSpec('Anelace','craft');assert.equal(s.projectileSpeed,36);assert.equal(s.lineRadius,.7);assert.equal(s.windup,500);assert.equal(s.duration,1000);
 const f=fixture();assert.ok(f.cast().combatId);f.tick(499);assert.equal(f.enemy.hp,100);f.tick(1000);assert.equal(f.enemy.hp,70);assert.equal(f.room.get('ally').hp,100);assert.ok(f.event().explodedAt);assert.equal(f.event().hits.filter(h=>h.id==='enemy').length,1);f.tick(1500);assert.equal(f.enemy.hp,70);
});
test('the wave hits the nearest hostile, respects walls and does not hit another floor',()=>{
 const f=fixture();f.enemy.x=9;f.enemy.z=0;const near={...f.enemy,id:'near',x:4};f.room.set('near',near);f.cast();f.tick(1200);assert.equal(near.hp,70);assert.equal(f.enemy.hp,100);
 const wall={floor:()=>0,sweep:(a,b)=>a.x<3&&b.x>=3?{point:{x:3,y:.9,z:0},distance:3-a.x}:null},blocked=fixture(wall);blocked.enemy.z=0;blocked.cast();blocked.tick(1200);assert.equal(blocked.enemy.hp,100);assert.ok(blocked.event().explodedAt);
 const high=fixture();high.enemy.y=5;high.cast();high.tick(1200);assert.equal(high.enemy.hp,100);
});

test('a real body contact damages the target once even when its centre is masked by narrow cover',()=>{
 const f=fixture({floor:()=>0,sweep:(a,b)=>a.z<.4&&b.z>.4?{point:{x:b.x,y:.9,z:.4}}:null});f.cast();f.tick(1000);assert.equal(f.enemy.hp,70);assert.equal(f.event().hits.filter(h=>h.id==='enemy').length,1);
});
test('the visible crescent stays anchored to its collider and its fire trail is removed on impact',async()=>{
 const THREE=await import('three'),{createCanvas,loadImage}=require('@napi-rs/canvas'),fs=require('node:fs/promises'),path=require('node:path'),root=path.resolve(__dirname,'../activity/assets/sky/effects/native'),savedFetch=global.fetch,savedDocument=global.document;
 global.document={createElement:()=>createCanvas(128,128)};global.fetch=async name=>({ok:true,json:async()=>JSON.parse(await fs.readFile(path.join(root,String(name)),'utf8'))});
 try{
  const {NativeEffectPlayer}=await import('../activity/native-effect-player.mjs'),entries=require('../activity/assets/sky/effects/native/catalogue.json'),player=await new NativeEffectPlayer(entries,url=>loadImage(path.join(root,url))).load(entries.find(e=>e.id.toLowerCase()==='third/sc009_05._ef'));
  global.fetch=async()=>({ok:true,json:async()=>require('../activity/assets/sky/combat/campanella-spire/model.json')});
  const {createSpecialCraftView}=await import('../activity/special-crafts-view.mjs'),map=new THREE.Texture(),bank={map,frames:90,columns:8,rows:12},scene=new THREE.Scene(),view=await createSpecialCraftView({...THREE,TextureLoader:class{async loadAsync(){return new THREE.Texture();}}},scene,new URL('http://localhost/'),new Map([['third/ms04671l._ef',bank],['sc/mg041_3._ef',bank]]),map,new Map([['third/sc009_05._ef',player]])),spec=combatSpec('Anelace','craft');
  const a={id:'wave',actor:'a',started:1000,impactAt:1500,flightEndsAt:2200,origin:{x:0,y:0,z:0},aim:{x:12,y:0,z:0}};view.draw(a,spec,700,new Map());
  const group=scene.children[0],projectile=group.children[0],model=projectile.children[0].children.find(x=>x.isGroup);assert.ok(model);assert.ok(model.position.length()<1e-6);assert.ok(Math.abs(projectile.position.x-7.2)<1e-6);assert.ok(group.children.slice(2).some(t=>t.visible&&t.position.x<projectile.position.x));
  a.explodedAt=1800;a.explosionPoint={x:4,y:0,z:0};view.draw(a,spec,900,new Map());assert.equal(projectile.visible,false);assert.ok(group.children[1].visible);assert.ok(group.children.slice(2).every(t=>!t.visible));view.remove(a.id);assert.equal(scene.children.length,0);view.dispose();map.dispose();
 }finally{global.fetch=savedFetch;global.document=savedDocument;}
});
