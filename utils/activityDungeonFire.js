const {applyDamage}=require('./activityDamage');
const {projectilePoint,sweptPlayer}=require('../activity/dungeon-mechanics.cjs');
function createDungeonFire({geometry=null,now=Date.now,traps=[]}){
 const shots=new Map(),cycles=new Map(traps.map(t=>[t.id,Math.floor((now()+t.phase)/t.period)]));let serial=0,last=now();
 function launch(origin,direction,{speed=7,damage=12,ttl=2200,source='enemy'}={}){const length=Math.hypot(direction.x,direction.y??0,direction.z)||1;const id='fire:'+ ++serial;shots.set(id,{id,started:now(),origin:{...origin},vx:direction.x/length*speed,vy:(direction.y??0)/length*speed,vz:direction.z/length*speed,damage,ttl,source});return id;}
 function tick(players){const time=now();const targets=[...players.values()].filter(p=>p.hp>0&&!p.spectator);if(targets.length)for(const t of traps){const cycle=Math.floor((time+t.phase)/t.period);if(cycles.get(t.id)===cycle)continue;cycles.set(t.id,cycle);const dx=t.end.x-t.start.x,dz=t.end.z-t.start.z,length=Math.hypot(dx,dz),nx=-dz/length,nz=dx/length;for(let offset=-t.width/2+.35;offset<=t.width/2-.2;offset+=.65)launch({x:t.start.x+nx*offset,y:t.start.y+t.height,z:t.start.z+nz*offset},{x:dx,y:0,z:dz},{speed:5,damage:15,ttl:Math.min(5000,length/5*1000),source:t.id});}
 for(const [id,s]of shots){if(time>s.started+s.ttl+300){shots.delete(id);continue;}const end=Math.min(time,s.started+s.ttl),from=projectilePoint(s,Math.max(last,s.started)),to=projectilePoint(s,end);let hit=false;const wall=geometry?.sweep(from,to,.18),distance=Math.hypot(to.x-from.x,to.y-from.y,to.z-from.z);for(const p of targets){if(wall&&wall.distance<distance){const k=Math.max(0,wall.distance/(distance||1));const stop={x:from.x+(to.x-from.x)*k,y:from.y+(to.y-from.y)*k,z:from.z+(to.z-from.z)*k};if(!sweptPlayer(from,stop,p))continue;}else if(!sweptPlayer(from,to,p))continue;applyDamage(p,s.damage,time);if(!p.hp)p.deadUntil=time+10000;hit=true;break;}if(hit||wall||time>=s.started+s.ttl)shots.delete(id);}
 last=time;
 }
 return {launch,tick,snapshot:()=>[...shots.values()].map(s=>({...s,origin:{...s.origin}}))};
}
module.exports={createDungeonFire};
