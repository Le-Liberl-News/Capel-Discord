import {bakedEffectSprite} from './baked-effects.mjs';

export function chargePose(effect,time){
 const age=time*2-effect.start;
 return {visible:age>=0&&time*2<effect.end,age};
}

export function createArcCharge(THREE,scene,banks,event,spec){
 const parts=(spec.chargeEffects??[]).map(effect=>{
  const bank=banks.get(effect.id.toLowerCase());
  if(!bank)throw Error('Effet de charge introuvable : '+effect.id);
  const animation=bakedEffectSprite(THREE,bank,effect.size);scene.add(animation.sprite);
  return {effect,animation};
 });
 const dx=event.aim.x-event.origin.x,dz=event.aim.z-event.origin.z,length=Math.hypot(dx,dz)||1;
 return {draw(time,position){for(const{effect,animation}of parts){
  const pose=chargePose(effect,time);animation.sprite.visible=pose.visible;
  animation.sprite.position.set(position.x+dx/length*effect.forward,position.y+effect.height,position.z+dz/length*effect.forward);
  if(pose.visible)animation.draw(pose.age);
 }},dispose(){for(const{animation}of parts){scene.remove(animation.sprite);animation.dispose();}}};
}
