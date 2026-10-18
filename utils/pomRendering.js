// Rhumertume pictures: the pom's words in a Sky bubble (the activity's frame, tail and font; a still picture at
// stage 1, a shaking GIF at stage 2, an inverted, Zalgo-ridden, glitching GIF at stage 3) and the Pokémon-like
// evolution GIFs announced in the roleplay chat (character -> pom, pom -> next stage), which play once.
const path=require('node:path'),fs=require('node:fs');
const {createCanvas,loadImage,GlobalFonts}=require('@napi-rs/canvas');
const {GIFEncoder,quantize,applyPalette}=require('gifenc');
const SKY=path.join(__dirname,'../activity/assets/sky');
const POM_BASE='https://leliberlnews.fr/activite/assets/sky/chat/pom';
const BG='#313338',W=560,LEFT=34,LINE=31,EVOLUTION=256;
GlobalFonts.registerFromPath(path.join(SKY,'dialogue/AveriaSansLibre-Regular.ttf'),'AveriaSky');
const font=size=>`${size}px AveriaSky`;
let assets=null;
async function load(){
 if(!assets){
  const [frame,tail]=await Promise.all(['frame.png','tail.png'].map(n=>loadImage(fs.readFileSync(path.join(SKY,'dialogue',n)))));
  assets={frame,tail,inverted:invertedFrame(frame)};
 }
 return assets;
}
// Fire Emblem: the frame with its colours inverted, made opaque
function invertedFrame(frame){
 const c=createCanvas(frame.width,frame.height),x=c.getContext('2d');x.drawImage(frame,0,0);
 const img=x.getImageData(0,0,c.width,c.height),d=img.data;
 for(let i=0;i<d.length;i+=4){d[i]=255-d[i];d[i+1]=255-d[i+1];d[i+2]=255-d[i+2];if(d[i+3]>120)d[i+3]=255;}
 x.putImageData(img,0,0);return c;
}
// the frame as a CSS border image: 32 px slices drawn as a 24 px border
function borderImage(x,tex,dx,dy,w,h,s=32,b=24){
 const tw=tex.width,th=tex.height,cols=[[0,s,0,b],[s,tw-s,b,w-b],[tw-s,tw,w-b,w]],rows=[[0,s,0,b],[s,th-s,b,h-b],[th-s,th,h-b,h]];
 for(const [sx0,sx1,ex0,ex1] of cols)for(const [sy0,sy1,ey0,ey1] of rows)x.drawImage(tex,sx0,sy0,sx1-sx0,sy1-sy0,dx+ex0,dy+ey0,ex1-ex0,ey1-ey0);
}
const isAngry=w=>/!/.test(w)||(w===w.toLocaleUpperCase('fr')&&w!==w.toLocaleLowerCase('fr'));
// French punctuation stays with the word before it
function words(text){const out=[];for(const t of String(text).split(/\s+/).filter(Boolean)){if(out.length&&/^[?!:;»]+$/.test(t))out[out.length-1]+='\u00a0'+t;else out.push(t);}return out;}
function layout(x,list,maxw,angrySize){
 const out=[];let px=0,py=0;x.font=font(24);const space=x.measureText(' ').width;
 for(const w of list){x.font=font(angrySize&&isAngry(w)?angrySize:24);const width=x.measureText(w).width;if(px+width>maxw&&px>0){px=0;py+=LINE;}out.push([w,px,py]);px+=width+space;}
 return {lines:out,height:py+LINE};
}
function bubble(x,tex,tail,height,dx=0,dy=0){
 const h=height+24*2+6;
 x.save();x.shadowColor='rgba(0,0,0,.6)';x.shadowBlur=2;x.shadowOffsetX=2;x.shadowOffsetY=3;borderImage(x,tex,LEFT+dx,dy,W-LEFT-6,h);x.restore();
 const tw=tail.height*1.5,th=tail.width*1.5;   // tail.png points down: turned to point left
 x.save();x.translate(LEFT+4+dx-tw,h/2-th/2+dy);x.translate(tw,0);x.rotate(Math.PI/2);x.drawImage(tail,0,0,th,tw);x.restore();
 return {h,ox:LEFT+24+dx,oy:25+dy};
}
function text(x,word,px,py,size,fill,shade='#000'){x.font=font(size);x.textBaseline='top';x.fillStyle=shade;x.fillText(word,px+1,py+2);x.fillStyle=fill;x.fillText(word,px,py);}
function seeded(seed){let s=seed>>>0||1;return()=>((s=Math.imul(s^s>>>15,1|s)+0x6D2B79F5|0,(s^s>>>14)>>>0)/4294967296);}
// one GIF; each frame quantized on its own; once=true: no loop extension (plays once)
function encode(frames,delays,{once=false}={}){
 const gif=GIFEncoder();
 frames.forEach((c,i)=>{const {width:w,height:h}=c,data=c.getContext('2d').getImageData(0,0,w,h).data,palette=quantize(data,256);
  gif.writeFrame(applyPalette(data,palette),w,h,{palette,delay:Array.isArray(delays)?delays[i]:delays,...(i===0?{repeat:once?-1:0}:{})});});
 gif.finish();return Buffer.from(gif.bytes());
}
async function renderBubble(message,stage,seed=Date.now()){
 const {frame,tail,inverted}=await load(),list=words(message),probe=createCanvas(10,10).getContext('2d');
 if(stage<=1){
  const {lines,height}=layout(probe,list,W-LEFT-54);const c=createCanvas(W,height+64),x=c.getContext('2d');x.fillStyle=BG;x.fillRect(0,0,W,c.height);
  const b=bubble(x,frame,tail,height);for(const [w,px,py] of lines)text(x,w,b.ox+px,b.oy+py,24,'#fff');
  return {attachment:c.toBuffer('image/png'),name:'pom.png'};
 }
 const rng=seeded(seed),frames=[];
 if(stage===2){
  const {lines,height}=layout(probe,list,W-LEFT-54,30);
  for(let f=0;f<10;f++){
   const c=createCanvas(W,height+66),x=c.getContext('2d');x.fillStyle=BG;x.fillRect(0,0,W,c.height);
   const sx=Math.round(rng()*6-3),sy=Math.round(rng()*4-2),b=bubble(x,frame,tail,height,sx,sy);
   for(const [w,px,py] of lines){
    if(isAngry(w))text(x,w,b.ox+px+Math.round(rng()*4-2),b.oy+py-3+Math.round(rng()*3-2),24+Math.round(2+rng()*4),'#ff6046');
    else text(x,w,b.ox+px,b.oy+py,24,'#fff');
   }
   frames.push(c);
  }
  return {attachment:encode(frames,70),name:'pom.gif'};
 }
 const {lines,height}=layout(probe,list,W-LEFT-54);
 for(let f=0;f<14;f++){
  const c=createCanvas(W,height+66),x=c.getContext('2d');x.fillStyle=BG;x.fillRect(0,0,W,c.height);
  const b=bubble(x,inverted,tail,height,Math.round(rng()*4-2));
  for(const [w,px,py] of lines){
   const core=w.replace(/[.!?…,\u00a0]/g,''),legible=core&&core===core.toLocaleUpperCase('fr')&&!/POM/.test(core);
   const tx=b.ox+px+Math.round(rng()*2-1),ty=b.oy+py+Math.round(rng()*2-1);
   text(x,w,tx,ty,24,legible?'#820018':'#18081e','#fff5e6');
   x.font=font(24);let cx=tx;
   for(const ch of w){   // Zalgo: strokes crawling out of each letter
    const cw=x.measureText(ch).width;
    for(const side of [-1,1])if(rng()<.8){let mx=cx+2+rng()*Math.max(1,cw-4),my=ty+(side<0?6:28);
     for(let n=1+Math.floor(rng()*4);n--;){const ex=mx+Math.round(rng()*6-3),ey=my+side*(3+Math.round(rng()*5));
      x.strokeStyle=`rgb(${90+Math.round(rng()*110)},0,${30+Math.round(rng()*90)})`;x.lineWidth=1;x.beginPath();x.moveTo(mx,my);x.lineTo(ex,ey);x.stroke();mx=ex;my=ey;}}
    cx+=cw;
   }
  }
  if(f%4===1||f%4===2)for(let n=2+Math.floor(rng()*4);n--;){   // glitch: shifted slices
   const y0=Math.floor(rng()*(c.height-12)),hh=3+Math.floor(rng()*10),band=x.getImageData(0,y0,W,hh);x.putImageData(band,Math.round(rng()*48-24),y0);
  }
  if(f%5===0){   // red / blue split
   const img=x.getImageData(0,0,W,c.height),d=img.data,copy=new Uint8ClampedArray(d);
   for(let y=0;y<c.height;y++)for(let i=0;i<W;i++){const p=(y*W+i)*4;d[p]=copy[(y*W+Math.max(0,i-4))*4];d[p+2]=copy[(y*W+Math.min(W-1,i+4))*4+2];}
   x.putImageData(img,0,0);
  }
  frames.push(c);
 }
 return {attachment:encode(frames,90),name:'pom.gif'};
}
const slug=name=>name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const avatarURL=(character,stage)=>`${POM_BASE}/${slug(character)}-${stage}.png`;
// the character's own sprite (activity sheet, facing south), else the plain pom-tiron
async function characterSprite(character){
 const sheet=JSON.parse(fs.readFileSync(path.join(SKY,'characters.json'),'utf8'))[character];
 if(!sheet?.texture)return null;
 const tex=await loadImage(fs.readFileSync(path.join(SKY,sheet.texture))),c=createCanvas(sheet.frameWidth,sheet.frameHeight);
 c.getContext('2d').drawImage(tex,6*sheet.frameWidth,0,sheet.frameWidth,sheet.frameHeight,0,0,sheet.frameWidth,sheet.frameHeight);return c;
}
async function pomSprite(character,stage){
 const response=await fetch(avatarURL(character,stage));
 if(!response.ok)throw Error(`sprite ${character} ${stage} : HTTP ${response.status}`);
 return loadImage(Buffer.from(await response.arrayBuffer()));
}
function bounds(img){
 const c=createCanvas(img.width,img.height),x=c.getContext('2d');x.drawImage(img,0,0);const d=x.getImageData(0,0,c.width,c.height).data;
 let x0=c.width,y0=c.height,x1=-1,y1=-1;
 for(let y=0;y<c.height;y++)for(let i=0;i<c.width;i++)if(d[(y*c.width+i)*4+3]>10){x0=Math.min(x0,i);y0=Math.min(y0,y);x1=Math.max(x1,i);y1=Math.max(y1,y);}
 return x1<0?[0,0,c.width,c.height]:[x0,y0,x1+1,y1+1];
}
// the sprite scaled to fit `box`, bottom-centred on the evolution canvas (pixel art: whole factors, no smoothing)
function fitted(img,box,pixel){
 const [x0,y0,x1,y1]=bounds(img),w=x1-x0,h=y1-y0;let f=box/Math.max(w,h);if(pixel&&f>=1)f=Math.floor(f);
 const c=createCanvas(EVOLUTION,EVOLUTION),x=c.getContext('2d');x.imageSmoothingEnabled=!pixel;
 x.drawImage(img,x0,y0,w,h,Math.round((EVOLUTION-w*f)/2),Math.round(EVOLUTION-24-h*f),Math.round(w*f),Math.round(h*f));return c;
}
function tinted(sprite,amount){
 const c=createCanvas(EVOLUTION,EVOLUTION),x=c.getContext('2d');x.drawImage(sprite,0,0);
 x.globalCompositeOperation='source-atop';x.fillStyle=`rgba(255,255,255,${amount})`;x.fillRect(0,0,EVOLUTION,EVOLUTION);return c;
}
function evolutionFrame(sprite,{glow=0,flash=0,sparkles=null}={}){
 const c=createCanvas(EVOLUTION,EVOLUTION),x=c.getContext('2d');x.fillStyle=BG;x.fillRect(0,0,EVOLUTION,EVOLUTION);
 if(sprite){x.save();if(glow){x.shadowColor='rgba(255,240,200,.95)';x.shadowBlur=glow;}x.drawImage(sprite,0,0);x.restore();}
 if(sparkles){x.lineWidth=2;for(const [sx,sy,r,a] of sparkles){x.strokeStyle=`rgba(255,250,220,${a})`;x.beginPath();x.moveTo(sx-r,sy);x.lineTo(sx+r,sy);x.moveTo(sx,sy-r);x.lineTo(sx,sy+r);x.stroke();}}
 if(flash){x.fillStyle=`rgba(255,255,255,${flash})`;x.fillRect(0,0,EVOLUTION,EVOLUTION);}
 return c;
}
// from: 0 = the character itself, 1 or 2 = the pom's stage; to: the next stage
async function renderEvolution(character,from,to,seed=Date.now()){
 const before=from===0?await characterSprite(character):await pomSprite(character,from);
 const old=before?fitted(before,from===0?190:220,from===0):evolutionFrame(null),young=fitted(await pomSprite(character,to),220,false);
 const rng=seeded(seed),frames=[],delays=[],add=(c,ms)=>{frames.push(c);delays.push(ms);};
 add(evolutionFrame(old),900);
 for(let i=1;i<=6;i++)add(evolutionFrame(tinted(old,i/6),{glow:6+i}),70);                       // whitening
 const whiteOld=tinted(old,1),whiteNew=tinted(young,1);
 [320,260,210,170,140,110,90,70,60,50,40,40,40,40].forEach((ms,i)=>add(evolutionFrame(i%2?whiteNew:whiteOld,{glow:12}),ms));   // faster and faster
 add(evolutionFrame(null,{flash:1}),60);add(evolutionFrame(whiteNew,{flash:.5}),60);
 for(let i=1;i<=8;i++){const t=i/8,sp=Array.from({length:10},()=>[20+rng()*216,20+rng()*206,2+rng()*4,1-t]);
  add(evolutionFrame(tinted(young,1-t),{glow:14*(1-t)+2,sparkles:sp}),80);}                       // colours come back
 add(evolutionFrame(young),2500);
 return {attachment:encode(frames,delays,{once:true}),name:'evolution.gif'};
}
module.exports={renderBubble,renderEvolution,avatarURL,slug,words};