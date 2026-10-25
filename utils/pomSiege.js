// The siege (rhumertume): three healthy characters back to back, one facing left, one facing us, one facing right,
// in their battle guard, each faced by a pom of stage 2 or 3. The poms leap, and then, as drawn by `outcome`:
//  'repel'   every fighter sends its pom flying off the screen;
//  'rescue'  one fighter's pom clings, the others shake theirs off and tear it away from their friend;
//  'flee'    one gets rid of its pom and runs away, the two others fall and are bitten again and again;
//  'devour'  all three are caught, fall and are bitten.
// Characters without battle sprites (catalogue of the activity) cannot fight: they back away trembling behind the
// others, and their pom always catches them unless a free fighter tears it away (in 'repel' and 'rescue').
const path=require('node:path'),fs=require('node:fs');
const {createCanvas,loadImage}=require('@napi-rs/canvas');
const {parts}=require('./pomRendering');
const {SKY,BLOOD,SPLASH,DROPS,BURST,seeded,bounds,encode,pomSprite,sheetOf,runSheetOf,sheetFrame}=parts;
const {drawVacuum,vacuum}=require('./pomWizard');
// the wizard poms (Pom-d'aspi, Pom funèbre) come flying on their orbal vacuum and jump off it to bite
const RIDERS=['aspi','funebre'],FLIGHT=70;
const W=560,H=360,S=1.4,BODY=82*S,POM=Math.round(BODY*.63),CX=280;
const WEST=0,EAST=4,SOUTH=6;
// the three places: x, y of the feet, direction faced, where its pom starts
const SLOTS={left:[CX-62,232,WEST,[40,232]],right:[CX+62,232,EAST,[W-40,232]],front:[CX,272,SOUTH,[CX,H-4]]};
const OUTCOMES=['repel','rescue','flee','devour'];
let catalogue;
const battleOf=character=>(catalogue??=JSON.parse(fs.readFileSync(path.join(SKY,'combat/catalogue.json'),'utf8')))[character]?.banks;
async function bank(b){return b&&{sheet:b,tex:await loadImage(fs.readFileSync(path.join(SKY,b.texture)))};}
// where the feet are in a frame: the run sheets say it, battle banks give the centre's offset, walk sheets stand on their bottom
function feetOf({sheet}){
 if(sheet.anchor)return sheet.anchor;
 if(sheet.centerY!=null)return [sheet.frameWidth/2+(sheet.centerX||0)/sheet.pixelScale,sheet.frameHeight/2+sheet.centerY/sheet.pixelScale];
 return [sheet.frameWidth/2,sheet.frameHeight-2];
}
// a character's pictures: guard and strike (battle banks 1 and 2), its walk and its run
async function actor(character){
 const banks=battleOf(character);
 const guard=await bank(banks?.['1']||banks?.['0']),strike=await bank(banks?.['2']?.rows>=4?banks['2']:null);
 return {character,guard,strike,walk:await sheetOf(character),running:await runSheetOf(character),fighter:Boolean(guard&&strike)};
}
// blood: splashes flying and falling, bursts swelling and fading (the tiles of Antoine's bite)
function bloodFx(rng,blood){
 const particles=[],bursts=[];
 return {
  spray(x,y,n,force=1){for(let i=0;i<n;i++){const a=-Math.PI*(.1+.8*rng()),v=(2+rng()*5)*force;
   particles.push({x,y,vx:Math.cos(a)*v*(rng()<.5?-1:1),vy:Math.sin(a)*v,tile:rng()<.7?SPLASH[Math.floor(rng()*2)]:DROPS[1+Math.floor(rng()*2)],size:8+rng()*12,spin:rng()*6.3,life:1});}},
  burst(x,y,big){bursts.push({x,y,t:0,tile:big?BURST[Math.floor(rng()*2)]:SPLASH[Math.floor(rng()*2)],size:big?110:56});},
  step(){
   for(const b of bursts)b.t+=.18;for(let i=bursts.length-1;i>=0;i--)if(bursts[i].t>=1)bursts.splice(i,1);
   for(const p of particles){p.x+=p.vx;p.y+=p.vy;p.vy+=.9;p.life-=.03;if(p.y>H)p.life=0;}
   for(let i=particles.length-1;i>=0;i--)if(particles[i].life<=0)particles.splice(i,1);
  },
  draw(x){
   for(const b of bursts){const [tx,ty,ts]=b.tile,s=b.size*(.5+b.t*.7);x.globalAlpha=Math.max(0,1-b.t);x.drawImage(blood,tx,ty,ts,ts,b.x-s/2,b.y-s/2,s,s);}
   for(const p of particles){const [tx,ty,ts]=p.tile;x.globalAlpha=Math.min(1,p.life*1.5);x.save();x.translate(p.x,p.y);x.rotate(p.spin);x.drawImage(blood,tx,ty,ts,ts,-p.size/2,-p.size/2,p.size,p.size);x.restore();}
   x.globalAlpha=1;
  }
 };
}
const lerp=(a,b,t)=>a+(b-a)*t;
// defenders: three {character}; attackers: three {character, stage}, each one facing the defender of the same rank
async function renderSiege(defenders,attackers,outcome,seed=Date.now()){
 return null; // Emergency: preserve the text/game outcome without generating GIF frames.
 const rng=seeded(seed),blood=await loadImage(fs.readFileSync(BLOOD)),fx=bloodFx(rng,blood);
 const actors=await Promise.all(defenders.map(d=>actor(d.character)));
 if(actors.some(a=>!a.walk&&!a.guard))return null;
 // fighters in front first, the frightened on the sides, where they back away behind the others
 const order=[...actors].sort((a,b)=>b.fighter-a.fighter),slotNames=['front','left','right'];
 const people=order.map((a,i)=>{const [x,y,dir,start]=SLOTS[slotNames[i]];
  return {...a,slot:slotNames[i],x,y,home:[x,y],homeDir:dir,dir,start,mode:'guard',t:0,k:0,angle:0,shake:0,gone:false};});
 const poms=await Promise.all(attackers.map(async(a,i)=>{
  const img=await pomSprite(a.character,a.stage),[x0,y0,x1,y1]=bounds(img),target=people[i];
  const rider=RIDERS.includes(a.stage);
  return {img,box:[x0,y0,x1,y1],w:Math.round(POM*(x1-x0)/(y1-y0)),x:target.start[0],y:target.start[1],angle:0,squash:1,scale:1,gone:false,on:null,target,rider,mounted:rider,lift:rider?FLIGHT:0};
 }));
 const fighters=people.filter(h=>h.fighter);
 // nobody can fight: nothing else can happen
 if(!fighters.length)outcome='devour';
 const free=poms.filter(p=>p.target.fighter),caught=poms.filter(p=>!p.target.fighter);
 if(outcome==='rescue'&&free.length<2)outcome=free.length?'flee':'devour';

 // ---- drawing
 const chest=(h,up=.55)=>{const l=BODY*up;return [h.x+Math.sin(h.angle)*l,h.y-Math.cos(h.angle)*l];};
 function frameOf(h){
  if(h.mode==='run'){const r=h.running||h.walk||h.guard;return [r,h.dir,h.running?h.t%8:(h.t*2)%8];}
  if(h.mode==='strike')return [h.strike,h.dir,Math.min(h.k,h.strike.sheet.rows-1)];
  if(h.fighter&&h.mode==='guard')return [h.guard,h.dir,(h.t>>2)%Math.min(2,h.guard.sheet.rows)];
  if(h.fighter)return [h.guard,h.dir,0];
  return [h.walk||h.guard,h.dir,0];
 }
 function drawPerson(x,h){
  if(h.gone)return;
  const [sheet,dir,frame]=frameOf(h),[fx0,fy0]=feetOf(sheet),{frameWidth:fw,frameHeight:fh}=sheet.sheet;
  x.save();x.translate(Math.round(h.x+(h.shake?(rng()*2-1)*h.shake:0)),Math.round(h.y));x.rotate(h.angle);
  x.drawImage(sheetFrame(sheet,dir,frame),-fx0*S,-fy0*S,fw*S,fh*S);x.restore();
 }
 // the way a pom faces (its vacuum's nose): towards its target
 const facing=p=>p.target.slot==='right'?-1:1;
 function drawPom(x,p){
  if(p.gone)return;
  const [x0,y0,x1,y1]=p.box,w=p.w*(2-p.squash)*p.scale,h=POM*p.squash*p.scale;
  if(p.mounted)drawVacuum(x,seat,Math.round(p.x),Math.round(p.y-p.lift)+4,p.w*(seat?2.1:1.5),facing(p));
  x.save();x.translate(Math.round(p.x),Math.round(p.y-p.lift));x.rotate(p.angle);x.imageSmoothingEnabled=true;
  x.drawImage(p.img,x0,y0,x1-x0,y1-y0,-w/2,-h,w,h);x.restore();
 }
 const frames=[],delays=[],vacuums=[],seat=await vacuum();
 function snap(ms=60){
  for(const v of vacuums){v.x+=v.vx;v.lift+=6;if(v.lift>H+80||v.x<-120||v.x>W+120)v.gone=true;}
  const c=createCanvas(W,H),x=c.getContext('2d');x.imageSmoothingEnabled=false;
  // farther first; a pom on someone just after them
  const items=[...people.map(h=>({y:h.y,draw:()=>drawPerson(x,h)})),...poms.map(p=>({y:p.on?p.on.y+.5:p.y,draw:()=>drawPom(x,p)})),
   ...vacuums.filter(v=>!v.gone).map(v=>({y:v.y,draw:()=>drawVacuum(x,seat,Math.round(v.x),Math.round(v.y-v.lift),v.w,v.dir)}))].sort((a,b)=>a.y-b.y);
  for(const it of items){it.draw();x.imageSmoothingEnabled=false;}
  fx.draw(x);frames.push(c);delays.push(ms);fx.step();for(const h of people)h.t++;
 }

 // ---- the script: tasks running side by side, frame by frame
 const tasks=[];
 const at=(start,len,fn)=>{tasks.push({start,len,fn});return start+len;};
 function play(until){for(let clock=0;clock<until;clock++){for(const t of tasks)if(clock>=t.start&&clock<t.start+t.len)t.fn(clock-t.start,t.len);snap();}}
 // 1. the stand-off: guards up, the frightened back away trembling, the poms bounce on the spot then creep closer
 for(const h of people)if(!h.fighter){
  h.mode='scared';const [hx,hy]=h.home,to=[lerp(hx,CX,.45),hy-14];
  at(0,30,t=>{h.shake=2;const k=Math.min(1,t/24);h.x=lerp(hx,to[0],k);h.y=lerp(hy,to[1],k);});
 }
 const stop=p=>{const h=p.target;return h.slot==='front'?[h.x,h.y+72]:[h.x+(h.slot==='left'?-105:105),h.y];};
 for(const p of poms){
  const from=[p.x,p.y];
  at(0,10,t=>{if(p.rider)p.lift=FLIGHT+Math.sin(t*.8)*4;else p.squash=t%4<2?.92:1.06;});
  at(10,14,(t,n)=>{const k=(t+1)/n,[sx,sy]=stop(p);p.x=lerp(from[0],sx,k);
   if(p.rider){p.y=lerp(from[1],sy,k);p.lift=FLIGHT+Math.sin(t*.8)*4;}else{p.y=lerp(from[1],sy,k)-Math.abs(Math.sin(k*Math.PI*3))*12;p.squash=t%2?.94:1.04;}});
 }
 // 2. the leap, a little out of step
 const LEAP=24,LEAP_LEN=8,landing=new Map();
 for(const p of poms){
  const d=Math.floor(rng()*3);landing.set(p,LEAP+d+LEAP_LEN);
  at(LEAP+d,LEAP_LEN,(t,n)=>{if(p.repelled)return;const h=p.target,k=(t+1)/n,[sx,sy]=stop(p),[cx,cy]=chest(h);
   // a rider jumps off its vacuum, which flies on and away
   if(p.rider){if(p.mounted){p.mounted=false;vacuums.push({x:p.x,y:p.y,lift:p.lift,w:p.w*(seat?2.1:1.5),dir:facing(p),vx:facing(p)*9});}p.lift=FLIGHT*(1-k);}
   p.x=lerp(sx,cx+(h.slot==='left'?-10:h.slot==='right'?10:0),k);p.y=lerp(sy,cy+POM*.5+(h.slot==='front'?14:0),k)-Math.sin(k*Math.PI)*60;p.squash=1.1;});
 }
 const contact=p=>landing.get(p);
 // ---- what may happen to a pom or a person
 // sent flying off the screen (sideways, or towards us for the front one)
 const fly=(p,start,side)=>at(start,16,t=>{
  p.on=null;p.repelled=true;p.squash=1;
  if(p.target.slot==='front'&&side==null){p.x+=t%2?4:-4;p.y+=18;p.scale=Math.min(2.2,p.scale*1.07);p.angle+=.5;}
  else{const s=side??(p.target.slot==='left'?-1:1);p.x+=s*24;p.y-=12-t*.9;p.angle+=s*.6;}
  if(t===15)p.gone=true;
 });
 const strikeLen=h=>h.strike.sheet.rows;
 // a fighter swings so that the blow lands as its pom arrives
 function strikeDown(p){
  const h=p.target,start=contact(p)-4;
  at(start,strikeLen(h),t=>{h.mode='strike';h.k=t;});at(start+strikeLen(h),1,()=>{h.mode='guard';});
  at(contact(p),1,()=>{const [cx,cy]=chest(h);fx.burst(cx+(h.slot==='left'?-30:h.slot==='right'?30:0),cy+(h.slot==='front'?30:0),false);});
  fly(p,contact(p));
  return start+strikeLen(h);
 }
 // a pom hanging on its target's chest, who shakes and bleeds
 const cling=(p,start,len)=>at(start,len,t=>{
  const h=p.target;p.on=h;const [cx,cy]=chest(h);
  p.x=cx+(h.slot==='left'?-8:h.slot==='right'?8:0)+Math.sin(t*.9)*3;p.y=cy+POM*.5+(h.slot==='front'?12:0);p.squash=t%6<3?.9:1.05;h.shake=4;
  if(t%5===0)fx.spray(cx,cy,3,.7);if(t%14===0)fx.burst(cx,cy,false);
 });
 // a free fighter runs to a caught friend, strikes, the pom flies off; then it goes back to its place
 function rescue(helper,p,start){
  const h=p.target,side=h.x>=helper.x?1:-1,spot=[h.x-side*44,h.y+4],from=[helper.x,helper.y];
  let t0=at(start,8,(t,n)=>{helper.mode='run';helper.dir=side>0?EAST:WEST;helper.x=lerp(from[0],spot[0],(t+1)/n);helper.y=lerp(from[1],spot[1],(t+1)/n);});
  const len=strikeLen(helper),hit=t0+Math.min(4,len-1);
  at(t0,len,t=>{helper.mode='strike';helper.k=t;});
  at(hit,1,()=>{const [cx,cy]=chest(h);fx.burst(cx,cy,true);fx.spray(cx,cy,10,1.1);});
  fly(p,hit,side);
  at(hit+1,40,()=>{h.shake=h.fighter?0:2;});
  t0=at(t0+len,8,(t,n)=>{helper.mode='run';helper.dir=side>0?WEST:EAST;helper.x=lerp(spot[0],helper.home[0],(t+1)/n);helper.y=lerp(spot[1],helper.home[1],(t+1)/n);});
  at(t0,1,()=>{helper.mode='guard';helper.dir=helper.homeDir;});
  return t0+1;
 }
 // knocked down outwards, the pom on top; then it bites again and again
 const fall=(h,start)=>at(start,7,t=>{const side=h.slot==='left'?-1:h.slot==='right'?1:(h.fallSide??=rng()<.5?-1:1);
  h.mode='down';h.shake=0;h.angle=side*Math.PI/2*Math.min(1,(t+1)/6);});
 const devour=(p,start,len)=>at(start,len,t=>{const h=p.target;p.on=h;const [cx,cy]=chest(h,.5);p.x=cx+Math.sin(t*.7)*4;p.y=cy+6;p.angle=0;
  p.squash=t%7<3?.82:1.08;if(t%7===3){fx.burst(cx,cy-6,t%21===3);fx.spray(cx,cy-8,6,.9);}});
 const runAway=(h,start)=>{const [vx,vy,dir]=h.slot==='left'?[-16,0,WEST]:h.slot==='right'?[16,0,EAST]:[0,12,SOUTH];
  return at(start,26,t=>{h.mode='run';h.dir=dir;h.x+=vx;h.y+=vy;h.shake=0;if(h.x<-80||h.x>W+80||h.y>H+140)h.gone=true;});};
 const overpower=p=>{cling(p,contact(p),14);fall(p.target,contact(p)+14);devour(p,contact(p)+21,60);return contact(p)+81;};

 let end,escaped=null;
 if(outcome==='repel'){
  // every fighter knocks its pom away; the frightened are caught, then freed one after another
  let t=Math.max(...free.map(strikeDown));
  for(const [i,p] of caught.entries()){const helper=fighters[i%fighters.length];cling(p,contact(p),t+10-contact(p));t=rescue(helper,p,t+2);}
  end=t+14;
 }else if(outcome==='rescue'){
  // one fighter is caught, the others knock their poms away and free it, then the frightened
  const victim=free[Math.floor(rng()*free.length)],helpers=free.filter(p=>p!==victim).map(p=>p.target);
  let t=Math.max(...free.filter(p=>p!==victim).map(strikeDown))+4;
  for(const [i,p] of [victim,...caught].entries()){cling(p,contact(p),t+10-contact(p));t=rescue(helpers[i%helpers.length],p,t+2);}
  end=t+14;
 }else if(outcome==='flee'){
  // one fighter gets rid of its pom and runs away; the two others are overpowered
  const escape=free[Math.floor(rng()*free.length)];
  escaped=escape.target.character;runAway(escape.target,strikeDown(escape)+2);
  end=Math.max(...poms.filter(p=>p!==escape).map(overpower));
 }else end=Math.max(...poms.map(overpower));
 play(end);
 // the last picture lingers
 delays[delays.length-1]=1800;
 const fallen=['flee','devour'].includes(outcome)?people.filter(h=>h.character!==escaped).map(h=>h.character):[];
 return {attachment:encode(frames,delays,{once:true}),name:'siege.gif',outcome,fallen,escaped,duration:delays.reduce((a,b)=>a+b,0)};
}
module.exports={renderSiege,OUTCOMES};