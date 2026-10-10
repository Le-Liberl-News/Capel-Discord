import {NativeEffectPlayer} from './native-effect-player.mjs';

const banks=new Map();
export function loadNativeEffects(assets){const key=assets.href;if(!banks.has(key))banks.set(key,loadBank(assets).catch(error=>{banks.delete(key);throw error;}));return banks.get(key);}
async function loadBank(assets) {
 const base=new URL('effects/native/',assets),revision=new URL(import.meta.url).searchParams.get('v')??'native-20261010',url=path=>{const u=new URL(path,base);u.searchParams.set('v',revision);return u.href;},entries=await fetch(url('catalogue.json'),{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Effets introuvables');return r.json();});
 for(const entry of entries)entry.animation=url(entry.animation);
 const images=new Map(),players=new Map();
 const image=path=>{if(!images.has(path))images.set(path,new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=url(path);}));return images.get(path);};
 await Promise.all(entries.map(async entry=>{const player=await new NativeEffectPlayer(entries,image).load(entry);players.set(entry.id.toLowerCase(),player);}));
 return players;
}

export function nativeEffectSprite(THREE,player,size=2) {
 const canvas=document.createElement('canvas');canvas.width=canvas.height=256;
 const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;
 const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
 sprite.scale.setScalar(size);sprite.renderOrder=5;
 return {sprite,draw(ms){const ctx=canvas.getContext('2d');ctx.clearRect(0,0,256,256);player.draw(ctx,ms,256,256,2,false);map.needsUpdate=true;},dispose(){map.dispose();sprite.material.dispose();}};
}
