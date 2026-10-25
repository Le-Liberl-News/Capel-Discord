const test=require('node:test'),assert=require('node:assert/strict');
const {createTank,INTERVAL,HP,ROCKET_LOCK,SLAM_DAMAGE}=require('./tank.cjs'),grip=require('./tank-grip.cjs');
const ARRIVAL=45000;
function fixture(){const state={at:0,wave:{id:'wave-test',number:1,started:0,ends:600000},enemies:[],shells:[],counts:{total:0},soldiers:[],players:{},walls:[{id:'gate',hp:2500000,maxHP:2500000,z:0}]},events=[],deaths=[],hits=[];const tank=createTank({state,hash:()=>0,emit:(type,text,data)=>events.push({type,text,...data}),geometry:()=>null,damageWall:()=>{},hurt:(a,d)=>{a.hp-=d;hits.push([a.id,d]);},kill:e=>deaths.push(e.id),speech:()=>{},wallX:()=>-33.5});return {state,tank,events,deaths,hits,step(at){state.at=at;tank.update(.25,[{character:'Estelle'}]);}};}
test('a nearly indestructible tank comes down from the fortress in the first minute, with three visible crew identities',()=>{const f=fixture();f.state.mechapom={grounded:true,x:-250,z:2};f.step(ARRIVAL-1);assert.equal(f.state.enemies.length,0);f.step(ARRIVAL);assert.equal(f.state.enemies.length,1);const e=f.state.enemies[0];assert.equal(e.maxHP,HP);assert.equal(HP,15000);assert.ok(Math.abs(e.x+236)<.5);assert.equal(e.expiresAt,600000);assert.equal(e.crew.length,3);assert.deepEqual(e.crew.map(c=>c.kind),['daspi','daspi','funebre']);f.step(420250);assert.equal(f.events.filter(e=>e.type==='tank-arrival').length,1);});
test('tank missile damage is precisely 0.125 percent of maximum wall HP and fires every five seconds',()=>{const f=fixture();f.step(ARRIVAL);f.step(ARRIVAL+5000);const shells=f.state.shells.filter(s=>s.missile);assert.equal(shells.length,1);assert.equal(shells[0].damage,2500000*.00125);f.step(ARRIVAL+5001);assert.equal(f.state.shells.filter(s=>s.missile).length,1);f.step(ARRIVAL+5000+INTERVAL);assert.equal(f.state.shells.filter(s=>s.missile).length,2);assert.ok(f.state.shells.some(s=>!s.missile));});
test('the tank expires with the final wave explosion and cannot respawn or keep firing',()=>{const f=fixture();f.step(ARRIVAL);f.step(600000);const count=f.state.shells.length;assert.equal(f.state.enemies[0].hp,0);assert.equal(f.deaths.length,1);f.step(600250);assert.equal(f.state.shells.length,count);assert.equal(f.deaths.length,1);});
test('the Discord tank highlight is the baked native three-dimensional model and crew GIF',async()=>{const h=await require('./highlights.cjs').renderHighlightDirect({type:'tank-arrival'});assert.equal(h.attachment.subarray(0,3).toString(),'GIF');assert.ok(h.attachment.length>50000);});

test('arrival freezes the three actual crew identities rather than retaining mutable AI crew records',()=>{
 const f=fixture();f.step(ARRIVAL);const arrival=f.events.find(e=>e.type==='tank-arrival'),tank=f.state.enemies[0];
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

test('every third wave belongs to the pom knight where it is tried: no tank then',()=>{const f=fixture();f.state.wave.number=3;f.state.knightTrial=true;f.step(ARRIVAL);f.step(ARRIVAL+60000);assert.equal(f.state.enemies.length,0);});
test('a homing rocket follows its target until it is close, then flies straight to where it stood: a sidestep then dodges it',()=>{
 const run=running=>{const f=fixture();f.step(ARRIVAL);const e=f.state.enemies[0];e.nextAttack=e.nextGrip=Infinity;for(const c of e.crew)c.nextShot=Infinity;
  const p=f.state.players.a={id:'a',online:true,hp:1200,maxHP:1200,x:e.x+30,y:0,z:e.z+8};let t=ARRIVAL;e.nextRocket=t;
  // a defender running at 8 units a second, who turns at a right angle to the rocket once it is right on them
  for(let i=0;i<24;i++){f.step(t+=250);if(!running)continue;const r=e.rockets[0];if(r&&Math.hypot(r.x-p.x,r.y-1-p.y,r.z-p.z)<6){const n=Math.hypot(r.vx,r.vz)||1;p.x+=-r.vz/n*2;p.z+=r.vx/n*2;}else p.z+=2;}
  return {p,f};};
 const still=run(false);assert.equal(still.p.hp,1200-150);assert.ok(still.f.events.some(e=>e.type==='tank-rocket-blast'&&e.to==='a'));
 const moving=run(true);assert.equal(moving.p.hp,1200);assert.ok(moving.f.state.enemies[0].rockets.every(r=>!r.homing));
 assert.ok(ROCKET_LOCK>1&&ROCKET_LOCK<6);
});
test('the arms seize a defender too close, lift, slam (damage) and fling them far back',()=>{
 const f=fixture();f.step(ARRIVAL);const e=f.state.enemies[0];e.nextAttack=e.nextRocket=Infinity;for(const c of e.crew)c.nextShot=Infinity;
 const p=f.state.players.a={id:'a',online:true,hp:1200,maxHP:1200,x:e.x+3,y:e.y,z:e.z};let t=ARRIVAL;
 f.step(t+=50);assert.ok(p.tankGrip);const start={...p.tankGrip.from};
 f.step(t=ARRIVAL+50+grip.LIFT-50);assert.ok(p.y>start.y+4);assert.equal(p.hp,1200);
 f.step(t=ARRIVAL+50+grip.SLAM+10);assert.equal(p.hp,1200-SLAM_DAMAGE);assert.ok(f.events.some(ev=>ev.type==='tank-slam'&&ev.to==='a'));
 f.step(t=ARRIVAL+50+grip.THROW+10);assert.equal(p.tankGrip,null);assert.ok(Math.hypot(p.x-e.x,p.z-e.z)>12);assert.equal(p.y,start.y);
});
