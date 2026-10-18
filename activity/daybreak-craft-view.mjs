import crafts from './daybreak-crafts.cjs';
import {loadCs2Effects} from './native-cs2-effects.mjs';
// Native Horizon effects with a lightweight coin and a fallback while no asset bank is available.
export function createDaybreakCraftView(THREE,scene,assets){
 const views=new Map(),banks=new Map(),jobs=new Map(),nativeViews=new Map();let disposed=false;
 const ids={Van:['cr0000_30_2','cr0000_30_3','cr0000_30_4','cr0000_30_5'],Elaine:['cr5110_20_1','cr5110_20_2','cr5110_20_3','cr5110_20_4','cr5110_20_5','cr5110_20_7'],Shizuna:['sc5117_00_02','sc5117_00_04','sc5117_00_08','sc5117_00_09','sc5117_00_11','sc5117_00_13','sc5117_00_14','sc5117_00_16']};
 function prepare(character){if(!assets)return Promise.resolve();if(!jobs.has(character))jobs.set(character,loadCs2Effects(THREE,assets,'effects/horizon/'+character.toLowerCase()+'.vfxpack').then(bank=>{if(disposed)bank.dispose();else banks.set(character,bank);}));return jobs.get(character);}
 const matrix=new THREE.Matrix4(),position=new THREE.Vector3(),quaternion=new THREE.Quaternion(),scale=new THREE.Vector3(),up=new THREE.Vector3(0,1,0);
 function nativeDraw(a,time,camera){const bank=banks.get(a.character);if(!bank||!camera)return false;let list=nativeViews.get(a.id);if(!list){list=Object.fromEntries(ids[a.character].map(id=>[id,bank.create(id,scene,{bloom:.25})]));nativeViews.set(a.id,list);}for(const fx of Object.values(list))fx.hide();if(a.cancelled)return true;
  const spec=crafts.CRAFTS[a.character],yaw=Math.atan2(a.aim.x-a.origin.x,a.aim.z-a.origin.z),end=spec.zeroth?crafts.exitPoint(a):a.aim,center={x:(a.origin.x+end.x)/2,y:a.origin.y+.65,z:(a.origin.z+end.z)/2},length=Math.hypot(end.x-a.origin.x,end.z-a.origin.z);
  const play=(id,start,finish,point,size=.5,rate=1,stretch=1,loop=false)=>{if(time<start||time>finish)return;matrix.compose(position.set(point.x,point.y,point.z),quaternion.setFromAxisAngle(up,yaw),scale.set(size,size,size*stretch));list[id].draw(loop?((time-start)/1000*rate)%(typeof loop==='number'?loop:1.7):(time-start)/1000*rate,matrix,camera,{scale:size,opacity:Math.min(1,(finish-time)/120)});};
  if(spec.coinShot){const coin=crafts.coinPoint(a,spec.fireAt),hit={...a.aim,y:a.aim.y+.8};play('cr0000_30_2',spec.throwAt,spec.fireAt+120,coin,.25);play('cr0000_30_3',spec.fireAt,spec.fireAt+650,coin,.4);play('cr0000_30_4',spec.hitAt-40,spec.hitAt+750,hit,.5);play('cr0000_30_5',spec.hitAt,spec.hitAt+850,a.aim,.38);}
  else if(spec.kaleido){const front=crafts.gatherPoint(a);play('cr5110_20_1',0,650,a.origin,.45);play('cr5110_20_2',400,1000,front,.45);play('cr5110_20_3',500,2350,{...front,y:front.y+.75},.55,1.5,1,.3);play('cr5110_20_4',2350,3100,{...front,y:front.y+.65},.65);play('cr5110_20_7',2500,3350,front,.48);}
  else if(spec.zeroth){const blade={x:a.origin.x+Math.sin(yaw)*.7,y:a.origin.y+.95,z:a.origin.z+Math.cos(yaw)*.7};play('sc5117_00_13',0,spec.hitAt+200,{...a.origin,y:a.origin.y+1.5},.55,1,1,true);play('sc5117_00_14',0,spec.hitAt+450,{...a.origin,y:a.origin.y+1.5},.5,1,1,true);play('sc5117_00_02',1600,spec.hitAt+100,blade,.32);play('sc5117_00_04',spec.moveStart,spec.hitAt+550,a.origin,.48);play('sc5117_00_08',spec.hitAt,spec.hitAt+850,center,.6,1,Math.max(1,length/6));play('sc5117_00_11',spec.hitAt,spec.hitAt+1200,center,.5);play('sc5117_00_09',spec.hitTimes[1],spec.hitTimes[1]+800,center,.6,1,Math.max(1,length/6));play('sc5117_00_16',spec.hitTimes[1],spec.hitTimes[1]+950,end,.5);}
  return true;
 }

 function remove(id){const n=nativeViews.get(id);if(n){for(const fx of Object.values(n))fx.dispose();nativeViews.delete(id);}const v=views.get(id);if(!v)return;scene.remove(v);v.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});views.delete(id);}
 function draw(a,time,avatars,camera){
  const s=crafts.CRAFTS[a.character],native=nativeDraw(a,time,camera);let root=views.get(a.id);
  if(!root&&s.coinShot){root=new THREE.Group();const coin=new THREE.Mesh(new THREE.CylinderGeometry(.105,.105,.025,16),new THREE.MeshBasicMaterial({color:0xeebc50}));coin.name='van-coin';root.add(coin);for(const name of ['van-shot-to-coin','van-ricochet']){const beam=new THREE.Mesh(new THREE.CylinderGeometry(.055,.055,1,8),new THREE.MeshBasicMaterial({color:0xffd66b,transparent:true,opacity:0,depthWrite:false}));beam.name=name;root.add(beam);}scene.add(root);views.set(a.id,root);}
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
  if(native){root.visible=false;return;}
  const age=time-s.hitAt,visible=!a.cancelled&&age>=-100&&age<380;root.visible=visible;if(!visible)return;
  const p=avatars?.get(a.actor)?.position??crafts.motion(a,time,s).position;root.position.set(p.x,p.y,p.z);
  const slash=root.children[0],ring=root.children[1],t=Math.max(0,age)/380,dx=a.aim.x-a.origin.x,dz=a.aim.z-a.origin.z;
  slash.position.set(0,.9,0);slash.rotation.set(Math.PI*.15,Math.atan2(dx,dz),-.8+t*2);slash.scale.setScalar(s.line?1.7:1.25);slash.material.opacity=.65*(1-t);
  ring.visible=!s.line&&age>=0;ring.position.set(a.aim.x-p.x,.04,a.aim.z-p.z);ring.scale.setScalar(.5+t*s.radius);ring.material.opacity=.5*(1-t);
 }
 return {prepare,draw,remove,dispose(){disposed=true;for(const id of [...views.keys()])remove(id);for(const bank of banks.values())bank.dispose();banks.clear();},get size(){return views.size;}};
}
