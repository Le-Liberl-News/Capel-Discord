const {along,ROUTE}=require('./mechapom.cjs'),{bossOf}=require('./tank.cjs'),fling=require('./knight-fling.cjs');
// The pom knight (knight-view.mjs): one wave in three, instead of the tank, an armoured pom with a lance comes down
// from the Mechapom fortress's feet and walks, very slowly, the forest path to the gate. Nothing stops it: it smashes
// the barricades and turrets in its way and walks over the mines (each of them holds it up a moment); whoever stands in
// its way, but the guards, loses half their health and is flung far away (knight-fling.cjs). At the gate it strikes
// the central door: a tenth of its strength in two minutes, until it falls.
// Its pace: the whole path (the fortress at its farthest) in eight minutes, so it is at the gate in less.
const HP=50000,SPAWN_AFTER=12000,PATH_TIME=480000,REACH=3.2,STRIKE_PAUSE=700,STRIKE_EVERY=2500,SMASH_PAUSE=1500,MINE_PAUSE=1200,SMASH_REACH=2.6;
const GATE_EVERY=3000,GATE_SHARE=.10,GATE_TIME=120000;
const ROUTE_LENGTH=ROUTE.reduce((s,p,i)=>i?s+Math.hypot(p[0]-ROUTE[i-1][0],p[1]-ROUTE[i-1][1]):0,0);
function createKnight({state,hash,emit,geometry,damageWall,hurt,kill,speech,wallX}){
 const players=()=>Object.values(state.players).filter(p=>p.online&&p.hp>0&&!p.pomControlled);
 const gate=()=>state.walls.find(w=>w.id==='gate');
 const ground=(x,z,y=0)=>{const h=geometry()?.floor?.(x,z,y+3);return Number.isFinite(h)&&h>-6&&h<6?h:0;};
 // where it stands before the gate, on the assault side
 const gateFront=()=>({x:wallX(gate()??{z:0})-1.6,z:0});
 const total=()=>ROUTE_LENGTH+Math.hypot(gateFront().x-ROUTE.at(-1)[0],gateFront().z-ROUTE.at(-1)[1]);
 const speed=()=>total()/(PATH_TIME/1000);
 function spawn(wave,pop){
  // at the fortress's feet, a little ahead of it on the path
  const f=state.mechapom?.grounded?state.mechapom:null,k=Math.min(1,(f?.progress??0)+(f?10/ROUTE_LENGTH:0)),start=along(k),person=pop[hash(wave.id+'knight')%pop.length];
  const x=start.x,z=start.z;
  const e={id:'pom-knight-'+wave.number,knight:true,boss:true,name:'Chevalier pom',character:'SiegePom',pomCharacter:person.character,stage:1,kind:'knight',flying:false,x,y:ground(x,z),z,hp:HP,maxHP:HP,routeK:k,heading:{dx:1,dz:0},moving:true,pauseUntil:state.at+2500,nextStrike:0,nextGateStrike:0,respawnAt:Number.MAX_SAFE_INTEGER};
  state.enemies.push(e);state.counts.total++;
  emit('knight-arrival','Un chevalier pom descend de la forteresse Mechapom et marche lentement sur Sanktheim…',{knight:e.id,character:person.character,position:{x,y:e.y,z}});
  speech(['Qu’est-ce que… c’est un pom, ça ?','Il a une lance ?!']);
 }
 // its step: along the path while it lasts, then straight to the gate; true once there
 function walk(e,dt){
  let left=speed()*dt;
  if(e.routeK<1){const before=along(e.routeK);e.routeK=Math.min(1,e.routeK+left/ROUTE_LENGTH);const p=along(e.routeK);e.heading={dx:p.x-before.x,dz:p.z-before.z};Object.assign(e,{x:p.x,z:p.z});return false;}
  const g=gateFront(),dx=g.x-e.x,dz=g.z-e.z,d=Math.hypot(dx,dz);if(d<.05)return true;
  const step=Math.min(d,left);e.x+=dx/d*step;e.z+=dz/d*step;e.heading={dx:dx/d,dz:dz/d};return d-step<.05;
 }
 // traps in its way: smashed one after the other, each holding it up a moment
 function smash(e){
  for(const b of state.barricades??[])if(b.hp>0&&Math.hypot(b.x-e.x,b.z-e.z)<SMASH_REACH){b.hp=0;kill(b);e.pauseUntil=state.at+SMASH_PAUSE;e.smashAt=state.at;emit('knight-smash','',{from:e.id,to:b.id,position:{x:b.x,y:b.y,z:b.z}});return true;}
  for(const t of state.turrets??[])if(t.hp>0&&Math.hypot(t.x-e.x,t.z-e.z)<SMASH_REACH&&Math.abs(t.y-e.y)<3){t.hp=0;kill(t);e.pauseUntil=state.at+SMASH_PAUSE;e.smashAt=state.at;emit('knight-smash','',{from:e.id,to:t.id,position:{x:t.x,y:t.y,z:t.z}});return true;}
  return false;
 }
 // the defenders in its way: half their health, and flung far
 function strike(e){
  const victims=players().filter(p=>!p.knightFling&&!p.tankGrip&&!p.vehicleControl&&Math.abs(p.y-e.y)<3&&Math.hypot(p.x-e.x,p.z-e.z)<REACH&&state.at>=(p.knightSafeUntil??0));
  if(!victims.length)return false;
  for(const p of victims){
   const dx=p.x-e.x,dz=p.z-e.z,n=Math.hypot(dx,dz)||1,h=Math.hypot(e.heading.dx,e.heading.dz)||1,away={x:dx/n*.6+e.heading.dx/h*.4,z:dz/n*.6+e.heading.dz/h*.4},m=Math.hypot(away.x,away.z)||1;
   const dir={x:away.x/m,z:away.z/m},from={x:p.x,y:p.y,z:p.z},end={x:from.x+dir.x*fling.DISTANCE,y:from.y+1,z:from.z+dir.z*fling.DISTANCE},hit=geometry()?.sweep({...from,y:from.y+1},end,.4);
   hurt(p,p.maxHP*.5,{actor:e.id});
   p.knightFling={at:state.at,from,away:dir,distance:hit?Math.max(0,Math.hypot(hit.point.x-from.x,hit.point.z-from.z)-.6):fling.DISTANCE};p.knightSafeUntil=state.at+fling.FLIGHT+1500;
   Object.assign(p,{jump:null,climb:null,falling:false,input:{x:0,z:0},moving:false});
   emit('knight-strike','',{from:e.id,to:p.id,position:from});
  }
  e.strikeAt=state.at;e.pauseUntil=state.at+STRIKE_PAUSE;return true;
 }
 function flown(p){const pose=fling.flingPose(p.knightFling,state.at);Object.assign(p,{x:pose.x,y:pose.y,z:pose.z});if(pose.done){p.knightFling=null;p.y=ground(p.x,p.z,p.y);}}
 function update(dt,pop){
  for(const p of Object.values(state.players))if(p.knightFling&&(!state.wave||p.hp<=0||!p.online))p.knightFling=null;else if(p.knightFling)flown(p);
  const wave=state.wave;if(!wave)return;
  if(bossOf(wave,state)==='knight'&&!wave.knightSpawned&&state.at>=wave.started+SPAWN_AFTER&&pop.length){wave.knightSpawned=true;spawn(wave,pop);}
  for(const e of state.enemies.filter(e=>e.knight&&e.hp>0)){
   e.y=ground(e.x,e.z,e.y);e.moving=false;
   if(strike(e)||state.at<e.pauseUntil||smash(e))continue;
   if(!e.atGate){e.moving=true;if(walk(e,dt)){e.atGate=true;e.atGateSince=state.at;emit('knight-gate','Le chevalier pom est devant la porte de Sanktheim et commence à la frapper !',{from:e.id,position:{x:e.x,y:e.y,z:e.z}});}continue;}
   // at the gate: a tenth of its strength in two minutes
   const g=gate();e.heading={dx:1,dz:0};
   if(g&&g.hp>0&&state.at>=e.nextGateStrike){e.nextGateStrike=state.at+GATE_EVERY;e.strikeAt=state.at;damageWall(g,g.maxHP*GATE_SHARE*GATE_EVERY/GATE_TIME,{from:e.id,position:{x:wallX(g)-.03,y:2.2,z:e.z},kind:'knight'});emit('knight-gate-strike','',{from:e.id,position:{x:wallX(g),y:2.2,z:e.z}});}
  }
 }
 return {update};
}
module.exports={createKnight,HP,PATH_TIME,REACH,ROUTE_LENGTH,GATE_SHARE,GATE_TIME,GATE_EVERY};
