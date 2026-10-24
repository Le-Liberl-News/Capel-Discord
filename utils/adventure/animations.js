// Pictures an action of the adventure can send with its reply ("animation" in rpg/data/aventure.json), drawn from
// what the player said. "cartes": the office's card table seen from above; the cards typed ("distribuer 20-13-1-100")
// are dealt one by one by the player, at the bottom, as at tarot: first to the right, then around the table the other
// way from a clock's hands, the dealer's own card last.
const {createCanvas}=require('@napi-rs/canvas');
const {parts}=require('../pomRendering');
const W=480,H=410,CX=W/2,CY=H/2;
// where the cards land, in the order they are dealt: right, opposite, left, the dealer's own
const SEATS=[{x:CX+170,y:CY},{x:CX,y:CY-140},{x:CX-170,y:CY},{x:CX,y:CY+140}];
const DECK={x:CX,y:CY+70};
const FLIGHT=9,PAUSE=4;

// the green cloth only: the other players' places are the riddle, so none is drawn; the dealer at the bottom
function table(x){
 x.fillStyle='#2f5d3a';x.fillRect(0,0,W,H);
 x.strokeStyle='#3f7a4d';x.lineWidth=3;x.strokeRect(14,14,W-28,H-28);
 x.fillStyle='#f4ecd8';x.textAlign='center';x.textBaseline='alphabetic';x.font='bold 16px sans-serif';x.fillText('vous',CX,H-12);
}
function card(x,cx,cy,value,angle,face=true){
 x.save();x.translate(cx,cy);x.rotate(angle);
 x.fillStyle='rgba(0,0,0,.35)';x.fillRect(-25,-35,54,74);
 x.fillStyle=face?'#f4ecd8':'#7a2430';x.fillRect(-27,-37,54,74);
 x.strokeStyle='#3a2a1a';x.lineWidth=2;x.strokeRect(-27,-37,54,74);
 if(face){
  x.fillStyle='#2b1d12';x.textAlign='center';x.textBaseline='middle';
  const text=String(value);x.font=`bold ${text.length>2?20:26}px sans-serif`;x.fillText(text,0,2);
  x.font='10px sans-serif';x.fillText(text,-17,-28);
 }else{
  x.strokeStyle='#e8c37a';x.lineWidth=1.5;x.strokeRect(-21,-31,42,62);
 }
 x.restore();
}
function renderCards(words){
 const values=String(words.join('-')).split('-').filter(Boolean).slice(0,8);
 if(!values.length)return null;
 const frames=[],delays=[],landed=[];
 const frame=(moving,delay)=>{
  const c=createCanvas(W,H),x=c.getContext('2d');
  table(x);
  if(landed.length+(moving?1:0)<values.length)card(x,DECK.x,DECK.y,'',0,false);   // the deck, until the last card leaves
  for(const l of landed)card(x,l.x,l.y,l.value,l.angle);
  if(moving)card(x,moving.x,moving.y,moving.value,moving.angle,moving.face);
  frames.push(c);delays.push(delay);
 };
 frame(null,600);
 values.forEach((value,i)=>{
  const seat=SEATS[i%SEATS.length],angle=(i%2?-1:1)*.12;
  const to={x:seat.x+(i>=SEATS.length?18:0),y:seat.y+(i>=SEATS.length?10:0)};
  for(let f=1;f<=FLIGHT;f++){
   const t=f/FLIGHT,e=t*t*(3-2*t);
   frame({x:DECK.x+(to.x-DECK.x)*e,y:DECK.y+(to.y-DECK.y)*e-Math.sin(t*Math.PI)*30,value,angle:angle*e+Math.PI*2*e*.5,face:t>.6},50);
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
