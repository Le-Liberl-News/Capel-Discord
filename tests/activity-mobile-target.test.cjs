const test=require('node:test'),assert=require('node:assert/strict'),{canLockTarget,followTarget}=require('../activity/mobile-target.cjs');
const enemy={hp:500,enemy:true,position:{x:4,y:0,z:0}},player={hp:500,teamId:'blue'};
test('mobile locking selects living opponents, not Poms, spectators, allies or scenery',()=>{
 assert.ok(canLockTarget('enemy',enemy,'self',true));assert.ok(canLockTarget('foe',player,'self',false,'red'));
 for(const [id,a,tower,team]of [['self',player,false],['world:pom:0',enemy,false],['dead',{...enemy,dead:true},true],['spectator',{...player,spectator:true},false],['ally',player,true],['ally',player,false,'blue'],['npc',{...player,npc:true},false],['prop',{...player,prop:'barrel'},false]])assert.equal(canLockTarget(id,a,'self',tower,team),false,id);
 assert.equal(canLockTarget('gone',undefined,'self',false),false);
});
test('camera lock follows the chosen opponent smoothly through wraparound without changing position',()=>{
 const origin={x:0,y:0,z:0},target={x:4,y:0,z:0};let yaw=0,pitch=.7;
 for(let i=0;i<30;i++)({yaw,pitch}=followTarget(yaw,pitch,origin,target,1/30));assert.ok(Math.abs(yaw+Math.PI/2)<.001);assert.equal(pitch,.7);assert.deepEqual(origin,{x:0,y:0,z:0});
 const wrapped=followTarget(Math.PI-.01,.7,origin,{x:.01,y:0,z:-10},.03);assert.ok(Math.abs(wrapped.yaw-(Math.PI-.01))<.05);
 const fps=followTarget(0,0,origin,{x:0,y:5,z:4},.1,true);assert.ok(fps.pitch<0);
});


test('mobile scene taps select enemies, clear on scenery and preserve Pom throwing priority',()=>{
 const source=require('fs').readFileSync('activity/sky-scene.mjs','utf8'),body=source.match(/function mobileTap\(event\)\{([\s\S]*?)\n  \}/)[1],calls=[],environment={poms:[]};
 const make=new Function('environment','pickMobileTarget','click',`const connected=true,localId='self',touchArmed=false,combatCamera=true,health={hp:500,spectator:false},movementAllowed=true,craftTarget=false;let mobileTargetId=null;function tap(event){${body}};return {tap,target:()=>mobileTargetId};`);
 const scene=make(environment,event=>event.enemy??null,event=>calls.push(event));
 scene.tap({enemy:'foe-1'});assert.equal(scene.target(),'foe-1');scene.tap({enemy:'foe-2'});assert.equal(scene.target(),'foe-2');scene.tap({});assert.equal(scene.target(),null);assert.equal(calls.length,0);
 environment.poms=[{owner:'self'}];scene.tap({enemy:'foe-1'});assert.equal(calls.length,1);assert.equal(scene.target(),null);
});
