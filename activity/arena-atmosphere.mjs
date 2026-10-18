import {createArenaRain} from './arena-rain.mjs';
import {createGehennaLava} from './gehenna-lava.mjs';
import {createArenaLamps} from './arena-lamps.mjs';
import ambience from './arena-ambience.cjs';
import {createGehennaEmbers} from './gehenna-embers.mjs';
// Weather is visual only. Match identity selects the same preset for both duelists.
export async function createArenaAtmosphere(THREE,scene,assets,map,dayNight,sun,renderer,{override,floor}={}){
 const lamps=await createArenaLamps(THREE,scene,assets,map),lava=map==='gehenna'?await createGehennaLava(THREE,scene,assets):null;
 const priorFog=scene.fog,priorBlur=scene.backgroundBlurriness,priorRotation=scene.backgroundRotation?.clone(),priorTint=scene.background?.isCubeTexture?scene.backgroundIntensity:1,originalBackground=scene.background,cubes=new Map();
 let selected=null,forced=override;
 const badge=document.createElement('div');badge.id='sky-arena-ambience';badge.style.cssText='position:fixed;left:50%;top:12px;transform:translateX(-50%);color:#e6e4df;background:#171b28a8;padding:4px 9px;border-radius:5px;font:12px system-ui;pointer-events:none;z-index:12';document.body.append(badge);
 const rain=createArenaRain(THREE,scene,{floor}),embers=map==='gehenna'?createGehennaEmbers(THREE,scene):null;
 function skyFor(key,preset){if(!originalBackground?.isCubeTexture||key==='day')return originalBackground;if(cubes.has(key))return cubes.get(key);const images=originalBackground.images.map(image=>{const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);ctx.globalCompositeOperation='multiply';ctx.fillStyle='rgb('+preset.sky.map(v=>Math.round(v*255)).join(',')+')';ctx.fillRect(0,0,canvas.width,canvas.height);return canvas;});const cube=new THREE.CubeTexture(images);cube.colorSpace=THREE.SRGBColorSpace;cube.needsUpdate=true;cubes.set(key,cube);return cube;}
 function select(id='',requested=forced){forced=requested;const key=ambience.ambienceFor(map,id,requested);if(key===selected)return;selected=key;const preset=ambience.PRESETS[key];if(!preset)return;badge.textContent=preset.label;scene.background=skyFor(key,preset);rain.setEnabled(key==='rain');dayNight.setAtmosphere(preset);if(sun){sun.sun.intensity=preset.sun;sun.sun.color.setHex(preset.sunColor);sun.ambient.intensity=preset.ambient;sun.sun.position.x=key==='sunset'?-35:-25;sun.sun.position.y=key==='sunset'?30:55;renderer.shadowMap.needsUpdate=true;}
  scene.fog=preset.fog?new THREE.FogExp2(preset.fog,key==='rain'?.012:.005):null;
 }
 select();
 return {select,state:()=>({key:selected,...rain.state(),flames:0,embers:embers?.count??0,...ambience.PRESETS[selected]}),update(time,camera,focus){
  lamps.update(time,ambience.PRESETS[selected]);lava?.update(time);
  const p=focus??{x:0,y:0,z:0};
  if(scene.background?.isCubeTexture)scene.backgroundIntensity=1;
  rain.update(time,camera,p);
  embers?.update(time);
 },dispose(){rain.dispose();embers?.dispose();lava?.dispose();lamps.dispose();badge.remove();scene.background=originalBackground;for(const cube of cubes.values())cube.dispose();scene.fog=priorFog;scene.backgroundBlurriness=priorBlur;if(priorRotation&&scene.backgroundRotation)scene.backgroundRotation.copy(priorRotation);scene.backgroundIntensity=priorTint;dayNight.setAtmosphere(null);}};
}
