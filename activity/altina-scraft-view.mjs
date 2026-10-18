import sword from './altina-scraft.cjs';
import definition from './assets/sky/combat/cs2/altina-scraft.json';
import {loadCs2Effects} from './native-cs2-effects.mjs';
export function createAltinaSwordView(THREE,scene,assets){
 const views=new Map();let bank,texture,diveTexture,job,disposed=false;
 const prepare=()=>job??=Promise.all([loadCs2Effects(THREE,assets,definition.pack),...['sword','swordDive'].map(key=>new THREE.TextureLoader().loadAsync(new URL(definition[key].texture,assets).href))]).then(([b,t,d])=>{if(disposed){b.dispose();t.dispose();d.dispose();return;}bank=b;texture=t;diveTexture=d;for(const map of [t,d]){map.colorSpace=THREE.SRGBColorSpace;map.magFilter=map.minFilter=THREE.NearestFilter;map.generateMipmaps=false;}});
 const matrix=new THREE.Matrix4(),q=new THREE.Quaternion(),v=new THREE.Vector3(),scale=new THREE.Vector3(),axis=new THREE.Vector3(0,1,0);
 function makeSword(info,base){const map=base.clone();map.repeat.set(1/8,1);const geometry=new THREE.PlaneGeometry(info.height*info.frameWidth/info.frameHeight,info.height);geometry.translate(info.centerX??0,info.centerY??0,0);const mesh=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({map,transparent:true,alphaTest:.2,side:THREE.DoubleSide}));scene.add(mesh);return mesh;}
 function make(){return {mesh:makeSword(definition.sword,texture),diveMesh:makeSword(definition.swordDive,diveTexture),launch:bank.create('sclt00_00',scene),trail:bank.create('sclt00_04',scene),rise:bank.create('sclt00_07',scene),dive:bank.create('sclt00_09',scene),impact:bank.create('sclt00_10',scene)};}
 function draw(a,time,avatars,camera){if(!bank||!texture)return;let fx=views.get(a.id);if(!fx){fx=make();views.set(a.id,fx);}const owner=avatars.get(a.actor),p=sword.phases(a),pos=owner?.position??sword.motion(a,time).position,yaw=Math.atan2(a.surfHeading?.x??(a.aim.x-a.origin.x),a.surfHeading?.z??(a.aim.z-a.origin.z));fx.mesh.visible=!a.cancelled&&time>=200&&time<p.impact+400;
  fx.diveMesh.visible=fx.mesh.visible&&time>=p.diveAt;fx.mesh.visible&&=time<p.diveAt&&!(sword.aiming(a,time)&&owner?.mesh.visible===false);
  if(a.cancelled){for(const e of Object.values(fx))if(e.isMesh)e.visible=false;else e.hide();return;}
  for(const mesh of [fx.mesh,fx.diveMesh]){mesh.position.set(pos.x,pos.y-.1-(time>p.impact?Math.min(.6,(time-p.impact)/500):0),pos.z);mesh.quaternion.copy(camera.quaternion);mesh.material.map.offset.x=(owner?.direction??6)/8;mesh.material.opacity=time>p.impact?Math.max(0,1-(time-p.impact)/400):1;}
  const play=(e,start,end,point,size,rate=1)=>{if(time<start||time>=end){e.hide();return;}matrix.compose(v.set(point.x,point.y,point.z),q.setFromAxisAngle(axis,yaw),scale.setScalar(size));e.draw((time-start)/1000*rate,matrix,camera,{scale:size,opacity:Math.min(1,(end-time)/200)});};
  play(fx.launch,0,800,a.origin,.45);play(fx.trail,400,3900,pos,.35,.7);play(fx.rise,3900,4500,pos,.4);play(fx.dive,p.diveAt,p.impact,pos,.4);play(fx.impact,p.impact,p.impact+1800,a.landingPoint??a.aim,.45,1.6);
  // The guardian is part of the sword for the whole craft, not a second combatant beside it.
  const guardian=avatars.get(a.actor+':guardian');if(guardian&&!a.cancelled&&time<p.end)guardian.mesh.visible=false;
 }
 function remove(id){const f=views.get(id);if(!f)return;for(const e of Object.values(f)){if(e.isMesh){scene.remove(e);e.geometry.dispose();e.material.map.dispose();e.material.dispose();}else e.dispose();}views.delete(id);}
 return {prepare,draw,remove,dispose(){disposed=true;for(const id of [...views.keys()])remove(id);bank?.dispose();texture?.dispose();diveTexture?.dispose();}};
}
