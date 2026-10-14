import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {versionAsset} from './scene-visibility.mjs';
import {loadNativeEffects} from './native-effects.mjs';
import {shareTexture} from './shared-texture.mjs';
const models=new Map();
// Both duel venues (Grancel "arena", Axis Pillar "axis") are parsed once and cloned for each duel.
function template(assets,version,venue='arena'){const url=new URL(venue+'/anterose.gltf',assets).href,key=url+'?'+version;if(!models.has(key)){const manager=new THREE.LoadingManager();manager.setURLModifier(url=>versionAsset(url,version));models.set(key,new GLTFLoader(manager).loadAsync(url).catch(error=>{models.delete(key);throw error;}));}return models.get(key);}
export async function loadArenaModel(assets,version,venue='arena'){const source=await template(assets,version,venue),scene=source.scene.clone(true);scene.traverse(object=>{if(!object.isMesh)return;object.geometry=object.geometry.clone();const clone=material=>{const copy=material.clone();for(const key of ['map','alphaMap','normalMap','emissiveMap','roughnessMap','metalnessMap'])if(copy[key]){copy[key]=shareTexture(copy[key]);}return copy;};object.material=Array.isArray(object.material)?object.material.map(clone):clone(object.material);});return {scene};}
export function preloadArena(assets,version){return Promise.all([template(assets,version,'arena'),template(assets,version,'axis'),loadNativeEffects(assets)]);}
