const test=require('node:test'),assert=require('node:assert/strict');
const {renderHighlight}=require('./highlights.cjs');
test('production stills are PNGs without loading the Chromium scene renderer',async()=>{
 for(const event of [
  {type:'threshold',wall:'gate',healthPercent:95},
  {type:'threshold',wall:'gate',healthPercent:95,replay:{actors:[],hit:{kind:'melee',position:{x:-33,y:1,z:0}}}},
  {type:'soldier-critical',name:'Soldat Jules',hp:10,maxHP:100},
  {type:'soldier-death',name:'Soldat Jules',hp:0,maxHP:100},
  {type:'tank-arrival',position:{z:0},crew:[{character:'Estelle',kind:'daspi'}]}
 ]){const result=await renderHighlight({...event,still:true});assert.equal(result.attachment.subarray(1,4).toString(),'PNG');assert.match(result.name,/\.png$/);}
 assert.equal(Object.keys(require.cache).some(p=>p.endsWith('scene-renderer.cjs')),false);
});
