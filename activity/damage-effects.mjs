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
   const effect=heal?null:bakedEffectSprite(THREE,banks.get(damageEffectIndex(amount)),impact?.point?.8:[4.5,4,3.6,3.2,2.8,2.6][damageEffectIndex(amount)]);
   const sprite=effect?.sprite??new THREE.Sprite(new THREE.SpriteMaterial({map,color:heal?0x70ff9a:0xffffff,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
   if(effect)map.dispose();
   sprite.renderOrder=5;scene.add(sprite);
   const extra=impact?.nativeEffect==='SC/cr160_00._ef'?bakedEffectSprite(THREE,zinBank,2.2):impact?.point?{sprite:new THREE.Sprite(new THREE.SpriteMaterial({map:glowMap,color:0xff2020,transparent:true,depthWrite:false,depthTest:false,blending:THREE.AdditiveBlending})),draw(ms){this.sprite.material.opacity=Math.max(0,1-ms/700);},dispose(){this.sprite.material.dispose();}}:null;if(extra){extra.sprite.renderOrder=8;scene.add(extra.sprite);}
   const number=document.createElement("div");number.className="sky-damage";
   number.style.cssText="position:absolute;pointer-events:none;display:flex;transform-origin:50% 100%;z-index:18;filter:drop-shadow(0 0 2px #ff1010)";
   for(const digit of String(Math.round(amount))){const cell=document.createElement('span');cell.style.cssText=`display:block;width:16px;height:32px;background-image:url('${new URL('damage-digits.png',url).href}');background-position:${-Number(digit)*16}px 0;background-repeat:no-repeat`;number.append(cell);}
   if(heal)number.style.filter='hue-rotate(115deg)';container.append(number);
   hits.push({id,sprite,effect,extra,number,impact,time:-delay,lane:hits.filter(h=>h.id===id).length%3});
  },
  update(dt,camera,avatars,width,height) {
   for(let i=hits.length-1;i>=0;i--) {
    const hit=hits[i],avatar=avatars.get(hit.id);hit.time+=dt;
    if(!avatar||hit.time>=1.5){scene.remove(hit.sprite);hit.sprite.material.map.dispose();hit.sprite.material.dispose();if(hit.extra){scene.remove(hit.extra.sprite);hit.extra.dispose();}hit.number.remove();hits.splice(i,1);continue;}
    if(hit.time<0){hit.sprite.visible=false;if(hit.extra)hit.extra.sprite.visible=false;hit.number.hidden=true;continue;}
    const p=avatar.position,h=avatar.info.height;
    hit.sprite.position.set(hit.impact?.point?.x??p.x,hit.impact?.point?.y??p.y+Math.min(h,1.8)*.55,hit.impact?.point?.z??p.z);
    // Place the flash just in front of the opaque character plane, keeping scenery occlusion.
    hit.sprite.position.add(new THREE.Vector3().subVectors(camera.position,hit.sprite.position).normalize().multiplyScalar(.18));if(hit.extra){hit.extra.sprite.position.copy(hit.sprite.position);if(hit.impact?.hitIndex!=null){const n=hit.impact.hitIndex;hit.extra.sprite.position.x+=camera.matrixWorld.elements[0]*[-.28,.25,-.12,.32][n%4];hit.extra.sprite.position.y+=[.18,-.1,.3,.04][n%4];}hit.extra.sprite.visible=hit.time<.8;hit.extra.draw(hit.time*1000);if(hit.impact?.point&&hit.impact?.nativeEffect!=='SC/cr160_00._ef'){const units=camera.isOrthographicCamera?(camera.top-camera.bottom)/camera.zoom:2*camera.position.distanceTo(hit.extra.sprite.position)*Math.tan(camera.fov*Math.PI/360)/camera.zoom;hit.extra.sprite.scale.setScalar(Math.max(.55,units*58/Math.max(1,height))*(1+Math.min(1,hit.time/.08)*.15));}}
    hit.sprite.visible=hit.time<(hit.effect ? .8 : .35);
    if(hit.effect){hit.effect.draw(hit.time*1000);hit.sprite.material.opacity=1;}else {hit.sprite.scale.setScalar(.65+hit.time*3);hit.sprite.material.opacity=Math.max(0,1-hit.time/.35);hit.sprite.material.map.offset.x=Math.min(3,Math.floor(hit.time*14))*.25;}
    const screen=new THREE.Vector3(p.x,p.y+h+.3,p.z).project(camera);
    hit.number.hidden=screen.z>1||screen.z< -1||Math.abs(screen.x)>1.1||Math.abs(screen.y)>1.1;
    hit.number.style.left=((screen.x+1)*width/2+hit.lane*16)+"px";
    hit.number.style.top=((1-screen.y)*height/2-40*hit.time)+"px";
    hit.number.style.opacity=String(Math.min(1,(1.5-hit.time)/.65));
    const scale=hit.time<.5?2-hit.time*2:1+(hit.time-.5)*.4;hit.number.style.transform=`translate(-50%,-100%) scale(${scale})`;
   }
  },
  dispose(){for(const hit of hits){scene.remove(hit.sprite);hit.sprite.material.map.dispose();hit.sprite.material.dispose();if(hit.extra){scene.remove(hit.extra.sprite);hit.extra.dispose();}hit.number.remove();}hits.length=0;texture.dispose();glowMap.dispose();zinBank.dispose();for(const bank of banks.values())bank.dispose();}
 };
}
