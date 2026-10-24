// Pictures an action of the adventure can send with its reply ("animation" in rpg/data/aventure.json), drawn from
// what the player said. "cartes": the office's card table seen from above; the cards typed ("distribuer 20-13-1-100")
// are dealt one by one by the player, at the bottom: first to the left, then around the table the way of a clock's
// hands, the dealer's own card last. The faces are the real tarot cards (tarot/, the 100 is the Excuse); each exists
// once, so a number typed again leaves its seat empty.
const path=require('node:path'),fs=require('node:fs');
const {createCanvas,loadImage}=require('@napi-rs/canvas');
const {parts}=require('../pomRendering');
const W=480,H=410,CX=W/2,CY=H/2;
// where the cards land, in the order they are dealt: left, opposite, right, the dealer's own
const SEATS=[{x:CX-170,y:CY},{x:CX,y:CY-128},{x:CX+170,y:CY},{x:CX,y:CY+118}];
const CW=53,CH=101;   // a card, the pictures' proportions (76 x 145)
const DECK={x:CX,y:CY+70};
const FLIGHT=11,PAUSE=4;

// the green cloth only: the other players' places are the riddle, so none is drawn; the dealer at the bottom
function table(x){
 x.fillStyle='#2f5d3a';x.fillRect(0,0,W,H);
 x.strokeStyle='#3f7a4d';x.lineWidth=3;x.strokeRect(14,14,W-28,H-28);
 x.fillStyle='#f4ecd8';x.textAlign='center';x.textBaseline='alphabetic';x.font='bold 16px sans-serif';x.fillText('vous',CX,H-12);
}
let faces=null;
async function loadFaces(){
 faces??=Promise.all([...Array.from({length:21},(_,i)=>i+1),100].map(async n=>[n,await loadImage(fs.readFileSync(path.join(__dirname,'tarot',n===100?'excuse.jpg':n+'.jpg')))])).then(list=>new Map(list));
 return faces;
}
// a card's two sides, framed, as pictures
let back=null;
// the face: the picture alone, its corners rounded as the card's (the pictures' own corners show their white
// background); the back: drawn, framed
function side(picture){
 const c=createCanvas(CW,CH),x=c.getContext('2d');
 x.beginPath();x.roundRect(0,0,CW,CH,4);x.clip();
 if(picture){x.drawImage(picture,0,0,CW,CH);return c;}
 x.fillStyle='#7a2430';x.fillRect(0,0,CW,CH);x.strokeStyle='#e8c37a';x.lineWidth=1.5;x.strokeRect(6,6,CW-12,CH-12);
 x.strokeStyle='#3a2a1a';x.lineWidth=1.5;x.beginPath();x.roundRect(.75,.75,CW-1.5,CH-1.5,4);x.stroke();
 return c;
}
const sides=new Map();
const faceOf=picture=>{if(!sides.has(picture))sides.set(picture,side(picture));return sides.get(picture);};
// a card lying on the cloth: face (its picture) or its back
function card(x,cx,cy,face,angle){
 x.save();x.translate(cx,cy);x.rotate(angle);
 x.fillStyle='rgba(0,0,0,.35)';x.fillRect(-CW/2+2,-CH/2+2,CW,CH);
 x.drawImage(face?faceOf(face):(back??=side(null)),-CW/2,-CH/2,CW,CH);
 x.restore();
}
// a card in the air, turning over around its long side: flip 0 shows its back, π its face; lift raises it toward the
// eye (bigger, its shadow further). Drawn in vertical strips, each as tall as its depth makes it: the perspective
const STRIPS=14,EYE=260;
function flying(x,cx,cy,face,angle,flip,lift){
 const c=Math.cos(flip),sn=Math.sin(flip),picture=c>=0?(back??=side(null)):faceOf(face),k=1+lift*.25;
 x.save();x.translate(cx+lift*10,cy+lift*16);x.rotate(angle);x.fillStyle=`rgba(0,0,0,${.35-lift*.15})`;x.fillRect(-CW/2*Math.abs(c)*k,-CH/2*k,CW*Math.abs(c)*k,CH*k);x.restore();
 x.save();x.translate(cx,cy);x.rotate(angle);x.scale(k,k);
 for(let i=0;i<STRIPS;i++){
  // u across the card; seen from behind, the face's strips run the other way (it is not mirrored once turned)
  const u0=i/STRIPS,u1=(i+1)/STRIPS,src=c>=0?u0:1-u1;
  const at=u=>{const along=(u-.5)*CW,z=along*sn,p=EYE/(EYE-z);return {x:along*c*p,h:CH*p};};
  const a=at(u0),b=at(u1),left=Math.min(a.x,b.x),width=Math.abs(b.x-a.x)+.6,h=(a.h+b.h)/2;
  if(width<.2)continue;
  x.drawImage(picture,src*CW,0,CW/STRIPS,CH,left,-h/2,width,h);
 }
 x.restore();
}
async function renderCards(words){
 // only the cards of the deck (1 to 21, and the 100); anything else is left out, as if it had not been typed
 const values=String(words.join('-')).split('-').filter(value=>/^\d+$/.test(value)&&((+value>=1&&+value<=21)||+value===100)).map(Number).slice(0,8);
 if(!values.length)return null;
 const pictures=await loadFaces(),given=new Set();
 // a card already dealt cannot be dealt again: its seat stays empty
 const deal=values.map(value=>given.has(value)?null:(given.add(value),value)),real=deal.filter(v=>v!=null).length;
 const frames=[],delays=[],landed=[];
 const frame=(moving,delay)=>{
  const c=createCanvas(W,H),x=c.getContext('2d');
  table(x);
  if(landed.length+(moving?1:0)<real)card(x,DECK.x,DECK.y,null,0);   // the deck, until the last card leaves
  for(const l of landed)card(x,l.x,l.y,pictures.get(l.value),l.angle);
  if(moving)flying(x,moving.x,moving.y,pictures.get(moving.value),moving.angle,moving.flip,moving.lift);
  frames.push(c);delays.push(delay);
 };
 frame(null,600);
 deal.forEach((value,i)=>{
  if(value==null){frame(null,PAUSE*100);return;}   // nothing for this seat
  const seat=SEATS[i%SEATS.length],angle=(i%2?-1:1)*.12;
  const to={x:seat.x+(i>=SEATS.length?18:0),y:seat.y+(i>=SEATS.length?10:0)};
  for(let f=1;f<=FLIGHT;f++){
   const t=f/FLIGHT,e=t*t*(3-2*t);
   // it leaves the deck face down, turns over in the air and lands face up, its slant set as it flies
   frame({x:DECK.x+(to.x-DECK.x)*e,y:DECK.y+(to.y-DECK.y)*e-Math.sin(t*Math.PI)*22,value,angle:angle*e,flip:Math.PI*e,lift:Math.sin(t*Math.PI)},50);
  }
  landed.push({...to,value,angle});
  frame(null,PAUSE*100);
 });
 delays[delays.length-1]=3000;
 return {attachment:parts.encode(frames,delays,{once:true}),name:'distribution.gif'};
}
const ANIMATIONS={cartes:renderCards};
async function renderAnimation(name,words){
 const draw=ANIMATIONS[name];
 if(!draw)throw new Error('animation inconnue : '+name);
 return draw(words||[]);
}
module.exports={renderAnimation,ANIMATIONS:Object.keys(ANIMATIONS)};
