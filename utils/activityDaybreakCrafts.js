const {motion,exitPoint,gatherPoint}=require('../activity/daybreak-crafts.cjs');
const {segmentDistance}=require('../activity/combat-projection.cjs');
const {applyStatus,immobilized}=require('../activity/combat-status.cjs');
function release(a,room,time){for(const id of a.caught??[]){const target=room.get(id);if(target?.stunUntil===a.holdUntil)target.stunUntil=time;if(a.cancelled&&target?.knockback?.id===a.id+':'+id){if(target.combatLockedUntil===target.knockback.started+target.knockback.duration)target.combatLockedUntil=time;target.knockback=null;}}}
function tickDaybreak(a,s,actor,room,time,{geometry,canDamage,hurt,floor,catchTarget}){
 if(a.resolved)return;
 if(!actor||actor.hp<=0||actor.character!==a.character||actor.spectator||immobilized(actor,time)){
  a.cancelled=true;a.resolved=true;a.dashFinished=true;release(a,room,time);
  if(actor&&actor.character===a.character){const ground=floor?.(actor);actor.y=Number.isFinite(ground)?ground:a.daybreakGroundY??a.origin.y;actor.combatLockedUntil=time;}return;
 }
 const age=time-a.started,p=motion(a,age,s).position;a.daybreakGroundY=p.y;Object.assign(actor,p);actor.acceptedAt=time;actor.moving=false;
 if(s.coinShot&&!a.coinReleased&&age>=s.fireAt){
  const target=room.get(a.target);a.coinReleased=true;
  if(!target||target.hp<=0||target.spectator||target.duelProtected||!canDamage(actor,target)||Math.hypot(target.x-a.origin.x,target.z-a.origin.z)>s.range){a.cancelled=true;a.resolved=true;actor.combatLockedUntil=time;return;}
  a.aim={x:target.x,y:target.y??0,z:target.z};actor.heading={dx:target.x-actor.x,dz:target.z-actor.z};
 }
 a.caught??=[];
 if(s.kaleido&&!a.captured&&age>=s.captureAt){
  a.captured=true;a.holdUntil=a.started+s.hitTimes.at(-1)+180;
  for(const target of room.values()){
   if(target.id===actor.id||target.hp<=0||target.spectator||target.duelProtected||!canDamage(actor,target)||Math.abs((target.y??0)-a.origin.y)>1.5||Math.hypot(target.x-a.origin.x,target.z-a.origin.z)>s.radius+(target.boss?1:0))continue;
   if(geometry?.sweep({...a.origin,y:a.origin.y+.8},{...target,y:(target.y??0)+.8},.08))continue;
   a.caught.push(target.id);applyStatus(target,{status:'stun',statusDuration:Math.max(0,a.holdUntil-time)},time);
   catchTarget?.(a,actor,target,gatherPoint(a),time,Math.max(1,s.gatherEnd-age));
  }
 }
 const times=s.hitTimes??[s.hitAt];
 while(a.nextHit<times.length&&age>=times[a.nextHit]&&!a.cancelled){
  const strike=a.nextHit++,at=a.started+times[strike],final=strike===times.length-1;
  for(const target of room.values()){
   if(a.cancelled)break;
   if((s.coinShot&&target.id!==a.target)||target.id===actor.id||target.hp<=0||target.spectator||target.duelProtected||!canDamage(actor,target)||Math.abs((target.y??0)-a.origin.y)>1.5)continue;
   let inRange;
   if(s.kaleido||strike>0&&s.zeroth)inRange=a.caught.includes(target.id);
   else if(s.zeroth)inRange=segmentDistance(target,a.origin,exitPoint(a))<=s.radius+(target.boss?1:0);
   else inRange=Math.hypot(target.x-a.aim.x,target.z-a.aim.z)<=s.radius+(target.boss?1:0);
   if(!inRange)continue;
   const point={x:target.x,y:(target.y??0)+.8,z:target.z},from=s.zeroth||s.kaleido||s.coinShot?a.origin:a.aim;
   if(geometry?.sweep({...from,y:from.y+.8},point,.08))continue;
   const dealt=hurt(a,actor,target,final&&s.finalDamage!=null?s.finalDamage:s.damage,at,{point,quiet:true});a.hits.push({id:target.id,strike,at,point,...dealt});
   if(strike===0&&dealt.damage&&target.hp>0&&s.zeroth){
    a.caught.push(target.id);a.holdUntil=a.started+times.at(-1)+180;applyStatus(target,{status:'stun',statusDuration:Math.max(0,a.holdUntil-at)},at);
   }
  }
 }
 if(a.cancelled){release(a,room,time);actor.combatLockedUntil=time;}
 if(age>=s.duration){a.resolved=true;a.dashFinished=true;release(a,room,time);actor.combatLockedUntil=Math.min(actor.combatLockedUntil??time,time);}
}
module.exports={tickDaybreak,release};
