import {createSwordAnimation} from './arc-fencer-animation.mjs';
// Original Third cr04150b X3 sword, including its articulated whip motion.
export async function prepareArcFencer(THREE,assets){
  const base=new URL('combat/arc-fencer/',assets);
  const response=await fetch(new URL('model.json',base));
  if(!response.ok)throw Error('Modèle Arc Fencer introuvable');
  const model=await response.json(),loader=new THREE.TextureLoader(),meshes=[];
  for(const part of model.meshes){
    const map=await loader.loadAsync(new URL(part.texture,base).href);map.colorSpace=THREE.SRGBColorSpace;
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(part.positions.flat(),3));
    geometry.setAttribute('uv',new THREE.Float32BufferAttribute(part.uv.flat(),2));
    geometry.setIndex(part.indices);geometry.computeVertexNormals();
    meshes.push({geometry,map,skin:part.skin});
  }
  return {create(event,spec){
    const group=new THREE.Group();
    const parts=meshes.map(part=>({...part,geometry:part.geometry.clone()})),animation=createSwordAnimation(THREE,model);
    for(const part of parts)group.add(new THREE.Mesh(part.geometry,new THREE.MeshBasicMaterial({map:part.map,transparent:true,alphaTest:.03,depthWrite:false,side:THREE.DoubleSide})));
    const dx=event.aim.x-event.origin.x,dz=event.aim.z-event.origin.z,length=Math.hypot(dx,dz);
    group.rotation.y=Math.atan2(dx,dz);
    group.position.set(event.origin.x,event.origin.y,event.origin.z);
    return {group,draw(time,position=event.origin){
      group.position.set(position.x,position.y,position.z);
      // AS emits the sword at 1900 ms, extends it for 220 ms, then recovers.
      const age=time-950;
      group.visible=age>=0&&age<750;
      group.scale.set(.9,.9,length/9.98);
      if(group.visible)animation.draw(age*.06,parts);
      for(const mesh of group.children)mesh.material.opacity=Math.min(1,Math.max(0,(750-age)/150));
    },dispose(){for(const mesh of group.children){mesh.material.dispose();mesh.geometry.dispose();}}};
  },dispose(){for(const part of meshes){part.geometry.dispose();part.map.dispose();}}};
}
