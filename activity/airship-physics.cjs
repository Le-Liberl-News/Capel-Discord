const DT=1/60,GRAVITY=8,STALL_SPEED=5.5,MAX_SPEED=18,MAX_ROLL=Math.PI/3;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function groundField(meta,cells){return {meta,floor(x,z){const a=Math.round((x-meta.origin.x)/meta.step),b=Math.round((z-meta.origin.z)/meta.step);if(a<0||b<0||a>=meta.width||b>=meta.height)return null;const y=cells[b*meta.width+a];return Number.isFinite(y)&&y>-1000?y:null;}};}
function initialAirship(spawn){return {x:spawn.x,y:spawn.y,z:spawn.z,yaw:spawn.yaw??0,pitch:0,roll:0,vx:0,vy:0,vz:0,throttle:0,grounded:true,sequence:0,crashes:0};}
function validControls(c){return !!c&&['pitch','roll','throttle'].every(k=>Number.isFinite(c[k]))&&Math.abs(c.pitch)<=1&&Math.abs(c.roll)<=1&&c.throttle>=0&&c.throttle<=1;}
function airshipNearby(p,lobby){return !!p&&Math.hypot(p.x-lobby.x,p.z-lobby.z)<=2.4&&Math.abs(p.y-lobby.y)<1.2;}
function resetAirship(state,spawn,crash=false){const sequence=state.sequence,crashes=state.crashes+(crash?1:0);Object.assign(state,initialAirship(spawn),{sequence,crashes});return state;}
function stepAirship(s,c,ground,spawn){
 if(!validControls(c))return s;
 s.throttle=c.throttle;
 const targetRoll=-c.roll*MAX_ROLL;s.roll+=(targetRoll-s.roll)*Math.min(1,DT*8);
 s.pitch=clamp(s.pitch+c.pitch*DT*.55,-.65,.65);
 const speed=Math.hypot(s.vx,s.vz),groundY=ground.floor(s.x,s.z);
 // Compact walking maps need tight arcade turns, with a short residual drift.
 if(s.grounded)s.yaw-=c.roll*DT*1.2*clamp(speed/4,0,1);
 else s.yaw-=(c.roll*.35-s.roll/MAX_ROLL*.95)*DT*clamp(speed/STALL_SPEED,0,1);
 const fx=-Math.sin(s.yaw),fz=-Math.cos(s.yaw),forwardSpeed=s.vx*fx+s.vz*fz;
 const slipX=s.vx-fx*forwardSpeed,slipZ=s.vz-fz*forwardSpeed;
 const acceleration=c.throttle>0?clamp((MAX_SPEED*c.throttle-forwardSpeed)*.9,-8,8):-forwardSpeed*.12;
 s.vx+=(fx*acceleration-slipX*6)*DT;
 s.vz+=(fz*acceleration-slipZ*6)*DT;
 const lift=GRAVITY*clamp((speed/STALL_SPEED)**2,0,1.15)*(1-.15*(1-Math.cos(s.roll)));
 const verticalTarget=Math.sin(s.pitch)*speed;
 if(!s.grounded)s.vy+=(verticalTarget-s.vy)*2.2*DT+(lift-GRAVITY)*DT;
 if(s.grounded&&speed>STALL_SPEED&&s.pitch>.045){s.grounded=false;s.vy=Math.max(1.8,verticalTarget);}
 const nx=s.x+s.vx*DT,nz=s.z+s.vz*DT;let ny=s.y+(s.grounded?0:s.vy*DT),floor=ground.floor(nx,nz);
 const nextFloor=floor??-1000;
 if(s.grounded&&floor!==null){if(floor-s.y>1.2){resetAirship(s,spawn,true);return s;}ny=floor;s.vy=0;}
 else if(ny<=nextFloor){
  const gentle=s.vy>-4.5&&speed<24&&Math.abs(s.roll)<.4&&Math.abs(s.pitch)<.35;
  if(!gentle){resetAirship(s,spawn,true);return s;}
  ny=floor;s.vy=0;s.grounded=true;s.pitch*=.95;s.roll*=.8;
 }
 if(s.grounded&&floor===null){s.grounded=false;s.vy=-.2;}
 Object.assign(s,{x:nx,y:ny,z:nz});
 if(s.y>ground.meta.maxY){s.y=ground.meta.maxY;s.vy=Math.min(0,s.vy);s.pitch=Math.min(0,s.pitch);}
 const margin=600,m=ground.meta;
 if(s.y<m.minY-100||s.x<m.origin.x-margin||s.z<m.origin.z-margin||s.x>m.origin.x+m.width*m.step+margin||s.z>m.origin.z+m.height*m.step+margin)resetAirship(s,spawn,true);
 return s;
}
module.exports={DT,STALL_SPEED,MAX_SPEED,MAX_ROLL,groundField,initialAirship,validControls,stepAirship,resetAirship,airshipNearby};
