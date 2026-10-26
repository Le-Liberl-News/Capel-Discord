// Rhumertume pictures: the pom's words in a Sky bubble (the activity's frame, tail and font; a still picture at
// stage 1, a shaking GIF at stage 2, an inverted, Zalgo-ridden, glitching GIF at stage 3) and the Pokémon-like
// evolution GIFs announced in the roleplay chat (character -> pom, pom -> next stage), which play once.
const path=require('node:path'),fs=require('node:fs');
const {createCanvas,loadImage,GlobalFonts}=require('@napi-rs/canvas');
const {GIFEncoder,quantize,applyPalette}=require('gifenc');
const {render}=require('./mediaRender');
// the pictures they are made of, kept from the retired activity's assets (same layout)
const SKY=path.join(__dirname,'../resources/pom');
const POM_BASE='https://leliberlnews.fr/activite/assets/sky/chat/pom';
const W=560,LEFT=34,LINE=31,EVOLUTION=256;
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
function words(text){const out=[];for(const t of String(text).split(/\s+/).filter(Boolean)){if(out.length&&/^[?!:;»]+$/.test(t)&&!EMOJI.test(out[out.length-1]))out[out.length-1]+='\u00a0'+t;else out.push(t);}return out;}
// the server's custom emojis (<:name:id>, <a:name:id>) are drawn as their pictures, the size of a letter
const EMOJI=/^<a?:(\w+):(\d+)>$/,EMOJI_SIZE=27;
async function emojiPictures(list){
 const pictures=new Map();
 await Promise.all([...new Set(list.map(w=>w.match(EMOJI)?.[2]).filter(Boolean))].map(async id=>{
  try{const r=await fetch(`https://cdn.discordapp.com/emojis/${id}.png?size=64`);if(r.ok)pictures.set(id,await loadImage(Buffer.from(await r.arrayBuffer())));}catch{}
 }));
 return pictures;
}
// a word, or an emoji: its picture, else its name between colons
function put(x,pictures,w,px,py,draw){
 const m=w.match(EMOJI),picture=m&&pictures.get(m[2]);
 if(picture){x.drawImage(picture,px,py+1,EMOJI_SIZE,EMOJI_SIZE);return;}
 draw(m?`:${m[1]}:`:w);
}
function layout(x,list,maxw,angrySize,pictures=new Map()){
 const out=[];let px=0,py=0;x.font=font(24);const space=x.measureText(' ').width;
 for(const w of list){x.font=font(angrySize&&isAngry(w)?angrySize:24);const m=w.match(EMOJI),width=m&&pictures.get(m[2])?EMOJI_SIZE:x.measureText(m?`:${m[1]}:`:w).width;if(px+width>maxw&&px>0){px=0;py+=LINE;}out.push([w,px,py]);px+=width+space;}
 return {lines:out,height:py+LINE};
}
function bubble(x,tex,tail,height,dx=0,dy=0){
 const h=height+24*2+6;
 x.save();x.shadowColor='rgba(0,0,0,.6)';x.shadowBlur=2;x.shadowOffsetX=2;x.shadowOffsetY=3;borderImage(x,tex,LEFT+dx,dy,W-LEFT-6,h);x.restore();
 const tw=tail.height*1.5,th=tail.width*1.5;   // tail.png points down: turned to point left, flipped to point up-left
 x.save();x.translate(LEFT+4+dx-tw,h/2-th/2+dy);x.translate(0,th);x.scale(1,-1);x.translate(tw,0);x.rotate(Math.PI/2);x.drawImage(tail,0,0,th,tw);x.restore();
 return {h,ox:LEFT+24+dx,oy:25+dy};
}
// the pictures joined to the message, under the words, in the bubble: as wide as the text at most, 360 px high at
// most, one under the other (a GIF: its first frame)
const PICTURE_W=W-LEFT-54,PICTURE_H=360,PICTURE_GAP=10;
async function joined(images=[]){
 const out=[];
 for(const buffer of images){try{const picture=await loadImage(buffer),k=Math.min(1,PICTURE_W/picture.width,PICTURE_H/picture.height);
  out.push({picture,w:Math.max(1,Math.round(picture.width*k)),h:Math.max(1,Math.round(picture.height*k))});}catch{}}
 return out;
}
// the words' height and the pictures': the bubble's content
function content(list,height,pictures){
 const words=list.length?height:0;let y=words;
 const placed=pictures.map(p=>{y+=y?PICTURE_GAP:0;const at={...p,y};y+=p.h;return at;});
 return {height:Math.max(y,LINE),placed};
}
function drawPictures(x,placed,b){for(const p of placed)x.drawImage(p.picture,b.ox,b.oy+p.y,p.w,p.h);}
function text(x,word,px,py,size,fill,shade='#000'){x.font=font(size);x.textBaseline='top';x.fillStyle=shade;x.fillText(word,px+1,py+2);x.fillStyle=fill;x.fillText(word,px,py);}
function seeded(seed){let s=seed>>>0||1;return()=>((s=Math.imul(s^s>>>15,1|s)+0x6D2B79F5|0,(s^s>>>14)>>>0)/4294967296);}
// one GIF on a transparent background; each frame quantized on its own; once=true: no loop extension (plays once).
// A GIF pixel is either opaque or transparent: the nearly transparent ones are dropped, the half transparent edges
// (the frame's shadow, the glows) are blended onto Discord's dark grey.
const [BR,BGG,BB]=[0x31,0x33,0x38];
function flatten(data,premultiplied=false){
 for(let i=0;i<data.length;i+=4){const a=data[i+3];if(a===255)continue;
  if(a<96){data[i]=data[i+1]=data[i+2]=data[i+3]=0;continue;}
  const k=a/255,m=premultiplied?1:k;data[i]=Math.round(data[i]*m+BR*(1-k));data[i+1]=Math.round(data[i+1]*m+BGG*(1-k));data[i+2]=Math.round(data[i+2]*m+BB*(1-k));data[i+3]=255;}
 return data;
}
// A GIF written while it is drawn (the memory-saving way of the adventure's cards, utils/adventure/animations.js): each
// frame is quantized as soon as it is given, so the renderer can draw the next one on the same canvas, and written
// when the next one comes; budget (utils/mediaRender.js) is checked at every frame. finish(last): the last frame's
// delay, set only then.
function stream({once=false,budget=null}={}){
 const gif=GIFEncoder();let written=0,duration=0,pending=null;
 function write(){const f=pending;gif.writeFrame(f.index,f.w,f.h,{palette:f.palette,delay:f.delay,transparent:true,transparentIndex:f.transparentIndex,dispose:2,...(written===0?{repeat:once?-1:0}:{})});written++;duration+=f.delay;pending=null;}
 return {
  add(c,delay){
   budget?.check(gif.bytesView().length);if(pending)write();
   // the canvas' own pixels (premultiplied RGBA), not getImageData: its native copies, one a frame, were freed so late
   // that a GIF's worth of them piled up (+120 MB for 150 frames)
   const {width:w,height:h}=c,data=flatten(c.data(),true);
   const palette=quantize(data,255,{format:'rgba4444',oneBitAlpha:true}),index=applyPalette(data,palette,'rgba4444');
   let transparentIndex=palette.findIndex(p=>p[3]===0);if(transparentIndex<0)transparentIndex=0;
   pending={index,palette,transparentIndex,w,h,delay};
  },
  finish(last){if(pending){if(last!=null)pending.delay=last;write();}gif.finish();return Buffer.from(gif.bytes());},
  get frames(){return written+(pending?1:0);},get duration(){return duration;}
 };
}
// one canvas drawn again for each frame (cleared, its drawing state reset), instead of a new one every frame: native
// canvases are freed late, and a GIF's worth of them is what made the RAM climb
function scratch(){let c=null;return (w,h)=>{w=Math.ceil(w);h=Math.ceil(h);if(!c||c.width!==w||c.height!==h)c=createCanvas(w,h);const x=c.getContext('2d');x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.globalCompositeOperation='source-over';x.imageSmoothingEnabled=true;x.clearRect(0,0,w,h);return c;};}
function encode(frames,delays,options){const out=stream(options);frames.forEach((c,i)=>out.add(c,Array.isArray(delays)?delays[i]:delays));return out.finish();}
// a GIF drawn through the shared media gate: one render at a time, within its memory and time budget (limits:
// createBudget's, mediaRender.js); null when declined. The announcements' GIFs are bigger than the cards': their
// characters' sheets alone take tens of MB, so the machine's free memory is what guards them, checked at every frame.
const MIB=1048576,ANNOUNCEMENT={maxGrowth:96*MIB,maxDuration:15000,maxBytes:2*MIB};
const gated=(draw,limits=ANNOUNCEMENT)=>(...args)=>render(budget=>draw(budget,...args),{limits});
async function renderBubble(message,stage,seed=Date.now(),images=[]){
 stage=1; // Emergency: all chat bubbles are still PNGs, including evolved poms.
 const {frame,tail,inverted}=await load(),list=words(message),probe=createCanvas(10,10).getContext('2d'),pictures=await emojiPictures(list);
 const attached=await joined(images);
 if(stage<=1){
  const {lines,height:textH}=layout(probe,list,W-LEFT-54,0,pictures),{height,placed}=content(list,textH,attached);
  const c=createCanvas(W,height+64),x=c.getContext('2d');
  const b=bubble(x,frame,tail,height);for(const [w,px,py] of lines)put(x,pictures,w,b.ox+px,b.oy+py,t=>text(x,t,b.ox+px,b.oy+py,24,'#fff'));
  drawPictures(x,placed,b);
  const img=x.getImageData(0,0,c.width,c.height);flatten(img.data);x.putImageData(img,0,0);   // the same opaque bubble as the GIFs
  return {attachment:c.toBuffer('image/png'),name:'pom.png'};
 }
 const rng=seeded(seed),frames=[];
 if(stage===2){
  const {lines,height:textH}=layout(probe,list,W-LEFT-54,30,pictures),{height,placed}=content(list,textH,attached);
  for(let f=0;f<10;f++){
   const c=createCanvas(W,height+66),x=c.getContext('2d');
   const sx=Math.round(rng()*6-3),sy=Math.round(rng()*4-2),b=bubble(x,frame,tail,height,sx,sy);
   for(const [w,px,py] of lines){
    if(w.match(EMOJI))put(x,pictures,w,b.ox+px,b.oy+py,t=>text(x,t,b.ox+px,b.oy+py,24,'#fff'));
    else if(isAngry(w))text(x,w,b.ox+px+Math.round(rng()*4-2),b.oy+py-3+Math.round(rng()*3-2),24+Math.round(2+rng()*4),'#ff6046');
    else text(x,w,b.ox+px,b.oy+py,24,'#fff');
   }
   drawPictures(x,placed,b);
   frames.push(c);
  }
  return {attachment:encode(frames,70),name:'pom.gif'};
 }
 const {lines,height:textH}=layout(probe,list,W-LEFT-54,0,pictures),{height,placed}=content(list,textH,attached);
 for(let f=0;f<14;f++){
  const c=createCanvas(W,height+66),x=c.getContext('2d');
  const b=bubble(x,inverted,tail,height,Math.round(rng()*4-2));
  drawPictures(x,placed,b);
  for(const [w,px,py] of lines){
   if(w.match(EMOJI)){put(x,pictures,w,b.ox+px,b.oy+py,t=>text(x,t,b.ox+px,b.oy+py,24,'#18081e','#fff5e6'));continue;}
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
 const local=path.join(SKY,'chat/pom',slug(character)+'-'+stage+'.png');
 if(fs.existsSync(local))return loadImage(fs.readFileSync(local));
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
 const c=createCanvas(EVOLUTION,EVOLUTION),x=c.getContext('2d');
 if(sprite){x.save();if(glow){x.shadowColor='rgba(255,240,200,.95)';x.shadowBlur=glow;}x.drawImage(sprite,0,0);x.restore();}
 if(sparkles){x.lineWidth=2;for(const [sx,sy,r,a] of sparkles){x.strokeStyle=`rgba(255,250,220,${a})`;x.beginPath();x.moveTo(sx-r,sy);x.lineTo(sx+r,sy);x.moveTo(sx,sy-r);x.lineTo(sx,sy+r);x.stroke();}}
 if(flash){x.fillStyle=`rgba(255,255,255,${flash})`;x.fillRect(0,0,EVOLUTION,EVOLUTION);}
 return c;
}
// the wizard forms (Pom-d'aspi, Pom funèbre) are shown on their orbal vacuum (chat/vacuum.png, lying like a broom,
// handle forward), so that the name makes sense
const VACUUM=path.join(SKY,'chat/vacuum.png');
async function onVacuum(pom){
 if(!fs.existsSync(VACUUM))return pom;
 const vacuum=await loadImage(fs.readFileSync(VACUUM)),[x0,y0,x1,y1]=bounds(pom),w=x1-x0,h=y1-y0;
 const vw=w*1.6,vh=vw*vacuum.height/vacuum.width,c=createCanvas(Math.ceil(vw),Math.ceil(h+vh*.75)),x=c.getContext('2d');
 const seat=vw*.32;   // the body, under the pom, a quarter of the vacuum from its back
 x.drawImage(vacuum,0,h-vh*.25,vw,vh);x.drawImage(pom,x0,y0,w,h,seat-w/2,0,w,h);
 return c;
}
const stageSprite=async(character,stage)=>{const pom=await pomSprite(character,stage);return stage==='aspi'||stage==='funebre'?onVacuum(pom):pom;};
// from: 0 = the character itself, 1, 2, 'aspi' = the pom's stage; to: the next stage (2, 3, 'aspi' or 'funebre')
const renderEvolution=gated(evolution);
async function evolution(budget,character,from,to,seed=Date.now()){
 const before=from===0?await characterSprite(character):await stageSprite(character,from);
 const old=before?fitted(before,from===0?190:220,from===0):evolutionFrame(null);
 // from the character: the pom comes out smaller than the human (about two thirds of its height)
 const young=fitted(await stageSprite(character,to),from===0?Math.round((bounds(old)[3]-bounds(old)[1])*.68):220,false);
 const rng=seeded(seed),out=stream({once:true,budget}),half=scratch(),add=(c,ms)=>{const small=half(c.width/2,c.height/2),x=small.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(c,0,0,small.width,small.height);out.add(small,ms);};
 add(evolutionFrame(old),900);
 for(let i=1;i<=6;i++)add(evolutionFrame(tinted(old,i/6),{glow:6+i}),70);                       // whitening
 const whiteOld=tinted(old,1),whiteNew=tinted(young,1);
 [320,260,210,170,140,110,90,70,60,50,40,40,40,40].forEach((ms,i)=>add(evolutionFrame(i%2?whiteNew:whiteOld,{glow:12}),ms));   // faster and faster
 add(evolutionFrame(null,{flash:1}),60);add(evolutionFrame(whiteNew,{flash:.5}),60);
 for(let i=1;i<=8;i++){const t=i/8,sp=Array.from({length:10},()=>[20+rng()*216,20+rng()*206,2+rng()*4,1-t]);
  add(evolutionFrame(tinted(young,1-t),{glow:14*(1-t)+2,sparkles:sp}),80);}                       // colours come back
 add(evolutionFrame(young),2500);
 return {attachment:out.finish(),name:'evolution.gif'};
}
// the bite (rage): the pom runs in from the left, leaps on its victim — blood —, crawls over the body while the victim
// shakes, stops to bite (more blood), then the victim runs off to the right with the pom still hanging on.
// Blood: the tiles of Third/mgblood (the texture of Antoine's bite, msc0601).
const BITE_W=520,BITE_H=260,GROUND=238,BLOOD=path.join(SKY,'effects/native/effects/Third/mgblood.png');
const SOUTH_WEST=7,EAST=4;
// the game's running animation (SC chip after the walking one), for the characters that have one: chat/run/index.json
function runSheetOf(character){
 const index=path.join(SKY,'chat/run/index.json'),sheet=fs.existsSync(index)&&JSON.parse(fs.readFileSync(index,'utf8'))[character];
 return sheet?loadImage(fs.readFileSync(path.join(SKY,sheet.texture))).then(tex=>({sheet,tex})):null;
}
async function sheetOf(character){
 const sheet=JSON.parse(fs.readFileSync(path.join(SKY,'characters.json'),'utf8'))[character];
 return sheet?.texture?{sheet,tex:await loadImage(fs.readFileSync(path.join(SKY,sheet.texture)))}:null;
}
// one frame of the sheet: columns are the 8 directions, rows the run frames
function sheetFrame(s,direction,frame){
 const {sheet,tex}=s,c=(s.frame??=scratch())(sheet.frameWidth,sheet.frameHeight);   // one canvas per sheet, drawn again
 c.getContext('2d').drawImage(tex,direction*sheet.frameWidth,frame*sheet.frameHeight,sheet.frameWidth,sheet.frameHeight,0,0,sheet.frameWidth,sheet.frameHeight);return c;
}
// blood tiles (x, y, size on the 256 texture): splashes, drops, a big burst
const SPLASH=[[0,32,32],[32,32,32]],DROPS=[[0,192,32],[32,192,32],[64,192,32],[96,192,32],[64,224,32],[96,224,32]],BURST=[[128,192,64],[192,192,64]];
const renderBite=gated(bite);
async function bite(budget,character,stage,victim,victimStage=0,seed=Date.now()){
 const rng=seeded(seed),blood=await loadImage(fs.readFileSync(BLOOD));
 const sheet=victimStage?null:await sheetOf(victim),running=victimStage?null:await runSheetOf(victim);
 const victimPom=victimStage?await pomSprite(victim,victimStage):null;
 if(!sheet&&!victimPom)return null;
 const pom=await pomSprite(character,stage),[px0,py0,px1,py1]=bounds(pom);
 // the victim twice as big as its sprite (pixel art), the pom about a third of its height
 const VS=2,vh=sheet?sheet.sheet.frameHeight*VS:120,vw=sheet?sheet.sheet.frameWidth*VS:120*(victimPom.width/victimPom.height);
 const ph=Math.round(vh*.36),pw=Math.round(ph*(px1-px0)/(py1-py0));
 const out=stream({once:true,budget}),particles=[];
 let flash=0;
 const spray=(x,y,n,force=1)=>{for(let i=0;i<n;i++){const a=-Math.PI*(.1+.8*rng()),v=(2+rng()*5)*force;
  particles.push({x,y,vx:Math.cos(a)*v*(rng()<.5?-1:1),vy:Math.sin(a)*v,tile:rng()<.7?SPLASH[Math.floor(rng()*2)]:DROPS[1+Math.floor(rng()*2)],size:8+rng()*12,spin:rng()*6.3,life:1});}};
 const bursts=[];
 const burst=(x,y,big)=>bursts.push({x,y,t:0,tile:big?BURST[Math.floor(rng()*2)]:SPLASH[Math.floor(rng()*2)],size:big?130:60});
 const canvas=scratch();
 function draw({vx,vframe,vdir,shake=0,pom:pp,squash=1,bob=0,lean=0,run=false}){
  const c=canvas(BITE_W,BITE_H),x=c.getContext('2d');x.imageSmoothingEnabled=false;
  if(vx!=null){
   const dx=shake?Math.round((rng()*2-1)*shake):0;
   if(run){const {sheet:r}=running;x.drawImage(sheetFrame(running,vdir,vframe),Math.round(vx+dx-r.anchor[0]*VS),GROUND-r.anchor[1]*VS,r.frameWidth*VS,r.frameHeight*VS);}
   else if(sheet){x.save();x.translate(Math.round(vx+dx),GROUND-bob);x.transform(1,0,-lean,1,0,0);x.drawImage(sheetFrame(sheet,vdir,vframe),-Math.round(vw/2),-vh,vw,vh);x.restore();}
   else{x.imageSmoothingEnabled=true;x.drawImage(victimPom,Math.round(vx-vw/2+dx),GROUND-vh,vw,vh);x.imageSmoothingEnabled=false;}
  }
  if(pp){x.imageSmoothingEnabled=true;const w=pw*(2-squash),h=ph*squash;x.drawImage(pom,px0,py0,px1-px0,py1-py0,Math.round(pp[0]-w/2),Math.round(pp[1]-h),Math.round(w),Math.round(h));x.imageSmoothingEnabled=false;}
  for(const b of bursts){const [tx,ty,ts]=b.tile,k=.5+b.t*.7,s=b.size*k;x.globalAlpha=Math.max(0,1-b.t);x.drawImage(blood,tx,ty,ts,ts,b.x-s/2,b.y-s/2,s,s);}
  for(const p of particles){const [tx,ty,ts]=p.tile;x.globalAlpha=Math.min(1,p.life*1.5);x.save();x.translate(p.x,p.y);x.rotate(p.spin);x.drawImage(blood,tx,ty,ts,ts,-p.size/2,-p.size/2,p.size,p.size);x.restore();}
  x.globalAlpha=1;
  if(flash){x.fillStyle=`rgba(255,40,30,${flash})`;x.fillRect(0,0,BITE_W,BITE_H);}
  return c;
 }
 function step(){
  for(const b of bursts)b.t+=.18;for(let i=bursts.length-1;i>=0;i--)if(bursts[i].t>=1)bursts.splice(i,1);
  for(const p of particles){p.x+=p.vx;p.y+=p.vy;p.vy+=.9;p.life-=.03;
   if(p.y>=GROUND-2)p.life=0;}
  for(let i=particles.length-1;i>=0;i--)if(particles[i].life<=0)particles.splice(i,1);
  flash=Math.max(0,flash-.25);
 }
 const add=(state,ms=60)=>{out.add(draw(state),ms);step();};
 const VX=360,chest=[VX-4,GROUND-vh*.42],idle={vx:VX,vframe:0,vdir:sheet?SOUTH_WEST:0};
 const hop=(t,height)=>Math.abs(Math.sin(t*Math.PI))*height;
 // 1. face to face
 add({...idle,pom:[70,GROUND]},500);
 // 2. the pom runs in, hopping
 for(let i=0;i<=12;i++){const t=i/12,x0=70+t*160;add({...idle,pom:[x0,GROUND-hop(t*4,14)],squash:i%2?.9:1.05});}
 // 3. the leap onto the chest
 for(let i=1;i<=7;i++){const t=i/7,x0=230+(chest[0]-230)*t,y0=GROUND+(chest[1]+ph*.5-GROUND)*t-Math.sin(t*Math.PI)*70;add({...idle,pom:[x0,y0],squash:1.1});}
 // 4. bam
 burst(chest[0],chest[1],true);spray(chest[0],chest[1],16,1.2);flash=.55;
 for(let i=0;i<6;i++)add({...idle,shake:6,pom:[chest[0],chest[1]+ph*.5],squash:i<2?.8:1},i?60:90);
 // 5. the pom crawls over the body, the victim shakes, blood drips
 const path3=[[chest[0],chest[1]+ph*.5],[VX+18,GROUND-vh*.55],[VX+10,GROUND-vh*.75],[VX-14,GROUND-vh*.84],[VX-22,GROUND-vh*.62],[VX+16,GROUND-vh*.6]];
 for(let k=0;k<path3.length-1;k++)for(let i=1;i<=5;i++){const t=i/5,a=path3[k],b=path3[k+1];
  if(rng()<.35)spray(a[0],a[1]-ph*.4,2,.6);
  add({...idle,shake:3,pom:[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t-hop(t,6)],squash:i%2?.92:1.04});}
 // 6. it stops and bites, three times
 const neck=path3.at(-1);
 for(let n=0;n<3;n++){
  for(let i=0;i<3;i++)add({...idle,shake:2,pom:neck,squash:1+i*.04},70);
  burst(neck[0]+6,neck[1]-ph*.5,n===2);spray(neck[0],neck[1]-ph*.5,8+n*3,.9);flash=n===2?.4:.2;
  for(let i=0;i<4;i++)add({...idle,shake:7,pom:[neck[0],neck[1]+2],squash:.85},60);
 }
 // 7. the victim runs off to the right, the pom hanging on: the game's run when it has one, else its walk sped up
 // (legs twice as fast, long strides, a bounce, leaning forward)
 const off=[neck[0]-VX,neck[1]];
 for(let i=0,x0=VX;x0-vw<BITE_W+pw;i++,x0+=Math.min(running?20:22,8+i*3)){
  const bob=running?0:Math.abs(Math.sin(i*Math.PI/2))*5,lean=running?0:Math.min(.12,i*.03);
  if(i%2===0)spray(x0+off[0],off[1]-ph*.4-bob,3,.7);
  add({vx:x0,vframe:running?i%8:(i*2)%8,vdir:sheet?EAST:0,bob,lean,run:Boolean(running),pom:[x0+off[0]+lean*(vh-(GROUND-off[1]))+(running?6:0),off[1]-bob+(running?4:0)-(sheet?0:hop(i/4,8))],squash:i%2?.96:1.02},running?55:45);
 }
 // 8. the last drops fall
 for(let i=0;i<8;i++)add({},60);
 return {attachment:out.finish(),name:'morsure.gif'};
}
module.exports={renderBubble,renderEvolution,renderBite,avatarURL,slug,words,
 // shared with the siege (utils/pomSiege.js)
 parts:{SKY,BLOOD,SPLASH,DROPS,BURST,seeded,bounds,encode,stream,gated,scratch,MIB,pomSprite,sheetOf,runSheetOf,sheetFrame}};