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

test('native polar particles use angle, height and radius rather than a thirty-unit radius',async()=>{
 const {NativeEffectPlayer}=await import('../activity/native-effect-player.mjs');
 const previous=global.fetch;const definition={id:'test/polar',game:'test',textures:[null],children:[],parts:[{enabled:true,index:0,duration:100,flags:0,renderFlags:1,textureIndex:0,primitive:0,position:[{flags:2,time:0,jitter:0,min:[30,.2,.5],max:[30,.2,.5]}],rotation:[],scale:[],color:[],emissions:[]}]};
 global.fetch=async()=>({ok:true,json:async()=>definition});
 try{const p=await new NativeEffectPlayer([],()=>{}).load({id:'test/polar',animation:'fixture'}),state=p.state(p.instances[0],0);assert.ok(Math.abs(state.position[0]-Math.cos(Math.PI/6)*.5)<1e-6);assert.equal(state.position[1],.2);assert.ok(Math.abs(state.position[2]-.25)<1e-6);}finally{global.fetch=previous;}
});

test('a short craft plays the whole baked assembly rather than cutting off its final frames',async()=>{
 const THREE=await import('three'),{bakedEffectSprite}=await import('../activity/baked-effects.mjs');
 const bank={map:new THREE.Texture(),frames:90,columns:8,rows:12,duration:1400},effect=bakedEffectSprite(THREE,bank,4);
 effect.draw(1399);assert.equal(effect.sprite.material.map.offset.x,1/8);assert.equal(effect.sprite.material.map.offset.y,0);effect.dispose();bank.map.dispose();
});
