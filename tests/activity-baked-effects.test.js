const test=require('node:test'),assert=require('node:assert/strict');
test('baked earth and hit animations advance without canvas work or texture uploads',async()=>{
 const THREE=await import('three'),{loadBakedEffect,bakedEffectSprite}=await import('../activity/baked-effects.mjs');
 const api={...THREE,TextureLoader:class{async loadAsync(){return new THREE.Texture();}}};
 for(const [name,frames] of [['mg011_0',54],['damage3',24]]){
  const bank=await loadBakedEffect(api,new URL('https://fixture.invalid/'),name,frames),effect=bakedEffectSprite(THREE,bank,3);
  const source=bank.map.source.version,version=effect.sprite.material.map.version;
  effect.draw(0);const initial=effect.sprite.material.map.offset.clone();effect.draw(100);assert.notDeepEqual(effect.sprite.material.map.offset,initial);
  for(let ms=0;ms<1800;ms+=16)effect.draw(ms);
  assert.equal(bank.map.source.version,source);assert.equal(effect.sprite.material.map.version,version);assert.equal(effect.sprite.material.map.source,bank.map.source);
  effect.dispose();bank.dispose();
 }
});
test('confirmed damage flash is placed in front of the target and keeps scenery depth testing',async()=>{
 const THREE=await import('three'),{createDamageEffects}=await import('../activity/damage-effects.mjs');
 const previous=global.document;global.document={createElement:()=>({style:{},remove(){}})};
 try{
  const api={...THREE,TextureLoader:class{async loadAsync(){return new THREE.Texture();}}},scene=new THREE.Scene(),fx=await createDamageEffects(api,scene,{append(){}},new URL('https://fixture.invalid/effects/fire-frames.png'));
  const camera=new THREE.PerspectiveCamera();camera.position.set(0,3,5);camera.lookAt(0,0,0);camera.updateMatrixWorld();
  fx.hit('target',20);fx.update(.033,camera,new Map([['target',{position:{x:0,y:0,z:0},info:{height:8}}]]),800,600);
  const flash=scene.children[0];assert.ok(flash.visible);assert.ok(flash.position.z>0);assert.ok(flash.position.y<1.2);assert.equal(flash.material.depthTest,true);
  fx.dispose();assert.equal(scene.children.length,0);
 }finally{global.document=previous;}
});
