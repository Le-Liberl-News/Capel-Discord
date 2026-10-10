import {createEarthWave} from './earth-wave.mjs';
import {createBlackFangTrail} from './black-fang-effects.mjs';
import dashMechanics from './black-fang.cjs';
const {dashPosition}=dashMechanics;
import {loadNativeEffects,nativeEffectSprite,nativeCastingHalo} from './native-effects.mjs';
import mechanics from './native-combat.cjs';
const {COMBAT,combatSpec,attackPoint}=mechanics;
export async function createRenneCombat(THREE,scene,assets) {
  const loader=new THREE.TextureLoader();
  const native=await loadNativeEffects(assets);
  const [metadata,ringTexture,vortexTexture,fireTexture]=await Promise.all([
    Promise.resolve(COMBAT.Renne),
    loader.loadAsync(new URL('combat/blood-circle.png',assets).href),loader.loadAsync(new URL('combat/blood-vortex.png',assets).href),loader.loadAsync(new URL('effects/fire-frames.png',assets).href),
  ]);
  const textures=new Map();
  const loaded=new Map();
  const metadataFor=character=>COMBAT[character];
  async function load(character){if(!metadataFor(character))return null;if(!loaded.has(character))loaded.set(character,(async()=>{const meta=metadataFor(character),maps=character==='Renne'?textures:new Map();await Promise.all(Object.entries(meta.banks).map(async([bank,info])=>{const texture=await loader.loadAsync(new URL(info.texture,assets).href);texture.colorSpace=THREE.SRGBColorSpace;texture.magFilter=texture.minFilter=THREE.NearestFilter;texture.generateMipmaps=false;texture.repeat.set(1/info.columns,1/info.rows);maps.set(+bank,texture);}));return {metadata:meta,textures:maps};})());return loaded.get(character);}
  await load('Renne');
  for(const texture of [ringTexture,vortexTexture,fireTexture])texture.colorSpace=THREE.SRGBColorSpace;
  const actions=new Map();
  const effects=new Map();
  function add(event,localStart,accepted=false){if(!actions.has(event.id))actions.set(event.id,{...event,localStart,accepted});else Object.assign(actions.get(event.id),{accepted:true,cancelled:event.cancelled,aim:event.aim,origin:event.origin,target:event.target});}
  function receive(events,serverTime){for(const event of events){const elapsed=Math.max(0,serverTime-event.started);if(elapsed>event.endsAt-event.started+1200)continue;const spec=combatSpec(event.character,event.kind),replay=spec?.dash&&!actions.has(event.id)&&elapsed<spec.windup+spec.dashDuration?Math.min(elapsed,spec.windup):elapsed;add(event,performance.now()-replay,true);}}
  function predict(id,origin,aim,kind,actor,character='Renne'){const spec=combatSpec(character,kind),point=attackPoint(origin,aim,kind,character);if(!point)return null;const travel=spec.dash?spec.dashDuration:!spec.projectile?0:Math.hypot(point.x-origin.x,point.z-origin.z)/14*1000;const event={id,actor,kind,character,origin:{...origin},aim:point,started:0,impactAt:spec.windup+travel,endsAt:Math.max(spec.duration,spec.windup+travel+(spec.effectDuration??550))};add(event,performance.now());return event;}
  const elapsed=event=>performance.now()-event.localStart;
  function dash(actor){const event=[...actions.values()].find(a=>a.actor===actor&&!a.cancelled&&!a.dashFinished&&combatSpec(a.character,a.kind)?.dash);return event?{event,...dashPosition(event,elapsed(event),combatSpec(event.character,event.kind))}:null;}
  function current(actor){return [...actions.values()].find(a=>a.actor===actor&&!a.cancelled&&elapsed(a)<combatSpec(a.character??'Renne',a.kind)?.duration);}
  function pose(event){const metadata=metadataFor(event.character??'Renne'),spec=combatSpec(event.character??'Renne',event.kind);let sequence=metadata.sequences[event.kind],time=elapsed(event),duration=spec.duration;
    if(event.kind==='art'&&!spec.poseSequence){if(time<spec.windup){sequence=metadata.sequences.spell;time=time*2%sequence.reduce((n,f)=>n+f.ms,0);duration=sequence.reduce((n,f)=>n+f.ms,0);}else{sequence=metadata.sequences.cast;time-=spec.windup;duration=spec.duration-spec.windup;}}
    const total=sequence.reduce((n,f)=>n+f.ms,0);let cursor=Math.min(total-1,time/duration*total);for(const frame of sequence){if(cursor<frame.ms)return frame;cursor-=frame.ms;}return sequence.at(-1);
  }
  function makeEffect(event){const support=combatSpec(event.character??'Renne',event.kind)?.effect;const group=new THREE.Group();scene.add(group);
    const ring=new THREE.Mesh(new THREE.PlaneGeometry(4.2,4.2),new THREE.MeshBasicMaterial({map:ringTexture,transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,color:support==='heal'?0x64ffa2:support==='shield'?0x72caff:event.kind==='art'?0xffab59:0xff81ba}));ring.rotation.x=-Math.PI/2;group.add(ring);
    const vortex=new THREE.Sprite(new THREE.SpriteMaterial({map:vortexTexture,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,color:support==='heal'?0x64ffa2:support==='shield'?0x72caff:event.kind==='art'?0xffb04c:0xffb0d9}));vortex.scale.set(3.2,3.2,1);vortex.position.y=.7;group.add(vortex);
    const boltMap=fireTexture.clone();boltMap.repeat.set(.25,1);const bolt=new THREE.Sprite(new THREE.SpriteMaterial({map:boltMap,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,color:event.kind==='art'?0xffffff:0xf78bd5}));bolt.scale.setScalar(1.3);scene.add(bolt);
    const spec=combatSpec(event.character??'Renne',event.kind),player=spec.nativeEffect&&native.get(spec.nativeEffect.toLowerCase());
    const assembly=player?nativeEffectSprite(THREE,player,spec.shape==='line'||spec.element==='earth'?4:3,spec.element==='earth'?4:2):null;
    if(assembly)scene.add(assembly.sprite);
    const haloPlayer=spec.castEffect&&native.get(spec.castEffect.toLowerCase()),halo=haloPlayer?nativeCastingHalo(THREE,haloPlayer):null;if(halo)scene.add(halo.group);
    const trail=spec.dash&&assembly?createBlackFangTrail(THREE,scene,event,spec,assembly,player):null;
    const wave=spec.wave&&player?createEarthWave(THREE,scene,event,spec,player):null;
    const effect={group,ring,vortex,bolt,assembly,halo,trail,wave};effects.set(event.id,effect);return effect;
  }
  function remove(id){const e=effects.get(id);if(e){scene.remove(e.group,e.bolt);e.trail?.dispose();e.wave?.dispose();if(e.halo){scene.remove(e.halo.group);e.halo.dispose();}if(e.assembly){scene.remove(e.assembly.sprite);e.assembly.dispose();}for(const mesh of [e.ring,e.vortex,e.bolt]){if(mesh===e.ring)mesh.geometry.dispose();if(mesh===e.bolt)mesh.material.map.dispose();mesh.material.dispose();}effects.delete(id);}actions.delete(id);}
  function update(localId,capture,camera,avatars){for(const [id,event]of actions){const time=elapsed(event),spec=combatSpec(event.character??'Renne',event.kind),impact=event.impactAt-event.started;if(event.cancelled||time>event.endsAt-event.started+1100){capture?.cancel(id);remove(id);continue;}if(event.kind==='basic')continue;const e=effects.get(id)??makeEffect(event);
    if(e.halo){e.halo.group.visible=time>=0&&time<spec.castDuration;const position=avatars?.get(event.actor)?.position??event.origin;e.halo.group.position.set(position.x,position.y,position.z);if(e.halo.group.visible)e.halo.draw(time);}
    const travelling=spec.projectile&&time>=spec.windup&&time<impact;const progress=Math.max(0,Math.min(1,(time-spec.windup)/(impact-spec.windup||1)));
    e.bolt.visible=travelling;e.bolt.position.set(event.origin.x+(event.aim.x-event.origin.x)*progress,event.origin.y+.9+(event.aim.y-event.origin.y)*progress,event.origin.z+(event.aim.z-event.origin.z)*progress);e.bolt.material.map.offset.x=(Math.floor(time/65)%4)/4;
    const age=(time-impact)/1000,visible=age>=0&&age<.85;e.group.visible=visible;e.group.position.set(event.aim.x,event.aim.y+.04,event.aim.z);e.ring.rotation.z=age*3;e.ring.scale.setScalar(.6+Math.max(0,age)*.7);e.ring.material.opacity=e.vortex.material.opacity=visible?Math.max(0,1-age/.85):0;e.vortex.material.rotation=age*5;
    if(event.kind==='art'&&time<spec.windup){e.group.visible=true;e.group.position.set(event.origin.x,event.origin.y+.04,event.origin.z);e.ring.scale.setScalar(.35);e.ring.material.opacity=.55;e.vortex.material.opacity=0;}
    if(e.wave){e.group.visible=false;e.bolt.visible=false;e.assembly.sprite.visible=false;e.wave.draw(time);}
    else if(e.trail){e.group.visible=false;e.bolt.visible=false;e.assembly.sprite.visible=false;e.trail.draw(time,avatars?.get(event.actor),camera);}
    else if(e.assembly){e.group.visible=false;e.bolt.visible=false;e.assembly.sprite.visible=age>=0&&age<(spec.effectDuration??1200)/1000;e.assembly.sprite.position.set(event.aim.x,event.aim.y+.9,event.aim.z);if(e.assembly.sprite.visible)e.assembly.draw(age*1000);}
    if(spec.element==='wind'){e.ring.material.color.set(0x72ffb4);e.vortex.material.color.set(0xa1ffe4);}
    if(event.kind==='craft'&&event.actor===localId&&event.accepted&&!event.captureStarted&&time>=impact-350){event.captureStarted=true;capture?.start(id,event.aim,camera);}
  }}
  return {metadata,textures,metadataFor,load,actions,predict,receive,current,dash,pose,update,reject(id){const event=actions.get(id);if(event)event.cancelled=true;},accept(id){const event=actions.get(id);if(event)event.accepted=true;},dispose(){for(const id of [...actions.keys()])remove(id);for(const job of loaded.values())job.then(({textures})=>{for(const texture of textures.values())texture.dispose();});ringTexture.dispose();vortexTexture.dispose();fireTexture.dispose();}};
}
