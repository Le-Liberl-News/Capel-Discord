const test=require('node:test'),assert=require('node:assert/strict');
const {createRenderGate,createBudget,createMediaCache}=require('../utils/mediaRender');
const budget=()=>({check(){},stats:()=>({})});
test('renders are serial, waiting is bounded and excess requests are skipped',async()=>{
 const gate=createRenderGate({budget}),started=[],release=[];
 const work=n=>()=>new Promise(resolve=>{started.push(n);release.push(()=>resolve(n));});
 const a=gate.run(work(1)),b=gate.run(work(2)),c=gate.run(work(3));
 assert.deepEqual(started,[1]);assert.deepEqual(gate.status(),{active:true,waiting:1});assert.equal(await c,null);
 release.shift()();assert.equal(await a,1);assert.deepEqual(started,[1,2]);release.shift()();assert.equal(await b,2);assert.equal(gate.status().active,false);
});
test('budget guards headroom, RAM growth, duration and encoded bytes',()=>{
 let rss=100,available=1000,at=0;const b=createBudget({memory:()=>({rss}),available:()=>available,clock:()=>at,maxGrowth:50,minHeadroom:100,maxDuration:10,maxBytes:20});
 b.check();available=99;assert.throws(()=>b.check(),{code:'MEDIA_BUDGET'});available=1000;rss=151;assert.throws(()=>b.check(),{code:'MEDIA_BUDGET'});rss=100;at=11;assert.throws(()=>b.check(),{code:'MEDIA_BUDGET'});at=0;assert.throws(()=>b.check(21),{code:'MEDIA_BUDGET'});
});
test('a declined budget or rejected job releases the next rendering slot',async()=>{
 let calls=0;const gate=createRenderGate({budget:()=>{if(!calls++)return createBudget({available:()=>0});return budget();},onSkip:()=>{}});
 assert.equal(await gate.run(()=>assert.fail('must not render under pressure')),null);
 await assert.rejects(gate.run(()=>{throw Error('broken');}),/broken/);
 assert.equal(await gate.run(()=>42),42);
});
test('undelivered animation buffers cannot grow without bound during a platform outage',()=>{
 const cache=createMediaCache({maxBytes:10,maxItems:2});cache.set('a',Buffer.alloc(4));cache.set('b',Buffer.alloc(4));cache.set('c',Buffer.alloc(4));assert.deepEqual([...cache].map(([k])=>k),['b','c']);assert.equal(cache.stats().bytes,8);cache.set('c',Buffer.alloc(7));assert.deepEqual([...cache].map(([k])=>k),['c']);cache.set('huge',Buffer.alloc(11));assert.deepEqual(cache.stats(),{bytes:7,items:1});cache.delete('c');assert.equal(cache.stats().bytes,0);
});
