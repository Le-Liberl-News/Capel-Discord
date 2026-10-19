// Identical surface sweeps for server impacts and local launch prediction.
// Rays go through a triangle index of the scene (triangle-index.cjs): a Pom in flight sweeps
// 120 times a second, and testing every triangle of the map each time froze the game.
const {createTriangleIndex}=require('./triangle-index.cjs');
function createSurfaceCollision(THREE, scene) {
  let index=null,signature=null;
  // rebuilt when a mesh is added, removed or stops taking rays
  function current(){
    let count=0,sum=0;
    scene.traverse(o=>{if(o.isMesh&&!Object.prototype.hasOwnProperty.call(o,'raycast')){count++;sum+=o.geometry.id*7+o.id;}});
    const next=count+':'+sum;
    if(next!==signature){signature=next;index=createTriangleIndex(THREE,scene);}
    return index;
  }
  function sweep(from, to, radius = 0.25) {
    const dx=to.x-from.x,dy=to.y-from.y,dz=to.z-from.z,length=Math.hypot(dx,dy,dz);
    if (length < 1e-8) return null;
    const direction={x:dx/length,y:dy/length,z:dz/length},triangles=current();
    let closest = null;
    for (const [x, y, z] of (radius > 0 ? [
      [0, 0, 0],
      [radius, 0, 0],
      [-radius, 0, 0],
      [0, radius, 0],
      [0, -radius, 0],
      [0, 0, radius],
      [0, 0, -radius],
    ] : [[0,0,0]])) {
      const hit=triangles.raycast({x:from.x+x,y:from.y+y,z:from.z+z},direction,0,length);
      if (!hit || (closest && hit.distance >= closest.distance)) continue;
      const normal={...hit.normal};
      if (normal.x*direction.x+normal.y*direction.y+normal.z*direction.z > 0) {normal.x=-normal.x;normal.y=-normal.y;normal.z=-normal.z;}
      closest = {
        distance: hit.distance,
        normal,
        surfacePoint:{x:from.x+x+direction.x*hit.distance,y:from.y+y+direction.y*hit.distance,z:from.z+z+direction.z*hit.distance},
        point: {
          x: from.x + direction.x * Math.max(0, hit.distance - 0.005),
          y: from.y + direction.y * Math.max(0, hit.distance - 0.005),
          z: from.z + direction.z * Math.max(0, hit.distance - 0.005),
        },
      };
    }
    return closest;
  }
  // highest walkable surface (normal steeper than 0.65) below `ceiling`
  function floor(x, z, ceiling = 10) {
    const triangles=current(),down={x:0,y:-1,z:0};let near=0;
    for(let tries=0;tries<64;tries++){
      const hit=triangles.raycast({x,y:ceiling,z},down,near,100);
      if(!hit)return null;
      if(Math.abs(hit.normal.y)>0.65)return hit.point.y;
      near=hit.distance+1e-6;
    }
    return null;
  }
  return { sweep, floor };
}
module.exports = { createSurfaceCollision };
