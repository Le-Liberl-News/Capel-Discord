import mechanics from './black-fang.cjs';
const {dashPosition}=mechanics;
export function createBlackFangTrail(THREE,scene,event,spec,assembly,player){
 const group=new THREE.Group(),ghosts=new Map();scene.add(group);
 const vertical=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map:assembly.sprite.material.map,transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));
 const horizontal=new THREE.Mesh(new THREE.PlaneGeometry(1,1),vertical.material.clone());horizontal.geometry.rotateX(-Math.PI/2);group.add(vertical,horizontal);
 // Native Black Fang light particle, stretched into a continuous blade across the segment.
 const part=player.root.parts[1],source=player.root.textures[part.textureIndex],image=player.textureImages.get(source.additiveTexture??source.texture),[u,v,u2,v2]=part.uv,canvas=document.createElement('canvas');canvas.width=(u2-u)*image.width;canvas.height=(v2-v)*image.height;canvas.getContext('2d').drawImage(image,u*image.width,v*image.height,canvas.width,canvas.height,0,0,canvas.width,canvas.height);
 const coreMap=new THREE.CanvasTexture(canvas);coreMap.colorSpace=THREE.SRGBColorSpace;
 const core=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map:coreMap,color:0xe4eaff,transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));group.add(core);
 function draw(time,avatar,camera){
  const age=time-spec.windup,{progress}=dashPosition(event,time,spec),dx=event.aim.x-event.origin.x,dz=event.aim.z-event.origin.z,length=Math.hypot(dx,dz)*progress;
  group.visible=age>=0&&age<spec.dashDuration+550;
  if(!group.visible)return;
  assembly.draw(Math.max(0,age)*2);
  const opacity=Math.max(0,1-Math.max(0,age-spec.dashDuration)/550),y=event.origin.y+(event.aim.y-event.origin.y)*progress/2;
  for(const mesh of [vertical,horizontal,core]){mesh.position.set(event.origin.x+dx*progress/2,y+(mesh===horizontal?.18:.65),event.origin.z+dz*progress/2);mesh.rotation.y=-Math.atan2(dz,dx);mesh.scale.set(Math.max(.01,length),mesh===core?.24:mesh===vertical?1.1:.55,1);mesh.material.opacity=opacity;}
  if(avatar?.mesh)for(let i=0;i<8;i++){
   const fraction=i/8;if(progress<=fraction)continue;
   let ghost=ghosts.get(i);
   if(!ghost){const material=avatar.mesh.material.clone();material.map=material.map.clone();material.map.needsUpdate=true;material.depthWrite=false;material.opacity=.4;material.color.set(0xaacfff);const mesh=new THREE.Mesh(avatar.mesh.geometry.clone(),material);mesh.scale.copy(avatar.mesh.scale);group.add(mesh);ghost={mesh,born:spec.windup+fraction*spec.dashDuration};ghosts.set(i,ghost);}
   ghost.mesh.position.set(event.origin.x+dx*fraction,event.origin.y+(event.aim.y-event.origin.y)*fraction,event.origin.z+dz*fraction);ghost.mesh.quaternion.copy(avatar.mesh.quaternion);ghost.mesh.material.opacity=.4*Math.max(0,1-(time-ghost.born)/350);ghost.mesh.visible=ghost.mesh.material.opacity>0;
  }
 }
 return {draw,dispose(){scene.remove(group);coreMap.dispose();for(const mesh of [vertical,horizontal,core]){mesh.geometry.dispose();mesh.material.dispose();}for(const {mesh}of ghosts.values()){mesh.geometry.dispose();mesh.material.map.dispose();mesh.material.dispose();}}};
}
