const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib');
const root=path.join(__dirname,'assets/highlights'),assets=path.resolve(__dirname,'../../activity/assets/sky');
const catalogue=require('../../activity/assets/sky/characters.json'),variants=require('./pom-variants.cjs');
const W=448,H=280,S=2/3;
function project(p,m){return {x:(m[0]*p.x+m[4]*p.y+m[8]*p.z+m[12]+1)*W/2,y:(1-m[1]*p.x-m[5]*p.y-m[9]*p.z-m[13])*H/2,z:-(m[2]*p.x+m[6]*p.y+m[10]*p.z+m[14])};}
async function renderReplay(event){
 const {createCanvas,loadImage}=require('@napi-rs/canvas'),{GIFEncoder,quantize,applyPalette}=require('gifenc');
 const stem=path.join(root,event.wall+'-'+event.healthPercent),meta=JSON.parse(fs.readFileSync(stem+'.json')),depth=zlib.gunzipSync(fs.readFileSync(stem+'.depth')),atlas=await loadImage(stem+'.webp');
 const transform=p=>{const q=project(p,meta.matrix);q.z=-(meta.view[2]*p.x+meta.view[6]*p.y+meta.view[10]*p.z+meta.view[14]);return q;};
 const actors=[];
 for(const a of event.replay.actors){
  let info,file;
  if(a.pom){const v=variants.variant(a);file=path.join(assets,'chat/pom',a.character.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/^schera$/,'scherazard')+'-'+v+'.png');info={height:variants.height(v),frameWidth:256,frameHeight:256,columns:1,rows:1,directions:1,idle:[0],run:[0]};}
  else if(a.soldier){file=path.join(__dirname,'assets/guards/0.png');info={height:5.12,centerY:1.04,frameWidth:256,frameHeight:256,columns:8,rows:8,directions:8,idle:[0,1,2,3,4,5,6,7],run:[0,1,2,3,4,5,6,7]};}
  else {info=catalogue[a.character];if(!info)continue;file=path.join(assets,info.texture);}
  try{actors.push({a,info,sheet:await loadImage(file),screen:transform(a)});}catch(error){if(error.code!=='ENOENT'&&!/No such file|Failed to read/.test(error.message))throw error;}
 }
 const hit=event.replay.hit,impact=transform(hit.position),effect=await loadImage(path.join(assets,'effects',hit.kind==='shell'?'sc-msc0640-frames.png':'third-sc001_12-frames.png'));
 const defs=require('../../activity/assets/sky/effects/hero-frames.json'),effectInfo=defs[hit.kind==='shell'?'sc/msc0640._ef':'third/sc001_12._ef'];
 const canvas=createCanvas(W,H),c=canvas.getContext('2d'),layer=createCanvas(W,H),lc=layer.getContext('2d'),frames=[];
 c.imageSmoothingEnabled=lc.imageSmoothingEnabled=false;
 function overlay(draw,z,depthOffset){lc.clearRect(0,0,W,H);draw(lc);const source=lc.getImageData(0,0,W,H).data,base=c.getImageData(0,0,W,H),dest=base.data;for(let y=36;y<244;y++)for(let x=0;x<W;x++){const i=y*W+x,k=i*4,alpha=source[k+3]/255;if(!alpha||z>depth.readUInt16LE(depthOffset+i*2)/256+.18)continue;for(let n=0;n<3;n++)dest[k+n]=Math.round(source[k+n]*alpha+dest[k+n]*(1-alpha));dest[k+3]=255;}c.putImageData(base,0,0);}

 const count=atlas.height/H;
 for(let f=event.still?Math.min(8,count-1):0;f<count;f++){
  c.drawImage(atlas,0,f*H,W,H,0,0,W,H);const offset=f<3?0:W*H*2;
  for(const {a,info,sheet,screen}of [...actors].sort((a,b)=>b.screen.z-a.screen.z)){
   const direction=(info.directions??8)===1?0:((Math.round((Math.atan2(a.heading?.dx??1,a.heading?.dz??0)-Math.atan2(meta.view[0],meta.view[8]))/(Math.PI/4))+8)%8);
   const poses=a.moving?info.run:info.idle,pose=poses[Math.floor(f*.72)%poses.length],frame=pose*(info.directions??8)+direction;
   const height=info.height/S*meta.pixelsPerUnit,width=height*info.frameWidth/info.frameHeight,center=(info.centerY??info.height/2)/S*meta.pixelsPerUnit;
   const lunge=a.id===hit.from&&hit.kind==='melee'?Math.sin(Math.min(1,f/4)*Math.PI)*5:0;
   overlay(ctx=>ctx.drawImage(sheet,frame%info.columns*info.frameWidth,Math.floor(frame/info.columns)*info.frameHeight,info.frameWidth,info.frameHeight,screen.x-width/2+lunge,screen.y-center-height/2,width,height),screen.z,offset);
  }
  if(f>=3&&f<14){const ef=Math.min(effectInfo.frames-1,Math.floor((f-3)*.09*30)),size=(effectInfo.size??4)/S*meta.pixelsPerUnit,fw=effect.width/8,fh=effect.height/Math.ceil(effectInfo.frames/8);overlay(ctx=>{ctx.globalCompositeOperation='lighter';ctx.drawImage(effect,ef%8*fw,Math.floor(ef/8)*fh,fw,fh,impact.x-size/2,impact.y-size/2,size,size);ctx.globalCompositeOperation='source-over';},impact.z-.25,offset);}
  if(hit.kind==='shell'&&hit.points?.length&&f<4){const p=hit.points[Math.max(0,hit.points.length-4+f)],q=transform(p);overlay(ctx=>{ctx.fillStyle='#ffbe4d';ctx.beginPath();ctx.arc(q.x,q.y,4,0,Math.PI*2);ctx.fill();},q.z,offset);}
  // Keep the two captions readable, even for a character standing on the rampart.
  c.drawImage(atlas,0,f*H,W,36,0,0,W,36);c.drawImage(atlas,0,f*H+244,W,36,0,244,W,36);
  if(event.still)return {attachment:canvas.toBuffer('image/png'),name:event.wall+'-'+event.healthPercent+'.png'};
  frames.push(c.getImageData(0,0,W,H).data);
 }
 const sample=[];for(const frame of frames)for(let i=0;i<frame.length;i+=64)sample.push(...frame.subarray(i,i+4));const palette=quantize(Uint8Array.from(sample),256),gif=GIFEncoder();
 for(const [i,frame]of frames.entries())gif.writeFrame(applyPalette(frame,palette),W,H,{palette:i?undefined:palette,delay:i===frames.length-1?650:90,repeat:-1});gif.finish();
 return {attachment:Buffer.from(gif.bytes()),name:event.wall+'-'+event.healthPercent+'.gif'};
}
module.exports={renderReplay,project};
