import motion from './special-crafts.cjs';
import {bakedEffectSprite} from './baked-effects.mjs';
export async function createSpecialCraftView(THREE,scene,assets,banks,fireTexture){
 const loader=new THREE.TextureLoader(),[scythe,salt,model]=await Promise.all([loader.loadAsync(new URL('effects/renne-scythe.png',assets).href),loader.loadAsync(new URL('combat/campanella-spire/salt.png',assets).href),fetch(new URL('combat/campanella-spire/model.json',assets)).then(r=>{if(!r.ok)throw Error('Pilier introuvable');return r.json();})]);
 for(const map of [scythe,salt])map.colorSpace=THREE.SRGBColorSpace;
 const geometries=model.meshes.map(m=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(m.positions.flat(),3));g.setAttribute('uv',new THREE.Float32BufferAttribute(m.uv.flat(),2));g.setIndex(m.indices);g.computeVertexNormals();return g;});
 const views=new Map();
 function create(a,s){const group=new THREE.Group();scene.add(group);let projectile=null,assembly=null;
  if(s.special==='spire'){projectile=new THREE.Group();for(const g of geometries)projectile.add(new THREE.Mesh(g,new THREE.MeshBasicMaterial({map:salt,side:THREE.DoubleSide})));group.add(projectile);}
  if(s.special==='boomerang'){projectile=new THREE.Sprite(new THREE.SpriteMaterial({map:scythe,transparent:true,depthWrite:false}));projectile.scale.set(1.8,1.2,1);group.add(projectile);}
  if(s.special==='fireball'){const map=fireTexture.clone();map.repeat.set(.25,1);projectile=new THREE.Sprite(new THREE.SpriteMaterial({map,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));projectile.scale.setScalar(.8);group.add(projectile);}
  if(s.special==='crescent'){const bank=banks.get('third/cr222_01._ef');if(bank){assembly=bakedEffectSprite(THREE,bank,2.4);assembly.sprite.material.color.set(0xff8d42);projectile=assembly.sprite;group.add(projectile);}}
  const bomb=banks.get('third/btbomb00._ef'),explosion=bomb?bakedEffectSprite(THREE,bomb,3):null;if(explosion)group.add(explosion.sprite);
  const v={group,projectile,assembly,explosion};views.set(a.id,v);return v;
 }
 return {draw(a,s,time,avatars){
  const v=views.get(a.id)??create(a,s),owner=avatars?.get(a.actor)?.position??a.origin,impact=a.impactAt-a.started;
  if(v.projectile){v.projectile.visible=!a.cancelled;
   if(s.special==='spire'){const planted=time>=impact,expired=time>=a.objectExpiresAt-a.started;v.projectile.visible=!a.explodedAt&&!expired&&!a.cancelled;v.projectile.position.set(a.aim.x,a.aim.y+(planted?0:7*(1-Math.min(1,time/(impact||1)))),a.aim.z);}
   else {const end=a.flightEndsAt?a.flightEndsAt-a.started:s.windup+(s.special==='boomerang'?2200:Math.hypot(a.aim.x-a.origin.x,a.aim.z-a.origin.z)/(s.projectileSpeed??10)*1000),p=motion.projectilePosition({...a,started:0},s,time,owner);v.projectile.visible=time>=s.windup&&time<end&&!a.explodedAt&&!a.resolved&&!a.cancelled;v.projectile.position.set(p.x,p.y,p.z);
    if(s.special==='boomerang')v.projectile.material.rotation=time*.022;
    if(s.special==='fireball')v.projectile.material.map.offset.x=(Math.floor(time/60)%4)/4;
    if(v.assembly){v.assembly.draw(250+(time-s.windup)%700);v.projectile.material.rotation=0;}
   }
  }
  if(v.explosion){const release=a.explodedAt??(s.special==='dive'&&a.resolved?a.impactAt:null),age=release==null?-1:time-(release-a.started);v.explosion.sprite.visible=age>=0&&age<700;const p=a.explosionPoint??a.aim;v.explosion.sprite.position.set(p.x,p.y+.6,p.z);if(v.explosion.sprite.visible)v.explosion.draw(age);}
 },remove(id){const v=views.get(id);if(!v)return;scene.remove(v.group);v.assembly?.dispose();v.explosion?.dispose();if(v.projectile?.isSprite&&!v.assembly){if(v.projectile.material.map!==scythe)v.projectile.material.map.dispose();v.projectile.material.dispose();}if(v.projectile?.isGroup)for(const mesh of v.projectile.children)mesh.material.dispose();views.delete(id);},dispose(){for(const id of [...views.keys()])this.remove(id);for(const g of geometries)g.dispose();scythe.dispose();salt.dispose();}};
}
