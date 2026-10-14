import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {steer} from '../activity/movement.mjs';
import collision from '../activity/surface-collision.cjs';

// open 10 m floor, with a wall of empty cells along x = 2
const grid={origin:{x:-5,z:-5},step:.25,width:41,height:41,cells:Array.from({length:41*41},(_,i)=>i%41===28?null:0)};

test('the stick moves at any angle, not only the eight grid directions',()=>{
 for(const degrees of [7,23,38,61,113,200]){
  const a=degrees*Math.PI/180,p={x:-2,y:0,z:0};
  for(let f=0;f<30;f++)steer(grid,p,{x:Math.cos(a)*.9,z:Math.sin(a)*.9},1/60,3.5);
  assert.ok(Math.abs(Math.atan2(p.z,p.x+2)-a)<.02||Math.abs(Math.atan2(p.z,p.x+2)-a+2*Math.PI)<.02,`${degrees}°`);
 }
});

test('the stick tilt sets the speed, with a small dead zone',()=>{
 const full={x:-4,y:0,z:-4},half={x:-4,y:0,z:-4},rest={x:-4,y:0,z:-4};
 steer(grid,full,{x:0,z:1},1,3.5);steer(grid,half,{x:0,z:.5},1,3.5);steer(grid,rest,{x:0,z:.1},1,3.5);
 assert.ok(Math.abs(full.z+4-3.5)<1e-6);assert.ok(half.z+4>1.2&&half.z+4<1.7);assert.equal(rest.z,-4);
});

test('pushing into a wall slides along it instead of stopping',()=>{
 const p={x:1.6,y:0,z:0};
 for(let f=0;f<30;f++)steer(grid,p,{x:.7,z:.7},1/60,3.5);
 assert.ok(p.x<2-.1,'stays before the wall');assert.ok(p.z>1,'slid along it');
});

test('indexed collision gives the same hits as three\'s raycaster, rays and floors alike',()=>{
 const scene=new THREE.Group(),material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(20,20),material);floor.rotation.x=-Math.PI/2;scene.add(floor);
 const wall=new THREE.Mesh(new THREE.BoxGeometry(1,3,6),new THREE.MeshBasicMaterial());wall.position.set(3,1.5,0);scene.add(wall);
 const mirrored=new THREE.Mesh(new THREE.BoxGeometry(2,1,2),new THREE.MeshBasicMaterial());mirrored.position.set(-4,.5,-4);mirrored.scale.x=-1;scene.add(mirrored);
 const ghost=new THREE.Mesh(new THREE.BoxGeometry(2,2,2),material);ghost.position.set(0,1,4);ghost.raycast=()=>{};scene.add(ghost);
 scene.updateMatrixWorld(true);
 const c=collision.createSurfaceCollision(THREE,scene),ray=new THREE.Raycaster();
 const hit=c.sweep({x:0,y:1,z:0},{x:6,y:1,z:0},0);assert.ok(Math.abs(hit.point.x-2.5)<.01);assert.ok(Math.abs(Math.abs(hit.normal.x)-1)<1e-6);
 assert.equal(c.sweep({x:0,y:1,z:2},{x:0,y:1,z:6},0),null,'meshes without rays are ignored');
 assert.ok(Math.abs(c.floor(-4,-4,5)-1)<1e-6,'top of the mirrored box');assert.ok(Math.abs(c.floor(0,0,5))<1e-6);
 for(let i=0;i<200;i++){
  const from=new THREE.Vector3(Math.sin(i)*6,1+Math.cos(i*1.3),Math.cos(i*.7)*6),to=new THREE.Vector3(Math.sin(i*2.1)*6,Math.sin(i)*2,Math.cos(i*1.9)*6),dir=to.clone().sub(from),length=dir.length();
  ray.set(from,dir.normalize());ray.far=length;const expected=ray.intersectObject(scene,true)[0]?.distance??null,actual=c.sweep(from,to,0)?.distance??null;
  assert.ok(expected===actual||Math.abs(expected-actual)<1e-6,`ray ${i}`);
 }
});
