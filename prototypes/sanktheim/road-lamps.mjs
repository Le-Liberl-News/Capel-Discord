import {loadNativeProp} from './native-prop.mjs';
import expansion from './expansion.cjs';
import spotlightTime from './spotlight-time.cjs';

export function createRoadLamps({T,scene,asset,scale,getState}){
 const lamps=[],lights=Array.from({length:6},()=>{const light=new T.PointLight(0xffdca0,0,15*scale,1.6);scene.add(light);return light;});let disposed=false,placed=false;
 const ready=loadNativeProp(T,asset,'royal-road-lamp',4.8*scale).then(template=>{
  if(disposed)return;
  for(let i=0,x=-62;x>=-350;i++,x-=18){
   const root=template.clone(true),z=expansion.roadZ(x)+1+(i%2?-8.5:8.5);
   root.position.set(x*scale,.04*scale,z*scale);scene.add(root);
   const bulb=new T.Mesh(new T.SphereGeometry(.105*scale,8,6),new T.MeshBasicMaterial({color:0xffe5b0}));bulb.material.userData.skyEmissive=true;bulb.raycast=()=>{};bulb.position.set(0,4.12*scale,0);root.add(bulb);lamps.push({root,bulb,x,z});
  }
 });
 function update({camera,collision,sun,dayNight}){
  if(!placed&&lamps.length){for(const l of lamps){l.root.position.y=collision?.floor(l.x*scale,l.z*scale,2*scale)??.04*scale;sun?.apply(l.root);dayNight?.apply(l.root);}placed=true;}
  const night=spotlightTime.strength(getState(),dayNight?.state?.());for(const l of lamps)l.bulb.visible=night>.02;
  const nearest=[...lamps].sort((a,b)=>camera.position.distanceToSquared(a.root.position)-camera.position.distanceToSquared(b.root.position));
  for(let i=0;i<lights.length;i++){const l=nearest[i],light=lights[i];light.intensity=l?42.5*night:0;if(l)light.position.copy(l.root.position).y+=3.95*scale;}
 }
 return {ready,update,dispose(){disposed=true;for(const l of lamps){l.root.removeFromParent();l.bulb.geometry.dispose();l.bulb.material.dispose();}for(const l of lights)l.removeFromParent();}};
}
