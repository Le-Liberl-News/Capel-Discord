const tankShared=require('./tank-shared.cjs'),grip=require('./tank-grip.cjs');
// The poms' tank: nearly indestructible, it comes down from the Mechapom fortress's feet in the first minute of the
// waves it leads (two in three: the third is the pom knight's, knight.cjs) and rolls up to the gate. It shells the
// walls, its crew fires at the guards, it sends homing rockets at the defenders (they stop following once close to
// their target and fly straight to where it stood then: who keeps moving dodges them), and its mechanical arms seize whoever comes too close (tank-grip.cjs).
const INTERVAL=5000,HP=15000,SPAWN_AFTER=45000,SPAWN_SPREAD=15000;
const ROCKET_EVERY=7000,ROCKET_REACH=70,ROCKET_SPEED=12,ROCKET_TURN=2.6,ROCKET_LOCK=4,ROCKET_LIFE=7000,ROCKET_HIT=1.3,ROCKET_DAMAGE=150;
const GRIP_REACH=5.5,GRIP_EVERY=5000,SLAM_DAMAGE=220;
// the wave's boss: the knight every third wave, the tank the others
const bossOf=wave=>wave.boss??=(wave.number%3===0?'knight':'tank');
function createTank({state,hash,emit,geometry,damageWall,hurt,kill,speech,wallX}){
 const players=()=>Object.values(state.players).filter(p=>p.online&&p.hp>0&&!p.pomControlled);
 const defenders=()=>[...players(),...state.soldiers.filter(s=>s.hp>0&&!s.transit)];
 function spawn(wave,pop){
  const f=state.mechapom?.grounded?state.mechapom:null,crew=Array.from({length:3},(_,i)=>({character:pop[hash(wave.id+'crew'+i)%pop.length].character,kind:i===2?'funebre':'daspi',nextShot:state.at+i*1500}));
  // at the fortress's feet, on its gate side; without it, at the forest's edge
  const x=f?Math.min(tankShared.STOP_X,f.x+14):-63,z=f?f.z+(hash(wave.id+'tank-side')%2?4:-4):[-.3,0,.3][hash(wave.id+'tank-lane')%3];
  const e={id:'pom-tank-'+wave.number,siegeTank:true,boss:true,name:'Char des poms',character:'SiegePom',pomCharacter:crew[0].character,stage:3,kind:'tank',flying:false,x,y:geometry()?.floor(x,z,4)??0,z,hp:HP,maxHP:HP,crew,arrivedAt:state.at,expiresAt:wave.ends,nextAttack:state.at+INTERVAL,nextRocket:state.at+ROCKET_EVERY,nextGrip:state.at,rockets:[],respawnAt:Number.MAX_SAFE_INTEGER};
  state.enemies.push(e);state.counts.total++;
  emit('tank-arrival','Un char détourné par trois poms descend de la forteresse Mechapom !',{tank:e.id,crew:crew.map(c=>({character:c.character,kind:c.kind})),position:{x:e.x,y:e.y,z:e.z},replay:require('./highlight-context.cjs').capture(state,{from:e.id,kind:'tank',position:{x:e.x,y:e.y,z:e.z}}),weather:state.weather?.kind??'clear'});
  speech(['Ils ont pris possession d’un char !']);wave.tankReactions=[{at:state.at+6500,line:'C’est quoi ce délire ?!'},{at:state.at+13500,line:'Tous aux abris !'}];
 }
 // a homing rocket: it steers towards its target until it is within ROCKET_LOCK of it, then flies straight on
 function fly(e,r,dt){
  const target=defenders().find(a=>a.id===r.to);
  if(r.homing&&target){const aim={x:target.x-r.x,y:target.y+1-r.y,z:target.z-r.z},d=Math.hypot(aim.x,aim.y,aim.z);
   // close enough: it commits to where its target stands now and flies straight there
   if(d<ROCKET_LOCK){r.homing=false;for(const axis of ['x','y','z'])r['v'+axis]=aim[axis]/d*ROCKET_SPEED;}
   else{const k=Math.min(1,ROCKET_TURN*dt);for(const axis of ['x','y','z'])r['v'+axis]+=(aim[axis]/d*ROCKET_SPEED-r['v'+axis])*k;const n=Math.hypot(r.vx,r.vy,r.vz)||1;for(const axis of ['x','y','z'])r['v'+axis]*=ROCKET_SPEED/n;}}
  const from={x:r.x,y:r.y,z:r.z};r.x+=r.vx*dt;r.y+=r.vy*dt;r.z+=r.vz*dt;
  const struck=defenders().find(a=>near(from,r,{x:a.x,y:a.y+1,z:a.z})<ROCKET_HIT),floor=geometry()?.floor(r.x,r.z,r.y+.5),hit=geometry()?.sweep(from,{x:r.x,y:r.y,z:r.z},.1);
  if(!struck&&!hit&&!(Number.isFinite(floor)&&r.y<floor)&&state.at-r.at<ROCKET_LIFE)return false;
  // the blast: on whoever it struck, and those standing right by
  const at=struck?{x:struck.x,y:struck.y+1,z:struck.z}:hit?.point??{x:r.x,y:r.y,z:r.z};
  for(const a of defenders())if(a===struck||Math.hypot(a.x-at.x,a.y+1-at.y,a.z-at.z)<ROCKET_HIT*1.6)hurt(a,ROCKET_DAMAGE,{actor:e.id});
  emit('tank-rocket-blast','',{from:e.id,to:struck?.id??null,position:at});return true;
 }
 // how close a point comes to the segment a rocket just flew (it can cover more than a body in one step)
 function near(a,b,p){const dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z,n=dx*dx+dy*dy+dz*dz,k=n?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy+(p.z-a.z)*dz)/n)):0;return Math.hypot(a.x+dx*k-p.x,a.y+dy*k-p.y,a.z+dz*k-p.z);}
 function seize(e,p){
  const dx=p.x-e.x,dz=p.z-e.z,n=Math.hypot(dx,dz)||1,away={x:dx/n,z:dz/n},from={x:p.x,y:p.y,z:p.z},pull={x:-away.x*grip.PULL,z:-away.z*grip.PULL};
  // flung back as far as the ground goes
  const top={x:from.x+pull.x,y:from.y+1,z:from.z+pull.z},end={x:top.x+away.x*grip.DISTANCE,y:top.y,z:top.z+away.z*grip.DISTANCE},hit=geometry()?.sweep(top,end,.4);
  p.tankGrip={at:state.at,tank:e.id,from,pull,away,distance:hit?Math.max(0,Math.hypot(hit.point.x-top.x,hit.point.z-top.z)-.6):grip.DISTANCE,slammed:false};
  Object.assign(p,{jump:null,climb:null,falling:false,input:{x:0,z:0},moving:false});
  emit('tank-grip','',{from:e.id,to:p.id,position:from});
 }
 function held(p){
  const g=p.tankGrip,pose=grip.gripPose(g,state.at);Object.assign(p,{x:pose.x,y:pose.y,z:pose.z});
  if(!g.slammed&&state.at-g.at>=grip.SLAM){g.slammed=true;hurt(p,SLAM_DAMAGE,{actor:g.tank});emit('tank-slam','',{from:g.tank,to:p.id,position:{x:p.x,y:p.y,z:p.z}});}
  if(pose.phase==='done'){p.tankGrip=null;const floor=geometry()?.floor(p.x,p.z,p.y+1);if(Number.isFinite(floor))p.y=floor;}
 }
 function update(dt,pop){const wave=state.wave;
  for(const p of Object.values(state.players))if(p.tankGrip&&(!wave||p.hp<=0||!p.online))p.tankGrip=null;else if(p.tankGrip)held(p);
  if(!wave)return;
  if(bossOf(wave)==='tank'){wave.tankAt??=wave.started+SPAWN_AFTER+hash(wave.id+'tank-time')%SPAWN_SPREAD;if(!wave.tankSpawned&&state.at>=wave.tankAt&&pop.length){wave.tankSpawned=true;spawn(wave,pop);}}
  for(const reaction of wave.tankReactions??[])if(!reaction.done&&state.at>=reaction.at){reaction.done=true;speech([reaction.line]);}
  for(const e of state.enemies.filter(e=>e.siegeTank&&e.hp>0)){if(state.at>=e.expiresAt){e.hp=0;kill(e);continue;}e.maxHP=Math.max(e.maxHP,HP);e.rockets??=[];
   const goal=tankShared.STOP_X,dx=goal-e.x;e.moving=Math.abs(dx)>.05;if(e.moving){const next={x:tankShared.advanceX(e.x,dt),y:e.y,z:e.z},g=geometry(),hit=g?.sweep({x:e.x,y:e.y+.8,z:e.z},{x:next.x,y:next.y+.8,z:next.z},.8);if(!hit)e.x=next.x;else e.moving=false;const floor=g?.floor(e.x,e.z,e.y+.8);if(floor!=null)e.y=floor;}
   // rockets
   // in short steps: a whole tick is longer than the lock's sphere, the last turn would land in the same step as the blast
   for(let left=dt;left>1e-6&&e.rockets.length;left-=.05)e.rockets=e.rockets.filter(r=>!fly(e,r,Math.min(.05,left)));
   if(state.at>=e.nextRocket){e.nextRocket=state.at+ROCKET_EVERY;const target=players().filter(p=>!p.tankGrip&&Math.hypot(p.x-e.x,p.z-e.z)<ROCKET_REACH).sort((a,b)=>Math.hypot(a.x-e.x,a.z-e.z)-Math.hypot(b.x-e.x,b.z-e.z))[0];
    if(target){const r={id:'tank-rocket-'+e.id+'-'+state.at,to:target.id,at:state.at,x:e.x,y:e.y+3.4,z:e.z,vx:0,vy:ROCKET_SPEED,vz:0,homing:true};e.rockets.push(r);emit('tank-rocket','',{from:e.id,to:target.id,origin:{x:r.x,y:r.y,z:r.z}});}}
   // the arms
   if(state.at>=e.nextGrip&&!players().some(p=>p.tankGrip?.tank===e.id)){const near=players().find(p=>!p.tankGrip&&!p.vehicleControl&&!p.lynxControl&&Math.abs(p.y-e.y)<3&&Math.hypot(p.x-e.x,p.z-e.z)<GRIP_REACH);if(near){e.nextGrip=state.at+GRIP_EVERY;seize(e,near);}}
   const walls=state.walls.filter(w=>w.hp>0),wall=walls[hash(e.id+'target'+Math.floor(state.at/INTERVAL))%Math.max(1,walls.length)];if(!wall)continue;
   if(state.at>=e.nextAttack){e.nextAttack=state.at+INTERVAL;const points=require('./catapult.cjs').straight({x:e.x+2.5,y:e.y+2.8,z:e.z},{x:wallX(wall),y:3,z:wall.z},geometry());state.shells.push({id:'tank-shell-'+e.id+'-'+state.at,from:e.id,wall:wall.id,at:state.at,points,damage:wall.maxHP*.00125,missile:true});emit('tank-shot','',{from:e.id,origin:points[0],aim:points.at(-1)});}
   for(const [i,c]of e.crew.entries()){if(state.at<c.nextShot)continue;c.nextShot=state.at+(c.kind==='funebre'?8000:3500);const target=state.soldiers.filter(g=>g.hp>0&&!g.transit).sort((a,b)=>Math.hypot(a.x-e.x,a.z-e.z)-Math.hypot(b.x-e.x,b.z-e.z))[0],origin={x:e.x,y:e.y+4,z:e.z+(i-1)*1.3};if(c.kind==='funebre'||!target){const points=require('./catapult.cjs').path(origin,{x:wallX(wall),y:3,z:wall.z},geometry());state.shells.push({id:'crew-shell-'+e.id+'-'+i+'-'+state.at,from:e.id,wall:wall.id,at:state.at,points,damage:wall.maxHP*.00005});}else if(!geometry()?.sweep(origin,{x:target.x,y:target.y+1.3,z:target.z},.08)){hurt(target,6);emit('attack','',{from:e.id,to:target.id,ranged:true,origin,aim:{x:target.x,y:target.y,z:target.z}});emit('fire-launch','',{from:e.id,origin,aim:{x:target.x,y:target.y+.6,z:target.z}});}}
  }
 }
 return {update};
}
module.exports={createTank,bossOf,INTERVAL,HP,ROCKET_LOCK,ROCKET_SPEED,GRIP_REACH,SLAM_DAMAGE,ROCKET_DAMAGE};
