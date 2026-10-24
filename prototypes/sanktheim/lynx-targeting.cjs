const V=require('./lynx-flight.cjs');
const RANGE=150,CONE=Math.cos(.8),ACQUIRE=1200,GRACE=700;
const point=e=>({x:e.x,y:e.y+(e.mechapom?6.2:e.siegeTank?1.4:.9),z:e.z});
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);
function valid(e){return e&&e.hp>0&&!e.escaped&&e.online!==false;}
function eligible(ship,target,blocked){if(!valid(target))return false;const p=point(target),delta={x:p.x-ship.x,y:p.y-ship.y,z:p.z-ship.z},d=V.length(delta);return d<RANGE&&V.dot(V.axes(ship).forward,V.unit(delta))>CONE&&!blocked(ship,p);}
function candidate(ship,targets,c,blocked){const aim=V.direction(c.yaw,c.pitch);return targets.filter(e=>eligible(ship,e,blocked)).sort((a,b)=>{const score=e=>V.dot(aim,V.unit({x:e.x-ship.x,y:point(e).y-ship.y,z:e.z-ship.z}));return score(b)-score(a);})[0]??null;}
function updateLock(ship,targets,c,time,blocked){
 if(ship.lockRequested){delete ship.lockRequested;const e=candidate(ship,targets,c,blocked);ship.targetLock=e?{target:e.id,phase:'acquiring',started:time,lastSeen:time,lastTick:time,visibleMs:0,progress:0}:{phase:'lost',at:time,progress:0};}
 const lock=ship.targetLock;if(!lock?.target)return;const e=targets.find(e=>e.id===lock.target);
 if(!eligible(ship,e,blocked)){lock.lastTick=time;if(time-lock.lastSeen>GRACE)ship.targetLock={phase:'lost',at:time,progress:0};return;}
 lock.lastSeen=time;lock.visibleMs=(lock.visibleMs??0)+Math.min(250,Math.max(0,time-(lock.lastTick??time)));lock.lastTick=time;lock.progress=Math.min(1,lock.visibleMs/ACQUIRE);if(lock.progress===1)lock.phase='locked';
}
function turnTowards(a,b,max){const cosine=V.clamp(V.dot(a,b),-1,1),angle=Math.acos(cosine);if(angle<=max)return b;let tangent=V.add(b,V.mul(a,-cosine));if(V.length(tangent)<.00001)tangent=Math.abs(a.y)<.9?{x:0,y:1,z:0}:{x:1,y:0,z:0};tangent=V.unit(V.add(tangent,V.mul(a,-V.dot(tangent,a))));return V.unit(V.add(V.mul(a,Math.cos(max)),V.mul(tangent,Math.sin(max))));}
function segmentDistance(a,b,p){const delta={x:b.x-a.x,y:b.y-a.y,z:b.z-a.z},len=V.dot(delta,delta),k=V.clamp(V.dot({x:p.x-a.x,y:p.y-a.y,z:p.z-a.z},delta)/(len||1),0,1);return distance(V.add(a,V.mul(delta,k)),p);}
function advanceMissile(m,target,dt){if(valid(target)){const goal=point(target);m.direction=turnTowards(m.direction,V.unit({x:goal.x-m.x,y:goal.y-m.y,z:goal.z-m.z}),1.15*dt);}m.speed=Math.min(65,m.speed+18*dt);return V.add(m,V.mul(m.direction,m.speed*dt));}
module.exports={RANGE,ACQUIRE,GRACE,point,valid,eligible,candidate,updateLock,turnTowards,segmentDistance,advanceMissile};
