import spotlightTime from './spotlight-time.cjs';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

// Native SC models; the beam is a light volume, not part of the source mesh.
export function createDefenceProps({T,scene,asset,getState,getOwn,sounds,nativeEffectSprite,getImpact}){
 const templates=new Map(),mines=new Map(),blankets=new Map(),lamps=[],bursts=new Map(),seen=new Set();let disposed=false;
 const loader=new GLTFLoader();
 const ready=Promise.all(['t41spt03','t31orb00','t23bed01'].map(async name=>{
  const g=(await loader.loadAsync(asset('/assets/sky/sanktheim/props/'+name+'/model.gltf'))).scene;
  // The source spotlight contains four identical instances. Keep one complete rig.
  if(name==='t41spt03'){const root=g.getObjectByName('Frame_SCENE_ROOT');if(root)for(const child of root.children.slice(1))root.remove(child);}
  g.updateMatrixWorld(true);const box=new T.Box3().setFromObject(g),size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3());
  const scale=(name==='t41spt03'?1.7:name==='t31orb00'?.65:1.5)/(name==='t41spt03'?size.y:Math.max(size.x,size.z));
  const group=new T.Group();g.position.set(-center.x*scale,-box.min.y*scale,-center.z*scale);g.scale.multiplyScalar(scale);group.add(g);group.userData.noXRay=true;
  g.traverse(o=>{if(o.isMesh)for(const m of [].concat(o.material)){m.side=T.DoubleSide;m.roughness=1;}});templates.set(name,group);
  if(name==='t41spt03'&&!disposed)for(const z of [-4,4]){
   const lamp=group.clone(true);lamp.position.set(-22.5,8.34,z);lamp.rotation.y=-Math.PI/2;scene.add(lamp);
   const origin=new T.Vector3(-22.75,9.72,z),end=new T.Vector3(-38,.15,z*.35),dir=end.clone().sub(origin),length=dir.length(),volume=new T.Group();
   // Layered, open cones give a soft edge and a brighter core without white solids.
   for(const [radius,opacity]of [[4,.022],[3.3,.026],[2.5,.025]]){const cone=new T.Mesh(new T.ConeGeometry(radius,length,32,1,true),new T.MeshBasicMaterial({color:0xffe8b0,transparent:true,opacity,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending}));cone.position.copy(origin).addScaledVector(dir,.5);cone.quaternion.setFromUnitVectors(new T.Vector3(0,-1,0),dir.clone().normalize());volume.add(cone);}
   const target=new T.Object3D();target.position.copy(end);scene.add(target);const light=new T.SpotLight(0xffe7b5,0,48,Math.atan(6/length),.55,2);light.position.copy(origin);light.target=target;scene.add(light,volume);const lens=new T.Mesh(new T.CircleGeometry(.12,16),new T.MeshBasicMaterial({color:0xfff0c9,side:T.DoubleSide}));lens.position.copy(origin);lens.lookAt(end);scene.add(lens);lamps.push({lamp,volume,light,target,lens});
  }
 })).catch(console.error);
 function update({time,dayNight,avatars}){
  const state=getState();for(const l of lamps){const night=spotlightTime.strength(state,dayNight);l.volume.visible=night>.02;l.light.intensity=1100*night;l.lens.visible=night>.02;}
  for(const m of state.mines??[]){let v=mines.get(m.id);if(!v&&templates.has('t31orb00')){v=templates.get('t31orb00').clone(true);scene.add(v);mines.set(m.id,v);}if(v){v.position.set(m.x,m.y+.015,m.z);v.visible=!m.spent;}}
  const ids=new Set((state.mines??[]).map(m=>m.id));for(const [id,v]of mines)if(!ids.has(id)){scene.remove(v);mines.delete(id);}
  for(const a of state.soldiers){const sleeping=a.sleeping&&a.hp>0&&!a.transit&&!state.wave;let v=blankets.get(a.id);if(sleeping&&!v&&templates.has('t23bed01')){v=templates.get('t23bed01').clone(true);scene.add(v);blankets.set(a.id,v);dayNight.apply?.(v);}if(v){v.visible=!!sleeping;v.position.set(a.x,a.y+.07,a.z+.22);}}
  for(const a of [...state.enemies,...state.players])if(a.mineLaunch){const v=avatars.get(a.id);if(v){const f=a.mineLaunch,k=Math.min(1,(state.at-f.at)/1600);v.mesh.rotation.z+=k*Math.PI*6;}}
  for(const e of state.events)if(e.type==='mine-explosion'&&!seen.has(e.id)){seen.add(e.id);if(state.at-e.at>1000)continue;const impact=getImpact();if(impact){const fx=nativeEffectSprite(T,impact,3,2);fx.sprite.position.set(e.position.x,e.position.y+.05,e.position.z);scene.add(fx.sprite);bursts.set(e.id,{fx,at:time});}const own=getOwn?.(),gain=own?Math.max(0,1-Math.hypot(own.x-e.position.x,own.z-e.position.z)/30):.5;sounds.play('don-explosion',{gain:1,position:e.position});}
  for(const [id,b]of bursts){b.fx.draw(time-b.at);if(time-b.at>1600){scene.remove(b.fx.sprite);b.fx.dispose();bursts.delete(id);}}
 }
 return {ready,update,dispose(){disposed=true;for(const v of [...mines.values(),...blankets.values()])scene.remove(v);for(const l of lamps){scene.remove(l.lamp,l.volume,l.light,l.target,l.lens);l.lens.geometry.dispose();l.lens.material.dispose();l.volume.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});}for(const b of bursts.values()){scene.remove(b.fx.sprite);b.fx.dispose();}for(const g of templates.values())g.traverse(o=>{o.geometry?.dispose();for(const m of o.material?[].concat(o.material):[]){m.map?.dispose();m.dispose();}});}};
}
