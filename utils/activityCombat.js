const {rayBody,validateRay}=require('../activity/fps-combat.cjs');
const {combatMotion}=require('../activity/combat-motion.cjs');
const {immobilized,attackFactor,applyStatus,applyBuff}=require('../activity/combat-status.cjs');
const {applyDamage}=require('./activityDamage');
const { combatSpec, attackPoint } = require("../activity/native-combat.cjs");
function createActivityCombat({ now = Date.now, geometry = null, grid, onCraft = () => {}, onDefeat = () => {}, canDamage = () => true, dungeon=null, platforms=null }) {
  const attacks = new Map(), cooldowns = new Map();
  let players;
  const floor = point => {
    const moving=platforms?.floor(point);if(moving!==null&&moving!==undefined)return moving;
    if (geometry) return geometry.floor(point.x, point.z, point.y + .5);
    const x=Math.round((point.x-grid.origin.x)/grid.step), z=Math.round((point.z-grid.origin.z)/grid.step);
    return x<0||z<0||x>=grid.width||z>=grid.height ? null : grid.cells[z*grid.width+x];
  };
  function action(player, command, room) {
    const spec = combatSpec(player.character,command.kind), time = now();
    if (!spec || player.hp <= 0 || player.spectator || player.canMove === false || immobilized(player,time) || time<(player.combatLockedUntil??0))
      return { error: "Attaque indisponible." };
    if (time < (player.attackBusyUntil ?? 0) || time < (cooldowns.get(player.id)?.[command.kind] ?? 0))
      return { error: "Technique en récupération." };
    if (attacks.has(command.id)) return { error: "Attaque déjà reçue." };
    const fps=spec.fps?validateRay(player,command.ray):null;if(spec.fps&&!fps)return {error:'Visée invalide.'};
    const origin = {x:player.x,y:player.y??0,z:player.z}, endpoint = fps?{...fps.origin}:attackPoint(origin, command.aim, command.kind,player.character);
    if(fps)Object.assign(endpoint,{x:fps.origin.x+fps.direction.x*spec.range,y:fps.origin.y+fps.direction.y*spec.range,z:fps.origin.z+fps.direction.z*spec.range});
    if (!endpoint) return { error: "Visée invalide." };
    let supportTarget=null;
    if(spec.effect){supportTarget=spec.targetRequired?room.get(command.target):player;if(!supportTarget||supportTarget.enemy||supportTarget.hp<=0||supportTarget.spectator||(supportTarget.id!==player.id&&!dungeon)||Math.hypot(supportTarget.x-player.x,supportTarget.z-player.z)>spec.range||Math.abs((supportTarget.y??0)-origin.y)>3)return {error:'Cible de soutien indisponible.'};Object.assign(endpoint,{x:supportTarget.x,y:supportTarget.y??0,z:supportTarget.z});}
    if(spec.targetRequired&&!spec.effect){const target=room.get(command.target);if(!target||target.id===player.id||target.hp<=0||target.spectator||!canDamage(player,target)||Math.hypot(target.x-player.x,target.z-player.z)>spec.range)return {error:'Cible indisponible.'};Object.assign(endpoint,{x:target.x,y:target.y??0,z:target.z});}
    const airborneMelee=command.kind==='basic'&&!spec.projectile;
    const ground = fps||spec.effect||airborneMelee?endpoint.y:floor(endpoint);
    if (ground === null || !Number.isFinite(ground) || Math.abs(ground-endpoint.y)>1.2)
      return { error: "Visez le sol." };
    endpoint.y=ground;
    const from=fps?fps.origin:{...origin,y:origin.y+.85},to=fps?endpoint:{...endpoint,y:endpoint.y+.85};
    const hit=geometry?.sweep(from,to,.12);
    const distance=Math.hypot(to.x-from.x,to.y-from.y,to.z-from.z);
    if(spec.effect&&hit&&Math.hypot(hit.point.x-from.x,hit.point.y-from.y,hit.point.z-from.z)<distance-.2)return {error:'La cible est derrière un obstacle.'};
    if(hit && Math.hypot(hit.point.x-from.x,hit.point.y-from.y,hit.point.z-from.z)<distance-.2) {
      const stop=spec.dash?Math.max(0,Math.hypot(hit.point.x-origin.x,hit.point.z-origin.z)-.2):null;
      if(stop!==null){const length=Math.hypot(endpoint.x-origin.x,endpoint.z-origin.z);endpoint.x=origin.x+(endpoint.x-origin.x)*stop/length;endpoint.z=origin.z+(endpoint.z-origin.z)*stop/length;}else{endpoint.x=hit.point.x;endpoint.z=hit.point.z;}endpoint.y=hit.point.y-(fps?0:.85);
    }
    if(spec.dash){
      const length=Math.hypot(endpoint.x-origin.x,endpoint.z-origin.z);let previous=player.jump?floor(origin):origin.y;
      if(previous===null||!Number.isFinite(previous))return {error:'Le trajet doit rester sur un sol accessible.'};
      for(let n=1;n<=Math.ceil(length/.2);n++){
        const t=n/Math.ceil(length/.2),p={x:origin.x+(endpoint.x-origin.x)*t,y:previous,z:origin.z+(endpoint.z-origin.z)*t},height=floor(p);
        if(height===null||!Number.isFinite(height)||Math.abs(height-previous)>.35)return {error:'Le trajet doit rester sur un sol accessible.'};
        previous=height;
      }
      endpoint.y=previous;
    }
    if(fps){let closest=Math.hypot(endpoint.x-fps.origin.x,endpoint.y-fps.origin.y,endpoint.z-fps.origin.z);for(const target of room.values()){if(target.id===player.id||target.hp<=0||target.spectator||!canDamage(player,target))continue;const body=rayBody(fps.origin,fps.direction,target,closest);if(body&&body.distance<closest){closest=body.distance;Object.assign(endpoint,body.point);}}}
    const travel = fps?Math.hypot(endpoint.x-fps.origin.x,endpoint.y-fps.origin.y,endpoint.z-fps.origin.z)/spec.projectileSpeed*1000:spec.leap?spec.leapDuration:spec.dash ? spec.dashDuration : !spec.projectile ? 0 : Math.hypot(endpoint.x-origin.x,endpoint.z-origin.z)/14*1000;
    const attack={id:command.id,actor:player.id,character:player.character,kind:command.kind,technique:spec.name,target:supportTarget?.id??(spec.targetRequired?command.target:undefined),effect:spec.effect,origin:fps?fps.origin:origin,ray:fps,aim:endpoint,started:time,impactAt:time+spec.windup+travel,endsAt:time+Math.max(spec.duration,spec.windup+travel+(spec.persistentBuff?spec.buffDuration:spec.effectDuration??550)),resolved:false,nextHit:0,hits:[]};
    if(spec.leap&&spec.landingOffset){const length=Math.hypot(endpoint.x-origin.x,endpoint.z-origin.z),ratio=length?1-Math.min(spec.landingOffset,Math.max(0,length-.2))/length:1,p={x:origin.x+(endpoint.x-origin.x)*ratio,y:endpoint.y,z:origin.z+(endpoint.z-origin.z)*ratio},height=floor(p);attack.landingPoint=height!==null&&Number.isFinite(height)&&Math.abs(height-p.y)<1.2?{...p,y:height}:{...endpoint};}
    attacks.set(attack.id,attack);players=room;
    if(spec.dash||spec.leap){Object.assign(player,{combatDash:attack.id,combatLockedUntil:time+spec.windup+(spec.leapDuration??spec.dashDuration),acceptedAt:time,jump:null,jumpTickAt:null,jumpLandedAt:time,platformId:null,platformOffset:null});}
    if(spec.lockMovement)player.combatLockedUntil=time+spec.duration;
    const cooldown=cooldowns.get(player.id)??{};cooldown[command.kind]=time+spec.cooldown;cooldowns.set(player.id,cooldown);
    player.attackBusyUntil=time+spec.duration;
    if(command.kind==="craft")onCraft({...attack});
    return { combatId:attack.id };
  }
  function tick(room) {
    players=room;const time=now();
    for(const [id,attack]of attacks) {
      if(time>attack.endsAt+5000){attacks.delete(id);continue;}
      const dashSpec=combatSpec(attack.character,attack.kind);
      if((dashSpec?.dash||dashSpec?.leap)&&!attack.dashFinished&&!attack.cancelled){
        const actor=room.get(attack.actor);
        if(!actor||actor.hp<=0||actor.character!==attack.character||actor.spectator){attack.cancelled=true;attack.resolved=true;if(actor)actor.combatLockedUntil=0;}
        else {const motion=combatMotion(attack,time-attack.started,dashSpec);Object.assign(actor,motion.position);if(!motion.active){attack.dashFinished=true;actor.acceptedAt=time;}}
      }
      const hitOffsets=dashSpec?.hitOffsets??[0];
      if(attack.resolved||time<attack.impactAt+hitOffsets[attack.nextHit])continue;
      while(attack.nextHit<hitOffsets.length&&time>=attack.impactAt+hitOffsets[attack.nextHit]){
      const hitIndex=attack.nextHit++;attack.resolved=attack.nextHit===hitOffsets.length;
      const attacker=room.get(attack.actor),spec=combatSpec(attack.character,attack.kind);
      if(!attacker||attacker.hp<=0||attacker.character!==attack.character||attacker.spectator||immobilized(attacker,time)){attack.cancelled=true;attack.resolved=true;break;}
      if(spec.effect){const target=room.get(attack.target);if(!target||target.hp<=0||target.enemy||target.spectator||Math.hypot(target.x-attacker.x,target.z-attacker.z)>spec.range||Math.abs((target.y??0)-(attacker.y??0))>3){attack.cancelled=true;attack.resolved=true;break;}attack.aim={x:target.x,y:target.y??0,z:target.z};if(spec.effect==='heal'){const heal=Math.max(0,Math.min(spec.heal,100-target.hp));target.hp+=heal;attack.hits.push({id:target.id,heal});}else if(spec.effect==='guard'){target.guard={until:time+spec.shieldDuration};attack.hits.push({id:target.id,guard:true});}else if(spec.effect.endsWith('Buff')){applyBuff(target,spec,time);attack.hits.push({id:target.id,buff:spec.effect});}else {target.shield={hp:spec.shield,maxHp:spec.shield,until:time+spec.shieldDuration};attack.hits.push({id:target.id,shield:spec.shield});}continue;}
      if(spec.trackTarget){const target=room.get(attack.target);if(target&&target.hp>0&&Math.hypot(target.x-attacker.x,target.z-attacker.z)<=spec.range){attack.aim={x:target.x,y:target.y??0,z:target.z};}}
      if(spec.selfTarget){attack.origin={x:attacker.x,y:attacker.y??0,z:attacker.z};attack.aim={...attack.origin};}
      if(attack.kind==='basic'&&!spec.projectile){const dx=attack.aim.x-attack.origin.x,dz=attack.aim.z-attack.origin.z;attack.origin={x:attacker.x,y:attacker.y??0,z:attacker.z};attack.aim={x:attacker.x+dx,y:attacker.y??0,z:attacker.z+dz};}
      for(const player of room.values()) {
        if(spec.targetRequired&&player.id!==attack.target||!canDamage(attacker,player)||player.id===attack.actor||player.hp<=0||player.spectator||player.duelProtected||!attack.ray&&Math.abs((player.y??0)-attack.aim.y)>.9)continue;
        let inRange=Math.hypot(player.x-attack.aim.x,player.z-attack.aim.z)<=spec.radius+(player.boss?2:0);
        if(attack.kind==="basic"&&!spec.projectile) {
          const dx=player.x-attack.origin.x,dz=player.z-attack.origin.z,d=Math.hypot(dx,dz),ax=attack.aim.x-attack.origin.x,az=attack.aim.z-attack.origin.z,ad=Math.hypot(ax,az);
          inRange=d<=spec.range+.35+(player.boss?2:0) && (d<.2 || (dx*ax+dz*az)/(d*ad)>.5);
        }
        if(spec.shape==='line'){
          const dx=attack.aim.x-attack.origin.x,dz=attack.aim.z-attack.origin.z,length2=dx*dx+dz*dz;
          const projection=((player.x-attack.origin.x)*dx+(player.z-attack.origin.z)*dz)/(length2||1);
          const t=Math.max(0,Math.min(1,projection));
          inRange=projection>=0&&projection<=1&&Math.hypot(player.x-attack.origin.x-dx*t,player.z-attack.origin.z-dz*t)<=spec.radius+(player.boss?2:0);
        }
        if(spec.wave){
          const dx=attack.aim.x-attack.origin.x,dz=attack.aim.z-attack.origin.z,length2=dx*dx+dz*dz;
          const t=((player.x-attack.origin.x)*dx+(player.z-attack.origin.z)*dz)/(length2||1);
          inRange=inRange&&t>=Math.max(0,(hitIndex-.5)/(hitOffsets.length-1))&&t<=Math.min(1,(hitIndex+.5)/(hitOffsets.length-1))&&!attack.hits.some(h=>h.id===player.id);
        }
        let precise=null;if(attack.ray){precise=rayBody(attack.ray.origin,attack.ray.direction,player,Math.hypot(attack.aim.x-attack.origin.x,attack.aim.y-attack.origin.y,attack.aim.z-attack.origin.z)+.08);inRange=!!precise;}if(spec.melee&&Math.hypot(player.x-attacker.x,player.z-attacker.z)>spec.range)inRange=false;
        if(!inRange)continue;
        const direct=!!attack.ray||attack.kind==="basic"&&!spec.projectile||spec.trackTarget,source=spec.trackTarget?attacker:attack.origin;
        const from=attack.ray?.origin??{x:direct?source.x:attack.aim.x,y:(direct?source.y:attack.aim.y)+.85,z:direct?source.z:attack.aim.z};
        const to=precise?.point??{x:player.x,y:(player.y??0)+.85,z:player.z},wall=geometry?.sweep(attack.ray?.origin??from,to,.08);
        if(wall && Math.hypot(wall.point.x-from.x,wall.point.y-from.y,wall.point.z-from.z)<Math.hypot(to.x-from.x,to.y-from.y,to.z-from.z)-.15)continue;
        const dealt=applyDamage(player,spec.damage*(precise?.headshot?spec.headshotMultiplier:1)*attackFactor(attacker,time)/(spec.wave?1:hitOffsets.length),attack.impactAt+hitOffsets[hitIndex],precise?{point:precise.point,headshot:precise.headshot}:undefined);if(dealt.damage)applyStatus(player,spec.status==='stun'?{...spec,statusDuration:Math.max(0,attack.started+spec.duration-time)}:spec,time);if(player.hp===0){player.deadUntil=time+(player.boss?120000:player.enemy?30000:10000);if(!player.enemy)onDefeat({victim:player,attacker:attack.actor,players:room,point:{x:player.x,y:player.y??0,z:player.z},action:{id:attack.id,kind:attack.kind,technique:attack.technique,follow:spec.projectile||spec.wave?"projectile":"actor",started:attack.started,releaseAt:attack.started+spec.windup,impactAt:attack.impactAt+hitOffsets[hitIndex],endsAt:attack.endsAt,origin:{...attack.origin},aim:spec.wave?{x:player.x,y:player.y??0,z:player.z}:{...attack.aim}},at:time});}
        attack.hits.push({id:player.id,hitIndex,at:attack.impactAt+hitOffsets[hitIndex],...dealt});
      }
    }
    }
    for(const id of cooldowns.keys())if(!room.has(id))cooldowns.delete(id);
  }
  function snapshot(){return {attacks:[...attacks.values()].filter(a=>now()<=a.endsAt+1800).map(a=>({...a,hits:a.hits.map(h=>({...h}))})),cooldowns:{}};}
  return {action,tick,snapshot,cooldownsFor:id=>({...cooldowns.get(id)})};
}
module.exports={createActivityCombat};
