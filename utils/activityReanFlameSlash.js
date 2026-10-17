const {flamePhases,flameMotion,flamePath}=require('../activity/rean-flame-slash.cjs');
const {segmentDistance}=require('../activity/combat-projection.cjs');
const {applyStatus,immobilized}=require('../activity/combat-status.cjs');
function tickFlameSlash(a,s,actor,room,time,{geometry,canDamage,hurt}){
 if(a.resolved)return;
 if(immobilized(actor,time)){a.cancelled=true;a.resolved=true;actor.combatLockedUntil=time;return;}
 const p=flamePhases(a),age=time-a.started,path=flamePath(a);
 Object.assign(actor,flameMotion(a,age).position);actor.acceptedAt=time;actor.moving=false;
 const hits=[p.first,p.second,p.third];
 while(a.nextHit<3&&age+1e-6>=hits[a.nextHit]&&!a.cancelled){const strike=a.nextHit++,at=a.started+hits[strike];
  for(const target of room.values()){
   if(a.cancelled)break;
   if(target.id===actor.id||target.hp<=0||target.spectator||target.duelProtected||!canDamage(actor,target)||Math.abs((target.y??0)-a.aim.y)>1.5)continue;
   const near=Math.hypot(target.x-a.aim.x,target.z-a.aim.z)<=s.radius+(target.boss?1:0),crossed=strike===2&&segmentDistance(target,path.approach,path.exit)<=1.3+(target.boss?1:0);
   if(!near&&!crossed)continue;
   if(geometry?.sweep({...a.aim,y:a.aim.y+.8},{x:target.x,y:(target.y??0)+.8,z:target.z},.08))continue;
   const point={x:target.x,y:(target.y??0)+.8,z:target.z},dealt=hurt(a,actor,target,strike===2?s.finalDamage:s.damage,at,{point});
   a.hits.push({id:target.id,strike,at,point,...dealt});
   if(strike===0&&dealt.damage&&target.hp>0)applyStatus(target,{status:'stun',statusDuration:p.third+120-p.first},at);
  }
 }
 if(age>=p.end){a.resolved=true;a.dashFinished=true;actor.combatLockedUntil=Math.min(actor.combatLockedUntil??time,time);}
}
module.exports={tickFlameSlash};
