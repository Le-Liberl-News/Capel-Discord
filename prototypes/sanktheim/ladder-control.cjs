const motion=require('./ladder-motion.cjs');
const length=c=>(c.points??[c.from,c.to]).slice(1).reduce((n,p,i)=>{const a=(c.points??[c.from,c.to])[i];return n+Math.hypot(p.x-a.x,p.y-a.y,p.z-a.z);},0);
function drive(climb,input){const dx=climb.to.x-climb.from.x,dz=climb.to.z-climb.from.z,n=Math.hypot(dx,dz)||1,l=Math.max(1,Math.hypot(input?.x??0,input?.z??0));return Math.max(-1,Math.min(1,((input?.x??0)*dx+(input?.z??0)*dz)/(n*l)));}
function legacyUpdate(p,dt,at,blocked=false){const c=p.climb;if(!c?.controlled)return false;const fresh=at-(p.ladderInputAt??0)<400,input=fresh&&!blocked?p.ladderInput:{x:0,z:0},force=drive(c,input),old=c.progress??0;c.rate=Math.abs(force)>.2?force*6/Math.max(1,length(c)):0;c.progress=Math.max(0,Math.min(1,old+c.rate*dt));c.updatedAt=at;Object.assign(p,motion.point(c,at));p.moving=Math.abs(c.progress-old)>.00001;p.heading={dx:(c.to.x-c.from.x)*(c.rate<0?-1:1),dz:(c.to.z-c.from.z)*(c.rate<0?-1:1)};if(c.progress>=1||c.progress<=0&&c.rate<0){const end=c.progress>=1?c.to:c.from;Object.assign(p,end);p.onWall=end.y>6;p.climb=null;p.ladderNeedsExit=true;p.ladderCooldown=at+500;p.moving=false;}return true;}
function finish(p,end,at){Object.assign(p,end);p.onWall=end.y>6;p.climb=null;p.jump=null;p.falling=false;p.fallVelocity=0;p.ladderNeedsExit=true;p.ladderCooldown=at+900;p.nativeSeen=null;p.movementCredit=.25;p.moving=false;}
function disembark(p,c,at,geometry){const from={...c.from},dx=c.from.x-c.to.x,dz=c.from.z-c.to.z,n=Math.hypot(dx,dz)||1,to={x:from.x+dx/n*1.25,y:0,z:from.z+dz/n*1.25};to.y=geometry?.floor(to.x,to.z,from.y+.5)??Math.max(0,from.y-1.1);const hit=geometry?.sweep({...from,y:from.y+.5},{...to,y:to.y+.5},.25);if(hit){to.x=hit.point.x;to.z=hit.point.z;to.y=geometry?.floor(to.x,to.z,from.y+.5)??to.y;}p.climb={rope:true,controlled:true,disembark:true,from,to,at,updatedAt:at,progress:0,rate:1/.42,arc:.4};p.heading={dx:to.x-from.x,dz:to.z-from.z};p.moving=true;}
function update(p,dt,at,blocked=false,geometry=null){const c=p.climb;if(!c?.rope)return legacyUpdate(p,dt,at,blocked);if(!c.controlled)return false;
 if(c.disembark){c.progress=Math.min(1,(c.progress??0)+dt/.42);c.updatedAt=at;Object.assign(p,motion.point(c,at));p.moving=true;if(c.progress>=1)finish(p,c.to,at);return true;}
 const fresh=at-(p.ladderInputAt??0)<400,force=blocked?0:drive(c,fresh?p.ladderInput:null),total=Math.max(1,length(c)),old=c.progress??0;
 if(!blocked){if(force<-.2){c.descending=true;c.exiting=false;}else if(force>.12)c.descending=false;
  const points=c.points??[c.from,c.to],first=Math.hypot(points[1].x-c.from.x,points[1].y-c.from.y,points[1].z-c.from.z);
  if(!c.descending&&old*total>=first-2.5&&(force>.12||c.exiting))c.exiting=true;
 }
 c.rate=blocked?0:c.descending?-22/total:c.exiting?18/total:force>.12?force*14/total:0;c.progress=Math.max(0,Math.min(1,old+c.rate*dt));c.updatedAt=at;Object.assign(p,motion.point(c,at));p.moving=Math.abs(c.progress-old)>.00001;p.heading={dx:(c.to.x-c.from.x)*(c.rate<0?-1:1),dz:(c.to.z-c.from.z)*(c.rate<0?-1:1)};
 if(c.rate>0&&!c.descending){const first=c.points?.[1]??c.to;if(c.progress*total>=Math.hypot(first.x-c.from.x,first.y-c.from.y,first.z-c.from.z)-2.5)c.exiting=true;}
 if(c.progress>=1)finish(p,c.to,at);else if(c.progress<=0&&c.descending)disembark(p,c,at,geometry);return true;
}
module.exports={drive,update,length};
