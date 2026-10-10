const FPS=30,FRAMES=27,COLUMNS=7;

export async function prepareEarthWave(THREE,assets){
  const map=await new THREE.TextureLoader().loadAsync(new URL('effects/earth-wave.png',assets).href);
  map.colorSpace=THREE.SRGBColorSpace;map.generateMipmaps=false;map.minFilter=map.magFilter=THREE.LinearFilter;
  const groundMap=map.clone();groundMap.repeat.set(1/COLUMNS,1/4);groundMap.offset.set(6/COLUMNS,0);
  return {map,groundMap,dispose(){map.dispose();groundMap.dispose();}};
}

// Shared atlas: only UVs change during combat, with no canvas redraw or upload.
export function createEarthWave(THREE,scene,event,spec,bank) {
  const angle=-Math.atan2(event.aim.z-event.origin.z,event.aim.x-event.origin.x);
  const steps=spec.hitOffsets.map((delay,index)=>{
    const t=index/(spec.hitOffsets.length-1),map=bank.map.clone();map.repeat.set(1/COLUMNS,1/Math.ceil(FRAMES/COLUMNS));
    const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,color:0xb6a27d}));sprite.scale.setScalar(3);sprite.renderOrder=5;
    const crack=new THREE.Mesh(new THREE.PlaneGeometry(1.6,1.5),new THREE.MeshBasicMaterial({map:bank.groundMap,transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,color:0x8a6840}));
    crack.rotation.set(-Math.PI/2,0,angle);
    crack.position.set(event.origin.x+(event.aim.x-event.origin.x)*t,event.origin.y+(event.aim.y-event.origin.y)*t+.04,event.origin.z+(event.aim.z-event.origin.z)*t);scene.add(crack);
    sprite.position.set(crack.position.x,crack.position.y+.41,crack.position.z);scene.add(sprite);
    return {delay,sprite,crack};
  });
  return {draw(time){for(const {delay,sprite,crack} of steps){const age=time-spec.windup-delay;sprite.visible=age>=0&&age<900;crack.visible=sprite.visible;crack.scale.setScalar(.5+Math.min(1,Math.max(0,age)/100)*.5);crack.material.opacity=.45*Math.max(0,1-age/900);if(sprite.visible){const frame=Math.min(FRAMES-1,Math.floor(age*FPS/1000));sprite.material.map.offset.set(frame%COLUMNS/COLUMNS,1-(Math.floor(frame/COLUMNS)+1)/Math.ceil(FRAMES/COLUMNS));sprite.material.opacity=Math.min(1,(900-age)/200);}}},dispose(){for(const {sprite,crack}of steps){scene.remove(sprite,crack);sprite.material.map.dispose();sprite.material.dispose();crack.geometry.dispose();crack.material.dispose();}}};
}
