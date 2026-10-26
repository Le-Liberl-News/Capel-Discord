// Regression check in a separate process: this representative screenshot previously added about 200 MiB.
const fs=require('node:fs'),path=require('node:path');
if(process.argv.includes('--child')){
 const before=process.memoryUsage().rss;let peak=before;const timer=setInterval(()=>peak=Math.max(peak,process.memoryUsage().rss),5);
 const actors=[...Array.from({length:8},(_,i)=>({id:'soldier-'+i,soldier:true,x:-25,y:11.75,z:-10+i*3})),{id:'player-1',character:'Julia',x:-39,y:0,z:-1},{id:'player-2',character:'Joshua',x:-40,y:0,z:1}];
 require('../prototypes/sanktheim/highlights.cjs').renderHighlight({type:'threshold',wall:'gate',healthPercent:95,still:true,replay:{actors,hit:{from:'pom-1',kind:'melee',position:{x:-33.52,y:1.4,z:0}}}}).then(image=>{
  const after=process.memoryUsage().rss;peak=Math.max(peak,after);console.log(JSON.stringify({before,peak,after,growth:peak-before,retained:after-before,bytes:image.attachment.length}));
 }).catch(error=>{console.error(error.message);process.exitCode=1;}).finally(()=>clearInterval(timer));
}else{
 const {execFileSync}=require('node:child_process'),stats=JSON.parse(execFileSync(process.execPath,[__filename,'--child'],{encoding:'utf8',timeout:30000,windowsHide:true}));
 fs.mkdirSync(path.resolve(__dirname,'../.runtime'),{recursive:true});fs.writeFileSync(path.resolve(__dirname,'../.runtime/sanktheim-media-memory.json'),JSON.stringify(stats,null,2));
 console.log('Sanktheim screenshot: peak growth '+(stats.growth/1048576).toFixed(1)+' MiB; retained '+(stats.retained/1048576).toFixed(1)+' MiB');
 if(stats.growth>128*1048576||stats.retained>96*1048576)throw Error('Sanktheim screenshot exceeded its memory regression limit');
}
