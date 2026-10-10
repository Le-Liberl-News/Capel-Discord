const {immobilized}=require('../activity/combat-status.cjs');
const {applyDamage}=require('./activityDamage');
const {jumpPosition}=require('../activity/dungeon-mechanics.cjs');
function createDungeonJumps({grid,geometry,platforms=null,now=Date.now}){
 const ground=p=>{const moving=platforms?.floor(p);if(moving!==null&&moving!==undefined)return moving;const x=Math.round((p.x-grid.origin.x)/grid.step),z=Math.round((p.z-grid.origin.z)/grid.step);return x<0||z<0||x>=grid.width||z>=grid.height?null:grid.cells[z*grid.width+x];};
 function action(p,c){if(immobilized(p,now())||p.hp<=0||p.spectator||p.canMove===false||p.character==='Sieg'||p.jump||now()<(p.jumpReadyAt??0)||now()<(p.combatLockedUntil??0))return {error:'Saut indisponible.'};const dx=Number(c.direction?.dx??0),dz=Number(c.direction?.dz??0),length=Math.hypot(dx,dz);if(!Number.isFinite(length)||length>1.01||ground(p)===null)return {error:'Saut invalide.'};p.jump={id:c.id,started:Number.isFinite(c.started)?Math.max(now()-250,Math.min(now(),c.started)):now(),origin:{x:p.x,y:p.y,z:p.z},dx:length?dx/length:0,dz:length?dz/length:0};p.jumpReadyAt=now()+1250;tick(new Map([[p.id,p]]));return {};}
 function tick(players){for(const p of players.values()){const j=p.jump;if(!j)continue;if(p.hp<=0){Object.assign(p,j.origin);p.jump=null;p.jumpTickAt=null;continue;}const time=now(),destination=jumpPosition(j,j.started+1000),endTime=Math.min(time,j.started+(ground(destination)!==null?1000:1350)),start=Math.min(endTime,p.jumpTickAt??j.started);p.jumpTickAt=endTime;let blocked=false;for(let t=start;t<endTime;){const end=Math.min(endTime,t+40),a=jumpPosition(j,t),b=jumpPosition(j,end);const wall=geometry?.sweep({x:a.x,y:a.y+.45,z:a.z},{x:b.x,y:b.y+.45,z:b.z},.18);if(wall){blocked=true;break;}t=end;}const q=jumpPosition(j,endTime);Object.assign(p,q);const elapsed=(time-j.started)/1000,landing=ground(q);if(blocked||(elapsed>=1&&landing!==null)||elapsed>=1.35){if(blocked||landing===null){Object.assign(p,j.origin);applyDamage(p,20,time);if(!p.hp)p.deadUntil=time+10000;}else p.y=landing;p.jump=null;p.jumpTickAt=null;p.jumpLandedAt=time;p.acceptedAt=time;}}
 }
 return {action,tick};
}
module.exports={createDungeonJumps};
