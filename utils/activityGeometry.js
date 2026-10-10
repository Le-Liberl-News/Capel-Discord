// Share the actual GLTF surfaces with the authoritative projectile simulation.
const THREE = require("three");
function createActivityScene(gltf,buffers=null) {
  const bytes = buffers?.[0]??Buffer.from(gltf.buffers[0].uri.split(",")[1], "base64"),
    scene = new THREE.Group();
  function attribute(id) {
    const a = gltf.accessors[id],
      v = gltf.bufferViews[a.bufferView],
      n = { SCALAR: 1, VEC3: 3 }[a.type],
      size = { 5123: 2, 5125: 4, 5126: 4 }[a.componentType],
      values = [];
    if(buffers&&!v.byteStride){const source=buffers[v.buffer],offset=source.byteOffset+(v.byteOffset??0)+(a.byteOffset??0),Type={5123:Uint16Array,5125:Uint32Array,5126:Float32Array}[a.componentType];return new THREE.BufferAttribute(new Type(source.buffer,offset,a.count*n),n);}
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
        if(gltf.materials?.[p.material]?.extras?.skyBackdrop)continue;
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
  return scene;
}
function createActivityGeometry(gltf,extras=[]) {
 const scene=createActivityScene(gltf);
 for(const {model,position,rotation=0}of extras){const object=createActivityScene(model);object.position.set(position.x,position.y,position.z);object.rotation.y=rotation;scene.add(object);}
 scene.updateMatrixWorld(true);
 return require("../activity/surface-collision.cjs").createSurfaceCollision(THREE,scene);
}
module.exports = { createActivityGeometry, createActivityScene };
