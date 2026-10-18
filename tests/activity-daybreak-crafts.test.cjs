const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityCombat}=require('../utils/activityCombat');
const {combatSpec}=require('../activity/native-combat.cjs');
const {CRAFTS,motion,pose}=require('../activity/daybreak-crafts.cjs');
const grid={origin:{x:-20,z:-20},step:1,width:41,height:41,cells:Array(1681).fill(0),spawn:{x:0,y:0,z:0}};
function fixture(character,extra={}){
 let time=1000;const actor={id:'a',character,x:0,y:0,z:0,hp:500,team:'blue'},target={id:'e',character:'Estelle',x:5,y:0,z:0,hp:500,team:'red'},room=new Map([['a',actor],['e',target]]);
 const combat=createActivityCombat({grid,now:()=>time,canDamage:(a,b)=>a.team!==b.team,...extra});
 return {actor,target,room,combat,cast:()=>combat.action(actor,{id:'craft',kind:'craft',aim:{x:5,y:0,z:0}},room),tick(ms){time+=ms;combat.tick(room);},get time(){return time;}};
}
for(const name of Object.keys(CRAFTS)){
 test(`${name}: native poses, one synchronized hit, grounded landing and recovery`,()=>{
  const f=fixture(name),s=combatSpec(name,'craft');assert.equal(s.special,'daybreak');assert.ok(f.cast().combatId);
  f.tick(s.hitAt-1);assert.equal(f.target.hp,500);f.tick(1);assert.equal(f.target.hp,500-s.damage);assert.equal(f.actor.x,5);assert.ok(Math.abs(f.actor.y)<1e-6);
  if(s.stun)assert.equal(f.target.stunUntil,f.time+s.stun);
  f.tick(5000);assert.equal(f.target.hp,500-s.damage);assert.equal(f.actor.combatLockedUntil<=f.time,true);
  assert.equal(s.stages.reduce((a,b)=>a+b.ms,0),s.duration);assert.equal(pose(name,0).bank,5);
  for(let t=0;t<s.duration+50;t+=17){const p=pose(name,t),stage=s.stages.find(s=>s.bank===p.bank);assert.ok(p.pose>=0&&p.pose<stage.frames);}
  assert.deepEqual(motion({character:name,origin:{x:0,y:0,z:0},aim:{x:5,y:0,z:0}},s.duration).position,{x:5,y:0,z:0});
 });
 test(`${name}: cancellation on stun/death cannot damage an enemy`,()=>{
  for(const reason of ['stun','death']){const f=fixture(name);f.cast();f.tick(100);if(reason==='stun')f.actor.stunUntil=10000;else f.actor.hp=0;f.tick(20);assert.equal(f.target.hp,500);assert.equal(f.combat.snapshot().attacks[0].cancelled,true);f.tick(5000);assert.equal(f.target.hp,500);}
 });
}
test('dash lines hit crossed opponents once, preserving allies and vertical separation',()=>{
 for(const name of ['Elaine','Shizuna']){const f=fixture(name),s=CRAFTS[name];f.room.set('cross',{id:'cross',x:2,y:0,z:.2,hp:100,team:'red'});f.room.set('ally',{id:'ally',x:2,y:0,z:0,hp:100,team:'blue'});f.room.set('high',{id:'high',x:2,y:4,z:0,hp:100,team:'red'});f.cast();f.tick(s.duration);assert.equal(f.room.get('cross').hp,100-s.damage);assert.equal(f.room.get('ally').hp,100);assert.equal(f.room.get('high').hp,100);}
});
test('craft paths reject gaps and walls instead of teleporting through them',()=>{
 for(const name of Object.keys(CRAFTS)){
  const cells=[...grid.cells];for(let z=0;z<41;z++)cells[z*41+22]=null;
  const gap=fixture(name,{grid:{...grid,cells}});assert.ok(gap.cast().error);assert.equal(gap.actor.x,0);
  const wall=fixture(name,{geometry:{floor:()=>0,sweep:()=>({point:{x:1,y:.8,z:0}})}});assert.ok(wall.cast().error);assert.equal(wall.actor.x,0);
 }
});
test('a live parry cancels the Daybreak impact and counters the caster',()=>{
 const f=fixture('Elaine');f.cast();f.target.parry={at:1000+CRAFTS.Elaine.hitAt-10};f.tick(CRAFTS.Elaine.hitAt);assert.equal(f.target.hp,500);assert.ok(f.actor.hp<500);assert.equal(f.combat.snapshot().attacks[0].cancelled,true);
});
test('visual accents release their geometry on event removal and disposal',async()=>{
 const THREE=await import('three'),{createDaybreakCraftView}=await import('../activity/daybreak-craft-view.mjs'),scene=new THREE.Scene(),view=createDaybreakCraftView(THREE,scene);
 for(let i=0;i<30;i++){const event={id:String(i),character:'Van',actor:'a',origin:{x:0,y:0,z:0},aim:{x:5,y:0,z:0}};view.draw(event,CRAFTS.Van.hitAt+50,new Map());assert.equal(view.size,1);view.remove(event.id);assert.equal(scene.children.length,0);}
 view.dispose();assert.equal(view.size,0);
});
