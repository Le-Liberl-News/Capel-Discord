import {test} from 'node:test';import assert from 'node:assert/strict';
import {createCombatSounds} from '../activity/combat-sounds.mjs';
test('sound volume follows the current listener and the action point, including explicit impact overrides',async()=>{
 const saved={fetch:globalThis.fetch,AudioContext:globalThis.AudioContext,addEventListener:globalThis.addEventListener,removeEventListener:globalThis.removeEventListener},gains=[],started=[];
 class AudioContext{state='running';destination={};createGain(){const node={gain:{value:0},connect(){},disconnect(){}};gains.push(node);return node;}decodeAudioData(){return Promise.resolve({});}createBufferSource(){return {connect(){},disconnect(){},start(){started.push(gains.at(-1).gain.value);},stop(){}};}close(){return Promise.resolve();}}
 globalThis.AudioContext=AudioContext;globalThis.fetch=async()=>({arrayBuffer:async()=>new ArrayBuffer(1)});globalThis.addEventListener=globalThis.removeEventListener=()=>{};
 let listener={x:0,y:0,z:0};const sounds=createCombatSounds(new URL('https://local.invalid/'),{listener:()=>listener,defaultPosition:()=>listener});const flush=async()=>{for(let i=0;i<12;i++)await Promise.resolve();};
 try{const actor=sounds.at(()=>({x:20,y:0,z:0}));actor.play('hit1',{gain:.8});await flush();assert.ok(started[0]>0&&started[0]<.8);listener={x:20,y:0,z:0};actor.play('hit1',{gain:.8});await flush();assert.equal(started[1],.8);actor.play('hit1',{position:{x:100,y:0,z:0}});await flush();assert.equal(started.length,2);sounds.play('jump');await flush();assert.equal(started[2],1);}finally{sounds.dispose();Object.assign(globalThis,saved);}
});
