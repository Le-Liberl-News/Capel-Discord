import flame from './rean-flame-slash.cjs';
import {shareTexture} from './shared-texture.mjs';
import {setBloomEmission} from './map-bloom.mjs';
import {attachSpriteGroundProjection} from './sprite-ground-projection.mjs';
// Temporary fire and slash trails; the choreography is independent of the final Sky effect IDs.
export function createReanFlameView(THREE,scene,fireTexture){
 const views=new Map();
 function make(){
  const fire=Array.from({length:7},(_,i)=>{const map=shareTexture(fireTexture);map.repeat.set(.25,1);const material=setBloomEmission(new THREE.MeshBasicMaterial({map,color:0xffa12b,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}),.65),sprite=new THREE.Mesh(new THREE.PlaneGeometry(1,1),material);sprite.scale.setScalar(.28+i*.015);attachSpriteGroundProjection(THREE,sprite);scene.add(sprite);return sprite;});
  const slashes=Array.from({length:3},(_,i)=>{const group=new THREE.Group();for(const [inner,outer,color]of [[1.4,1.57,0xf35b08],[1.45,1.52,0xffd36b]]){const mesh=new THREE.Mesh(new THREE.RingGeometry(inner,outer,40,1,-Math.PI*.35,Math.PI*.7),setBloomEmission(new THREE.MeshBasicMaterial({color,side:THREE.DoubleSide,transparent:true,depthWrite:false}),.6));group.add(mesh);}scene.add(group);return group;});
  return {fire,slashes};
 }
 function draw(a,time,avatars,camera){let view=views.get(a.id);if(!view){view=make();views.set(a.id,view);}const p=flame.flamePhases(a),owner=avatars?.get(a.actor),frame=owner?.renderFrame,anchors=frame?.info.bladeAnchors?.[frame.frame],scale=frame?.info.pixelScale??.02;
  const right=new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld,0);right.y=0;right.normalize();const forward=new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld,2);forward.y=0;forward.normalize();
  for(const [i,sprite]of view.fire.entries()){sprite.visible=!!owner&&!owner.dead&&!!anchors&&!a.cancelled&&time>=p.prep*.5&&time<p.end;if(!sprite.visible)continue;const t=i/6,x=(anchors[0][0]*(1-t)+anchors[1][0]*t)*scale,y=(anchors[0][1]*(1-t)+anchors[1][1]*t)*scale;
   sprite.position.copy(owner.mesh.position).addScaledVector(right,x).addScaledVector(forward,.025);sprite.position.y+=y;sprite.material.map.offset.x=(Math.floor(time/65+i)%4)/4;sprite.material.opacity=Math.min(.85,(p.end-time)/200);sprite.quaternion.copy(camera.quaternion);sprite.userData.spriteFloorY=owner.position.y+.012;
  }
  for(const [i,group]of view.slashes.entries()){const age=time-[p.first,p.second,p.third][i];group.visible=!a.cancelled&&age>=-80&&age<260;if(!group.visible)continue;group.position.set(a.aim.x,a.aim.y+1,a.aim.z);group.quaternion.copy(camera.quaternion);group.rotateZ(i===0?Math.PI/4:i===1?-Math.PI/4:Math.PI/2);group.scale.setScalar(i===2?1.15:1);for(const mesh of group.children)mesh.material.opacity=Math.min(1,(260-age)/180);}
 }
 function remove(id){const v=views.get(id);if(!v)return;for(const sprite of v.fire){scene.remove(sprite);sprite.geometry.dispose();sprite.material.map.dispose();sprite.material.dispose();}for(const g of v.slashes){scene.remove(g);for(const m of g.children){m.geometry.dispose();m.material.dispose();}}views.delete(id);}
 return {draw,remove,dispose(){for(const id of [...views.keys()])remove(id);}};
}
