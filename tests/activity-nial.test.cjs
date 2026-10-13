const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityCombat}=require('../utils/activityCombat');
const {smokeDensity}=require('../activity/nial-smoke.cjs');
test('smoke hurts once per second, Nial every two seconds, and overlaps do not stack',()=>{
 let time=1000;const grid={origin:{x:-20,z:-20},step:1,width:41,height:41,cells:Array(1681).fill(0)};
 const n={id:'n',character:'Nial',x:0,y:0,z:0,hp:500},e={id:'e',character:'Mishy',enemy:true,x:3,y:0,z:0,hp:75},outside={id:'o',x:8,y:0,z:0,hp:500};const room=new Map([[n.id,n],[e.id,e],[outside.id,outside]]);
 const c=createActivityCombat({grid,now:()=>time});assert.equal(c.action(n,{id:'s1',kind:'craft',aim:n},room).error,undefined);c.tick(room);
 time=2000;c.tick(room);assert.equal(e.hp,74);assert.equal(n.hp,500);assert.ok(n.smokeHiddenUntil>time);
 time=3000;c.tick(room);assert.equal(e.hp,73);assert.equal(n.hp,499);assert.equal(outside.hp,500);
 time=11000;assert.equal(c.action(n,{id:'s2',kind:'craft',aim:n},room).error,undefined);c.tick(room);const hp=e.hp;time=12000;c.tick(room);assert.equal(e.hp,hp-1);
 n.x=10;time=13000;c.tick(room);assert.equal(n.smokeHiddenUntil,0);const left=n.hp;time=14000;c.tick(room);assert.equal(n.hp,left);
 time=31001;c.tick(room);const ended=e.hp;time=33000;c.tick(room);assert.equal(e.hp,ended);
});
test('smoke builds up, stays dense, then fades smoothly over six seconds',()=>{assert.equal(smokeDensity(0),0);assert.equal(smokeDensity(1000),.5);assert.equal(smokeDensity(2000),1);assert.equal(smokeDensity(14000),1);assert.equal(smokeDensity(17000),.5);assert.equal(smokeDensity(20000),0);});
