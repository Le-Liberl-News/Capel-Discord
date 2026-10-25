const path=require('node:path'),fs=require('node:fs');
const ROOT=path.join(__dirname,'assets/highlights/wave-intro');
const LIMITS={maxGrowth:64*1048576,minHeadroom:128*1048576,maxDuration:8000,maxBytes:2*1048576};
function distanceToGate(state){if(Number.isFinite(state.mechapom?.toGate))return Math.max(0,Math.round(state.mechapom.toGate*2/3));const route=require('./mechapom.cjs').ROUTE;return Math.round(route.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p[0]-route[i][0],p[1]-route[i][1]),0)*2/3);}
function caption(c,width,height,distance){c.fillStyle='#100a0de8';c.fillRect(0,height-48,width,48);c.textAlign='center';c.font='bold 19px sans-serif';c.fillStyle='#ffb36a';c.fillText('FORTERESSE MÉCHAPOM',width/2,height-26);c.font='bold 13px sans-serif';c.fillStyle='#ffe7b0';c.fillText('À '+distance+' m de la porte de Sanktheim',width/2,height-8);}
async function renderWaveIntro(event,{limits={}}={}){
 if(require('../../utils/mediaRender').headroom()<LIMITS.minHeadroom)return {attachment:await fs.promises.readFile(path.join(ROOT,'047.webp')),name:'sanktheim-assaut.webp'};
 const {createCanvas,Image}=require('@napi-rs/canvas'),{encodeLoop,extension}=require('../../utils/loopingGif');const meta=JSON.parse(fs.readFileSync(path.join(ROOT,'manifest.json'),'utf8'));
 if(meta.width>384||meta.height>240||meta.count>60||meta.count<1||meta.fps<1)throw Error('Invalid bounded wave intro assets');
 const distance=Number.isFinite(event.fortressDistance)?Math.max(0,Math.min(10000,Math.round(event.fortressDistance))):distanceToGate({});
 const file=f=>path.join(ROOT,String(f).padStart(3,'0')+'.webp'),base=createCanvas(meta.width,meta.height),c=base.getContext('2d'),image=new Image();
 image.src=await fs.promises.readFile(file(meta.count-1));await image.decode();c.drawImage(image,0,0);caption(c,meta.width,meta.height,distance);
 const bytes=await encodeLoop(base,{frames:meta.count,delay:f=>f===meta.count-1?1500:Math.round(1000/meta.fps),limits:{...LIMITS,...limits},async draw(ctx,f){image.src=await fs.promises.readFile(file(f));await image.decode();ctx.drawImage(image,0,0);caption(ctx,meta.width,meta.height,distance);}});
 return {attachment:bytes,name:'sanktheim-assaut.'+extension(bytes)};
}
module.exports={renderWaveIntro,distanceToGate,LIMITS};
