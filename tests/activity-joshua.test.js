const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityCombat}=require('../utils/activityCombat');
const {createActivityService}=require('../utils/activityService');
const {applyDamage}=require('../utils/activityDamage');
const {COMBAT,combatSpec}=require('../activity/native-combat.cjs');
const grid={origin:{x:-12,z:-12},step:1,width:25,height:25,cells:Array(625).fill(0),spawn:{x:0,y:0,z:0}};
function fixture(extra={}){let time=1000;const players=new Map([['j',{id:'j',character:'Joshua',hp:100,x:0,y:0,z:0}],['a',{id:'a',hp:100,x:2,y:0,z:0}],['b',{id:'b',hp:100,x:5,y:0,z:.5}],['outside',{id:'outside',hp:100,x:3,y:0,z:2}]]);const combat=createActivityCombat({grid,now:()=>time,...extra});return {players,combat,start:()=>combat.action(players.get('j'),{id:'fang',kind:'craft',aim:{x:7,y:0,z:0}},players),tick(ms){time+=ms;combat.tick(players);}};}
test('Black Fang crosses its selected segment and applies three distinct impacts to every enemy on that segment',()=>{
 const f=fixture();assert.ok(f.start().combatId);assert.equal(f.players.get('j').x,7);
 f.tick(79);assert.equal(f.players.get('a').hp,100);
 for(let i=1;i<=3;i++){f.tick(i===1?1:80);for(const id of ['a','b']){assert.equal(f.players.get(id).hp,100-10*i);assert.equal(f.players.get(id).damageEvents.length,i);}}
 assert.equal(f.players.get('outside').hp,100);f.tick(1000);assert.equal(f.players.get('a').hp,70);
 assert.equal(f.combat.snapshot().attacks[0].hits.length,6);assert.ok(f.start().error);
});
test('Black Fang respects party protections and cannot traverse a missing floor or a wall',()=>{
 const safe=fixture({canDamage:(_a,b)=>b.id==='a'});safe.start();safe.tick(1000);assert.equal(safe.players.get('b').hp,100);
 const hole=fixture({geometry:{floor:x=>x>3&&x<4?null:0,sweep:()=>null}});assert.ok(hole.start().error);assert.equal(hole.players.get('j').x,0);
 const wall=fixture({geometry:{floor:()=>0,sweep:(a,b)=>a.x<3&&b.x>3?{point:{x:3,y:.85,z:0}}:null}});wall.start();wall.tick(1000);assert.equal(wall.players.get('b').hp,100);assert.equal(wall.players.get('j').x,2.8);
});
test('Black Fang can land from a jump while still requiring a continuous accessible floor',()=>{
 const f=fixture();Object.assign(f.players.get('j'),{y:1.5,jump:{id:'jump'}});assert.ok(f.start().combatId);assert.equal(f.players.get('j').jump,null);assert.equal(f.players.get('j').y,0);f.tick(400);assert.equal(f.players.get('a').hp,70);
});
test('a stale movement sample cannot undo an accepted dash; acknowledged movement resumes normally',async()=>{
 let time=1000;const service=createActivityService({grid,combatEnabled:true,now:()=>time,resolveCharacter:async()=> 'Joshua'}),joined=await service.join({id:'j',channel:'arena'}),token=joined.activity_token;
 const cast=await service.state(token,{x:0,z:0,action:{id:'dash',type:'attack',kind:'craft',aim:{x:6,y:0,z:0}}});assert.equal(cast.position.x,6);
 time+=200;const stale=await service.state(token,{x:0,z:0});assert.equal(stale.position.x,6);
 time+=200;const walk=await service.state(token,{x:6.5,z:0,combatDash:'dash'});assert.equal(walk.position.x,6.5);
});
test('all damage sources retain separately numbered impacts after shield absorption, including bosses',async()=>{
 const p={hp:1500,shield:{hp:5,until:3000}};applyDamage(p,12,1000);applyDamage(p,20,1100);assert.deepEqual(p.damageEvents.map(e=>e.amount),[7,20]);
 const {damageAmount,newDamageEvents,damageEffectIndex}=await import('../activity/damage-effects.mjs');assert.equal(damageAmount({hp:1500},p),27);assert.deepEqual(newDamageEvents({damageSequence:1},p).map(e=>e.amount),[20]);
 assert.deepEqual([4,12,25,40,70].map(damageEffectIndex),[5,3,2,1,0]);
});
test('Olivier has his own verified banks and Joshua uses AS 19 and the bank dynamically loaded by Black Fang',()=>{
 assert.equal(COMBAT.Olivier.source.as,'as04260._dt');assert.ok(Object.values(COMBAT.Olivier.banks).every(b=>b.texture.includes('as04260')));
 assert.deepEqual(COMBAT.Joshua.sequences.art.map(f=>f.pose),[0,1,2]);assert.ok(COMBAT.Joshua.sequences.craft.some(f=>f.bank===12));assert.equal(combatSpec('Joshua','art').element,'wind');
});

test('the runtime resolves every selected EF and texture relative to the public Sky asset directory',async()=>{
 const fs=require('node:fs/promises'),path=require('node:path'),root=path.join(__dirname,'../activity/assets/sky/effects/native'),requests=[];
 const originalFetch=global.fetch,originalImage=global.Image;
 global.fetch=async url=>{const parsed=new URL(url),relative=parsed.pathname.replace('/assets/sky/effects/native/','');assert.ok(parsed.pathname.startsWith('/assets/sky/effects/native/'),parsed.pathname);requests.push(relative);const json=JSON.parse(await fs.readFile(path.join(root,relative),'utf8'));return {ok:true,json:async()=>json};};
 global.Image=class {width=128;height=128;set src(url){const parsed=new URL(url);assert.ok(parsed.pathname.startsWith('/assets/sky/effects/native/effects/'),parsed.pathname);fs.access(path.join(root,parsed.pathname.replace('/assets/sky/effects/native/',''))).then(()=>this.onload(),()=>this.onerror());}};
 try{const {createDamageEffects}=await import('../activity/damage-effects.mjs'),THREE={TextureLoader:class {async loadAsync(){return {dispose(){}};}}};const effects=await createDamageEffects(THREE,{}, {},new URL('https://fixture.invalid/assets/sky/effects/fire-frames.png'));effects.dispose();assert.ok(requests.includes('animations/SC/damage0.json'));assert.ok(requests.includes('animations/SC/mg050_1.json'));}
 finally{global.fetch=originalFetch;global.Image=originalImage;}
});


test('Joshua charges for one full second before releasing his art with the native casting halo',()=>{
 const spec=combatSpec('Joshua','art');assert.equal(spec.windup,1000);assert.equal(spec.castDuration,1000);assert.equal(spec.castEffect,'SC/mgaria0._ef');assert.ok(spec.duration>=spec.windup);
 const f=fixture(),j=f.players.get('j');assert.ok(f.combat.action(j,{id:'wind',kind:'art',aim:{x:2,y:0,z:0}},f.players).combatId);f.tick(999);assert.equal(f.players.get('a').hp,100);f.tick(1);assert.equal(f.players.get('a').hp,80);
});
