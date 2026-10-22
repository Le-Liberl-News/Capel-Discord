// Offline geometry/depth bake. Runtime sprites come from the actual arrival event.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),zlib=require('node:zlib');
const repo=path.resolve(__dirname,'../../..'),out=path.resolve(__dirname,'../assets/highlights');
const {chromium}=require(process.env.SIEGE_PLAYWRIGHT||'playwright'),{createCanvas,loadImage}=require('@napi-rs/canvas');
const script=require('esbuild').buildSync({entryPoints:[path.join(__dirname,'tank-highlight-scene.mjs')],bundle:true,format:'esm',write:false}).outputFiles[0].contents;
const server=http.createServer((req,res)=>{if(req.url==='/'){res.setHeader('Content-Type','text/html');return res.end('<meta charset="utf-8"><script type="module" src="/scene.js"></script>');}if(req.url==='/scene.js'){res.setHeader('Content-Type','text/javascript');return res.end(script);}const file=path.resolve(repo,'activity',req.url.replace(/^\//,''));if(!file.startsWith(path.join(repo,'activity/assets')+path.sep)){res.statusCode=404;return res.end();}fs.readFile(file,(error,data)=>{res.statusCode=error?404:200;res.end(data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,...(process.env.SIEGE_CHROME?{executablePath:process.env.SIEGE_CHROME}:{})});try{
 const page=await browser.newPage();page.on('pageerror',e=>console.error(e.message));await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>window.captureReady,null,{timeout:120000});
 for(const [laneIndex,lane]of [-.3,0,.3].entries()){
  const {frames,depths,...meta}=await page.evaluate(lane=>window.captureTank(lane),lane),stem=path.join(out,'tank-route-'+laneIndex),atlas=createCanvas(meta.width,meta.height*frames.length),c=atlas.getContext('2d');
  for(const [i,data]of frames.entries())c.drawImage(await loadImage(data),0,i*meta.height);
  fs.writeFileSync(stem+'.webp',atlas.toBuffer('image/webp'));fs.writeFileSync(stem+'.depth',zlib.gzipSync(Buffer.concat(depths.map(data=>Buffer.from(data,'base64')))));fs.writeFileSync(stem+'.json',JSON.stringify({...meta,lane}));console.log('Tank lane',laneIndex);
 }
 const event={type:'tank-arrival',crew:[{character:'Renne',kind:'daspi'},{character:'Olivier',kind:'daspi'},{character:'Zin',kind:'funebre'}],position:{x:-63,y:0,z:0}};
 const result=await require('../tank-highlight.cjs').renderTankHighlight(event);fs.writeFileSync(path.join(out,'tank-advance.gif'),result.attachment);
 }finally{await browser.close();server.close();}})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
