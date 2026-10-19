import native from './native-combat.cjs';
import crafts from './daybreak-crafts.cjs';
import {setBloomEmission} from './map-bloom.mjs';
// Shared exported weapon endpoints: the charge effect follows the animated blade too.
export function elaineBladeEndpoints(THREE,time,avatar){
 if(!avatar?.mesh)return null;
 const p=crafts.pose('Elaine',time),pair=native.COMBAT.Elaine.banks[p.bank].bladeAnchors?.[p.pose*8+(avatar.direction??0)%8];
 if(!pair)return null;avatar.mesh.updateMatrixWorld(true);
 return pair.map(([x,y])=>new THREE.Vector3(x,y,0).applyMatrix4(avatar.mesh.matrixWorld));
}
// cr5110_20_0: source trail texture and green tint, attached to the exported weapon endpoints.
export function createElaineBladeView(THREE,scene,assets){
 const views=new Map();let texture=null,job=null,disposed=false;
 function prepare(){if(!assets)return Promise.resolve();return job??=new THREE.TextureLoader().loadAsync(new URL('effects/horizon/efsl_a003.png',assets).href).then(t=>{if(disposed){t.dispose();return;}texture=t;t.colorSpace=THREE.SRGBColorSpace;t.flipY=false;});}
 function make(id){const group=new THREE.Group(),geometry=new THREE.BufferGeometry();for(const [key,size]of [['position',3],['color',3],['uv',2]])geometry.setAttribute(key,new THREE.BufferAttribute(new Float32Array(48*size),size).setUsage(THREE.DynamicDrawUsage));
  const material=new THREE.MeshBasicMaterial({map:texture,color:0x19ffad,vertexColors:true,transparent:true,opacity:.65,blending:THREE.AdditiveBlending,depthWrite:false,depthTest:false,side:THREE.DoubleSide,toneMapped:false});setBloomEmission(material,.4);
  const trail=new THREE.Mesh(geometry,material);trail.frustumCulled=false;trail.renderOrder=4;group.add(trail);
  const lineGeometry=new THREE.BufferGeometry().setAttribute('position',new THREE.BufferAttribute(new Float32Array(6),3));const lineMaterial=new THREE.LineBasicMaterial({color:0x38ffa6,transparent:true,opacity:.85,depthWrite:false,depthTest:false,toneMapped:false});setBloomEmission(lineMaterial,.35);const core=new THREE.Line(lineGeometry,lineMaterial);core.frustumCulled=false;core.renderOrder=4;group.add(core);scene.add(group);const v={group,trail,core,history:[]};views.set(id,v);return v;
 }
 const hilt=new THREE.Vector3(),tip=new THREE.Vector3(),normal=new THREE.Vector3(),perp=new THREE.Vector3(),offset=new THREE.Vector3();
 function draw(a,time,avatar,camera){let v=views.get(a.id);const s=crafts.CRAFTS.Elaine;if(a.cancelled||!avatar?.mesh||!camera||time<0||time>=s.duration){if(v)v.group.visible=false;return;}
  const p=crafts.pose('Elaine',time),bank=native.COMBAT.Elaine.banks[p.bank],pair=bank.bladeAnchors?.[p.pose*8+(avatar.direction??0)%8];if(!pair||!texture){if(v)v.group.visible=false;return;}
  v??=make(a.id);v.group.visible=true;avatar.mesh.updateMatrixWorld(true);camera.getWorldDirection(normal);offset.copy(normal).multiplyScalar(-.006);
  hilt.set(pair[0][0],pair[0][1],0).applyMatrix4(avatar.mesh.matrixWorld).add(offset);tip.set(pair[1][0],pair[1][1],0).applyMatrix4(avatar.mesh.matrixWorld).add(offset);
  const fade=Math.min(1,(s.duration-time)/250),g=v.trail.geometry;let cursor=0;
  function quad(a,b,c,d,intensity){const vertices=[a,b,c,a,c,d],uv=[[0,.25],[0,.5],[1,.5],[0,.25],[1,.5],[1,.25]];vertices.forEach((point,i)=>{g.attributes.position.setXYZ(cursor,point.x,point.y,point.z);g.attributes.color.setXYZ(cursor,intensity,intensity,intensity);g.attributes.uv.setXY(cursor,...uv[i]);cursor++;});}
  v.history=v.history.filter(p=>time-p.time>=0&&time-p.time<130).slice(-6);
  for(let i=1;i<v.history.length;i++){const prev=v.history[i-1],next=v.history[i];quad(prev.hilt,prev.tip,next.tip,next.hilt,.32*(1-(time-next.time)/130)*fade);}
  perp.copy(tip).sub(hilt).cross(normal).normalize().multiplyScalar(.05);quad(hilt.clone().sub(perp),hilt.clone().add(perp),tip.clone().add(perp),tip.clone().sub(perp),fade);
  if(!v.history.length||time-v.history.at(-1).time>=16)v.history.push({time,hilt:hilt.clone(),tip:tip.clone()});
  g.setDrawRange(0,cursor);for(const attr of Object.values(g.attributes))attr.needsUpdate=true;v.core.geometry.attributes.position.setXYZ(0,hilt.x,hilt.y,hilt.z);v.core.geometry.attributes.position.setXYZ(1,tip.x,tip.y,tip.z);v.core.geometry.attributes.position.needsUpdate=true;v.core.material.opacity=.85*fade;
 }
 function remove(id){const v=views.get(id);if(!v)return;scene.remove(v.group);v.group.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});views.delete(id);}
 return {prepare,draw,remove,dispose(){disposed=true;for(const id of [...views.keys()])remove(id);texture?.dispose();},get size(){return views.size;}};
}
