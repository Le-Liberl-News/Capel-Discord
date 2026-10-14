const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
test('both arena skies contain six square native game textures with distinct day and elevated-cloud sets',()=>{
 for(const venue of ['arena','axis']){
  const dir='activity/assets/sky/'+venue,manifest=JSON.parse(fs.readFileSync(dir+'/skybox.json','utf8'));assert.equal(manifest.faces.length,6);assert.equal(new Set(manifest.faces).size,6);
  for(const [i,file]of manifest.faces.entries()){const b=fs.readFileSync(path.join(dir,file));assert.equal(b.subarray(1,4).toString(),'PNG');assert.equal(b.readUInt32BE(16),b.readUInt32BE(20));assert.ok(b.readUInt32BE(16)>=256);assert.match(manifest.sources[i].file,/^sky0[rludfb][13][.]_ds$/);}
 }
});
test('Grancel and Axis place names are shown only on the opening plan',async()=>{
 const {venueTitle,showsVenueTitle}=await import('../activity/duel-intro.mjs');assert.equal(venueTitle('arena'),'Arène de Grancel');assert.equal(venueTitle('axis'),'Pilier Axis - Sommet');
 assert.ok(showsVenueTitle({kind:'overview'}));assert.ok(showsVenueTitle({kind:'tower'}));assert.equal(showsVenueTitle({kind:'fighter'}),false);assert.equal(showsVenueTitle(null),false);
});
test('the native cube loads all faces and restores the previous background on disposal',async()=>{
 const {createAxisSky}=await import('../activity/axis-sky.mjs'),oldFetch=global.fetch;const cube={dispose(){this.disposed=true;}},previous={old:true},scene={background:previous,backgroundIntensity:.7};let urls;
 global.fetch=async()=>({ok:true,json:async()=>({faces:['r','l','u','d','f','b']})});
 try{const THREE={SRGBColorSpace:'srgb',CubeTextureLoader:class{async loadAsync(paths){urls=paths;return cube;}}};const sky=await createAxisSky(THREE,scene,new URL('http://local/axis/'));assert.equal(urls.length,6);assert.equal(urls[0],'http://local/axis/r');assert.equal(scene.background,cube);sky.update(null,{tint:[1,1,1]});assert.equal(scene.backgroundIntensity,1);sky.dispose();assert.equal(scene.background,previous);assert.equal(scene.backgroundIntensity,.7);assert.ok(cube.disposed);}finally{global.fetch=oldFetch;}
});
