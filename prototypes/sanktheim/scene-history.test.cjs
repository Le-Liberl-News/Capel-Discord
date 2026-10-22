const test=require('node:test'),assert=require('node:assert/strict');
const {createSiege,civil,CONFIG}=require('./core.cjs');
const {capture}=require('./highlight-context.cjs'),{createSceneHistory}=require('./scene-history.cjs'),{sample,camera}=require('./scene-playback.cjs');
function fixture(){const start=civil('2026-10-22',14),siege=createSiege({now:()=>start,cohort:()=>[{character:'Estelle',stage:1}]});siege.start();return {start,siege};}
test('full scene history freezes props and actors without recursive event replays',async()=>{
 const {start,siege}=fixture();siege.join('player-test','Julia','Julia');siege._state.barricades.push({id:'b',x:-40,y:0,z:4,hp:5});
 const history=createSceneHistory({siege,now:()=>start+30000});history.record();const wall=siege._state.walls[0];
 siege._state.at=start+500;siege._damageWall(wall,wall.maxHP*.06,{from:'pom-test',kind:'melee',position:{x:-28.5,y:2,z:19}});history.record();const event=siege.outbox().find(e=>e.type==='threshold');
 assert.equal(event.replay.scene.barricades[0].hp,5);siege._state.barricades[0].hp=0;
 for(let t=1000;t<=20000;t+=250){siege._state.at=start+t;history.record();}
 const clip=await history.clip(event);assert.ok(clip.frames.some(f=>f.state.at===start));assert.equal(clip.frames[0].state.barricades[0].hp,5);assert.ok(clip.frames.every(f=>f.state.events.every(e=>!e.replay)));assert.ok(siege.snapshot().events.every(e=>!e.replay));
});
test('recorded projectile stays visible before impact and camera follows the exact damaging projectile',async()=>{
 const {start,siege}=fixture(),position={x:-34.2,y:3,z:6},shell={id:'shell-real',from:'pom-test',at:start,points:require('./catapult.cjs').path({x:-55,y:2,z:6},position)};
 siege._state.shells.push(shell);const history=createSceneHistory({siege,now:()=>start+10000});history.record();siege._state.at=start+1900;shell.done=true;siege._damageWall(siege._state.walls[1],CONFIG.wallHP*.06,{from:'pom-test',kind:'shell',position,projectile:shell});history.record();
 const clip=await history.clip(siege.outbox().find(e=>e.type==='threshold'));assert.equal(clip.event.projectileId,'shell-real');const flight=sample(clip,start+1000);assert.equal(flight.state.shells[0].done,false);assert.equal(sample(clip,start+2000).state.shells[0].done,true);
 const p=require('./catapult.cjs').at(shell,start+1000),c=camera(clip,start+1000);assert.ok(Math.abs(c.target.x-p.x*2/3)<1e-8);assert.ok(Math.abs(c.target.y-p.y*2/3-.3)<1e-8);
});
test('both player camps respawn in five seconds while AI poms retain their twenty seconds',()=>{
 const {start,siege}=fixture();siege.testWave();siege.advance(start+300);const ally=siege.join('player-ally'),pom=siege.join('player-pom');pom.pomControlled=true;pom.stage=1;pom.kind='pom';
 for(const p of [ally,pom]){p.hp=0;siege.recordDeath(p,null);assert.equal(p.respawnAt-siege._state.at,CONFIG.playerRespawn);}
 const ai=siege._state.enemies[0];ai.hp=0;siege.recordDeath(ai,null);assert.equal(ai.respawnAt-siege._state.at,CONFIG.respawn);
});
