// Rear feet in a pre-rendered perspective sprite sit higher in its image. Their
// contact shadow must land along the viewing ray, not directly below the billboard.
export function projectFootContact(camera,foot,floor){
 const dy=foot.y-camera.y;if(dy>=-.02||!Number.isFinite(floor))return null;
 const t=(floor-camera.y)/dy;if(t<=0||t>3)return null;
 return {x:camera.x+(foot.x-camera.x)*t,y:floor+.018,z:camera.z+(foot.z-camera.z)*t};
}
export function createFootContactView(THREE,scene,texture,collision){
 const views=new Map(),geometry=new THREE.PlaneGeometry(.28,.19),material=new THREE.MeshBasicMaterial({map:texture,transparent:true,opacity:.42,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),point=new THREE.Vector3();
 const remove=id=>{const meshes=views.get(id);if(meshes){for(const mesh of meshes)scene.remove(mesh);views.delete(id);}};
 return {update(avatars,camera){
  for(const id of views.keys())if(!avatars.has(id))remove(id);
  for(const [id,avatar]of avatars){
   const {info,frame}=avatar.renderFrame??{},feet=info?.footContacts?.[frame];
   if(!feet||avatar.dead||!avatar.mesh.visible){remove(id);continue;}
   const floor=collision.floor(avatar.position.x,avatar.position.z,avatar.position.y+.2);
   if(!Number.isFinite(floor)||Math.abs(avatar.position.y-floor)>.15){remove(id);continue;}
   let meshes=views.get(id);if(!meshes){meshes=feet.map(()=>{const mesh=new THREE.Mesh(geometry,material);mesh.rotation.x=-Math.PI/2;mesh.renderOrder=3;mesh.userData.noXRay=true;scene.add(mesh);return mesh;});views.set(id,meshes);}
   avatar.mesh.updateMatrixWorld(true);
   feet.forEach(([x,y],i)=>{point.set((info.centerX??0)+(x-info.frameWidth/2)*info.pixelScale,(info.centerY??info.height/2)+(info.frameHeight/2-y)*info.pixelScale,0);avatar.mesh.localToWorld(point);const p=projectFootContact(camera.position,point,floor),mesh=meshes[i];mesh.visible=!!p;if(p)mesh.position.set(p.x,p.y,p.z);});
  }
 },dispose(){for(const id of [...views.keys()])remove(id);geometry.dispose();material.dispose();}};
}
