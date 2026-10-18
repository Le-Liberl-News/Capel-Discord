const {motion}=require('../activity/daybreak-crafts.cjs');
const {segmentDistance}=require('../activity/combat-projection.cjs');
const {applyStatus,immobilized}=require('../activity/combat-status.cjs');
function tickDaybreak(a,s,actor,room,time,{geometry,canDamage,hurt,floor}){
 if(a.resolved)return;
 if(!actor||actor.hp<=0||actor.character!==a.character||actor.spectator||immobilized(actor,time)){
  a.cancelled=true;a.resolved=true;a.dashFinished=true;
  if(actor&&actor.character===a.character){const ground=floor?.(actor);actor.y=Number.isFinite(ground)?ground:a.daybreakGroundY??a.origin.y;actor.combatLockedUntil=time;}
  return;
 }
 const age=time-a.started;
 const p=motion(a,age,s).position,t=Math.max(0,Math.min(1,(age-s.moveStart)/(s.moveEnd-s.moveStart)));a.daybreakGroundY=a.origin.y+(a.aim.y-a.origin.y)*t;
 Object.assign(actor,p);actor.acceptedAt=time;actor.moving=false;
 if(!a.nextHit&&age>=s.hitAt){
  a.nextHit=1;const at=a.started+s.hitAt;
  for(const target of room.values()){
   if(a.cancelled)break;
   if(target.id===actor.id||target.hp<=0||target.spectator||target.duelProtected||!canDamage(actor,target)||Math.abs((target.y??0)-a.aim.y)>1.5)continue;
   const d=s.line?segmentDistance(target,a.origin,a.aim):Math.hypot(target.x-a.aim.x,target.z-a.aim.z);
   if(d>s.radius+(target.boss?1:0))continue;
   const point={x:target.x,y:(target.y??0)+.8,z:target.z};
   if(geometry?.sweep({...a.aim,y:a.aim.y+.8},point,.08))continue;
   const dealt=hurt(a,actor,target,s.damage,at,{point});a.hits.push({id:target.id,at,point,...dealt});
   if(dealt.damage&&s.stun)applyStatus(target,{status:'stun',statusDuration:s.stun},at);
  }
 }
 if(age>=s.duration){a.resolved=true;a.dashFinished=true;actor.combatLockedUntil=Math.min(actor.combatLockedUntil??time,time);}
}
module.exports={tickDaybreak};
