const test=require('node:test'),assert=require('node:assert/strict');
const {createRhumertume,pomify,progress,parisParts,AVATAR_URL}=require('../utils/rhumertume');
const memory=(data=null)=>({load:()=>data&&JSON.parse(JSON.stringify(data)),save:d=>{data=JSON.parse(JSON.stringify(d));}});
const at=s=>Date.parse(s),HOUR=3600000;
test('words become pom with the stage, punctuation, links and mentions stay',()=>{
 assert.equal(pomify("Bonjour, l'ami ! Tu VIENS ? https://x.fr/a <@123> :smile:",1),"Pom, pom ! Pom POM ? https://x.fr/a <@123> :smile:");
 assert.equal(pomify('Rien ne change.',0),'Rien ne change.');
 assert.equal(pomify('un deux trois quatre',.5,(()=>{const r=[.1,.9,.2,.8];return()=>r.shift();})()),'pom deux pom quatre');
});
test('30% of the words after an hour, 60% after 3h30, all of them after 7 hours',()=>{
 assert.equal(progress(0),0);
 assert.ok(Math.abs(progress(HOUR)-.3)<1e-9);
 assert.ok(Math.abs(progress(3.5*HOUR)-.6)<1e-9);
 assert.equal(progress(7*HOUR),1);assert.equal(progress(40*HOUR),1);
 assert.ok(progress(2*HOUR)>.3&&progress(2*HOUR)<.6);
});
test('two characters of the day fall ill between 10:00 and 13:00, Paris time',async()=>{
 let now=at('2026-10-20T06:00:00Z');const said=[],store=memory();
 const r=createRhumertume({store,now:()=>now,random:()=>.5,charactersOfTheDay:async()=>['Nial','Pom','Tita'],announce:async t=>said.push(t)});
 await r.tick();assert.deepEqual(said,[]);
 const times=store.load().schedule['2026-10-20'];assert.equal(times.length,2);assert.ok(times.every(m=>m>=10*60&&m<=13*60));
 now=at('2026-10-20T11:00:00Z');await r.tick();await r.tick();
 assert.equal(said.length,2);assert.ok(said.every(t=>/symptômes préoccupants/.test(t)));
 assert.ok(!said.some(t=>t.startsWith('Pom ')));
 assert.equal(r.stage('Tita'),0);
 now+=7*HOUR;assert.equal(r.roleplay('Tita','Salut toi.').text,'Pom pom.');assert.equal(r.roleplay('Tita','x').avatarURL,AVATAR_URL);
});
test('a day picked up after 13:00 gets no draw, an earlier one only times still ahead',async()=>{
 let now=at('2026-10-21T12:30:00Z');const said=[],store=memory();
 const r=createRhumertume({store,now:()=>now,random:()=>0,charactersOfTheDay:async()=>['Kloe'],announce:async t=>said.push(t)});
 await r.tick();assert.deepEqual(said,[]);assert.deepEqual(store.load().schedule['2026-10-21'],[]);
 now=at('2026-10-22T09:30:00Z');await r.tick();
 assert.ok(store.load().schedule['2026-10-22'].every(m=>m>=11*60+30));
});
test('characters infected before keep the illness, everything is lifted on November 1st at midnight',async()=>{
 let now=at('2026-10-17T10:00:00Z');const said=[];
 const r=createRhumertume({store:memory({schedule:{},drawn:{},infected:{Nial:at('2026-10-14T19:08:00Z')}}),now:()=>now,random:()=>0,charactersOfTheDay:async()=>['Kloe'],announce:async t=>said.push(t)});
 assert.equal(r.stage('Nial'),1);assert.equal(r.roleplay('Nial','Bonjour').text,'Pom');
 now=at('2026-10-31T22:59:00Z');assert.equal(r.stage('Nial'),1);
 now=at('2026-10-31T23:00:00Z');assert.equal(r.stage('Nial'),null);assert.equal(r.roleplay('Nial','Bonjour'),null);
 now=at('2026-11-01T10:30:00Z');await r.tick();assert.deepEqual(said,[]);
 assert.deepEqual(parisParts(at('2026-10-31T22:59:00Z')),{date:'2026-10-31',minutes:23*60+59});
});
test('/pomifier is for administrators and announces the new case',async()=>{
 const said=[];const r=createRhumertume({store:memory(),now:()=>at('2026-10-18T15:00:00Z'),charactersOfTheDay:async()=>[],characterNames:['Kloe','Tita'],announce:async t=>said.push(t)});
 const call=(admin,personnage)=>{const out={};return {out,interaction:{commandName:'pomifier',isAutocomplete:()=>false,isChatInputCommand:()=>true,memberPermissions:{has:()=>admin},options:{getString:()=>personnage},
  reply:async m=>{out.reply=m.content;},deferReply:async()=>{},editReply:async m=>{out.reply=m.content;}}};};
 let c=call(false,'Kloe');assert.equal(await r.handle(c.interaction),true);assert.match(c.out.reply,/administrateurs/);assert.equal(r.stage('Kloe'),null);
 c=call(true,'Kloe');await r.handle(c.interaction);assert.equal(r.stage('Kloe'),0);assert.deepEqual(said,['Kloe semble développer des symptômes préoccupants.']);
 c=call(true,'Kloe');await r.handle(c.interaction);assert.match(c.out.reply,/déjà/);assert.equal(said.length,1);
 c=call(true,'Inconnu');await r.handle(c.interaction);assert.match(c.out.reply,/inconnu/);
 assert.equal(await r.handle({commandName:'duel'}),false);
});
