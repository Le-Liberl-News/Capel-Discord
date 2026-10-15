const path=require('node:path');
const {createCanvas,loadImage,GlobalFonts}=require('@napi-rs/canvas');
const {encodeLoop}=require('./loopingGif');
// Cinzel: the font of the activity's place titles
GlobalFonts.registerFromPath(path.join(__dirname,'../activity/assets/sky/fonts/Cinzel.ttf'),'RankCinzel');
const AXIS=path.join(__dirname,'../activity/assets/sky/axis');
const W=1024,TOP=200,ROW=56,FRAMES=24,DELAY=80,GOLD='#f3c45a',EMBER='#ff8a2a';
const FONT=(size,weight='')=>`${weight} ${size}px RankCinzel`.trim();

// The pieces of the Axis Pillar the board is made of, taken from the game's own textures:
// the golden circuit circle of its top floor (C51O3204 holds the right half) and the gilded frieze of its walls (C53I2504).
let pieces=null;
async function loadPieces(){
 if(pieces)return pieces;
 const [floor,wall]=await Promise.all(['C51O3204','C53I2504'].map(n=>loadImage(path.join(AXIS,n+'.png'))));
 const half=132,centreY=125,circle=createCanvas(half*2,256),cc=circle.getContext('2d');
 cc.drawImage(floor,124,0,half,256,half,0,half,256);cc.save();cc.translate(half,0);cc.scale(-1,1);cc.drawImage(floor,124,0,half,256,0,0,half,256);cc.restore();
 // the floor texture is a dim light map: lift it to a bright gold, the black staying black
 const image=cc.getImageData(0,0,circle.width,circle.height),d=image.data;
 for(let i=0;i<d.length;i+=4){const l=Math.min(1,(d[i]+d[i+1])/2/120);d[i]=255*l;d[i+1]=196*l;d[i+2]=80*l*l;d[i+3]=255*l;}
 cc.putImageData(image,0,0);
 const frieze=createCanvas(256,40);frieze.getContext('2d').drawImage(wall,0,0,256,40,0,0,256,40);
 return pieces={circle,centre:{x:half,y:centreY},frieze};
}
const thousands=n=>typeof n==='number'?n.toLocaleString('fr-FR').replace(/\s/g,' '):String(n);
function drawBoard(c,rows,avatars,height,{circle,frieze}){
 const back=c.createRadialGradient(W/2,height*.46,40,W/2,height*.46,W*.75);back.addColorStop(0,'#2a1606');back.addColorStop(.55,'#120904');back.addColorStop(1,'#040201');
 c.fillStyle=back;c.fillRect(0,0,W,height);
 // the circle lies still behind the board
 c.globalAlpha=.28;c.drawImage(circle,W/2-330,height*.46-320,660,640);c.globalAlpha=1;
 for(let x=0;x<W;x+=256){c.drawImage(frieze,x,0);c.save();c.translate(x,height);c.scale(1,-1);c.drawImage(frieze,0,0);c.restore();}
 const rule=(y,alpha=1)=>{const g=c.createLinearGradient(40,0,W-40,0);g.addColorStop(0,'rgba(243,196,90,0)');g.addColorStop(.5,`rgba(243,196,90,${alpha})`);g.addColorStop(1,'rgba(243,196,90,0)');c.fillStyle=g;c.fillRect(40,y,W-80,1.5);};
 c.textBaseline='middle';c.textAlign='center';
 const title=c.createLinearGradient(0,92,0,138);title.addColorStop(0,'#fff1c4');title.addColorStop(.55,GOLD);title.addColorStop(1,'#b8701e');
 c.shadowColor=EMBER;c.shadowBlur=18;c.fillStyle=title;c.font=FONT(50,'bold');c.fillText('CLASSEMENT',W/2,114);c.shadowBlur=0;
 rule(166,.8);
 const col={rank:78,avatar:148,name:182,rank2:476,pb:740,trads:938};
 c.fillStyle='#d9b26a';c.font=FONT(16,'bold');c.fillText('RG',col.rank,186);c.textAlign='left';c.fillText('BRACER',col.name,186);c.fillText('CLASSE',col.rank2-20,186);c.textAlign='center';c.fillText('PB',col.pb,186);c.fillText('TRADS',col.trads,186);
 const medals=['#ffd66b','#dfe6ee','#e0965a'];
 rows.forEach((row,i)=>{
  const y=TOP+i*ROW,mid=y+ROW/2,colour=row.couleurHex??'#ffffff';
  const panel=c.createLinearGradient(40,0,W-40,0);panel.addColorStop(0,'rgba(60,32,10,0)');panel.addColorStop(.12,i%2?'rgba(60,32,10,.42)':'rgba(84,46,14,.5)');panel.addColorStop(.88,i%2?'rgba(60,32,10,.42)':'rgba(84,46,14,.5)');panel.addColorStop(1,'rgba(60,32,10,0)');
  c.fillStyle=panel;c.fillRect(40,y+4,W-80,ROW-8);
  c.fillStyle=colour;c.fillRect(52,y+10,3,ROW-20);
  c.font=FONT(24,'bold');c.fillStyle=medals[i]??'#c9a679';c.shadowColor=medals[i]?EMBER:'transparent';c.shadowBlur=medals[i]?10:0;c.fillText(String(i+1).padStart(2,'0'),col.rank-6,mid+1);c.shadowBlur=0;
  // places won or lost since the day before
  if(row.placeChange){c.textAlign='left';c.font=FONT(14,'bold');c.fillStyle=row.placeChange>0?'#7fe08a':'#ff6b5e';c.fillText(`(${row.placeChange>0?'+':''}${row.placeChange})`,col.rank+12,mid+2);c.textAlign='center';}
  // the profile picture in a ring of the rank's colour
  c.save();c.beginPath();c.arc(col.avatar,mid,20,0,Math.PI*2);c.closePath();c.fillStyle='#1c120a';c.fill();c.clip();
  if(avatars[i])c.drawImage(avatars[i],col.avatar-20,mid-20,40,40);else{c.fillStyle=colour;c.font=FONT(20,'bold');c.fillText((row.pseudo?.[0]??'?').toUpperCase(),col.avatar,mid+1);}
  c.restore();c.strokeStyle=colour;c.lineWidth=2;c.shadowColor=colour;c.shadowBlur=8;c.beginPath();c.arc(col.avatar,mid,21,0,Math.PI*2);c.stroke();c.shadowBlur=0;
  c.textAlign='left';c.font=FONT(23,'bold');let name=row.pseudo??'Inconnu';while(c.measureText(name).width>270&&name.length>2)name=name.slice(0,-2)+'…';
  c.fillStyle='#fff3dc';c.shadowColor='rgba(255,140,40,.55)';c.shadowBlur=6;c.fillText(name,col.name,mid+1);c.shadowBlur=0;
  // no glow on the rank: a dark outline and a drop shadow keep it apart from the background
  c.font=FONT(21,'bold');c.lineJoin='round';c.lineWidth=4;c.strokeStyle='#120803';c.shadowColor='rgba(0,0,0,.9)';c.shadowBlur=4;c.shadowOffsetY=2;c.strokeText(row.nomRang??'',col.rank2-20,mid+1);c.shadowBlur=0;c.shadowOffsetY=0;c.fillStyle=colour;c.fillText(row.nomRang??'',col.rank2-20,mid+1);
  // points and the way to the next rank
  // the total, then what the previous day brought
  const total=row.seuilSuivant==='MAX'?`${thousands(row.pb)} · MAX`:`${thousands(row.pb)} / ${thousands(row.seuilSuivant)}`,gain=row.pbGain?` (+${thousands(row.pbGain)})`:'';
  c.font=FONT(19,'bold');const totalWidth=c.measureText(total).width;c.font=FONT(15,'bold');const gainWidth=gain?c.measureText(gain).width:0;
  c.textAlign='left';const start=col.pb-(totalWidth+gainWidth)/2;c.font=FONT(19,'bold');c.fillStyle='#ffe2a3';c.fillText(total,start,mid-6);
  if(gain){c.font=FONT(15,'bold');c.fillStyle='#7fe08a';c.fillText(gain,start+totalWidth,mid-5);}c.textAlign='center';
  const progress=row.seuilSuivant==='MAX'?1:Math.max(0,Math.min(1,(row.pb-(row.seuil??0))/((row.seuilSuivant-(row.seuil??0))||1)));
  c.fillStyle='rgba(0,0,0,.55)';c.fillRect(col.pb-90,mid+12,180,5);c.fillStyle=colour;c.shadowColor=colour;c.shadowBlur=6;c.fillRect(col.pb-90,mid+12,180*progress,5);c.shadowBlur=0;
  c.font=FONT(24,'bold');c.fillStyle='#fff3dc';c.fillText(String(row.trads??0),col.trads,mid+1);
 });
 if(!rows.length){c.font=FONT(24);c.fillStyle='#d9b26a';c.fillText('Aucun bracer classé.',W/2,TOP+40);}
 rule(TOP+Math.max(rows.length,1)*ROW+6,.6);
}
// What moves: a glow sliding along both friezes and a shine over the leader's row.
function drawFrame(c,f,height,rows){
 const t=f/FRAMES;
 c.save();c.globalCompositeOperation='lighter';
 for(const [y,dir] of [[20,1],[height-20,-1]]){const x=dir>0?-150+(W+300)*t:W+150-(W+300)*t,g=c.createRadialGradient(x,y,0,x,y,140);g.addColorStop(0,'rgba(255,190,80,.55)');g.addColorStop(1,'rgba(255,120,30,0)');c.fillStyle=g;c.fillRect(x-140,y-20,280,40);}
 if(rows.length&&f<10){const x=40+(W-80)*f/9,g=c.createLinearGradient(x-80,0,x+80,0);g.addColorStop(0,'rgba(255,220,140,0)');g.addColorStop(.5,'rgba(255,220,140,.16)');g.addColorStop(1,'rgba(255,220,140,0)');c.fillStyle=g;c.fillRect(Math.max(40,x-80),TOP+4,160,ROW-8);}
 c.restore();
}
// rows: {pseudo, avatar (an image, a buffer or null), pb, seuil, seuilSuivant (a number or 'MAX'), nomRang, trads, couleurHex,
// pbGain (points earned the day before), placeChange (places won, negative when lost)}
async function renderRankings(rows){
 const parts=await loadPieces(),height=TOP+Math.max(rows.length,1)*ROW+70;
 const avatars=await Promise.all(rows.map(r=>r.avatar?(Buffer.isBuffer(r.avatar)||typeof r.avatar==='string'?loadImage(r.avatar).catch(()=>null):r.avatar):null));
 const base=createCanvas(W,height);drawBoard(base.getContext('2d'),rows,avatars,height,parts);
 return encodeLoop(base,{frames:FRAMES,delay:DELAY,draw:(c,f)=>drawFrame(c,f,height,rows)});
}
module.exports={renderRankings};
