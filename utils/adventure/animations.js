// Sequential card dealing, one indexed frame buffer throughout the animation.
// Original tarot faces and seating rules; no array of full-resolution canvases.
const fs=require('node:fs'),path=require('node:path');
const {createCanvas,loadImage}=require('@napi-rs/canvas');
const {GIFEncoder,quantize,applyPalette,nearestColorIndex}=require('gifenc');
const {render}=require('../mediaRender');
const W=360,H=308,CW=40,CH=76,MAX_CARDS=8,FLIGHT=6,FRAME_MS=80;
const CX=W/2,CY=H/2,DECK={x:CX,y:CY+52},SEATS=[{x:CX-127,y:CY},{x:CX,y:CY-96},{x:CX+127,y:CY},{x:CX,y:CY+89}];
const GREEN=[47,93,58],BORDER=[63,122,77],SHADOW=[31,61,38],WHITE=[244,236,216];
let pictures=null,lastStats=null;
// only the cards of the deck (0 to 21, 100, « banjo » and « excuse »: 0, banjo and excuse are the Excuse, the 100);
// anything else is left out, as if it had not been typed, and a card typed again is dealt once
const EXCUSE=new Set([0,100,'excuse','banjo']);
function valuesOf(words){const isNum=v=>/^\d+$/.test(v);return [...new Set(String((words||[]).join('-')).toLowerCase().split('-').filter(v=>isNum(v)?(+v<=21||+v===100):v==='excuse'||v==='banjo').map(v=>isNum(v)?Number(v):v).map(v=>EXCUSE.has(v)?100:v))].slice(0,MAX_CARDS);}
async function faces(){if(!pictures)pictures=Promise.all([...Array.from({length:21},(_,i)=>i+1),100].map(async n=>[n,await loadImage(fs.readFileSync(path.join(__dirname,'tarot',n===100?'excuse.jpg':n+'.jpg')))])).then(rows=>new Map(rows)).catch(e=>{pictures=null;throw e;});return pictures;}
function side(x,image){x.save();x.beginPath();x.roundRect(0,0,CW,CH,3);x.clip();if(image)x.drawImage(image,0,0,CW,CH);else{x.fillStyle='#7a2430';x.fillRect(0,0,CW,CH);x.strokeStyle='#e8c37a';x.lineWidth=1;x.strokeRect(4,4,CW-8,CH-8);}x.restore();}
function assets(images,values){
 const unique=[...new Set(values)],atlas=createCanvas(CW*3,CH*3+8),a=atlas.getContext('2d'),tiles=[null,...unique];
 for(let i=0;i<tiles.length;i++){a.save();a.translate(i%3*CW,Math.floor(i/3)*CH);side(a,images.get(tiles[i]));a.restore();}
 // Include the table colours in the palette even when all cards are dark.
 [GREEN,BORDER,SHADOW,WHITE].forEach((rgb,i)=>{a.fillStyle=`rgb(${rgb.join(',')})`;a.fillRect(i*atlas.width/4,CH*3,atlas.width/4,8);});
 const rgba=a.getImageData(0,0,atlas.width,atlas.height).data,palette=quantize(rgba,255),indexed=applyPalette(rgba,palette),sprites=new Map();
 for(let i=0;i<tiles.length;i++){const pixels=new Uint8Array(CW*CH),mask=new Uint8Array(CW*CH),ox=i%3*CW,oy=Math.floor(i/3)*CH;for(let y=0;y<CH;y++)for(let x=0;x<CW;x++){const from=(oy+y)*atlas.width+ox+x,to=y*CW+x;pixels[to]=indexed[from];mask[to]=rgba[from*4+3]>=128?1:0;}sprites.set(tiles[i],{pixels,mask});}
 const canvas=createCanvas(W,H),c=canvas.getContext('2d');c.fillStyle='#2f5d3a';c.fillRect(0,0,W,H);c.strokeStyle='#3f7a4d';c.lineWidth=2;c.strokeRect(10,10,W-20,H-20);c.fillStyle='#f4ecd8';c.textAlign='center';c.font='bold 12px sans-serif';c.fillText('vous',CX,H-9);
 const base=applyPalette(c.getImageData(0,0,W,H).data,palette);
 const shadow=nearestColorIndex(palette,SHADOW);while(palette.length<256)palette.push([0,0,0]);return {base,palette,sprites,shadow};
}
// Inverse affine sampling draws a small indexed card directly into the reusable frame.
function stamp(frame,sprite,cx,cy,angle=0,sx=1,sy=1,colour=null,mirror=false){
 sx=Math.max(.035,Math.abs(sx));const cos=Math.cos(angle),sin=Math.sin(angle),hw=CW*sx/2,hh=CH*sy/2,rx=Math.abs(cos)*hw+Math.abs(sin)*hh,ry=Math.abs(sin)*hw+Math.abs(cos)*hh;
 const left=Math.max(0,Math.floor(cx-rx)),right=Math.min(W-1,Math.ceil(cx+rx)),top=Math.max(0,Math.floor(cy-ry)),bottom=Math.min(H-1,Math.ceil(cy+ry));
 for(let y=top;y<=bottom;y++)for(let x=left;x<=right;x++){const dx=x+.5-cx,dy=y+.5-cy;let u=Math.floor((cos*dx+sin*dy)/sx+CW/2),v=Math.floor((-sin*dx+cos*dy)/sy+CH/2);if(u<0||u>=CW||v<0||v>=CH)continue;if(mirror)u=CW-1-u;const p=v*CW+u;if(sprite.mask[p])frame[y*W+x]=colour??sprite.pixels[p];}
}
async function renderCards(values,budget){
 const images=await faces();budget.check();const {base,palette,sprites,shadow}=assets(images,values),frame=new Uint8Array(W*H),previous=new Uint8Array(W*H),delta=new Uint8Array(W*H),gif=GIFEncoder({initialCapacity:65536}),given=new Set(),landed=[];
 const deal=values.map(n=>given.has(n)?null:(given.add(n),n));let count=0;
 function card(value,x,y,angle=0,flip=1,lift=1){const sprite=sprites.get(value);stamp(frame,sprite,x+2,y+2,angle,flip*lift,lift,shadow);stamp(frame,sprite,x,y,angle,flip*lift,lift);}
 async function add(moving,delay){
  budget.check(gif.bytesView().length);frame.set(base);if(landed.length<given.size)card(null,DECK.x,DECK.y);
  for(const p of landed)card(p.value,p.x,p.y,p.angle);
  if(moving)card(moving.face,moving.x,moving.y,moving.angle,moving.flip,moving.lift);
  for(let i=0;i<frame.length;i++)delta[i]=count&&frame[i]===previous[i]?255:frame[i];previous.set(frame);
  gif.writeFrame(delta,W,H,{...(count===0?{palette,repeat:-1}:{transparent:true,transparentIndex:255}),delay,dispose:1});count++;
  // Yield between frames: Discord/HTTP and the diagnostic heartbeat remain responsive.
  await new Promise(setImmediate);
 }
 await add(null,400);
 for(let i=0;i<deal.length;i++){
  const value=deal[i],last=i===deal.length-1;
  if(value==null){await add(null,last?2200:220);continue;}
  const seat=SEATS[i%4],to={x:seat.x+(i>=4?14:0),y:seat.y+(i>=4?8:0)},angle=(i%2?-1:1)*.12;
  for(let f=1;f<=FLIGHT;f++){const t=f/FLIGHT,e=t*t*(3-2*t),flip=Math.cos(Math.PI*e);await add({face:flip>=0?null:value,x:DECK.x+(to.x-DECK.x)*e,y:DECK.y+(to.y-DECK.y)*e-Math.sin(Math.PI*t)*16,angle:angle*e,flip:Math.abs(flip),lift:1+Math.sin(Math.PI*t)*.18},FRAME_MS);}
  landed.push({...to,value,angle});await add(null,last?2200:220);
 }
 gif.finish();budget.check(gif.bytesView().length);lastStats={...budget.stats(),frames:count,width:W,height:H,frameBuffers:1,frameBytes:frame.byteLength,indexedWorkingBytes:frame.byteLength+previous.byteLength+delta.byteLength+base.byteLength,bytes:gif.bytesView().length};
 return {attachment:Buffer.from(gif.bytesView()),name:'distribution.gif'};
}
async function renderAnimation(name,words){if(name!=='cartes')throw Error('animation inconnue : '+name);const values=valuesOf(words);if(values.length!==4)return null;   // a deal is four cards, one per seatreturn render(budget=>renderCards(values,budget));}
module.exports={renderAnimation,ANIMATIONS:['cartes'],valuesOf,renderStats:()=>lastStats};
