// World-space triangles of a static scene, bucketed on a ground grid so a ray only tests the
// triangles near it instead of every triangle of the map (three's Raycaster has no acceleration).
// Same rules as Mesh.raycast: material side, meshes whose raycast was disabled are skipped,
// mirrored transforms keep their front faces.
const CELL=4,BIG=64;
function createTriangleIndex(THREE,root){
  root.updateMatrixWorld(true);
  const positions=[],sides=[],big=[],cells=new Map();
  const a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3();
  // a mesh opts out of rays by getting its own raycast function (e.g. object.raycast=()=>{})
  const disabled=object=>Object.prototype.hasOwnProperty.call(object,'raycast');
  root.traverse(object=>{
    if(!object.isMesh||disabled(object))return;
    const geometry=object.geometry,position=geometry.attributes.position,index=geometry.index,materials=[].concat(object.material);
    if(!position)return;
    const mirrored=object.matrixWorld.determinant()<0;
    const groups=Array.isArray(object.material)&&geometry.groups.length?geometry.groups:[{start:0,count:index?index.count:position.count,materialIndex:0}];
    for(const group of groups){
      const material=materials[group.materialIndex??0];if(!material)continue;
      const side=material.side===THREE.DoubleSide?2:material.side===THREE.BackSide?1:0;
      const end=Math.min(group.start+group.count,index?index.count:position.count);
      for(let i=group.start;i+2<end;i+=3){
        const ia=index?index.getX(i):i,ib=index?index.getX(i+1):i+1,ic=index?index.getX(i+2):i+2;
        a.fromBufferAttribute(position,ia).applyMatrix4(object.matrixWorld);b.fromBufferAttribute(position,ib).applyMatrix4(object.matrixWorld);c.fromBufferAttribute(position,ic).applyMatrix4(object.matrixWorld);
        const [p,q]=mirrored?[c,b]:[b,c],t=positions.length/9;
        positions.push(a.x,a.y,a.z,p.x,p.y,p.z,q.x,q.y,q.z);sides.push(side);
        const x0=Math.floor(Math.min(a.x,b.x,c.x)/CELL),x1=Math.floor(Math.max(a.x,b.x,c.x)/CELL),z0=Math.floor(Math.min(a.z,b.z,c.z)/CELL),z1=Math.floor(Math.max(a.z,b.z,c.z)/CELL);
        if((x1-x0+1)*(z1-z0+1)>BIG){big.push(t);continue;}
        for(let x=x0;x<=x1;x++)for(let z=z0;z<=z1;z++){const key=x*65536+z;let list=cells.get(key);if(!list)cells.set(key,list=[]);list.push(t);}
      }
    }
  });
  const v=new Float64Array(positions),stamp=new Uint32Array(sides.length);let query=0;
  // closest hit of the ray (origin, unit direction) within [near, far], or null
  function raycast(origin,direction,near,far){
    query=(query+1)>>>0;if(!query){stamp.fill(0);query=1;}
    let best=null,bestT=far;
    const test=t=>{
      if(stamp[t]===query)return;stamp[t]=query;
      const o=t*9,ax=v[o],ay=v[o+1],az=v[o+2],e1x=v[o+3]-ax,e1y=v[o+4]-ay,e1z=v[o+5]-az,e2x=v[o+6]-ax,e2y=v[o+7]-ay,e2z=v[o+8]-az;
      // normal = e1 x e2; facing tells front (ray against the normal) from back
      const nx=e1y*e2z-e1z*e2y,ny=e1z*e2x-e1x*e2z,nz=e1x*e2y-e1y*e2x,ddn=direction.x*nx+direction.y*ny+direction.z*nz;
      if(ddn===0)return;const side=sides[t];if(side===0&&ddn>0||side===1&&ddn<0)return;
      const sign=ddn>0?1:-1,dx=origin.x-ax,dy=origin.y-ay,dz=origin.z-az;
      const b1=sign*(direction.x*(dy*e2z-dz*e2y)+direction.y*(dz*e2x-dx*e2z)+direction.z*(dx*e2y-dy*e2x));if(b1<0)return;
      const b2=sign*(direction.x*(e1y*dz-e1z*dy)+direction.y*(e1z*dx-e1x*dz)+direction.z*(e1x*dy-e1y*dx));if(b2<0||b1+b2>ddn*sign)return;
      const qdn=-sign*(dx*nx+dy*ny+dz*nz);if(qdn<0)return;const distance=qdn/(ddn*sign);
      if(distance<near||distance>bestT)return;
      bestT=distance;best={distance,normal:{x:nx,y:ny,z:nz},triangle:t};
    };
    for(const t of big)test(t);
    const ex=origin.x+direction.x*far,ez=origin.z+direction.z*far;
    const x0=Math.floor(Math.min(origin.x,ex)/CELL),x1=Math.floor(Math.max(origin.x,ex)/CELL),z0=Math.floor(Math.min(origin.z,ez)/CELL),z1=Math.floor(Math.max(origin.z,ez)/CELL);
    for(let x=x0;x<=x1;x++)for(let z=z0;z<=z1;z++){const list=cells.get(x*65536+z);if(list)for(const t of list)test(t);}
    if(!best)return null;
    const length=Math.hypot(best.normal.x,best.normal.y,best.normal.z)||1;
    best.normal={x:best.normal.x/length,y:best.normal.y/length,z:best.normal.z/length};
    best.point={x:origin.x+direction.x*best.distance,y:origin.y+direction.y*best.distance,z:origin.z+direction.z*best.distance};
    return best;
  }
  return {raycast,triangles:sides.length};
}
module.exports={createTriangleIndex};
