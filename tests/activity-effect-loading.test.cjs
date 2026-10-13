const test=require('node:test'),assert=require('node:assert/strict');
const {characterEffects}=require('../activity/combat-effect-selection.cjs');
const definitions=require('../activity/assets/sky/effects/hero-frames.json');
test('combatants only request their atlas dependencies and shared status effects',()=>{
 const nial=characterEffects('Nial'),mueller=characterEffects('Mueller');
 assert.ok(nial.has('sc/mp050_00._ef'));assert.ok(!nial.has('sc/cr130_02._ef'));
 assert.ok(mueller.has('sc/cr130_02._ef'));assert.ok(mueller.has('third/sc006_17._ef'));
 for(const character of ['Joshua','Nial','Estelle','Mueller','Julia','Cassius','Renne','Campanella'])assert.ok([...characterEffects(character)].filter(id=>definitions[id]).length<10,character);
});
test('decoded atlas images are reused, while each scene owns its disposable texture',async()=>{
 const THREE=await import('three'),{loadBakedEffect}=await import('../activity/baked-effects.mjs');let requests=0;
 const image={width:1024,height:1536},api={...THREE,TextureLoader:class{async loadAsync(){requests++;return new THREE.Texture(image);}}};
 const assets=new URL('https://fixture.invalid/performance/');const [a,b]=await Promise.all([loadBakedEffect(api,assets,'shared',90),loadBakedEffect(api,assets,'shared',90)]);
 assert.equal(requests,1);assert.notEqual(a.map,b.map);assert.equal(a.map.image,b.map.image);a.dispose();assert.equal(b.map.image,image);const c=await loadBakedEffect(api,assets,'shared',90);assert.equal(requests,1);b.dispose();c.dispose();
});
