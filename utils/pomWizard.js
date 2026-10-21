// The wizard poms (Pom-d'aspi, Pom funèbre) ride an orbal vacuum like a flying broom. Their bite is a spell: the pom
// circles above its target, casts a magic projectile at it and flies off; the target turns white, then either shrinks
// ('shrink') or fades away ('vanish': it catches the illness a few seconds later, told by the bot as usual).
// The vacuum is chat/vacuum.png when it exists, else a drawn stand-in; the spell is a drawn orb for now.
const path=require('node:path'),fs=require('node:fs');
const {createCanvas,loadImage}=require('@napi-rs/canvas');
const {parts}=require('./pomRendering');
const {SKY,seeded,bounds,encode,pomSprite,sheetOf,sheetFrame}=parts;
const VACUUM=path.join(SKY,'chat/vacuum.png');
const W=520,H=380,GROUND=362,VS=2,SOUTH_WEST=7;
let vacuumPicture;
async function vacuum(){
 if(vacuumPicture===undefined)vacuumPicture=fs.existsSync(VACUUM)?await loadImage(fs.readFileSync(VACUUM)):null;
 return vacuumPicture;
}
// the orbal vacuum, facing right (dir 1) or left (-1), its seat at (x, y), w long. chat/vacuum.png is FC's orbal vacuum
// (c13obj00._x2, the one stolen by the sky bandits, in their hideout c1306) lying like a broom, handle forward (right);
// the rider sits on its body, a quarter of its length from the back
function drawVacuum(x,picture,cx,cy,w,dir=1){
 x.save();x.translate(cx,cy);
 if(picture){x.scale(dir,1);const h=w*picture.height/picture.width;x.imageSmoothingEnabled=true;x.drawImage(picture,-w*.28,-h*.35,w,h);x.restore();return;}
 x.scale(dir,1);
 const h=w*.42;
 // the canister
 const g=x.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,'#7fb3c9');g.addColorStop(.5,'#3c6c86');g.addColorStop(1,'#1f3a4b');
 x.fillStyle=g;x.beginPath();x.ellipse(-w*.12,0,w*.34,h/2,0,0,Math.PI*2);x.fill();x.strokeStyle='#14252f';x.lineWidth=2;x.stroke();
 // its orbal light
 const o=x.createRadialGradient(-w*.18,-h*.05,1,-w*.18,-h*.05,h*.32);o.addColorStop(0,'#fff6c2');o.addColorStop(.4,'#ffb43c');o.addColorStop(1,'rgba(255,140,40,0)');
 x.fillStyle=o;x.beginPath();x.arc(-w*.18,-h*.05,h*.32,0,Math.PI*2);x.fill();
 // the hose and the nozzle, forward
 x.strokeStyle='#2b2b33';x.lineWidth=h*.18;x.lineCap='round';x.beginPath();x.moveTo(w*.18,-h*.05);x.quadraticCurveTo(w*.38,-h*.35,w*.5,h*.05);x.stroke();
 x.fillStyle='#505866';x.fillRect(w*.42,h*.05,w*.16,h*.14);
 // wheels
 x.fillStyle='#14252f';for(const wx of [-w*.36,w*.1]){x.beginPath();x.arc(wx,h*.42,h*.13,0,Math.PI*2);x.fill();}
 x.restore();
}
// the spell: a glowing orb with a trail of sparkles
function drawOrb(x,cx,cy,r,t){
 const g=x.createRadialGradient(cx,cy,1,cx,cy,r);g.addColorStop(0,'#ffffff');g.addColorStop(.3,'#e6b8ff');g.addColorStop(.7,'rgba(160,70,255,.7)');g.addColorStop(1,'rgba(120,40,255,0)');
 x.fillStyle=g;x.beginPath();x.arc(cx,cy,r,0,Math.PI*2);x.fill();
 x.strokeStyle='rgba(255,240,255,.9)';x.lineWidth=2;for(let k=0;k<4;k++){const a=t*1.7+k*Math.PI/2;x.beginPath();x.moveTo(cx+Math.cos(a)*r*.4,cy+Math.sin(a)*r*.4);x.lineTo(cx+Math.cos(a)*r*1.3,cy+Math.sin(a)*r*1.3);x.stroke();}
}
// sprite: 'aspi' or 'funebre'; victimSprite: 0 for a healthy character (its walk sheet), else its pom picture's key
async function renderWizardBite(character,sprite,victim,victimSprite=0,outcome='shrink',seed=Date.now()){
 const rng=seeded(seed),seat=await vacuum();
 const sheet=victimSprite?null:await sheetOf(victim),victimPom=victimSprite?await pomSprite(victim,victimSprite):null;
 if(!sheet&&!victimPom)return null;
 const pom=await pomSprite(character,sprite),[px0,py0,px1,py1]=bounds(pom);
 const vh=sheet?sheet.sheet.frameHeight*VS:120,vw=sheet?sheet.sheet.frameWidth*VS:120*(victimPom.width/victimPom.height);
 const ph=Math.round(vh*.5),pw=Math.round(ph*(px1-px0)/(py1-py0)),VX=320;
 const victimFrame=sheet?sheetFrame(sheet,SOUTH_WEST,0):victimPom;
 const sparks=[],frames=[],delays=[];
 // the victim, whitened by `white` (0..1), scaled from its feet, faded by alpha
 function drawVictim(x,{white=0,scale=1,alpha=1,shake=0}){
  if(alpha<=0)return;
  const w=vw*scale,h=vh*scale,c=createCanvas(Math.ceil(vw),Math.ceil(vh)),cx=c.getContext('2d');cx.imageSmoothingEnabled=!sheet;
  cx.drawImage(victimFrame,0,0,vw,vh);
  if(white>0){cx.globalCompositeOperation='source-atop';cx.fillStyle=`rgba(255,255,255,${white})`;cx.fillRect(0,0,vw,vh);}
  x.save();x.globalAlpha=alpha;x.imageSmoothingEnabled=false;x.drawImage(c,Math.round(VX-w/2+(shake?(rng()*2-1)*shake:0)),GROUND-h,w,h);x.restore();
 }
 function drawRider(x,{px,py,dir,tilt=0,scale=1,squash=1}){
  const w=pw*scale*(2-squash),h=ph*scale*squash;
  x.save();x.translate(px,py);x.rotate(tilt);
  drawVacuum(x,seat,0,0,pw*(seat?2.1:1.5)*scale,dir);
  x.imageSmoothingEnabled=true;x.drawImage(pom,px0,py0,px1-px0,py1-py0,-w/2,-h-4*scale,w,h);x.restore();
 }
 function frame(state,ms=55){
  const c=createCanvas(W,H),x=c.getContext('2d');
  const behind=state.rider&&state.rider.behind;
  if(behind)drawRider(x,state.rider);
  if(state.victim)drawVictim(x,state.victim);
  if(state.rider&&!behind)drawRider(x,state.rider);
  if(state.orb)drawOrb(x,state.orb[0],state.orb[1],state.orb[2],frames.length);
  if(state.ring){const [rx,ry,rr,ra]=state.ring;x.strokeStyle=`rgba(230,190,255,${ra})`;x.lineWidth=5;x.beginPath();x.ellipse(rx,ry,rr,rr*.6,0,0,Math.PI*2);x.stroke();}
  for(const s of sparks){x.fillStyle=`rgba(${s.c},${Math.max(0,s.life)})`;x.fillRect(s.x-s.r/2,s.y-s.r/2,s.r,s.r);}
  frames.push(c);delays.push(ms);
  for(const s of sparks){s.x+=s.vx;s.y+=s.vy;s.vy+=s.g;s.life-=.05;}
  for(let i=sparks.length-1;i>=0;i--)if(sparks[i].life<=0)sparks.splice(i,1);
 }
 const sparkle=(cx,cy,n,spread=6,c='240,210,255',g=.15)=>{for(let i=0;i<n;i++){const a=rng()*Math.PI*2,v=1+rng()*spread;sparks.push({x:cx,y:cy,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1,g,r:2+rng()*4,life:1,c});}};
 const chestY=GROUND-vh*.55,orbitY=GROUND-vh-28,lerp=(a,b,t)=>a+(b-a)*t;
 // 1. it flies in from the top left
 for(let i=0;i<=10;i++){const t=i/10;frame({rider:{px:lerp(-60,VX-130,t),py:lerp(40,orbitY,t)+Math.sin(i)*3,dir:1,tilt:-.15},victim:{}});}
 // 2. it circles above its target, a turn and a half
 const turns=34;
 for(let i=0;i<=turns;i++){const a=Math.PI+i/turns*Math.PI*3,sx=Math.cos(a),sz=Math.sin(a);
  frame({rider:{px:VX+sx*130,py:orbitY+sz*22+Math.sin(i*.7)*4,dir:-Math.sin(a)>=0?1:-1,tilt:-sx*.12,scale:1+sz*.12,behind:sz<0},victim:{}});}
 // 3. it stops on the left and casts
 const caster=[VX-130,orbitY];
 for(let i=0;i<8;i++){if(i===4)sparkle(caster[0]+pw*.4,caster[1]-ph*.6,14,4);frame({rider:{px:caster[0],py:caster[1],dir:1,squash:i%2?.9:1.08},victim:{}},65);}
 // 4. the projectile, then the hit
 for(let i=1;i<=10;i++){const t=i/10,ox=lerp(caster[0]+pw*.5,VX,t),oy=lerp(caster[1]-ph*.5,chestY,t)-Math.sin(t*Math.PI)*25;
  if(i%2)sparkle(ox,oy,3,1.5,'200,150,255',0);frame({rider:{px:caster[0],py:caster[1],dir:1},orb:[ox,oy,14],victim:{}},45);}
 sparkle(VX,chestY,30,7);
 // 5. the pom flies off to the top right while the target turns white
 for(let i=0;i<14;i++){const t=(i+1)/14;
  frame({rider:i<12?{px:lerp(caster[0],W+90,t*1.15),py:lerp(caster[1],-40,t*1.15),dir:1,tilt:-.25}:null,ring:i<8?[VX,chestY,10+i*9,1-i/8]:null,victim:{white:Math.min(1,t*1.4),shake:i<6?4:0}});}
 // 6. shrunk, or faded away
 if(outcome==='vanish'){
  for(let i=0;i<16;i++){if(i%3===0)sparkle(VX+(rng()*2-1)*vw*.3,GROUND-rng()*vh,5,2,'255,255,255',-.05);frame({victim:{white:1,alpha:1-(i+1)/16}},70);}
  for(let i=0;i<6;i++)frame({},80);
 }else{
  for(let i=0;i<12;i++)frame({victim:{white:1,scale:lerp(1,.35,(i+1)/12)}},60);
  for(let i=0;i<8;i++)frame({victim:{white:1-(i+1)/8,scale:.35}},70);
  for(let i=0;i<6;i++)frame({victim:{scale:.35,shake:i%2?1:0}},90);
 }
 delays[delays.length-1]=1600;
 return {attachment:encode(frames,delays,{once:true}),name:'sort.gif',outcome,duration:delays.reduce((a,b)=>a+b,0)};
}
module.exports={renderWizardBite,drawVacuum,vacuum};