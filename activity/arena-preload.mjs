import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {versionAsset} from './scene-visibility.mjs';
import {loadNativeEffects} from './native-effects.mjs';
const models=new Map();
function template(assets,version){const url=new URL('arena/anterose.gltf',assets).href,key=url+'?'+version;if(!models.has(key)){const manager=new THREE.LoadingManager();manager.setURLModifier(url=>versionAsset(url,version));models.set(key,new GLTFLoader(manager).loadAsync(url).catch(error=>{models.delete(key);throw error;}));}return models.get(key);}
export async function loadArenaModel(assets,version){const source=await template(assets,version),scene=source.scene.clone(true);scene.traverse(object=>{if(!object.isMesh)return;object.geometry=object.geometry.clone();const clone=material=>{const copy=material.clone();for(const key of ['map','alphaMap','normalMap','emissiveMap','roughnessMap','metalnessMap'])if(copy[key]){copy[key]=copy[key].clone();copy[key].needsUpdate=true;}return copy;};object.material=Array.isArray(object.material)?object.material.map(clone):clone(object.material);});return {scene};}
export function preloadArena(assets,version){return Promise.all([template(assets,version),loadNativeEffects(assets)]);}
