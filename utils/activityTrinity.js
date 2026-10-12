const {stageSpec,insideTriangle}=require('../activity/trinity-kleis.cjs');
const {combatMotion}=require('../activity/combat-motion.cjs');
const {segmentDistance}=require('../activity/combat-projection.cjs');
const {immobilized}=require('../activity/combat-status.cjs');
function createTrinity({now,attacks,canDamage,hurt}){
 const chains=new Map(),burns=new Map();
 function active(actor){const c=chains.get(actor.id);return c&&c.stage<3&&now()<c.until&&Math.hypot(actor.x-c.last.x,actor.z-c.last.z)<.9?c:null;}
 function prepare(actor,spec){const c=active(actor);return stageSpec(spec,c?c.stage+1:1);}
 function setup(a,spec,actor){let c=active(actor);if(!c){c={id:a.id,stage:0,vertices:[{...a.origin}],last:a.origin,until:a.started+spec.comboWindow,edges:[]};chains.set(actor.id,c);}a.stage=++c.stage;a.chain=c.id;a.windup=spec.windup;a.animationDuration=spec.duration;
  a.closed=a.stage===3&&Math.hypot(a.aim.x-c.vertices[0].x,a.aim.z-c.vertices[0].z)<=1&&Math.abs(a.aim.y-c.vertices[0].y)<.35;
  a.triangle=a.closed?c.vertices.map(p=>({...p})):null;c.vertices.push({...a.aim});c.last={...a.aim};c.edges.push(a.id);a.edges=[...c.edges];a.endsAt=a.impactAt+spec.trailDuration;
 }
 function tick(a,base,room,time){if(base.special!=='trinity')return false;if(a.cancelled)return true;const actor=room.get(a.actor),s=stageSpec(base,a.stage);if(!actor||actor.hp<=0||actor.spectator||actor.duelProtected||actor.character!=='Julia'||(!a.dashFinished&&immobilized(actor,time))){a.cancelled=true;a.resolved=true;a.endsAt=time;chains.delete(a.actor);return true;}
  if(!a.dashFinished){const motion=combatMotion(a,time-a.started,s);Object.assign(actor,motion.position);actor.acceptedAt=time;if(!motion.active){a.dashFinished=true;a.resolved=true;actor.combatLockedUntil=time;}}
  if(time>=a.impactAt&&time<a.impactAt+s.trailDuration){for(const t of room.values()){if(t.hp<=0||t.spectator||t.duelProtected||t.id===actor.id||!canDamage(actor,t)||Math.abs((t.y??0)-a.aim.y)>1.2)continue;
   const inside=a.closed&&insideTriangle(t,a.triangle)&&a.edges.every(id=>{const edge=attacks.get(id);return edge&&!edge.cancelled&&time<edge.impactAt+s.trailDuration;});
   if(inside&&!a.novaDone&&time>=a.impactAt+120){const dealt=hurt(a,actor,t,s.novaDamage,time,{point:{x:t.x,y:(t.y??0)+.8,z:t.z}});a.hits.push({id:t.id,at:time,nova:true,point:{x:t.x,y:(t.y??0)+.8,z:t.z},...dealt});}
   if(segmentDistance(t,a.origin,a.aim)<s.radius){const key=a.chain+':'+t.id;if(time>=(burns.get(key)??0)){burns.set(key,time+750);const dealt=hurt(a,actor,t,s.burnDamage,time,{point:{x:t.x,y:(t.y??0)+.5,z:t.z}});a.hits.push({id:t.id,at:time,burn:true,...dealt});}}
  }if(a.stage===3&&time>=a.impactAt+120)a.novaDone=true;}
  for(const [key,at]of burns)if(time>at+6000)burns.delete(key);return true;
 }
 return {active,prepare,setup,tick};
}
module.exports={createTrinity};
