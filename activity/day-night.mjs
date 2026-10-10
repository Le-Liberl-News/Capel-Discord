export const DAY_DURATION=120000;
// Absolute time keeps every map and player on the same clock; noon is phase .5.
export function skyTime(time=Date.now()) {
  const phase=((time%DAY_DURATION)+DAY_DURATION)%DAY_DURATION/DAY_DURATION;
  const sun=Math.max(0,Math.cos((phase-.5)*Math.PI*2));
  const daylight=sun*sun*(3-2*sun);
  const dusk=Math.max(0,1-Math.abs(sun-.16)/.16)*Math.abs(Math.sin(phase*Math.PI*2));
  return {phase,hour:phase*24,daylight,lamps:1-daylight,tint:[.075+.925*daylight+.13*dusk,.105+.895*daylight+.035*dusk,.19+.81*daylight]};
}
export const MAP_LIGHTS={
  anterose:[{id:'capel',position:[-4.4,1.25,-3.2],color:[.35,.7,1],radius:4,strength:.8}],
  arena:[],rolent:[],
};
// Local illumination augments baked native colours without replacing transparency
// or geometry. These lights currently have distance falloff, but no wall occlusion.
export function createDayNight(THREE,model,map,shadows,extraSources=[]) {
  const sources=extraSources.length?extraSources:MAP_LIGHTS[map]??[],materials=new Set();
  const uniforms={skyTint:{value:new THREE.Vector3(1,1,1)},skyLamps:{value:0}};
  sources.forEach((source,i)=>{uniforms['skyLight'+i]={value:new THREE.Vector4(...source.position,source.radius)};uniforms['skyColor'+i]={value:new THREE.Vector3(...source.color).multiplyScalar(source.strength)};});
  let override=null,clockOffset=0,state=skyTime();
  function apply(root) {root.traverse(object=>{if(!object.isMesh)return;for(const material of [].concat(object.material??[])){
    if(materials.has(material)||material.isShadowMaterial||material.isShaderMaterial||material.userData?.skyEmissive)continue;materials.add(material);
    const previous=material.onBeforeCompile,cache=material.customProgramCacheKey();
    material.onBeforeCompile=function(shader,renderer){previous.call(this,shader,renderer);Object.assign(shader.uniforms,uniforms);
      shader.vertexShader='varying vec3 vSkyWorld;\n'+shader.vertexShader;
      shader.vertexShader=shader.vertexShader.replace('#include <project_vertex>','#include <project_vertex>\nvSkyWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
      const declarations=sources.map((_,i)=>`uniform vec4 skyLight${i};uniform vec3 skyColor${i};`).join('\n');
      const lights=sources.map((_,i)=>`{float falloff = max(0.0,1.0-distance(vSkyWorld,skyLight${i}.xyz)/skyLight${i}.w);illumination += skyColor${i}*falloff*falloff*skyLamps;}`).join('\n');
      shader.fragmentShader='varying vec3 vSkyWorld;uniform vec3 skyTint;uniform float skyLamps;\n'+declarations+'\n'+shader.fragmentShader;
      shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',`vec3 illumination=skyTint;${lights}\noutgoingLight *= illumination;\n#include <opaque_fragment>`);
    };
    material.customProgramCacheKey=()=>cache+'|sky-cycle-1|'+sources.length;material.needsUpdate=true;
  }});}
  apply(model);
  return {apply,update(time=Date.now()) {state=skyTime(override??(time+clockOffset));uniforms.skyTint.value.set(...((map.startsWith("tower")&&map!=="tower4")?[.105,.125,.14]:state.tint));uniforms.skyLamps.value=(map.startsWith("tower")&&map!=="tower4")?1:state.lamps;
    if(extraSources.length) sources.forEach((source,i)=>{uniforms['skyLight'+i].value.set(...source.position,source.radius);uniforms["skyColor"+i].value.set(...source.color).multiplyScalar(source.strength*(.88+.09*Math.sin(time*.013+i*2.1)+.06*Math.sin(time*.027+i)));});if(shadows)for(const overlay of shadows.overlays)overlay.material.opacity=.24*state.daylight;return state;},state:()=>({...state}),sync(time){if(Number.isFinite(time))clockOffset=time-Date.now();},setTime(time){override=time;},dispose(){materials.clear();}};
}
