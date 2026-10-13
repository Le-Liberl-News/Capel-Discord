const {applyStatus,attackFactor,immobilized}=require('../activity/combat-status.cjs');
function createLoeweCollapse({geometry,canDamage,hurt}){
 return {tick(a,s,room,time){if(a.resolved||a.cancelled)return;const actor=room.get(a.actor);if(!actor||actor.hp<=0||actor.character!==a.character||immobilized(actor,time)){a.cancelled=true;a.endsAt=time;return;}if(time<a.impactAt)return;a.resolved=true;
  for(const p of room.values()){if(p.id===actor.id||p.hp<=0||p.spectator||p.duelProtected||!canDamage(actor,p)||Math.hypot(p.x-actor.x,p.z-actor.z)>s.radius||Math.abs((p.y??0)-(actor.y??0))>1.4)continue;if(geometry?.sweep({x:actor.x,y:(actor.y??0)+.8,z:actor.z},{x:p.x,y:(p.y??0)+.8,z:p.z},.08))continue;const point={x:p.x,y:(p.y??0)+.8,z:p.z},dealt=hurt(a,actor,p,s.damage*attackFactor(actor,time),a.impactAt,{point});a.hits.push({id:p.id,at:a.impactAt,point,collapse:true,...dealt});if(!dealt.damage)continue;applyStatus(p,{status:'stun',statusDuration:s.stunDuration},a.impactAt);p.downUntil=a.impactAt+s.stunDuration;p.fallAnimation={started:a.impactAt,duration:s.fallDuration,sign:p.x>=actor.x?1:-1};p.jump=null;p.knockback=null;p.platformId=null;p.platformOffset=null;}
 }};
}
module.exports={createLoeweCollapse};
