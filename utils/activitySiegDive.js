const {SIEG_DIVE,divePath,divePosition}=require('../activity/sieg-dive.cjs');
const {immobilized}=require('../activity/combat-status.cjs');
const {applyDamage}=require('./activityDamage');
const {rayBody}=require('../activity/fps-combat.cjs');
function createSiegDive({grid,geometry,now=Date.now,combatEnabled=false,canDamage=()=>true,onDefeat=()=>{}}){
 return {action(player,command){const time=now();if(player.character!=='Sieg'||player.prop||player.hp<=0||player.spectator||player.canMove===false||player.duelProtected||immobilized(player,time)||time<(player.combatLockedUntil??0)||time<(player.siegDiveReadyAt??0))return {error:'Plongeon indisponible.'};
  const points=divePath({x:player.x,y:player.y??0,z:player.z},command.direction,grid,geometry);if(!points)return {error:'Trajet de plongeon bloqué.'};
  player.siegDive={id:command.id,hits:[],started:time,duration:SIEG_DIVE.duration*(points.length-1)/40,points};player.siegDiveReadyAt=time+SIEG_DIVE.cooldown;player.combatLockedUntil=time+player.siegDive.duration;player.acceptedAt=time;player.jump=null;player.platformId=null;player.platformOffset=null;return {};
 },tick(players){const time=now();for(const player of players.values()){const dive=player.siegDive;if(!dive)continue;if(player.character!=='Sieg'||player.hp<=0||player.spectator){player.siegDive=null;player.combatLockedUntil=0;continue;}const to=divePosition(dive,time),start=dive.checkedAt??dive.started,end=Math.min(time,dive.started+dive.duration),steps=Math.max(1,Math.ceil((end-start)/30));
 if(combatEnabled)for(let step=0;step<steps;step++){const from=divePosition(dive,start+(end-start)*step/steps),next=divePosition(dive,start+(end-start)*(step+1)/steps),length=Math.hypot(next.x-from.x,next.y-from.y,next.z-from.z);if(!length)continue;const direction={x:(next.x-from.x)/length,y:(next.y-from.y)/length,z:(next.z-from.z)/length};for(const target of players.values()){
 if(target.id===player.id||target.hp<=0||target.spectator||target.duelProtected||!canDamage(player,target)||dive.hits.includes(target.id))continue;
 const hit=rayBody({...from,y:from.y+.25},direction,target,length+.35);if(!hit)continue;
 dive.hits.push(target.id);const dealt=applyDamage(target,55,time,{point:hit.point});if(dealt.damage&&target.hp===0){target.deadUntil=time+(target.enemy?30000:10000);onDefeat({victim:target,attacker:player.id,players,point:hit.point,at:time,action:{id:dive.id,kind:'craft',technique:'Plongeon',follow:'actor',started:dive.started,releaseAt:dive.started,impactAt:time,endsAt:dive.started+dive.duration,origin:dive.points[0],aim:hit.point}});}
 }}dive.checkedAt=time;Object.assign(player,to);player.acceptedAt=time;if(time>=dive.started+dive.duration)player.siegDive=null;}}};
}
module.exports={createSiegDive};
