import test from 'node:test';
import assert from 'node:assert/strict';
import {unionAlphaBounds} from './gif-bounds.js';
test('crop includes faint alpha and opaque black, excludes transparent RGB',()=>{
 const pixels=new Uint8ClampedArray(4*3*4);
 pixels.set([255,255,255,0],0);pixels.set([0,0,0,255],(1*4+1)*4);pixels.set([255,0,0,1],(2*4+3)*4);
 assert.deepEqual(unionAlphaBounds(null,pixels,4,3),{left:1,top:1,right:3,bottom:2});
});
test('all frames share bounds, empty frames preserve the previous crop',()=>{
 const a=new Uint8ClampedArray(4*3*4);a[3]=255;
 const first=unionAlphaBounds(null,a,4,3),b=new Uint8ClampedArray(a.length);b[(2*4+3)*4+3]=255;
 const combined=unionAlphaBounds(first,b,4,3);assert.deepEqual(combined,{left:0,top:0,right:3,bottom:2});
 assert.deepEqual(unionAlphaBounds(combined,new Uint8ClampedArray(a.length),4,3),combined);
 assert.equal(unionAlphaBounds(null,new Uint8ClampedArray(a.length),4,3),null);
});
