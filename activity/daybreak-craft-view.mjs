import crafts from './daybreak-crafts.cjs';
// Small, tinted accents for the first animation pass. No full-screen flash or automatic bloom.
export function createDaybreakCraftView(THREE,scene){
 const views=new Map();
 function remove(id){const v=views.get(id);if(!v)return;scene.remove(v);v.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});views.delete(id);}
 function draw(a,time,avatars){
  const s=crafts.CRAFTS[a.character];let root=views.get(a.id);
  if(!root&&s.coinShot){root=new THREE.Group();const coin=new THREE.Mesh(new THREE.CylinderGeometry(.105,.105,.025,16),new THREE.MeshBasicMaterial({color:0xeebc50}));coin.name='van-coin';root.add(coin);for(const name of ['van-shot-to-coin','van-ricochet']){const beam=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,1,6),new THREE.MeshBasicMaterial({color:0xffd66b,transparent:true,opacity:0,depthWrite:false}));beam.name=name;root.add(beam);}scene.add(root);views.set(a.id,root);}
  if(!root){root=new THREE.Group();const material=new THREE.MeshBasicMaterial({color:s.color,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide});
   const slash=new THREE.Mesh(new THREE.RingGeometry(.9,1.05,40,1,0,Math.PI*1.35),material);slash.name='daybreak-slash';root.add(slash);
   const ring=new THREE.Mesh(new THREE.RingGeometry(.9,1,40),material.clone());ring.rotation.x=-Math.PI/2;ring.name='daybreak-impact';root.add(ring);scene.add(root);views.set(a.id,root);
  }
  if(s.coinShot){
   root.visible=!a.cancelled&&time>=s.throwAt&&time<s.hitAt+150;if(!root.visible)return;
   const coin=root.children[0],p=crafts.coinPoint(a,Math.min(time,s.fireAt)),age=time-s.fireAt;
   coin.visible=age<80;coin.position.set(p.x,p.y,p.z);coin.rotation.set(time*.013,.3,time*.007);
   const direction=new THREE.Vector3(a.aim.x-a.origin.x,0,a.aim.z-a.origin.z).normalize(),muzzle=new THREE.Vector3(a.origin.x+direction.x*.35,a.origin.y+1.1,a.origin.z+direction.z*.35),bounce=new THREE.Vector3(p.x,p.y,p.z),end=new THREE.Vector3(a.aim.x,a.aim.y+.9,a.aim.z);
   const segment=(mesh,from,to,visible,opacity)=>{mesh.visible=visible;if(!visible)return;const delta=to.clone().sub(from);mesh.position.copy(from).addScaledVector(delta,.5);mesh.scale.set(1,delta.length(),1);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());mesh.material.opacity=opacity;};
   segment(root.children[1],muzzle,bounce,age>=0&&age<100,.85*Math.max(0,1-age/100));
   const t=Math.max(0,Math.min(1,age/(s.hitAt-s.fireAt))),tip=bounce.clone().lerp(end,t),tail=bounce.clone().lerp(end,Math.max(0,t-.35));
   segment(root.children[2],tail,tip,age>0&&age<s.hitAt-s.fireAt+100,.9*Math.max(0,1-Math.max(0,age-(s.hitAt-s.fireAt))/100));return;
  }
  const age=time-s.hitAt,visible=!a.cancelled&&age>=-100&&age<380;root.visible=visible;if(!visible)return;
  const p=avatars?.get(a.actor)?.position??crafts.motion(a,time,s).position;root.position.set(p.x,p.y,p.z);
  const slash=root.children[0],ring=root.children[1],t=Math.max(0,age)/380,dx=a.aim.x-a.origin.x,dz=a.aim.z-a.origin.z;
  slash.position.set(0,.9,0);slash.rotation.set(Math.PI*.15,Math.atan2(dx,dz),-.8+t*2);slash.scale.setScalar(s.line?1.7:1.25);slash.material.opacity=.65*(1-t);
  ring.visible=!s.line&&age>=0;ring.position.set(a.aim.x-p.x,.04,a.aim.z-p.z);ring.scale.setScalar(.5+t*s.radius);ring.material.opacity=.5*(1-t);
 }
 return {draw,remove,dispose(){for(const id of [...views.keys()])remove(id);},get size(){return views.size;}};
}
