import diveMechanics from './sieg-dive.cjs';
export async function createSiegDiveView(THREE,scene,assets){
 const map=await new THREE.TextureLoader().loadAsync(new URL('effects/native/effects/SC/tx0029.png',assets).href);map.repeat.set(.25,.25);map.offset.set(0,.75);map.colorSpace=THREE.SRGBColorSpace;
 const trails=new Map();
 return {draw(avatars,time){
  for(const [id,a]of avatars){const dive=a.siegDive;if(!dive||a.dead)continue;let trail=trails.get(id);if(!trail){trail=new THREE.Group();for(let n=0;n<10;n++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,color:0xaaddff}));trail.add(s);}scene.add(trail);trails.set(id,trail);}
   trail.visible=true;trail.children.forEach((s,n)=>{const age=time-dive.started-n*25,sample=diveMechanics.divePosition(dive,time-n*25);s.visible=age>=0&&age<dive.duration;s.position.set(sample.x,sample.y+.25,sample.z);s.scale.setScalar(.9-n*.06);s.material.opacity=(1-n/10)*.7;s.material.rotation=Math.sin(time*.02+n)*.2;});
  }
  for(const [id,t]of trails)if(!avatars.get(id)?.siegDive||avatars.get(id)?.dead){scene.remove(t);for(const s of t.children)s.material.dispose();trails.delete(id);}
 },dispose(){for(const t of trails.values()){scene.remove(t);for(const s of t.children)s.material.dispose();}trails.clear();map.dispose();}};
}
