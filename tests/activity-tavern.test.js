const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityTavern}=require('../utils/activityTavern');
const {createActivitySpeech}=require('../utils/activitySpeech');
const {texteAlcoolise}=require('../rpg/alcool');
const {createActivityLobby}=require('../utils/activityLobby');
const {BEER}=require('../activity/tavern-world.cjs');
test('three beers apply Capel alcohol status once; distance, map, rate and replay are enforced',async()=>{
 let time=1000,saves=0;const state={players:{}},posts=[],stats={default:{hpMax:100,PCMax:10}};
 const make=()=>createActivityTavern({state,stats,save:()=>saves++,announce:async p=>posts.push(p),now:()=>time});let tavern=make();
 const event={character:'Sieg',player:{...BEER,hp:100,id:'avatar'},channel:'map:anterose'};
 assert.ok((await tavern.drink({...event,id:'remote',player:{x:0,y:0,z:0,hp:100}})).error);
 assert.ok((await tavern.drink({...event,id:'wrong-map',channel:'map:arena'})).error);
 assert.ok((await tavern.drink({...event,id:'dead',player:{...BEER,hp:0}})).error);
 await tavern.drink({...event,id:'first'});await tavern.drink({...event,id:'first'});assert.equal(saves,1);
 assert.ok((await tavern.drink({...event,id:'fast'})).error);time+=4001;tavern=make();await tavern.drink({...event,id:'second'});time+=4001;await tavern.drink({...event,id:'third'});
 assert.equal(state.players.Sieg.statuts[0].nom,'alcoolise');assert.equal(posts.length,1);assert.doesNotMatch(JSON.stringify(posts),/avatar/);
 time+=4001;await tavern.drink({...event,id:'fourth'});assert.equal(posts.length,1);
 assert.match(texteAlcoolise('Bonjour',state.players.Sieg,()=>.9),/hic/);assert.match(texteAlcoolise('Bonjour',state.players.Sieg,()=>0),/hic/);assert.equal(texteAlcoolise('Bonjour',{statuts:[]}), 'Bonjour');
});
test('RP is opt-in on every map; game chat stays intact and only published text gains hiccups',async()=>{
 const posts=[],publish=createActivitySpeech({relay:{speech:async p=>posts.push(p)},players:()=>({Sieg:{statuts:[{nom:'alcoolise'}]}}),matchFor:()=>null});
 for(const map of ['anterose','rolent','arena']){await publish({map,character:'Sieg',text:'Bonjour',rp:false});await publish({map,character:'Sieg',text:'Bonjour'});await publish({map,character:'Sieg',text:'Bonjour',rp:true});}
 assert.equal(posts.length,3);assert.ok(posts.every(p=>/hic|hips/.test(p.text)));
 const grid={origin:{x:0,z:0},step:1,width:3,height:3,cells:Array(9).fill(0),spawn:{x:1,y:0,z:1}},lobby=createActivityLobby({grid,resolveCharacter:async()=> 'Sieg',onSay:publish});
 const session=await lobby.join({id:'test-user',channel:'dm'});const state=await lobby.state(session.activity_token,{x:1,y:.08,z:1,action:{id:'private-chat',type:'say',text:'Bonjour',rp:false}});
 await new Promise(r=>setImmediate(r));assert.equal(posts.length,3);assert.equal(state.messages.at(-1).text,'Bonjour');
});
test('a long gap resets the beer count',async()=>{let time=1000;const state={players:{}},t=createActivityTavern({state,stats:{default:{hpMax:100,PCMax:10}},save:()=>{},announce:async()=>{},now:()=>time});const e={character:'Estelle',player:{...BEER,hp:100},channel:'map:anterose'};await t.drink({...e,id:'one'});time+=600001;await t.drink({...e,id:'two'});assert.equal(state.players.Estelle.activityDrinks.count,1);assert.equal(state.players.Estelle.statuts.length,0);});

test('authenticated drink actions use the server character and are not relayed as chat',async()=>{const state={players:{}},posts=[],t=createActivityTavern({state,stats:{default:{hpMax:100,PCMax:10}},save:()=>{},announce:async()=>{}}),grid={origin:{x:BEER.x,z:BEER.z},step:1,width:3,height:3,cells:Array(9).fill(1.5),spawn:{x:BEER.x,y:1.5,z:BEER.z}};const lobby=createActivityLobby({grid,resolveCharacter:async()=> 'Estelle',onDrink:e=>t.drink(e),onSay:e=>posts.push(e)});const s=await lobby.join({id:'private',channel:'dm'});const packet={x:BEER.x,y:1.5,z:BEER.z,action:{id:'drink-auth',type:'drink',character:'Joshua'}};const result=await lobby.state(s.activity_token,packet);await lobby.state(s.activity_token,packet);assert.equal(state.players.Estelle.activityDrinks.count,1);assert.equal(state.players.Joshua,undefined);assert.equal(posts.length,0);assert.equal(result.messages.at(-1).character,'Estelle');});
