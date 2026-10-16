import * as THREE from 'three';
// Native Sky colours remain the albedo; only opaque architecture receives sunlight.
export function createArenaSun(renderer,scene,model){
 const converted=new Map();
 function apply(root,{cutout=false}={}){root.traverse(o=>{if(!o.isMesh)return;const convert=m=>{if((m.transparent&&!cutout)||m.userData?.skyEmissive||m.userData?.horrorDecal)return m;if(converted.has(m))return converted.get(m);
  const lit=new THREE.MeshStandardMaterial({map:m.map,alphaMap:m.alphaMap,color:m.color,vertexColors:m.vertexColors,side:m.side,roughness:.85,metalness:0,alphaTest:m.alphaTest,transparent:m.transparent,opacity:m.opacity,depthWrite:m.depthWrite});
  lit.clippingPlanes=m.clippingPlanes;lit.clipIntersection=m.clipIntersection;lit.polygonOffset=m.polygonOffset;lit.polygonOffsetFactor=m.polygonOffsetFactor;lit.polygonOffsetUnits=m.polygonOffsetUnits;lit.name=m.name;lit.userData={...m.userData,solarLit:true};converted.set(m,lit);return lit;};
  o.material=Array.isArray(o.material)?o.material.map(convert):convert(o.material);o.receiveShadow=true;o.castShadow=[].concat(o.material).every(m=>!m.transparent);
 });}
 apply(model);
 const bounds=new THREE.Box3().setFromObject(model),center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3()),extent=Math.max(size.x,size.z,20)*.6;
 const sun=new THREE.DirectionalLight(0xffeed5,3.5),ambient=new THREE.HemisphereLight(0xc7ddff,0x66543e,1.05);
 sun.target.position.copy(center);sun.position.copy(center).add(new THREE.Vector3(-extent,extent*1.5,extent*.55));sun.castShadow=true;
 sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-extent,right:extent,top:extent,bottom:-extent,near:.5,far:extent*5});sun.shadow.camera.updateProjectionMatrix();sun.shadow.normalBias=.04;sun.shadow.bias=-.0002;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
 const oldToneMapping=renderer.toneMapping,oldExposure=renderer.toneMappingExposure;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 scene.add(sun,sun.target,ambient);
 return {sun,ambient,apply,dispose(){scene.remove(sun,sun.target,ambient);sun.shadow.dispose();for(const material of converted.values())material.dispose();renderer.toneMapping=oldToneMapping;renderer.toneMappingExposure=oldExposure;}};
}
