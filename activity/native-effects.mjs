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

// Native mgaria0: rising particles and a tapered, textured cylinder around the caster.
export function nativeCastingHalo(THREE,player) {
 const group=new THREE.Group(),parts=[];
 for(const item of player.instances){
  if(!item.part.enabled||item.part.renderFlags&1||!item.texture||!item.part.primitive&&item.scale.every(k=>k.value.every(v=>v===0)))continue;
  const image=player.textureImages.get(item.texture.additiveTexture??item.texture.texture),[u,v,u2,v2]=item.part.uv;
  if(!image)continue;
  const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(Math.abs(u2-u)*image.width));canvas.height=Math.max(1,Math.round(Math.abs(v2-v)*image.height));
  canvas.getContext('2d').drawImage(image,Math.min(u,u2)*image.width,Math.min(v,v2)*image.height,canvas.width,canvas.height,0,0,canvas.width,canvas.height);
  const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;
  let object;
  if(item.part.primitive===1){
   const [a,b]=item.part.vertices,geometry=new THREE.CylinderGeometry(Math.abs(a[0]),Math.abs(b[0]),Math.abs(a[1]-b[1]),32,1,true);
   object=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({map,transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));
  }else object=new THREE.Sprite(new THREE.SpriteMaterial({map,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
  group.add(object);parts.push({item,object,map});
 }
 return {group,draw(ms){for(const {item,object}of parts){const state=player.state(item,ms);object.visible=!!state;if(!state)continue;object.position.set(...state.position);object.scale.set(...state.scale);object.material.color.setRGB(...state.color.slice(0,3).map(v=>v/255));if(object.isMesh)object.rotation.set(...state.rotation.map(v=>v*Math.PI/180));else object.material.rotation=state.rotation[2]*Math.PI/180;}},dispose(){for(const {object,map}of parts){object.geometry?.dispose();object.material.dispose();map.dispose();}}};
}
