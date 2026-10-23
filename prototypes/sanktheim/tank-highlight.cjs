const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),shared=require('./tank-shared.cjs');
const assets=path.resolve(__dirname,'../../activity/assets/sky'),root=path.join(__dirname,'assets/highlights');
function project(p,m,view,width,height){const w=m[3]*p.x+m[7]*p.y+m[11]*p.z+m[15];return {x:(1+(m[0]*p.x+m[4]*p.y+m[8]*p.z+m[12])/w)*width/2,y:(1-(m[1]*p.x+m[5]*p.y+m[9]*p.z+m[13])/w)*height/2,z:-(view[2]*p.x+view[6]*p.y+view[10]*p.z+view[14])};}
async function renderTankHighlight(event){
 const {createCanvas,loadImage}=require('@napi-rs/canvas'),{GIFEncoder,quantize,applyPalette}=require('gifenc');
 const laneIndex=Math.max(0,Math.min(2,Math.round(((event.position?.z??0)+.3)/.3))),stem=path.join(root,'tank-route-'+laneIndex),meta=JSON.parse(fs.readFileSync(stem+'.json')),atlas=await loadImage(fs.readFileSync(stem+'.webp')),depth=zlib.gunzipSync(fs.readFileSync(stem+'.depth'));
 const {width:W,height:H,delay}=meta,canvas=createCanvas(W,H),c=canvas.getContext('2d'),layer=createCanvas(W,H),lc=layer.getContext('2d');lc.imageSmoothingEnabled=c.imageSmoothingEnabled=false;
 const crew=await Promise.all(event.crew.slice(0,3).map(async member=>{const name=shared.texture(member).replace('/assets/sky/',''),fallback=shared.texture({...member,character:'Estelle'}).replace('/assets/sky/','');return {member,image:await loadImage(path.join(assets,name)).catch(()=>loadImage(path.join(assets,fallback)))};}));
 const vacuum=await loadImage(path.join(assets,'chat/vacuum.png')),frames=[],focal=H/(2*Math.tan(20*Math.PI/180)),actors=[];
 const catalogue=require('../../activity/assets/sky/characters.json'),variants=require('./pom-variants.cjs');
 for(const a of event.replay?.actors??[]){
  let info,file;if(a.pom){const variant=variants.variant(a);info={height:variants.height(variant),frameWidth:256,frameHeight:256,columns:1,directions:1,idle:[0],run:[0]};file=path.join(assets,'chat/pom',a.character.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/^schera$/,'scherazard')+'-'+variant+'.png');}
  else if(a.soldier){info={height:5.12,centerY:1.04,frameWidth:256,frameHeight:256,columns:8,directions:8,idle:[0,1,2,3,4,5,6,7],run:[0,1,2,3,4,5,6,7]};file=path.join(__dirname,'assets/guards/0.png');}
  else{info=catalogue[a.character];if(!info)continue;file=path.join(assets,info.texture);}
  try{actors.push({a,info,image:await loadImage(fs.readFileSync(file))});}catch(error){if(error.code!=='ENOENT')throw error;}
 }
 function overlay(draw,z,offset){lc.clearRect(0,0,W,H);draw(lc);const src=lc.getImageData(0,0,W,H).data,pixels=c.getImageData(0,0,W,H),dst=pixels.data;for(let i=0;i<W*H;i++){const k=i*4,a=src[k+3]/255;if(!a||z>depth.readUInt16LE(offset+i*2)/256+.025)continue;for(let n=0;n<3;n++)dst[k+n]=Math.round(src[k+n]*a+dst[k+n]*(1-a));}c.putImageData(pixels,0,0);}
 for(const [f,pose]of meta.poses.entries()){
  if(event.still&&f!==Math.min(12,meta.poses.length-1))continue;
  c.drawImage(atlas,0,f*H,W,H,0,0,W,H);const sprites=[];
  for(const [i,{member,image}]of crew.entries()){
   const local=shared.crewPose(i,f*delay),p={x:pose.position.x+local.x,y:pose.position.y+local.y,z:pose.position.z+local.z};
   sprites.push({image,p,width:shared.CREW_SIZE,height:shared.CREW_SIZE});
   if(member.kind!=='funebre')sprites.push({image:vacuum,p:{...p,y:p.y-shared.VACUUM_DROP},width:shared.VACUUM_WIDTH,height:shared.VACUUM_HEIGHT});
  }
  for(const {a,info,image}of actors){
   const direction=(info.directions??8)===1?0:((Math.round((Math.atan2(a.heading?.dx??1,a.heading?.dz??0)-Math.atan2(pose.view[0],pose.view[8]))/(Math.PI/4))+8)%8),poses=a.moving?info.run:info.idle,frame=poses[Math.floor(f*.8)%poses.length]*(info.directions??8)+direction;
   sprites.push({image,p:{x:a.x*shared.SCALE,y:a.y*shared.SCALE+(info.centerY??info.height/2),z:a.z*shared.SCALE},width:info.height*info.frameWidth/info.frameHeight,height:info.height,source:[frame%info.columns*info.frameWidth,Math.floor(frame/info.columns)*info.frameHeight,info.frameWidth,info.frameHeight]});
  }
  for(const sprite of sprites.map(s=>({...s,q:project(s.p,pose.matrix,pose.view,W,H)})).sort((a,b)=>b.q.z-a.q.z)){
   const {q}=sprite;if(q.z<=.1)continue;const size=focal/q.z;overlay(ctx=>{const dest=[q.x-sprite.width*size/2,q.y-sprite.height*size/2,sprite.width*size,sprite.height*size];if(sprite.source)ctx.drawImage(sprite.image,...sprite.source,...dest);else ctx.drawImage(sprite.image,...dest);},q.z,f*W*H*2);
  }
  if(event.still)return {attachment:canvas.toBuffer('image/png'),name:'char-des-poms.png'};
  frames.push(c.getImageData(0,0,W,H).data);
 }
 const sample=[];for(const frame of frames)for(let i=0;i<frame.length;i+=64)sample.push(...frame.subarray(i,i+4));const palette=quantize(Uint8Array.from(sample),256),gif=GIFEncoder();
 for(const [i,frame]of frames.entries())gif.writeFrame(applyPalette(frame,palette),W,H,{palette:i?undefined:palette,delay,repeat:-1});gif.finish();return {attachment:Buffer.from(gif.bytes()),name:'char-des-poms.gif'};
}
module.exports={renderTankHighlight,project};
