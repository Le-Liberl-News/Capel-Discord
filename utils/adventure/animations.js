// Pictures an action of the adventure can send with its reply ("animation" in rpg/data/aventure.json), drawn from
// what the player said. "cartes": the office's card table seen from above; the cards typed ("distribuer 20-13-1-100")
// are dealt one by one by the player, at the bottom: first to the left, then around the table the way of a clock's
// hands, the dealer's own card last. The faces are the real tarot cards (tarot/, the 100 is the Excuse); each exists
// once, so a number typed again leaves its seat empty.
const path=require('node:path'),fs=require('node:fs');
const {createCanvas,loadImage}=require('@napi-rs/canvas');
// Emergency memory safeguard: render one final PNG, never accumulate animation frames.
const W=480,H=410,CX=W/2,CY=H/2;
// where the cards land, in the order they are dealt: left, opposite, right, the dealer's own
const SEATS=[{x:CX-170,y:CY},{x:CX,y:CY-128},{x:CX+170,y:CY},{x:CX,y:CY+118}];
const CW=53,CH=101;   // a card, the pictures' proportions (76 x 145)
const DECK={x:CX,y:CY+70};


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
async function renderCards(words){
 // only the cards of the deck (0 to 21, 100, banjo and excuse); anything else is left out, as if it had not been typed
const EXCUSE=new Set([0,100,'excuse','banjo']);
const isNum=v=>/^\d+$/.test(v);
const values=[...new Set(
 String(words.join('-')).toLowerCase().split('-')
  .filter(v=>isNum(v)?(+v<=21||+v===100):v==='excuse'||v==='banjo')
  .map(v=>isNum(v)?Number(v):v)
  .map(v=>EXCUSE.has(v)?'excuse':v)
)].slice(0,8);
 if(values.length != 4)return null;
 const pictures=await loadFaces(),given=new Set();
 // a card already dealt cannot be dealt again: its seat stays empty
 const deal=values.map(value=>given.has(value)?null:(given.add(value),value));
 const canvas=createCanvas(W,H),x=canvas.getContext('2d');table(x);
 deal.forEach((value,i)=>{
  if(value==null)return;
  const seat=SEATS[i%SEATS.length],angle=(i%2?-1:1)*.12;
  card(x,seat.x+(i>=SEATS.length?18:0),seat.y+(i>=SEATS.length?10:0),pictures.get(value),angle);
 });
 return {attachment:canvas.toBuffer('image/png'),name:'distribution.png'};
}
const ANIMATIONS={cartes:renderCards};
async function renderAnimation(name,words){
 const draw=ANIMATIONS[name];
 if(!draw)throw new Error('animation inconnue : '+name);
 return draw(words||[]);
}
module.exports={renderAnimation,ANIMATIONS:Object.keys(ANIMATIONS)};
