import phoenix from './cassius-phoenix.cjs';
import {nativeWorldEffect} from './native-effects.mjs';
import {bakedEffectSprite} from './baked-effects.mjs';

export function createPhoenixView(THREE,scene,banks,native){
 const views=new Map(),forward=new THREE.Vector3(0,0,-1),direction=new THREE.Vector3();
 function create(a,s){
  const group=new THREE.Group(),spin=nativeWorldEffect(THREE,native.get(s.nativeEffect.toLowerCase()),{parts:[2,3,4,6,7],startBefore:200,nativeAxes:true,helix:true});
  spin.group.scale.setScalar(.3);spin.group.traverse(object=>{if(!object.material)return;object.material.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace(/#include <map_(?:particle_)?fragment>/,'$&\n diffuseColor.rgb = vec3(max(max(diffuseColor.r,diffuseColor.g),diffuseColor.b))*vec3(1.0,0.35,0.035);');};object.material.customProgramCacheKey=()=> 'cassius-orange';});
  const bird=nativeWorldEffect(THREE,native.get(s.phoenixEffect.toLowerCase()),{parts:[9],anchorPart:9,nativeAxes:true}),flight=new THREE.Group();flight.add(bird.group);bird.group.scale.setScalar(.23);
  const explosion=bakedEffectSprite(THREE,{...banks.get(s.explosionEffect.toLowerCase()),duration:1500},6);
  group.add(spin.group,flight,explosion.sprite);scene.add(group);const v={group,spin,bird,flight,explosion};views.set(a.id,v);return v;
 }
 function draw(a,s,time,avatars){
  const v=views.get(a.id)??create(a,s),phase=phoenix.phoenixPhases(s),position=phoenix.phoenixPosition(a,time,s),transform=Math.max(0,Math.min(1,(time-phase.transformAt)/(phase.diveAt-phase.transformAt)));
  v.spin.group.visible=!a.cancelled&&time>=phase.riseAt&&time<phase.diveAt;v.spin.group.position.set(position.x,position.y+.8,position.z);if(v.spin.group.visible)v.spin.draw(200+(time-phase.riseAt)%400);
  v.flight.visible=!a.cancelled&&time>=phase.transformAt&&time<phase.impactAt;v.flight.position.set(position.x,position.y+.8,position.z);
  if(v.flight.visible){v.bird.draw(2000+transform*500);direction.set(a.aim.x-position.x,(time<phase.diveAt?position.y:a.aim.y)-position.y,a.aim.z-position.z).normalize();if(direction.lengthSq()>0)v.flight.quaternion.setFromUnitVectors(forward,direction);}
  const release=a.explodedAt??(a.resolved?a.impactAt:null),age=release==null?-1:time-(release-a.started),impact=a.explosionPoint??a.aim;
  v.explosion.sprite.visible=!a.cancelled&&age>=0&&age<1500;v.explosion.sprite.position.set(impact.x,impact.y+1,impact.z);if(v.explosion.sprite.visible)v.explosion.draw(age);
 }
 function remove(id){const v=views.get(id);if(!v)return;scene.remove(v.group);v.spin.dispose();v.bird.dispose();v.explosion.dispose();views.delete(id);}
 return {draw,remove,dispose(){for(const id of views.keys())remove(id);}};
}
