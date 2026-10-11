const {SIEG_DIVE,divePath,divePosition}=require('../activity/sieg-dive.cjs');
const {immobilized}=require('../activity/combat-status.cjs');
function createSiegDive({grid,geometry,now=Date.now}){
 return {action(player,command){const time=now();if(player.character!=='Sieg'||player.prop||player.hp<=0||player.spectator||player.canMove===false||player.duelProtected||immobilized(player,time)||time<(player.combatLockedUntil??0)||time<(player.siegDiveReadyAt??0))return {error:'Plongeon indisponible.'};
  const points=divePath({x:player.x,y:player.y??0,z:player.z},command.direction,grid,geometry);if(!points)return {error:'Trajet de plongeon bloqué.'};
  player.siegDive={id:command.id,started:time,duration:SIEG_DIVE.duration*(points.length-1)/40,points};player.siegDiveReadyAt=time+SIEG_DIVE.cooldown;player.combatLockedUntil=time+player.siegDive.duration;player.acceptedAt=time;player.jump=null;player.platformId=null;player.platformOffset=null;return {};
 },tick(players){const time=now();for(const player of players.values()){const dive=player.siegDive;if(!dive)continue;if(player.character!=='Sieg'||player.hp<=0||player.spectator){player.siegDive=null;player.combatLockedUntil=0;continue;}Object.assign(player,divePosition(dive,time));player.acceptedAt=time;if(time>=dive.started+dive.duration)player.siegDive=null;}}};
}
module.exports={createSiegDive};
