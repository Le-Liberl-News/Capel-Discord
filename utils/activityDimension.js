const {applyStatus,attackFactor,immobilized}=require('../activity/combat-status.cjs');
const {liftPosition}=require('../activity/weissmann-dimension.cjs');
function createDimension({geometry,canDamage,hurt}){
 const caught=new Map();
 function setup(a,s,room){const actor=room.get(a.actor),targets=[];a.special='dimension';a.impactAt=a.started+s.finalAt;a.endsAt=a.started+s.duration;
  for(const p of room.values()){
   if(p.id===a.actor||p.hp<=0||p.spectator||p.duelProtected||!canDamage(actor,p)||Math.hypot(p.x-a.aim.x,p.z-a.aim.z)>s.radius||Math.abs((p.y??0)-a.aim.y)>1.4)continue;
   if(geometry?.sweep({...a.aim,y:a.aim.y+.8},{x:p.x,y:(p.y??0)+.8,z:p.z},.08))continue;
   const origin={x:p.x,y:p.y??0,z:p.z},previous=p.stunUntil??0;targets.push({id:p.id,origin,previous,ownUntil:a.started+s.finalAt+s.liftDuration,previousLock:p.combatLockedUntil??0,nextPulse:500,final:false});p.dimensionSource=a.id;applyStatus(p,{status:'stun',statusDuration:s.finalAt+s.liftDuration},a.started);p.jump=null;p.knockback=null;p.path=[];
   a.hits.push({id:p.id,trapped:true,at:a.started,point:origin});
  }
  caught.set(a.id,targets);
 }
 function release(a,room){for(const t of caught.get(a.id)??[]){const p=room.get(t.id);if(p?.dimensionSource!==a.id)continue;if(p.stunUntil===t.ownUntil)p.stunUntil=t.previous;if(p.combatLockedUntil===t.ownUntil)p.combatLockedUntil=t.previousLock;if(p.dimensionLift){Object.assign(p,p.dimensionLift.origin);p.dimensionLift=null;}delete p.dimensionSource;}caught.delete(a.id);}
 function tick(a,s,room,time){const actor=room.get(a.actor);if(a.cancelled||!actor||actor.hp<=0||actor.character!==a.character||actor.spectator||immobilized(actor,time)){a.cancelled=true;a.endsAt=time;release(a,room);return;}
  const age=time-a.started;
  for(const t of caught.get(a.id)??[]){const p=room.get(t.id);if(!p||p.dimensionSource!==a.id||p.spectator||p.duelProtected||!canDamage(actor,p))continue;
   if(!p.dimensionLift){Object.assign(p,t.origin);p.knockback=null;}
   while(!t.final&&t.nextPulse<=s.prisonDuration&&age>=t.nextPulse){const at=a.started+t.nextPulse;if(p.hp>0){const dealt=hurt(a,actor,p,s.tickDamage*attackFactor(actor,at),at,{point:{...t.origin,y:t.origin.y+.8}});a.hits.push({id:p.id,at,periodic:true,...dealt});}t.nextPulse+=500;}
   if(!t.final&&age>=s.finalAt){t.final=true;if(p.hp>0){const dealt=hurt(a,actor,p,s.finalDamage*attackFactor(actor,time),a.started+s.finalAt,{nativeEffect:'Third/ms04550b._ef',point:{...t.origin,y:t.origin.y+.8}});a.hits.push({id:p.id,at:a.started+s.finalAt,final:true,...dealt});p.dimensionLift={origin:t.origin,started:a.started+s.finalAt,duration:s.liftDuration,height:s.liftHeight};p.combatLockedUntil=Math.max(p.combatLockedUntil??0,a.started+s.finalAt+s.liftDuration);p.platformId=null;p.platformOffset=null;}}
   if(p.dimensionLift){Object.assign(p,liftPosition(p.dimensionLift,time));p.acceptedAt=time;if(age>=s.finalAt+s.liftDuration){Object.assign(p,t.origin);p.dimensionLift=null;}}
  }
  if(age>=s.finalAt+s.liftDuration){a.resolved=true;release(a,room);}
 }
 return {setup,tick,cancel:release};
}
module.exports={createDimension};
