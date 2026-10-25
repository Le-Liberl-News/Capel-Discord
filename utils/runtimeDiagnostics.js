'use strict';
// Installed before the bot imports anything else. Attribution is derived from code stacks,
// not manually maintained labels. Writes only bounded metadata, never messages or arguments.
const fs=require('node:fs'),path=require('node:path'),{AsyncLocalStorage,createHook}=require('node:async_hooks');
const ROOT=path.resolve(__dirname,'..'),DIR=path.join(ROOT,'.runtime/diagnostics');
let installed=false;
function install({force=false,directory=process.env.LN_DIAGNOSTICS_DIR||DIR}={}){
 if(installed||(!force&&process.platform!=='linux'))return;installed=true;
 try{fs.mkdirSync(directory,{recursive:true,mode:0o700});}catch(error){console.error('Diagnostic indisponible :',error.code);return;}
 const ctx=new AsyncLocalStorage(),active=new Map(),recent=[],children=[],FILE=path.join(directory,`task-${process.pid}.json`);
 const nativeTimeout=global.setTimeout,nativeInterval=global.setInterval;
 const copySymbols=(target,original)=>{for(const key of Object.getOwnPropertySymbols(original))Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(original,key));return target;};
 // Observe promise settlement without adding rejection handlers or changing application semantics.
 const promises=new WeakMap(),promiseIds=new Map();
 createHook({init(id,type,trigger,resource){if(type!=='PROMISE'||!ctx.getStore()||promiseIds.size>=4096)return;const record={resolved:false,done:null};promises.set(resource,record);promiseIds.set(id,record);},promiseResolve(id){const record=promiseIds.get(id);if(record){record.resolved=true;promiseIds.delete(id);record.done?.();}},destroy(id){promiseIds.delete(id);}}).enable();
 let sequence=0,lastWrite=0,lastMemory=process.memoryUsage(),lastSample=Date.now(),allocations=[],profileBusy=false;
 const boot=Date.now()-process.uptime()*1000;
 function origin(){const source=new Error().stack.split('\n').slice(2).map(s=>s.trim()).filter(s=>s.includes(ROOT)&&!s.includes('runtimeDiagnostics.js')&&!s.includes('node_modules')).slice(0,5).map(s=>s.replaceAll(ROOT+path.sep,''));return source.length?source:(ctx.getStore()?.source??[]);}
 function memory(){const m=process.memoryUsage();return {rss:m.rss,heapUsed:m.heapUsed,heapTotal:m.heapTotal,external:m.external,arrayBuffers:m.arrayBuffers};}
 function flush(force=false){
  const at=Date.now();if(!force&&at-lastWrite<250)return;lastWrite=at;
  try{const report={pid:process.pid,role:'bot',boot,at,memory:memory(),eventLoopGap:lastMemory.eventLoopGap??0,active:[...active.values()].slice(-16),recent:recent.slice(-20),children:children.slice(-16),allocations};
   fs.writeFileSync(FILE+'.tmp',JSON.stringify(report),{mode:0o600});fs.renameSync(FILE+'.tmp',FILE);
  }catch{} // Diagnostics never takes down the application (including a full disk).
 }
 function run(kind,source,fn,self,args){
  if(!source.length)return Reflect.apply(fn,self,args);
  const id=++sequence,start=Date.now(),before=memory(),parent=ctx.getStore()?.id??null;
  const task={id,parent,kind,source,start,before,peakRss:before.rss};if(active.size<128)active.set(id,task);flush();
  let finished=false;
  function done(){if(finished)return;finished=true;const after=memory();task.peakRss=Math.max(task.peakRss??0,after.rss);active.delete(id);recent.push({...task,end:Date.now(),duration:Date.now()-start,after,rssDelta:after.rss-before.rss});if(recent.length>20)recent.shift();flush();}
  return ctx.run(task,()=>{try{const value=Reflect.apply(fn,self,args);if(value&&typeof value.then==='function'){const record=promises.get(value);if(record&&!record.resolved)record.done=done;else done();}else done();return value;}catch(e){done();throw e;}});
 }
 for(const [name,original]of [['setTimeout',nativeTimeout],['setInterval',nativeInterval]]){
  global[name]=copySymbols(function(fn,delay,...args){if(typeof fn!=='function')return original(fn,delay,...args);const source=origin();return original(function(...values){return run(name,source,fn,this,values);},delay,...args);},original);require('node:timers')[name]=global[name];
 }
 // Discord entry points are discovered automatically, including async event listeners.
 const E=require('node:events').EventEmitter.prototype,wrappers=new WeakMap(),events=new Set(['messageCreate','interactionCreate','ready','clientReady','voiceStateUpdate']);
 for(const name of ['on','addListener']){const original=E[name];E[name]=function(event,fn){if(!events.has(event)||typeof fn!=='function')return original.call(this,event,fn);let map=wrappers.get(fn);if(!map)wrappers.set(fn,map=new Map());let wrapped=map.get(event);if(!wrapped){const source=origin();wrapped=function(...args){return run('event:'+event,source,fn,this,args);};wrapped.listener=fn.listener??fn;map.set(event,wrapped);}return original.call(this,event,wrapped);};}
 for(const name of ['removeListener','off']){const original=E[name];E[name]=function(event,fn){return original.call(this,event,wrappers.get(fn)?.get(event)??fn);};}
 // Capture every child launch automatically. Only executable + source location, never argv/env.
 const cp=require('node:child_process');
 for(const name of ['spawn','fork','exec','execFile','spawnSync','execFileSync','execSync']){
  const original=cp[name];cp[name]=function(...args){const source=origin(),task=ctx.getStore(),record={at:Date.now(),kind:name,parentTask:task?.id??null,source,executable:name==='exec'||name==='execSync'?'shell':path.basename(String(args[0]??''))};children.push(record);if(children.length>16)children.shift();flush(true);
   const result=Reflect.apply(original,this,args);if(result?.pid){record.pid=result.pid;flush(true);if(typeof result.once==='function')result.once('exit',(code,signal)=>{record.end=Date.now();record.code=code;record.signal=signal;flush(true);});}return result;};copySymbols(cp[name],original);
 }
 const threads=require('node:worker_threads'),OriginalWorker=threads.Worker;
 threads.Worker=class DiagnosticWorker extends OriginalWorker{
  constructor(filename,options){const source=origin(),record={at:Date.now(),kind:'worker',source,script:options?.eval?'(worker eval)':path.basename(String(filename)).slice(0,160),parentTask:ctx.getStore()?.id??null};children.push(record);if(children.length>16)children.shift();flush(true);super(filename,options);record.threadId=this.threadId;this.once('exit',code=>{record.end=Date.now();record.code=code;flush(true);});flush(true);}
 };
 // Sample retained JS allocations, without a heap dump or a Chromium process.
 // Native canvas/buffer memory appears separately in RSS/external; it cannot be attributed by this JS sampler.
 let profiler=null;
 try{const inspector=require('node:inspector');profiler=new inspector.Session();profiler.connect();profiler.post('HeapProfiler.startSampling',{samplingInterval:1048576},error=>{if(error)profiler=null;});}catch{}
 function profile(){if(!profiler||profileBusy)return;profileBusy=true;profiler.post('HeapProfiler.getSamplingProfile',(error,result)=>{profileBusy=false;if(error||!result)return;
  const rows=[];function walk(node,parents=[]){const f=node.callFrame||{},url=f.url||'',trail=url.includes(ROOT)?[...parents,`${url.replace('file://','').replace(ROOT+path.sep,'')}:${(f.lineNumber??0)+1} ${f.functionName||'(anonyme)'}`].slice(-4):parents;if(node.selfSize&&trail.length)rows.push({bytes:node.selfSize,source:trail});for(const c of node.children||[])walk(c,trail);}walk(result.profile.head);allocations=rows.sort((a,b)=>b.bytes-a.bytes).slice(0,10);flush();});}
 nativeInterval(()=>{const at=Date.now(),m=memory();for(const task of active.values())task.peakRss=Math.max(task.peakRss,m.rss);lastMemory={...m,eventLoopGap:Math.max(0,at-lastSample-1000)};lastSample=at;flush();},1000).unref();
 nativeInterval(profile,30000).unref();
 // Boot origin exists even if a synchronous module load blocks the first heartbeat.
 active.set(0,{id:0,kind:'startup',source:['index.js:1'],start:Date.now(),before:memory()});flush(true);
 nativeTimeout(()=>{active.delete(0);flush(true);},0).unref();
 process.on('uncaughtExceptionMonitor',error=>{recent.push({kind:'uncaughtException',at:Date.now(),source:String(error.stack??'').split('\n').slice(1,7).map(s=>s.trim().replaceAll(ROOT+path.sep,''))});if(recent.length>20)recent.shift();flush(true);});
 process.on('exit',()=>{flush(true);});
 const monitor={run,origin,flush};global[Symbol.for('capel.diagnostics')]=monitor;return monitor;
}
// HTTP instrumentation has no per-route labels to maintain and never records bodies or query strings.
function middleware(req,res,next){
 const monitor=global[Symbol.for('capel.diagnostics')];
 if(!monitor)return next();
 return monitor.run('http:'+req.method+' '+String(req.path??req.url??'').split('?')[0].slice(0,100),['HTTP → Express middleware (index.js)'],()=>{
  return new Promise(resolve=>{res.once('finish',resolve);res.once('close',resolve);next();});
 },null,[]);
}
module.exports={install,middleware};
