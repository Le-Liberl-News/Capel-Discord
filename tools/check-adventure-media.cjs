// Standalone smoke test; run outside the live bot to measure a fresh process.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const api=require('../utils/adventure/animations'),{gifInfo}=require('../utils/activityRoleplay');
 const samples=[],words=[Array.from({length:21},(_,i)=>i+1).join('-')];
 for(let i=0;i<4;i++){
  const before=process.memoryUsage().rss,result=await api.renderAnimation('cartes',words);
  assert.ok(result,'Rendering declined by the memory/time budget; GIFs must stay disabled on this host until reviewed.');
  assert.deepEqual(gifInfo(result.attachment,{maxFrames:64}),{width:360,height:308,frames:57});
  samples.push({beforeRss:before,afterRss:process.memoryUsage().rss,...api.renderStats()});
 }
 const report={at:new Date().toISOString(),maxRss:process.resourceUsage().maxRSS*1024,samples};
 const directory=path.resolve(__dirname,'../.runtime');fs.mkdirSync(directory,{recursive:true});fs.writeFileSync(path.join(directory,'adventure-media-memory.json'),JSON.stringify(report,null,2),{mode:0o600});
 console.log(JSON.stringify(report));
})().catch(error=>{console.error(error.message);process.exitCode=1});
