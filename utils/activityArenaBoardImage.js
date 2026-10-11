const path=require('node:path');
const {createCanvas,loadImage,GlobalFonts}=require('@napi-rs/canvas');
const catalogue=require('../activity/assets/sky/characters.json');
GlobalFonts.registerFromPath(path.join(__dirname,'../AveriaSansLibre-Regular.ttf'),'ArenaAveria');
const faces=require('../resources/arena-portraits/catalogue.json');
const portraits=new Map();
async function portrait(name){
 const file=faces[name]?path.join(__dirname,'../resources/arena-portraits',faces[name]):catalogue[name]?.portrait?path.join(__dirname,'../activity/assets/sky',catalogue[name].portrait):null;if(!file)return null;
 if(!portraits.has(file))portraits.set(file,loadImage(file).catch(()=>null));
 return portraits.get(file);
}
async function renderArenaBoard({rows,page,pages,queueSize}) {
 const width=1200,height=400+Math.max(3,rows.length)*86,canvas=createCanvas(width,height),c=canvas.getContext('2d');
 const box=(x,y,w,h,r,fill)=>{c.fillStyle=fill;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();};
 const metal=c.createLinearGradient(0,0,width,height);metal.addColorStop(0,'#b6a579');metal.addColorStop(.16,'#51493a');metal.addColorStop(.5,'#776d55');metal.addColorStop(1,'#282825');
 box(0,0,width,height,30,'#171918');box(9,9,width-18,height-18,27,metal);
 for(const x of [28,width-28])for(const y of [28,height-28]){c.fillStyle='#242722';c.beginPath();c.arc(x,y,7,0,Math.PI*2);c.fill();c.strokeStyle='#a39878';c.beginPath();c.moveTo(x-3,y+3);c.lineTo(x+3,y-3);c.stroke();}
 box(38,42,width-76,height-96,22,'#111513');box(48,52,width-96,height-116,17,'#263b32');
 const screen=c.createLinearGradient(0,65,0,height-65);screen.addColorStop(0,'#152e29');screen.addColorStop(1,'#071b19');box(57,61,width-114,height-134,13,screen);
 c.strokeStyle='#34594b';c.lineWidth=1;for(let y=64;y<height-75;y+=4){c.globalAlpha=.14;c.beginPath();c.moveTo(62,y);c.lineTo(width-62,y);c.stroke();}c.globalAlpha=1;
 c.textBaseline='middle';c.fillStyle='#93bea4';c.font='18px monospace';c.fillText('THE ORBAL CALCULATOR / C.T.Z.',90,95);
 c.shadowColor='#68f4ac';c.shadowBlur=12;c.fillStyle='#cdf7da';c.font='bold 39px ArenaAveria';c.fillText('CAPEL',90,139);c.shadowBlur=0;
 c.textAlign='right';c.font='19px monospace';c.fillStyle='#bfc4a0';c.fillText('SYSTEM Ver.7.0',width-90,100);c.fillStyle='#88ecb2';c.font='bold 29px ArenaAveria';c.fillText('ARÈNE DE GRANCEL',width-90,143);c.textAlign='left';
 c.strokeStyle='#568771';c.beginPath();c.moveTo(90,181);c.lineTo(width-90,181);c.stroke();
 c.font='20px ArenaAveria';c.fillStyle='#8aa99a';c.fillText('COMBATTANTS DU JOUR',90,211);c.textAlign='center';c.fillText('VICTOIRES',695,211);c.fillText('SÉRIE',843,211);c.fillText('PB',1020,211);c.textAlign='left';
 const images=await Promise.all(rows.map(r=>portrait(r.name)));
 rows.forEach((row,i)=>{
  const y=248+i*86;box(82,y,1036,76,7,i%2?'#142e29':'#1b3730');
  c.font='21px monospace';c.fillStyle='#88a69a';c.fillText(String(page*12+i+1).padStart(2,'0'),100,y+38);
  box(150,y+5,66,66,5,'#0a1c19');if(images[i]){const img=images[i],scale=Math.min(62/img.width,62/img.height);c.drawImage(img,183-img.width*scale/2,y+38-img.height*scale/2,img.width*scale,img.height*scale);}else{c.font='28px ArenaAveria';c.fillStyle='#8fbb9c';c.fillText(row.name[0]??'?',174,y+38);}
  c.fillStyle='#e2efda';c.font='30px ArenaAveria';let name=row.name;while(c.measureText(name).width>400)name=name.slice(0,-2)+'…';c.fillText(name,235,y+38);
  c.textAlign='center';c.font='bold 31px ArenaAveria';c.fillStyle='#dcecd8';c.fillText(String(row.wins??0),695,y+38);
  c.fillStyle=row.lastWin===undefined?'#93aaa0':row.lastWin?'#8af4ad':'#ff8d8a';c.fillText(String(row.streak??0),843,y+38);
  c.fillStyle='#ffe7a4';c.fillText(String(row.pb??0),994,y+31);c.font='20px ArenaAveria';c.fillStyle=(row.delta??0)<0?'#ff9b93':'#8acda2';c.fillText(`(${(row.delta??0)>=0?'+':''}${row.delta??0})`,1053,y+34);c.textAlign='left';
 });
 if(!rows.length){c.font='28px ArenaAveria';c.fillStyle='#accab6';c.fillText('Aucun combattant attribué.',100,294);}
 c.font='18px ArenaAveria';c.fillStyle='#9db8a6';c.fillText('PB versés à minuit · Paris',90,height-115);c.textAlign='right';c.fillText(`${queueSize} en attente   /   Page ${page+1} sur ${pages}`,width-90,height-115);c.textAlign='left';
 c.fillStyle='#89d997';c.shadowColor='#50ff81';c.shadowBlur=10;c.beginPath();c.arc(75,height-34,5,0,Math.PI*2);c.fill();c.shadowBlur=0;c.fillStyle='#b6ae91';c.font='14px monospace';c.fillText('ONLINE',90,height-33);
 for(let i=0;i<10;i++){c.fillStyle='#282b26';c.fillRect(width-223+i*12,height-39,6,15);}
 return canvas.toBuffer('image/png');
}
module.exports={renderArenaBoard};
