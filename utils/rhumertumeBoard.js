// The rhumertume board: every character in one picture, as it stands now (human, Pom, Pompom, Pomdeter), the most
// advanced first, kept up to date in one message of its channel. Redrawn when someone changes stage, and every ten
// minutes for the "since" times.
const {createCanvas}=require('@napi-rs/canvas');
const {parts}=require('./pomRendering');
const {bounds,pomSprite,characterSprite,font}=parts;
const STAGES=[
 {label:'Humain',colour:'#7fb069'},
 {label:'Pom',colour:'#e8c547'},
 {label:'Pompom',colour:'#e8873a'},
 {label:'Pomdeter',colour:'#c8423c'}];
const COLUMNS=12,CELL_W=104,CELL_H=140,MARGIN=24,HEADER=86,BOX=84;
const BACKGROUND='#2b2d31',CARD='#383a40',INK='#f2f3f5',SOFT='#b5bac1';
const MINUTE=60000,HOUR=60*MINUTE;
const since=ms=>{const m=Math.max(0,Math.floor(ms/MINUTE));return m<60?`depuis ${m} min`:`depuis ${Math.floor(m/60)} h ${String(m%60).padStart(2,'0')}`;};
// one picture per character and stage; a missing picture is drawn as the name's initial
function createPictures(){
 const cache=new Map();
 return (character,level)=>{
  const key=character+'|'+level;
  if(!cache.has(key))cache.set(key,(level?pomSprite(character,level):characterSprite(character)).catch(()=>null));
  return cache.get(key);
 };
}
function fit(x,img,cx,bottom,box,pixel){
 const [x0,y0,x1,y1]=bounds(img),w=x1-x0,h=y1-y0;let f=box/Math.max(w,h);if(pixel&&f>=1)f=Math.floor(f);
 x.imageSmoothingEnabled=!pixel;x.drawImage(img,x0,y0,w,h,Math.round(cx-w*f/2),Math.round(bottom-h*f),Math.round(w*f),Math.round(h*f));
}
function shortened(x,text,width){
 if(x.measureText(text).width<=width)return text;
 while(text.length>1&&x.measureText(text+'…').width>width)text=text.slice(0,-1);
 return text+'…';
}
// rows: [{character, name, level, since}] (since: ms or null); counts per stage in the header
async function renderBoard(rows,picture,at=Date.now()){
 const lines=Math.ceil(rows.length/COLUMNS),W=MARGIN*2+COLUMNS*CELL_W,H=HEADER+MARGIN+lines*CELL_H;
 const c=createCanvas(W,H),x=c.getContext('2d');
 x.fillStyle=BACKGROUND;x.fillRect(0,0,W,H);
 x.fillStyle=INK;x.font=font(30);x.textBaseline='top';x.fillText('Rhumertume : suivi des infections',MARGIN,20);
 let left=MARGIN;x.font=font(17);
 for(const [i,s] of STAGES.entries()){
  const n=rows.filter(r=>r.level===i).length,text=`${s.label} : ${n}`;
  x.fillStyle=s.colour;x.beginPath();x.arc(left+7,64,7,0,Math.PI*2);x.fill();
  x.fillStyle=SOFT;x.fillText(text,left+20,55);left+=40+x.measureText(text).width;
 }
 const pictures=await Promise.all(rows.map(r=>picture(r.character,r.level)));
 rows.forEach((r,i)=>{
  const cx=MARGIN+(i%COLUMNS)*CELL_W,cy=HEADER+Math.floor(i/COLUMNS)*CELL_H,stage=STAGES[r.level];
  x.fillStyle=CARD;x.beginPath();x.roundRect(cx+4,cy+4,CELL_W-8,CELL_H-8,8);x.fill();
  x.fillStyle=stage.colour;x.fillRect(cx+4,cy+4,CELL_W-8,4);
  const img=pictures[i];
  if(img)fit(x,img,cx+CELL_W/2,cy+12+BOX,r.level?BOX:BOX-6,!r.level);
  else{x.fillStyle=SOFT;x.font=font(40);x.textAlign='center';x.fillText(r.character[0],cx+CELL_W/2,cy+34);x.textAlign='left';}
  x.textAlign='center';x.fillStyle=INK;x.font=font(14);
  x.fillText(shortened(x,r.name,CELL_W-14),cx+CELL_W/2,cy+CELL_H-42);
  x.fillStyle=stage.colour;x.font=font(12);
  x.fillText(r.since==null?stage.label:since(at-r.since),cx+CELL_W/2,cy+CELL_H-24);
  x.textAlign='left';
 });
 return {attachment:c.toBuffer('image/png'),name:'rhumertume.png'};
}
function createRhumertumeBoard({client,channelId,store,rhumertume,characterNames,now=Date.now,render=renderBoard,log=console.error}){
 const saved=store.load()??{},picture=createPictures();
 let busy=false,lastSignature=null;
 // the most advanced first, then the longest ill, then by name; the healthy by name
 function rows(){
  return characterNames.map(character=>({character,name:rhumertume.nameOf(character),level:rhumertume.level(character),since:rhumertume.since(character)}))
   .sort((a,b)=>b.level-a.level||(a.since??0)-(b.since??0)||a.character.localeCompare(b.character,'fr'));
 }
 async function refresh(){
  if(busy)return false;busy=true;
  try{
   const list=rows(),signature=JSON.stringify([list.map(r=>[r.character,r.level]),Math.floor(now()/(10*MINUTE))]);
   if(signature===lastSignature)return false;
   const channel=await client.channels.fetch(channelId),file=await render(list,picture,now());
   let message=null;
   if(saved.messageId)message=await channel.messages.fetch(saved.messageId).catch(e=>{if(e.code===10008)return null;throw e;});
   if(message)await message.edit({content:'',files:[file],attachments:[]});
   else{message=await channel.send({files:[file],allowedMentions:{parse:[]}});saved.messageId=message.id;store.save(saved);}
   lastSignature=signature;return true;
  }finally{busy=false;}
 }
 return {refresh,rows};
}
module.exports={createRhumertumeBoard,renderBoard,STAGES};