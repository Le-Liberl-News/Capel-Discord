const test=require('node:test'),assert=require('node:assert/strict');
const {createRhumertume,pomify,parisParts}=require('../utils/rhumertume');
const memory=()=>{let data=null;return {load:()=>data&&JSON.parse(JSON.stringify(data)),save:d=>{data=JSON.parse(JSON.stringify(d));}};};
const at=s=>Date.parse(s);
test('words become pom with the stage, punctuation, links and mentions stay',()=>{
 assert.equal(pomify("Bonjour, l'ami ! Tu VIENS ? https://x.fr/a <@123> :smile:",1),"Pom, pom ! Pom POM ? https://x.fr/a <@123> :smile:");
 assert.equal(pomify('Rien ne change.',0),'Rien ne change.');
 const half=pomify('un deux trois quatre',.5,(()=>{const r=[.1,.9,.2,.8];return()=>r.shift();})());
 assert.equal(half,'pom deux pom quatre');
});
test('first case at 21:08 today, Paris time, among the characters of the day, announced once',async()=>{
 let now=at('2026-10-13T19:07:00Z');const said=[],store=memory();
 const r=createRhumertume({store,now:()=>now,random:()=>0,charactersOfTheDay:async()=>['Nial','Pom','Tita'],announce:async t=>said.push(t)});
 await r.tick();assert.deepEqual(said,[]);
 now=at('2026-10-13T19:08:00Z');await r.tick();await r.tick();
 assert.deepEqual(said,['Nial semble développer des symptômes préoccupants.']);
 assert.equal(r.stage('Nial'),0);assert.equal(r.stage('Tita'),null);
 now+=36*3600000;assert.equal(r.stage('Nial'),.5);
 now+=48*3600000;assert.equal(r.stage('Nial'),1);assert.equal(r.roleplay('Nial','Salut toi.').text,'Pom pom.');
 // the illness stays with the character after a restart; the next day someone else is drawn
 const again=createRhumertume({store,now:()=>now,random:()=>0,charactersOfTheDay:async()=>['Nial','Tita'],announce:async t=>said.push(t)});
 assert.equal(again.stage('Nial'),1);
 now=at('2026-10-15T21:29:00Z');await again.tick();
 assert.equal(said.at(-1),'Tita semble développer des symptômes préoccupants.');
});
test('later days pick an unpredictable time and the event ends after October 31',async()=>{
 let now=at('2026-10-20T06:00:00Z');const said=[];
 const r=createRhumertume({store:memory(),now:()=>now,random:()=>.999,charactersOfTheDay:async()=>['Kloe'],announce:async t=>said.push(t)});
 await r.tick();assert.deepEqual(said,[]);
 now=at('2026-10-20T21:30:00Z');await r.tick();assert.equal(said.length,1);
 now=at('2026-11-01T00:30:00Z');assert.equal(r.stage('Kloe'),null);assert.equal(r.roleplay('Kloe','Salut'),null);await r.tick();assert.equal(said.length,1);
 assert.deepEqual(parisParts(at('2026-10-31T22:59:00Z')),{date:'2026-10-31',minutes:23*60+59});
});
test('in the activity a sick character is shown as a pom-tiron and cannot attack, cast or use crafts',async()=>{
 const {createActivityService}=require('../utils/activityService');
 const grid={origin:{x:0,z:0},step:.25,width:40,height:40,cells:Array(1600).fill(0),spawn:{x:2,y:0,z:2}};
 let clock=0;const sick=new Set(['Renne']);
 const service=createActivityService({grid,now:()=>clock,resolveCharacter:async()=>'Renne',combatEnabled:true,residents:{npcs:[],disablePoms:true},isPumpkin:c=>sick.has(c)});
 const a=await service.join({id:'a',channel:'arena'});let r=await service.state(a.activity_token);
 assert.equal(r.joueurs.find(p=>p.id==='a').pumpkin,true);assert.equal(r.character,'Renne');
 for(const kind of ['basic','art','craft']){clock+=5000;r=await service.state(a.activity_token,{x:2,z:2,action:{id:'k'+kind,type:'attack',kind,aim:{x:4,y:0,z:2}}});assert.equal(r.actionResult.error,'Pom ?');}
 sick.clear();clock+=5000;r=await service.state(a.activity_token,{x:2,z:2,action:{id:'ok',type:'attack',kind:'basic',aim:{x:4,y:0,z:2}}});assert.equal(r.actionResult.error,undefined);assert.equal(r.joueurs.find(p=>p.id==='a').pumpkin,undefined);
});
