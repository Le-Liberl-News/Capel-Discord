const cannon=require('../activity/don-cannon.cjs');
const {immobilized,applyStatus}=require('../activity/combat-status.cjs');
const {rayBody}=require('../activity/fps-combat.cjs');
function startDon(player,command,spec,time,{validateRay}){
 const origin={x:player.x,y:player.y??0,z:player.z};let ray=null;
 if(command.kind==='basic'){ray=validateRay(player,command.ray);if(!ray)return {error:'Visée invalide.'};}
 const h=ray?.direction??{x:player.heading?.dx??0,z:player.heading?.dz??1},n=Math.hypot(h.x,h.z)||1;
 return {id:command.id,actor:player.id,character:'Don',kind:command.kind,special:'donCannon',technique:spec.name,origin,aim:{x:origin.x+h.x/n*.8,y:origin.y,z:origin.z+h.z/n*.8},ray,started:time,impactAt:time+(command.kind==='craft'?spec.impactAt:spec.windup+cannon.MAX_FLIGHT),endsAt:time+(command.kind==='craft'?spec.duration+1300:spec.windup+cannon.MAX_FLIGHT+1300),hits:[],resolved:false,nextHit:0};
}
function tickDon(a,s,actor,room,time,{geometry,floor,canDamage,hurt,project}){
 const age=time-a.started;if(a.resolved){if(a.kind==='craft'&&age>=s.duration)a.dashFinished=true;return;}
 const blast=(point,at)=>{
  a.explodedAt=at;a.explosionPoint={...point};a.aim={...point};a.impactAt=at;a.endsAt=Math.max(a.started+s.duration,at+1300);a.resolved=true;
  for(const target of room.values()){
   if(a.cancelled)break;
   if(target.id===a.actor||target.hp<=0||target.spectator||target.duelProtected||!canDamage(actor,target)||Math.abs((target.y??0)-point.y)>2||Math.hypot(target.x-point.x,target.z-point.z)>s.radius+(target.boss?1:0))continue;
   if(geometry?.sweep({...point,y:point.y+.3},{x:target.x,y:(target.y??0)+.8,z:target.z},.05))continue;
   const dealt=hurt(a,actor,target,s.damage,at,{point:{x:target.x,y:(target.y??0)+.8,z:target.z},quiet:true});a.hits.push({id:target.id,at,...dealt});
   if(a.kind==='craft'&&dealt.damage>0&&target.hp>0)applyStatus(target,{status:'stun',statusDuration:s.stunDuration},at);
  }
 };
 if(!actor||actor.character!=='Don'||((actor.hp<=0||immobilized(actor,time))&&!a.projectile)){
  a.cancelled=true;a.resolved=true;a.dashFinished=true;if(actor&&a.kind==='craft')actor.y=floor(actor)??a.origin.y;return;
 }
 if(a.kind==='craft'){
  Object.assign(actor,cannon.motion(a,age).position);actor.acceptedAt=time;actor.moving=false;
  if(age>=s.impactAt){actor.y=a.origin.y;blast(a.aim,a.started+s.impactAt);}
  return;
 }
 if(age<s.windup)return;
 if(!a.projectile){
  a.projectile={...cannon.launch({...a.ray.origin,x:actor.x,y:(actor.y??0)+1.45,z:actor.z},a.ray.direction),started:a.started+s.windup};
  project(a,actor,actor,{knockback:1.3,knockbackDuration:220},{x:-a.ray.direction.x,z:-a.ray.direction.z},a.projectile.started);
  const wall=geometry?.sweep({...actor,y:(actor.y??0)+1.45},a.projectile.origin,.14);if(wall){blast(wall.point,a.projectile.started);return;}
 }
 const until=Math.min(cannon.MAX_FLIGHT,time-a.projectile.started);let prevTime=a.flightTime??0,prev=cannon.ballPoint(a.projectile,prevTime);
 while(prevTime<until){
  const nextTime=Math.min(until,prevTime+1000/60),next=cannon.ballPoint(a.projectile,nextTime),delta={x:next.x-prev.x,y:next.y-prev.y,z:next.z-prev.z},length=Math.hypot(delta.x,delta.y,delta.z),dir={x:delta.x/(length||1),y:delta.y/(length||1),z:delta.z/(length||1)};
  let contact=geometry?.sweep(prev,next,.14)?.point,nearest=contact?Math.hypot(contact.x-prev.x,contact.y-prev.y,contact.z-prev.z):Infinity;
  const ground=floor(next);if(Number.isFinite(ground)&&next.y<=ground+.12){const t=Math.max(0,Math.min(1,(prev.y-ground-.12)/(prev.y-next.y||1))),p={x:prev.x+delta.x*t,y:ground,z:prev.z+delta.z*t},d=Math.hypot(p.x-prev.x,p.y-prev.y,p.z-prev.z);if(d<nearest){contact=p;nearest=d;}}
  for(const target of room.values())if(target.id!==a.actor&&target.hp>0&&!target.spectator&&!target.duelProtected&&canDamage(actor,target)){const hit=rayBody(prev,dir,target,length,.14);if(hit&&hit.distance<nearest){contact=hit.point;nearest=hit.distance;}}
  if(contact){blast(contact,a.projectile.started+prevTime+(nextTime-prevTime)*Math.min(1,nearest/(length||1)));return;}
  prevTime=nextTime;prev=next;
 }
 a.flightTime=until;if(until>=cannon.MAX_FLIGHT){a.resolved=true;a.expired=true;a.endsAt=time;}
}
module.exports={startDon,tickDon};
