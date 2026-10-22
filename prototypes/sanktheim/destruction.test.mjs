import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import {createRequire} from 'node:module';
import {createGateDestruction} from './destruction.mjs';
const {createCanvas}=createRequire(import.meta.url)('@napi-rs/canvas');

test('damaged walls retain an opaque textured recess on both faces until the actual breach',()=>{
 const previous=globalThis.document;globalThis.document={createElement:()=>createCanvas(128,64)};
 try{
  const texture=name=>{const image=createCanvas(128,64),c=image.getContext('2d');c.fillStyle='#b4a58a';c.fillRect(0,0,128,64);const t=new T.CanvasTexture(image);t.name=name;return t;};
  const source=new T.Group(),scene=new T.Scene();
  const wall=new T.Mesh(new T.BoxGeometry(22.9,14,12).translate(-22.75,7,0),new T.MeshStandardMaterial({map:texture('t06o0105.png'),side:T.DoubleSide}));
  const floor=new T.Mesh(new T.PlaneGeometry(60,60).rotateX(-Math.PI/2),new T.MeshStandardMaterial({map:texture('r32o0005.png')}));
  source.add(wall,floor);scene.add(source);scene.updateMatrixWorld(true);
  const destruction=createGateDestruction(T,source,scene);
  const ray=(rear,y)=>new T.Raycaster(new T.Vector3(rear?-40:5,y,0),new T.Vector3(rear?1:-1,0,0),0,50).intersectObject(destruction.group,true).find(h=>!h.object.userData.debris&&h.object.material.map);
  for(let step=1;step<=10;step++){
   destruction.setSections([{id:'west-tower',name:'Tour',z:0,width:7,hp:100-step*9,maxHP:100,damageStep:step}]);scene.updateMatrixWorld(true);
   for(const rear of [false,true]){
    const hit=ray(rear,7);assert.ok(hit,'a damaged wall must not become see-through at step '+step);
    assert.ok(hit.object.userData.cavity,'recess required at step '+step+' rear='+rear+' hit='+JSON.stringify(hit.point));
    assert.equal(hit.object.material.transparent,false);assert.ok(hit.object.material.map?.image);
    assert.equal(hit.object.userData.cavity.through,false);
    assert.ok(rear?hit.point.x>-34.2:hit.point.x<-11.3,'the textured bottom must sit behind the original face');
   }
  }
  destruction.setSections([{id:'west-tower',name:'Tour',z:0,width:7,hp:0,maxHP:100,damageStep:11}]);scene.updateMatrixWorld(true);
  assert.equal(ray(false,3.2),undefined,'only the complete breach must allow seeing and passing through');
  assert.equal(ray(true,3.2),undefined);
 }finally{globalThis.document=previous;}
});
