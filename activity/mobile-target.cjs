function canLockTarget(id,avatar,ownId,inTower,ownTeam){
 return !!(id!==ownId&&!String(id).startsWith('world:pom')&&avatar&&!avatar.dead&&avatar.hp>0&&!avatar.spectator&&!avatar.prop&&(!avatar.npc||avatar.enemy)&&(!inTower||avatar.enemy)&&!(ownTeam!=null&&avatar.teamId===ownTeam)&&avatar.mesh?.visible!==false&&avatar.catCling?.target!==ownId);
}
function followTarget(yaw,pitch,origin,target,seconds,fps=false){
 const dx=target.x-origin.x,dz=target.z-origin.z,distance=Math.hypot(dx,dz);if(distance<.05)return {yaw,pitch};
 const desired=-Math.atan2(dx,dz),delta=Math.atan2(Math.sin(desired-yaw),Math.cos(desired-yaw)),blend=1-Math.exp(-12*Math.max(0,seconds));
 const wantedPitch=fps?Math.max(-1.48,Math.min(1.48,-Math.atan2((target.y??0)+.9-((origin.y??0)+1.45),distance))):pitch;
 return {yaw:yaw+delta*blend,pitch:pitch+(wantedPitch-pitch)*blend};
}
module.exports={canLockTarget,followTarget};
