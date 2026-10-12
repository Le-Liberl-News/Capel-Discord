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
 const board=createArenaBoard({client:{user:{id:'bot'},channels:{fetch:async()=>channel}},lobby:{isConnected:id=>connected.has(id),matchFor:()=>null},duels:{match:async p=>pairs.push(p)},ranking:{settle:async()=>{},rows:()=>[]},assigned:async()=>Array.from({length:30},(_,i)=>({user:'secret-'+i,name:'Character '+i})),store:{load:()=>saved,save:s=>saved=s},render:async()=>Buffer.from("image")});
 await board.refresh();await board.refresh();assert.equal(sends,1);assert.equal(payload.components.length,2);assert.equal(JSON.stringify(payload).includes('secret-'),false);assert.equal(permissions[1][1].SendMessages,false);
 const interaction=id=>({isButton:()=>true,customId:'arena:queue',user:{id},launchActivity:async()=>{},reply:async()=>{}});
 await board.handle(interaction('one'));await board.handle(interaction('two'));await board.tick();assert.equal(pairs.length,0);connected.add('one');connected.add('two');await Promise.all([board.tick(),board.tick()]);assert.deepEqual(pairs,[['one','two']]);
});
const {createActivityDuels}=require('../utils/activityDuels');
test('dashboard challenge sends only opponent an anonymous DM; blocked DMs cancel invitation',async()=>{
 const sent=[],cancelled=[];let fail=false,joined=0,launched=0;
 const lobby={matchFor:()=>null,prepareDuel(){},createDuel(){},cancelDuel:id=>cancelled.push(id),duelStatus:()=>({accepted:false}),isConnected:()=>true,joinDuel(){joined++;},acceptDuel:()=>false};
 const client={users:{fetch:async id=>({send:async payload=>{if(fail)throw {code:50007};sent.push({id,payload});}})}};
 const duels=createActivityDuels({lobby,resolveCharacter:async id=>id==='private-a'?'Estelle':'Joshua',resolveOpponent:async()=> 'private-b',characterNames:['Estelle','Joshua']});
 const id=await duels.boardChallenge('private-a','Joshua',client);assert.equal(sent.length,1);assert.equal(sent[0].id,'private-b');assert.equal(sent[0].payload.content,"Estelle te d\u00e9fie dans l'ar\u00e8ne de Grancel.");assert.equal(JSON.stringify(sent[0].payload).includes('private-'),false);
 await duels.handle({isButton:()=>true,customId:'activity:'+id,user:{id:'private-b'},channel:{isDMBased:()=>true},client,reply:async()=>{},launchActivity:async()=>launched++});assert.equal(joined,1);assert.equal(launched,0);
 fail=true;await assert.rejects(duels.boardChallenge('private-a','Joshua',client),/MP/);assert.equal(cancelled.length,1);assert.equal(duels.pending('private-a').length,1);
});
test('challenge modal lists all opponents without account IDs and sends chosen challenge',async()=>{
 let modal,challenged,replies=[];const characters=Array.from({length:60},(_,n)=>({user:'secret-'+n,name:'Hero '+n}));
 const board=createArenaBoard({client:{},lobby:{},duels:{boardChallenge:async(user,name)=>{challenged={user,name};return 'duel:test';}},ranking:{},assigned:async()=>characters,store:{load:()=>null},render:async()=>Buffer.from('image')});
 await board.handle({isButton:()=>true,customId:'arena:choose',user:{id:'secret-0'},showModal:async m=>modal=m});
 assert.equal(modal.components.length,3);assert.equal(modal.components.flatMap(c=>c.component.options).length,59);assert.equal(JSON.stringify(modal).includes('secret-'),false);assert.equal(modal.components[0].type,18);
 const submit={isModalSubmit:()=>true,customId:'arena:challenge-modal',user:{id:'secret-0'},fields:{getStringSelectValues:id=>id==='opponent:0'?['Hero 1']:[]},deferReply:async()=>{},editReply:async p=>replies.push(p)};
 await board.handle(submit);assert.deepEqual(challenged,{user:'secret-0',name:'Hero 1'});assert.equal(replies[0].components[0].components[0].custom_id,'arena:accept:duel:test');
 challenged=null;await board.handle({...submit,deferred:true,fields:{getStringSelectValues:()=>['Hero 2']}});assert.equal(challenged,null);assert.match(replies.at(-1).content,/seul personnage/);
 challenged=null;await board.handle({...submit,deferred:true,fields:{getStringSelectValues:id=>id==='opponent:0'?['Unknown']:[]}});assert.equal(challenged,null);assert.match(replies.at(-1).content,/indisponible/);
});
test('console image renders portraits and scoreboard to PNG',async()=>{
 const buffer=await require('../utils/activityArenaBoardImage').renderArenaBoard({rows:[{name:'Estelle',wins:4,streak:2,lastWin:false,pb:8,delta:-6}],page:0,pages:1,queueSize:0});
 assert.equal(buffer.subarray(1,4).toString(),'PNG');assert.equal(buffer.readUInt32BE(16),1200);assert.ok(buffer.length>10000);
});

test('queue notifications show only the character, deduplicate clicks and disappear on leaving or matching',async()=>{
 const {createArenaBoard}=require('../utils/activityArenaBoard');let saved={},sent=[],removed=[],n=0;const msg={id:'board',edit:async()=>{}};
 const channel={guild:{roles:{everyone:{}}},permissionOverwrites:{edit:async()=>{}},messages:{fetch:async()=>msg,delete:async id=>removed.push(id)},send:async body=>{if(body.content){sent.push(body);return{id:'notice-'+(++n)};}return msg;}};
 const board=createArenaBoard({client:{user:{id:'bot'},channels:{fetch:async()=>channel}},lobby:{matchFor:()=>null,isConnected:()=>true},duels:{match:async()=>{}},ranking:{settle:async()=>{},rows:()=>[]},assigned:async()=>[],resolveCharacter:async id=>id==='private-a'?'Julia':'Estelle',store:{load:()=>saved,save:s=>saved=s},render:async()=>Buffer.from('image')});
 const i=(id,action)=>({isButton:()=>true,customId:'arena:'+action,user:{id},reply:async()=>{}});
 await board.handle(i('private-a','queue'));await board.handle(i('private-a','queue'));assert.equal(sent.length,1);assert.match(sent[0].content,/Julia/);assert.equal(JSON.stringify(sent).includes('private-'),false);assert.deepEqual(sent[0].allowedMentions.parse,[]);
 await board.handle(i('private-a','leave'));assert.deepEqual(removed,['notice-1']);await board.handle(i('private-a','queue'));await board.handle(i('private-b','queue'));await board.tick();assert.equal(removed.length,3);
});
