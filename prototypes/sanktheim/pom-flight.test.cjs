const test=require('node:test'),assert=require('node:assert/strict');
const {flyer,acceptFlight,grappled,HOOK}=require('./pom-flight.cjs');
const open={floor:()=>0,sweep:()=>null};
const rider=extra=>({id:'player-1',pomControlled:true,flying:true,kind:'daspi',x:-40,y:10,z:3,nativeSeen:0,movementSequence:0,movementCredit:0,...extra});
test('the vacuum riders fly; the other poms and the defenders walk',()=>{
 assert.ok(flyer(rider()));assert.ok(flyer(rider({flying:false,kind:'funebre'})));
 assert.ok(!flyer(rider({flying:false,kind:'pom'})));assert.ok(!flyer({pomControlled:false,flying:true}));
});
test('a rider flies fast, up and down, but not past the speed it has',()=>{
 const me=rider();acceptFlight(me,{x:-26,y:14,z:3,sequence:1},{geometry:open,scale:1,now:1000});
 assert.deepEqual([me.x,me.y],[-26,14]);
 const far=rider();acceptFlight(far,{x:40,y:10,z:3,sequence:1},{geometry:open,scale:1,now:1000});assert.equal(far.x,-40);   // 80 m in a second: refused
});
test('over the wall it may go; beyond it, the hook catches it and flings it back over the fields',()=>{
 const me=rider({x:-12});acceptFlight(me,{x:-5,y:10,z:3,sequence:1},{geometry:open,scale:1,now:1000});
 assert.ok(me.grapple);assert.equal(me.x,-12);
 let t=1000;while(grappled(me,t+=100));
 assert.equal(me.grapple,null);assert.equal(me.x,HOOK.thrown);assert.ok(t-1000>=HOOK.duration);
});
test('low through a breach, a rider goes in like the others',()=>{
 const me=rider({x:-9,y:2});acceptFlight(me,{x:-5,y:2,z:3,sequence:1},{geometry:open,scale:1,now:1000,walls:[{hp:0,z:0,width:10}]});
 assert.equal(me.grapple,undefined);assert.equal(me.x,-5);
});
