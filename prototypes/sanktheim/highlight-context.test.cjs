const test=require('node:test'),assert=require('node:assert/strict');
const {capture}=require('./highlight-context.cjs');
test('threshold context freezes nearby real actors and the damaging projectile',()=>{
 const pom={id:'pom-1',character:'Estelle',x:-36,y:0,z:0,hp:20,stage:1};
 const state={at:100,soldiers:[{id:'soldier-1',name:'Jules',x:-38,y:0,z:1,hp:30}],players:{a:{id:'player-a',online:true,character:'Julia',x:-40,y:0,z:0,hp:100}},enemies:[pom,{...pom,id:'far',x:-90}]};
 const hit={from:pom.id,kind:'shell',position:{x:-33.5,y:2,z:0},points:[{x:-36,y:4,z:0,t:0}]};
 const replay=capture(state,hit);pom.x=0;hit.position.y=90;hit.points[0].y=90;
 assert.equal(replay.actors.length,3);assert.equal(replay.actors.find(a=>a.id==='pom-1').x,-36);assert.equal(replay.hit.position.y,2);assert.equal(replay.hit.points[0].y,4);
 assert.equal(capture(state,null),null);
});
test('player combat scopes are converted back to native map coordinates',()=>{
 const replay=capture({at:0,soldiers:[],players:{a:{id:'player-a',online:true,pomControlled:true,character:'Estelle',x:-24,y:0,z:0,hp:10}},enemies:[]},{scale:2/3,from:'player-a',position:{x:-33.5,y:2,z:0},kind:'melee'});
 assert.equal(replay.actors[0].x,-36);assert.equal(replay.hit.position.x,-33.5);
});
