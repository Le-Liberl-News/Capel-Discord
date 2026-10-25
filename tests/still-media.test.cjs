const test=require('node:test'),assert=require('node:assert/strict');
test('an announcement GIF is written while drawn: two frames held at most, the last delay set at the end',()=>{
 const {createCanvas}=require('@napi-rs/canvas'),{stream,scratch}=require('../utils/pomRendering').parts,{gifInfo}=require('../utils/activityRoleplay');
 const checks=[],out=stream({once:true,budget:{check:bytes=>checks.push(bytes)}}),canvas=scratch();
 for(let i=0;i<5;i++){const c=canvas(96,96),x=c.getContext('2d');x.fillStyle=`rgb(${i*50},0,0)`;x.fillRect(0,0,8+i,8);out.add(c,60);}
 assert.equal(out.frames,5);assert.equal(checks.length,5);   // the budget is asked at every frame
 const gif=out.finish(1800);assert.equal(out.duration,4*60+1800);
 assert.deepEqual(gifInfo(gif,{maxFrames:64}),{width:96,height:96,frames:5});
});
test('a reused canvas comes back cleared, its drawing state reset',()=>{
 const {scratch}=require('../utils/pomRendering').parts,canvas=scratch();
 const a=canvas(4,4),x=a.getContext('2d');x.globalAlpha=.2;x.translate(2,2);x.fillStyle='#fff';x.fillRect(0,0,4,4);
 const b=canvas(4,4),y=b.getContext('2d');assert.equal(a,b);assert.equal(y.globalAlpha,1);assert.deepEqual([...y.getImageData(3,3,1,1).data],[0,0,0,0]);
});
test('a looping panel is a GIF, or its still picture when the budget declines it',async()=>{
 const {extension}=require('../utils/loopingGif');
 assert.equal(extension(Buffer.from('GIF89a')),'gif');assert.equal(extension(Buffer.from('89504e470d0a1a0a','hex')),'png');
 const {createCanvas}=require('@napi-rs/canvas'),{encodeLoop}=require('../utils/loopingGif'),base=createCanvas(8,8);
 assert.equal(extension(await encodeLoop(base,{frames:3,delay:100,draw(c,f){c.fillStyle='#f00';c.fillRect(f,0,1,1);}})),'gif');
});

test('streaming animation awaits each asynchronous frame before encoding it',async()=>{const {createCanvas}=require('@napi-rs/canvas'),{encodeLoop}=require('../utils/loopingGif'),seen=[],base=createCanvas(8,8);await encodeLoop(base,{frames:3,delay:100,async draw(c,f){await new Promise(setImmediate);seen.push(f);c.fillStyle='#f00';c.fillRect(f,0,1,1);}});assert.deepEqual(seen,[0,1,2]);});
