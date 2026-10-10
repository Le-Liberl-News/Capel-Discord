const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityCombat}=require('../utils/activityCombat');
const {COMBAT,combatSpec}=require('../activity/native-combat.cjs');
function fixture(options={}){let time=0;const players=new Map([
 ['e',{id:'e',character:'Estelle',hp:100,x:0,y:0,z:0}],
 ['near',{id:'near',hp:100,x:2,y:0,z:0}],
 ['far',{id:'far',hp:100,x:7,y:0,z:0}],
 ['side',{id:'side',hp:100,x:4,y:0,z:2}],
 ['air',{id:'air',hp:100,x:4,y:2,z:0}]
]);const combat=createActivityCombat({now:()=>time,geometry:{floor:()=>0,sweep:()=>null},...options});return {players,combat,cast(kind='craft',aim={x:8,y:0,z:0}){return combat.action(players.get('e'),{id:'earth',kind,aim},players);},tick(t){time=t;combat.tick(players);}};}
test('Estelle uses AS 17; the earth wave starts on the staff-ground pose',()=>{
 const meta=COMBAT.Estelle,spec=combatSpec('Estelle','craft');assert.equal(meta.source.craftSlot,17);assert.equal(meta.sequences.craft[7].pose,7);assert.equal(spec.windup,meta.sequences.craft.slice(0,7).reduce((n,f)=>n+f.ms,0)/2);assert.ok(spec.groundTarget&&spec.wave);assert.equal(spec.dash,undefined);
});
test('the wave damages each enemy once as it advances, without moving Estelle or hitting outside the line',()=>{
 const f=fixture();assert.ok(f.cast().combatId);f.tick(209);assert.equal(f.players.get('near').hp,100);f.tick(330);assert.equal(f.players.get('near').hp,70);assert.equal(f.players.get('far').hp,100);f.tick(630);assert.equal(f.players.get('far').hp,70);f.tick(2000);assert.equal(f.players.get('near').damageEvents.length,1);assert.equal(f.players.get('side').hp,100);assert.equal(f.players.get('air').hp,100);assert.equal(f.players.get('e').x,0);
});
test('wave targeting accepts diagonals, respects walls and protects dungeon allies',()=>{
 const f=fixture({canDamage:(_a,b)=>b.id!=='near',geometry:{floor:()=>0,sweep:(a,b)=>a.x<3&&b.x>3?{point:{x:3,y:.85,z:0}}:null}});f.cast();f.tick(1000);assert.equal(f.players.get('near').hp,100);assert.equal(f.players.get('far').hp,100);
 const diagonal=fixture();diagonal.players.get('near').x=2;diagonal.players.get('near').z=2;assert.ok(diagonal.cast('craft',{x:6,y:0,z:6}).combatId);diagonal.tick(1000);assert.equal(diagonal.players.get('near').hp,70);
});
test('Estelle casts native Earth Lance after one second of native halo and cast poses',()=>{
 const spec=combatSpec('Estelle','art');assert.equal(spec.nativeEffect,'SC/mg011_0._ef');assert.equal(spec.castDuration,1000);assert.equal(spec.windup,1000);assert.ok(COMBAT.Estelle.sequences.spell.length&&COMBAT.Estelle.sequences.cast.length);
 const f=fixture();f.cast('art',{x:2,y:0,z:0});f.tick(999);assert.equal(f.players.get('near').hp,100);f.tick(1000);assert.equal(f.players.get('near').hp,80);
});

test('earth eruptions use a static shared atlas, follow server timing and release their resources',async()=>{
 const THREE=await import('three'),{createEarthWave,prepareEarthWave}=await import('../activity/earth-wave.mjs');
 let loads=0;const bank=await prepareEarthWave({...THREE,TextureLoader:class{async loadAsync(url){assert.equal(url,'https://fixture.invalid/effects/earth-wave.png');loads++;return new THREE.Texture();}}},new URL('https://fixture.invalid/'));
 const scene=new THREE.Scene(),spec=combatSpec('Estelle','craft'),wave=createEarthWave(THREE,scene,{origin:{x:0,y:0,z:0},aim:{x:8,y:0,z:0}},spec,bank);
 wave.draw(209);assert.equal(scene.children.filter(x=>x.visible).length,0);
 wave.draw(330);assert.deepEqual(scene.children.filter(x=>x.isSprite&&x.visible).map(x=>x.position.x),[0,1,2]);assert.equal(scene.children.find(x=>x.isMesh).rotation.x,-Math.PI/2);
 wave.draw(690);assert.equal(scene.children.filter(x=>x.isSprite&&x.visible).length,9);const sprites=scene.children.filter(x=>x.isSprite),versions=sprites.map(x=>x.material.map.version),sourceVersion=bank.map.source.version;
 for(let t=700;t<1400;t+=16)wave.draw(t);
 assert.deepEqual(sprites.map(x=>x.material.map.version),versions);assert.equal(bank.map.source.version,sourceVersion);assert.ok(sprites.every(x=>x.material.map.source===bank.map.source));assert.equal(loads,1);
 wave.draw(1600);assert.equal(scene.children.filter(x=>x.visible).length,0);wave.dispose();assert.equal(scene.children.length,0);bank.dispose();
});
