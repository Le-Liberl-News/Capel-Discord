const {test}=require('node:test');const assert=require('node:assert/strict');
const {createArenaRanking,reward,dayOf,createArenaCredit}=require('../utils/activityArenaRanking');
test('daily projection: wins, reduced streak, minimum, cap and duplicate result',async()=>{
 let saved;let time=Date.parse('2026-10-11T12:00:00Z');const credits=[];const r=createArenaRanking({store:{load:()=>saved,save:x=>saved=structuredClone(x)},now:()=>time,credit:async(...x)=>credits.push(x)});
 const win=(n,lose=false)=>r.record({captureId:String(n),at:time,winner:lose?'b':'a',loser:lose?'a':'b',winnerName:lose?'B':'A',loserName:lose?'A':'B'});
 for(let n=1;n<=4;n++)win(n);assert.equal(r.rows().find(x=>x.user==='a').pb,14);win(4);assert.equal(r.rows()[0].wins,4);
 win(5,true);assert.equal(r.rows().find(x=>x.user==='a').pb,8);assert.equal(r.rows().find(x=>x.user==='a').delta,-6);
 win(6,true);assert.equal(r.rows().find(x=>x.user==='a').pb,5);assert.equal(reward({wins:0,streak:0}),0);assert.equal(reward({wins:20,streak:20}),20);
 time+=86400000;await r.settle();await r.settle();assert.equal(credits.length,2);assert.equal(dayOf(Date.parse('2026-10-11T22:01:00Z')),'2026-10-12');
});
test('credit transaction increments only when award ledger insertion succeeds',async()=>{
 let inserted=false,increments=0;const connection={beginTransaction:async()=>{},commit:async()=>{},rollback:async()=>{},release(){},query:async sql=>{if(sql.startsWith('INSERT IGNORE')){const affectedRows=inserted?0:1;inserted=true;return[{affectedRows}];}increments++;return[{}];}};
 const credit=createArenaCredit({query:async()=>[],getConnection:async()=>connection});await credit('2026-10-11','private-id',8);await credit('2026-10-11','private-id',8);assert.equal(increments,1);
});
const {createArenaBoard}=require('../utils/activityArenaBoard');
test('board is anonymous, paginated, persistent and queue matches only connected players',async()=>{
 let saved,payload,sends=0;const connected=new Set(),pairs=[],permissions=[];
 const message={id:'board',edit:async p=>payload=p};const channel={guild:{roles:{everyone:{id:'everyone'}}},permissionOverwrites:{edit:async(...a)=>permissions.push(a)},messages:{fetch:async()=>message},send:async p=>{payload=p;sends++;return message;}};
 const board=createArenaBoard({client:{user:{id:'bot'},channels:{fetch:async()=>channel}},lobby:{isConnected:id=>connected.has(id),matchFor:()=>null},duels:{match:async p=>pairs.push(p)},ranking:{settle:async()=>{},rows:()=>[]},assigned:async()=>Array.from({length:30},(_,i)=>({user:'secret-'+i,name:'Character '+i})),store:{load:()=>saved,save:s=>saved=s}});
 await board.refresh();await board.refresh();assert.equal(sends,1);assert.equal(payload.components.length,4);assert.equal(JSON.stringify(payload).includes('secret-'),false);assert.equal(permissions[1][1].SendMessages,false);
 const interaction=id=>({isButton:()=>true,customId:'arena:queue',user:{id},launchActivity:async()=>{},reply:async()=>{}});
 await board.handle(interaction('one'));await board.handle(interaction('two'));await board.tick();assert.equal(pairs.length,0);connected.add('one');connected.add('two');await Promise.all([board.tick(),board.tick()]);assert.deepEqual(pairs,[['one','two']]);
});
