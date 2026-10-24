const angleDelta=(a,b)=>Math.atan2(Math.sin(b-a),Math.cos(b-a));
// Render slightly behind the server so successive packets describe a continuous path.
export function createVehicleMotion({delay=140,extrapolation=120}={}){
 let samples=[];
 return {push(v,at,received){const last=samples.at(-1);if(last?.at===at)return;if(last&&(at<last.at||Math.hypot(v.x-last.x,v.y-last.y,v.z-last.z)>35))samples=[];samples.push({x:v.x,y:v.y,z:v.z,yaw:v.yaw,speed:v.speed,at,received});if(samples.length>12)samples.shift();},sample(now){
  if(!samples.length)return null;const last=samples.at(-1),at=last.at+Math.max(0,now-last.received)-delay;
  if(at<=samples[0].at)return {...samples[0]};
  for(let i=1;i<samples.length;i++){const a=samples[i-1],b=samples[i];if(at>b.at)continue;const k=(at-a.at)/(b.at-a.at);return {x:a.x+(b.x-a.x)*k,y:a.y+(b.y-a.y)*k,z:a.z+(b.z-a.z)*k,yaw:a.yaw+angleDelta(a.yaw,b.yaw)*k,speed:a.speed+(b.speed-a.speed)*k};}
  const previous=samples.at(-2),dt=Math.min(extrapolation,Math.max(0,at-last.at))/1000,span=previous?(last.at-previous.at)/1000:0,turn=span?angleDelta(previous.yaw,last.yaw)/span:0,yaw=last.yaw+turn*dt;
  return {...last,x:last.x-Math.sin(last.yaw+turn*dt/2)*last.speed*dt,z:last.z-Math.cos(last.yaw+turn*dt/2)*last.speed*dt,yaw};
 }};
}
