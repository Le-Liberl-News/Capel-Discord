const test=require('node:test'),assert=require('node:assert/strict');
const {createTank,INTERVAL}=require('./tank.cjs');
function fixture(){const state={at:0,wave:{id:'wave-test',number:1,started:0,ends:600000},enemies:[],shells:[],counts:{total:0},soldiers:[],players:{},walls:[{id:'gate',hp:2500000,maxHP:2500000,z:0}]},events=[],deaths=[];const tank=createTank({state,hash:()=>0,emit:(type,text,data)=>events.push({type,text,...data}),geometry:()=>null,damageWall:()=>{},hurt:()=>{},kill:e=>deaths.push(e.id),speech:()=>{},wallX:()=>-33.5});return {state,tank,events,deaths,step(at){state.at=at;tank.update(.25,[{character:'Estelle'}]);}};}
test('one 2000 HP tank arrives after seven minutes with three visible crew identities and survives restoration',()=>{const f=fixture();f.step(419999);assert.equal(f.state.enemies.length,0);f.step(420000);assert.equal(f.state.enemies.length,1);const e=f.state.enemies[0];assert.equal(e.maxHP,2000);assert.equal(e.crew.length,3);assert.deepEqual(e.crew.map(c=>c.kind),['daspi','daspi','funebre']);f.step(420250);assert.equal(f.events.filter(e=>e.type==='tank-arrival').length,1);});
test('tank missile damage is precisely 0.125 percent of maximum wall HP and fires every five seconds',()=>{const f=fixture();f.step(420000);f.step(425000);const shells=f.state.shells.filter(s=>s.missile);assert.equal(shells.length,1);assert.equal(shells[0].damage,2500000*.00125);f.step(425001);assert.equal(f.state.shells.filter(s=>s.missile).length,1);f.step(425000+INTERVAL);assert.equal(f.state.shells.filter(s=>s.missile).length,2);assert.ok(f.state.shells.some(s=>!s.missile));});
test('the tank expires with the final wave explosion and cannot respawn or keep firing',()=>{const f=fixture();f.step(420000);f.step(600000);const count=f.state.shells.length;assert.equal(f.state.enemies[0].hp,0);assert.equal(f.deaths.length,1);f.step(600250);assert.equal(f.state.shells.length,count);assert.equal(f.deaths.length,1);});
test('the Discord tank highlight is the baked native three-dimensional model and crew GIF',async()=>{const h=await require('./highlights.cjs').renderHighlightDirect({type:'tank-arrival'});assert.equal(h.attachment.subarray(0,3).toString(),'GIF');assert.ok(h.attachment.length>50000);});

test('arrival freezes the three actual crew identities rather than retaining mutable AI crew records',()=>{
 const f=fixture();f.step(420000);const arrival=f.events.find(e=>e.type==='tank-arrival'),tank=f.state.enemies[0];
 assert.deepEqual(arrival.crew,tank.crew.map(({character,kind})=>({character,kind})));
 tank.crew[0].character='Renne';assert.equal(arrival.crew[0].character,'Estelle');
});

test('the tracked shot advances at gameplay speed while keeping the tank centred in every frame',()=>{
 const shared=require('./tank-shared.cjs'),{project}=require('./tank-highlight.cjs');
 for(let lane=0;lane<3;lane++){
  const meta=require('./assets/highlights/tank-route-'+lane+'.json'),first=meta.poses[0];assert.equal(meta.poses.length,40);
  for(const [f,pose]of meta.poses.entries()){
   assert.ok(pose.matrix.every(Number.isFinite));assert.ok(Math.abs(pose.position.x-shared.advanceX(-63,f*meta.delay/1000)*shared.SCALE)<1e-9);
   const {target}=shared.tracking(pose.position),p=project(target,pose.matrix,pose.view,meta.width,meta.height);
   assert.ok(Math.abs(p.x-meta.width/2)<.001);assert.ok(Math.abs(p.y-meta.height/2)<.001);
   const firstTarget=shared.tracking(first.position).target,firstDepth=project(firstTarget,first.matrix,first.view,meta.width,meta.height).z;assert.ok(Math.abs(p.z-firstDepth)<.001,'following must preserve depth and crew scale across frames');
  }
  assert.ok(meta.poses.at(-1).position.x>first.position.x);
 }
});

test('tank alerts render the event crew off-thread and change when the real crew changes',async()=>{
 const {renderHighlight}=require('./highlights.cjs'),event={type:'tank-arrival',position:{x:-63,y:0,z:0},crew:[{character:'Estelle',kind:'daspi'},{character:'Renne',kind:'daspi'},{character:'Zin',kind:'funebre'}]};
 let ticks=0;const timer=setInterval(()=>ticks++,5);try{
  const a=await renderHighlight(event),b=await renderHighlight({...event,crew:event.crew.map(c=>({...c,character:'Olivier'}))});
  assert.equal(a.attachment.subarray(0,3).toString(),'GIF');assert.notDeepEqual(a.attachment,b.attachment);assert.ok(ticks>2);assert.equal(a.attachment.readUInt16LE(6),448);assert.equal(a.attachment.readUInt16LE(8),300);
 }finally{clearInterval(timer);}
});
test('late waves spawn more attackers faster than the opening cohort',()=>{const {createSiege,civil}=require('./core.cjs'),at=civil('2026-10-22',12),s=createSiege({now:()=>at,cohort:()=>Array.from({length:12},(_,i)=>({character:'Pom'+i,stage:1}))});s.start();s.testWave();for(const g of s._state.soldiers)g.hp=0;s.advance(at+30000);const early=s._state.enemies.length,earlyWait=s._state.wave.lastSpawnInterval;s.advance(at+560000);assert.ok(s._state.enemies.length>early);assert.ok(s._state.wave.lastSpawnInterval<earlyWait);assert.ok(s._state.enemies.some(e=>e.siegeTank));});

test('a real tank missile removes exactly 0.125 percent at impact and a destroyed tank stays destroyed after JSON restoration',()=>{const {createSiege,civil}=require('./core.cjs'),at=civil('2026-10-22',12),pop=()=>[{character:'Estelle',stage:1}],s=createSiege({now:()=>at,cohort:pop});s.start();s.testWave();for(const g of s._state.soldiers)g.hp=0;s._state.wave.tankAt=at+250;s.advance(at+8500);const impact=s.snapshot().events.find(e=>e.type==='catapult-impact'&&e.from.startsWith('pom-tank-')&&e.amount===3125);assert.ok(impact);const tank=s._state.enemies.find(e=>e.siegeTank);tank.hp=0;s.recordDeath(tank);const saved=JSON.parse(JSON.stringify(s._state)),r=createSiege({store:{load:()=>saved,save:()=>{}},cohort:pop});r.advance(r._state.at+30000);assert.equal(r._state.enemies.filter(e=>e.siegeTank).length,1);assert.equal(r._state.enemies.find(e=>e.siegeTank).hp,0);});

test('tank missiles travel straight at high speed, without the catapult arc',()=>{const {straight}=require('./catapult.cjs'),p=straight({x:0,y:2.8,z:0},{x:30,y:3,z:10});assert.ok(p.at(-1).t<300);for(let i=0;i<p.length;i++)assert.ok(Math.abs(p[i].y-(2.8+.2*i/48))<1e-8);});
