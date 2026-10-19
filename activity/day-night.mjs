export const DAY_DURATION=120000;
// Absolute time keeps every map and player on the same clock; noon is phase .5.
export function skyTime(time=Date.now()) {
  const phase=((time%DAY_DURATION)+DAY_DURATION)%DAY_DURATION/DAY_DURATION;
  const sun=Math.max(0,Math.cos((phase-.5)*Math.PI*2));
  const daylight=sun*sun*(3-2*sun);
  const dusk=Math.max(0,1-Math.abs(sun-.16)/.16)*Math.abs(Math.sin(phase*Math.PI*2));
  return {phase,hour:phase*24,daylight,lamps:1-daylight,tint:[.075+.925*daylight+.13*dusk,.105+.895*daylight+.035*dusk,.19+.81*daylight]};
}
// Open sky above the sea of clouds: the top of the Axis Pillar never gets as dark as a street.
const AXIS_NIGHT=[.24,.27,.38];
export const MAP_LIGHTS={
  anterose:[{id:'capel',position:[-4.4,1.25,-3.2],color:[.35,.7,1],radius:4,strength:.8}],
  arena:[],rolent:[],
};
// Local illumination augments baked native colours without replacing transparency
// or geometry. These lights currently have distance falloff, but no wall occlusion.
export function createDayNight(THREE,model,map,shadows,extraSources=[]) {
  const horror=map==='custom',horrorTint=[.075,.09,.13];
  const sources=[...(MAP_LIGHTS[map]??[]),...extraSources],materials=new Set();
  const uniforms={skyTint:{value:new THREE.Vector3(1,1,1)},skyLamps:{value:0}};
  for(let i=0;i<4;i++){uniforms['skyPhoto'+i]={value:new THREE.Vector4()};uniforms['skyPhotoDir'+i]={value:new THREE.Vector2()};uniforms['skyPhotoColor'+i]={value:new THREE.Vector3(1,1,1)};uniforms['skyPhotoConfig'+i]={value:new THREE.Vector2(18,0)};}
  sources.forEach((source,i)=>{uniforms['skyLight'+i]={value:new THREE.Vector4(...source.position,source.radius)};uniforms['skyColor'+i]={value:new THREE.Vector3(...source.color).multiplyScalar(source.strength)};});
  let override=null,atmosphere=null,clockOffset=0,state=skyTime();
  function apply(root) {root.traverse(object=>{if(!object.isMesh)return;for(const material of [].concat(object.material??[])){
    if(materials.has(material)||material.isShadowMaterial||material.isShaderMaterial||material.userData?.skyEmissive)continue;materials.add(material);
    const previous=material.onBeforeCompile,cache=material.customProgramCacheKey();
    material.onBeforeCompile=function(shader,renderer){previous.call(this,shader,renderer);Object.assign(shader.uniforms,uniforms);
      shader.vertexShader='varying vec3 vSkyWorld;\n'+shader.vertexShader;
      shader.vertexShader=shader.vertexShader.replace('#include <project_vertex>','#include <project_vertex>\nvSkyWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
      const photoDeclarations=Array.from({length:4},(_,i)=>`uniform vec4 skyPhoto${i};uniform vec2 skyPhotoDir${i};uniform vec3 skyPhotoColor${i};uniform vec2 skyPhotoConfig${i};`).join('\n');
      const photoLight=Array.from({length:4},(_,i)=>`if(skyPhoto${i}.w>0.0){vec2 delta=vSkyWorld.xz-skyPhoto${i}.xz;float facing=mix(smoothstep(0.0,0.12,dot(normalize(delta+vec2(0.0001)),skyPhotoDir${i})),1.0,skyPhotoConfig${i}.y);float reach=max(0.0,1.0-length(delta)/max(.01,skyPhotoConfig${i}.x));outgoingLight+=skyPhotoColor${i}*(skyPhoto${i}.w*facing*mix(reach,reach*reach,skyPhotoConfig${i}.y)*2.0);}`).join('\n');
      const declarations=sources.map((_,i)=>`uniform vec4 skyLight${i};uniform vec3 skyColor${i};`).join('\n');
      const lights=sources.map((_,i)=>`{float falloff = max(0.0,1.0-distance(vSkyWorld,skyLight${i}.xyz)/skyLight${i}.w);illumination += skyColor${i}*falloff*falloff*skyLamps;}`).join('\n');
      shader.fragmentShader='varying vec3 vSkyWorld;uniform vec3 skyTint;uniform float skyLamps;\n'+declarations+'\n'+photoDeclarations+'\n'+shader.fragmentShader;
      shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',`vec3 illumination=${material.userData?.solarLit||material.userData?.solarBillboard?'vec3(1.0)':'skyTint'};${material.userData?.solarLit||material.userData?.solarBillboard?'':lights}\noutgoingLight *= illumination;${photoLight}\n#include <opaque_fragment>`);
    };
    material.customProgramCacheKey=()=>cache+'|sky-cycle-photo-color-3|'+sources.length+'|'+!!(material.userData?.solarLit||material.userData?.solarBillboard);material.needsUpdate=true;
  }});}
  apply(model);
  return {apply,photo(flashes){for(let i=0;i<4;i++){const f=flashes[i];uniforms['skyPhoto'+i].value.set(f?.origin.x??0,f?.origin.y??0,f?.origin.z??0,f?.strength??0);uniforms['skyPhotoDir'+i].value.set(f?.direction?.x??0,f?.direction?.z??0);uniforms['skyPhotoColor'+i].value.set(...(f?.color??[1,1,1]));uniforms['skyPhotoConfig'+i].value.set(f?.radius??18,f?.omni?1:0);}},update(time=Date.now()) {state=skyTime((map==='arena'||map==='gehenna')?DAY_DURATION/2:horror?0:override??(time+clockOffset));if(atmosphere)state={...state,...atmosphere};uniforms.skyTint.value.set(...(atmosphere?atmosphere.tint:horror?horrorTint:(map.startsWith("tower")&&map!=="tower4")?[.105,.125,.14]:map==='axis'?state.tint.map((v,i)=>Math.max(v,AXIS_NIGHT[i])):state.tint));uniforms.skyLamps.value=horror?1:(map.startsWith("tower")&&map!=="tower4")?1:state.lamps;
    if(extraSources.length) sources.forEach((source,i)=>{uniforms['skyLight'+i].value.set(...source.position,source.radius);uniforms["skyColor"+i].value.set(...source.color).multiplyScalar(source.strength*(source.pulse?source.pulse(time):source.flicker===false?1:.88+.09*Math.sin(time*.013+i*2.1)+.06*Math.sin(time*.027+i)));});if(shadows)for(const overlay of shadows.overlays)overlay.material.opacity=.24*state.daylight;return state;},state:()=>({...state}),sync(time){if(Number.isFinite(time))clockOffset=time-Date.now();},setTime(time){override=time;},setAtmosphere(value){atmosphere=value;},dispose(){materials.clear();}};
}
