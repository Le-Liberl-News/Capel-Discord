// Renders the finale's cinematic (finale-cinematic.cjs) to a video, on this machine: the game's client in Chrome, each
// frame drawn at its own time on a stopped clock, piped into ffmpeg; then the music laid over it.
//   node render-finale.cjs <moment.json> <out.mp4> [--music file] [--sfx dir] [--from s] [--to s] [--fps n] [--size 1920x1080] [--still t,t,...]
// The sound: the music, the game's own effects (ed6seNNN.wav from --sfx, the FC ones) where the director puts them,
// and the fortress's steps where its feet landed in the picture.
// --still writes one picture per time given instead of the film, to check the shots.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),{spawn}=require('node:child_process');
const here=path.resolve(__dirname,'..'),root=path.resolve(here,'../..');
const args=process.argv.slice(2),flag=(name,fallback)=>{const i=args.indexOf('--'+name);return i<0?fallback:args[i+1];};
const [input,output]=args.filter((a,i)=>!a.startsWith('--')&&!args[i-1]?.startsWith('--'));
// --zoom n: the page n times smaller, drawn n times denser (the game's bubbles and texts as big as on a screen of that size)
const zoom=Number(flag('zoom',2)),fps=Number(flag('fps',30)),[width,height]=flag('size','1920x1080').split('x').map(Number),music=flag('music',null),stills=flag('still',null);
const director=require('../finale-cinematic.cjs'),from=Number(flag('from',0)),to=Number(flag('to',director.DURATION));
async function build(){
 const esbuild=require('esbuild'),three=path.dirname(path.dirname(require.resolve('three'))),out=path.join(here,'assets/finale-cinematic.js');
 await esbuild.build({entryPoints:[path.join(here,'finale-cinematic-entry.mjs')],bundle:true,format:'esm',define:{__ACTIVITY_PREVIEW__:'true'},loader:{'.html':'text'},outfile:out,nodePaths:[path.join(three,'..')],
  plugins:[{name:'three',setup(b){b.onResolve({filter:/^three/},a=>{const sub=a.path.slice(5);return {path:path.join(three,sub===''?'build/three.module.js':sub.startsWith('/addons/')?'examples/jsm/'+sub.slice(8):sub.slice(1))};});}}]});
 return out;
}
// the page and the game's assets, as scene-renderer.cjs serves them
function host(bundle){return new Promise(resolve=>{
 const mime={'.js':'text/javascript','.json':'application/json','.gltf':'model/gltf+json','.png':'image/png','.webp':'image/webp','.woff':'font/woff','.woff2':'font/woff2','.bin':'application/octet-stream'};
 const server=http.createServer((req,res)=>{
  const url=new URL(req.url,'http://localhost');let file;
  if(url.pathname==='/'){res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(fs.readFileSync(path.join(here,'index.html'),'utf8').replace('/arena.js','/finale.js'));}
  if(url.pathname==='/finale.js')file=bundle;
  else if(url.pathname.startsWith('/assets/siege/'))file=path.resolve(here,'assets',decodeURIComponent(url.pathname.slice('/assets/siege/'.length)));
  else if(url.pathname.startsWith('/assets/pom/'))file=path.resolve(root,'activity/assets/sky/chat/pom',decodeURIComponent(url.pathname.slice('/assets/pom/'.length)));
  else if(url.pathname==='/assets/vacuum.png')file=path.join(root,'activity/assets/sky/chat/vacuum.png');
  else if(url.pathname.startsWith('/assets/sky/'))file=path.resolve(root,'activity/assets/sky',decodeURIComponent(url.pathname.slice('/assets/sky/'.length)));
  fs.readFile(file??'',(error,data)=>{res.statusCode=error?404:200;res.setHeader('Content-Type',mime[path.extname(file??'')]??'application/octet-stream');res.end(error?'':data);});
 });server.listen(0,'127.0.0.1',()=>resolve(server));
});}
async function main(){
 const base=JSON.parse(fs.readFileSync(input,'utf8')),bundle=await build(),server=await host(bundle),origin='http://127.0.0.1:'+server.address().port;
 const {chromium}=require(process.env.PLAYWRIGHT??'playwright-core');
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME??'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--use-angle=d3d11','--enable-gpu','--ignore-gpu-blocklist','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:Math.round(width/zoom),height:Math.round(height/zoom)},deviceScaleFactor:zoom});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400||process.env.TRACE&&r.url().includes(process.env.TRACE))console.error(r.status(),r.url());});
 await page.goto(origin,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>typeof window.loadFinale==='function',null,{timeout:60000});
 await page.clock.install({time:new Date(base.at-600000)});await page.clock.resume();
 await page.evaluate(job=>window.loadFinale(job),{base});
 if(errors.length)throw Error(errors.join('; '));
 await page.clock.pauseAt(new Date(base.at+from*1000));
 // --cam x,y,z,tx,ty,tz[,fov];... : other cameras (map units) to try, one picture each
 const cams=(flag('cam',null)?.split(';')??[null]).map(c=>{const v=c?.split(',').map(Number);return v&&{position:{x:v[0],y:v[1],z:v[2]},target:{x:v[3],y:v[4],z:v[5]},fov:v[6]||46};});
 if(stills){fs.mkdirSync(output,{recursive:true});for(const t of stills.split(',').map(Number))for(const [i,pose] of cams.entries()){await page.clock.setSystemTime(new Date(base.at+t*1000));await page.evaluate(([t,pose])=>window.drawFinale(t,pose),[t,pose]);await page.clock.runFor(16);await page.evaluate(([t,pose])=>window.drawFinale(t,pose),[t,pose]);await page.screenshot({path:path.join(output,'t'+String(t).replace('.','_')+(pose?'-c'+i:'')+'.jpg'),type:'jpeg',quality:88});console.log('still',t,i);}await browser.close();server.close();return;}
 const ffmpeg=process.env.FFMPEG??require('ffmpeg-static'),silent=output.replace(/\.mp4$/,'')+'-silent.mp4';
 const encoder=spawn(ffmpeg,['-y','-f','image2pipe','-framerate',String(fps),'-i','-','-c:v','libx264','-preset','slow','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart',silent],{stdio:['pipe','ignore','inherit']});
 const step=1000/fps,frames=Math.round((to-from)*fps);await page.evaluate(()=>{window.finaleSteps.length=0;});
 for(let i=0;i<frames;i++){const t=from+i/fps;await page.clock.runFor(step);await page.clock.setSystemTime(new Date(base.at+t*1000));await page.evaluate(t=>window.drawFinale(t),t);const shot=await page.screenshot({type:'jpeg',quality:94});if(!encoder.stdin.write(shot))await new Promise(r=>encoder.stdin.once('drain',r));if(i%fps===0)process.stdout.write('\r'+Math.round(t)+'/'+to+' s');}
 encoder.stdin.end();await new Promise(r=>encoder.on('close',r));const cues=await page.evaluate(()=>[...window.finaleSounds(),...window.finaleSteps.map(s=>[s.at,'ed6se694',Math.max(.2,1-s.distance/120)])]);await browser.close();server.close();
 if(errors.length)console.error('\nerrors:',errors.slice(0,5).join('; '));
 const soundtrack=output.replace(/\.mp4$/,'')+'.wav';fs.writeFileSync(soundtrack,await mix(ffmpeg,cues,from,to));
 await run(ffmpeg,['-y','-i',silent,'-i',soundtrack,'-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','192k','-shortest',output]);fs.rmSync(silent);fs.rmSync(soundtrack);
 console.log('\nwritten',output);
}
main().catch(e=>{console.error(e);process.exit(1);});

// the soundtrack, as a WAV: the music (fading out at the end), each cue at its time ([at, name, gain]), softly limited
const RATE=44100;
function run(ffmpeg,args){return new Promise((resolve,reject)=>spawn(ffmpeg,args,{stdio:'inherit'}).on('close',c=>c?reject(Error('ffmpeg '+c)):resolve()));}
function decode(ffmpeg,file){return new Promise((resolve,reject)=>{const p=spawn(ffmpeg,['-v','error','-i',file,'-f','f32le','-ac','2','-ar',String(RATE),'-']),chunks=[];p.stdout.on('data',c=>chunks.push(c));p.on('close',c=>{if(c)return reject(Error('ffmpeg '+c+' on '+file));const b=Buffer.concat(chunks);resolve(new Float32Array(b.buffer,b.byteOffset,b.length/4));});});}
async function mix(ffmpeg,cues,from,to){
 const length=Math.round((to-from)*RATE),out=new Float32Array(length*2),sfx=flag('sfx','E:/dev/sky-activity-tools/sons/FC'),samples=new Map();
 const add=(pcm,at,gain)=>{const start=Math.round((at-from)*RATE)*2;for(let i=Math.max(0,-start);i<pcm.length&&start+i<out.length;i++)out[start+i]+=pcm[i]*gain;};
 if(music){const m=await decode(ffmpeg,music),fade=3*RATE;for(let i=0;i<Math.min(m.length,out.length);i++){const frame=i>>1,k=Math.min(1,(length-frame)/fade);out[i]+=m[i]*.75*k;}}
 for(const [at,name,gain] of cues){if(at<from-4||at>=to)continue;if(!samples.has(name))samples.set(name,await decode(ffmpeg,path.join(sfx,name+'.wav')));add(samples.get(name),at,gain);}
 const wav=Buffer.alloc(44+out.length*2);wav.write('RIFF',0);wav.writeUInt32LE(36+out.length*2,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(2,22);wav.writeUInt32LE(RATE,24);wav.writeUInt32LE(RATE*4,28);wav.writeUInt16LE(4,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(out.length*2,40);
 for(let i=0;i<out.length;i++)wav.writeInt16LE(Math.round(Math.tanh(out[i])*32767),44+i*2);
 return wav;
}
