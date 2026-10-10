import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
export async function loadLynx(THREE,assets,length=10,manager){
 const raw=(await new GLTFLoader(manager).loadAsync(new URL('lynx/model.gltf',assets).href)).scene;
 const bounds=new THREE.Box3().setFromObject(raw),size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3());
 raw.position.set(-center.x,-bounds.min.y,-center.z);const container=new THREE.Group();container.add(raw);container.scale.setScalar(length/Math.max(size.x,size.z));
 // Native Bobcat faces +Z; flight coordinates face -Z.
 container.rotation.y=Math.PI;const model=new THREE.Group();model.add(container);
 raw.traverse(o=>{if(o.isMesh)for(const m of [].concat(o.material)){if(m.map){m.map.magFilter=THREE.NearestFilter;m.map.minFilter=THREE.LinearFilter;}m.depthWrite=true;}});
 for(const x of [-3.6,3.6]){const material=new THREE.MeshBasicMaterial({color:x<0?0xff3030:0x40ff80});material.userData.skyEmissive=true;const lamp=new THREE.Mesh(new THREE.SphereGeometry(.12*length/10,8,6),material);lamp.position.set(x*length/10,1.3*length/10,0);model.add(lamp);}
 return model;
}
