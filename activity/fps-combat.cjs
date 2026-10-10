// Server hit volumes use metres, independently of the transparent sprite padding.
const nativeVolumes=require('./assets/sky/combat/hit-volumes.json');
function bodyHeight(p){return nativeVolumes[p.character]?.height??(p.character==='Sieg'?.55:p.boss?3.6:p.enemy?1.2:1.65);}
function rayBody(origin,direction,p,range=30){
 const height=bodyHeight(p),radius=nativeVolumes[p.character]?.radius??(p.boss?1.1:p.enemy?.4:.3);
 let near=0,far=range;
 for(const [axis,low,high] of [['x',p.x-radius,p.x+radius],['y',(p.y??0)+.05,(p.y??0)+height],['z',p.z-radius,p.z+radius]]){
  if(Math.abs(direction[axis])<1e-8){if(origin[axis]<low||origin[axis]>high)return null;continue;}
  const a=(low-origin[axis])/direction[axis],b=(high-origin[axis])/direction[axis];near=Math.max(near,Math.min(a,b));far=Math.min(far,Math.max(a,b));if(near>far)return null;
 }
 const point={x:origin.x+direction.x*near,y:origin.y+direction.y*near,z:origin.z+direction.z*near};
 return {point,distance:near,headshot:point.y-(p.y??0)>=height*.78};
}
function validateRay(actor,ray){
 if(!ray||!['origin','direction'].every(k=>ray[k]&&['x','y','z'].every(a=>Number.isFinite(ray[k][a]))))return null;
 if(Math.hypot(ray.origin.x-actor.x,ray.origin.z-actor.z)>.5||Math.abs(ray.origin.y-(actor.y??0)-1.45)>.2)return null;
 const length=Math.hypot(ray.direction.x,ray.direction.y,ray.direction.z);if(length<.99||length>1.01)return null;
 return {origin:{...ray.origin},direction:{x:ray.direction.x/length,y:ray.direction.y/length,z:ray.direction.z/length}};
}
module.exports={rayBody,validateRay,bodyHeight};
