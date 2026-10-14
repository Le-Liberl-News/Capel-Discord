import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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
    Object.assign(material,{transparent:true,depthWrite:false,alphaTest:0,blending:2});material.userData.skyEmissive=true;material.needsUpdate=true;object.renderOrder=4;object.raycast=()=>{};glowing.push({material,kind});}});
  return {update(time=Date.now()){for(const {material,kind} of glowing){const k=kind==='pulse'?.7+2*axisPulse(time):1.5;material.color.setRGB(k,k*.88,k*.55);}}};
}
// The native generic sky cube (skybox._x3): drawn behind everything, centred on the camera.
export async function createAxisSky(THREE,scene,assets,manager){
  const loaded=await new GLTFLoader(manager).loadAsync(new URL('skybox.gltf',assets).href),sky=loaded.scene,materials=[];
  sky.traverse(object=>{if(!object.isMesh)return;const source=object.material;const material=new THREE.MeshBasicMaterial({map:source.map,side:THREE.DoubleSide,depthTest:false,depthWrite:false,fog:false});source.dispose();object.material=material;materials.push(material);object.renderOrder=-100;object.frustumCulled=false;object.raycast=()=>{};});
  scene.add(sky);
  return {update(camera,state){sky.position.copy(camera.position);for(const material of materials)material.color.setRGB(...state.tint.map(v=>Math.min(1,v)));},
    dispose(){sky.removeFromParent();sky.traverse(object=>{if(object.isMesh){object.geometry.dispose();object.material.map?.dispose();object.material.dispose();}});}};
}
