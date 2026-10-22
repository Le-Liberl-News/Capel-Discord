const test=require('node:test'),assert=require('node:assert/strict');
const {soldiersReport}=require('./report.cjs'),{createSiege,civil,CONFIG}=require('./core.cjs');
function fixture(){const at=civil('2026-10-21',12),s=createSiege({now:()=>at,cohort:()=>[{character:'Estelle',stage:1}]});s.start();s.testWave();return {s,at};}
test('wave reports omit the roster of unharmed soldiers and distinguish earlier deaths',()=>{
 assert.equal(soldiersReport([{name:'Jules',hp:100,status:'indemne'}]),'Tous les soldats ont survécu à cette vague.');
 assert.match(soldiersReport([{name:'Jules',hp:0,status:'tombé au combat',diedThisWave:true},{name:'Hector',hp:100,status:'indemne'}]),/Jules est tombé au combat.*\nLes autres soldats ont survécu/);
 assert.match(soldiersReport([{name:'Jules',hp:0,status:'tombé au combat',diedThisWave:false}]),/Aucun autre soldat/);
});

test('wave recap reports each wall damage for this wave and its remaining integrity, with saved baselines',()=>{
 const {s,at}=fixture();s._state.wave.wallStart['west-wall']=s._state.walls[0].maxHP*.8;s._state.walls[0].hp=s._state.walls[0].maxHP*.75;
 for(const g of s._state.soldiers)g.nextAttack=Infinity;s._state.wave.spawnAt=Infinity;s.advance(at+CONFIG.waveDuration);
 const event=s.outbox().find(e=>e.type==='wave-end');assert.equal(event.summary.walls.length,5);assert.equal(event.summary.walls[0].waveDamagePercent,5);assert.equal(event.summary.walls[0].damagePercent,25);assert.match(event.text,/Muraille ouest : −5,00 % cette vague · 75,00 % restants/);
 for(const wall of s._state.walls)assert.ok(event.text.includes(wall.name+' : '));
 const {wallsReport}=require('./report.cjs');assert.match(wallsReport([{name:'Porte',damagePercent:10,remainingPercent:90,waveDamagePercent:null}]),/10,00 % endommagée.*90,00 % restants/);
});
test('each five pom kills advances a personal streak once; dying resets it and dead projectiles cannot continue it',()=>{
 const {s}=fixture(),p=s.join('player-streak','Julia','Julia');let seq=0;
 function kill(){const target={id:'pom-streak-'+seq++,pomCharacter:'Estelle',stage:1,hp:0,x:0,y:0,z:0};s.registerDamage({actor:p.id,target,amount:150,lethal:true});s.registerDamage({actor:p.id,target,amount:150,lethal:true});}
 for(let i=0;i<10;i++)kill();assert.equal(p.killStreak,10);assert.deepEqual(s.snapshot().events.filter(e=>e.type==='killstreak').map(e=>e.kills),[5,10]);
 p.hp=0;s.recordDeath(p);kill();assert.equal(p.killStreak,0);p.hp=p.maxHP;for(let i=0;i<5;i++)kill();assert.equal(p.killStreak,5);assert.equal(p.bestKillStreak,10);assert.deepEqual(s.snapshot().events.filter(e=>e.type==='killstreak').map(e=>e.kills),[5,10,5]);
});
test('a living soldier below ten percent queues one critical GIF notice until recovered',()=>{
 const {s,at}=fixture(),p=s.join('player-pom','Estelle','Estelle'),g=s._state.soldiers[0];g.hp=g.maxHP*.09;
 for(let i=0;i<3;i++)s.registerDamage({actor:p.id,target:g,amount:1,lethal:false});let notices=s.outbox().filter(e=>e.type==='soldier-critical');assert.equal(notices.length,1);assert.equal(notices[0].hp,g.hp);assert.equal(notices[0].maxHP,g.maxHP);assert.equal(notices[0].name,g.name);
 s._state.wave=null;g.transit=null;g.hp=g.maxHP*.2;g.sleeping=true;g.role='rest';s.advance(at+250);assert.equal(g.criticalAnnounced,false);s.testWave();g.hp=g.maxHP*.08;s.registerDamage({actor:p.id,target:g,amount:1,lethal:false});assert.equal(s.outbox().filter(e=>e.type==='soldier-critical').length,2);
});
