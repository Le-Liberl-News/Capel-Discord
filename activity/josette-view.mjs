export function combatKeyAction(code,character){return character==='Josette'&&code==='KeyF'?null:({KeyF:'basic',KeyG:'craft',KeyC:'art'}[code]??null);}
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
export function craftViewBlend(elapsed,duration){
 if(elapsed<0||elapsed>=duration)return 0;
 const travel=Math.min(220,duration/3);
 return smooth(elapsed/travel)*smooth((duration-elapsed)/travel);
}
export function gunPose(elapsed){
 if(elapsed==null||elapsed<0||elapsed>=200)return {frame:0,recoil:0};
 return {frame:elapsed<65?1:elapsed<130?2:0,recoil:Math.sin(Math.PI*Math.min(1,elapsed/180))};
}
export async function createJosetteView(THREE,assets){
 const image=new Image();await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;image.src=new URL('combat/josette-gun.png',assets).href;});
 const canvas=document.createElement('canvas');canvas.width=176;canvas.height=164;canvas.style.cssText='position:fixed;right:26%;bottom:4%;width:clamp(130px,23vw,290px);height:auto;image-rendering:pixelated;pointer-events:none;z-index:16';canvas.hidden=true;document.body.append(canvas);
 const context=canvas.getContext('2d');context.imageSmoothingEnabled=false;
 const eye=new THREE.Vector3(),end=new THREE.Vector3(),look=new THREE.Vector3(),matrix=new THREE.Matrix4(),first=new THREE.Quaternion(),third=new THREE.Quaternion();
 let craft=null;
 return {update({camera,position,attack,spec,active,time,moving,yaw}){
  if(attack?.kind==='craft'&&spec?.thirdPersonCraft)craft={event:attack,duration:spec.duration};
  if(!active){craft=null;canvas.hidden=true;return 0;}
  const age=craft?time-craft.event.localStart:0;
  let blend=craft&&!craft.event.cancelled?craftViewBlend(age,craft.duration):0;
  if(craft&&(age>=craft.duration||craft.event.cancelled))craft=null;
  if(blend){
   eye.copy(camera.position);first.copy(camera.quaternion);
   const dx=-Math.sin(yaw),dz=Math.cos(yaw);
   // Back and slightly to the side; retain a perspective camera throughout.
   end.set(position.x-dx*3.1+dz*.75,position.y+1.85,position.z-dz*3.1-dx*.75);
   look.set(position.x,position.y+.95,position.z);matrix.lookAt(end,look,camera.up);third.setFromRotationMatrix(matrix);
   camera.position.lerpVectors(eye,end,blend);camera.quaternion.copy(first).slerp(third,blend);
  }
  canvas.hidden=!active||blend>.95;canvas.style.opacity=String(1-blend);
  if(!canvas.hidden){
   const pose=gunPose(attack?.kind==='basic'?time-attack.localStart:null),bob=moving?Math.sin(time*.012)*3:Math.sin(time*.002)*.7;
   context.clearRect(0,0,176,164);context.save();context.translate(168+pose.recoil*8,42+bob+pose.recoil*15);context.rotate(.28-pose.recoil*.1);context.scale(-3.6,3.6);context.drawImage(image,pose.frame*40,0,40,30,0,0,40,30);context.restore();
  }
  return blend;
 },dispose(){canvas.remove();}};
}
