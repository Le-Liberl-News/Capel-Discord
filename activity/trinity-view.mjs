import {bakedEffectSprite} from './baked-effects.mjs';

// One instanced draw call per trail; native particles are baked offline.
import {shareTexture} from './shared-texture.mjs';
export function createTrinityView(THREE,scene,banks){
 const views=new Map(),matrix=new THREE.Matrix4(),rotation=new THREE.Quaternion(),scale=new THREE.Vector3(),point=new THREE.Vector3();

 function plane(bank,instances){
  const map=shareTexture(bank.map);map.repeat.set(1/bank.columns,1/bank.rows);
  const material=new THREE.MeshBasicMaterial({map,transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending});
  const geometry=new THREE.PlaneGeometry(1,1),mesh=instances?new THREE.InstancedMesh(geometry,material,instances):new THREE.Mesh(geometry,material);
  mesh.frustumCulled=false;mesh.renderOrder=4;
  return {mesh,bank,map,draw(ms,loop=false){let frame=Math.floor(Math.max(0,ms)*bank.frames/(bank.duration??3000));frame=loop?frame%bank.frames:Math.min(bank.frames-1,frame);map.offset.set(frame%bank.columns/bank.columns,1-(Math.floor(frame/bank.columns)+1)/bank.rows);},dispose(){geometry.dispose();material.dispose();map.dispose();}};
 }
 function create(event,spec){
  const group=new THREE.Group();scene.add(group);
  const length=Math.hypot(event.aim.x-event.origin.x,event.aim.z-event.origin.z),count=Math.max(1,Math.ceil(length/.8));
  const trail=plane(banks.get(spec.nativeEffect.toLowerCase()),count);group.add(trail.mesh);
  const aura=bakedEffectSprite(THREE,banks.get(spec.hitEffect.toLowerCase()),2);group.add(aura.sprite);
  const v={group,trail,count,aura,walls:[],nova:null};views.set(event.id,v);return v;
 }
 function draw(event,spec,time,avatars,camera){
  const v=views.get(event.id)??create(event,spec),progress=Math.max(0,Math.min(1,(time-spec.windup)/spec.dashDuration)),age=time-(event.impactAt-event.started),dx=event.aim.x-event.origin.x,dz=event.aim.z-event.origin.z,len=Math.hypot(dx,dz);
  v.trail.mesh.visible=progress>0&&age<spec.trailDuration;
  v.trail.mesh.count=Math.ceil(v.count*progress);v.trail.mesh.material.opacity=Math.min(1,Math.max(0,(spec.trailDuration-age)/600));
  if(camera)rotation.copy(camera.quaternion);else rotation.identity();
  for(let i=0;i<v.trail.mesh.count;i++){const t=Math.min(progress,(i+.5)/v.count);point.set(event.origin.x+dx*t,event.origin.y+(event.aim.y-event.origin.y)*t+.55,event.origin.z+dz*t);scale.set(Math.max(.9,len/v.count*1.5),1.2,1);matrix.compose(point,rotation,scale);v.trail.mesh.setMatrixAt(i,matrix);}
  v.trail.mesh.instanceMatrix.needsUpdate=true;v.trail.draw(Math.max(0,time-spec.windup),true);
  const owner=avatars.get(event.actor)?.position??event.origin;v.aura.sprite.visible=time<spec.windup+spec.dashDuration;v.aura.sprite.position.set(owner.x,owner.y+.7,owner.z);if(v.aura.sprite.visible)v.aura.draw(time*2);
  if(event.closed&&event.triangle&&event.explodedAt!=null){
   if(!v.walls.length)for(let i=0;i<3;i++){
    const from=event.triangle[i],to=event.triangle[(i+1)%3],wall=plane(banks.get(spec.edgeEffect.toLowerCase()));
    wall.mesh.position.set((from.x+to.x)/2,(from.y+to.y)/2+1.7,(from.z+to.z)/2);
    wall.mesh.rotation.y=-Math.atan2(to.z-from.z,to.x-from.x);wall.mesh.scale.set(Math.hypot(to.x-from.x,to.z-from.z),3.4,1);v.group.add(wall.mesh);v.walls.push(wall);
   }
   const elapsed=time-(event.explodedAt-event.started);
   for(const wall of v.walls){wall.mesh.visible=elapsed>=0&&elapsed<3000;wall.draw(elapsed);}
   if(!v.nova){v.nova=bakedEffectSprite(THREE,banks.get(spec.explosionEffect.toLowerCase()),7);v.group.add(v.nova.sprite);}
   const center=event.explosionPoint??{x:event.triangle.reduce((n,p)=>n+p.x,0)/3,y:event.triangle.reduce((n,p)=>n+p.y,0)/3,z:event.triangle.reduce((n,p)=>n+p.z,0)/3};
   v.nova.sprite.position.set(center.x,center.y+1.5,center.z);v.nova.sprite.visible=elapsed>=0&&elapsed<3000;if(v.nova.sprite.visible)v.nova.draw(elapsed);
  }
 }
 function remove(id){const v=views.get(id);if(!v)return;scene.remove(v.group);v.trail.dispose();v.aura.dispose();for(const wall of v.walls)wall.dispose();v.nova?.dispose();views.delete(id);}
 return {draw,remove,dispose(){for(const id of views.keys())remove(id);}};
}
