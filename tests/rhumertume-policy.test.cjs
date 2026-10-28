const test=require('node:test'),assert=require('node:assert/strict');
const {createRhumertume}=require('../utils/rhumertume');
const {weightedPick}=require('../utils/pomSelection.cjs');
const DATE='2026-10-22',at=s=>Date.parse(DATE+'T'+s+'+02:00');
const render={renderEvolution:async()=>({name:'evolution'}),renderBubble:async()=>({name:'bubble'}),renderBite:async()=>({name:'bite'}),avatarURL:()=>''};
function fixture({data={},players=['PlayerA','PlayerB'],names=['PlayerA','PlayerB','NPC1','NPC2','NPC3','NPC4','NPC5','NPC6'],random=()=>0,clock=at('11:00:00'),renderSiege,dailyCases=2}={}){
 let state=structuredClone({drawn:{[DATE]:['done1','done2']},siegeSchedule:{[DATE]:1379},...data}),time=clock;const said=[],sieges=[];
 const store={load:()=>structuredClone(state),save:s=>state=structuredClone(s)};
 const options={dailyCases,store,now:()=>time,random,charactersOfTheDay:async()=>players,characterNames:names,hasCraft:n=>n.startsWith('Player'),render,wait:async()=>{},announce:async text=>said.push(text),renderSiege:renderSiege??(async(d,a)=>{sieges.push({d,a});return {outcome:'devour',fallen:d.map(c=>c.character)};})};
 return {make:()=>createRhumertume(options),store,said,sieges,setTime:t=>time=t,players};
}
test('daily cases infect at most one assigned player and use healthy unassigned NPCs for the rest',async()=>{const f=fixture({data:{drawn:{},schedule:{[DATE]:[600,601]}}}),r=f.make();await r.tick();assert.ok(r.isInfected('PlayerA'));assert.ok(!r.isInfected('PlayerB'));assert.ok(r.isInfected('NPC1'));assert.deepEqual(f.store.load().playerCases[DATE],['PlayerA']);});
test('parallel requests, a bite and a restart cannot exceed the player quota; the next Paris day releases it',async()=>{const f=fixture(),r=f.make();const results=await Promise.allSettled([r.infect('PlayerA'),r.infect('PlayerB')]);assert.equal(results.filter(r=>r.status==='fulfilled').length,1);await r.infect('NPC1');await r.message('PlayerB','Bonjour');await r.message('NPC1','Pom');await r.after('NPC1');assert.ok(!r.isInfected('PlayerB'));await assert.rejects(f.make().infect('PlayerB'),/déjà été pomifié/);f.setTime(Date.parse('2026-10-23T00:01:00+02:00'));await f.make().infect('PlayerB');assert.ok(f.store.load().infected.PlayerB);});
test('legacy saved infections from today count, even without a new quota ledger',async()=>{const f=fixture({data:{infected:{PlayerA:at('10:00:00')},schedule:{[DATE]:[600,601]},drawn:{}}}),r=f.make();await r.tick();assert.ok(!r.isInfected('PlayerB'));assert.equal(r.infected().filter(n=>n.startsWith('NPC')).length,2);});
test('an unassigned infected NPC later claimed today consumes the remaining player allowance',async()=>{const f=fixture(),r=f.make();await r.infect('NPC1');f.players.push('NPC1');await assert.rejects(r.infect('PlayerA'),/déjà été pomifié/);});
test('craftless characters have six times the random weight without excluding crafted characters',()=>{let npc=0,crafted=0;for(let i=0;i<700;i++){const n=weightedPick(['Crafted','NPC'],n=>n==='Crafted',()=>i/700);if(n==='NPC')npc++;else crafted++;}assert.equal(npc,600);assert.equal(crafted,100);});
test('a daily ambush time is persisted between 10 and 23, survives restart and runs only once',async()=>{const infected={NPC1:at('09:59:00'),NPC2:at('09:59:00'),NPC3:at('09:59:00')},f=fixture({clock:at('09:00:00'),random:()=>.5,data:{infected,siegeSchedule:{}}});let r=f.make();await r.tick();assert.equal(f.store.load().siegeSchedule[DATE],990);assert.equal(f.sieges.length,0);r=f.make();f.setTime(at('16:29:00'));await r.tick();assert.equal(f.sieges.length,0);f.setTime(at('16:30:00'));await r.tick();assert.equal(f.sieges.length,1);assert.ok(f.sieges[0].d.every(p=>p.character.startsWith('NPC')));await r.tick();f.setTime(at('22:59:00'));await f.make().tick();assert.equal(f.sieges.length,1);});
test('stage-one poms can start the daily event; no evolution threshold postpones it',async()=>{const f=fixture({clock:at('10:00:00'),data:{infected:{NPC1:at('09:59:00'),NPC2:at('09:59:00'),NPC3:at('09:59:00')},siegeSchedule:{[DATE]:600}}});await f.make().tick();assert.equal(f.sieges.length,1);assert.ok(f.sieges[0].a.every(p=>p.stage===1));assert.equal(Object.keys(f.store.load().infected).length,6);});
test('the random ambush minute is strictly before 23h, including the final minute after a late restart',async()=>{for(const [clock,expected]of [[at('09:00:00'),1379],[at('22:59:00'),1379]]){const f=fixture({clock,random:()=>.999999,data:{siegeSchedule:{}}});await f.make().tick();assert.equal(f.store.load().siegeSchedule[DATE],expected);}const f=fixture({clock:at('23:00:00'),data:{siegeSchedule:{}}});await f.make().tick();assert.equal(f.store.load().siegeSchedule[DATE],undefined);});

test('three daily cases are scheduled from 10 to 13 while only one assigned player is infected',async()=>{const f=fixture({dailyCases:3,data:{drawn:{},schedule:{}}}),r=f.make();await r.tick();assert.equal(f.store.load().schedule[DATE].length,3);assert.equal(f.store.load().drawn[DATE].length,3);assert.equal(r.infected().filter(n=>n.startsWith('Player')).length,1);});

test('three daily draws plus bites and the ambush never exceed six natural infections, even after restart',async()=>{const names=Array.from({length:14},(_,i)=>'NPC'+(i+1)),f=fixture({players:[],names,dailyCases:3,data:{drawn:{},schedule:{},siegeSchedule:{[DATE]:600}}}),r=f.make();await r.tick();assert.equal(r.infected().length,6);assert.equal(f.store.load().drawn[DATE].length,3);await r.message('NPC7','Bonjour');await r.message('NPC4','Pom');await r.after('NPC4');assert.equal(r.infected().length,6);const restored=f.make();await restored.message('NPC7','Bonjour');await restored.message('NPC5','Pom');await restored.after('NPC5');await restored.tick();assert.equal(restored.infected().length,6);});

test('an existing four-case schedule is reduced to three without undoing an infection',async()=>{const f=fixture({dailyCases:3,data:{drawn:{},schedule:{[DATE]:[600,630,660,720]}}});await f.make().tick();assert.equal(f.store.load().schedule[DATE].length,3);assert.equal(f.store.load().drawn[DATE].length,3);});
test('an overdue ambush is recovered after 23 rather than silently dropped',async()=>{const f=fixture({clock:at('23:15:00'),data:{infected:{NPC1:at('09:00:00'),NPC2:at('09:00:00'),NPC3:at('09:00:00')},siegeSchedule:{[DATE]:1300}}});await f.make().tick();assert.equal(f.sieges.length,1);await f.make().tick();assert.equal(f.sieges.length,1);});

 test('production ambushes never load the GIF renderer',async()=>{
 const fs=require('node:fs');const source=fs.readFileSync(require.resolve('../utils/rhumertume'),'utf8');
 assert.ok(!source.includes("require('./pomSiege')"));assert.ok(!source.includes('pictures().renderEvolution('));
 });

test('quiet production RP preserves pom identity without automatic events or catch-up',async()=>{
 const data={infected:{NPC1:at('09:00:00'),NPC2:at('09:00:00'),NPC3:at('09:00:00')},pending:{NPC4:{cause:'pending',at:at('09:00:00')}},siegeSchedule:{[DATE]:600}};
 const store={load:()=>structuredClone(data),save:()=>{}};const said=[];
 const r=createRhumertume({automaticEvents:false,store,now:()=>at('20:00:00'),random:()=>0,charactersOfTheDay:async()=>[],characterNames:['NPC1','NPC2','NPC3','NPC4'],render,announce:async(...args)=>said.push(args)});
 await r.tick();await r.message('NPC1','!?!');await r.after('NPC1');await r.tick();
 assert.deepEqual(said,[]);assert.ok(r.isInfected('NPC1'));assert.ok(!r.isInfected('NPC4'));assert.ok(r.roleplay('NPC1','Bonjour').username.startsWith('Pom'));
 const fs=require('node:fs'),index=fs.readFileSync(require.resolve('../index'),'utf8');assert.ok(index.includes('automaticEvents:false'));assert.ok(!index.includes('rhumertume.tick()'));assert.ok(!index.includes('rhumertume.after(pseudo)'));assert.ok(!fs.readFileSync(require.resolve('../commands/anonyme'),'utf8').includes('rhumertume.after(pseudo)'));
});
