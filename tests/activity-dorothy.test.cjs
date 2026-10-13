const test=require('node:test'),assert=require('node:assert/strict');
const {resolvePhoto,photoStrength}=require('../activity/dorothy-photo.cjs');
const {movementFactor,immobilized}=require('../activity/combat-status.cjs');
const {createActivityCombat}=require('../utils/activityCombat');
test('photo only dazzles opponents ahead who face Dorothy and are not behind walls',()=>{
 const actor={id:'d',x:0,y:0,z:0,hp:500};
 const make=(id,x,z,heading,extra={})=>({id,x,y:0,z,hp:500,heading,...extra});
 const targets=[make('front',3,0,{dx:-1,dz:0}),make('back',-3,0,{dx:1,dz:0}),make('away',4,0,{dx:1,dz:0}),make('far',20,0,{dx:-1,dz:0}),make('wall',5,0,{dx:-1,dz:0}),make('ally',2,0,{dx:-1,dz:0}),make('monster',2,1,{dx:-2,dz:-1},{enemy:true})];
 const attack={actor:'d',origin:{x:0,z:0},aim:{x:14,z:0},impactAt:1000,hits:[]};
 resolvePhoto(attack,actor,new Map(targets.map(p=>[p.id,p])),(_a,t)=>t.id!=='ally',{sweep:(_a,b)=>b.x===5?{}:null});
 assert.deepEqual(attack.hits.map(h=>h.id),['front','monster']);
 for(const p of targets.filter(p=>p.photoFlash)){assert.equal(immobilized(p,2999),true);assert.equal(immobilized(p,3000),false);assert.equal(movementFactor(p,3000),.7);assert.equal(movementFactor(p,7999),.7);assert.equal(movementFactor(p,8000),1);assert.equal(photoStrength(p.photoFlash,3000),1);assert.equal(photoStrength(p.photoFlash,5500),.5);assert.equal(photoStrength(p.photoFlash,8000),0);}
});
test('craft resolves once at the flash frame, including enemies, without dealing damage',()=>{
 let time=1000;const actor={id:'d',character:'Dorothy',x:0,y:0,z:0,hp:500},target={id:'m',enemy:true,x:3,y:0,z:0,hp:75,heading:{dx:-1,dz:0}};
 const room=new Map([[actor.id,actor],[target.id,target]]),grid={origin:{x:-20,z:-20},step:1,width:41,height:41,cells:Array(1681).fill(0)};
 const c=createActivityCombat({now:()=>time,grid});assert.equal(c.action(actor,{id:'photo',kind:'craft',aim:{x:14,y:0,z:0}},room).error,undefined);
 time=1499;c.tick(room);assert.equal(target.stunUntil,undefined);time=1500;c.tick(room);assert.equal(target.stunUntil,3500);assert.equal(target.hp,75);time=2000;c.tick(room);assert.equal(target.stunUntil,3500);
});
