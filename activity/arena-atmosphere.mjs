import {createArenaRain} from './arena-rain.mjs';
import {createGehennaLava} from './gehenna-lava.mjs';
import {createArenaLamps} from './arena-lamps.mjs';
import ambience from './arena-ambience.cjs';
import {setBloomEmission} from './map-bloom.mjs';
// Weather is visual only. Match identity selects the same preset for both duelists.
export async function createArenaAtmosphere(THREE,scene,assets,map,dayNight,sun,renderer,{override,floor}={}){
 const lamps=await createArenaLamps(THREE,scene,assets,map),lava=map==='gehenna'?await createGehennaLava(THREE,scene,assets):null;
 const priorFog=scene.fog,priorBlur=scene.backgroundBlurriness,priorRotation=scene.backgroundRotation?.clone(),priorTint=scene.background?.isCubeTexture?scene.backgroundIntensity:1,originalBackground=scene.background,cubes=new Map();
 let selected=null,forced=override;const objects=[];
 const badge=document.createElement('div');badge.id='sky-arena-ambience';badge.style.cssText='position:fixed;left:50%;top:12px;transform:translateX(-50%);color:#e6e4df;background:#171b28a8;padding:4px 9px;border-radius:5px;font:12px system-ui;pointer-events:none;z-index:12';document.body.append(badge);
 const rain=createArenaRain(THREE,scene,{floor}),seeds=Float32Array.from({length:144},(_,i)=>{const x=Math.sin(i*78.233+19.19)*43758.5453;return x-Math.floor(x);});
 const fireShaders=new Set();let fire=null,fireMap=null;const matrix=new THREE.Matrix4(),position=new THREE.Vector3(),scale=new THREE.Vector3();
 if(map==='gehenna'){fireMap=await new THREE.TextureLoader().loadAsync(new URL('effects/fire-frames.png',assets).href);fireMap.colorSpace=THREE.SRGBColorSpace;fireMap.minFilter=fireMap.magFilter=THREE.LinearFilter;fireMap.generateMipmaps=false;const material=new THREE.MeshBasicMaterial({map:fireMap,color:0xffb25b,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,toneMapped:false});setBloomEmission(material,.18);
  material.onBeforeCompile=shader=>{shader.uniforms.weatherTime={value:0};fireShaders.add(shader);shader.vertexShader='attribute float weatherSeed;varying float vWeatherSeed;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvWeatherSeed=weatherSeed;');shader.fragmentShader='uniform float weatherTime;varying float vWeatherSeed;\n'+shader.fragmentShader.replace('#include <map_fragment>',THREE.ShaderChunk.map_fragment.replace('texture2D( map, vMapUv )','texture2D( map, vec2((vMapUv.x+floor(mod(weatherTime*8.0+vWeatherSeed,4.0)))*0.25,vMapUv.y) )'));};material.customProgramCacheKey=()=> 'gehenna-native-fire-weather-v2';
  const geometry=new THREE.PlaneGeometry(1,1);geometry.setAttribute('weatherSeed',new THREE.InstancedBufferAttribute(Float32Array.from({length:36},(_,i)=>seeds[i]*4),1));fire=new THREE.InstancedMesh(geometry,material,36);fire.frustumCulled=false;fire.instanceMatrix.setUsage(THREE.DynamicDrawUsage);scene.add(fire);objects.push(fire);
 }
 function skyFor(key,preset){if(!originalBackground?.isCubeTexture||key==='day')return originalBackground;if(cubes.has(key))return cubes.get(key);const images=originalBackground.images.map(image=>{const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);ctx.globalCompositeOperation='multiply';ctx.fillStyle='rgb('+preset.sky.map(v=>Math.round(v*255)).join(',')+')';ctx.fillRect(0,0,canvas.width,canvas.height);return canvas;});const cube=new THREE.CubeTexture(images);cube.colorSpace=THREE.SRGBColorSpace;cube.needsUpdate=true;cubes.set(key,cube);return cube;}
 function select(id='',requested=forced){forced=requested;const key=ambience.ambienceFor(map,id,requested);if(key===selected)return;selected=key;const preset=ambience.PRESETS[key];if(!preset)return;badge.textContent=preset.label;scene.background=skyFor(key,preset);rain.setEnabled(key==='rain');dayNight.setAtmosphere(preset);if(sun){sun.sun.intensity=preset.sun;sun.sun.color.setHex(preset.sunColor);sun.ambient.intensity=preset.ambient;sun.sun.position.x=key==='sunset'?-35:-25;sun.sun.position.y=key==='sunset'?30:55;renderer.shadowMap.needsUpdate=true;}
  scene.fog=preset.fog?new THREE.FogExp2(preset.fog,key==='rain'?.012:.005):null;
 }
 select();
 return {select,state:()=>({key:selected,...rain.state(),flames:fire?36:0,...ambience.PRESETS[selected]}),update(time,camera,focus){
  lamps.update(time,ambience.PRESETS[selected]);lava?.update(time);
  const p=focus??{x:0,y:0,z:0},seconds=time/1000;
  if(scene.background?.isCubeTexture)scene.backgroundIntensity=1;
  rain.update(time,camera,p);
  if(fire){for(const shader of fireShaders)shader.uniforms.weatherTime.value=seconds;for(let i=0;i<36;i++){const n=i*4,x=p.x+(seeds[n]-.5)*25,z=p.z+(seeds[n+1]-.5)*34,y=p.y+1.3+seeds[n+2]*5+Math.sin(seconds*.8+i)*.4;position.set(x+Math.sin(seconds*.35+i)*.25,y,z);const size=.28+seeds[n+3]*.55;scale.set(size,size*1.5,1);matrix.compose(position,camera.quaternion,scale);fire.setMatrixAt(i,matrix);}fire.instanceMatrix.needsUpdate=true;}
 },dispose(){rain.dispose();lava?.dispose();lamps.dispose();badge.remove();scene.background=originalBackground;for(const cube of cubes.values())cube.dispose();scene.fog=priorFog;scene.backgroundBlurriness=priorBlur;if(priorRotation&&scene.backgroundRotation)scene.backgroundRotation.copy(priorRotation);scene.backgroundIntensity=priorTint;for(const o of objects){scene.remove(o);o.geometry.dispose();o.material.dispose();}fireShaders.clear();fireMap?.dispose();dayNight.setAtmosphere(null);}};
}
