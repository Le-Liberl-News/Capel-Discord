const path=require('node:path'),fs=require('node:fs');
const root=path.resolve(__dirname,'assets/highlights');
const wallIds=new Set(['west-wall','west-tower','gate','east-tower','east-wall']);
const thresholds=[95,85,75,65,55,45,35,25,15,5,0];
async function renderHighlightDirect(event){
 if(event.type==='tank-arrival')return {attachment:fs.readFileSync(path.join(root,'tank-advance.gif')),name:'char-des-poms.gif'};
 if(event.type==='threshold'){
  if(!wallIds.has(event.wall)||!thresholds.includes(event.healthPercent))return null;
  if(event.replay?.hit&&fs.existsSync(path.join(root,event.wall+'-'+event.healthPercent+'.json')))return require('./highlight-replay.cjs').renderReplay(event);
  const file=path.join(root,event.wall+'-'+event.healthPercent+'.gif');
  return {attachment:fs.readFileSync(file),name:event.wall+'-'+event.healthPercent+'.gif'};
 }
 if(!['soldier-critical','soldier-death'].includes(event.type))return null;
 const {createCanvas,loadImage}=require('@napi-rs/canvas');
 const {GIFEncoder,quantize,applyPalette}=require('gifenc');
 const dead=event.type==='soldier-death',sheet=await loadImage(path.resolve(__dirname,'assets/guards/'+(dead?'4':'0')+'.png'));
 const backdrop=await loadImage(path.join(root,'garrison.png'));
 const blood=dead?await loadImage(path.resolve(__dirname,'../../activity/assets/sky/effects/native/effects/Third/mgblood.png')):null;
 const frames=[],w=448,h=280,hp=Math.max(0,Math.round(event.hp??0)),maxHP=Math.max(1,Math.round(event.maxHP??1));
 for(let f=0;f<24;f++){
  const canvas=createCanvas(w,h),c=canvas.getContext('2d');c.imageSmoothingEnabled=false;c.drawImage(backdrop,0,0,w,h);c.fillStyle='#10151c88';c.fillRect(0,0,w,h);
  const pose=dead?Math.min(3,Math.floor(f/3)):Math.floor(f/4)%8,shake=!dead&&f<12?(f%2?2:-2):0;
  if(blood&&f>=4){c.globalAlpha=Math.min(1,(f-3)/6);c.drawImage(blood,0,32,32,32,172,219,104,32);c.globalAlpha=1;}
  c.drawImage(sheet,6*256,pose*256,256,256,64+shake,-8,320,320);
  c.fillStyle='#10151cdd';c.fillRect(0,0,w,45);c.textAlign='center';c.fillStyle='#fff0c0';c.font='bold 19px sans-serif';c.fillText(event.name??'Un soldat',w/2,28);
  const ratio=Math.min(1,hp/maxHP);c.fillStyle='#120d10';c.fillRect(139,62,170,18);c.fillStyle='#49212a';c.fillRect(142,65,164,12);c.fillStyle=f%6<3?'#ff4054':'#c72739';c.fillRect(142,65,164*ratio,12);c.strokeStyle='#ebc1a1';c.strokeRect(139.5,62.5,169,17);
  c.font='bold 14px sans-serif';c.fillStyle='#fff';c.fillText(hp+' / '+maxHP+' PV',224,99);
  c.fillStyle='#11151de8';c.fillRect(0,245,w,35);c.fillStyle=dead?'#e4ccba':'#ffbd80';c.font='bold 17px sans-serif';c.fillText(dead?'Tombé au combat':'EN DANGER DE MORT',224,268);
  frames.push(c.getImageData(0,0,w,h).data);
 }
 const sample=new Uint8Array(frames.flatMap(frame=>{const pixels=[];for(let i=0;i<frame.length;i+=32)pixels.push(...frame.subarray(i,i+4));return pixels;}));
 const palette=quantize(sample,128),gif=GIFEncoder();
 for(const [i,data]of frames.entries())gif.writeFrame(applyPalette(data,palette),w,h,{palette:i===0?palette:undefined,delay:90,repeat:-1});
 gif.finish();return {attachment:Buffer.from(gif.bytes()),name:dead?'soldat-tombe.gif':'soldat-en-danger.gif'};
}
let worker=null,sequence=0;const pending=new Map();
function renderHighlight(event){
 if(!['soldier-critical','soldier-death'].includes(event.type)&&!(event.type==='threshold'&&event.replay))return renderHighlightDirect(event);
 if(!worker){const {Worker}=require('node:worker_threads');worker=new Worker(path.join(__dirname,'highlights-worker.cjs'));const current=worker;worker.on('message',({id,result,error})=>{const job=pending.get(id);if(!job)return;pending.delete(id);if(error)job.reject(Error(error));else job.resolve({...result,attachment:Buffer.from(result.attachment)});if(!pending.size)current.unref();});worker.on('error',error=>{for(const job of pending.values())job.reject(error);pending.clear();worker=null;});worker.on('exit',()=>{if(worker===current){for(const job of pending.values())job.reject(Error('GIF worker stopped'));pending.clear();worker=null;}});}
 worker.ref();return new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});worker.postMessage({id,event});});
}
module.exports={renderHighlight,renderHighlightDirect};
