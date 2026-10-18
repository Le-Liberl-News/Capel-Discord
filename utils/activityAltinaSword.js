const sword=require('../activity/altina-scraft.cjs');
const {projectionPath,segmentDistance}=require('../activity/combat-projection.cjs');
const {immobilized}=require('../activity/combat-status.cjs');
function createAltinaSword({floor,geometry,grid,hurt,canDamage,project}){
 const safeFloor=p=>{if(grid){const x=Math.round((p.x-grid.origin.x)/grid.step),z=Math.round((p.z-grid.origin.z)/grid.step);if(x<0||z<0||x>=grid.width||z>=grid.height||grid.cells[z*grid.width+x]===null)return null;}return floor(p);};
 function setup(a,actor){a.aim={...a.origin};a.surfPosition={...a.origin};a.surfHeading={x:actor.heading?.dx??0,z:actor.heading?.dz??-1};a.surfInput={x:0,z:0};a.surfUpdatedAt=a.started+sword.PHASE.prep;a.surfInputUntil=a.started;a.surfHits=[];a.surfLast={...a.origin};a.surfTime=0;a.impactAt=a.started+sword.phases(a).impact;a.endsAt=a.started+sword.phases(a).end+900;actor.altinaSwordUntil=a.endsAt;const guardian=actor._guardian;if(guardian){a.guardianWasProtected=!!guardian.duelProtected;guardian.duelProtected=true;guardian.moving=false;guardian.path=[];}}
 function steer(a,actor,input,time){if(a.cancelled||a.resolved||actor.hp<=0||actor.spectator||immobilized(actor,time)||time-a.started>=sword.PHASE.surfEnd||!input||![input.x,input.z].every(Number.isFinite)||Math.hypot(input.x,input.z)>1.01)return {error:'Surf indisponible.'};a.surfInput={x:input.x,z:input.z};a.surfInputUntil=time+350;return {};}
 function choose(a,actor,point,time){if(!sword.aiming(a,time-a.started)||actor.character!=='Altina'||actor.hp<=0||actor.spectator||actor.duelProtected||immobilized(actor,time))return {error:'Plongeon indisponible.'};
  if(!point||![point.x,point.y,point.z].every(Number.isFinite)||Math.hypot(point.x-a.aim.x,point.z-a.aim.z)>14)return {error:'Point de chute hors de portée.'};
  const y=safeFloor(point);if(!Number.isFinite(y)||Math.abs(y-point.y)>.7)return {error:'Visez un sol accessible.'};const landing={x:point.x,y,z:point.z},from=sword.perch(a);
  if(geometry?.sweep({...from,y:from.y+.5},{...landing,y:y+.5},.2))return {error:'Le plongeon est bloqué.'};
  a.landingPoint=landing;a.diveAt=time;a.impactAt=time+sword.PHASE.dive;a.endsAt=a.impactAt+sword.PHASE.recover+900;actor.combatLockedUntil=a.impactAt+sword.PHASE.recover;actor.attackBusyUntil=actor.combatLockedUntil;return {combatId:a.id};
 }
 function finish(a,actor,time,cancelled=false){a.resolved=true;a.dashFinished=true;a.cancelled=cancelled;delete actor.altinaSwordUntil;actor.combatLockedUntil=time;actor.attackBusyUntil=time;if(cancelled){const ground=safeFloor(actor);actor.y=Number.isFinite(ground)?ground:a.origin.y;actor.acceptedAt=time;}const guardian=actor._guardian;if(guardian){guardian.duelProtected=!!a.guardianWasProtected;guardian.x=actor.x;guardian.y=actor.y;guardian.z=actor.z;guardian.acceptedAt=time;}}
 function tick(a,s,actor,room,time){if(a.resolved)return;if(!actor)return;if(actor.hp<=0||actor.spectator||actor.character!=='Altina'||immobilized(actor,time)||a.cancelled){finish(a,actor,time,true);return;}
  const stop=Math.min(time,a.started+sword.PHASE.surfEnd),elapsed=Math.max(0,Math.min(stop,a.surfInputUntil)-a.surfUpdatedAt);
  if(elapsed>0){a.surfPosition=sword.moveSurf(a.surfPosition,a.surfInput,Math.min(.15,elapsed/1000),safeFloor,geometry);if(Math.hypot(a.surfInput.x,a.surfInput.z)>.001)a.surfHeading={...a.surfInput};}a.surfUpdatedAt=Math.max(a.surfUpdatedAt,stop);a.aim={...a.surfPosition};
  if(time-a.started>=sword.PHASE.surfEnd&&a.perchHeight===undefined){const ceiling=geometry?.sweep({...a.aim,y:a.aim.y+.8},{...a.aim,y:a.aim.y+7.8},.2);a.perchHeight=ceiling?Math.max(.3,ceiling.point.y-a.aim.y-1):7;}
  const age=time-a.started,p=sword.phases(a),previous=a.surfLast,at=sword.motion(a,Math.min(age,sword.PHASE.surfEnd)).position;
  if(age>=sword.PHASE.prep&&a.surfTime<sword.PHASE.surfEnd){for(const target of room.values()){
   if(target.id===actor.id||target.hp<=0||target.spectator||target.duelProtected||!canDamage(actor,target)||a.surfHits.includes(target.id)||segmentDistance(target,previous,at)>1.15||Math.abs((target.y??0)-at.y)>1.6)continue;
   if(geometry?.sweep({...at,y:at.y+.6},{x:target.x,y:(target.y??0)+.6,z:target.z},.1))continue;
   a.surfHits.push(target.id);const dealt=hurt(a,actor,target,s.damage,time,{point:{x:target.x,y:(target.y??0)+.8,z:target.z}});a.hits.push({id:target.id,at:time,phase:'surf',...dealt});if(dealt.damage&&target.hp>0)project(a,actor,target,{knockback:2.5,knockbackDuration:300},a.surfHeading,time);
  }}a.surfLast=at;a.surfTime=Math.min(age,sword.PHASE.surfEnd);if(a.cancelled){finish(a,actor,time,true);return;}
  if(age>=p.diveAt&&!a.diveAt){a.landingPoint={...a.aim};a.diveAt=a.started+sword.PHASE.timeout;}
  Object.assign(actor,sword.motion(a,age).position);actor.acceptedAt=time;
  if(age>=p.impact&&!a.explodedAt){a.explodedAt=a.started+p.impact;const point=a.landingPoint??a.aim;for(const target of room.values()){
   if(target.id===actor.id||target.hp<=0||target.spectator||target.duelProtected||!canDamage(actor,target)||Math.hypot(target.x-point.x,target.z-point.z)>s.radius||Math.abs((target.y??0)-point.y)>2)continue;
   if(geometry?.sweep({...point,y:point.y+.8},{x:target.x,y:(target.y??0)+.8,z:target.z},.1))continue;
   const dealt=hurt(a,actor,target,s.finalDamage,time,{point:{x:target.x,y:(target.y??0)+.8,z:target.z}});a.hits.push({id:target.id,at:time,phase:'impact',...dealt});if(dealt.damage&&target.hp>0)project(a,actor,target,{knockback:3,knockbackDuration:350},{x:target.x-point.x||.01,z:target.z-point.z||.01},time);
  }}if(age>=p.end)finish(a,actor,time);
 }
 return {setup,choose,steer,tick,cancel:(a,actor,time)=>{if(actor&&!a.resolved)finish(a,actor,time,true);}};
}
module.exports={createAltinaSword};
