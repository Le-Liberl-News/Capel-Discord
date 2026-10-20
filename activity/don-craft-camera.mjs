import cannon from './don-cannon.cjs';
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
// Store the actual aim pitch: finishing the action leaves the player looking at
// the ground ahead, rather than snapping back to the pre-craft orientation.
export function createDonCraftCamera(){
 let current=null,startPitch=null;
 return (event,now,pitch,position)=>{
  if(!event||event.character!=='Don'||event.kind!=='craft'||event.cancelled||!position){current=null;startPitch=null;return pitch;}
  if(current!==event.id){current=event.id;startPitch=null;}
  const age=now-event.localStart;if(age<=cannon.LEAP.apex)return pitch;
  startPitch??=pitch;
  const aim=event.explosionPoint??event.aim??{x:position.x,y:event.origin.y,z:position.z+2.1},distance=Math.max(.75,Math.hypot(aim.x-position.x,aim.z-position.z));
  const target=Math.max(.1,Math.min(1.3,Math.atan2(position.y+1.45-aim.y,distance)));
  return startPitch+(target-startPitch)*smooth((age-cannon.LEAP.apex)/(cannon.LEAP.impact-cannon.LEAP.apex));
 };
}
export function donCraftGunPose(age){
 if(age==null||age<0||age>=cannon.ACTIONS.craft.duration)return {lift:0,angle:0,scale:1};
 const up=smooth((age-cannon.LEAP.takeoff)/300),down=smooth((age-cannon.LEAP.apex)/(cannon.LEAP.impact-cannon.LEAP.apex));
 return {lift:-50*up*(1-down)+45*down,angle:-.95*up*(1-down)+.8*down,scale:1+.6*smooth(age/180)};
}

export function donCraftYaw(event,now,yaw,position){
 if(event?.character!=='Don'||event.kind!=='craft'||event.cancelled||!position||!event.aim)return yaw;
 const age=now-event.localStart;if(age<cannon.LEAP.apex)return yaw;
 const dx=event.aim.x-position.x,dz=event.aim.z-position.z;if(Math.hypot(dx,dz)<.1)return yaw;
 const target=Math.atan2(-dx,dz),difference=Math.atan2(Math.sin(target-yaw),Math.cos(target-yaw));
 return yaw+difference*smooth((age-cannon.LEAP.apex)/(cannon.LEAP.impact-cannon.LEAP.apex));
}
