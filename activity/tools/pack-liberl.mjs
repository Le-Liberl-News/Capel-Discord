import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import * as THREE from 'three';
import {mergeGeometries,mergeVertices} from 'three/addons/utils/BufferGeometryUtils.js';
const output=path.resolve(process.argv[2]),cache=path.resolve(process.argv[3]);
const layout=JSON.parse(await fs.readFile(path.join(output,'layout.json'),'utf8'));
const gltf={asset:{version:'2.0',generator:'Liberl native exterior assembler'},extensionsUsed:['KHR_materials_unlit'],buffers:[{uri:'terrain.bin',byteLength:0}],bufferViews:[],accessors:[],images:[],textures:[],materials:[],meshes:[],nodes:[],scenes:[{nodes:[]}],scene:0};
const binary=[],textureCache=new Map();let byteLength=0,triangles=0;
await fs.mkdir(path.join(output,'textures'),{recursive:true});
function accessor(array,type,componentType,target){
 const bytes=Buffer.from(array.buffer,array.byteOffset,array.byteLength),padding=(4-byteLength%4)%4;
 if(padding){binary.push(Buffer.alloc(padding));byteLength+=padding;}
 const view=gltf.bufferViews.length;gltf.bufferViews.push({buffer:0,byteOffset:byteLength,byteLength:bytes.length,target});binary.push(bytes);byteLength+=bytes.length;
 const n={SCALAR:1,VEC2:2,VEC3:3,VEC4:4}[type],a={bufferView:view,componentType,type,count:array.length/n};
 if(type==='VEC3'){a.min=[Infinity,Infinity,Infinity];a.max=[-Infinity,-Infinity,-Infinity];for(let i=0;i<array.length;i++) {const c=i%3;a.min[c]=Math.min(a.min[c],array[i]);a.max[c]=Math.max(a.max[c],array[i]);}}
 if(componentType===5121&&type==='VEC4')a.normalized=true;
 const id=gltf.accessors.length;gltf.accessors.push(a);return id;
}
for(const region of layout.regions){
 const dir=path.join(cache,region.id),source=JSON.parse(await fs.readFile(path.join(dir,'anterose.gltf'),'utf8')),
 bytes=Buffer.from(source.buffers[0].uri.split(',')[1],'base64'),groups=new Map(),materials=new Map();
 async function material(index){
  if(materials.has(index))return materials.get(index);
  const m=structuredClone(source.materials[index]),info=m.pbrMetallicRoughness?.baseColorTexture;
  if(info){const t=source.textures[info.index],name=source.images[t.source].uri,data=await fs.readFile(path.join(dir,name)),hash=crypto.createHash('sha256').update(data).digest('hex');
   if(!textureCache.has(hash)){const uri='textures/'+name.replace('.png','-'+hash.slice(0,10)+'.png');await fs.writeFile(path.join(output,uri),data);const i=gltf.images.length;gltf.images.push({uri});gltf.textures.push({source:i});textureCache.set(hash,gltf.textures.length-1);}
   info.index=textureCache.get(hash);
  }
  m.name=region.id+'-'+index;const id=gltf.materials.length;gltf.materials.push(m);materials.set(index,id);return id;
 }
 function attribute(id){const a=source.accessors[id],v=source.bufferViews[a.bufferView],n={SCALAR:1,VEC2:2,VEC3:3,VEC4:4}[a.type],size={5121:1,5123:2,5125:4,5126:4}[a.componentType],values=new Float32Array(a.count*n);
  for(let i=0;i<a.count;i++)for(let j=0;j<n;j++){const offset=(v.byteOffset??0)+(a.byteOffset??0)+i*(v.byteStride??n*size)+j*size;let value=a.componentType===5126?bytes.readFloatLE(offset):a.componentType===5125?bytes.readUInt32LE(offset):a.componentType===5123?bytes.readUInt16LE(offset):bytes.readUInt8(offset);if(a.normalized)value/=a.componentType===5121?255:65535;values[i*n+j]=value;}
  return new THREE.BufferAttribute(values,n);
 }
 async function node(id,parent){const n=source.nodes[id],local=new THREE.Matrix4();if(n.matrix)local.fromArray(n.matrix);else local.compose(new THREE.Vector3().fromArray(n.translation??[0,0,0]),new THREE.Quaternion().fromArray(n.rotation??[0,0,0,1]),new THREE.Vector3().fromArray(n.scale??[1,1,1]));const matrix=parent.clone().multiply(local);
  if(n.mesh!==undefined)for(const p of source.meshes[n.mesh].primitives){const g=new THREE.BufferGeometry();g.setAttribute('position',attribute(p.attributes.POSITION));g.setAttribute('uv',attribute(p.attributes.TEXCOORD_0));g.setAttribute('color',attribute(p.attributes.COLOR_0));if(p.indices!==undefined){const ix=attribute(p.indices);g.setIndex(new THREE.BufferAttribute(Uint32Array.from(ix.array),1));}
   // Native primitives share complete vertex pools; retain only referenced vertices.
   if(g.index){const used=[...new Set(g.index.array)],remap=new Map(used.map((id,i)=>[id,i]));
    for(const [name,attribute]of Object.entries(g.attributes)){const values=new Float32Array(used.length*attribute.itemSize);used.forEach((old,i)=>{for(let c=0;c<attribute.itemSize;c++)values[i*attribute.itemSize+c]=attribute.array[old*attribute.itemSize+c];});g.setAttribute(name,new THREE.BufferAttribute(values,attribute.itemSize));}
    g.setIndex(new THREE.BufferAttribute(Uint32Array.from(g.index.array,id=>remap.get(id)),1));
   }
   g.applyMatrix4(matrix);
   // Baking mirrored native nodes requires reversing the original winding.
   if(matrix.determinant()<0&&g.index)for(let i=0;i<g.index.count;i+=3){const a=g.index.array;[a[i+1],a[i+2]]=[a[i+2],a[i+1]];}
   const m=await material(p.material);if(!groups.has(m))groups.set(m,[]);groups.get(m).push(g);
  }
  for(const child of n.children??[])await node(child,matrix);
 }
 for(const id of source.scenes[source.scene??0].nodes)await node(id,new THREE.Matrix4());
 const primitives=[],bounds=new THREE.Box3();
 for(const [m,geometries]of groups){const rawMerged=mergeGeometries(geometries);if(!rawMerged)throw Error('Cannot merge '+region.id);const merged=mergeVertices(rawMerged,1e-6);rawMerged.dispose();merged.computeBoundingBox();bounds.union(merged.boundingBox);
  const p={attributes:{POSITION:accessor(merged.attributes.position.array,'VEC3',5126,34962),TEXCOORD_0:accessor(merged.attributes.uv.array,'VEC2',5126,34962),COLOR_0:accessor(Uint8Array.from(merged.attributes.color.array,v=>Math.round(Math.max(0,Math.min(1,v))*255)),'VEC4',5121,34962)},material:m,indices:accessor(merged.attributes.position.count<=65535?Uint16Array.from(merged.index.array):Uint32Array.from(merged.index.array),'SCALAR',merged.attributes.position.count<=65535?5123:5125,34963)};
  primitives.push(p);triangles+=merged.index.count/3;merged.dispose();geometries.forEach(g=>g.dispose());
 }
 const mesh=gltf.meshes.length;gltf.meshes.push({name:region.id,primitives});const id=gltf.nodes.length;gltf.nodes.push({name:region.id,mesh,translation:region.position,extras:{region:region.id}});gltf.scenes[0].nodes.push(id);
 region.bounds={min:bounds.min.toArray(),max:bounds.max.toArray()};region.center=bounds.getCenter(new THREE.Vector3()).add(new THREE.Vector3().fromArray(region.position)).toArray();
 console.log(region.id,primitives.length,'materials');
}
gltf.buffers[0].byteLength=byteLength;layout.statistics={maps:layout.regions.length,triangles,textures:gltf.images.length,bytes:byteLength,drawCalls:gltf.meshes.reduce((s,m)=>s+m.primitives.length,0)};
const terrain=Buffer.concat(binary);layout.revision=crypto.createHash('sha256').update(terrain).digest('hex').slice(0,12);
await fs.writeFile(path.join(output,'terrain.bin'),terrain);await fs.writeFile(path.join(output,'terrain.gltf'),JSON.stringify(gltf));await fs.writeFile(path.join(output,'layout.json'),JSON.stringify(layout,null,2)+'\n');console.log(layout.statistics);
