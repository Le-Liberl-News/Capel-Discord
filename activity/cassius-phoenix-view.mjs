import phoenix from './cassius-phoenix.cjs';
import {nativeWorldEffect} from './native-effects.mjs';
import {bakedEffectSprite} from './baked-effects.mjs';

export function applyPhoenixFire(group,strength=1){group.traverse(object=>{if(!object.material)return;object.material.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace(/#include <map_(?:particle_)?fragment>/,'$&\n diffuseColor.rgb = vec3(max(max(diffuseColor.r,diffuseColor.g),diffuseColor.b))*vec3(1.0,0.35,0.035)*'+strength.toFixed(3)+';');};object.material.customProgramCacheKey=()=> 'cassius-orange:'+strength;});}
export function createPhoenixView(THREE,scene,banks,native){
 const views=new Map(),forward=new THREE.Vector3(0,0,1),up=new THREE.Vector3(0,1,0),direction=new THREE.Vector3();
 function create(a,s){
  const group=new THREE.Group(),spin=nativeWorldEffect(THREE,native.get(s.nativeEffect.toLowerCase()),{parts:[2,3,4,6,7],startBefore:200,nativeAxes:true,helix:true});
  spin.group.scale.setScalar(.55);applyPhoenixFire(spin.group);
  const bird=nativeWorldEffect(THREE,native.get(s.phoenixEffect.toLowerCase()),{parts:[9],anchorPart:9,nativeAxes:true,animate:true,animationSpeed:1.5}),flight=new THREE.Group();flight.add(bird.group);bird.group.scale.setScalar(.23*1.6);
  // The original effect expands two textured spheres, rather than a camera-facing picture.
  const explosion=nativeWorldEffect(THREE,native.get(s.explosionEffect.toLowerCase()),{parts:[2,3,13],startBefore:2200,nativeAxes:true,spatial:true});
  const rings=nativeWorldEffect(THREE,native.get(s.shockwaveEffect.toLowerCase()),{parts:[6,12,13,14],nativeAxes:true,spatial:true});rings.group.scale.setScalar(.075);
  const trails=Array.from({length:10},()=>{const fx=bakedEffectSprite(THREE,banks.get(s.trailEffect.toLowerCase()),1.9);applyPhoenixFire(fx.sprite);return fx;});
  group.add(spin.group,flight,explosion.group,rings.group,...trails.map(t=>t.sprite));scene.add(group);const v={group,spin,bird,flight,explosion,rings,trails};views.set(a.id,v);return v;
 }
 function draw(a,s,time,avatars){
  const v=views.get(a.id)??create(a,s),phase=phoenix.phoenixPhases(s),position=phoenix.phoenixPosition(a,time,s),transform=Math.max(0,Math.min(1,(time-phase.transformAt)/(phase.diveAt-phase.transformAt)));
  v.spin.group.visible=!a.cancelled&&time>=phase.riseAt&&time<phase.diveAt;v.spin.group.position.set(position.x,position.y+.8,position.z);if(v.spin.group.visible)v.spin.draw(200+(time-phase.riseAt)%400);const tilt=phoenix.phoenixOrientation(a,time,s);direction.set(tilt.x,tilt.y,tilt.z);v.spin.group.quaternion.setFromUnitVectors(up,direction);
  v.flight.visible=!a.cancelled&&time>=phase.transformAt&&time<phase.impactAt;v.flight.position.set(position.x,position.y+.8,position.z);
  if(v.flight.visible){v.bird.draw(2000+transform*500,time-phase.transformAt);direction.set(a.aim.x-position.x,(time<phase.diveAt?position.y:a.aim.y)-position.y,a.aim.z-position.z).normalize();if(direction.lengthSq()>0)v.flight.quaternion.setFromUnitVectors(forward,direction);}
  for(const [i,trail]of v.trails.entries()){
   const sample=time-(i+1)*35;trail.sprite.visible=!a.cancelled&&sample>=phase.diveAt&&sample<phase.impactAt;
   if(!trail.sprite.visible)continue;const point=phoenix.phoenixPosition(a,sample,s);trail.sprite.position.set(point.x,point.y+.8,point.z);trail.sprite.material.opacity=1-i/12;trail.draw(150+(i*25+time)%300);
  }
  const release=a.explodedAt??(a.resolved?a.impactAt:null),age=release==null?-1:time-(release-a.started),impact=a.explosionPoint??a.aim,visible=!a.cancelled&&age>=0&&age<1400;
  v.explosion.group.visible=v.rings.group.visible=visible;v.explosion.group.position.set(impact.x,impact.y+1.1,impact.z);v.rings.group.position.copy(v.explosion.group.position);
  if(visible){const q=Math.min(1,age/1000),growth=q*q*(3-2*q),fade=Math.max(0,Math.min(1,(1400-age)/400));v.explosion.group.scale.setScalar(.6*growth);v.explosion.draw(2000+age);v.rings.draw(age*1.5);for(const fx of [v.explosion,v.rings])fx.group.traverse(object=>{if(object.material)object.material.opacity*=fade;});}
 }
 function remove(id){const v=views.get(id);if(!v)return;scene.remove(v.group);v.spin.dispose();v.bird.dispose();v.explosion.dispose();v.rings.dispose();for(const t of v.trails)t.dispose();views.delete(id);}
 return {draw,remove,dispose(){for(const id of views.keys())remove(id);}};
}
