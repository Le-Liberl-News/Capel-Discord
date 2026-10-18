import test from 'node:test';import assert from 'node:assert/strict';
import {skyTime,DAY_DURATION,createDayNight,MAP_LIGHTS} from '../activity/day-night.mjs';
import * as THREE from 'three';
test('arena lighting remains noon at every time of day',()=>{const cycle=createDayNight(THREE,new THREE.Group(),'arena');for(const t of [0,30000,60000,90000])assert.equal(cycle.update(t).daylight,1);cycle.dispose();});
test('cycle lasts two minutes, repeats across clients and preserves readable night',()=>{
  assert.equal(DAY_DURATION,120000);const noon=skyTime(60000),night=skyTime(0);
  assert.equal(noon.hour,12);assert.equal(noon.daylight,1);assert.equal(night.lamps,1);
  assert.deepEqual(noon,skyTime(180000));assert.deepEqual(skyTime(-60000),noon);
  assert.ok(night.tint.every(v=>v>0&&v<.3));assert.ok(night.tint[2]>night.tint[0]);
  for(let time=0;time<120000;time+=100){const a=skyTime(time),b=skyTime(time+100);assert.ok(a.tint.every((v,i)=>Math.abs(v-b.tint[i])<.015));}
});
test('local light augments native shaders while keeping alpha, colours and clipping',()=>{
  const root=new THREE.Group(),material=new THREE.MeshBasicMaterial({transparent:true,alphaTest:.5,vertexColors:true});
  root.add(new THREE.Mesh(new THREE.PlaneGeometry(),material));const shadow=new THREE.ShadowMaterial({opacity:.24});const cycle=createDayNight(THREE,root,'anterose',{overlays:[{material:shadow}]});
  const shader={uniforms:{},vertexShader:'#include <project_vertex>',fragmentShader:'#include <opaque_fragment>'};material.onBeforeCompile(shader);
  assert.match(shader.vertexShader,/modelMatrix/);assert.match(shader.fragmentShader,/distance\(vSkyWorld/);assert.match(shader.fragmentShader,/#include <opaque_fragment>/);
  assert.equal(material.alphaTest,.5);assert.equal(material.transparent,true);assert.equal(material.vertexColors,true);
  cycle.update(0);assert.equal(shader.uniforms.skyLamps.value,1);assert.equal(shadow.opacity,0);
  cycle.update(60000);assert.equal(shader.uniforms.skyLamps.value,0);assert.equal(shadow.opacity,.24);
  assert.equal(MAP_LIGHTS.anterose[0].id,'capel');cycle.dispose();
});


test('Gehenna embers stay in world space, drift quickly and release their geometry',async()=>{
 const {createGehennaEmbers}=await import('../activity/gehenna-embers.mjs'),scene=new THREE.Scene(),view=createGehennaEmbers(THREE,scene),mesh=scene.getObjectByName('gehenna-world-embers');
 assert.equal(view.count,640);assert.ok(mesh.isLineSegments);view.update(1000);const first=Array.from(mesh.geometry.attributes.position.array);
 view.update(1000,{position:{x:1000,y:900,z:-900}});assert.deepEqual(Array.from(mesh.geometry.attributes.position.array),first);
 view.update(1010);const moved=mesh.geometry.attributes.position.array;assert.ok(moved[3]-first[3]>=.039);assert.ok(Math.hypot(moved[3]-moved[0],moved[4]-moved[1],moved[5]-moved[2])<.6);
 let disposed=false;mesh.geometry.addEventListener('dispose',()=>disposed=true);view.dispose();assert.ok(disposed);assert.equal(scene.children.length,0);
});
