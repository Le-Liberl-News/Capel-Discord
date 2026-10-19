import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import * as THREE from 'three';
import {nativeNodePoint,cs2Blend} from '../activity/native-cs2-effects.mjs';
const root=path.resolve('activity/assets/sky'),definition=JSON.parse(fs.readFileSync(path.join(root,'combat/cs2/flame-effects.json'))),pack=JSON.parse(fs.readFileSync(path.join(root,definition.pack)));
test('Flame Slash uses the actual Rean S-craft effect slots and native mesh and textures',()=>{
 assert.equal(definition.nativeName,'Azure Flame Slash');assert.equal(definition.function,'AniBtlSCraft00');assert.equal(definition.sampleFps,30);assert.equal(definition.model.id,'E_EFOBJ038');
 const sword=definition.scriptCalls.find(c=>c.op==='play'&&c.slot===139);assert.equal(sword.node,'R_arm_point:NODE_EFFECT02');assert.deepEqual(sword.scale,[1,1,1]);
 for(const [id,effect]of Object.entries(pack.effects)){assert.equal(effect.source,'battle/'+id+'.eff');assert.match(effect.sha256,/^[0-9a-f]{64}$/);assert.equal(effect.frames.length,121);for(const frame of effect.frames)for(const node of frame){assert.equal(node.length,25);assert.ok(node.every(Number.isFinite));assert.ok(effect.segments[node[0]]);}}
 for(const file of Object.values(pack.textures))assert.ok(fs.existsSync(path.join(root,file)),file);
 assert.ok(pack.effects.scre01_1.segments.some(s=>s.texture==='E_EFOBJ038'&&s.faces.length>200),'native curved slash mesh was imported');
});
test('native effect geometry retains UV crops and every emitted node has a renderable texture',()=>{
 for(const effect of Object.values(pack.effects))for(const s of effect.segments){if(s.texture)assert.ok(pack.textures[s.texture]);for(const face of s.faces){assert.ok([3,4].includes(face.length));for(const vertex of face){assert.equal(vertex.length,5);assert.ok(vertex.every(Number.isFinite));}}}
});
test('CS2 row-vector rotation is applied before nonuniform animated scale',()=>{
 const n=[0,0,10,20,30,0,1,0,-1,0,0,0,0,1,2,3,4,1,1,1,1,0,0,0,0];assert.deepEqual(nativeNodePoint(n,[2,1,3]),[8,26,42]);
 const alpha=cs2Blend(THREE,1),add=cs2Blend(THREE,2),subtract=cs2Blend(THREE,4);assert.equal(alpha.blendSrc,THREE.OneFactor);assert.equal(alpha.blendDst,THREE.OneMinusSrcAlphaFactor);assert.equal(add.blendDst,THREE.OneFactor);assert.equal(subtract.blendEquation,THREE.ReverseSubtractEquation);
});
test('every native craft pose carries its own eight-direction weapon attachment',()=>{
 const cat=JSON.parse(fs.readFileSync(path.join(root,'combat/catalogue.json'))),source=JSON.parse(fs.readFileSync(path.join(root,'combat/cs2/source.json')));
 for(let i=5;i<=10;i++){const bank=cat.Rean.banks[i];assert.equal(bank.effectAnchors.length,bank.frames);assert.ok(bank.effectAnchors.every(a=>a.length===4&&a.flat().every(Number.isFinite)));}
 for(const clip of Object.values(source.flameSlash.clips))assert.match(clip.source,/^BTL_S_CRAFT01_/);
});

test('native two-axis planes retain area when the unused X or Y axis is zero',async()=>{
 const {horizonPlaneVertex}=await import('../activity/native-cs2-effects.mjs');const n=Array(17).fill(0);n[14]=0;n[15]=12;n[16]=1;
 assert.deepEqual(horizonPlaneVertex(n,[.5,.5,0],true),[0,6,.5]);n[14]=18;n[15]=0;assert.deepEqual(horizonPlaneVertex(n,[.5,.5,0],true),[9,0,.5]);n[15]=2;assert.deepEqual(horizonPlaneVertex(n,[.5,.5,0],false),[9,1,0]);
});

test('effect edge masking uses the surface bounds of cropped and repeating atlas panels',async()=>{
 const {effectSurfaceBounds}=await import('../activity/native-cs2-effects.mjs');assert.deepEqual(effectSurfaceBounds(pack.effects.scre01_1.segments[13]),[.25,.25,.25,.25]);assert.deepEqual(effectSurfaceBounds(pack.effects.scre01_1.segments[29]),[0,0,2,1]);
});

test('both Rean slash phases retain the actual non-planar native model rather than a billboard',()=>{
 const e=pack.effects.scre01_1;for(const index of [23,27]){const s=e.segments[index];assert.equal(s.texture,'E_EFOBJ038');assert.equal(s.procedural,true);assert.equal(s.faces.length,260);const z=s.faces.flat().map(v=>v[2]);assert.ok(Math.max(...z)-Math.min(...z)>4);}
 for(const frame of [4,63])assert.ok(e.frames[frame].some(n=>e.segments[n[0]].texture==='E_EFOBJ038'&&n[1]===0&&n[14]>1));
});
