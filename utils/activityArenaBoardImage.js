const path=require('node:path');
const {createCanvas,loadImage,GlobalFonts}=require('@napi-rs/canvas');
const {encodeLoop}=require('./loopingGif');
const catalogue=require('../activity/assets/sky/characters.json');
// VT323 (SIL OFL, resources/fonts/VT323-OFL.txt): a terminal face for the orbal calculator screen
GlobalFonts.registerFromPath(path.join(__dirname,'../resources/fonts/VT323-Regular.ttf'),'ArenaTerminal');
const faces=require('../resources/arena-portraits/catalogue.json');
const portraits=new Map();
async function portrait(name){
 const file=faces[name]?path.join(__dirname,'../resources/arena-portraits',faces[name]):catalogue[name]?.portrait?path.join(__dirname,'../activity/assets/sky',catalogue[name].portrait):null;if(!file)return null;
 if(!portraits.has(file))portraits.set(file,loadImage(file).catch(()=>null));
 return portraits.get(file);
}
const WIDTH=1200,SCALE=.75,FRAMES=16,DELAY=90,GLOW='#5dffa6';
const FONT=size=>`${size}px ArenaTerminal`;
// The screen of Capel's orbal calculator: the board laid out as before, in a terminal font where every text glows.
function drawBoard(c,{rows,page,pages},images,height){
 const width=WIDTH,box=(x,y,w,h,r,fill)=>{c.fillStyle=fill;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();};
 const text=(value,x,y,font,color,glow=8)=>{c.font=font;c.fillStyle=color;c.shadowColor=GLOW;c.shadowBlur=glow;c.fillText(value,x,y);c.shadowBlur=0;};
  // the whole picture is the screen, no bezel around it
 const screen=c.createLinearGradient(0,0,0,height);screen.addColorStop(0,'#123029');screen.addColorStop(1,'#051a17');box(0,0,width,height,18,screen);
 c.textBaseline='middle';
 text('THE ORBAL CALCULATOR / C.T.Z.',90,95,FONT(26),'#93bea4',4);
 text('CAPEL',90,141,FONT(58),'#d6ffe3',16);
 c.textAlign='right';text('SYSTEM Ver.7.0',width-90,141,FONT(26),'#bfc4a0',4);c.textAlign='left';
 c.strokeStyle='#568771';c.lineWidth=1;c.shadowColor=GLOW;c.shadowBlur=6;c.beginPath();c.moveTo(90,181);c.lineTo(width-90,181);c.stroke();c.shadowBlur=0;
 text('COMBATTANTS DU JOUR',90,211,FONT(28),'#8aa99a',5);c.textAlign='center';for(const [label,x] of [['VICTOIRES',695],['SÉRIE',843],['PB',1020]])text(label,x,211,FONT(28),'#8aa99a',5);c.textAlign='left';
 rows.forEach((row,i)=>{
  const y=248+i*86;box(82,y,1036,76,7,i%2?'#122d27':'#18352d');
  text(String(page*12+i+1).padStart(2,'0'),100,y+38,FONT(32),'#88a69a',4);
  box(150,y+5,66,66,5,'#0a1c19');if(images[i]){const img=images[i],s=Math.min(62/img.width,62/img.height);c.drawImage(img,183-img.width*s/2,y+38-img.height*s/2,img.width*s,img.height*s);}else text(row.name[0]??'?',172,y+38,FONT(40),'#8fbb9c');
  c.font=FONT(44);let name=row.name.toUpperCase();while(c.measureText(name).width>400)name=name.slice(0,-2)+'…';text(name,235,y+38,FONT(44),'#e2ffe9',9);
  c.textAlign='center';text(String(row.wins??0),695,y+38,FONT(46),'#dcffe4',9);
  text(String(row.streak??0),843,y+38,FONT(46),row.lastWin===undefined?'#93aaa0':row.lastWin?'#8af4ad':'#ff8d8a',9);
  c.textAlign='right';text(String(row.pb??0),1012,y+36,FONT(46),'#ffe7a4',9);c.textAlign='left';text(`(${(row.delta??0)>=0?'+':''}${row.delta??0})`,1020,y+38,FONT(28),(row.delta??0)<0?'#ff9b93':'#8acda2',5);
 });
 if(!rows.length)text('AUCUN COMBATTANT ATTRIBUÉ.',100,294,FONT(40),'#accab6');
 text('PB VERSÉS À MINUIT · PARIS',90,height-115,FONT(26),'#9db8a6',4);c.textAlign='right';text(`PAGE ${page+1} SUR ${pages}`,width-90,height-115,FONT(26),'#9db8a6',4);c.textAlign='left';
 // static CRT texture: scanlines over the screen and a darker rim
 c.fillStyle='rgba(0,0,0,.22)';for(let y=2;y<height;y+=4)c.fillRect(0,y,width,2);
 const vignette=c.createRadialGradient(width/2,height/2,height*.25,width/2,height/2,width*.62);vignette.addColorStop(0,'rgba(0,0,0,0)');vignette.addColorStop(1,'rgba(0,0,0,.42)');c.fillStyle=vignette;c.fillRect(0,0,width,height);
 text('ONLINE',90,height-60,FONT(22),'#9db8a6',4);
}
// What moves on the screen at frame f: a soft bright band rolling down, the ONLINE led and a cursor blinking,
// and the title flickering now and then.
function drawFrame(c,f,height){
 const top=0,bottom=height,band=90,y=top-band+(bottom-top+band)*f/FRAMES;
 const g=c.createLinearGradient(0,y,0,y+band);g.addColorStop(0,'rgba(120,255,180,0)');g.addColorStop(.5,'rgba(120,255,180,.07)');g.addColorStop(1,'rgba(120,255,180,0)');
 c.fillStyle=g;c.fillRect(0,y,WIDTH,band);
 const on=f%8<5;c.fillStyle=on?'#89d997':'#2c4a33';c.shadowColor='#50ff81';c.shadowBlur=on?12:0;c.beginPath();c.arc(76,height-60,5,0,Math.PI*2);c.fill();c.shadowBlur=0;
 c.font=FONT(58);const cursor=90+c.measureText('CAPEL').width+10;
 if(f%4<2){c.fillStyle='#d6ffe3';c.shadowColor=GLOW;c.shadowBlur=10;c.fillRect(cursor,124,18,34);c.shadowBlur=0;}
 if(f===5||f===12){c.fillStyle='rgba(214,255,227,.16)';c.fillRect(86,114,cursor-90,56);}
}
async function renderArenaBoard(visual){
 const height=400+Math.max(3,visual.rows.length)*86,images=await Promise.all(visual.rows.map(r=>portrait(r.name)));
 const W=Math.round(WIDTH*SCALE),H=Math.round(height*SCALE);
 const base=createCanvas(W,H),b=base.getContext('2d');b.scale(SCALE,SCALE);drawBoard(b,visual,images,height);
 return encodeLoop(base,{frames:FRAMES,delay:DELAY,draw:(c,f)=>{c.scale(SCALE,SCALE);drawFrame(c,f,height);}});
}
module.exports={renderArenaBoard};
