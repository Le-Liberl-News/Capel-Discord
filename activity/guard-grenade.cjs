const cannon=require('./don-cannon.cjs');
const MAX_FLIGHT=4000;
function launch(origin,direction,started){return {...cannon.launch(origin,direction),started};}
const point=cannon.ballPoint;
// Swept, sixty-Hz steps prevent a fast grenade crossing thin walls or the ground.
function advance(g,until,geometry){const end=Math.min(MAX_FLIGHT,Math.max(0,until-g.started));let ms=g.flightTime??0,from=point(g,ms);while(ms<end){const nextMs=Math.min(end,ms+1000/60),to=point(g,nextMs),hit=geometry?.sweep(from,to,.14),floor=geometry?.floor(to.x,to.z,Math.max(from.y,to.y)+.3);let normal=hit?.normal,contact=hit&&(hit.surfacePoint??hit.point),fraction=hit?Math.min(1,hit.distance/(Math.hypot(to.x-from.x,to.y-from.y,to.z-from.z)||1)):Infinity;if(Number.isFinite(floor)&&to.y<=floor+.12){const k=Math.max(0,Math.min(1,(from.y-floor-.12)/(from.y-to.y||1)));if(k<fraction){normal={x:0,y:1,z:0};fraction=k;contact={x:from.x+(to.x-from.x)*k,y:floor,z:from.z+(to.z-from.z)*k};}}if(contact){g.flightTime=ms+(nextMs-ms)*fraction;return {point:contact,normal,at:g.started+g.flightTime};}ms=nextMs;from=to;}g.flightTime=end;return end>=MAX_FLIGHT?{expired:true,at:until}:null;}
function pushPoint(c,time,scale=1){const k=Math.max(0,Math.min(1,(time-c.at)/c.duration)),distance=5/scale*(1-(1-k)**2);return {x:c.from.x+c.dx*distance,y:c.from.y+Math.sin(k*Math.PI)*.8/scale,z:c.from.z+c.dz*distance,k};}
module.exports={pushPoint,launch,point,advance,MAX_FLIGHT,aimDirection:cannon.aimDirection};
