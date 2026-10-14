const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {createActivityCombat}=require('../utils/activityCombat'),{createActivityGeometry}=require('../utils/activityGeometry');
const {stepAimPoint,lineMarkerHeight}=require('../activity/combat-ground.cjs');
test('ground markers accept a small riser and stay above both sides of a shallow depression',()=>{
 const grid={origin:{x:0,z:0},step:1,width:2,height:1,cells:[-.3,null]};
 assert.deepEqual(stepAimPoint({x:0,y:0,z:0},grid),{x:0,y:-.3,z:0});assert.equal(stepAimPoint({x:0,y:2,z:0},grid),null);assert.equal(stepAimPoint({x:1,y:0,z:0},grid),null);
 assert.equal(lineMarkerHeight({y:0},{y:-.3}),.07);assert.equal(lineMarkerHeight({y:-.3},{y:0}),.07);
});
test('Black Fang crosses small steps in both directions, but still rejects cliffs and absent floors',()=>{
 for(const reverse of [false,true]){const floor=x=>x>3?-.42:0,actor={id:'j',character:'Joshua',hp:500,x:reverse?7:0,y:reverse?-.42:0,z:0},room=new Map([['j',actor]]),combat=createActivityCombat({now:()=>1000,geometry:{floor:(x,z,ceiling)=>floor(x)<=ceiling?floor(x):null,sweep:()=>null}});
  const result=combat.action(actor,{id:'step',kind:'craft',aim:{x:reverse?0:7,y:reverse?0:-.42,z:0}},room);assert.ok(result.combatId,result.error);
 }
 for(const height of [null,-.8]){const actor={id:'j',character:'Joshua',hp:500,x:0,y:0,z:0},combat=createActivityCombat({now:()=>1000,geometry:{floor:x=>x>3&&x<5?height:0,sweep:()=>null}});assert.ok(combat.action(actor,{id:'blocked',kind:'craft',aim:{x:7,y:0,z:0}},new Map([['j',actor]])).error);}
});
test('Joshua can cross the actual Loewe arena bowl and damage an opponent inside it',()=>{
 const geometry=createActivityGeometry(JSON.parse(fs.readFileSync('activity/assets/sky/axis/anterose.gltf','utf8'))),grid=JSON.parse(fs.readFileSync('activity/assets/sky/axis/navigation.json','utf8'));let time=1000;
 const actor={id:'j',character:'Joshua',hp:500,x:0,y:geometry.floor(0,-9,2),z:-9},target={id:'victim',character:'Renne',hp:500,x:0,y:geometry.floor(0,-3,2),z:-3},room=new Map([['j',actor],['victim',target]]),combat=createActivityCombat({geometry,grid,now:()=>time}),y=geometry.floor(0,-2,2);
 assert.ok(combat.action(actor,{id:'axis-fang',kind:'craft',aim:{x:0,y,z:-2}},room).combatId);for(let i=0;i<50;i++){time+=20;combat.tick(room);}assert.equal(actor.z,-2);assert.ok(Math.abs(actor.y-y)<1e-6);assert.equal(target.damageEvents.length,3);assert.ok(target.hp<500);
});

test('the glowing Axis floor remains targetable after installing its animated lighting',async()=>{
 const THREE=require('three'),{createActivityScene}=require('../utils/activityGeometry'),{installSkyGlow}=await import('../activity/axis-sky.mjs');
 const gltf=JSON.parse(fs.readFileSync('activity/assets/sky/axis/anterose.gltf','utf8')),scene=createActivityScene(gltf),meshes=[];scene.traverse(o=>{if(o.isMesh)meshes.push(o)});
 // The geometry helper strips materials: restore the native glow tags used by GLTFLoader.
 for(let i=0;i<meshes.length;i++)Object.assign(meshes[i].material.userData,gltf.materials[gltf.meshes[i].primitives[0].material].extras);
 const glow=installSkyGlow(scene);glow.update(1000);
 for(const [x,z] of [[0,0],[2,0],[-2,1]]){
  const ray=new THREE.Raycaster(new THREE.Vector3(x,5,z),new THREE.Vector3(0,-1,0)),hit=ray.intersectObject(scene,true)[0];
  assert.ok(hit);assert.ok(Math.abs(hit.point.y+.3)<1e-5,'the cursor must hit the central floor, not fall through to the tower below');
  assert.equal(hit.object.material.userData.skyGlow,'pulse');
  const origin={x:0,y:-.3,z:0},aim={x:hit.point.x,y:hit.point.y,z:hit.point.z};
  if(x||z)assert.ok(require('../activity/native-combat.cjs').attackPoint(origin,aim,'craft','Joshua'));
 }
});
