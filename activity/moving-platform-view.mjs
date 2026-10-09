import platformsModule from './moving-platforms.cjs';
export async function createMovingPlatformView(THREE,scene,assets,layout,grid,dayNight){
 const simulation=platformsModule.createMovingPlatforms({grid,definitions:layout.movingPlatforms??[]}),meshes=new Map();
 const texture=await new THREE.TextureLoader().loadAsync(new URL('C04C1007.png',new URL('tower'+layout.floor+'/',assets)).href);texture.colorSpace=THREE.SRGBColorSpace;texture.magFilter=THREE.NearestFilter;texture.repeat.set(.45,.45);
 for(const d of simulation.definitions){const mesh=new THREE.Mesh(new THREE.BoxGeometry(d.width,.3,d.width),new THREE.MeshBasicMaterial({map:texture}));scene.add(mesh);dayNight.apply(mesh);meshes.set(d.id,mesh);}
 let last=Date.now();
 return {simulation,update(time,avatar,jumping){for(const d of simulation.definitions){const p=platformsModule.platformPosition(d,time);meshes.get(d.id).position.set(p.x,p.y-.15,p.z);}if(avatar&&!jumping&&!avatar.dead&&avatar.character!=='Sieg'){const d=simulation.carrier(avatar.position,last);if(d){const a=platformsModule.platformPosition(d,last),b=platformsModule.platformPosition(d,time);avatar.position.x+=b.x-a.x;avatar.position.z+=b.z-a.z;avatar.position.y=b.y;}}last=time;return simulation.navigation(time);},relative(point,time){const d=simulation.carrier(point,time);if(!d)return null;const p=platformsModule.platformPosition(d,time);return {id:d.id,x:point.x-p.x,z:point.z-p.z};},dispose(){for(const mesh of meshes.values()){scene.remove(mesh);mesh.geometry.dispose();mesh.material.dispose();}meshes.clear();texture.dispose();}};
}
