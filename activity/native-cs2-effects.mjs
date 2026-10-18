import {setBloomEmission} from './map-bloom.mjs';

// EffSimulation/EffShapeGeometry export from ED8Editor, sampled at 30 Hz.
// All positions, colours, UV crops, spawn chains and procedural faces come from the .eff files.
export function nativeNodePoint(node,point){
 const x=point[0],y=point[1],z=point[2];
 return [(x*node[5]+y*node[8]+z*node[11])*node[14]+node[2],(x*node[6]+y*node[9]+z*node[12])*node[15]+node[3],(x*node[7]+y*node[10]+z*node[13])*node[16]+node[4]];
}
export function cs2Blend(THREE,mode){return {blending:THREE.CustomBlending,blendEquation:mode===4?THREE.ReverseSubtractEquation:THREE.AddEquation,blendSrc:THREE.OneFactor,blendDst:mode===2||mode===4?THREE.OneFactor:THREE.OneMinusSrcAlphaFactor,blendEquationAlpha:THREE.AddEquation,blendSrcAlpha:THREE.OneFactor,blendDstAlpha:THREE.OneMinusSrcAlphaFactor};}
function material(THREE,map,mode,bloom=.7){
 const m=new THREE.MeshBasicMaterial({map,transparent:true,depthWrite:false,side:THREE.DoubleSide,toneMapped:false,...cs2Blend(THREE,mode)});
 if(mode===2)setBloomEmission(m,bloom);
 m.onBeforeCompile=shader=>{
  shader.vertexShader='attribute vec4 nativeMultiply;attribute vec4 nativeAdd;varying vec4 vNativeMultiply;varying vec4 vNativeAdd;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvNativeMultiply=nativeMultiply;vNativeAdd=nativeAdd;');
  shader.fragmentShader='varying vec4 vNativeMultiply;varying vec4 vNativeAdd;\n'+shader.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
   diffuseColor.rgb=diffuse*(sampledDiffuseColor.rgb*sampledDiffuseColor.a*vNativeMultiply.rgb*vNativeMultiply.a+vNativeAdd.rgb*sampledDiffuseColor.a);
   diffuseColor.a=opacity*sampledDiffuseColor.a*vNativeMultiply.a;`);
 };
 m.customProgramCacheKey=()=> 'cs2-native-effect-premultiplied-v1';return m;
}
const TRIANGLE=[0,1,2],QUAD=[0,1,2,0,2,3],triangles=face=>face.length===3?TRIANGLE:QUAD;
export async function loadCs2Effects(THREE,assets,file){
 const response=await fetch(new URL(file,assets));if(!response.ok)throw Error('Effets CS2 introuvables');const data=file.endsWith('.vfxpack')?await new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).json():await response.json(),textures=new Map();
 await Promise.all(Object.entries(data.textures).map(async([name,file])=>{const texture=await new THREE.TextureLoader().loadAsync(new URL(file,assets).href);texture.colorSpace=THREE.SRGBColorSpace;texture.flipY=false;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.minFilter=THREE.LinearMipmapLinearFilter;texture.magFilter=THREE.LinearFilter;textures.set(name,texture);}));
 function create(id,scene,options={}){
  const effect=data.effects[id];if(!effect)throw Error('Effet CS2 inconnu: '+id);
  const buckets=new Map(),keys=effect.segments.map(s=>s.texture+':'+s.blend+':'+s.priority),max=new Map();
  for(const frame of effect.frames){const count=new Map();for(const node of frame){const s=effect.segments[node[0]],key=keys[node[0]],n=s.faces.reduce((sum,f)=>sum+triangles(f).length,0);count.set(key,(count.get(key)??0)+n);}for(const [key,n]of count)max.set(key,Math.max(max.get(key)??0,n));}
  for(const [key,capacity]of max){const s=effect.segments[keys.indexOf(key)],geometry=new THREE.BufferGeometry();for(const [attr,size]of [['position',3],['uv',2],['nativeMultiply',4],['nativeAdd',4]])geometry.setAttribute(attr,new THREE.BufferAttribute(new Float32Array(capacity*size),size).setUsage(THREE.DynamicDrawUsage));geometry.setDrawRange(0,0);const mesh=new THREE.Mesh(geometry,material(THREE,textures.get(s.texture),s.blend,options.bloom));mesh.frustumCulled=false;mesh.renderOrder=2+s.priority/256;mesh.visible=false;scene.add(mesh);buckets.set(key,{mesh,cursor:0});}
  const right=new THREE.Vector3(),up=new THREE.Vector3(),axis=new THREE.Vector3(),point=new THREE.Vector3(),center=new THREE.Vector3(),local=new THREE.Vector3();
  function draw(seconds,placement,camera,{opacity=1,scale=1,floorY=null}={}){
   for(const b of buckets.values()){b.cursor=0;b.mesh.visible=false;b.mesh.geometry.setDrawRange(0,0);}
   const frame=effect.frames[Math.floor(seconds*data.fps)];if(!frame||seconds<0)return;
   right.setFromMatrixColumn(camera.matrixWorld,0);up.setFromMatrixColumn(camera.matrixWorld,1);
   for(const n of frame){const s=effect.segments[n[0]];if(options.excludeTextures?.includes(s.texture))continue;const b=buckets.get(keys[n[0]]),g=b.mesh.geometry;
    const billboard=!!n[1]&&!s.procedural;let cr=1,sr=0;
    if(billboard){center.set(n[2],n[3],n[4]).applyMatrix4(placement);axis.set(n[5],n[6],n[7]).transformDirection(placement);const angle=Math.atan2(axis.dot(up),axis.dot(right));cr=Math.cos(angle);sr=Math.sin(angle);}
    for(const face of s.faces)for(const index of triangles(face)){const v=face[index];if(billboard){const x=v[0]*n[14]*scale,y=v[1]*n[15]*scale;point.copy(center).addScaledVector(right,x*cr-y*sr).addScaledVector(up,x*sr+y*cr);}else{const horizon=data.format==='horizon-vfx-1',x=v[0]*(horizon?n[14]:1),y=v[1]*(horizon?n[15]:1),z=v[2]*(horizon?n[16]:1);local.set((x*n[5]+y*n[8]+z*n[11])*(horizon?1:n[14])+n[2],(x*n[6]+y*n[9]+z*n[12])*(horizon?1:n[15])+n[3],(x*n[7]+y*n[10]+z*n[13])*(horizon?1:n[16])+n[4]);point.copy(local).applyMatrix4(placement);}
     if(floorY!==null&&point.y<floorY&&point.y-camera.position.y<-.03){const t=(floorY-point.y)/(point.y-camera.position.y);point.addScaledVector(local.copy(point).sub(camera.position),t);}
     const i=b.cursor++;g.attributes.position.setXYZ(i,point.x,point.y,point.z);g.attributes.uv.setXY(i,n.length>=29?n[25]+v[3]*n[27]:v[3],n.length>=29?n[26]+v[4]*n[28]:v[4]);g.attributes.nativeMultiply.setXYZW(i,n[17],n[18],n[19],n[20]*opacity);g.attributes.nativeAdd.setXYZW(i,n[21]*opacity,n[22]*opacity,n[23]*opacity,n[24]);
    }
   }
   for(const b of buckets.values())if(b.cursor){b.mesh.visible=true;b.mesh.geometry.setDrawRange(0,b.cursor);for(const attr of Object.values(b.mesh.geometry.attributes))attr.needsUpdate=true;}
  }
  return {draw,hide(){for(const b of buckets.values())b.mesh.visible=false;},stats:()=>({batches:buckets.size,vertices:[...buckets.values()].reduce((n,b)=>n+b.mesh.geometry.attributes.position.count,0)}),dispose(){for(const b of buckets.values()){scene.remove(b.mesh);b.mesh.geometry.dispose();b.mesh.material.dispose();}buckets.clear();}};
 }
 return {create,data,dispose(){for(const map of textures.values())map.dispose();textures.clear();}};
}
