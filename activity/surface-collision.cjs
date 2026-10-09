// Identical surface sweeps for server impacts and local launch prediction.
function createSurfaceCollision(THREE, scene) {
  const ray = new THREE.Raycaster();
  function sweep(from, to, radius = 0.25) {
    const start = new THREE.Vector3(from.x, from.y, from.z),
      direction = new THREE.Vector3(
        to.x - from.x,
        to.y - from.y,
        to.z - from.z,
      ),
      length = direction.length();
    if (length < 1e-8) return null;
    direction.divideScalar(length);
    ray.near = 0;
    ray.far = length;
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
      ray.set(start.clone().add(new THREE.Vector3(x, y, z)), direction);
      const hit = ray.intersectObject(scene, true)[0];
      if (!hit || (closest && hit.distance >= closest.distance)) continue;
      const normal = hit.face.normal
        .clone()
        .transformDirection(hit.object.matrixWorld);
      if (normal.dot(direction) > 0) normal.negate();
      closest = {
        distance: hit.distance,
        normal: { x: normal.x, y: normal.y, z: normal.z },
        point: {
          x: from.x + direction.x * Math.max(0, hit.distance - 0.005),
          y: from.y + direction.y * Math.max(0, hit.distance - 0.005),
          z: from.z + direction.z * Math.max(0, hit.distance - 0.005),
        },
      };
    }
    return closest;
  }
  function floor(x, z, ceiling = 10) {
    ray.near = 0;
    ray.far = 100;
    ray.set(new THREE.Vector3(x, ceiling, z), new THREE.Vector3(0, -1, 0));
    const hit = ray
      .intersectObject(scene, true)
      .find(
        (h) =>
          Math.abs(
            h.face.normal.clone().transformDirection(h.object.matrixWorld).y,
          ) > 0.65,
      );
    return hit?.point.y ?? null;
  }
  return { sweep, floor };
}
module.exports = { createSurfaceCollision };
