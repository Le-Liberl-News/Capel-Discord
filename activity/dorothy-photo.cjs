const {applyStatus}=require('./combat-status.cjs');
function resolvePhoto(attack,actor,room,canDamage,geometry){
 const dx=attack.aim.x-attack.origin.x,dz=attack.aim.z-attack.origin.z,n=Math.hypot(dx,dz)||1;
 for(const target of room.values()){
  const x=target.x-actor.x,z=target.z-actor.z,d=Math.hypot(x,z),f=target.heading;
  // the flash lights the half of the map Dorothy faces, with no range limit: only walls stop it
  if(target.id===actor.id||target.hp<=0||target.spectator||target.duelProtected||!canDamage(actor,target)||d<.05||(x*dx+z*dz)/(d*n)<=0)continue;
  // the target catches it unless Dorothy stands in the 90° cone behind it (beyond 135°, the limit itself still dazzles); no known heading means not turning its back
  if(f&&(-x*f.dx-z*f.dz)/(d*(Math.hypot(f.dx,f.dz)||1))<-Math.SQRT1_2-1e-9)continue;
  const from={x:actor.x,y:(actor.y??0)+1,z:actor.z},to={x:target.x,y:(target.y??0)+1,z:target.z};if(geometry?.sweep(from,to,.02))continue;
  const at=attack.impactAt;
  applyStatus(target,{status:'stun',statusDuration:2000},at);
  applyStatus(target,{status:'slow',statusDuration:7000,slowFactor:.7},at);
  target.photoFlash={actor:actor.id,started:at,recoveryAt:at+2000,until:at+7000};
  attack.hits.push({id:target.id,at,photo:true,point:to});
 }
}
function photoStrength(flash,time){return !flash||time>=flash.until?0:time<=flash.recoveryAt?1:Math.max(0,(flash.until-time)/5000);}
module.exports={resolvePhoto,photoStrength};
