const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {compileScene,walkAt}=require('../activity/scene-script.cjs');
const grid={origin:{x:0,z:0},step:1,width:10,height:10,cells:Array(100).fill(0),spawn:{x:1,y:0,z:1}};
test('text scenes schedule concurrent actions, interpolate walks and reject unknown commands',()=>{
 const scene=compileScene('fade in 2 0\nwalk player 0 0 1 0 0 3 3\nwait 3\nsay ray "Salut !"\nwait 7');
 assert.equal(scene.duration,10000);assert.equal(scene.events.at(-1).at,3000);assert.equal(walkAt(scene,'player',1500).position.z,2);assert.equal(walkAt(scene,'player',4000).moving,false);
 assert.throws(()=>compileScene('eval "bad"'),/ligne 1/);assert.throws(()=>compileScene('wait -2'),/durée/);
});
