// Rhumertume (Halloween 2026): three times a day, at unpredictable times between 10:00 and 13:00 (Paris), one of the characters
// of the healthy roster starts turning into a pom-tiron (at most one player character per Paris day); an administrator can also infect a character with /pomifier.
// The illness belongs to the character, whoever plays it. In the roleplay chat one word in three becomes "pom", from the
// first symptoms on and for good; its avatar is a pom wearing the character's
// hair, in two stages: the cute one, Pomx, at once, then after about 3h30 (each patient's own time, drawn within two hours
// either side) a final form drawn among five (Pompomx, Pom-d'aspix, Pomdeterx, Pom-funèbrex, Pomgaroux), announced with a
// Pokémon-like evolution GIF. Now and then (once a day at most for each pom) a pom flies into a rage and bites
// whoever spoke lately, who may catch the illness. How the player writes feeds two gauges, rage (capitals, "!") and
// madness ("?", emojis, which makes the pom hurt itself); "pom", "citrouille", "potiron" and plain full stops calm both. New cases stop after October 31; the sick stay sick.
// Once a day at a saved random time from 10:00 to 23:00, three poms corner three healthy characters (utils/pomSiege.js);
// those who fall catch the illness.
const {PermissionFlagsBits}=require('discord.js');
const {weightedPick,weightedSample}=require('./pomSelection.cjs');
const HOUR=3600000,LAST_DAY='2026-10-31';
const WINDOW=[10*60,13*60];
const CASES_PER_DAY=3,SPREAD_CASES_PER_DAY=3,MAX_CASES_PER_DAY=6;
// the evolution comes after 3h30, give or take two hours (drawn for each patient; the second time is no longer used)
const STAGE_TIMES=[3.5*HOUR,7*HOUR],STAGE_SPREAD=2*HOUR;
const AVATAR_URL='https://leliberlnews.fr/activite/assets/sky/chat/pom-tiron.png';
const PREFIX=['','Pom','Pompom','Pomdeter'];
const ASPI="Pom-d’aspi",FUNEBRE='Pom-funèbre';
// the final forms, one drawn at the evolution: [form, the stage its picture and strength belong to, kind]. The wizard
// pom (« aspi ») is Pom-d'aspi at the second stage and Pom funèbre at the third
const FINALS=[['aspi',2,'pom'],['pompom',2,'pom'],['pompom',3,'pom'],['aspi',3,'pom'],['pompom',3,'garou']];
// the share of the words turned into "pom", the same for every pom at all times
const POM_SHARE=1/3;
const GAUGE_DECAY=8,ACTION_AT=70,AFTER_ACTION=35,CONTAGION=.3,RECENT=30*60000;
// the bite: a chance on each message of a pom, until that pom has bitten once that day (Paris)
const BITE_CHANCE=.25,BITES_PER_POM=1;
const RAGE=['Pris·e de rage, {perso} mord {victime} !','{perso} se jette sur {victime} en hurlant.'];
const MADNESS=['{perso} se cogne la tête contre un mur en riant.','{perso} se met à sautiller partout sans raison apparente.'];
const parisFormat=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
function parisParts(ms){const p=Object.fromEntries(parisFormat.formatToParts(ms).map(x=>[x.type,x.value]));return {date:`${p.year}-${p.month}-${p.day}`,minutes:Number(p.hour)*60+Number(p.minute)};}
const PROTECTED=/(https?:\/\/\S+|<[^>\s]+>|:[\w~]+:)/u,WORD=/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;
function pom(word){return word.length>1&&word===word.toLocaleUpperCase('fr')&&word!==word.toLocaleLowerCase('fr')?'POM':word[0]!==word[0].toLocaleLowerCase('fr')?'Pom':'pom';}
const words=(text,replace)=>String(text).split(PROTECTED).map((part,i)=>i%2?part:part.replace(WORD,replace)).join('');
// Each word turns into "pom" with the given probability; links, mentions, emojis and punctuation are kept.
function pomify(text,stage,random=Math.random){return words(text,word=>stage>=1||random()<stage?pom(word):word);}
// share of the words turned into "pom", time since the first symptoms
function progress(elapsed,[second,third]=STAGE_TIMES){
 const points=[[0,0],[HOUR,.3],[second,.6],[third,1]];
 for(let i=1;i<points.length;i++){const [t0,s0]=points[i-1],[t1,s1]=points[i];if(elapsed<t1)return s0+(s1-s0)*Math.max(0,elapsed-t0)/(t1-t0);}
 return 1;
}
const count=(text,re)=>(String(text).match(re)||[]).length;
// what a message adds to the gauges: [rage, madness]
function moods(text){
 const letters=String(text).match(/\p{L}/gu)||[],upper=letters.filter(c=>c!==c.toLocaleLowerCase('fr')).length;
 const calm=Math.min(40,10*count(text,/\b(?:pom|citrouilles?|potirons?)\b/giu))+Math.min(20,4*count(text,/(?<!\.)\.(?!\.)/g));
 const rage=(letters.length>=4&&upper/letters.length>.5?30*upper/letters.length:0)+Math.min(25,5*count(text,/!/g));
 const madness=Math.min(25,5*count(text,/\?/g))+Math.min(32,8*count(text,/\p{Extended_Pictographic}|<a?:\w+:\d+>|:[\w~]+:/gu));
 return [rage-calm,madness-calm];
}
const symptoms=character=>`${character} semble développer des symptômes préoccupants.`;
function createRhumertume({store,now=()=>Date.now(),random=Math.random,charactersOfTheDay,characterNames=[],dailyCases=CASES_PER_DAY,hasCraft=character=>require('../resources/pom/crafted.json').includes(character),announce,render,renderSiege,renderWizard,wait=ms=>new Promise(r=>setTimeout(r,ms)),log=()=>{}}){
 const state={schedule:{},drawn:{},infected:{},patients:{},sieges:{},bites:{},pending:{},...(store.load()??{})};
 state.playerCases??={};state.siegeSchedule??={};state.patients??={};state.sieges??={};state.bites??={};state.pending??={};
 const save=()=>store.save(state);
 const pictures=()=>render??(render=require('./pomRendering'));
 const drawsOver=()=>parisParts(now()).date>LAST_DAY;
 const recent=new Map();   // character -> last time it spoke in the roleplay chat
 // the day's times (minutes, Paris), drawn once inside the window; a day picked up late only gets the times still ahead
 function scheduledMinutes(date,minutes){
  const savedList=[].concat(state.schedule[date]??[]),before=savedList.length,list=savedList.slice(0,dailyCases);
  while(list.length<dailyCases&&minutes<WINDOW[1]){const from=Math.max(WINDOW[0],minutes);list.push(from+Math.floor(random()*(WINDOW[1]-from+1)));}
  if(list.length!==before||!Array.isArray(state.schedule[date])){state.schedule[date]=list.sort((a,b)=>a-b);save();log(`rhumertume: cas du ${date} à ${state.schedule[date].map(m=>`${Math.floor(m/60)}h${String(m%60).padStart(2,'0')}`).join(', ')}`);}
  return state.schedule[date];
 }
 // the day's cases so far; an old empty draw (nobody played yet, before cases waited) does not count
 const drawnOn=date=>state.drawn[date]==null?[]:[].concat(state.drawn[date]).filter(Boolean);
 // 0 right after the first symptoms, 1 seven hours later; null when healthy
 function stage(character){const since=state.infected[character];return since==null?null:progress(now()-since,state.patients[character]?.times);}
 // 1 (the cute pom) until its evolution time, then its final form's stage for good (the form drawn the first time it
 // is needed); a pom shown at a later stage before this version stays there
 function level(character){
  const since=state.infected[character];if(since==null)return 0;
  const p=state.patients[character];
  if(!p?.final&&p?.announced>=2)return p.announced;
  if(now()-since<(p?.times?.[0]??STAGE_TIMES[0]))return 1;
  if(!p){const elapsed=now()-since;return elapsed>=STAGE_TIMES[1]?3:elapsed>=STAGE_TIMES[0]?2:1;}   // infected before patients were kept: its old stage
  if(!p.final){const [variant,lvl,kind]=FINALS[Math.min(FINALS.length-1,Math.floor(random()*FINALS.length))];Object.assign(p,{variant,kind,final:lvl});save();}
  return p.final;
 }
 // Pomestelle, Pompomestelle, Pomdeterestelle: the character's name runs on, without its capital
const aspi=character=>state.patients[character]?.variant==='aspi';
 // the stage's picture: 1, 2 or 3, or for the wizard forms 'aspi' (second stage) and 'funebre' (third)
 const spriteOf=(character,lvl=level(character))=>aspi(character)&&lvl>=2?(lvl===2?'aspi':'funebre'):lvl===3&&state.patients[character]?.kind==='garou'?'garou':lvl;
 const variant=character=>{const sprite=spriteOf(character);return typeof sprite==='string'?sprite:'pom';};
 const prefixOf=(character,lvl)=>aspi(character)&&lvl>=2?(lvl===2?ASPI:FUNEBRE):lvl===3&&state.patients[character]?.kind==='garou'?'Pomgarou':PREFIX[lvl];
 const nameOf=(character,lvl=level(character))=>lvl?prefixOf(character,lvl)+character.charAt(0).toLocaleLowerCase('fr')+character.slice(1):character;
 const avatarOf=(character,lvl=level(character))=>characterNames.includes(character)?pictures().avatarURL(character,spriteOf(character,lvl)):AVATAR_URL;
 // a patient's book-keeping (gauges, last stage announced); one infected before this version starts where it is
 function patient(character){
  return state.patients[character]??={announced:level(character),rage:0,madness:0,updated:now(),lastMadness:0};
 }
 // an announcement with its GIF; the text alone if the picture fails
 async function announceWith(text,picture){
  let files=[];
  try{files=[await picture()].filter(Boolean);}catch(error){log('rhumertume: picture: '+error.message);}
  await announce(text,files);
 }
 // a new case: noted as pending, announced, then made real; a case cut short (the bot restarting while the GIF is drawn)
 // is announced again on the next tick (pendingCases), never kept unannounced. cause: what gave it (logged and kept)
 // Reserve infections serially: Discord rendering, bites and the daily tick can overlap.
 const assignedToday=async()=>new Set((await charactersOfTheDay()).filter(n=>n&&n!=='Pom'));
 function playerCases(date,assigned,except=null){
  const used=new Set(state.playerCases[date]??[]);
  for(const [c,since]of Object.entries(state.infected))if(c!==except&&assigned.has(c)&&parisParts(since).date===date)used.add(c);
  for(const [c,p]of Object.entries(state.pending))if(c!==except&&assigned.has(c)&&parisParts(p.at).date===date)used.add(c);
  return used;
 }
 async function canInfect(character){const assigned=await assignedToday();return !assigned.has(character)||playerCases(parisParts(now()).date,assigned,character).size<1;}
 const healthy=names=>[...new Set(names)].filter(n=>n&&n!=='Pom'&&state.infected[n]==null&&!state.pending[n]);
 let infectionQueue=Promise.resolve();
 function catches(character,cause,retry=false){const next=infectionQueue.then(()=>catchOnce(character,cause,retry));infectionQueue=next.catch(()=>{});return next;}
 async function catchOnce(character,cause,retry=false){
  if(state.infected[character]!=null)return true;
  if(drawsOver())return false;
  const date=parisParts(now()).date,assigned=await assignedToday(),controlled=assigned.has(character);
  // Three spontaneous cases plus at most three secondary cases; manual administrator actions remain explicit overrides.
  const manual=cause.startsWith('/pomifier'),daily=Object.entries(state.infected).filter(([c,at])=>parisParts(at).date===date&&!state.patients[c]?.cause?.startsWith('/pomifier')),secondaryCases=daily.filter(([c])=>state.patients[c]?.cause&&!state.patients[c].cause.startsWith('tirage du jour'));
  if(!manual&&(daily.length>=MAX_CASES_PER_DAY||!cause.startsWith('tirage du jour')&&secondaryCases.length>=SPREAD_CASES_PER_DAY)){delete state.pending[character];save();log('rhumertume: plafond quotidien de contamination atteint');return false;}
  if(controlled&&playerCases(date,assigned,character).size>=1){
   delete state.pending[character];state.drawn[date]=drawnOn(date).filter(c=>c!==character);save();log('rhumertume: plafond joueur atteint, '+character+' reste sain');return false;
  }
  state.pending[character]={cause,at:now()};save();
  // a new case that cannot be announced is dropped (its draw is undone); a case being announced again stays pending
  try{await announceWith(symptoms(character),()=>null);}
  catch(error){if(!retry){delete state.pending[character];save();}throw error;}
  const spread=()=>(random()*2-1)*STAGE_SPREAD,second=STAGE_TIMES[0]+spread(),third=Math.max(second+HOUR,STAGE_TIMES[1]+spread());
  delete state.pending[character];
  state.infected[character]=now();state.patients[character]={announced:1,rage:0,madness:0,updated:now(),lastMadness:0,times:[second,third],cause};
  if(controlled)state.playerCases[date]=[...new Set([...(state.playerCases[date]??[]),character])];save();
  log(`rhumertume: ${character} tombe malade (${cause})`);return true;
 }
 async function pendingCases(){
  for(const [character,{cause}] of Object.entries(state.pending))if(!state.infected[character])await catches(character,cause.endsWith('annonce reprise')?cause:cause+', annonce reprise',true);else{delete state.pending[character];save();}
 }
 // Announce each new form once, with the current infected army size.
 async function evolutions(){
  for(const character of Object.keys(state.infected)){
   const p=patient(character),lvl=level(character);
   if(lvl<=p.announced)continue;   // not yet, or announced already
   const army=Object.keys(state.infected).length;
   await announceWith(`${nameOf(character,1)} se transforme en ${nameOf(character,lvl)}. L’armée des pom-tirons se renforce ! (${army} lieutenant${army>1?'s':''} pom-tirons)`,()=>null);
   p.announced=lvl;save();
  }
 }
 let busy=false,waiting=null;
 async function tick(){
  if(busy)return;busy=true;
  try{
   // an evolution that cannot be announced must not hold the day's cases back
   await evolutions().catch(error=>log('rhumertume: evolution: '+error.message));
   await pendingCases().catch(error=>log('rhumertume: annonce reprise: '+error.message));
   await replayMissed().catch(error=>log('rhumertume: rediffusion: '+error.message));
   const {date,minutes}=parisParts(now());
   if(date>LAST_DAY)return;
   const due=scheduledMinutes(date,minutes).filter(m=>m<=minutes).length;
   while(drawnOn(date).length<due){
    const assigned=await assignedToday(),players=playerCases(date,assigned).size<1?healthy([...assigned]):[],npcs=healthy(characterNames).filter(n=>!assigned.has(n)),candidates=players.length?players:npcs;
    // Exhausted healthy roster: keep the case pending until an eligible character is available.
    if(!candidates.length){if(waiting!==date){waiting=date;log('rhumertume: no eligible healthy character, the case waits');}break;}
    const character=weightedPick(candidates,hasCraft,random),previous=drawnOn(date);
    state.drawn[date]=[...drawnOn(date),character];save();
    // if Discord is unreachable the draw is undone and retried on the next tick
    try{if(!await catches(character,'tirage du jour')){state.drawn[date]=previous;save();}}catch(error){state.drawn[date]=previous;save();throw error;}
   }
   await siege(date,minutes);
  }finally{busy=false;}
 }
 // The GIFs missed while the bot drew none (25 October 2026, between the memory scare and the return of the GIFs
 // written while drawn): that day's ambush and its victims' first symptoms are shown again, once (state.replayed),
 // from what was kept of the ambush. Done once; it can go after it has run.
 const REPLAYS=['2026-10-25'];
 async function replayMissed(){
  for(const date of REPLAYS){
   const s=state.sieges[date];if(!s||(state.replayed??[]).includes(date))continue;
   state.replayed=[...(state.replayed??[]),date];save();   // never twice, even if Discord fails halfway
   await announceWith(`Rediffusion de l'embuscade : ${list(s.attackers.map(c=>nameOf(c)))} encerclent ${list(s.defenders)}, acculé·es dos à dos !`,
    ()=>(renderSiege??(async()=>null))(s.defenders.map(character=>({character})),s.attackers.map(character=>({character,stage:spriteOf(character)})),s.outcome,Math.floor(random()*2**31)).then(r=>r&&{attachment:r.attachment,name:r.name}));
   for(const character of s.fallen??[])await announceWith('Rediffusion : '+symptoms(character),()=>null);
  }
 }
 // The daily ambush has its own persisted random Paris time, from 10:00 to 23:00.
 // Three infected characters of any stage can take part; craftless unassigned victims are preferred.
 // of the day; the GIF shows how it ends (utils/pomSiege.js), then the outcome is told and those who fell catch it
 const SIEGE_HOURS=[WINDOW[0],23*60],OUTCOME_TEXT={
  repel:d=>`${list(d.defenders)} repoussent l'assaut : les poms s'envolent au loin !`,
  rescue:d=>`Un pom s'accroche, mais les autres viennent à la rescousse : ${list(d.defenders)} s'en sortent indemnes !`,
  flee:d=>`${d.escaped} parvient à s'enfuir… ${list(d.fallen)} tombent sous les morsures des poms.`,
  devour:d=>`${list(d.fallen)} tombent sous les morsures des poms.`};
 const list=names=>names.length<2?names.join(''):names.slice(0,-1).join(', ')+' et '+names.at(-1);
 const shuffled=items=>items.map(v=>[random(),v]).sort((a,b)=>a[0]-b[0]).map(([,v])=>v);
 async function siege(date,minutes){
  if(state.sieges[date]||minutes>=SIEGE_HOURS[1]&&state.siegeSchedule[date]==null)return;
  if(state.siegeSchedule[date]==null){const from=Math.max(SIEGE_HOURS[0],minutes);state.siegeSchedule[date]=from+Math.floor(random()*(SIEGE_HOURS[1]-from));save();log(`rhumertume: embuscade du ${date} à ${Math.floor(state.siegeSchedule[date]/60)}h${String(state.siegeSchedule[date]%60).padStart(2,'0')}`);}
  if(minutes<state.siegeSchedule[date])return;
  const dailyAttacks=[].concat(state.bites[date]??[]);const poms=Object.keys(state.infected).filter(character=>dailyAttacks.filter(b=>b.pom===character).length<BITES_PER_POM);
  if(poms.length<3)return;
  const assigned=await assignedToday(),npcs=healthy(characterNames).filter(n=>!assigned.has(n)),players=playerCases(date,assigned).size<1?healthy([...assigned]):[];
  const defenders=weightedSample(npcs,3,hasCraft,random);
  // At most one assigned character may appear among the healthy victims.
  if(defenders.length<3&&players.length)defenders.push(weightedPick(players,hasCraft,random));
  if(defenders.length<3)return;
  const attackers=shuffled(poms).slice(0,3);
  let outcome=['repel','rescue','flee','devour'][Math.floor(random()*4)],result=null;
  try{result=await (renderSiege??(async()=>null))(defenders.map(character=>({character})),attackers.map(character=>({character,stage:spriteOf(character)})),outcome,Math.floor(random()*2**31));}
  catch(error){log('rhumertume: siege: '+error.message);}
  // without the picture, the draw alone decides who falls
  outcome=result?.outcome??outcome;
  const escaped=result?.escaped??(outcome==='flee'?defenders[0]:null);
  const fallen=result?.fallen??(outcome==='devour'?defenders:outcome==='flee'?defenders.slice(1):[]);
  state.sieges[date]={attackers,defenders,outcome,fallen};save();
  try{await announce(`${list(attackers.map(c=>nameOf(c)))} encerclent ${list(defenders)}, acculé·es dos à dos !`,result?[{attachment:result.attachment,name:result.name}]:[]);}
  catch(error){delete state.sieges[date];save();throw error;}
  state.bites[date]=[...[].concat(state.bites[date]??[]),...attackers.map(pom=>({pom,kind:'ambush'}))];save();
  log(`rhumertume: siège (${outcome}) de ${attackers.join(', ')} contre ${defenders.join(', ')}`);
  await wait(result?.duration??0);
  await announce(OUTCOME_TEXT[outcome]({defenders,fallen,escaped}),[]);
  for(const character of fallen)if(!state.infected[character])await catches(character,'siège');
 }
 // an administrator's choice, announced like a draw
 async function infect(character){
  if(drawsOver())throw Error('La rhumertume ne fait plus de nouvelles victimes.');
  if(state.infected[character])throw Error(`${character} est déjà atteint·e.`);
  if(!await catches(character,'/pomifier'))throw Error('Un personnage contrôlé par un joueur a déjà été pomifié aujourd’hui.');
 }
 const textOf=(character,text)=>pomify(text,POM_SHARE,random);
 // the activity's roleplay: text, avatar and name only
 function roleplay(character,text){
  if(stage(character)==null)return null;
  return {text:textOf(character,text),avatarURL:avatarOf(character),username:nameOf(character)};
 }
 // the roleplay chat: the pom's words in place of the text, under its name and avatar; the gauges take the message in
 async function message(character,text){
  recent.set(character,now());
  if(stage(character)==null)return null;
  const p=patient(character),hours=(now()-p.updated)/HOUR,[rage,madness]=moods(text);
  const clamp=v=>Math.max(0,Math.min(100,v));
  p.rage=clamp(p.rage-GAUGE_DECAY*hours+rage);p.madness=clamp(p.madness-GAUGE_DECAY*hours+madness);p.updated=now();save();
  const lvl=level(character);
  return {content:textOf(character,text),username:nameOf(character,lvl),avatarURL:avatarOf(character,lvl)};
 }
 const fill=(template,values)=>template.replace(/\{(\w+)\}/g,(_,k)=>values[k]);
 const pick=list=>list[Math.floor(random()*list.length)];
 // after the pom's message: now and then a bite (once a day at most for each pom; the victim may catch it), a self-inflicted mishap
 // when madness is high
 // a wizard pom's bite is a spell (utils/pomWizard.js): it flies over its victim on its vacuum and casts; the victim
 // turns white and shrinks, or fades away and, a few seconds later, falls ill (the same chance as a bite's contagion)
 async function spell(character,victim){
  const victimName=stage(victim)==null?victim:nameOf(victim),outcome=stage(victim)==null&&await canInfect(victim)&&random()<CONTAGION?'vanish':'shrink';
  let gif=null;
  try{gif=await (renderWizard??require('./pomWizard').renderWizardBite)(character,spriteOf(character),victim,stage(victim)==null?0:spriteOf(victim),outcome,Math.floor(random()*2**31));}
  catch(error){log('rhumertume: spell: '+error.message);}
  await announce(`${nameOf(character)} enfourche son aspirateur et fond sur ${victimName} !`,gif?[{attachment:gif.attachment,name:gif.name}]:[]);
  await wait(gif?.duration??0);
  await announce(outcome==='vanish'?`${victimName} disparaît dans une pluie d’étincelles…`:`${victimName} se retrouve tout·e petit·e !`,[]);
  if(outcome==='vanish'){await wait(3000);await catches(victim,'sort de '+character);}
 }
 async function after(character){
  if(stage(character)==null)return;
  const p=patient(character),t=now();
  const today=parisParts(t).date;
  const bitten=[].concat(state.bites[today]??[]);   // the day's bites (a single one in an older state)
  if(bitten.filter(b=>b.pom===character).length<BITES_PER_POM&&random()<BITE_CHANCE){
   const victims=[...recent].filter(([name,at])=>name!==character&&name!=='Pom'&&t-at<=RECENT).map(([name])=>name);
   if(victims.length){
    const victim=pick(victims);state.bites[today]=[...bitten,{pom:character,victim}];save();
    if(aspi(character)&&level(character)>=2)await spell(character,victim);
    else{
    // the rage, the bite, then the GIF of the pom jumping on its victim
    await announceWith(`${nameOf(character)} rentre dans une rage incontrôlable.\n${fill(pick(RAGE),{perso:nameOf(character),victime:stage(victim)==null?victim:nameOf(victim)})}`,
     ()=>pictures().renderBite(character,spriteOf(character),victim,spriteOf(victim)));
    if(stage(victim)==null&&random()<CONTAGION)await catches(victim,'morsure de '+character);
    }
   }
  }
  if(p.madness>=ACTION_AT&&t-p.lastMadness>=HOUR){
   p.lastMadness=t;p.madness=AFTER_ACTION;save();
   await announce(fill(pick(MADNESS),{perso:nameOf(character)}),[]);
  }
 }
 // /pomifier, administrators only
 async function handle(interaction){
  if(interaction.commandName!=='pomifier')return false;
  if(interaction.isAutocomplete?.()){
   const text=interaction.options.getFocused().toLocaleLowerCase('fr');
   await interaction.respond(characterNames.filter(n=>n!=='Pom'&&!state.infected[n]&&n.toLocaleLowerCase('fr').includes(text)).slice(0,25).map(name=>({name,value:name})));return true;
  }
  if(!interaction.isChatInputCommand?.())return false;
  if(!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)){await interaction.reply({content:'Commande réservée aux administrateurs.',flags:64});return true;}
  const character=interaction.options.getString('personnage',true);
  if(!characterNames.includes(character)){await interaction.reply({content:'Personnage inconnu.',flags:64});return true;}
  await interaction.deferReply({flags:64});
  try{await infect(character);await interaction.editReply({content:`${character} est pomifié·e.`});}
  catch(error){await interaction.editReply({content:error.message});}
  return true;
 }
 return {tick,infect,stage,level,variant,nameOf,roleplay,message,after,handle,gauges:c=>state.patients[c]&&{rage:state.patients[c].rage,madness:state.patients[c].madness},
  isInfected:character=>stage(character)!=null,infected:()=>Object.keys(state.infected)};
}
module.exports={createRhumertume,pomify,progress,moods,parisParts,AVATAR_URL,LAST_DAY};