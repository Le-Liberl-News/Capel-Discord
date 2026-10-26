const path=require('node:path');
const {createCanvas,loadImage,GlobalFonts}=require('@napi-rs/canvas');
const {encodeLoop}=require('./loopingGif');
// Cinzel (the font of the retired activity's place titles) and the Axis Pillar's textures, kept in resources/rankings
GlobalFonts.registerFromPath(path.join(__dirname,'../resources/rankings/Cinzel.ttf'),'RankCinzel');
const AXIS=path.join(__dirname,'../resources/rankings');
const W=1024,TOP=200,ROW=56,DELAY=80,GOLD='#f3c45a',EMBER='#ff8a2a';
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
const mix=(a,b,t)=>{const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));const x=p(a),y=p(b);return '#'+x.map((v,i)=>Math.round(v+(y[i]-v)*t).toString(16).padStart(2,'0')).join('');};
const thousands=n=>typeof n==='number'?n.toLocaleString('fr-FR').replace(/\s/g,' '):String(n);
function drawBoard(c,rows,avatars,height,{circle,frieze}){
 const back=c.createRadialGradient(W/2,height*.46,40,W/2,height*.46,W*.75);back.addColorStop(0,'#2a1606');back.addColorStop(.55,'#120904');back.addColorStop(1,'#040201');
 c.fillStyle=back;c.fillRect(0,0,W,height);
 // the circle lies still behind the board
 c.globalAlpha=.28;c.drawImage(circle,W/2-330,height*.46-320,660,640);c.globalAlpha=1;
 for(let x=0;x<W;x+=256){c.drawImage(frieze,x,0);c.save();c.translate(x,height);c.scale(1,-1);c.drawImage(frieze,0,0);c.restore();}
 const rule=(y,alpha=1)=>{const g=c.createLinearGradient(20,0,W-20,0);g.addColorStop(0,'rgba(243,196,90,0)');g.addColorStop(.5,`rgba(243,196,90,${alpha})`);g.addColorStop(1,'rgba(243,196,90,0)');c.fillStyle=g;c.fillRect(20,y,W-40,1.5);};
 c.textBaseline='middle';c.textAlign='center';
 const title=c.createLinearGradient(0,92,0,138);title.addColorStop(0,'#fff1c4');title.addColorStop(.55,GOLD);title.addColorStop(1,'#b8701e');
 c.shadowColor=EMBER;c.shadowBlur=18;c.fillStyle=title;c.font=FONT(50,'bold');c.fillText('CLASSEMENT',W/2,114);c.shadowBlur=0;
 rule(166,.8);
 const col={bar:24,rank:50,change:70,avatar:122,name:152,klass:392,pb:640,trads:880};
 c.fillStyle='#d9b26a';c.font=FONT(16,'bold');c.fillText('RG',col.rank,186);c.textAlign='left';c.fillText('BRACER',col.name,186);c.fillText('CLASSE',col.klass,186);c.textAlign='center';c.fillText('PB',col.pb,186);c.fillText('TRADS',col.trads,186);
 const medals=['#ffd66b','#dfe6ee','#e0965a'];
 // a number, then in small green what the previous day added
 const withGain=(value,gain,x,y,size,colour)=>{const extra=gain?` (+${thousands(gain)})`:'';c.font=FONT(size,'bold');const w=c.measureText(value).width;c.font=FONT(Math.round(size*.68),'bold');const g=extra?c.measureText(extra).width:0;
  c.textAlign='left';const start=x-(w+g)/2;c.font=FONT(size,'bold');c.fillStyle=colour;c.fillText(value,start,y);if(extra){c.font=FONT(Math.round(size*.68),'bold');c.fillStyle='#7fe08a';c.fillText(extra,start+w,y+1);}c.textAlign='center';};
 rows.forEach((row,i)=>{
  const y=TOP+i*ROW,mid=y+ROW/2,colour=row.couleurHex??'#ffffff';
  const panel=c.createLinearGradient(14,0,W-14,0);panel.addColorStop(0,'rgba(60,32,10,0)');panel.addColorStop(.08,i%2?'rgba(60,32,10,.42)':'rgba(84,46,14,.5)');panel.addColorStop(.92,i%2?'rgba(60,32,10,.42)':'rgba(84,46,14,.5)');panel.addColorStop(1,'rgba(60,32,10,0)');
  c.fillStyle=panel;c.fillRect(14,y+4,W-28,ROW-8);
  c.fillStyle=colour;c.fillRect(col.bar,y+10,3,ROW-20);
  c.font=FONT(24,'bold');c.fillStyle=medals[i]??'#c9a679';c.shadowColor=medals[i]?EMBER:'transparent';c.shadowBlur=medals[i]?10:0;c.fillText(String(i+1).padStart(2,'0'),col.rank,mid+1);c.shadowBlur=0;
  // places won or lost since the day before
  if(row.placeChange){c.textAlign='left';c.font=FONT(14,'bold');c.fillStyle=row.placeChange>0?'#7fe08a':'#ff6b5e';c.fillText(`(${row.placeChange>0?'+':''}${row.placeChange})`,col.change,mid+2);c.textAlign='center';}
  // the profile picture in a ring of the rank's colour
  c.save();c.beginPath();c.arc(col.avatar,mid,20,0,Math.PI*2);c.closePath();c.fillStyle='#1c120a';c.fill();c.clip();
  if(avatars[i])c.drawImage(avatars[i],col.avatar-20,mid-20,40,40);else{c.fillStyle=colour;c.font=FONT(20,'bold');c.fillText((row.pseudo?.[0]??'?').toUpperCase(),col.avatar,mid+1);}
  c.restore();c.strokeStyle=colour;c.lineWidth=2;c.shadowColor=colour;c.shadowBlur=8;c.beginPath();c.arc(col.avatar,mid,21,0,Math.PI*2);c.stroke();c.shadowBlur=0;
  c.textAlign='left';c.font=FONT(23,'bold');let name=row.pseudo??'Inconnu';while(c.measureText(name).width>226&&name.length>2)name=name.slice(0,-2)+'…';
  c.fillStyle='#fff3dc';c.shadowColor='rgba(255,140,40,.55)';c.shadowBlur=6;c.fillText(name,col.name,mid+1);c.shadowBlur=0;
  // the rank in the game's menu lettering: light top half, a sharp dark band at the middle fading back to light at the bottom
  c.font=FONT(23,'bold');c.lineJoin='round';c.lineWidth=5;c.strokeStyle='#0d0602';c.shadowColor='rgba(0,0,0,.9)';c.shadowBlur=4;c.shadowOffsetY=2;c.strokeText(row.nomRang??'',col.klass,mid+1);c.shadowBlur=0;c.shadowOffsetY=0;
  const box=c.measureText(row.nomRang??''),top=mid+1-box.actualBoundingBoxAscent,bottom=mid+1+box.actualBoundingBoxDescent,letters=c.createLinearGradient(0,top,0,bottom);
  letters.addColorStop(0,mix(colour,'#ffffff',.88));letters.addColorStop(.5,mix(colour,'#ffffff',.6));letters.addColorStop(.52,mix(colour,'#000000',.12));letters.addColorStop(1,mix(colour,'#ffffff',.65));
  c.fillStyle=letters;c.fillText(row.nomRang??'',col.klass,mid+1);c.textAlign='center';
  // points, what the previous day brought and the way to the next rank
  withGain(row.seuilSuivant==='MAX'?`${thousands(row.pb)} · MAX`:`${thousands(row.pb)} / ${thousands(row.seuilSuivant)}`,row.pbGain,col.pb,mid-6,19,'#ffe2a3');
  const progress=row.seuilSuivant==='MAX'?1:Math.max(0,Math.min(1,(row.pb-(row.seuil??0))/((row.seuilSuivant-(row.seuil??0))||1)));
  c.fillStyle='rgba(0,0,0,.55)';c.fillRect(col.pb-85,mid+12,170,5);c.fillStyle=colour;c.shadowColor=colour;c.shadowBlur=6;c.fillRect(col.pb-85,mid+12,170*progress,5);c.shadowBlur=0;
  withGain(String(row.trads??0),row.tradsGain,col.trads,mid+1,24,'#fff3dc');
 });
 if(!rows.length){c.font=FONT(24);c.fillStyle='#d9b26a';c.fillText('Aucun bracer classé.',W/2,TOP+40);}
 rule(TOP+Math.max(rows.length,1)*ROW+6,.6);
}
// What moves: a shine sweeping over the leader's row, once every six seconds.
const SWEEP=12,PERIOD=6000;
function drawFrame(c,f,rows){
 if(!rows.length||f>=SWEEP)return;
 const x=14+(W-28)*f/(SWEEP-1),g=c.createLinearGradient(x-90,0,x+90,0);g.addColorStop(0,'rgba(255,220,140,0)');g.addColorStop(.5,'rgba(255,224,150,.34)');g.addColorStop(1,'rgba(255,220,140,0)');
 c.globalCompositeOperation='lighter';c.fillStyle=g;c.fillRect(Math.max(14,x-90),TOP+4,Math.min(W-14,x+90)-Math.max(14,x-90),ROW-8);
}
// rows: {pseudo, avatar (an image, a buffer or null), pb, seuil, seuilSuivant (a number or 'MAX'), nomRang, trads, couleurHex,
// pbGain and tradsGain (what the day before brought), placeChange (places won, negative when lost)}
async function renderRankings(rows){
 const parts=await loadPieces(),height=TOP+Math.max(rows.length,1)*ROW+70;
 const avatars=await Promise.all(rows.map(r=>r.avatar?(Buffer.isBuffer(r.avatar)||typeof r.avatar==='string'?loadImage(r.avatar).catch(()=>null):r.avatar):null));
 const base=createCanvas(W,height);drawBoard(base.getContext('2d'),rows,avatars,height,parts);
 return encodeLoop(base,{frames:SWEEP+1,delay:f=>f<SWEEP?DELAY:PERIOD-SWEEP*DELAY,draw:(c,f)=>drawFrame(c,f,rows)});
}
module.exports={renderRankings};
