const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'../..');let browser,server,idle,serial=Promise.resolve();
async function launch(){
 const {chromium:playwright}=require(process.env.SANKTHEIM_PLAYWRIGHT||'playwright-core');
 let executablePath=process.env.SANKTHEIM_CAPTURE_CHROME,args=[],env=process.env;
 if(!executablePath&&process.platform==='win32')executablePath='C:/Program Files/Google/Chrome/Application/chrome.exe';
 if(!executablePath){const {default:chromium}=await import('@sparticuz/chromium');executablePath=await chromium.executablePath();args=chromium.args;
  // Use our verified Debian-compatible NSS/NSPR bundle, not the AL2023
  // libraries (which require a newer glibc than the shared host provides).
  const lib=path.join(__dirname,'assets/browser-libs/usr/lib/x86_64-linux-gnu');
  if(!fs.existsSync(path.join(lib,'libnspr4.so')))throw Error('Run tools/prepare-sanktheim-browser-libs.py before Linux scene capture.');
  env={...process.env,LD_LIBRARY_PATH:[lib,process.env.LD_LIBRARY_PATH].filter(Boolean).join(':')};
 }
 return playwright.launch({headless:true,executablePath,args,env,timeout:45000});
}
function host(){return new Promise(resolve=>{
 const mime={'.js':'text/javascript','.json':'application/json','.gltf':'model/gltf+json','.png':'image/png','.webp':'image/webp','.woff':'font/woff','.woff2':'font/woff2'};
 server=http.createServer((req,res)=>{
  const url=new URL(req.url,'http://localhost');let file;
  if(url.pathname==='/'){res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(fs.readFileSync(path.join(__dirname,'index.html'),'utf8').replace('/arena.js','/replay.js'));}
  if(url.pathname==='/replay.js')file=path.join(__dirname,'assets/scene-replay.js');
  else if(url.pathname.startsWith('/assets/siege/'))file=path.resolve(__dirname,'assets',decodeURIComponent(url.pathname.slice('/assets/siege/'.length)));
  else if(url.pathname.startsWith('/assets/pom/'))file=path.resolve(root,'activity/assets/sky/chat/pom',decodeURIComponent(url.pathname.slice('/assets/pom/'.length)));
  else if(url.pathname==='/assets/vacuum.png')file=path.join(root,'activity/assets/sky/chat/vacuum.png');
  else if(url.pathname.startsWith('/assets/sky/'))file=path.resolve(root,'activity/assets/sky',decodeURIComponent(url.pathname.slice('/assets/sky/'.length)));
  if(!file||![path.join(__dirname,'assets')+path.sep,path.join(root,'activity/assets')+path.sep].some(base=>file.startsWith(base))){res.statusCode=404;return res.end();}
  fs.readFile(file,(error,data)=>{res.statusCode=error?404:200;res.setHeader('Content-Type',mime[path.extname(file)]??'application/octet-stream');res.setHeader('Cache-Control','public,max-age=3600');res.end(error?'Asset missing':data);});
 });server.listen(0,'127.0.0.1',()=>{server.unref();resolve();});
});}
async function close(){clearTimeout(idle);const b=browser,s=server;browser=null;server=null;if(b)await b.close();s?.close();}
async function render(clip,{fps=10,width=480,height=320,onFrame}={}){
 clearTimeout(idle);if(!server)await host();if(!browser?.isConnected())browser=await launch();
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
 const origin='http://127.0.0.1:'+server.address().port;
 await page.route('**/*',route=>route.request().url().startsWith(origin+'/')?route.continue():route.abort());
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.goto(origin,{waitUntil:'domcontentloaded',timeout:60000});
  await page.waitForFunction(()=>typeof window.loadSceneReplay==='function',null,{timeout:60000});
  let loadingTimer;try{await Promise.race([page.evaluate(job=>window.loadSceneReplay(job),clip),new Promise((_,reject)=>{loadingTimer=setTimeout(()=>reject(Error('Native scene loading exceeded 90 seconds')),90000);})]);}finally{clearTimeout(loadingTimer);}
  if(errors.length)throw Error('Recording scene: '+errors.join('; '));
  await page.clock.install({time:new Date(clip.start)});await page.clock.pauseAt(new Date(clip.start+100));
  const frames=[],step=1000/fps;
  for(let at=clip.start;at<=clip.end;at+=step){
   await page.clock.runFor(step);await page.clock.setSystemTime(new Date(at));await page.evaluate(at=>window.drawSceneReplay(at),at);
   const png=await page.screenshot({type:'png',animations:'disabled',timeout:30000});if(onFrame)await onFrame(png,at);frames.push(png);
  }
  if(errors.length)throw Error('Recording frame: '+errors.join('; '));
  const {createCanvas,loadImage}=require('@napi-rs/canvas'),{GIFEncoder,quantize,applyPalette}=require('gifenc'),canvas=createCanvas(width,height),ctx=canvas.getContext('2d'),pixels=[];
  for(const png of frames){ctx.drawImage(await loadImage(png),0,0);pixels.push(ctx.getImageData(0,0,width,height).data);}
  const samples=[];for(const data of pixels)for(let i=0;i<data.length;i+=64)samples.push(...data.subarray(i,i+4));
  const palette=quantize(Uint8Array.from(samples),256),gif=GIFEncoder();for(const [i,data]of pixels.entries())gif.writeFrame(applyPalette(data,palette),width,height,{palette:i?undefined:palette,delay:step,repeat:-1});gif.finish();
  return {attachment:Buffer.from(gif.bytes()),name:'sanktheim-'+clip.event.type+'.gif'};
 }finally{await page.close();idle=setTimeout(()=>void close(),15000);idle.unref();}
}
function renderScene(clip,options){const job=serial.then(()=>render(clip,options));serial=job.catch(()=>{});return job;}
module.exports={renderScene,close,launch};
