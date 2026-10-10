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

export function nativeEffectSprite(THREE,player,size=2,zoom=2) {
 const canvas=document.createElement('canvas');canvas.width=canvas.height=256;
 const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;
 const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
 sprite.scale.setScalar(size);sprite.renderOrder=5;
 return {sprite,draw(ms){const ctx=canvas.getContext('2d');ctx.clearRect(0,0,256,256);player.draw(ctx,ms,256,256,zoom,false);map.needsUpdate=true;},dispose(){map.dispose();sprite.material.dispose();}};
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

// Keep orbiting heals and Earth Guard in world space rather than flattening their depth.
const pRing=p=>p.primitive===8||p.primitive===9;
export function nativeWorldEffect(THREE,player){
 const group=new THREE.Group(),parts=[],maps=new Map();
 for(const item of player.instances){
  const p=item.part;if(player.entry.id.toLowerCase()==='sc/mg075_0._ef'&&p.primitive!==0)continue;if(!p.enabled||(p.renderFlags&1)||!item.texture||item.scale.every(k=>k.value.every(v=>v===0)))continue;
  const additive=!!(p.renderFlags&4),geometryPart=p.primitive===1||p.primitive===9||p.primitive===8,key=item.texture.texture+':'+p.uv.join(':')+':'+additive+':'+geometryPart;
  let map=maps.get(key);
  if(!map){
   const image=player.textureImages.get(additive?item.texture.additiveTexture??item.texture.texture:item.texture.texture);if(!image)continue;
   const[u,v,u2,v2]=p.uv,canvas=document.createElement('canvas');canvas.width=geometryPart?image.width:Math.max(1,Math.round(Math.abs(u2-u)*image.width));canvas.height=geometryPart?image.height:Math.max(1,Math.round(Math.abs(v2-v)*image.height));const ctx=canvas.getContext('2d');
   if(geometryPart)ctx.drawImage(image,0,0);else ctx.drawImage(image,Math.min(u,u2)*image.width,Math.min(v,v2)*image.height,canvas.width,canvas.height,0,0,canvas.width,canvas.height);
   if(additive){const pixels=ctx.getImageData(0,0,canvas.width,canvas.height);for(let i=0;i<pixels.data.length;i+=4)pixels.data[i+3]=Math.round(pixels.data[i+3]*Math.max(pixels.data[i],pixels.data[i+1],pixels.data[i+2])/255);ctx.putImageData(pixels,0,0);}
   map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;if(geometryPart){map.repeat.set(u2-u,v2-v);map.offset.set(u,1-v2);}maps.set(key,map);
  }
  const[a,b]=p.vertices,width=Math.abs(b[0]-a[0])||1,height=Math.abs(b[1]-a[1])||1;
  let object;
  const material={map,transparent:true,depthWrite:false,blending:additive?THREE.AdditiveBlending:THREE.NormalBlending};
  if(p.primitive===1)object=new THREE.Mesh(new THREE.CylinderGeometry(Math.abs(a[0]),Math.abs(b[0]),height,24,1,true),new THREE.MeshBasicMaterial({...material,side:THREE.DoubleSide}));
  else if(p.primitive===9||p.primitive===8){object=new THREE.Mesh(new THREE.RingGeometry(Math.abs(a[0]),Math.abs(b[0]),32),new THREE.MeshBasicMaterial({...material,side:THREE.DoubleSide}));const uv=object.geometry.attributes.uv;for(let i=0;i<uv.count;i++){const row=Math.floor(i/33),col=i%33;uv.setXY(i,col/32,row);}object.rotation.x=-Math.PI/2;}
  else object=new THREE.Sprite(new THREE.SpriteMaterial(material));
  object.renderOrder=4;group.add(object);parts.push({item,object,width,height,center:[(a[0]+b[0])/2,(a[1]+b[1])/2]});
 }
 return{group,draw(ms){for(const{item,object,width,height,center}of parts){const state=player.state(item,ms);object.visible=!!state;if(!state)continue;
  object.position.set(state.position[0]+(object.isSprite?center[0]*state.scale[0]:0),state.position[1]+(pRing(item.part)?item.part.vertices[0][1]*state.scale[2]:0)+(object.isSprite?center[1]*state.scale[1]:item.part.primitive===1?height*state.scale[1]/2:0),state.position[2]);
  object.scale.set(object.isSprite?width*state.scale[0]:state.scale[0],object.isSprite?height*state.scale[1]:pRing(item.part)?state.scale[2]:state.scale[1],object.isSprite?1:pRing(item.part)?1:state.scale[2]);
  const heal=player.entry.id.toLowerCase()==='sc/mg110_0._ef';object.material.color.setRGB(...(heal?[.25,.7,1]:state.color.slice(0,3).map(v=>v/255)));object.material.opacity=item.part.renderFlags&4?1:state.color[3]/255;if(object.isSprite)object.material.rotation=state.rotation[2]*Math.PI/180;
 }},dispose(){for(const{object}of parts){object.geometry?.dispose();object.material.dispose();}for(const map of maps.values())map.dispose();}};
}
