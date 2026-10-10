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
   const number=document.createElement("div");number.className="sky-damage";number.textContent=(heal?"+":"\u2212")+amount;
   number.style.cssText="position:absolute;pointer-events:none;transform:translate(-50%,-100%);color:#ffdc91;font:bold 25px AveriaSky,sans-serif;text-shadow:2px 2px 0 #51150f,-1px -1px 0 #51150f,0 0 5px #000;z-index:18";if(heal)number.style.color="#7cffad";container.append(number);
   hits.push({id,sprite,effect,number,impact,time:-delay,lane:hits.filter(h=>h.id===id).length%3});
  },
  update(dt,camera,avatars,width,height) {
   for(let i=hits.length-1;i>=0;i--) {
    const hit=hits[i],avatar=avatars.get(hit.id);hit.time+=dt;
    if(!avatar||hit.time>=1.1){scene.remove(hit.sprite);hit.sprite.material.map.dispose();hit.sprite.material.dispose();hit.number.remove();hits.splice(i,1);continue;}
    if(hit.time<0){hit.sprite.visible=false;hit.number.hidden=true;continue;}
    const p=avatar.position,h=avatar.info.height;
    hit.sprite.position.set(hit.impact?.point?.x??p.x,hit.impact?.point?.y??p.y+Math.min(h,1.8)*.55,hit.impact?.point?.z??p.z);
    // Place the flash just in front of the opaque character plane, keeping scenery occlusion.
    hit.sprite.position.add(new THREE.Vector3().subVectors(camera.position,hit.sprite.position).normalize().multiplyScalar(.18));hit.sprite.visible=hit.time<(hit.effect ? .8 : .35);
    if(hit.effect){hit.effect.draw(hit.time*1000);hit.sprite.material.opacity=1;}else {hit.sprite.scale.setScalar(.65+hit.time*3);hit.sprite.material.opacity=Math.max(0,1-hit.time/.35);hit.sprite.material.map.offset.x=Math.min(3,Math.floor(hit.time*14))*.25;}
    const screen=new THREE.Vector3(p.x,p.y+h+.3,p.z).project(camera);
    hit.number.hidden=screen.z>1||screen.z< -1||Math.abs(screen.x)>1.1||Math.abs(screen.y)>1.1;
    hit.number.style.left=((screen.x+1)*width/2+hit.lane*16)+"px";
    hit.number.style.top=((1-screen.y)*height/2-35*hit.time)+"px";
    hit.number.style.opacity=String(Math.min(1,(1.1-hit.time)/.35));
   }
  },
  dispose(){for(const hit of hits){scene.remove(hit.sprite);hit.sprite.material.map.dispose();hit.sprite.material.dispose();hit.number.remove();}hits.length=0;texture.dispose();for(const bank of banks.values())bank.dispose();}
 };
}
