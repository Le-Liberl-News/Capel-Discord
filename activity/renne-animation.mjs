import mechanics from './native-combat.cjs';
const {COMBAT,combatSpec,attackPoint}=mechanics;
export async function createRenneCombat(THREE,scene,assets) {
  const loader=new THREE.TextureLoader();
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
  function add(event,localStart,accepted=false){if(!actions.has(event.id))actions.set(event.id,{...event,localStart,accepted});else Object.assign(actions.get(event.id),{accepted:true,cancelled:event.cancelled,aim:event.aim});}
  function receive(events,serverTime){for(const event of events){const elapsed=Math.max(0,serverTime-event.started);if(elapsed>event.endsAt-event.started+1200)continue;add(event,performance.now()-elapsed,true);}}
  function predict(id,origin,aim,kind,actor,character='Renne'){const spec=combatSpec(character,kind),point=attackPoint(origin,aim,kind,character);if(!point)return null;const travel=!spec.projectile?0:Math.hypot(point.x-origin.x,point.z-origin.z)/14*1000;const event={id,actor,kind,character,origin:{...origin},aim:point,started:0,impactAt:spec.windup+travel,endsAt:Math.max(spec.duration,spec.windup+travel+550)};add(event,performance.now());return event;}
  const elapsed=event=>performance.now()-event.localStart;
  function current(actor){return [...actions.values()].find(a=>a.actor===actor&&!a.cancelled&&elapsed(a)<combatSpec(a.character??'Renne',a.kind)?.duration);}
  function pose(event){const metadata=metadataFor(event.character??'Renne'),spec=combatSpec(event.character??'Renne',event.kind);let sequence=metadata.sequences[event.kind],time=elapsed(event),duration=spec.duration;
    if(event.kind==='art'){if(time<spec.windup){sequence=metadata.sequences.spell;time%=sequence.reduce((n,f)=>n+f.ms,0);duration=sequence.reduce((n,f)=>n+f.ms,0);}else{sequence=metadata.sequences.cast;time-=spec.windup;duration=spec.duration-spec.windup;}}
    const total=sequence.reduce((n,f)=>n+f.ms,0);let cursor=Math.min(total-1,time/duration*total);for(const frame of sequence){if(cursor<frame.ms)return frame;cursor-=frame.ms;}return sequence.at(-1);
  }
  function makeEffect(event){const group=new THREE.Group();scene.add(group);
    const ring=new THREE.Mesh(new THREE.PlaneGeometry(4.2,4.2),new THREE.MeshBasicMaterial({map:ringTexture,transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,color:event.kind==='art'?0xffab59:0xff81ba}));ring.rotation.x=-Math.PI/2;group.add(ring);
    const vortex=new THREE.Sprite(new THREE.SpriteMaterial({map:vortexTexture,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,color:event.kind==='art'?0xffb04c:0xffb0d9}));vortex.scale.set(3.2,3.2,1);vortex.position.y=.7;group.add(vortex);
    const boltMap=fireTexture.clone();boltMap.repeat.set(.25,1);const bolt=new THREE.Sprite(new THREE.SpriteMaterial({map:boltMap,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,color:event.kind==='art'?0xffffff:0xf78bd5}));bolt.scale.setScalar(event.kind==='basic'?.9:1.3);scene.add(bolt);
    const effect={group,ring,vortex,bolt};effects.set(event.id,effect);return effect;
  }
  function remove(id){const e=effects.get(id);if(e){scene.remove(e.group,e.bolt);for(const mesh of [e.ring,e.vortex,e.bolt]){if(mesh===e.ring)mesh.geometry.dispose();if(mesh===e.bolt)mesh.material.map.dispose();mesh.material.dispose();}effects.delete(id);}actions.delete(id);}
  function update(localId,capture,camera){for(const [id,event]of actions){const time=elapsed(event),spec=combatSpec(event.character??'Renne',event.kind),impact=event.impactAt-event.started;if(event.cancelled||time>event.endsAt-event.started+1100){capture.cancel(id);remove(id);continue;}const e=effects.get(id)??makeEffect(event);
    const travelling=spec.projectile&&time>=spec.windup&&time<impact;const progress=Math.max(0,Math.min(1,(time-spec.windup)/(impact-spec.windup||1)));
    e.bolt.visible=travelling;e.bolt.position.set(event.origin.x+(event.aim.x-event.origin.x)*progress,event.origin.y+.9+(event.aim.y-event.origin.y)*progress,event.origin.z+(event.aim.z-event.origin.z)*progress);e.bolt.material.map.offset.x=(Math.floor(time/65)%4)/4;
    const age=(time-impact)/1000,visible=age>=0&&age<.85;e.group.visible=visible;e.group.position.set(event.aim.x,event.aim.y+.04,event.aim.z);e.ring.rotation.z=age*3;e.ring.scale.setScalar(.6+Math.max(0,age)*.7);e.ring.material.opacity=e.vortex.material.opacity=visible?Math.max(0,1-age/.85):0;e.vortex.material.rotation=age*5;
    if(event.kind==='art'&&time<spec.windup){e.group.visible=true;e.group.position.set(event.origin.x,event.origin.y+.04,event.origin.z);e.ring.scale.setScalar(.35);e.ring.material.opacity=.55;e.vortex.material.opacity=0;}
    if(event.kind==='craft'&&event.actor===localId&&event.accepted&&!event.captureStarted&&time>=impact-350){event.captureStarted=true;capture.start(id,event.aim,camera);}
  }}
  return {metadata,textures,metadataFor,load,actions,predict,receive,current,pose,update,reject(id){const event=actions.get(id);if(event)event.cancelled=true;},accept(id){const event=actions.get(id);if(event)event.accepted=true;},dispose(){for(const id of [...actions.keys()])remove(id);for(const job of loaded.values())job.then(({textures})=>{for(const texture of textures.values())texture.dispose();});ringTexture.dispose();vortexTexture.dispose();fireTexture.dispose();}};
}
