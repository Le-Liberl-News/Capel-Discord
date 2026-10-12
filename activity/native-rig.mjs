// Native X3 hierarchy and quaternion tracks; skinning runs on the GPU.
export function createNativeRig(THREE,data){
 const group=new THREE.Group(),reflection=new THREE.Matrix4().makeScale(-1,1,1),matrix=new THREE.Matrix4(),bones=data.nodes.map(()=>new THREE.Bone());
 for(const [i,node]of data.nodes.entries()){
  matrix.fromArray(node.matrix).premultiply(reflection).multiply(reflection);matrix.decompose(bones[i].position,bones[i].quaternion,bones[i].scale);
  bones[i].name=node.name;if(node.parent<0)group.add(bones[i]);else bones[node.parent].add(bones[i]);
 }
 group.updateMatrixWorld(true);
 const names=new Map(data.nodes.map((n,i)=>[n.name,bones[i]])),inverses=data.inverseBind.map(values=>new THREE.Matrix4().fromArray(values).premultiply(reflection).multiply(reflection)),skeleton=new THREE.Skeleton(data.bones.map(name=>names.get(name)),inverses);
 const indices=new THREE.Uint16BufferAttribute(data.indices.flat(),4),weights=new THREE.Float32BufferAttribute(data.weights.flat(),4),q=new THREE.Quaternion(),next=new THREE.Quaternion();
 function sample(keys,frame){let i=0;while(i+1<keys.length&&keys[i+1].frame<=frame)i++;const a=keys[i],b=keys[Math.min(keys.length-1,i+1)],t=b.frame>a.frame?(frame-a.frame)/(b.frame-a.frame):0;return {a:a.value,b:b.value,t};}
 return {group,skeleton,skin(geometry,material){geometry.setAttribute('skinIndex',indices);geometry.setAttribute('skinWeight',weights);const mesh=new THREE.SkinnedMesh(geometry,material);mesh.bind(skeleton,new THREE.Matrix4());mesh.frustumCulled=false;return mesh;},draw(ms){
  const frame=Math.max(0,ms)*data.fps/1000%Math.max(1,data.frames-1);
  for(const [i,node]of data.nodes.entries()){
   const bone=bones[i];
   for(const kind of ['translation','scale'])if(node[kind]?.length){const {a,b,t}=sample(node[kind],frame),v=a.map((n,j)=>n+(b[j]-n)*t);if(kind==='translation')bone.position.set(-v[0],v[1],v[2]);else bone.scale.set(...v);}
   if(node.rotation?.length){const {a,b,t}=sample(node.rotation,frame);q.set(a[0],-a[1],-a[2],a[3]).normalize();next.set(b[0],-b[1],-b[2],b[3]).normalize();bone.quaternion.copy(q.slerp(next,t));}
  }
  group.updateMatrixWorld(true);skeleton.update();
 },dispose(){skeleton.dispose();}};
}
