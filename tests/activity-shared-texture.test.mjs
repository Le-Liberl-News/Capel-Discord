import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {shareTexture} from '../activity/shared-texture.mjs';
test('a shared texture copy keeps its own framing without marking the sheet for a new upload',()=>{
 const sheet=new THREE.Texture({width:1344,height:1150});sheet.needsUpdate=true;const uploaded=sheet.source.version;
 const copy=shareTexture(sheet);copy.offset.set(.5,.25);
 assert.equal(sheet.source.version,uploaded);assert.equal(copy.source,sheet.source);assert.ok(copy.version>0);assert.equal(sheet.offset.x,0);
 const plain=sheet.clone();assert.ok(plain.source.version>uploaded,'three.js clone() would re-upload the sheet');
});
