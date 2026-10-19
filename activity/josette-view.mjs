export function muzzleFrame(elapsed){return elapsed==null||elapsed<0||elapsed>=220?null:Math.min(89,Math.floor(elapsed/220*90));}
export function combatKeyAction(code,character){return ['Josette','Carna','Don'].includes(character)&&code==='KeyF'?null:({KeyF:'basic',KeyG:'craft',KeyC:'art',KeyV:'parry'}[code]??null);}
export function fpsMouseLook(yaw,pitch,dx,dy){return {yaw:yaw+dx*.006,pitch:Math.max(-1.48,Math.min(1.48,pitch+dy*.006))};}
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
 const carna=new Image();await new Promise((resolve,reject)=>{carna.onload=resolve;carna.onerror=reject;carna.src=new URL('combat/carna-gun.png',assets).href;});
 const don=new Image();await new Promise((resolve,reject)=>{don.onload=resolve;don.onerror=reject;don.src=new URL('combat/don-gun.png',assets).href;});
 const donSpark=new Image();await new Promise((resolve,reject)=>{donSpark.onload=resolve;donSpark.onerror=reject;donSpark.src=new URL('effects/sc-sc000_10-frames.png',assets).href;});
 const spark=new Image();await new Promise((resolve,reject)=>{spark.onload=resolve;spark.onerror=reject;spark.src=new URL('effects/sc-msc0548-frames.png',assets).href;});
 const carnaSpark=await new THREE.TextureLoader().loadAsync(new URL('effects/sc-sc006_01-frames.png',assets).href);
 const canvas=document.createElement('canvas');canvas.width=176;canvas.height=164;canvas.style.cssText='position:fixed;right:26%;bottom:4%;width:clamp(130px,23vw,290px);height:auto;image-rendering:pixelated;pointer-events:none;z-index:16';canvas.hidden=true;canvas.style.display='none';document.body.append(canvas);
 const context=canvas.getContext('2d');context.imageSmoothingEnabled=false;
 const eye=new THREE.Vector3(),end=new THREE.Vector3(),look=new THREE.Vector3(),matrix=new THREE.Matrix4(),first=new THREE.Quaternion(),third=new THREE.Quaternion();
 let craft=null;
 return {update({camera,position,attack,spec,active,time,moving,yaw,character}){
  active&&=['Josette','Carna','Don'].includes(character);
  if(attack?.kind==='craft'&&spec?.thirdPersonCraft)craft={event:attack,duration:spec.duration};
  if(!active){craft=null;canvas.hidden=true;canvas.style.display='none';return 0;}
  const age=craft?time-craft.event.localStart:0;
  let blend=craft&&!craft.event.cancelled?craftViewBlend(age,craft.duration):0;
  if(craft&&(age>=craft.duration||craft.event.cancelled))craft=null;
  if(blend){
   eye.copy(camera.position);first.copy(camera.quaternion);
   const direction=character==='Carna'?{x:-Math.sin(yaw),z:Math.cos(yaw)}:craft.event.ray?.direction??{x:craft.event.aim.x-craft.event.origin.x,z:craft.event.aim.z-craft.event.origin.z},length=Math.hypot(direction.x,direction.z);
   const dx=length>1e-6?direction.x/length:-Math.sin(yaw),dz=length>1e-6?direction.z/length:Math.cos(yaw);
   // Keep the travelling directly behind the original aiming axis.
   end.set(position.x-dx*3.1,position.y+1.85,position.z-dz*3.1);
   if(character==='Don'){const p=craft.event.origin;end.set(p.x-dx*6.8,p.y+3.6,p.z-dz*6.8);}
   look.set(position.x,position.y+.95,position.z);if(character==='Don'){const p=craft.event.origin;look.set(p.x+dx*.8,p.y+2,p.z+dz*.8);}matrix.lookAt(end,look,camera.up);third.setFromRotationMatrix(matrix);
   if(character==='Carna')third.copy(first);
   camera.position.lerpVectors(eye,end,blend);camera.quaternion.copy(first).slerp(third,blend);
  }
  canvas.hidden=!active||blend>.95;canvas.style.display=canvas.hidden?'none':'block';canvas.style.opacity=String(1-blend);
  if(!canvas.hidden){
   const elapsed=attack?.kind==='basic'?time-attack.localStart-(character==='Don'?140:0):null,firing=character==='Carna'&&elapsed!==null&&elapsed<3000&&!attack.fireStoppedAt;const pose=gunPose(firing?elapsed%100:elapsed),bob=moving?Math.sin(time*.012)*3:Math.sin(time*.002)*.7;
   const reload=character==='Carna'&&(elapsed>=3000||!!attack?.fireStoppedAt)&&elapsed<5000;
   const carnaGun=character==='Carna',gunScale=character==='Don'?4.5:carnaGun?4.8:3.6;
   context.clearRect(0,0,176,164);context.save();context.translate(168+pose.recoil*8,(carnaGun?24:42)+bob+pose.recoil*15+(reload?30:0));context.rotate(.28-pose.recoil*.1+(reload?.35:0));context.scale(-gunScale,gunScale);context.drawImage(character==='Don'?don:carnaGun?carna:image,pose.frame*40,0,40,30,0,0,40,30);const flash=muzzleFrame(firing?elapsed%100:character==='Carna'?null:elapsed);if(flash!==null){context.globalCompositeOperation='lighter';context.drawImage(character==='Don'?donSpark:carnaGun?carnaSpark.image:spark,flash%8*128,Math.floor(flash/8)*128,128,128,27,-5,26,26);}context.restore();
   if(reload){context.font='bold 12px sans-serif';context.fillStyle='white';context.fillText('Rechargement…',12,155);}
  }
  return blend;
 },dispose(){carnaSpark.dispose();canvas.remove();}};
}
