const test=require('node:test'),assert=require('node:assert/strict');
test('panel rendering never runs animation frames and returns PNG',async()=>{
 const {createCanvas}=require('@napi-rs/canvas'),{encodeLoop}=require('../utils/loopingGif');
 const png=await encodeLoop(createCanvas(8,8),{frames:999,draw(){throw Error('animation must not run');}});
 assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
});
test('pom event animations exit before loading character assets or allocating frames',async()=>{
 const rendering=require('../utils/pomRendering');
 assert.equal(await rendering.renderEvolution('missing-character',0,3),null);
 assert.equal(await rendering.renderBite('missing-character',3,'missing-victim'),null);
 assert.equal(await require('../utils/pomWizard').renderWizardBite('missing-character',3,'missing-victim'),null);
 assert.equal(await require('../utils/pomSiege').renderSiege([],[],'devour'),null);
});
