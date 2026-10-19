const SHARED={special:'donCannon',noTempo:true,projectile:false,windup:0};
const ACTIONS={basic:{...SHARED,name:'Boulet de canon',key:'f',fps:true,projectile:true,projectileSpeed:22,range:40,radius:3,damage:32,windup:140,duration:900,cooldown:1500,lockMovement:false,hitEffect:'SC/msc0640._ef',muzzleEffect:'SC/sc000_10._ef'},craft:{...SHARED,name:'Marteau de canon',key:'g',selfTarget:true,thirdPersonCraft:true,dash:true,dashDuration:1350,lockMovement:true,duration:1350,cooldown:11000,range:4,radius:3.7,damage:48,stunDuration:2400,impactAt:900,nativeEffect:'SC/sc006_17._ef'}};
const GRAVITY=14,MAX_FLIGHT=4000;
function launch(origin,direction){return {origin:{x:origin.x+direction.x*.45,y:origin.y+direction.y*.45,z:origin.z+direction.z*.45},velocity:{x:direction.x*22,y:direction.y*22+3.5,z:direction.z*22}};}
function ballPoint(projectile,ms){const t=Math.max(0,ms)/1000;return {x:projectile.origin.x+projectile.velocity.x*t,y:projectile.origin.y+projectile.velocity.y*t-GRAVITY*t*t/2,z:projectile.origin.z+projectile.velocity.z*t};}
function aimDirection(origin,target){
 const dx=target.x-origin.x,dy=target.y-origin.y,dz=target.z-origin.z,f=t=>dx*dx+dz*dz+(dy-3.5*t+GRAVITY*t*t/2)**2-(.45+22*t)**2;
 let low=0,high=null;for(let t=.01;t<=3;t+=.01){if(f(t)<=0){high=t;break;}low=t;}
 if(high!==null){for(let i=0;i<24;i++){const mid=(low+high)/2;if(f(mid)>0)low=mid;else high=mid;}const t=(low+high)/2,d=.45+22*t;return {x:dx/d,y:(dy-3.5*t+GRAVITY*t*t/2)/d,z:dz/d};}
 const d=Math.hypot(dx,dy,dz)||1;return {x:dx/d,y:dy/d,z:dz/d};
}
function hop(ms){return ms<=220||ms>=900?0:Math.sin(Math.PI*(ms-220)/680)*1.35;}
function motion(a,ms){return {active:ms<ACTIONS.craft.duration,position:{...a.origin,y:a.origin.y+hop(ms)}};}
function pose(a,ms){
 if(a.kind==='basic')return {bank:2,pose:ms<140?0:ms<230?3:ms<330?4:ms<480?5:ms<650?6:7};
 const pose=ms<140?0:ms<220?2:ms<550?3:ms<680?4:ms<740?3:ms<800?2:ms<850?1:ms<900?0:ms<1100?5:6;
 return {bank:2,pose};
}
module.exports={ACTIONS,GRAVITY,MAX_FLIGHT,launch,aimDirection,ballPoint,hop,motion,pose};
