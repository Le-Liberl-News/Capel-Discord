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
    if (!spec || player.hp <= 0 || player.spectator || player.canMove === false)
      return { error: "Attaque indisponible." };
    if (time < (player.attackBusyUntil ?? 0) || time < (cooldowns.get(player.id)?.[command.kind] ?? 0))
      return { error: "Technique en récupération." };
    if (attacks.has(command.id)) return { error: "Attaque déjà reçue." };
    const origin = {x:player.x,y:player.y??0,z:player.z}, endpoint = attackPoint(origin, command.aim, command.kind,player.character);
    if (!endpoint) return { error: "Visée invalide." };
    let supportTarget=null;
    if(spec.effect){supportTarget=spec.effect==='shield'?player:room.get(command.target??player.id);if(!supportTarget||supportTarget.enemy||supportTarget.hp<=0||supportTarget.spectator||(supportTarget.id!==player.id&&!dungeon)||Math.hypot(supportTarget.x-player.x,supportTarget.z-player.z)>spec.range||Math.abs((supportTarget.y??0)-origin.y)>3)return {error:'Cible de soutien indisponible.'};Object.assign(endpoint,{x:supportTarget.x,y:supportTarget.y??0,z:supportTarget.z});}
    const airborneMelee=command.kind==='basic'&&!spec.projectile;
    const ground = spec.effect||airborneMelee?endpoint.y:floor(endpoint);
    if (ground === null || !Number.isFinite(ground) || Math.abs(ground-endpoint.y)>1.2)
      return { error: "Visez le sol." };
    endpoint.y=ground;
    const from={...origin,y:origin.y+.85},to={...endpoint,y:endpoint.y+.85};
    const hit=geometry?.sweep(from,to,.12);
    const distance=Math.hypot(to.x-from.x,to.y-from.y,to.z-from.z);
    if(spec.effect&&hit&&Math.hypot(hit.point.x-from.x,hit.point.y-from.y,hit.point.z-from.z)<distance-.2)return {error:'La cible est derrière un obstacle.'};
    if(hit && Math.hypot(hit.point.x-from.x,hit.point.y-from.y,hit.point.z-from.z)<distance-.2) {
      endpoint.x=hit.point.x;endpoint.z=hit.point.z;endpoint.y=hit.point.y-.85;
    }
    const travel = !spec.projectile ? 0 : Math.hypot(endpoint.x-origin.x,endpoint.z-origin.z)/14*1000;
    const attack={id:command.id,actor:player.id,character:player.character,kind:command.kind,technique:spec.name,target:supportTarget?.id,effect:spec.effect,origin,aim:endpoint,started:time,impactAt:time+spec.windup+travel,endsAt:time+Math.max(spec.duration,spec.windup+travel+550),resolved:false,hits:[]};
    attacks.set(attack.id,attack);players=room;
    const cooldown=cooldowns.get(player.id)??{};cooldown[command.kind]=time+spec.cooldown;cooldowns.set(player.id,cooldown);
    player.attackBusyUntil=time+spec.duration;
    if(command.kind==="craft")onCraft({...attack});
    return { combatId:attack.id };
  }
  function tick(room) {
    players=room;const time=now();
    for(const [id,attack]of attacks) {
      if(time>attack.endsAt+5000){attacks.delete(id);continue;}
      if(attack.resolved||time<attack.impactAt)continue;
      attack.resolved=true;
      const attacker=room.get(attack.actor),spec=combatSpec(attack.character,attack.kind);
      if(!attacker||attacker.hp<=0||attacker.character!==attack.character||attacker.spectator){attack.cancelled=true;continue;}
      if(spec.effect){const target=room.get(attack.target);if(!target||target.hp<=0||target.enemy||target.spectator||Math.hypot(target.x-attacker.x,target.z-attacker.z)>spec.range||Math.abs((target.y??0)-(attacker.y??0))>3){attack.cancelled=true;continue;}attack.aim={x:target.x,y:target.y??0,z:target.z};if(spec.effect==='heal'){const heal=Math.max(0,Math.min(spec.heal,100-target.hp));target.hp+=heal;attack.hits.push({id:target.id,heal});}else {target.shield={hp:spec.shield,maxHp:spec.shield,until:time+spec.shieldDuration};attack.hits.push({id:target.id,shield:spec.shield});}continue;}
      if(attack.kind==='basic'&&!spec.projectile){const dx=attack.aim.x-attack.origin.x,dz=attack.aim.z-attack.origin.z;attack.origin={x:attacker.x,y:attacker.y??0,z:attacker.z};attack.aim={x:attacker.x+dx,y:attacker.y??0,z:attacker.z+dz};}
      for(const player of room.values()) {
        if(!canDamage(attacker,player)||player.id===attack.actor||player.hp<=0||player.spectator||player.duelProtected||Math.abs((player.y??0)-attack.aim.y)>.9)continue;
        let inRange=Math.hypot(player.x-attack.aim.x,player.z-attack.aim.z)<=spec.radius;
        if(attack.kind==="basic"&&!spec.projectile) {
          const dx=player.x-attack.origin.x,dz=player.z-attack.origin.z,d=Math.hypot(dx,dz),ax=attack.aim.x-attack.origin.x,az=attack.aim.z-attack.origin.z,ad=Math.hypot(ax,az);
          inRange=d<=spec.range+.35 && (d<.2 || (dx*ax+dz*az)/(d*ad)>.5);
        }
        if(!inRange)continue;
        const from={x:attack.kind==="basic"&&!spec.projectile?attack.origin.x:attack.aim.x,y:(attack.kind==="basic"&&!spec.projectile?attack.origin.y:attack.aim.y)+.85,z:attack.kind==="basic"&&!spec.projectile?attack.origin.z:attack.aim.z};
        const to={x:player.x,y:(player.y??0)+.85,z:player.z},wall=geometry?.sweep(from,to,.08);
        if(wall && Math.hypot(wall.point.x-from.x,wall.point.y-from.y,wall.point.z-from.z)<Math.hypot(to.x-from.x,to.y-from.y,to.z-from.z)-.15)continue;
        const dealt=applyDamage(player,spec.damage,time);if(player.hp===0){player.deadUntil=time+(player.enemy?30000:10000);if(!player.enemy)onDefeat({victim:player,attacker:attack.actor,players:room,point:{x:player.x,y:player.y??0,z:player.z},action:{id:attack.id,kind:attack.kind,technique:attack.technique,follow:spec.projectile?"projectile":"actor",started:attack.started,releaseAt:attack.started+spec.windup,impactAt:attack.impactAt,endsAt:attack.endsAt,origin:{...attack.origin},aim:{...attack.aim}},at:time});}
        attack.hits.push({id:player.id,...dealt});
      }
    }
    for(const id of cooldowns.keys())if(!room.has(id))cooldowns.delete(id);
  }
  function snapshot(){return {attacks:[...attacks.values()].filter(a=>now()<=a.endsAt+1800).map(a=>({...a,hits:a.hits.map(h=>({...h}))})),cooldowns:{}};}
  return {action,tick,snapshot,cooldownsFor:id=>({...cooldowns.get(id)})};
}
module.exports={createActivityCombat};
