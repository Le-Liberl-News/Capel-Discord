const {createSiege,CONFIG,civil}=require('./core.cjs');
// Freeze a launch baseline: later infections add pressure instead of secretly raising wall HP.
function calibrate(cohort){const pop=[...new Map(cohort.map(p=>[p.character,p])).values()].slice(0,CONFIG.maxAlive);if(!pop.length)return null;
const start=civil('2026-10-21',12),sim=createSiege({now:()=>start,cohort:()=>pop,testFocus:'soldier-1'});sim.start();for(const s of sim._state.soldiers)s.hp=s.maxHP=1e9;
sim.testWave();sim.advance(start+CONFIG.waveDuration);const first=1e9-sim._state.soldiers[0].hp;sim.testWave();sim.advance(start+CONFIG.waveDuration*2);const second=1e9-sim._state.soldiers[0].hp-first;
const soldierHP=Math.max(1,Math.ceil(first+second*.5));const wallBaseDamage=20_000_000*.98/(2*5*(CONFIG.waveDuration/2000)*pop.length*1.5);
return {referencePopulation:pop.length,referenceCharacters:pop.map(p=>({character:p.character,stage:p.stage,flying:p.flying||p.kind==='daspi'})),soldierHP,wallBaseDamage,focusedSoldierFirstWave:first,focusedSoldierSecondWave:second,maxWallDamageAfterTwoDays:wallBaseDamage*1.5*pop.length*150*10,at:new Date().toISOString()};}
module.exports={calibrate};
