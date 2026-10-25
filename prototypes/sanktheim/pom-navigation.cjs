// Ground movement follows height changes and keeps a stable side while detouring around a trunk.
function moveAround(e,goal,distance,geometry,radius=.4){
 const dx=goal.x-e.x,dz=goal.z-e.z,length=Math.hypot(dx,dz);if(!length)return false;
 const ux=dx/length,uz=dz/length,origin={x:e.x,y:e.y+.65,z:e.z};
 function point(angle,step){const q={x:e.x+(ux*Math.cos(angle)-uz*Math.sin(angle))*step,y:e.y,z:e.z+(ux*Math.sin(angle)+uz*Math.cos(angle))*step},floor=geometry.floor?.(q.x,q.z,e.y+1.1);if(floor===null||floor!==undefined&&Math.abs(floor-e.y)>.7)return null;q.y=floor??e.y;return q;}
 const blocked=q=>{if(!q)return true;const hit=geometry.sweep(origin,{...q,y:q.y+.65},radius);return hit&&(!hit.normal||hit.normal.y<.65);};
 const sign=e.detourSide??(String(e.id).charCodeAt(String(e.id).length-1)%2?1:-1);
 if(e.navDetour&&Math.hypot(e.navDetour.x-goal.x,e.navDetour.z-goal.z)>3)e.navDetour=null;
 if(!e.navDetour&&blocked(point(0,Math.min(Math.max(distance,.85),length))))e.navDetour={x:goal.x,z:goal.z,distance:length};
 if(e.navDetour&&length<e.navDetour.distance-.6&&!blocked(point(0,Math.min(3,length))))e.navDetour=null;
 const angles=e.navDetour?[sign*Math.PI/3,sign*Math.PI/6,sign*Math.PI/2,sign*2*Math.PI/3,0,-sign*Math.PI/3,-sign*Math.PI/2]:[0,sign*Math.PI/6,sign*Math.PI/3,sign*Math.PI/2,sign*2*Math.PI/3,-sign*Math.PI/3,-sign*Math.PI/2];
 for(const angle of angles){
  const next=point(angle,Math.min(distance,length)),look=point(angle,Math.min(Math.max(distance,.85),length));if(blocked(next)||blocked(look))continue;
  e.x=next.x;e.z=next.z;e.y=next.y;if(angle)e.detourSide=Math.sign(angle);return true;
 }
 return false;
}
module.exports={moveAround};
