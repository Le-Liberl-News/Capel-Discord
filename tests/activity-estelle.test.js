const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityCombat}=require('../utils/activityCombat');
const {COMBAT,combatSpec}=require('../activity/native-combat.cjs');
function fixture(options={}){let time=0;const players=new Map([
 ['e',{id:'e',character:'Estelle',hp:100,x:0,y:0,z:0}],
 ['near',{id:'near',hp:100,x:2,y:0,z:0}],
 ['far',{id:'far',hp:100,x:7,y:0,z:0}],
 ['side',{id:'side',hp:100,x:4,y:0,z:3}],
 ['air',{id:'air',hp:100,x:4,y:2,z:0}]
]);const combat=createActivityCombat({now:()=>time,geometry:{floor:()=>0,sweep:()=>null},...options});return {players,combat,cast(kind='craft',aim={x:8,y:0,z:0}){return combat.action(players.get('e'),{id:'earth',kind,aim},players);},tick(t){time=t;combat.tick(players);}};}
test('Estelle uses AS 17; the earth wave starts on the staff-ground pose',()=>{
 const meta=COMBAT.Estelle,spec=combatSpec('Estelle','craft');assert.equal(meta.source.craftSlot,17);assert.equal(meta.sequences.craft[7].pose,7);assert.equal(spec.windup,meta.sequences.craft.slice(0,7).reduce((n,f)=>n+f.ms,0)/2);assert.ok(spec.groundTarget&&spec.wave);assert.equal(spec.effectScale,3);assert.equal(spec.range,12);assert.equal(spec.radius,1.1);assert.equal(spec.fixedLength,true);assert.equal(spec.dash,undefined);
});
test('the wave damages each enemy once as it advances, without moving Estelle or hitting outside the line',()=>{
 const f=fixture();assert.ok(f.cast().combatId);f.tick(209);assert.equal(f.players.get('near').hp,100);f.tick(330);assert.equal(f.players.get('near').hp,70);assert.equal(f.players.get('far').hp,100);f.tick(800);assert.equal(f.players.get('far').hp,70);f.tick(2000);assert.equal(f.players.get('near').damageEvents.length,1);assert.equal(f.players.get('near').damageEvents[0].nativeEffect,'Third/cr151_01._ef');assert.equal(f.players.get('side').hp,100);assert.equal(f.players.get('air').hp,100);assert.equal(f.players.get('e').x,0);
});
test('wave targeting accepts diagonals, respects walls and protects dungeon allies',()=>{
 const f=fixture({canDamage:(_a,b)=>b.id!=='near',geometry:{floor:()=>0,sweep:(a,b)=>a.x<3&&b.x>3?{point:{x:3,y:.85,z:0}}:null}});f.cast();f.tick(1000);assert.equal(f.players.get('near').hp,100);assert.equal(f.players.get('far').hp,100);
 const diagonal=fixture();diagonal.players.get('near').x=2;diagonal.players.get('near').z=2;assert.ok(diagonal.cast('craft',{x:6,y:0,z:6}).combatId);diagonal.tick(1000);assert.equal(diagonal.players.get('near').hp,70);
});
test('Estelle casts native Earth Lance after one second of native halo and cast poses',()=>{
 const spec=combatSpec('Estelle','art');assert.equal(spec.nativeEffect,'SC/mg017_0._ef');assert.equal(spec.castDuration,1000);assert.equal(spec.windup,1000);assert.ok(COMBAT.Estelle.sequences.spell.length&&COMBAT.Estelle.sequences.cast.length);
 const f=fixture();f.cast('art',{x:2,y:0,z:0});f.tick(999);assert.equal(f.players.get('near').hp,100);f.tick(1000);assert.equal(f.players.get('near').hp,80);
});

test('Estelle uses one spatial native line whose curved geometry follows the aimed segment without texture uploads',async()=>{
 const THREE=await import('three'),fs=require('node:fs/promises'),path=require('node:path'),{createCanvas,loadImage}=require('@napi-rs/canvas'),{NativeEffectPlayer}=await import('../activity/native-effect-player.mjs'),{createEarthWave,prepareEarthWave}=await import('../activity/earth-wave.mjs'),previousFetch=global.fetch,previousDocument=global.document,root=path.join(__dirname,'../activity/assets/sky/effects/native');global.document={createElement:()=>createCanvas(128,128)};global.fetch=async url=>({ok:true,json:async()=>JSON.parse(await fs.readFile(path.join(root,url),'utf8'))});
 try{const entries=JSON.parse(await fs.readFile(path.join(root,'catalogue.json'),'utf8')),player=await new NativeEffectPlayer(entries,url=>loadImage(path.join(root,url))).load(entries.find(e=>e.id==='Third/cr151_00._ef')),bank=await prepareEarthWave(THREE,null,new Map([['third/cr151_00._ef',player]])),scene=new THREE.Scene(),spec=combatSpec('Estelle','craft'),wave=createEarthWave(THREE,scene,{origin:{x:0,y:0,z:0},aim:{x:12,y:0,z:0}},spec,bank);assert.equal(scene.children.length,1);wave.draw(209);assert.equal(scene.children[0].visible,false);wave.draw(330);assert.equal(scene.children[0].visible,true);assert.equal(scene.children[0].rotation.y,Math.PI/2);const objects=scene.children[0].children,versions=objects.map(o=>o.material.map.version);assert.ok(objects.some(o=>o.isMesh&&o.geometry.attributes.position.count===50));for(let t=350;t<700;t+=16)wave.draw(t);assert.deepEqual(objects.map(o=>o.material.map.version),versions);wave.draw(1500);assert.equal(scene.children[0].visible,false);wave.dispose();assert.equal(scene.children.length,0);}finally{global.fetch=previousFetch;global.document=previousDocument;}
});

test('Cursor distance only sets direction: fixed reach, constant wave timing and narrow collision',()=>{
 const {attackPoint}=require('../activity/native-combat.cjs');
 assert.deepEqual(attackPoint({x:0,y:0,z:0},{x:1,y:0,z:0},'craft','Estelle'),{x:12,y:0,z:0});
 for(const distance of [1,8,60]){const f=fixture();f.players.get('side').z=1.5;f.players.set('beyond',{id:'beyond',hp:100,x:10,y:0,z:0});assert.ok(f.cast('craft',{x:distance,y:0,z:0}).combatId);f.tick(330);assert.equal(f.players.get('near').hp,70);f.tick(800);assert.equal(f.players.get('far').hp,70);assert.equal(f.players.get('beyond').hp,100);f.tick(1000);assert.equal(f.players.get('beyond').hp,70);assert.equal(f.players.get('side').hp,100);}
});
