function createWalkingSurface(THREE,root){
 const bins=new Map(),global=[],size=16,ray=new THREE.Raycaster(),box=new THREE.Box3();root.updateMatrixWorld(true);
 const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
 root.traverse(mesh=>{if(!mesh.isMesh||[].concat(mesh.material??[]).some(m=>m.userData?.skyBackdrop))return;box.setFromObject(mesh);const collision=new THREE.Mesh(mesh.geometry,material);collision.matrixAutoUpdate=false;collision.matrixWorld.copy(mesh.matrixWorld);const ax=Math.floor(box.min.x/size),bx=Math.floor(box.max.x/size),az=Math.floor(box.min.z/size),bz=Math.floor(box.max.z/size);if((bx-ax+1)*(bz-az+1)>4096){global.push(collision);return;}for(let x=ax;x<=bx;x++)for(let z=az;z<=bz;z++){const key=x+','+z;if(!bins.has(key))bins.set(key,[]);bins.get(key).push(collision);}});
 const nearby=(x,z)=>[...global,...(bins.get(Math.floor(x/size)+','+Math.floor(z/size))??[])];
 return {floor(x,z,ceiling=400){ray.near=0;ray.far=200;ray.set(new THREE.Vector3(x,ceiling,z),new THREE.Vector3(0,-1,0));const hit=ray.intersectObjects(nearby(x,z),false).find(h=>Math.abs(h.face.normal.clone().transformDirection(h.object.matrixWorld).y)>.65);return hit?.point.y??null;},
 sweep(from,to,radius=.15){const direction=new THREE.Vector3(to.x-from.x,to.y-from.y,to.z-from.z),length=direction.length();if(length<1e-8)return null;direction.divideScalar(length);ray.near=0;ray.far=length+radius;ray.set(new THREE.Vector3(from.x,from.y,from.z),direction);return ray.intersectObjects([...new Set([...nearby(from.x,from.z),...nearby(to.x,to.z)])],false)[0]??null;}};
}
module.exports={createWalkingSurface};
