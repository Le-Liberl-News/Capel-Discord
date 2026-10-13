const test=require('node:test'),assert=require('node:assert/strict');
test('arena model is parsed once and scenes own independent disposable geometry and materials',async()=>{
 const THREE=await import('three'),{GLTFLoader}=await import('three/addons/loaders/GLTFLoader.js'),{loadArenaModel}=await import('../activity/arena-preload.mjs');
 const original=GLTFLoader.prototype.loadAsync,source=new THREE.Group(),texture=new THREE.Texture({width:4,height:4}),mesh=new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.MeshBasicMaterial({map:texture}));source.add(mesh);let requests=0;
 GLTFLoader.prototype.loadAsync=async()=>{requests++;return {scene:source};};
 try{const assets=new URL('https://fixture.invalid/arena-cache/');const a=await loadArenaModel(assets,'test'),b=await loadArenaModel(assets,'test');assert.equal(requests,1);const x=a.scene.children[0],y=b.scene.children[0];assert.notEqual(x.geometry,y.geometry);assert.notEqual(x.material,y.material);assert.notEqual(x.material.map,y.material.map);x.material.color.set(0xff0000);x.geometry.dispose();x.material.map.dispose();assert.equal(y.material.color.getHex(),0xffffff);assert.equal(mesh.material.color.getHex(),0xffffff);assert.equal(y.material.map.image,texture.image);}finally{GLTFLoader.prototype.loadAsync=original;}
});
test('Averia font stays registered and is loaded once across scenes',async()=>{
 const originalFont=global.FontFace,originalDocument=global.document;let loads=0,registered=0;global.FontFace=class{async load(){loads++;return this;}};global.document={fonts:{add(){registered++;}}};
 try{const {ensureDialogueFont}=await import('../activity/dialogue.mjs');const assets=new URL('https://fixture.invalid/shared-font/');const [a,b]=await Promise.all([ensureDialogueFont(assets),ensureDialogueFont(assets)]);assert.equal(a,b);await ensureDialogueFont(assets);assert.equal(loads,1);assert.equal(registered,1);}finally{global.FontFace=originalFont;global.document=originalDocument;}
});
