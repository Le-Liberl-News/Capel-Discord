// Steering changes heading quickly while lateral velocity catches up slowly.
function createPatDrive(heading={dx:0,dz:-1}) {
 let angle=Math.atan2(heading.dx,heading.dz),vx=Math.sin(angle)*3.5,vz=Math.cos(angle)*3.5;
 return {step(input,dt,factor=1){dt=Math.min(.04,Math.max(0,dt));const throttle=Math.min(1,Math.hypot(input.x,input.z));if(throttle){const desired=Math.atan2(input.x,input.z),delta=Math.atan2(Math.sin(desired-angle),Math.cos(desired-angle));angle+=Math.max(-2.4*dt,Math.min(2.4*dt,delta));vx+=Math.sin(angle)*14*dt*factor;vz+=Math.cos(angle)*14*dt*factor;const blend=1-Math.exp(-.9*dt),speed=Math.hypot(vx,vz);vx+=(Math.sin(angle)*speed-vx)*blend;vz+=(Math.cos(angle)*speed-vz)*blend;}const friction=Math.exp(-(throttle?.12:1.2)*dt);vx*=friction;vz*=friction;const speed=Math.hypot(vx,vz),limit=18*factor;if(speed>limit){vx*=limit/speed;vz*=limit/speed;}return {x:vx*dt,z:vz*dt,vx,vz,speed:Math.hypot(vx,vz)};},bounce(normal){const dot=vx*normal.x+vz*normal.z;vx=(vx-normal.x*dot)*.45;vz=(vz-normal.z*dot)*.45;},stop(){vx=vz=0;}};
}
module.exports={createPatDrive};
