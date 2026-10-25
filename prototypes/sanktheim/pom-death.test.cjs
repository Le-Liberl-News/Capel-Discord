const test=require('node:test'),assert=require('node:assert/strict');
const {deathPose}=require('./pom-death.cjs');
test('pom death tips over smoothly and drains the health bar to an empty persistent frame',()=>{const fresh=deathPose(0,.8),middle=deathPose(200,.8),settled=deathPose(900,.8);assert.equal(fresh.progress,0);assert.equal(fresh.hp,.8);assert.ok(middle.progress>0&&middle.progress<1);assert.ok(middle.hp>0&&middle.hp<fresh.hp);assert.equal(settled.progress,1);assert.equal(settled.hp,0);assert.equal(deathPose(3600000,.8).hp,0);});
