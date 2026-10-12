import contest from './drinking-contest.cjs';
import {loadBakedEffect,bakedEffectSprite} from './baked-effects.mjs';
export async function createDrinkingTable(THREE,scene,assets){
 const bank=await loadBakedEffect(THREE,assets,'sc-paralyze',90);bank.duration=3000;const effect=bakedEffectSprite(THREE,bank,1.2);scene.add(effect.sprite);
 const dialog=document.createElement('dialog');dialog.id='sky-drinking-contest';dialog.style.cssText='background:#292137;color:#ffe7b0;border:1px solid #d5bc84;border-radius:8px;padding:24px;font-family:AveriaSky,sans-serif;max-width:360px';
 const heading=document.createElement('h2');heading.textContent='Concours de boisson';const text=document.createElement('p');text.textContent='Les règles du concours restent à définir.';const close=document.createElement('button');close.textContent='Fermer';close.onclick=()=>dialog.close();dialog.append(heading,text,close);document.body.append(dialog);
 return {nearby:contest.nearby,open(){if(!dialog.open)dialog.showModal();},update(time,avatars){const olivier=avatars.get('npc:drinking-olivier');effect.sprite.visible=!!olivier;if(olivier){effect.sprite.position.set(olivier.position.x,olivier.position.y+1.4,olivier.position.z);effect.draw(time%3000);}},dispose(){dialog.remove();scene.remove(effect.sprite);effect.dispose();bank.dispose();}};
}
