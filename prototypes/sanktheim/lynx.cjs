const flight=require('../../activity/airship-physics.cjs');
const DOCK={x:-2,y:.04,z:14},HP=1200;
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function createLynx({siege,now=()=>siege._state.at,geometry=null,scale=1}){
 const state=siege._state;state.lynx??={...DOCK,yaw:Math.PI/2,pitch:-.35,hp:HP,maxHP:HP,pilot:null,mode:'ground',shots:[]};const ship=state.lynx;for(const key of ['vx','vy','vz','roll'])if(!Number.isFinite(ship[key]))ship[key]=0;if(!ship.pilot&&ship.mode==='ground')Object.assign(ship,DOCK);let previous=now(),accumulator=0;const ground={meta:{origin:{x:-360,z:-110},width:411,height:221,step:1,minY:0,maxY:90},floor:(x,z)=>geometry?geometry.floor(x*scale,z*scale,150*scale)/scale:0};
 function release(){const p=state.players[ship.pilot];if(p){p.lynxControl=false;Object.assign(p,{x:DOCK.x+4,y:DOCK.y,z:DOCK.z,onWall:false,falling:false,fallVelocity:0,jump:null});}Object.assign(ship,{...DOCK,pilot:null,mode:'ground',hp:HP,controls:null,vx:0,vy:0,vz:0,roll:0,pitch:0,grounded:true,crashRemaining:0});}
 function action(id,a,scale=1){const p=state.players[id];if(!p?.online||p.hp<=0||p.pomControlled)return {error:'Réservé aux défenseurs en vie.'};
  if(a.kind==='board'){if(p.vehicleControl||p.turretControl)return {error:'Quittez le véhicule actuel.'};if(ship.pilot)return {error:'Le Lynx est déjà piloté.'};if(Math.hypot(p.x/scale-DOCK.x,p.z/scale-DOCK.z)>8||Math.abs(p.y/scale-DOCK.y)>2)return {error:'Approchez du Lynx côté Zeiss.'};ship.pilot=id;ship.mode='takeoff';Object.assign(ship,{vx:0,vy:0,vz:0,roll:0,pitch:0,throttle:.6,grounded:false,checkpoint:{...DOCK,yaw:Math.PI/2}});p.lynxControl=true;p.jump=null;p.climb=null;siege.cancelChopping(p);return {ok:true};}
  if(ship.pilot!==id)return {error:'Vous ne pilotez pas le Lynx.'};if(a.kind==='land'){ship.mode='landing';return {ok:true};}return {error:'ManÅ“uvre inconnue.'};
 }
 function input(id,c){if(ship.pilot!==id||!c)return;const values=['yaw','pitch','forward','side','vertical'];if(values.some(k=>!Number.isFinite(c[k])))return;ship.controls={yaw:c.yaw%(2*Math.PI),pitch:clamp(c.pitch,-1.1,1.1),forward:clamp(c.forward,-1,1),side:clamp(c.side,-1,1),vertical:clamp(c.vertical,-1,1),fire:c.fire===true,at:now()};}
 function update(){const t=now(),dt=clamp((t-previous)/1000,0,.25);previous=t;ship.shots=ship.shots.filter(s=>t-s.at<350);
  const p=state.players[ship.pilot];if(!ship.pilot)return;if(!p?.online||p.hp<=0||p.pomControlled||ship.hp<=0||state.stoppedAt){release();return;}
  if(ship.mode==='takeoff'){ship.y=Math.min(24,ship.y+10*dt);if(ship.y>=24){ship.mode='flight';ship.vx=-Math.sin(ship.yaw)*9;ship.vz=-Math.cos(ship.yaw)*9;}}
  if(ship.mode==='landing'){const dx=DOCK.x-ship.x,dz=DOCK.z-ship.z,d=Math.hypot(dx,dz);if(d>1){ship.y=Math.max(24,ship.y);ship.x+=dx/d*Math.min(d,18*dt);ship.z+=dz/d*Math.min(d,18*dt);}else{ship.y=Math.max(DOCK.y,ship.y-8*dt);if(ship.y<=DOCK.y){release();return;}}}
  const c=ship.controls&&t-ship.controls.at<700?ship.controls:{yaw:ship.yaw,pitch:ship.pitch,forward:0,side:0,vertical:0,fire:false};if(ship.mode==='flight'){
   ship.throttle=clamp((ship.throttle??.6)+c.forward*dt*.35,.35,1);let turn=c.side;
   if(ship.x< -345||ship.x>25||Math.abs(ship.z)>100){const desired=Math.atan2(-(-160-ship.x),-(0-ship.z)),delta=Math.atan2(Math.sin(desired-ship.yaw),Math.cos(desired-ship.yaw));turn=-Math.sign(delta)*.9;}
   accumulator+=dt;while(accumulator>=flight.DT){accumulator-=flight.DT;flight.stepAirship(ship,{pitch:c.vertical,roll:turn,throttle:ship.throttle},ground,DOCK);}
   if(ship.crashRemaining>0){ship.hp=Math.max(0,ship.hp-200);ship.mode='landing';ship.crashRemaining=0;}
   const fx=-Math.sin(c.yaw),fz=-Math.cos(c.yaw);
   if(c.fire&&t>=(ship.nextShot??0)){ship.nextShot=t+110;const dir={x:fx*Math.cos(c.pitch),y:Math.sin(c.pitch),z:fz*Math.cos(c.pitch)};let target=null,dist=90;
    for(const e of state.enemies){if(!e.flying||e.hp<=0||e.escaped)continue;const dx=e.x-ship.x,dy=e.y-ship.y,dz=e.z-ship.z,along=dx*dir.x+dy*dir.y+dz*dir.z;if(along>0&&along<dist&&dx*dx+dy*dy+dz*dz-along*along<2.2**2){target=e;dist=along;}}
    if(target){const damage=Math.min(12,target.hp);require('../../utils/activityDamage').applyDamage(target,damage,t,{actor:p.id});siege.registerDamage({actor:p.id,target,amount:damage,lethal:target.hp<=0});if(target.hp<=0)siege.recordDeath(target);}
    ship.shots.push({at:t,from:{x:ship.x,y:ship.y,z:ship.z},to:{x:ship.x+dir.x*dist,y:ship.y+dir.y*dist,z:ship.z+dir.z*dist},hit:!!target});
   }
  }
  Object.assign(p,{x:ship.x,y:ship.y,z:ship.z,falling:false,fallVelocity:0,onWall:false,input:{x:0,z:0}});
  for(const e of state.enemies){if(!e.flying||e.hp<=0||e.escaped)continue;const d=Math.hypot(e.x-ship.x,e.z-ship.z);e.airDogfight=ship.mode==='flight'&&ship.x<-28&&d<65;if(!e.airDogfight)continue;const angle=t*.00065+Number(e.id.replace(/\D/g,'')),goal={x:ship.x+Math.cos(angle)*10,z:ship.z+Math.sin(angle)*10,y:ship.y+Math.sin(angle*.7)*3},distance=Math.hypot(goal.x-e.x,goal.y-e.y,goal.z-e.z)||1,step=Math.min(distance,10*dt);e.x+=(goal.x-e.x)/distance*step;e.y+=(goal.y-e.y)/distance*step;e.z+=(goal.z-e.z)/distance*step;e.heading={dx:(ship.x-e.x)/(d||1),dz:(ship.z-e.z)/(d||1)};e.moving=true;if(distance<18&&t>=(e.nextAirShot??0)){e.nextAirShot=t+1600;ship.hp=Math.max(0,ship.hp-8);ship.shots.push({at:t,enemy:true,from:{x:e.x,y:e.y,z:e.z},to:{x:ship.x,y:ship.y,z:ship.z}});}}
 }
 return {action,input,update,release};
}
module.exports={createLynx,DOCK,HP};
