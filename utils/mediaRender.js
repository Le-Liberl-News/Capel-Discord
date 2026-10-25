'use strict';
const fs=require('node:fs'),path=require('node:path');
const MIB=1048576;
class MediaBudgetError extends Error{constructor(reason){super('Rendu interrompu : '+reason);this.code='MEDIA_BUDGET';}}
let scopes=null,lastWarning=0;
function warnBudget(error,stats){if(Date.now()-lastWarning<60000)return;lastWarning=Date.now();console.warn('Média reporté :',error.message,stats);}
function headroom(){
 if(process.platform!=='linux')return Infinity;
 if(!scopes){const root='/sys/fs/cgroup';let relative='/';try{relative=fs.readFileSync('/proc/self/cgroup','utf8').split('\n').find(s=>s.startsWith('0::'))?.slice(3)||'/';}catch{}
  let p=path.resolve(root,'.'+relative);if(!fs.existsSync(p))p=root;scopes=[];
  while(p===root||p.startsWith(root+'/')){if(fs.existsSync(path.join(p,'memory.max')))scopes.push([path.join(p,'memory.max'),path.join(p,'memory.current')]);if(p===root)break;p=path.dirname(p);}
  if(!scopes.length)scopes.push([root+'/memory/memory.limit_in_bytes',root+'/memory/memory.usage_in_bytes']);
 }
 let free=Infinity;for(const [limitFile,usedFile]of scopes)try{const limit=Number(fs.readFileSync(limitFile,'utf8')),used=Number(fs.readFileSync(usedFile,'utf8'));if(Number.isFinite(limit)&&limit>0&&limit<2**60&&Number.isFinite(used))free=Math.min(free,limit-used);}catch{}
 try{const available=Number(fs.readFileSync('/proc/meminfo','utf8').match(/^MemAvailable:\s+(\d+)/m)?.[1])*1024;if(Number.isFinite(available))free=Math.min(free,available);}catch{}
 return free;
}
function createBudget({memory=()=>process.memoryUsage(),available=headroom,clock=Date.now,maxGrowth=32*MIB,minHeadroom=96*MIB,maxDuration=8000,maxBytes=MIB}={}){
 const before=memory(),started=clock();let peak=before.rss;
 function check(bytes=0){const m=memory();peak=Math.max(peak,m.rss);if(available()<minHeadroom)throw new MediaBudgetError('marge mémoire insuffisante');if(m.rss-before.rss>maxGrowth)throw new MediaBudgetError('hausse RAM trop importante');if(clock()-started>maxDuration)throw new MediaBudgetError('temps maximal atteint');if(bytes>maxBytes)throw new MediaBudgetError('fichier trop volumineux');}
 return {check,stats:()=>({duration:clock()-started,peakRss:peak,rssGrowth:Math.max(0,peak-before.rss)})};
}
function createRenderGate({maxWaiting=1,budget=createBudget,onFinish=()=>{},onSkip=warnBudget,canFallback=()=>headroom()>=32*MIB}={}){
 let active=false;const waiting=[];
 async function execute(task,resolve,reject,source,fallback){active=true;let guard;try{guard=budget();guard.check();const monitor=global[Symbol.for('capel.diagnostics')],work=()=>task(guard);const result=await(monitor?monitor.run('media',source??monitor.origin(),work,null,[]):work());guard.check(result?.attachment?.length??0);onFinish(guard.stats());resolve(result);}catch(e){if(e.code==='MEDIA_BUDGET'){onSkip(e,guard?.stats());let image=null;if(fallback&&canFallback())try{const monitor=global[Symbol.for('capel.diagnostics')];image=await(monitor?monitor.run('media-fallback',source??monitor.origin(),fallback,null,[]):fallback());if((image?.attachment?.length??0)>1048576)image=null;}catch{image=null;}resolve(image);}else reject(e);}finally{const next=waiting.shift();if(next)execute(...next);else active=false;}}
 return {run(task,{fallback}={}){const source=global[Symbol.for('capel.diagnostics')]?.origin();return new Promise((resolve,reject)=>{if(!active)execute(task,resolve,reject,source,fallback);else if(waiting.length<maxWaiting)waiting.push([task,resolve,reject,source,fallback]);else resolve(null);});},status:()=>({active,waiting:waiting.length})};
}
function createMediaCache({maxBytes=4*MIB,maxItems=24,sizeOf=bytes=>bytes.length}={}){
 const map=new Map();let size=0;
 return {set(key,bytes){if(map.has(key)){size-=sizeOf(map.get(key));map.delete(key);}if(sizeOf(bytes)>maxBytes)return;map.set(key,bytes);size+=sizeOf(bytes);while(map.size>maxItems||size>maxBytes){const first=map.keys().next().value;size-=sizeOf(map.get(first));map.delete(first);}},delete(key){if(map.has(key)){size-=sizeOf(map.get(key));map.delete(key);}},[Symbol.iterator]:()=>map[Symbol.iterator](),stats:()=>({bytes:size,items:map.size})};
}
const gate=createRenderGate();
module.exports={createBudget,createRenderGate,createMediaCache,MediaBudgetError,headroom,render:(task,options)=>gate.run(task,options)};
