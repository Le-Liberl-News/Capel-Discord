// Decorative follower outside solo combat. Solo encounters supply their own damageable guardian actor.
export async function createAltinaCompanionView(THREE,scene,assets,catalogue){
 const info=catalogue['Claiomh Solais'];if(!info)return {update(){},dispose(){}};
 const base=await new THREE.TextureLoader().loadAsync(new URL(info.texture,assets).href);base.colorSpace=THREE.SRGBColorSpace;base.magFilter=base.minFilter=THREE.NearestFilter;base.generateMipmaps=false;
 const followers=new Map();
 function remove(id){const mesh=followers.get(id);if(!mesh)return;scene.remove(mesh);mesh.material.map.dispose();mesh.material.dispose();mesh.geometry.dispose();followers.delete(id);}
 return {
  update(time,seconds,camera,avatars,combat){
   for(const id of followers.keys()){const owner=avatars.get(id);if(!owner||owner.character!=='Altina'||owner.dead||avatars.has(id+':guardian'))remove(id);}
   for(const [id,owner]of avatars){
    if(owner.character!=='Altina'||owner.dead||avatars.has(id+':guardian'))continue;
    let mesh=followers.get(id);if(!mesh){const map=base.clone();map.repeat.set(1/info.columns,1/info.rows);map.needsUpdate=true;const g=new THREE.PlaneGeometry(info.height*info.frameWidth/info.frameHeight,info.height);g.translate(info.centerX??0,info.centerY??info.height/2,0);mesh=new THREE.Mesh(g,new THREE.MeshBasicMaterial({map,transparent:true,alphaTest:.15,side:THREE.DoubleSide}));scene.add(mesh);followers.set(id,mesh);mesh.position.copy(owner.mesh.position);}
    const h=owner.heading??{dx:0,dz:-1},length=Math.hypot(h.dx,h.dz)||1,p=owner.position,target=new THREE.Vector3(p.x-h.dz/length*1.05,p.y,p.z+h.dx/length*1.05);
    mesh.position.lerp(target,1-Math.exp(-seconds*10));mesh.rotation.set(0,Math.atan2(camera.matrixWorld.elements[8],camera.matrixWorld.elements[10]),0);mesh.visible=owner.mesh.visible&&combat?.current(id)?.special!=='altinaSword';
    const pose=owner.walking?info.run[Math.floor(time/1000*info.fps)%info.run.length]:info.idle[0],d=owner.direction??6;
    mesh.material.map.offset.set(d/info.columns,1-(pose+1)/info.rows);
   }
  },dispose(){for(const id of followers.keys())remove(id);base.dispose();}
 };
}
