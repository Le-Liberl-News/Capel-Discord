import crafts from './daybreak-crafts.cjs';
// Small, tinted accents for the first animation pass. No full-screen flash or automatic bloom.
export function createDaybreakCraftView(THREE,scene){
 const views=new Map();
 function remove(id){const v=views.get(id);if(!v)return;scene.remove(v);v.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});views.delete(id);}
 function draw(a,time,avatars){
  const s=crafts.CRAFTS[a.character];let root=views.get(a.id);
  if(!root){root=new THREE.Group();const material=new THREE.MeshBasicMaterial({color:s.color,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide});
   const slash=new THREE.Mesh(new THREE.RingGeometry(.9,1.05,40,1,0,Math.PI*1.35),material);slash.name='daybreak-slash';root.add(slash);
   const ring=new THREE.Mesh(new THREE.RingGeometry(.9,1,40),material.clone());ring.rotation.x=-Math.PI/2;ring.name='daybreak-impact';root.add(ring);scene.add(root);views.set(a.id,root);
  }
  const age=time-s.hitAt,visible=!a.cancelled&&age>=-100&&age<380;root.visible=visible;if(!visible)return;
  const p=avatars?.get(a.actor)?.position??crafts.motion(a,time,s).position;root.position.set(p.x,p.y,p.z);
  const slash=root.children[0],ring=root.children[1],t=Math.max(0,age)/380,dx=a.aim.x-a.origin.x,dz=a.aim.z-a.origin.z;
  slash.position.set(0,.9,0);slash.rotation.set(Math.PI*.15,Math.atan2(dx,dz),-.8+t*2);slash.scale.setScalar(s.line?1.7:1.25);slash.material.opacity=.65*(1-t);
  ring.visible=!s.line&&age>=0;ring.position.set(a.aim.x-p.x,.04,a.aim.z-p.z);ring.scale.setScalar(.5+t*s.radius);ring.material.opacity=.5*(1-t);
 }
 return {draw,remove,dispose(){for(const id of [...views.keys()])remove(id);},get size(){return views.size;}};
}
