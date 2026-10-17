const {test}=require('node:test'),assert=require('node:assert/strict');
const {passiveCombatPose,spriteFloorClearance}=require('../activity/combat-sprite-frame.cjs'),{muzzlePosition}=require('../activity/gun-muzzle.cjs');
test('combat movement uses the exported native clip rate and death reaches its last pose without looping',()=>{
 const metadata={banks:{0:{frames:8},1:{frames:96,playbackFps:20},4:{frames:192,playbackFps:12}}};
 assert.deepEqual(passiveCombatPose(metadata,{moving:true,time:.25}),{bank:1,pose:5});
 assert.deepEqual(passiveCombatPose(metadata,{defeated:true,deathElapsed:1000}),{bank:4,pose:12});
 assert.deepEqual(passiveCombatPose(metadata,{defeated:true,deathElapsed:100000}),{bank:4,pose:23});
 assert.equal(spriteFloorClearance({floorClearance:[.02,.08]},1),.08);assert.equal(spriteFloorClearance({},1),0);
});
test('the muzzle remains in front of Carna in every aiming direction, independent of the camera',()=>{
 for(let angle=0;angle<Math.PI*2;angle+=.2){const d={x:Math.sin(angle),z:Math.cos(angle)},p={x:3,y:2,z:-4},m=muzzlePosition(p,d);assert.ok(Math.abs((m.x-p.x)*d.x+(m.z-p.z)*d.z-.9)<1e-9);assert.equal(m.y,3.05);}
});
