import * as THREE from "three";
import fs from "node:fs/promises";
const root = new URL("../assets/sky/", import.meta.url),
  gltf = JSON.parse(await fs.readFile(new URL("anterose.gltf", root), "utf8")),
  bytes = Buffer.from(gltf.buffers[0].uri.split(",")[1], "base64"),
  scene = new THREE.Group();
function attribute(index) {
  const accessor = gltf.accessors[index],
    view = gltf.bufferViews[accessor.bufferView],
    stride = view.byteStride ?? (accessor.type === "VEC3" ? 12 : 2),
    count = accessor.count,
    values = [];
  for (let i = 0; i < count; i++) {
    const offset = view.byteOffset + (accessor.byteOffset ?? 0) + i * stride;
    if (accessor.type === "VEC3")
      values.push(
        bytes.readFloatLE(offset),
        bytes.readFloatLE(offset + 4),
        bytes.readFloatLE(offset + 8),
      );
    else values.push(bytes.readUInt16LE(offset));
  }
  return accessor.type === "VEC3"
    ? new THREE.Float32BufferAttribute(values, 3)
    : new THREE.Uint16BufferAttribute(values, 1);
}
function node(index, parent) {
  const data = gltf.nodes[index],
    group = new THREE.Group();
  if (data.matrix)
    group.applyMatrix4(new THREE.Matrix4().fromArray(data.matrix));
  if (data.scale) group.scale.fromArray(data.scale);
  parent.add(group);
  if (data.mesh !== undefined)
    for (const primitive of gltf.meshes[data.mesh].primitives) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        attribute(primitive.attributes.POSITION),
      );
      geometry.setIndex(attribute(primitive.indices));
      group.add(
        new THREE.Mesh(
          geometry,
          new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }),
        ),
      );
    }
  for (const child of data.children ?? []) node(child, group);
}
for (const index of gltf.scenes[0].nodes) node(index, scene);
scene.updateMatrixWorld(true);
const step = 0.2,
  origin = { x: -12, z: -12 },
  width = 152,
  height = 162,
  cells = [],
  ray = new THREE.Raycaster();
for (let z = 0; z < height; z++)
  for (let x = 0; x < width; x++) {
    ray.set(
      new THREE.Vector3(origin.x + x * step, 10, origin.z + z * step),
      new THREE.Vector3(0, -1, 0),
    );
    const hits = ray.intersectObject(scene, true),
      top = hits.find(hit => hit.point.y >= -0.1 && hit.point.y <= 3.5 && Math.abs(hit.face.normal.y) > 0.7);
    cells.push(
      top &&
        top.point.y >= -0.1 &&
        top.point.y <= 3.5 &&
        Math.abs(top.face.normal.y) > 0.7
        ? Math.round(top.point.y * 1000) / 1000
        : null,
    );
  }
// Keep clearance from furniture, walls and drops; quarter-unit stair rises remain connected.
const expanded = cells.map((value, index) => {
  if (value === null) return null;
  const x = index % width,
    z = Math.floor(index / width);
  for (const [dx, dz] of [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ])
    if (
      x + dx < 0 ||
      z + dz < 0 ||
      x + dx >= width ||
      z + dz >= height ||
      (cells[(z + dz) * width + x + dx] === null || Math.abs(cells[(z + dz) * width + x + dx] - value) > 0.35)
    )
      return null;
  return value;
});
// Keep the connected restaurant floor; isolated tabletops are not walkable.
const seen = new Set(),
  groups = [];
for (let i = 0; i < expanded.length; i++) {
  if (expanded[i] === null || seen.has(i)) continue;
  const stack = [i],
    group = [];
  seen.add(i);
  while (stack.length) {
    const j = stack.pop();
    group.push(j);
    const x = j % width,
      z = Math.floor(j / width);
    for (const [dx, dz] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = x + dx,
        nz = z + dz,
        k = nz * width + nx;
      if (
        nx >= 0 &&
        nz >= 0 &&
        nx < width &&
        nz < height &&
        expanded[k] !== null &&
        !seen.has(k) &&
        Math.abs(expanded[j] - expanded[k]) <= 0.35
      ) {
        seen.add(k);
        stack.push(k);
      }
    }
  }
  groups.push(group);
}
const allowed = new Set(groups.sort((a, b) => b.length - a.length)[0]),
  navigable = expanded.map((y, i) => (allowed.has(i) ? y : null));
let start = -1,
  best = Infinity;
for (const i of allowed) {
  const x = origin.x + (i % width) * step,
    z = origin.z + Math.floor(i / width) * step,
    d = x * x + z * z;
  if (d < best) {
    best = d;
    start = i;
  }
}
const spawn = {
  x: origin.x + (start % width) * step,
  y: navigable[start],
  z: origin.z + Math.floor(start / width) * step,
};
await fs.writeFile(
  new URL("navigation.json", root),
  JSON.stringify({ origin, step, width, height, cells: navigable, spawn }),
);
console.log("Navigable cells:", allowed.size, spawn);
