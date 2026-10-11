// X3's native bone tracks are keyed at 30 fps. Interpolate between keys.
export function createSwordAnimation(THREE,model){
 const nodes=model.skeleton,matrices=nodes.map(()=>new THREE.Matrix4()),byName=new Map(nodes.map((n,i)=>[n.name,i]));
 const p=new THREE.Vector3(),s=new THREE.Vector3(),q=new THREE.Quaternion(),a=new THREE.Quaternion(),b=new THREE.Quaternion();
 function sample(track,frame,fallback){if(!track?.length)return fallback;const i=Math.min(track.length-1,Math.floor(frame)),lo=track[i],hi=track[Math.min(i+1,track.length-1)],t=Math.max(0,Math.min(1,(frame-lo[0])/(hi[0]-lo[0]||1)));return lo.slice(1).map((v,j)=>v+(hi[j+1]-v)*t);}
 function pose(frame){
  nodes.forEach((node,i)=>{const n=node.native;if(!n){matrices[i].identity();return;}
   matrices[i].fromArray(n.matrix);matrices[i].decompose(p,q,s);
   p.fromArray(sample(n.translation,frame,p.toArray()));s.fromArray(sample(n.scale,frame,s.toArray()));
   if(n.rotation?.length){const j=Math.min(n.rotation.length-1,Math.floor(frame)),lo=n.rotation[j],hi=n.rotation[Math.min(j+1,n.rotation.length-1)];a.fromArray(lo.slice(1)).normalize();b.fromArray(hi.slice(1)).normalize();q.copy(a).slerp(b,Math.max(0,Math.min(1,(frame-lo[0])/(hi[0]-lo[0]||1))));}
   matrices[i].compose(p,q,s);if(n.parent!==undefined)matrices[i].premultiply(matrices[n.parent]);
  });
 }
 const v=new THREE.Vector3(),sum=new THREE.Vector3(),grip=new THREE.Vector3();
 return {draw(frame,parts){pose(Math.max(0,Math.min(44,frame)));grip.setFromMatrixPosition(matrices[byName.get('Frame21_XYZ')]);for(const part of parts){const skin=part.skin;if(!skin)continue;
  const bones=skin.bones.map((name,i)=>new THREE.Matrix4().multiplyMatrices(matrices[byName.get(name)],new THREE.Matrix4().fromArray(skin.bind[i]))),attribute=part.geometry.getAttribute('position');
  for(let i=0;i<skin.positions.length;i++){sum.set(0,0,0);for(let j=0;j<skin.weights[i].length;j++){v.fromArray(skin.positions[i]).applyMatrix4(bones[skin.joints[i][j]]);sum.addScaledVector(v,skin.weights[i][j]);}attribute.setXYZ(i,-(sum.x-grip.x),sum.y,sum.z-grip.z);}
  attribute.needsUpdate=true;part.geometry.computeBoundingSphere();
 }}};
}
