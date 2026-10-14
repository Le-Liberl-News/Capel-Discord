// Top of the Axis Pillar: the golden circuit drawn on the floor (C51O3204, black = no light) glows
// with a slow yellow pulse, and lights the stone around it at night like the Antérose torches.
export const AXIS_PULSE_MS=2800;
export function axisPulse(time){return .5-.5*Math.cos(time/AXIS_PULSE_MS*Math.PI*2);}
// Lamps on the pattern: its central disc and a ring over the radial rays; strength follows the glow.
export const AXIS_LIGHTS=[{position:[0,.5,0],radius:12,strength:2.4},
  ...Array.from({length:8},(_,i)=>({position:[Math.cos(i*Math.PI/4+Math.PI/8)*13,.5,Math.sin(i*Math.PI/4+Math.PI/8)*13],radius:10,strength:2})),
].map(light=>({...light,color:[1,.75,.28],pulse:time=>.25+.75*axisPulse(time)}));
export function installSkyGlow(model){
  const glowing=[];
  model.traverse(object=>{if(!object.isMesh)return;for(const material of [].concat(object.material)){const kind=material.userData?.skyGlow;if(!kind)continue;
    // additive, unaffected by the day/night tint: it is a light, not a surface
    Object.assign(material,{transparent:true,depthWrite:false,alphaTest:0,blending:2});material.userData.skyEmissive=true;material.needsUpdate=true;object.renderOrder=4;glowing.push({material,kind});}});
  return {update(time=Date.now()){for(const {material,kind} of glowing){const k=kind==='pulse'?.7+2*axisPulse(time):1.5;material.color.setRGB(k,k*.88,k*.55);}}};
}
// Native six-face skies, independent of camera position and navigation geometry.
// CubeTexture backgrounds cover orthographic gameplay and perspective cinematics alike.
export async function createAxisSky(THREE,scene,assets,manager){
 const url=new URL('skybox.json',assets),response=await fetch(url);if(!response.ok)throw Error('Ciel natif inaccessible');
 const manifest=await response.json();if(manifest.faces?.length!==6)throw Error('Skybox native incomplète');
 const cube=await new THREE.CubeTextureLoader(manager).loadAsync(manifest.faces.map(name=>new URL(name,assets).href));
 cube.colorSpace=THREE.SRGBColorSpace;const previous=scene.background,previousIntensity=scene.backgroundIntensity;scene.background=cube;
 return {update(_camera,state){scene.backgroundIntensity=Math.min(1,Math.max(.03,state.tint.reduce((a,b)=>a+b,0)/3));},
 dispose(){if(scene.background===cube){scene.background=previous;scene.backgroundIntensity=previousIntensity;}cube.dispose();}};
}
