const {position}=require('../activity/mobile-projectiles.cjs'),{rayBody}=require('../activity/fps-combat.cjs'),{immobilized}=require('../activity/combat-status.cjs'),moves=require('../activity/combat-moves.cjs');
function tickMobileProjectile(a,s,actor,room,time,{geometry,canDamage,hurt}){
 if(a.resolved||a.cancelled)return;
 if(!actor){a.cancelled=true;a.resolved=true;return;}
 const release=a.projectileReleaseAt??a.started+s.windup;if(time<release)return;
 if(a.projectileReleasedAt==null){
  if(!actor||actor.hp<=0||actor.spectator||actor.character!==a.character||immobilized(actor,time)){a.cancelled=true;a.resolved=true;return;}
  const dx=a.aim.x-a.origin.x,dz=a.aim.z-a.origin.z,length=Math.hypot(dx,dz)||1;
  a.origin={x:actor.x,y:actor.y??0,z:actor.z};a.aim={x:actor.x+dx/length*s.range,y:actor.y??0,z:actor.z+dz/length*s.range};a.projectileFullAim={...a.aim};a.projectileReleasedAt=release;a.flightEndsAt=release+s.range/(s.projectileSpeed??14)*1000;a.impactAt=a.flightEndsAt;a.endsAt=a.flightEndsAt+600;a.projectile={...a.origin,y:a.origin.y+.9};
 }
 const from=a.projectile,end=position(a,Math.min(time,a.flightEndsAt)-a.started,s),length=Math.hypot(end.x-from.x,end.y-from.y,end.z-from.z),direction={x:(end.x-from.x)/(length||1),y:(end.y-from.y)/(length||1),z:(end.z-from.z)/(length||1)};
 const wall=geometry?.sweep(from,end,.1);let distance=wall?Math.hypot(wall.point.x-from.x,wall.point.y-from.y,wall.point.z-from.z):length,point=wall?.point,target=null;
 for(const candidate of room.values()){
  if(candidate.id===a.actor||candidate.hp<=0||candidate.spectator||candidate.duelProtected||!canDamage(actor,candidate))continue;
  const hit=rayBody(from,direction,candidate,distance,.1);if(hit&&hit.distance<=distance&&(!wall||hit.distance<distance-.001)){target=candidate;distance=hit.distance;point=hit.point;}
 }
 a.projectile=point??end;
 if(!point&&time<a.flightEndsAt)return;
 a.resolved=true;a.projectileStoppedAt=time;a.impactAt=time;a.aim={...a.projectile,y:a.projectile.y-.9};a.endsAt=time+600;
 if(s.special==='fireball'){a.explodedAt=time;a.explosionPoint={...a.aim};}
 if(target){const count=moves.comboOf(actor,time)+1,hold=2*s.cooldown,dealt=hurt(a,actor,target,s.damage,time,{point:{...a.projectile},nativeEffect:s.hitEffect??moves.COMBO.hitEffect,combo:count,comboHold:hold,from:{x:a.origin.x,z:a.origin.z}});a.hits.push({id:target.id,at:time,point:{...a.projectile},...dealt});if(dealt.damage||dealt.absorbed)actor.combo={count,until:time+moves.COMBO.window};else if(!dealt.blocked)actor.combo=null;
 }else{if(actor)actor.combo=null;a.missed={at:time,point:{...a.projectile}};}
}
module.exports={tickMobileProjectile};
