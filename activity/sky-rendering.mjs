// Orthographic framing keeps the same scale when the eye moves back.
export const cameraDistance = map => map === "rolent" ? 120 : 17;
export function configureSkyMaterial(material) {
  if (material.transparent) {
    material.depthWrite = false;
    material.polygonOffset = true;
    material.polygonOffsetFactor = -1;
    material.polygonOffsetUnits = -1;
  }
}
export function createMapShadows(THREE,renderer,scene,model,map) {
  if (map !== "rolent") return null;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  const light = new THREE.DirectionalLight(0xffffff,1);
  light.position.set(-100,100,10);
  light.target.position.set(-48,0,45);
  light.castShadow=true;
  light.shadow.mapSize.set(2048,2048);
  Object.assign(light.shadow.camera,{left:-75,right:75,top:75,bottom:-75,near:1,far:220});
  light.shadow.bias=-0.00015;
  light.shadow.normalBias=.025;
  light.shadow.camera.updateProjectionMatrix();
  scene.add(light,light.target);
  const overlays=[], meshes=[];
  model.traverse(object=>{if(object.isMesh)meshes.push(object);});
  for(const object of meshes) {
    const materials=[].concat(object.material);
    object.castShadow=materials.every(m=>!m.transparent);
    if (!materials.every(m=>m.userData.skyShadowReceiver===true))continue;
    const material=new THREE.ShadowMaterial({side:THREE.DoubleSide,forceSinglePass:true,opacity:.24,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
    const overlay=new THREE.Mesh(object.geometry,material);
    overlay.matrixAutoUpdate=false;overlay.matrix.copy(object.matrix);
    overlay.receiveShadow=true;overlay.renderOrder=1;
    object.parent.add(overlay);overlays.push(overlay);
  }
  return {light,overlays};
}
export function createContactShadow(THREE,texture) {
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(.95,.65),new THREE.MeshBasicMaterial({map:texture,transparent:true,opacity:.3,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));
  mesh.rotation.x=-Math.PI/2;mesh.renderOrder=2;
  return mesh;
}
