let damageLabelId=0;
export function damageLabel(amount){const text=String(Math.round(amount)),width=text.length*40+36,id='damage-glow-'+(++damageLabelId);return {width,markup:`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${width} 100" style="overflow:visible"><defs><filter id="${id}" x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="3"/></filter></defs><text x="${width/2}" y="73" text-anchor="middle" font-family="Arial, sans-serif" font-size="64" font-weight="900" font-style="italic" fill="#ff2222" stroke="#ff2222" stroke-width="5" filter="url(#${id})">${text}</text><text x="${width/2}" y="73" text-anchor="middle" font-family="Arial, sans-serif" font-size="64" font-weight="900" font-style="italic" fill="white" stroke="#e92929" stroke-width="2" paint-order="stroke fill">${text}</text></svg>`};}
import {loadBakedEffect,bakedEffectSprite} from './baked-effects.mjs';
export function damageAmount(previous, player) {
 if(!previous || previous.npc || player.npc || !Number.isFinite(previous.hp) || !Number.isFinite(player.hp))return 0;
 return Math.max(0,previous.hp-Math.max(0,player.hp));
}
export function damageEffectIndex(amount){return amount>=50?0:amount>=35?1:amount>=20?2:amount>=10?3:5;}
export function newDamageEvents(previous,player){
 if(!previous)return [];
 return (player.damageEvents??[]).filter(e=>e.sequence>(previous.damageSequence??0));
}
export async function createDamageEffects(THREE,scene,container,url,loading) {
 const banks=new Map(await Promise.all([0,1,2,3,5].map(async index=>[index,await loadBakedEffect(THREE,new URL('../',url),`damage${index}`,24)])));
 const catBank=await loadBakedEffect(THREE,new URL('../',url),'third-msc0601',90);catBank.duration=3000;catBank.blend='normal';
 const estelleBank=await loadBakedEffect(THREE,new URL('../',url),'third-cr151_01',90);estelleBank.duration=1800;
 const bulletBank=await loadBakedEffect(THREE,new URL('../',url),'sc-ms10920-hit',30);Object.assign(bulletBank,{frames:30,duration:1000,blend:'normal',opaque:true});
 const zinBank=await loadBakedEffect(THREE,new URL('../',url),'sc-cr160_00',90);
 zinBank.duration=650;
 const glowMap=await new THREE.TextureLoader(loading).loadAsync(new URL('native-hit-glow.png?v=2',url).href);glowMap.colorSpace=THREE.SRGBColorSpace;
 const texture=await new THREE.TextureLoader(loading).loadAsync(url.href);
 texture.colorSpace=THREE.SRGBColorSpace;texture.magFilter=THREE.LinearFilter;
 const hits=[];
 return {
  heal(id,amount){this.hit(id,amount,true);},
  hit(id,amount,heal=false,delay=0,impact=null) {
   if(!amount)return;
   const map=texture.clone();map.repeat.set(.25,1);
   const bulletHit=impact?.nativeEffect==='SC/ms10920._ef';
   const nativeFist=impact?.nativeEffect==='SC/cr160_00._ef';
   // quiet: combat-feedback.mjs already plays this hit's own impact; only the number is shown here
   const quiet=!!impact?.quiet;
   const effect=heal||quiet?null:bulletHit?bakedEffectSprite(THREE,bulletBank,.8):impact?.nativeEffect==='Third/cr151_01._ef'?bakedEffectSprite(THREE,estelleBank,4):impact?.catBite?bakedEffectSprite(THREE,catBank,1.4):nativeFist?bakedEffectSprite(THREE,zinBank,3):bakedEffectSprite(THREE,banks.get(damageEffectIndex(amount)),impact?.point?.8:[4.5,4,3.6,3.2,2.8,2.6][damageEffectIndex(amount)]);
   const sprite=effect?.sprite??new THREE.Sprite(new THREE.SpriteMaterial({map,color:heal?0x70ff9a:0xffffff,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
   if(effect)map.dispose();
   sprite.renderOrder=5;scene.add(sprite);
   const extra=impact?.point&&!impact?.catBite&&!quiet&&!bulletHit?{sprite:new THREE.Sprite(new THREE.SpriteMaterial({map:glowMap,color:0xff2020,transparent:true,depthWrite:false,depthTest:false,blending:THREE.AdditiveBlending})),draw(ms){this.sprite.material.opacity=Math.max(0,1-ms/700);},dispose(){this.sprite.material.dispose();}}:null;if(extra){extra.sprite.renderOrder=8;scene.add(extra.sprite);}
   const number=document.createElement("div");number.className="sky-damage";
   number.style.cssText="position:absolute;pointer-events:none;display:flex;transform-origin:50% 100%;z-index:18";
   const label=damageLabel(amount);number.innerHTML=label.markup;
   if(heal)number.style.filter='hue-rotate(115deg)';container.append(number);
   const occupied=new Set(hits.filter(h=>h.id===id).map(h=>h.lane));let lane=0;while(occupied.has(lane))lane++;
   hits.push({id,sprite,effect,extra,number,impact,bulletHit,labelWidth:label.width,time:-delay,lane});
  },
  update(dt,camera,avatars,width,height) {
   for(let i=hits.length-1;i>=0;i--) {
    const hit=hits[i],avatar=avatars.get(hit.id);hit.time+=dt;
    if(!avatar||hit.time>=1.5){scene.remove(hit.sprite);hit.sprite.material.map.dispose();hit.sprite.material.dispose();if(hit.extra){scene.remove(hit.extra.sprite);hit.extra.dispose();}hit.number.remove();hits.splice(i,1);continue;}
    if(hit.time<0){hit.sprite.visible=false;if(hit.extra)hit.extra.sprite.visible=false;hit.number.hidden=true;continue;}
    const p=avatar.position,h=avatar.info.bodyHeight??avatar.info.height;
    hit.sprite.position.set(hit.impact?.point?.x??p.x,hit.impact?.point?.y??p.y+Math.min(h,1.8)*(hit.impact?.catBite?.75:.55),hit.impact?.point?.z??p.z);
    // Place the flash just in front of the opaque character plane, keeping scenery occlusion.
    if(hit.impact?.nativeEffect==='SC/cr160_00._ef'&&hit.impact?.hitIndex!=null){const n=hit.impact.hitIndex;hit.sprite.position.x+=camera.matrixWorld.elements[0]*[-.28,.25,-.12,.32][n%4];hit.sprite.position.y+=[.18,-.1,.3,.04][n%4];}
    hit.sprite.position.add(new THREE.Vector3().subVectors(camera.position,hit.sprite.position).normalize().multiplyScalar(hit.impact?.catBite?.4:.18));if(hit.extra){hit.extra.sprite.position.copy(hit.sprite.position);if(hit.impact?.hitIndex!=null){const n=hit.impact.hitIndex;hit.extra.sprite.position.x+=camera.matrixWorld.elements[0]*[-.28,.25,-.12,.32][n%4];hit.extra.sprite.position.y+=[.18,-.1,.3,.04][n%4];}hit.extra.sprite.visible=hit.time<.8;hit.extra.draw(hit.time*1000);if(hit.impact?.point&&hit.impact?.nativeEffect!=='SC/cr160_00._ef'){const units=camera.isOrthographicCamera?(camera.top-camera.bottom)/camera.zoom:2*camera.position.distanceTo(hit.extra.sprite.position)*Math.tan(camera.fov*Math.PI/360)/camera.zoom;hit.extra.sprite.scale.setScalar(Math.max(.55,units*58/Math.max(1,height))*(1+Math.min(1,hit.time/.08)*.15));}}
    hit.sprite.visible=!hit.impact?.quiet&&hit.time<(hit.bulletHit?1:hit.effect ? .8 : .35);
    if(hit.effect){hit.effect.draw(hit.time*1000);hit.sprite.material.opacity=1;}else {hit.sprite.scale.setScalar(.65+hit.time*3);hit.sprite.material.opacity=Math.max(0,1-hit.time/.35);hit.sprite.material.map.offset.x=Math.min(3,Math.floor(hit.time*14))*.25;}
    const screen=new THREE.Vector3(p.x,p.y+h+.3,p.z).project(camera);
    hit.number.hidden=screen.z>1||screen.z< -1||Math.abs(screen.x)>1.1||Math.abs(screen.y)>1.1;
    hit.number.style.left=((screen.x+1)*width/2)+"px";
    hit.number.style.top=((1-screen.y)*height/2-40*hit.time-hit.lane*64)+"px";
    hit.number.style.opacity=String(Math.min(1,(1.5-hit.time)/.65));
    const scale=hit.time<.5?1-hit.time:.5+(hit.time-.5)*.133333;hit.number.style.width=(hit.labelWidth*scale)+'px';hit.number.style.height=(100*scale)+'px';hit.number.style.transform='translate(-50%,-100%)';
   }
  },
  dispose(){for(const hit of hits){scene.remove(hit.sprite);hit.sprite.material.map.dispose();hit.sprite.material.dispose();if(hit.extra){scene.remove(hit.extra.sprite);hit.extra.dispose();}hit.number.remove();}hits.length=0;texture.dispose();glowMap.dispose();bulletBank.dispose();zinBank.dispose();catBank.dispose();estelleBank.dispose();for(const bank of banks.values())bank.dispose();}
 };
}
