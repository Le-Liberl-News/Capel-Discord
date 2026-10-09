const { RENNE, attackPoint } = require("../activity/renne-combat.cjs");
function createActivityCombat({ now = Date.now, geometry = null, grid, onCraft = () => {} }) {
  const attacks = new Map(), cooldowns = new Map();
  let players;
  const floor = point => {
    if (geometry) return geometry.floor(point.x, point.z, point.y + .5);
    const x=Math.round((point.x-grid.origin.x)/grid.step), z=Math.round((point.z-grid.origin.z)/grid.step);
    return x<0||z<0||x>=grid.width||z>=grid.height ? null : grid.cells[z*grid.width+x];
  };
  function action(player, command, room) {
    const spec = Object.hasOwn(RENNE,command.kind) ? RENNE[command.kind] : null, time = now();
    if (!spec || player.character !== "Renne" || player.hp <= 0 || player.spectator || player.canMove === false)
      return { error: "Attaque indisponible." };
    if (time < (player.combatLockedUntil ?? 0) || time < (cooldowns.get(player.id)?.[command.kind] ?? 0))
      return { error: "Technique en récupération." };
    if (attacks.has(command.id)) return { error: "Attaque déjà reçue." };
    const origin = {x:player.x,y:player.y??0,z:player.z}, endpoint = attackPoint(origin, command.aim, command.kind);
    if (!endpoint) return { error: "Visée invalide." };
    const ground = floor(endpoint);
    if (ground === null || !Number.isFinite(ground) || Math.abs(ground-endpoint.y)>1.2)
      return { error: "Visez le sol de l’arène." };
    endpoint.y=ground;
    const from={...origin,y:origin.y+.85},to={...endpoint,y:endpoint.y+.85};
    const hit=geometry?.sweep(from,to,.12);
    const distance=Math.hypot(to.x-from.x,to.y-from.y,to.z-from.z);
    if(hit && Math.hypot(hit.point.x-from.x,hit.point.y-from.y,hit.point.z-from.z)<distance-.2) {
      endpoint.x=hit.point.x;endpoint.z=hit.point.z;endpoint.y=hit.point.y-.85;
    }
    const travel = command.kind === "basic" ? 0 : Math.hypot(endpoint.x-origin.x,endpoint.z-origin.z)/14*1000;
    const attack={id:command.id,actor:player.id,character:"Renne",kind:command.kind,technique:spec.name,origin,aim:endpoint,started:time,impactAt:time+spec.windup+travel,endsAt:time+Math.max(spec.duration,spec.windup+travel+550),resolved:false,hits:[]};
    attacks.set(attack.id,attack);players=room;
    const cooldown=cooldowns.get(player.id)??{};cooldown[command.kind]=time+spec.cooldown;cooldowns.set(player.id,cooldown);
    player.combatLockedUntil=time+spec.duration;
    if(command.kind==="craft")onCraft({...attack});
    return { combatId:attack.id };
  }
  function tick(room) {
    players=room;const time=now();
    for(const [id,attack]of attacks) {
      if(time>attack.endsAt+5000){attacks.delete(id);continue;}
      if(attack.resolved||time<attack.impactAt)continue;
      attack.resolved=true;
      const attacker=room.get(attack.actor),spec=RENNE[attack.kind];
      if(!attacker||attacker.hp<=0||attacker.character!=="Renne"||attacker.spectator){attack.cancelled=true;continue;}
      for(const player of room.values()) {
        if(player.id===attack.actor||player.hp<=0||player.spectator||player.duelProtected||Math.abs((player.y??0)-attack.aim.y)>.9)continue;
        let inRange=Math.hypot(player.x-attack.aim.x,player.z-attack.aim.z)<=spec.radius;
        if(attack.kind==="basic") {
          const dx=player.x-attack.origin.x,dz=player.z-attack.origin.z,d=Math.hypot(dx,dz),ax=attack.aim.x-attack.origin.x,az=attack.aim.z-attack.origin.z,ad=Math.hypot(ax,az);
          inRange=d<=spec.range+.35 && (d<.2 || (dx*ax+dz*az)/(d*ad)>.5);
        }
        if(!inRange)continue;
        const from={x:attack.kind==="basic"?attack.origin.x:attack.aim.x,y:(attack.kind==="basic"?attack.origin.y:attack.aim.y)+.85,z:attack.kind==="basic"?attack.origin.z:attack.aim.z};
        const to={x:player.x,y:(player.y??0)+.85,z:player.z},wall=geometry?.sweep(from,to,.08);
        if(wall && Math.hypot(wall.point.x-from.x,wall.point.y-from.y,wall.point.z-from.z)<Math.hypot(to.x-from.x,to.y-from.y,to.z-from.z)-.15)continue;
        player.hp=Math.max(0,player.hp-spec.damage);if(player.hp===0)player.deadUntil=time+10000;
        attack.hits.push({id:player.id,damage:spec.damage});
      }
    }
    for(const id of cooldowns.keys())if(!room.has(id))cooldowns.delete(id);
  }
  function snapshot(){return {attacks:[...attacks.values()].filter(a=>now()<=a.endsAt+1800).map(a=>({...a,hits:a.hits.map(h=>({...h}))})),cooldowns:{}};}
  return {action,tick,snapshot,cooldownsFor:id=>({...cooldowns.get(id)})};
}
module.exports={createActivityCombat};
