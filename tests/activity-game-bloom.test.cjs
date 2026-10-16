const test=require('node:test'),assert=require('node:assert/strict');
test('game bloom keeps the scene at native resolution and adds only the luminous halo',async()=>{
 const THREE=await import('three'),{createMapBloom,setBloomEmission}=await import('../activity/map-bloom.mjs');
 let target=null;const calls=[],clearColor=new THREE.Color();
 const renderer={autoClear:true,outputColorSpace:THREE.SRGBColorSpace,toneMapping:THREE.NoToneMapping,toneMappingExposure:1,
 getPixelRatio:()=>2,getSize:v=>v.set(640,360),getDrawingBufferSize:v=>v.set(1280,720),
 getRenderTarget:()=>target,setRenderTarget:t=>{target=t;},clear(){},getClearColor:v=>v.copy(clearColor),getClearAlpha:()=>1,setClearColor:c=>clearColor.set(c),
 render(object){calls.push({object,target,material:object.material,colors:object.children?.map(o=>o.material?.color?.clone()),opacity:object.children?.map(o=>o.material?.opacity)});}};
 const scene=new THREE.Scene(),material=new THREE.MeshBasicMaterial({color:0xffffff}),mesh=new THREE.Mesh(new THREE.PlaneGeometry(),material);scene.add(mesh);const spellMaterial=setBloomEmission(new THREE.MeshBasicMaterial({color:0x4466ff,transparent:true,opacity:.4}),2);const spell=new THREE.Mesh(new THREE.PlaneGeometry(),spellMaterial);scene.add(spell);
 const bloom=createMapBloom(renderer);bloom.render(scene,new THREE.PerspectiveCamera());
 const sceneDraws=calls.filter(c=>c.object===scene);assert.equal(sceneDraws.length,2);assert.equal(sceneDraws[0].target.width,1280);assert.equal(sceneDraws[1].target.width,640);
 assert.equal(sceneDraws[0].colors[0].r,1);assert.equal(sceneDraws[1].colors[0].r,0,'white paint must be black in emission pass');assert.ok(sceneDraws[1].colors[1].b>1,'magic emits HDR blue');assert.equal(sceneDraws[1].opacity[1],.4,'effect fade is preserved');
 const mix=calls.find(c=>c.material?.uniforms?.baseTexture);assert.ok(mix);assert.equal(mix.target.width,1280);assert.equal(mix.material.uniforms.baseTexture.value.image.width,1280);
 // The final addition samples the blurred composite, never the buffer containing another copy of the scene.
 const halo=calls.find(c=>c.material?.uniforms?.bloomStrength);assert.ok(halo);assert.equal(mix.material.uniforms.bloomTexture.value,halo.target.texture);
 assert.equal(mesh.material,material);assert.equal(renderer.getRenderTarget(),null);bloom.dispose();material.dispose();mesh.geometry.dispose();spellMaterial.dispose();spell.geometry.dispose();
});

test('ordinary white materials do not activate bloom',async()=>{const THREE=await import('three'),{createMapBloom,bloomEmission}=await import('../activity/map-bloom.mjs');const white=new THREE.MeshBasicMaterial({color:0xffffff});assert.equal(bloomEmission(white),0);const scene=new THREE.Scene();scene.add(new THREE.Mesh(new THREE.PlaneGeometry(),white));let draws=0;const bloom=createMapBloom({render(s){assert.equal(s,scene);draws++;}});bloom.render(scene,new THREE.PerspectiveCamera());assert.equal(draws,1);bloom.dispose();});
