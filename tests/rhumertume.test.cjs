const test=require('node:test'),assert=require('node:assert/strict');
const {createRhumertume,pomify,pomifyFinal,progress,moods,parisParts}=require('../utils/rhumertume');
const memory=(data=null)=>({load:()=>data&&JSON.parse(JSON.stringify(data)),save:d=>{data=JSON.parse(JSON.stringify(d));}});
const at=s=>Date.parse(s),HOUR=3600000;
// pictures without canvas: their names tell what was drawn
const render={avatarURL:(c,l)=>`pom/${c}-${l}.png`,renderEvolution:async(c,f,t)=>({name:`evolution ${c} ${f}->${t}`}),renderBubble:async(text,l)=>({name:`bulle ${l}`,text})};
const names=['Kloe','Tita','Nial','Joshua'];
function setup({now,random=()=>.5,cases=['Tita'],data=null}){
 const said=[],store=memory(data);
 const r=createRhumertume({store,now,random,charactersOfTheDay:async()=>cases,characterNames:names,render,announce:async(text,files=[])=>said.push({text,files:files.map(f=>f.name)})});
 return {r,said,store};
}
test('words become pom with the stage, punctuation, links and mentions stay',()=>{
 assert.equal(pomify("Bonjour, l'ami ! Tu VIENS ? https://x.fr/a <@123> :smile:",1),"Pom, pom ! Pom POM ? https://x.fr/a <@123> :smile:");
 assert.equal(pomify('Rien ne change.',0),'Rien ne change.');
 assert.equal(pomify('un deux trois quatre',.5,(()=>{const r=[.1,.9,.2,.8];return()=>r.shift();})()),'pom deux pom quatre');
});
test('at the last stage one word in eight stays readable, with "...." here and there',()=>{
 const text='un deux trois quatre cinq six sept huit neuf dix onze douze treize quatorze quinze seize';
 const out=pomifyFinal(text,()=>.99).split(' ');
 assert.equal(out.length,16);assert.equal(out.filter(w=>w!=='pom').length,2);assert.equal(out[7],'huit');assert.equal(out[15],'seize');
 assert.match(pomifyFinal('un deux',()=>0),/\.\.\./);
});
test('30% of the words after an hour, 60% after 3h30, all of them after 7 hours',()=>{
 assert.equal(progress(0),0);
 assert.ok(Math.abs(progress(HOUR)-.3)<1e-9);
 assert.ok(Math.abs(progress(3.5*HOUR)-.6)<1e-9);
 assert.equal(progress(7*HOUR),1);assert.equal(progress(40*HOUR),1);
});
test('two characters of the day fall ill between 10:00 and 13:00, each with the evolution GIF',async()=>{
 let now=at('2026-10-20T06:00:00Z');
 const {r,said,store}=setup({now:()=>now,cases:['Nial','Pom','Tita']});
 await r.tick();assert.deepEqual(said,[]);
 const times=store.load().schedule['2026-10-20'];assert.equal(times.length,2);assert.ok(times.every(m=>m>=10*60&&m<=13*60));
 now=at('2026-10-20T11:00:00Z');await r.tick();await r.tick();
 assert.equal(said.length,2);assert.ok(said.every(s=>/symptômes préoccupants/.test(s.text)));
 assert.deepEqual(said.map(s=>s.files[0]).sort(),['evolution Nial 0->1','evolution Tita 0->1']);
});
test('a day picked up after 13:00 gets no draw, an earlier one only times still ahead',async()=>{
 let now=at('2026-10-21T12:30:00Z');
 const {r,said,store}=setup({now:()=>now,random:()=>0,cases:['Kloe']});
 await r.tick();assert.deepEqual(said,[]);assert.deepEqual(store.load().schedule['2026-10-21'],[]);
 now=at('2026-10-22T09:30:00Z');await r.tick();
 assert.ok(store.load().schedule['2026-10-22'].every(m=>m>=11*60+30));
});
test('PomX, PompomX from 3h30, PomdeterX from 7 hours, each step announced once like a Pokémon evolution',async()=>{
 let now=at('2026-10-25T09:00:00Z');
 const {r,said}=setup({now:()=>now});
 await r.infect('Tita');said.length=0;
 assert.equal(r.nameOf('Tita'),'PomTita');assert.equal(r.roleplay('Tita','Salut').avatarURL,'pom/Tita-1.png');
 now+=3.5*HOUR;await r.tick();await r.tick();
 assert.deepEqual(said,[{text:'Quoi ? PomTita évolue ?!',files:['evolution Tita 1->2']}]);
 assert.equal(r.nameOf('Tita'),'PompomTita');
 now+=3.5*HOUR;await r.tick();
 assert.deepEqual(said[1],{text:'Quoi ? PompomTita évolue ?!',files:['evolution Tita 2->3']});
 assert.equal(r.roleplay('Tita','Salut').username,'PomdeterTita');assert.equal(r.roleplay('Tita','x').avatarURL,'pom/Tita-3.png');
 await r.tick();assert.equal(said.length,2);
});
test('a pom speaks in a bubble, under its pom name; the healthy speak as usual',async()=>{
 let now=at('2026-10-25T09:00:00Z');
 const {r}=setup({now:()=>now});
 assert.equal(await r.message('Kloe','Bonjour'),null);
 await r.infect('Tita');now+=8*HOUR;
 const m=await r.message('Tita','Bonjour tout le monde');
 assert.equal(m.content,'');assert.equal(m.username,'PomdeterTita');assert.equal(m.avatarURL,'pom/Tita-3.png');
 assert.equal(m.files[0].name,'bulle 3');assert.match(m.files[0].text,/pom/i);
});
test('the gauges: capitals and "!" for rage, "?" and emojis for madness; pom, citrouille and full stops calm them',()=>{
 assert.ok(moods('JE VAIS TOUS VOUS MANGER !!!')[0]>=40);
 assert.ok(moods('Quoi ???? 🎃🎃 :smile:')[1]>=40);
 assert.ok(moods('pom pom citrouille. Calme.')[0]<0);
});
test('rage: the pom bites someone who spoke lately, who may catch the illness',async()=>{
 let now=at('2026-10-26T09:00:00Z');
 const {r,said}=setup({now:()=>now,random:()=>0});
 await r.infect('Tita');said.length=0;
 await r.message('Kloe','Salut Tita.');
 for(let i=0;i<3;i++){await r.message('Tita','ARRÊTE DE ME REGARDER !!!!!');await r.after('Tita');}
 assert.equal(said[0].text,'Pris·e de rage, PomTita mord Kloe !');
 assert.match(said[1].text,/Kloe semble développer des symptômes/);assert.deepEqual(said[1].files,['evolution Kloe 0->1']);
 assert.ok(r.isInfected('Kloe'));
 const before=said.length;await r.message('Tita','RAAAH !!!!!');await r.after('Tita');assert.equal(said.length,before);   // once an hour at most
});
test('madness: the pom hurts itself',async()=>{
 let now=at('2026-10-26T09:00:00Z');
 const {r,said}=setup({now:()=>now,random:()=>.99});
 await r.infect('Nial');said.length=0;now+=4*HOUR;
 for(let i=0;i<3;i++){await r.message('Nial','Hein ??? Quoi ??? 🎃🎃🎃🎃');await r.after('Nial');}
 assert.equal(said.length,1);assert.equal(said[0].text,'PompomNial se met à sautiller partout sans raison apparente.');
});
test('the sick stay sick after October 31, but nobody new falls ill',async()=>{
 let now=at('2026-10-31T10:00:00Z');
 const {r,said}=setup({now:()=>now,cases:['Kloe'],data:{schedule:{},drawn:{},infected:{Nial:at('2026-10-14T19:08:00Z')}}});
 assert.equal(r.level('Nial'),3);
 now=at('2026-11-02T11:00:00Z');await r.tick();
 assert.deepEqual(said,[]);   // infected before this version: no late evolution announcement either
 assert.equal(r.level('Nial'),3);assert.equal(r.isInfected('Kloe'),false);
 await assert.rejects(r.infect('Kloe'),/plus de nouvelles victimes/);
 assert.deepEqual(parisParts(at('2026-10-31T22:59:00Z')),{date:'2026-10-31',minutes:23*60+59});
});
test('/pomifier is for administrators and announces the new case',async()=>{
 const {r,said}=setup({now:()=>at('2026-10-18T15:00:00Z'),cases:[]});
 const call=(admin,personnage)=>{const out={};return {out,interaction:{commandName:'pomifier',isAutocomplete:()=>false,isChatInputCommand:()=>true,memberPermissions:{has:()=>admin},options:{getString:()=>personnage},
  reply:async m=>{out.reply=m.content;},deferReply:async()=>{},editReply:async m=>{out.reply=m.content;}}};};
 let c=call(false,'Kloe');assert.equal(await r.handle(c.interaction),true);assert.match(c.out.reply,/administrateurs/);assert.equal(r.stage('Kloe'),null);
 c=call(true,'Kloe');await r.handle(c.interaction);assert.equal(r.stage('Kloe'),0);assert.deepEqual(said.map(s=>s.text),['Kloe semble développer des symptômes préoccupants.']);
 c=call(true,'Kloe');await r.handle(c.interaction);assert.match(c.out.reply,/déjà/);assert.equal(said.length,1);
 c=call(true,'Inconnu');await r.handle(c.interaction);assert.match(c.out.reply,/inconnu/);
 assert.equal(await r.handle({commandName:'duel'}),false);
});