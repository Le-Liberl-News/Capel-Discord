const test=require('node:test'),assert=require('node:assert/strict');
const {renderHighlight}=require('./highlights.cjs');
test('critical and death GIF encoding runs off the game thread and retains visible native frames',async()=>{let ticks=0;const timer=setInterval(()=>ticks++,5);try{const gif=await renderHighlight({type:'soldier-critical',name:'Soldat Jules',hp:90,maxHP:1000});assert.ok(Buffer.isBuffer(gif.attachment));assert.equal(gif.attachment.toString('ascii',0,6),'GIF89a');assert.equal(gif.attachment.readUInt16LE(6),448);assert.equal(gif.attachment.readUInt16LE(8),280);assert.ok(ticks>2,'the game event loop must continue during encoding');}finally{clearInterval(timer);}});
test('wall thresholds select their exact precomputed native geometry GIF and reject unknown paths',async()=>{for(const wall of ['west-wall','west-tower','gate','east-tower','east-wall'])for(const percent of [95,85,75,65,55,45,35,25,15,5,0]){const r=await renderHighlight({type:'threshold',wall,healthPercent:percent});assert.equal(r.attachment.toString('ascii',0,6),'GIF89a');assert.equal(r.name,wall+'-'+percent+'.gif');}assert.equal(await renderHighlight({type:'threshold',wall:'../../invalid',healthPercent:0}),null);});

test('small impacts do not tear distant facade triangles and the real battle context changes the GIF',async()=>{
 const fs=require('node:fs'),path=require('node:path'),{createCanvas,loadImage}=require('@napi-rs/canvas');
 const image=await loadImage(path.join(__dirname,'assets/highlights/gate-95.webp')),canvas=createCanvas(448,280),c=canvas.getContext('2d');
 c.drawImage(image,0,0,448,280,0,0,448,280);const before=c.getImageData(0,0,448,280).data;
 c.drawImage(image,0,15*280,448,280,0,0,448,280);const after=c.getImageData(0,0,448,280).data;
 let changed=0;for(let y=36;y<244;y++)for(let x=0;x<448;x++){const i=(y*448+x)*4;if(Math.abs(before[i]-after[i])+Math.abs(before[i+1]-after[i+1])+Math.abs(before[i+2]-after[i+2])>65)changed++;}
 assert.ok(changed<2000,'95% damage must stay local instead of shredding the facade: '+changed);
 const event={type:'threshold',wall:'gate',healthPercent:95,replay:{actors:[{id:'player-1',character:'Julia',x:-39,y:0,z:-1}],hit:{from:'pom-1',kind:'melee',position:{x:-33.52,y:1.4,z:0}}}};
 let ticks=0;const timer=setInterval(()=>ticks++,5);try{const r=await renderHighlight(event);assert.equal(r.attachment.toString('ascii',0,6),'GIF89a');assert.ok(ticks>2);assert.notDeepEqual(r.attachment,fs.readFileSync(path.join(__dirname,'assets/highlights/gate-95.gif')));}finally{clearInterval(timer);}
});
