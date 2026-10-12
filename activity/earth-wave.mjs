import {loadBakedEffect,bakedEffectSprite} from './baked-effects.mjs';
export async function prepareEarthWave(THREE,assets){return {...await loadBakedEffect(THREE,assets,'sc-mg017_0',90),duration:900};}
// One shared pre-rendered native assembly, repeated along the server's hit positions.
export function createEarthWave(THREE,scene,event,spec,bank){
 const steps=spec.hitOffsets.map((delay,index)=>{const t=index/Math.max(1,spec.hitOffsets.length-1),fx=bakedEffectSprite(THREE,bank,3);fx.sprite.position.set(event.origin.x+(event.aim.x-event.origin.x)*t,event.origin.y+(event.aim.y-event.origin.y)*t+.6,event.origin.z+(event.aim.z-event.origin.z)*t);scene.add(fx.sprite);return {delay,fx};});
 return {draw(time){for(const {delay,fx}of steps){const age=time-spec.windup-delay;fx.sprite.visible=age>=0&&age<900;if(fx.sprite.visible)fx.draw(age);}},dispose(){for(const {fx}of steps){scene.remove(fx.sprite);fx.dispose();}}};
}
