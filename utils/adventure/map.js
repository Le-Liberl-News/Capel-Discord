// The fort's plan: one floor drawn with the player's room highlighted. A floor is either a picture (its "image",
// a file of rpg/data/aventure/) with the rooms' rectangles laid over it, or the schematic drawn from those
// rectangles alone, like the paper plan (blue rooms, green courtyard, thick black walls).
const path=require('node:path'),fs=require('node:fs');
const {createCanvas,loadImage,GlobalFonts}=require('@napi-rs/canvas');
const FILES=path.join(__dirname,'../../rpg/data/aventure');
GlobalFonts.registerFromPath(path.join(__dirname,'../../activity/assets/sky/dialogue/AveriaSansLibre-Regular.ttf'),'AveriaSky');
const SCALE=2,MARGIN=24;
function wrap(x,text,width){
 const out=[];let line='';
 for(const word of String(text).split(/\s+/)){const next=line?line+' '+word:word;if(line&&x.measureText(next).width>width){out.push(line);line=word;}else line=next;}
 if(line)out.push(line);return out;
}
// null when the room is on no drawn floor (no rectangle)
async function renderMap(data,roomId){
 const here=data.rooms.find(r=>String(r.id)===String(roomId));
 if(!here?.rect||!here.floor)return null;
 const floor=(data.floors||[]).find(f=>f.id===here.floor)||{id:here.floor,name:here.floor};
 const rooms=data.rooms.filter(r=>r.floor===here.floor&&r.rect);
 const [fw,fh]=floor.size||[Math.max(...rooms.map(r=>r.rect[0]+r.rect[2])),Math.max(...rooms.map(r=>r.rect[1]+r.rect[3]))];
 const W=fw*SCALE+MARGIN*2,H=fh*SCALE+MARGIN*2+34;
 const c=createCanvas(W,H),x=c.getContext('2d');
 x.fillStyle='#f4ecd8';x.fillRect(0,0,W,H);
 x.fillStyle='#3a2a1a';x.font='bold 20px AveriaSky';x.textAlign='center';x.fillText(floor.name||floor.id,W/2,26);
 x.translate(MARGIN,MARGIN+34);
 const picture=floor.image&&fs.existsSync(path.join(FILES,floor.image))?await loadImage(fs.readFileSync(path.join(FILES,floor.image))):null;
 if(picture)x.drawImage(picture,0,0,fw*SCALE,fh*SCALE);
 // rooms sharing a rectangle (the maze's crossroads) are drawn once, with the first one's colour and label
 const seen=new Set(),drawn=rooms.filter(r=>{const k=r.rect.join();if(seen.has(k))return false;seen.add(k);return true;});
 for(const r of drawn){
  const [rx,ry,rw,rh]=r.rect.map(v=>v*SCALE);
  if(!picture){x.fillStyle=r.color||'#7f7fb4';x.fillRect(rx,ry,rw,rh);x.strokeStyle='#000';x.lineWidth=5;x.strokeRect(rx,ry,rw,rh);}
 }
 // the player's room last, so no neighbouring wall covers its border
 const [hx,hy,hw,hh]=here.rect.map(v=>v*SCALE);
 x.fillStyle='rgba(255,196,64,.55)';x.fillRect(hx,hy,hw,hh);x.strokeStyle='#c0392b';x.lineWidth=6;x.strokeRect(hx,hy,hw,hh);
 if(!picture)for(const r of drawn){
  if(r.label===false||!(r.label||r.name))continue;
  const [rx,ry,rw,rh]=r.rect.map(v=>v*SCALE);
  x.fillStyle='#1d1d2b';x.font=`${rw<90*SCALE?13:17}px AveriaSky`;
  const lines=wrap(x,r.label||r.name,rw-8);lines.forEach((l,i)=>x.fillText(l,rx+rw/2,ry+rh/2-(lines.length-1)*9+i*18+5));
 }
 // inside the room, near its bottom, outlined so it reads over walls too
 x.font='bold 15px AveriaSky';x.lineJoin='round';x.lineWidth=4;x.strokeStyle='#f4ecd8';x.strokeText('Vous êtes ici',hx+hw/2,hy+hh-12);
 x.fillStyle='#c0392b';x.fillText('Vous êtes ici',hx+hw/2,hy+hh-12);
 return {attachment:c.toBuffer('image/png'),name:'plan.png'};
}
module.exports={renderMap};