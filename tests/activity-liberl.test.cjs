const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'../activity/assets/sky/liberl'),layout=JSON.parse(fs.readFileSync(path.join(root,'layout.json'),'utf8')),gltf=JSON.parse(fs.readFileSync(path.join(root,'terrain.gltf'),'utf8'));
test('Bose and Rolent share a connected graph of 45 native exterior maps',()=>{
 assert.equal(layout.regions.length,45);const ids=new Set(layout.regions.map(r=>r.id));assert.equal(ids.size,45);assert.ok(ids.has('t1100')&&ids.has('t1101')&&ids.has('t0100')&&ids.has('t0500'));
 const visited=new Set(['t1101']);for(let n=0;n<45;n++)for(const edge of layout.joins){if(visited.has(edge.a))visited.add(edge.b);if(visited.has(edge.b))visited.add(edge.a);}assert.equal(visited.size,45);
 assert.equal(ids.has('t1131'),false);assert.equal(ids.has('t1201'),false);
});
test('every native exterior is instantiated once at its recorded position and original scale',()=>{
 assert.equal(gltf.scenes[0].nodes.length,45);const names=new Set();for(const id of gltf.scenes[0].nodes){const node=gltf.nodes[id],region=layout.regions.find(r=>r.id===node.name);assert.ok(region);assert.equal(names.has(node.name),false);names.add(node.name);assert.deepEqual(node.translation,region.position);assert.equal(node.scale,undefined);assert.equal(node.rotation,undefined);assert.ok(gltf.meshes[node.mesh].primitives.length>0);}
});
test('the packed terrain has valid accessors, textures and explicit portal gaps',()=>{
 const bytes=fs.statSync(path.join(root,'terrain.bin')).size;assert.equal(bytes,gltf.buffers[0].byteLength);for(const a of gltf.accessors){const view=gltf.bufferViews[a.bufferView];assert.ok(view.byteOffset+view.byteLength<=bytes);assert.equal(view.byteOffset%4,0);assert.ok(a.count>0);}
 assert.equal(gltf.buffers.length,2);const textures=fs.readFileSync(path.join(root,'textures.bin'));assert.equal(textures.length,gltf.buffers[1].byteLength);
 for(const image of gltf.images){assert.equal(image.uri,undefined);assert.equal(image.mimeType,'image/png');const view=gltf.bufferViews[image.bufferView];assert.equal(view.buffer,1);assert.ok(view.byteOffset+view.byteLength<=textures.length);assert.equal(textures.subarray(view.byteOffset,view.byteOffset+8).toString('hex'),'89504e470d0a1a0a');}
 for(const edge of layout.joins){const a=layout.regions.find(r=>r.id===edge.a),b=layout.regions.find(r=>r.id===edge.b),error=edge.gateA.map((v,i)=>a.position[i]+v-b.position[i]-edge.gateB[i]);assert.ok(error.every((v,i)=>Math.abs(v-edge.residual[i])<.0001));assert.equal(edge.status,Math.hypot(...edge.residual)>2?'portal-gap':'aligned');}
 assert.ok(layout.joins.some(e=>e.status==='portal-gap'));assert.ok(layout.statistics.triangles>10000);
});
