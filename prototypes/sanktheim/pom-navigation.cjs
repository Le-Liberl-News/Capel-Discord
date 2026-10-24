// Ground poms follow a stable side around obstacles instead of repeating a blocked step.
function moveAround(e,goal,distance,geometry,radius=.4){
 const dx=goal.x-e.x,dz=goal.z-e.z,length=Math.hypot(dx,dz);if(!length)return;
 const ux=dx/length,uz=dz/length,origin={x:e.x,y:e.y+.6,z:e.z};
 const point=(angle,step)=>({x:e.x+(ux*Math.cos(angle)-uz*Math.sin(angle))*step,y:origin.y,z:e.z+(ux*Math.sin(angle)+uz*Math.cos(angle))*step});
 const sign=e.detourSide??(String(e.id).charCodeAt(String(e.id).length-1)%2?1:-1);
 for(const angle of [0,sign*Math.PI/6,sign*Math.PI/3,sign*Math.PI/2,sign*2*Math.PI/3,-sign*Math.PI/3,-sign*Math.PI/2]){
  const next=point(angle,Math.min(distance,length)),look=point(angle,Math.min(Math.max(distance,1.2),length));
  if(geometry.sweep(origin,next,radius)||geometry.sweep(origin,look,radius))continue;
  const floor=geometry.floor?.(next.x,next.z,e.y+.7);if(floor===null||floor!==undefined&&Math.abs(floor-e.y)>.65)continue;
  e.x=next.x;e.z=next.z;if(angle)e.detourSide=Math.sign(angle);return true;
 }
 return false;
}
module.exports={moveAround};
