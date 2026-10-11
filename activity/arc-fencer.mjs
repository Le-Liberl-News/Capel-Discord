// Original Third cr04150b X3 sword. Its native longitudinal axis is -Z.
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
    meshes.push({geometry,map});
  }
  return {create(event,spec){
    const group=new THREE.Group();
    for(const part of meshes)group.add(new THREE.Mesh(part.geometry,new THREE.MeshBasicMaterial({map:part.map,transparent:true,alphaTest:.03,depthWrite:false,side:THREE.DoubleSide})));
    const dx=event.aim.x-event.origin.x,dz=event.aim.z-event.origin.z,length=Math.hypot(dx,dz);
    group.rotation.y=Math.atan2(-dx,-dz);
    group.position.set(event.origin.x,event.origin.y+.95,event.origin.z);
    return {group,draw(time){
      // AS emits the sword at 1900 ms, extends it for 220 ms, then recovers.
      const age=time-950,extension=Math.max(0,Math.min(1,age/110));
      group.visible=age>=0&&age<750;
      group.scale.set(2.2,2.2,length/9.98*extension);
      for(const mesh of group.children)mesh.material.opacity=Math.min(1,Math.max(0,(750-age)/150));
    },dispose(){for(const mesh of group.children)mesh.material.dispose();}};
  },dispose(){for(const part of meshes){part.geometry.dispose();part.map.dispose();}}};
}
