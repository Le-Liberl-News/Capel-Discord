const clamp=t=>Math.max(0,Math.min(1,t));
function projectilePosition(a,s,time,owner=a.origin){
 const age=Math.max(0,time-a.started-s.windup);
 if(s.special==='boomerang'){
  const t=clamp(age/2200),out=t<.5,p=out?t*2:(t-.5)*2,start=out?a.origin:a.aim,end=out?a.aim:owner;
  const dx=a.aim.x-a.origin.x,dz=a.aim.z-a.origin.z,l=Math.hypot(dx,dz)||1,side=(String(a.id).charCodeAt(0)%2?1:-1)*(out?1:-1),curve=Math.sin(p*Math.PI)*Math.min(4,l*.65)*side;
  return {x:start.x+(end.x-start.x)*p+dz/l*curve,y:start.y+(end.y-start.y)*p+.9+Math.sin(p*Math.PI)*.6,z:start.z+(end.z-start.z)*p-dx/l*curve};
 }
 const length=Math.hypot(a.aim.x-a.origin.x,a.aim.z-a.origin.z),t=clamp(age*(s.projectileSpeed??10)/1000/(length||1));
 return {x:a.origin.x+(a.aim.x-a.origin.x)*t,y:a.origin.y+(a.aim.y-a.origin.y)*t+.9,z:a.origin.z+(a.aim.z-a.origin.z)*t};
}
function divePosition(a,time,s){
 const age=Math.max(0,time-s.windup),rise=400,release=s.leapDuration-600;
 if(age<rise)return {x:a.origin.x,y:a.origin.y+4*Math.sin(age/rise*Math.PI/2),z:a.origin.z};
 if(age<release)return {x:a.origin.x,y:a.origin.y+4,z:a.origin.z};
 const q=clamp((age-release)/600)**2;
 return {x:a.origin.x+(a.aim.x-a.origin.x)*q,y:a.origin.y+4+(a.aim.y-a.origin.y-4)*q,z:a.origin.z+(a.aim.z-a.origin.z)*q};
}
function spirePose(a,time,s){const delay=s.launchDelay??400,impact=a.impactAt-a.started,dx=a.aim.x-a.origin.x,dz=a.aim.z-a.origin.z,l=Math.hypot(dx,dz)||1,start={x:a.origin.x,y:a.origin.y+3,z:a.origin.z},q=clamp((time-delay)/(impact-delay))**2;return {tip:{x:start.x+dx*q,y:start.y+(a.aim.y-start.y)*q,z:start.z+dz*q},direction:time<delay?{x:dx/l,y:0,z:dz/l}:{x:dx,y:a.aim.y-start.y,z:dz}};}
module.exports={projectilePosition,divePosition,spirePose};
