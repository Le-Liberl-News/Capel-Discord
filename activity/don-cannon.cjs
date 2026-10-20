const SHARED={special:'donCannon',noTempo:true,projectile:false,windup:0};
const ACTIONS={basic:{...SHARED,name:'Boulet de canon',key:'f',fps:true,projectile:true,projectileSpeed:22,range:40,radius:3,damage:32,windup:140,duration:900,cooldown:1500,lockMovement:false,hitEffect:'SC/msc0640._ef',muzzleEffect:'SC/sc000_10._ef'},craft:{...SHARED,name:'Marteau de canon',key:'g',selfTarget:true,thirdPersonCraft:false,dash:true,dashDuration:2250,lockMovement:true,duration:2250,cooldown:11000,range:4,radius:4.5,damage:48,stunDuration:2400,impactAt:1250,nativeEffect:'SC/sc006_17._ef'}};
const GRAVITY=14,MAX_FLIGHT=4000;
function craftPoint(origin,direction){const n=Math.hypot(direction.x,direction.z)||1;return {x:origin.x+direction.x/n*2.1,y:origin.y,z:origin.z+direction.z/n*2.1};}
function launch(origin,direction){return {origin:{x:origin.x+direction.x*.45,y:origin.y+direction.y*.45,z:origin.z+direction.z*.45},velocity:{x:direction.x*22,y:direction.y*22+3.5,z:direction.z*22}};}
function ballPoint(projectile,ms){const t=Math.max(0,ms)/1000;return {x:projectile.origin.x+projectile.velocity.x*t,y:projectile.origin.y+projectile.velocity.y*t-GRAVITY*t*t/2,z:projectile.origin.z+projectile.velocity.z*t};}
function aimDirection(origin,target){
 const dx=target.x-origin.x,dy=target.y-origin.y,dz=target.z-origin.z,f=t=>dx*dx+dz*dz+(dy-3.5*t+GRAVITY*t*t/2)**2-(.45+22*t)**2;
 let low=0,high=null;for(let t=.01;t<=3;t+=.01){if(f(t)<=0){high=t;break;}low=t;}
 if(high!==null){for(let i=0;i<24;i++){const mid=(low+high)/2;if(f(mid)>0)low=mid;else high=mid;}const t=(low+high)/2,d=.45+22*t;return {x:dx/d,y:(dy-3.5*t+GRAVITY*t*t/2)/d,z:dz/d};}
 const d=Math.hypot(dx,dy,dz)||1;return {x:dx/d,y:dy/d,z:dz/d};
}
const LEAP={takeoff:220,apex:910,fastFall:1020,impact:1250},HAMMER_FRAMES=24;
// The downward strike applies stronger acceleration after the apex, keeping the
// height and upward arc while halving the descent time. Velocity is zero at apex.
function hop(ms){if(ms<=LEAP.takeoff||ms>=LEAP.impact)return 0;const t=ms<LEAP.apex?(LEAP.apex-ms)/(LEAP.apex-LEAP.takeoff):(ms-LEAP.apex)/(LEAP.impact-LEAP.apex);return 2.7*(1-t*t);}
function hammer(ms){const animationTime=ms<=LEAP.apex?ms:Math.min(1600,LEAP.apex+(ms-LEAP.apex)*690/(LEAP.impact-LEAP.apex));const t=Math.max(0,Math.min(1,(animationTime-220)/1380));const raise=Math.min(1,t/.22),fall=Math.max(0,(t-.57)/.43);return {angle:-Math.PI/2*raise+Math.PI*fall*fall,x:49+12*fall*fall,y:53-36*raise+55*fall*fall,behind:ms>=LEAP.fastFall};}

function motion(a,ms){return {active:ms<ACTIONS.craft.duration,position:{...a.origin,y:a.origin.y+hop(ms)}};}
function pose(a,ms){
 if(a.kind==='basic')return {bank:2,pose:ms<140?0:ms<230?3:ms<330?4:ms<480?5:ms<650?6:7};
 // Observers retain all eight native directions. The owner sees the animated FPS cannon.
 const pose=ms<140?0:ms<220?2:ms<450?3:ms<1020?4:ms<1120?3:ms<1190?2:ms<LEAP.impact?0:5;
 return {bank:2,pose};
}
module.exports={ACTIONS,GRAVITY,MAX_FLIGHT,LEAP,HAMMER_FRAMES,craftPoint,launch,aimDirection,ballPoint,hop,hammer,motion,pose};
