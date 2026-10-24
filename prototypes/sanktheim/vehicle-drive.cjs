const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function step(v,c,dt){
 c={forward:0,side:0,...c};
 v.speed=clamp(v.speed+(c.forward*10-v.speed*(c.brake?12:c.forward?.45:2))*dt,-7,18);
 v.steer=(v.steer??0)+(c.side-(v.steer??0))*(1-Math.exp(-dt*7));
 v.yaw-=v.steer*1.35*Math.min(1,Math.abs(v.speed)/3)*Math.sign(v.speed||1)*dt;
 return {x:v.x-Math.sin(v.yaw)*v.speed*dt,y:v.y,z:v.z-Math.cos(v.yaw)*v.speed*dt};
}
function advance(v,c,dt,validate){for(let left=dt;left>1e-6;){const h=Math.min(left,1/60);left-=h;const q=step(v,c,h),accepted=validate?validate(v,q):q;if(accepted)Object.assign(v,accepted);else v.speed*=.1;}return v;}
function createPrediction(){let v=null,pilot=null,offset={x:0,y:0,z:0,yaw:0};return {
 receive(next,age=0,c={},validate){const old=v&&{x:v.x+offset.x,y:v.y+offset.y,z:v.z+offset.z,yaw:v.yaw+offset.yaw};v={...next};advance(v,c,Math.min(3,Math.max(0,age)),validate);if(old&&pilot===next.pilot){for(const k of ['x','y','z'])offset[k]=old[k]-v[k];offset.yaw=Math.atan2(Math.sin(old.yaw-v.yaw),Math.cos(old.yaw-v.yaw));}else offset={x:0,y:0,z:0,yaw:0};pilot=next.pilot;},
 sample(c,dt,validate){if(!v)return null;advance(v,c,Math.min(.1,dt),validate);const decay=Math.exp(-dt*3);for(const k of Object.keys(offset))offset[k]*=decay;return {...v,x:v.x+offset.x,y:v.y+offset.y,z:v.z+offset.z,yaw:v.yaw+offset.yaw};}
};}
module.exports={step,advance,createPrediction};
