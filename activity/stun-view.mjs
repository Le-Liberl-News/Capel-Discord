import {loadBakedEffect,bakedEffectSprite} from './baked-effects.mjs';
export async function createStunView(THREE,scene,assets){
 const bank=await loadBakedEffect(THREE,assets,'sc-paralyze',90);bank.duration=3000;const views=new Map();
 function update(avatars,time){const keep=new Set();for(const [id,a]of avatars){if(a.dead||a.npc||!(a.stunUntil>time))continue;keep.add(id);let fx=views.get(id);if(!fx){fx=bakedEffectSprite(THREE,bank,1);scene.add(fx.sprite);views.set(id,fx);}fx.sprite.position.set(a.position.x,a.position.y+(a.info?.bodyHeight??1.7)+.2,a.position.z);fx.draw(time%3000);}
  for(const [id,fx]of views)if(!keep.has(id)){scene.remove(fx.sprite);fx.dispose();views.delete(id);}
 }
 return {update,dispose(){for(const fx of views.values()){scene.remove(fx.sprite);fx.dispose();}views.clear();bank.dispose();},get size(){return views.size;}};
}
