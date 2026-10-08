// Share the actual GLTF surfaces with the authoritative projectile simulation.
const THREE = require("three");
function createActivityGeometry(gltf) {
  const bytes = Buffer.from(gltf.buffers[0].uri.split(",")[1], "base64"),
    scene = new THREE.Group();
  function attribute(id) {
    const a = gltf.accessors[id],
      v = gltf.bufferViews[a.bufferView],
      n = { SCALAR: 1, VEC3: 3 }[a.type],
      size = { 5123: 2, 5125: 4, 5126: 4 }[a.componentType],
      values = [];
    for (let i = 0; i < a.count; i++)
      for (let j = 0; j < n; j++) {
        const o =
          (v.byteOffset ?? 0) +
          (a.byteOffset ?? 0) +
          i * (v.byteStride ?? n * size) +
          j * size;
        values.push(
          a.componentType === 5126
            ? bytes.readFloatLE(o)
            : a.componentType === 5125
              ? bytes.readUInt32LE(o)
              : bytes.readUInt16LE(o),
        );
      }
    return a.type === "VEC3"
      ? new THREE.Float32BufferAttribute(values, 3)
      : new THREE.Uint32BufferAttribute(values, 1);
  }
  function node(id, parent) {
    const n = gltf.nodes[id],
      group = new THREE.Group();
    if (n.matrix) group.applyMatrix4(new THREE.Matrix4().fromArray(n.matrix));
    if (n.scale) group.scale.fromArray(n.scale);
    if (n.translation) group.position.fromArray(n.translation);
    if (n.rotation) group.quaternion.fromArray(n.rotation);
    parent.add(group);
    if (n.mesh !== undefined)
      for (const p of gltf.meshes[n.mesh].primitives) {
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", attribute(p.attributes.POSITION));
        if (p.indices !== undefined) g.setIndex(attribute(p.indices));
        g.computeBoundingSphere();
        group.add(
          new THREE.Mesh(
            g,
            new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }),
          ),
        );
      }
    for (const c of n.children ?? []) node(c, group);
  }
  for (const id of gltf.scenes[gltf.scene ?? 0].nodes) node(id, scene);
  scene.updateMatrixWorld(true);
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
    for (const [x, y, z] of [
      [0, 0, 0],
      [radius, 0, 0],
      [-radius, 0, 0],
      [0, radius, 0],
      [0, -radius, 0],
      [0, 0, radius],
      [0, 0, -radius],
    ]) {
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
module.exports = { createActivityGeometry };
