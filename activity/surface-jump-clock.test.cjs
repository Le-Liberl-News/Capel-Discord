const {test}=require('node:test'),assert=require('node:assert/strict');
const {createClock}=require('./surface-jump-clock.cjs');
test('late replies do not rewind the shared jump clock',()=>{const c=createClock();assert.equal(c.offset(10000,10020),-20);assert.equal(c.offset(11000,15000),-20);assert.equal(c.offset(16000,16010),-10);assert.equal(c.offset(17000,19000),-10);});
test('preview time changes establish a new clock',()=>{const c=createClock();c.offset(1000,1000);assert.equal(c.offset(3601000,1000),3600000);assert.equal(c.offset(3602000,2200),3600000);});
test('confirmation of an older jump cannot replay it over a newer predicted jump',()=>{const {acceptsConfirmation}=require('./surface-jump-clock.cjs');const latest={id:'second',started:11250};assert.equal(acceptsConfirmation({id:'first',started:10000},latest),false);assert.equal(acceptsConfirmation({id:'second',started:11250},latest),true);});
