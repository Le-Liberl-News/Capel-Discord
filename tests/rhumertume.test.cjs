const test=require('node:test'),assert=require('node:assert/strict');
const {createRhumertume,pomify,pomifyFinal,progress,moods,parisParts}=require('../utils/rhumertume');
const memory=(data=null)=>({load:()=>data&&JSON.parse(JSON.stringify(data)),save:d=>{data=JSON.parse(JSON.stringify(d));}});
const at=s=>Date.parse(s),HOUR=3600000;
// pictures without canvas: their names tell what was drawn
const render={avatarURL:(c,l)=>`pom/${c}-${l}.png`,renderEvolution:async(c,f,t)=>({name:`evolution ${c} ${f}->${t}`}),renderBubble:async(text,l)=>({name:`bulle ${l}`,text}),renderBite:async(c,l,v,vl)=>({name:`morsure ${c} ${l} ${v} ${vl}`})};
const names=['Kloe','Tita','Nial','Joshua'];
function setup({now,random=()=>.5,cases=['Tita'],data=null}){
 const today=parisParts(now()).date;const said=[],store=memory(data??{drawn:{[today]:['fixture-1','fixture-2']}});
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
test('one played character and one unassigned character fall ill in the daily window',async()=>{
 let now=at('2026-10-20T06:00:00Z');
 const {r,said,store}=setup({now:()=>now,cases:['Nial','Pom','Tita'],data:{}});
 await r.tick();assert.deepEqual(said,[]);
 const times=store.load().schedule['2026-10-20'];assert.equal(times.length,2);assert.ok(times.every(m=>m>=10*60&&m<=13*60));
 now=at('2026-10-20T11:00:00Z');await r.tick();await r.tick();
 assert.equal(said.length,2);assert.ok(said.every(s=>/symptômes préoccupants/.test(s.text)));
 assert.equal(said.filter(s=>/Nial semble|Tita semble/.test(s.text)).length,1);assert.equal(said.filter(s=>/Kloe semble|Joshua semble/.test(s.text)).length,1);
});
test('a day picked up after 13:00 gets no draw, an earlier one only times still ahead',async()=>{
 let now=at('2026-10-21T12:30:00Z');
 const {r,said,store}=setup({now:()=>now,random:()=>0,cases:['Kloe'],data:{}});
 await r.tick();assert.deepEqual(said,[]);assert.deepEqual(store.load().schedule['2026-10-21'],[]);
 now=at('2026-10-22T09:30:00Z');await r.tick();
 assert.ok(store.load().schedule['2026-10-22'].every(m=>m>=11*60+30));
});
test('PomX, PompomX from 3h30, PomdeterX from 7 hours, each step announced once like a Pokémon evolution',async()=>{
 let now=at('2026-10-25T09:00:00Z');
 const {r,said}=setup({now:()=>now});
 await r.infect('Tita');said.length=0;
 assert.equal(r.nameOf('Tita'),'Pomtita');assert.equal(r.roleplay('Tita','Salut').avatarURL,'pom/Tita-1.png');
 now+=3.5*HOUR;await r.tick();await r.tick();
 assert.deepEqual(said,[{text:'Pomtita se transforme en Pompomtita. L’armée des pom-tirons se renforce ! (1 lieutenant pom-tirons)',files:['evolution Tita 1->2']}]);
 assert.equal(r.nameOf('Tita'),'Pompomtita');
 now+=3.5*HOUR;await r.tick();
 assert.deepEqual(said[1],{text:'Pompomtita se transforme en Pomdetertita. L’armée des pom-tirons se renforce ! (1 lieutenant pom-tirons)',files:['evolution Tita 2->3']});
 assert.equal(r.roleplay('Tita','Salut').username,'Pomdetertita');assert.equal(r.roleplay('Tita','x').avatarURL,'pom/Tita-3.png');
 await r.tick();assert.equal(said.length,2);
});
test('a pom speaks in a bubble, under its pom name; the healthy speak as usual',async()=>{
 let now=at('2026-10-25T09:00:00Z');
 const {r}=setup({now:()=>now});
 assert.equal(await r.message('Kloe','Bonjour'),null);
 await r.infect('Tita');now+=8*HOUR;
 const m=await r.message('Tita','Bonjour tout le monde');
 assert.equal(m.content,'');assert.equal(m.username,'Pomdetertita');assert.equal(m.avatarURL,'pom/Tita-3.png');
 assert.equal(m.files[0].name,'bulle 3');assert.match(m.files[0].text,/pom/i);
});
test('the gauges: capitals and "!" for rage, "?" and emojis for madness; pom, citrouille and full stops calm them',()=>{
 assert.ok(moods('JE VAIS TOUS VOUS MANGER !!!')[0]>=40);
 assert.ok(moods('Quoi ???? 🎃🎃 :smile:')[1]>=40);
 assert.ok(moods('pom pom citrouille. Calme.')[0]<0);
});
test('the bite: now and then a pom bites someone who spoke lately, who may catch it; twice a day at most for each pom',async()=>{
 let now=at('2026-10-26T09:00:00Z'),roll=.5;
 const {r,said}=setup({now:()=>now,random:()=>roll});
 await r.infect('Tita');said.length=0;
 await r.message('Kloe','Salut Tita.');
 await r.message('Tita','Bonjour.');await r.after('Tita');assert.equal(said.length,0);   // not this time
 roll=0;await r.message('Tita','Bonjour.');await r.after('Tita');
 assert.equal(said[0].text,'Pomtita rentre dans une rage incontrôlable.\nPris·e de rage, Pomtita mord Kloe !');assert.deepEqual(said[0].files,['morsure Tita 1 Kloe 0']);
 assert.match(said[1].text,/Kloe semble développer des symptômes/);assert.deepEqual(said[1].files,['evolution Kloe 0->1']);
 assert.ok(r.isInfected('Kloe'));
 const bites=()=>said.filter(x=>/rage incontrôlable/.test(x.text)).length;
 await r.message('Joshua','Coucou.');await r.message('Tita','Pom.');await r.after('Tita');assert.equal(bites(),2);   // a second bite
 await r.message('Tita','Pom.');await r.after('Tita');assert.equal(bites(),2);                                       // no third one that day
 await r.infect('Nial');await r.message('Nial','Pom.');await r.after('Nial');assert.equal(bites(),3);                // another pom still can
 now=at('2026-10-27T09:00:00Z');await r.message('Joshua','Coucou.');await r.message('Tita','Pom.');await r.after('Tita');assert.equal(bites(),4);   // a new day
});
test('madness: the pom hurts itself',async()=>{
 let now=at('2026-10-26T09:00:00Z');
 const {r,said}=setup({now:()=>now,random:()=>.99});
 await r.infect('Nial');said.length=0;now+=6*HOUR;   // random .99: stage 2 at about 5h30
 for(let i=0;i<3;i++){await r.message('Nial','Hein ??? Quoi ??? 🎃🎃🎃🎃');await r.after('Nial');}
 assert.equal(said.length,1);assert.equal(said[0].text,'Pompomnial se met à sautiller partout sans raison apparente.');
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
test('when nobody has played yet, daily cases use the healthy unassigned pool immediately',async()=>{
 const cases=[],{r,said,store}=setup({now:()=>at('2026-10-20T12:59:00+02:00'),cases,data:{schedule:{'2026-10-20':[600,640]},drawn:{'2026-10-20':[null]},infected:{},patients:{}}});
 await r.tick();assert.equal(said.length,2);assert.equal(store.load().drawn['2026-10-20'].length,2);const infected=r.infected();cases.push('Tita','Kloe');await r.tick();assert.deepEqual(r.infected(),infected);
});

test('an evolution that cannot be announced does not hold back the cases of the day',async()=>{
 let fail=true;const said=[],logs=[];
 const r=createRhumertume({store:memory({schedule:{'2026-10-20':[600,640]},drawn:{},infected:{Kloe:at('2026-10-20T00:00:00+02:00')},patients:{Kloe:{announced:1,rage:0,madness:0,updated:0,lastRage:0,lastMadness:0}}}),
  now:()=>at('2026-10-20T11:00:00+02:00'),random:()=>.5,charactersOfTheDay:async()=>['Tita','Nial'],characterNames:names,render,log:l=>logs.push(l),
  announce:async text=>{if(fail&&/se transforme/.test(text))throw Error('Discord');said.push(text);}});
 await r.tick();
 assert.equal(said.filter(t=>/semble/.test(t)).length,2);assert.ok(logs.some(l=>/evolution: Discord/.test(l)));
 fail=false;await r.tick();assert.ok(said.some(t=>/Pompomkloe se transforme/.test(t)));
});
test('three poms besiege unassigned healthy characters once at the saved random daily time',async()=>{
 const said=[],sieges=[],t0=at('2026-10-20T08:00:00+02:00');let now=at('2026-10-20T09:00:00+02:00');
 const r=createRhumertume({store:memory({schedule:{'2026-10-20':[600,601]},drawn:{'2026-10-20':['Nial','Tita']},infected:{Nial:t0,Tita:t0,Kloe:t0},patients:{}}),
  now:()=>now,random:()=>.6,charactersOfTheDay:async()=>['Estelle','Joshua','Olivier','Nial'],characterNames:[...names,'Soldat','Matelot','Marchand'],render,wait:async()=>{},
  renderSiege:async(defenders,attackers,outcome)=>{sieges.push({defenders,attackers,outcome});return {attachment:Buffer.from('gif'),name:'siege.gif',outcome,fallen:defenders.slice(1).map(d=>d.character),escaped:defenders[0].character,duration:6000};},
  announce:async(text,files=[])=>said.push({text,files:files.map(f=>f.name)})});
 await r.tick();assert.equal(sieges.length,0);                       // before 10:00
 now=at('2026-10-20T18:00:00+02:00');await r.tick();
 assert.equal(sieges.length,1);assert.equal(sieges[0].outcome,'flee');assert.ok(sieges[0].attackers.every(a=>a.stage>=2));
 const intro=said.find(s=>/encerclent/.test(s.text));assert.deepEqual(intro.files,['siege.gif']);assert.match(intro.text,/acculé·es dos à dos/);
 const [escaped,...fallen]=sieges[0].defenders.map(d=>d.character);
 assert.ok(said.some(s=>s.text===`${escaped} parvient à s'enfuir… ${fallen.join(' et ')} tombent sous les morsures des poms.`));
 for(const c of fallen)assert.ok(r.isInfected(c));assert.ok(!r.isInfected(escaped));
 const before=said.length;await r.tick();assert.equal(sieges.length,1);assert.ok(said.slice(before).every(s=>!/encerclent/.test(s.text)));
});
test('stages 2 and 3 come within two hours of 3h30 and 7 hours, drawn for each patient',async()=>{
 for(const [random,second,third] of [[0,1.5,5],[.5,3.5,7],[.999,5.5,9]]){
  let now=at('2026-10-26T09:00:00Z');const start=now,{r}=setup({now:()=>now,random:()=>random});
  await r.infect('Nial');
  const level=h=>{now=start+h*HOUR;return r.level('Nial');};
  assert.equal(level(second-.05),1);assert.equal(level(second+.05),2);assert.equal(level(third-.05),2);assert.equal(level(third+.05),3);
 }
});
test('a case cut short before its announcement is announced on the next tick, never kept silent',async()=>{
 const said=[];let fail=true;
 const store=memory({schedule:{'2026-10-20':[600,640]},drawn:{'2026-10-20':['Anelace','Kloe']},infected:{Kloe:at('2026-10-19T10:40:00+02:00')},patients:{},pending:{Anelace:{cause:'tirage du jour',at:0}}});
 const r=createRhumertume({store,now:()=>at('2026-10-20T11:00:00+02:00'),random:()=>.5,charactersOfTheDay:async()=>['Anelace','Kloe'],characterNames:names,render,
  announce:async(text,files=[])=>{if(fail)throw Error('Discord');said.push(text);}});
 assert.equal(r.isInfected('Anelace'),false);                      // pending: not ill until announced
 await r.tick().catch(()=>{});assert.equal(r.isInfected('Anelace'),false);
 fail=false;await r.tick();
 assert.ok(said.some(t=>/Anelace semble développer/.test(t)));assert.equal(r.isInfected('Anelace'),true);
 assert.equal(store.load().pending.Anelace,undefined);assert.match(store.load().patients.Anelace.cause,/tirage du jour/);
});

test('garou evolution is picked once at stage three, persists and uses the hair avatar',async()=>{let now=at('2026-10-20T08:00:00Z');const store=memory(),calls=[];const renderer={...render,renderEvolution:async(c,f,t)=>{calls.push(t);return {name:'evolution'};}};const make=()=>createRhumertume({store,now:()=>now,random:()=>0,charactersOfTheDay:async()=>[],characterNames:names,render:renderer,announce:async()=>{}});let r=make();await r.infect('Tita');assert.equal(r.variant('Tita'),'pom');const initial=store.load();initial.patients.Tita.variant='pompom';store.save(initial);r=make();now+=20*HOUR;await r.tick();assert.equal(r.variant('Tita'),'garou');assert.ok(calls.includes('garou'));assert.match(r.roleplay('Tita','Salut').avatarURL,/Tita-garou/);r=make();await r.tick();assert.equal(r.variant('Tita'),'garou');assert.equal(calls.filter(t=>t==='garou').length,1);});
test("the second stage's other form: Pom-d'aspi, with its own picture and evolution, then the Pom funèbre",async()=>{
 let now=at('2026-10-26T09:00:00Z');const start=now;
 const {r,said}=setup({now:()=>now,random:()=>0});   // random 0: the wizard form, at the shortest times
 await r.infect('Tita');said.length=0;
 now=start+2*3600000;await r.tick();
 assert.equal(r.nameOf('Tita'),'Pom-d’aspitita');assert.deepEqual(said.at(-1).files,['evolution Tita 1->aspi']);
 assert.equal((await r.message('Tita','Bonjour.')).avatarURL,'pom/Tita-aspi.png');
 now=start+5.5*3600000;await r.tick();
 assert.match(said.at(-1).text,/Pom-d’aspitita se transforme en Pom-funèbretita/);assert.deepEqual(said.at(-1).files,['evolution Tita aspi->funebre']);assert.equal(r.nameOf('Tita'),'Pom-funèbretita');
});
test("a wizard pom's bite is a spell: the victim fades away and falls ill a few seconds later, or shrinks",async()=>{
 // healthy Kloe fades away (random 0: the wizard form, the bite, the contagion); an ill Kloe can only shrink
 for(const [ill,outcome,victimSprite] of [[false,'vanish',0],[true,'shrink',1]]){
  let now=at('2026-10-26T09:00:00Z');const start=now,said=[],spells=[];
  const r=createRhumertume({store:memory({drawn:{'2026-10-26':['fixture-1','fixture-2']}}),now:()=>now,random:()=>0,charactersOfTheDay:async()=>[],characterNames:names,render,wait:async()=>{},
   renderWizard:async(c,sprite,v,vs,o)=>{spells.push([c,sprite,v,vs,o]);return {attachment:Buffer.from('gif'),name:'sort.gif',duration:7000};},
   announce:async(text,files=[])=>said.push({text,files:files.map(f=>f.name)})});
  await r.infect('Tita');now=start+2*3600000;await r.tick();   // stage 2, the wizard form
  if(ill)await r.infect('Kloe');
  assert.equal(r.nameOf('Tita'),'Pom-d’aspitita');
  await r.message('Kloe','Salut.');await r.message('Tita','Pom.');await r.after('Tita');
  assert.deepEqual(spells.at(-1),['Tita','aspi','Kloe',victimSprite,outcome]);
  const intro=said.findIndex(s=>/enfourche son aspirateur et fond sur/.test(s.text));assert.ok(intro>=0);assert.deepEqual(said[intro].files,['sort.gif']);
  assert.match(said[intro+1].text,outcome==='vanish'?/Kloe disparaît/:/se retrouve tout·e petit·e/);
  if(!ill)assert.ok(said.slice(intro+2).some(s=>/Kloe semble développer/.test(s.text)));
 }
});
test('a pom already shown at the usual second stage keeps the usual form at the third',async()=>{
 const start=at('2026-10-26T09:00:00Z');let now=start+6*3600000;
 const {r,said}=setup({now:()=>now,random:()=>0,cases:[],data:{infected:{Tita:start},patients:{Tita:{announced:2,rage:0,madness:0,updated:start,lastMadness:0,times:[2*3600000,5*3600000]}}}});
 await r.tick();
 assert.equal(r.nameOf('Tita'),'Pomdetertita');assert.ok(said.some(s=>s.text==='Pompomtita se transforme en Pomdetertita. L’armée des pom-tirons se renforce ! (1 lieutenant pom-tirons)'&&s.files[0]==='evolution Tita 2->3'));
});
