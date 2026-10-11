const {flightBounds,insideFlight,clearFlight}=require('./flight.cjs');
const SIEG_DIVE={name:'Plongeon',key:'g',cooldown:2500,duration:1100,range:8};
function divePath(origin,direction,grid,geometry){
 if(!direction||!['x','y','z'].every(k=>Number.isFinite(direction[k])))return null;
 const length=Math.hypot(direction.x,direction.y,direction.z);if(length<.5||length>1.1)return null;
 const d={x:direction.x/length,y:direction.y/length,z:direction.z/length},bounds=flightBounds(grid),points=[{...origin}];
 for(let n=1;n<=40;n++){
  const t=n/40,recovery=Math.max(0,(t-.55)/.45),rise=recovery*recovery*(3-2*recovery),p={x:origin.x+d.x*SIEG_DIVE.range*t,y:origin.y+d.y*SIEG_DIVE.range*t-1.3*Math.sin(t*Math.PI)+(Math.max(0,-d.y)*SIEG_DIVE.range+.6)*rise,z:origin.z+d.z*SIEG_DIVE.range*t};
  const floor=geometry?.floor(p.x,p.z,points.at(-1).y+.1);if(Number.isFinite(floor))p.y=Math.max(p.y,floor+.08);p.y=Math.max(bounds.minY,p.y);
  if(!insideFlight(p,bounds)||!clearFlight(points.at(-1),p,geometry?.sweep?geometry:null))break;
  points.push(p);
 }
 return points.length>1?points:null;
}
function divePosition(dive,time){const progress=Math.max(0,Math.min(1,(time-dive.started)/dive.duration)),frame=progress*(dive.points.length-1),i=Math.min(dive.points.length-2,Math.floor(frame)),t=frame-i,a=dive.points[i],b=dive.points[i+1];return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,z:a.z+(b.z-a.z)*t};}
module.exports={SIEG_DIVE,divePath,divePosition};
