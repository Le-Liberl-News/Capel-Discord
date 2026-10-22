import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
// Native props share immutable geometry/materials across their instances.
export async function loadNativeProp(T,asset,name,height){
 const object=(await new GLTFLoader().loadAsync(asset('/assets/sky/sanktheim/props/'+name+'/model.gltf'))).scene;
 object.updateMatrixWorld(true);const box=new T.Box3().setFromObject(object),size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3()),factor=height/size.y;
 const root=new T.Group();root.userData.noXRay=true;object.scale.multiplyScalar(factor);object.position.set(-center.x*factor,-box.min.y*factor,-center.z*factor);root.add(object);
 root.traverse(o=>{if(o.isMesh){o.raycast=()=>{};for(const m of [].concat(o.material??[])){m.depthTest=true;m.depthWrite=true;}}});return root;
}
