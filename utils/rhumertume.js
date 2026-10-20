// Rhumertume (Halloween 2026): twice a day, at unpredictable times between 10:00 and 13:00 (Paris), one of the characters
// played that day starts turning into a pom-tiron; an administrator can also infect a character with /pomifier.
// The illness belongs to the character, whoever plays it. In the roleplay chat its words become "pom" little by little
// (30% after an hour, 60% after about 3h30, every word but one in eight after about 7 hours) and are shown in a Sky bubble; its
// avatar is a pom wearing the character's hair, in three stages: Pomx at once, Pompomx after 3h30, Pomdeterx after 7 hours
// (each patient's own times, drawn within two hours either side),
// each step announced with a Pokémon-like evolution GIF. Now and then (twice a day at most for each pom) a pom flies into a rage and bites
// whoever spoke lately, who may catch the illness. How the player writes feeds two gauges, rage (capitals, "!") and
// madness ("?", emojis, which makes the pom hurt itself); "pom", "citrouille", "potiron" and plain full stops calm both. New cases stop after October 31; the sick stay sick.
// Once a day, when three poms are at stage 2 or 3, they corner three healthy characters (the siege, utils/pomSiege.js);
// those who fall catch the illness.
const {PermissionFlagsBits}=require('discord.js');
const HOUR=3600000,LAST_DAY='2026-10-31';
const WINDOW=[10*60,13*60];
const CASES_PER_DAY=2;
// stages 2 and 3 come after 3h30 and 7 hours, give or take two hours (drawn for each patient; the third at least an hour after the second)
const STAGE_TIMES=[3.5*HOUR,7*HOUR],STAGE_SPREAD=2*HOUR;
const AVATAR_URL='https://leliberlnews.fr/activite/assets/sky/chat/pom-tiron.png';
const PREFIX=['','Pom','Pompom','Pomdeter'];
// the second stage has another form, the wizard pom « Pom-d'aspi » (drawn once for each patient, at that stage), whose
// third stage is the « Pom funèbre »
const ASPI="Pom-d’aspi",FUNEBRE='Pom-funèbre',ASPI_CHANCE=1/2;
// evolutions into a Pom-d'aspi planned by hand: Paris date and time (minutes)
const PLANNED_ASPI=[{date:'2026-10-20',minutes:19*60+41}];
const GAUGE_DECAY=8,ACTION_AT=70,AFTER_ACTION=35,CONTAGION=.3,RECENT=30*60000;
// the bite: a chance on each message of a pom, until that pom has bitten twice that day (Paris)
const BITE_CHANCE=.25,BITES_PER_POM=2;
const RAGE=['Pris·e de rage, {perso} mord {victime} !','{perso} se jette sur {victime} en hurlant.'];
const MADNESS=['{perso} se cogne la tête contre un mur en riant.','{perso} se met à sautiller partout sans raison apparente.'];
const parisFormat=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
function parisParts(ms){const p=Object.fromEntries(parisFormat.formatToParts(ms).map(x=>[x.type,x.value]));return {date:`${p.year}-${p.month}-${p.day}`,minutes:Number(p.hour)*60+Number(p.minute)};}
const PROTECTED=/(https?:\/\/\S+|<[^>\s]+>|:[\w~]+:)/u,WORD=/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;
function pom(word){return word.length>1&&word===word.toLocaleUpperCase('fr')&&word!==word.toLocaleLowerCase('fr')?'POM':word[0]!==word[0].toLocaleLowerCase('fr')?'Pom':'pom';}
const words=(text,replace)=>String(text).split(PROTECTED).map((part,i)=>i%2?part:part.replace(WORD,replace)).join('');
// Each word turns into "pom" with the given probability; links, mentions, emojis and punctuation are kept.
function pomify(text,stage,random=Math.random){return words(text,word=>stage>=1||random()<stage?pom(word):word);}
// The last stage: one word in eight stays readable, and the pom trails off "...." here and there.
function pomifyFinal(text,random=Math.random){
 let n=0,keep=-1;
 return words(text,word=>{if(n%8===0)keep=n+Math.floor(random()*8);const out=n++===keep?word:pom(word);return random()<.22?out+['...','....','.....'][Math.floor(random()*3)]:out;});
}
// share of the words turned into "pom", time since the first symptoms
function progress(elapsed,[second,third]=STAGE_TIMES){
 const points=[[0,0],[HOUR,.3],[second,.6],[third,1]];
 for(let i=1;i<points.length;i++){const [t0,s0]=points[i-1],[t1,s1]=points[i];if(elapsed<t1)return s0+(s1-s0)*Math.max(0,elapsed-t0)/(t1-t0);}
 return 1;
}
const levelOf=share=>share>=1?3:share>=.6?2:1;
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
function createRhumertume({store,now=()=>Date.now(),random=Math.random,charactersOfTheDay,characterNames=[],announce,render,renderSiege,renderWizard,wait=ms=>new Promise(r=>setTimeout(r,ms)),log=()=>{}}){
 const state={schedule:{},drawn:{},infected:{},patients:{},sieges:{},bites:{},pending:{},...(store.load()??{})};
 state.patients??={};state.sieges??={};state.bites??={};state.pending??={};
 const save=()=>store.save(state);
 const pictures=()=>render??(render=require('./pomRendering'));
 const drawsOver=()=>parisParts(now()).date>LAST_DAY;
 const recent=new Map();   // character -> last time it spoke in the roleplay chat
 // the day's times (minutes, Paris), drawn once inside the window; a day picked up late only gets the times still ahead
 function scheduledMinutes(date,minutes){
  const list=state.schedule[date]==null?[]:[].concat(state.schedule[date]),before=list.length;
  while(list.length<CASES_PER_DAY&&minutes<WINDOW[1]){const from=Math.max(WINDOW[0],minutes);list.push(from+Math.floor(random()*(WINDOW[1]-from+1)));}
  if(list.length!==before||!Array.isArray(state.schedule[date])){state.schedule[date]=list.sort((a,b)=>a-b);save();log(`rhumertume: cas du ${date} à ${state.schedule[date].map(m=>`${Math.floor(m/60)}h${String(m%60).padStart(2,'0')}`).join(', ')}`);}
  return state.schedule[date];
 }
 // the day's cases so far; an old empty draw (nobody played yet, before cases waited) does not count
 const drawnOn=date=>state.drawn[date]==null?[]:[].concat(state.drawn[date]).filter(Boolean);
 // 0 right after the first symptoms, 1 seven hours later; null when healthy
 function stage(character){const since=state.infected[character];return since==null?null:progress(now()-since,state.patients[character]?.times);}
 const level=character=>{const s=stage(character);return s==null?0:levelOf(s);};
 // Pomestelle, Pompomestelle, Pomdeterestelle: the character's name runs on, without its capital
const aspi=character=>state.patients[character]?.variant==='aspi';
 // the stage's picture: 1, 2 or 3, or for the wizard forms 'aspi' (second stage) and 'funebre' (third)
 const spriteOf=(character,lvl=level(character))=>aspi(character)&&lvl>=2?(lvl===2?'aspi':'funebre'):lvl;
 const prefixOf=(character,lvl)=>aspi(character)&&lvl>=2?(lvl===2?ASPI:FUNEBRE):PREFIX[lvl];
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
 async function catches(character,cause,retry=false){
  state.pending[character]={cause,at:now()};save();
  // a new case that cannot be announced is dropped (its draw is undone); a case being announced again stays pending
  try{await announceWith(symptoms(character),()=>pictures().renderEvolution(character,0,1));}
  catch(error){if(!retry){delete state.pending[character];save();}throw error;}
  const spread=()=>(random()*2-1)*STAGE_SPREAD,second=STAGE_TIMES[0]+spread(),third=Math.max(second+HOUR,STAGE_TIMES[1]+spread());
  delete state.pending[character];
  state.infected[character]=now();state.patients[character]={announced:1,rage:0,madness:0,updated:now(),lastMadness:0,times:[second,third],cause};save();
  log(`rhumertume: ${character} tombe malade (${cause})`);
 }
 async function pendingCases(){
  for(const [character,{cause}] of Object.entries(state.pending))if(!state.infected[character])await catches(character,cause.endsWith('annonce reprise')?cause:cause+', annonce reprise',true);else{delete state.pending[character];save();}
 }
 // a stage reached since the last announcement: "Quoi ? PomX évolue ?!" and the GIF
 async function evolutions(){
  for(const character of Object.keys(state.infected)){
   const p=patient(character),lvl=level(character);
   if(lvl<=p.announced)continue;
   if(lvl>=2&&!p.variant){p.variant=random()<ASPI_CHANCE?'aspi':'pompom';save();}
   await announceWith(`Quoi ? ${nameOf(character,lvl-1)} évolue ?!`,()=>pictures().renderEvolution(character,spriteOf(character,lvl-1),spriteOf(character,lvl)));
   p.announced=lvl;save();
  }
 }
 // a wizard evolution planned by hand (Paris): the stage-1 pom sick the longest reaches the second stage as a Pom-d'aspi;
 // without one it waits until the end of that day
 function plannedWizards(){
  const {date,minutes}=parisParts(now());
  state.planned??={};
  for(const plan of PLANNED_ASPI){
   const key=`${plan.date} ${plan.minutes}`;
   if(state.planned[key]||plan.date!==date||minutes<plan.minutes)continue;
   const character=Object.keys(state.infected).filter(c=>level(c)===1).sort((a,b)=>state.infected[a]-state.infected[b])[0];
   if(!character)continue;
   const p=patient(character);
   if(now()-state.infected[character]<HOUR)state.infected[character]=now()-HOUR;
   const elapsed=now()-state.infected[character],third=(p.times??STAGE_TIMES)[1];
   p.times=[elapsed,Math.max(third,elapsed+HOUR)];p.variant='aspi';state.planned[key]=character;save();
   log(`rhumertume: ${character} devient un Pom-d'aspi (prévu)`);
  }
 }
 let busy=false,waiting=null;
 async function tick(){
  if(busy)return;busy=true;
  try{
   plannedWizards();
   // an evolution that cannot be announced must not hold the day's cases back
   await evolutions().catch(error=>log('rhumertume: evolution: '+error.message));
   await pendingCases().catch(error=>log('rhumertume: annonce reprise: '+error.message));
   const {date,minutes}=parisParts(now());
   if(date>LAST_DAY)return;
   const due=scheduledMinutes(date,minutes).filter(m=>m<=minutes).length;
   while(drawnOn(date).length<due){
    const candidates=[...new Set(await charactersOfTheDay())].filter(name=>name&&name!=='Pom'&&!state.infected[name]&&!state.pending[name]);
    // nobody has a character yet today (none is given before its player's first message): the case waits for one
    if(!candidates.length){if(waiting!==date){waiting=date;log('rhumertume: no healthy character yet, the case waits');}break;}
    const character=candidates[Math.floor(random()*candidates.length)],previous=drawnOn(date);
    state.drawn[date]=[...drawnOn(date),character];save();
    // if Discord is unreachable the draw is undone and retried on the next tick
    try{await catches(character,'tirage du jour');}catch(error){state.drawn[date]=previous;save();throw error;}
   }
   await siege(date,minutes);
  }finally{busy=false;}
 }
 // the siege: once a day (10:00-22:00), when three poms are at stage 2 or 3, three of them corner three healthy characters
 // of the day; the GIF shows how it ends (utils/pomSiege.js), then the outcome is told and those who fell catch it
 const SIEGE_HOURS=[WINDOW[0],22*60],OUTCOME_TEXT={
  repel:d=>`${list(d.defenders)} repoussent l'assaut : les poms s'envolent au loin !`,
  rescue:d=>`Un pom s'accroche, mais les autres viennent à la rescousse : ${list(d.defenders)} s'en sortent indemnes !`,
  flee:d=>`${d.escaped} parvient à s'enfuir… ${list(d.fallen)} tombent sous les morsures des poms.`,
  devour:d=>`${list(d.fallen)} tombent sous les morsures des poms.`};
 const list=names=>names.length<2?names.join(''):names.slice(0,-1).join(', ')+' et '+names.at(-1);
 const shuffled=items=>items.map(v=>[random(),v]).sort((a,b)=>a[0]-b[0]).map(([,v])=>v);
 async function siege(date,minutes){
  if(state.sieges[date]||minutes<SIEGE_HOURS[0]||minutes>=SIEGE_HOURS[1])return;
  const poms=Object.keys(state.infected).filter(c=>level(c)>=2);
  if(poms.length<3)return;
  const healthy=[...new Set(await charactersOfTheDay())].filter(name=>name&&name!=='Pom'&&!state.infected[name]&&!state.pending[name]);
  if(healthy.length<3)return;
  const attackers=shuffled(poms).slice(0,3),defenders=shuffled(healthy).slice(0,3);
  let outcome=['repel','rescue','flee','devour'][Math.floor(random()*4)],result=null;
  try{result=await (renderSiege??require('./pomSiege').renderSiege)(defenders.map(character=>({character})),attackers.map(character=>({character,stage:spriteOf(character)})),outcome,Math.floor(random()*2**31));}
  catch(error){log('rhumertume: siege: '+error.message);}
  // without the picture, the draw alone decides who falls
  outcome=result?.outcome??outcome;
  const escaped=result?.escaped??(outcome==='flee'?defenders[0]:null);
  const fallen=result?.fallen??(outcome==='devour'?defenders:outcome==='flee'?defenders.slice(1):[]);
  state.sieges[date]={attackers,defenders,outcome,fallen};save();
  try{await announce(`${list(attackers.map(c=>nameOf(c)))} encerclent ${list(defenders)}, acculé·es dos à dos !`,result?[{attachment:result.attachment,name:result.name}]:[]);}
  catch(error){delete state.sieges[date];save();throw error;}
  log(`rhumertume: siège (${outcome}) de ${attackers.join(', ')} contre ${defenders.join(', ')}`);
  await wait(result?.duration??0);
  await announce(OUTCOME_TEXT[outcome]({defenders,fallen,escaped}),[]);
  for(const character of fallen)if(!state.infected[character])await catches(character,'siège');
 }
 // an administrator's choice, announced like a draw
 async function infect(character){
  if(drawsOver())throw Error('La rhumertume ne fait plus de nouvelles victimes.');
  if(state.infected[character])throw Error(`${character} est déjà atteint·e.`);
  await catches(character,'/pomifier');
 }
 const textOf=(character,text)=>level(character)===3?pomifyFinal(text,random):pomify(text,stage(character),random);
 // the activity's roleplay: text, avatar and name only
 function roleplay(character,text){
  if(stage(character)==null)return null;
  return {text:textOf(character,text),avatarURL:avatarOf(character),username:nameOf(character)};
 }
 // the roleplay chat: the bubble in place of the text; the gauges take the message in
 async function message(character,text){
  recent.set(character,now());
  if(stage(character)==null)return null;
  const p=patient(character),hours=(now()-p.updated)/HOUR,[rage,madness]=moods(text);
  const clamp=v=>Math.max(0,Math.min(100,v));
  p.rage=clamp(p.rage-GAUGE_DECAY*hours+rage);p.madness=clamp(p.madness-GAUGE_DECAY*hours+madness);p.updated=now();save();
  const lvl=level(character),said=textOf(character,text),out={content:'',username:nameOf(character,lvl),avatarURL:avatarOf(character,lvl)};
  try{out.files=[await pictures().renderBubble(said,lvl)];}catch(error){log('rhumertume: bubble: '+error.message);out.content=said;}
  return out;
 }
 const fill=(template,values)=>template.replace(/\{(\w+)\}/g,(_,k)=>values[k]);
 const pick=list=>list[Math.floor(random()*list.length)];
 // after the pom's message: now and then a bite (twice a day at most for each pom; the victim may catch it), a self-inflicted mishap
 // when madness is high
 // a wizard pom's bite is a spell (utils/pomWizard.js): it flies over its victim on its vacuum and casts; the victim
 // turns white and shrinks, or fades away and, a few seconds later, falls ill (the same chance as a bite's contagion)
 async function spell(character,victim){
  const victimName=stage(victim)==null?victim:nameOf(victim),outcome=stage(victim)==null&&random()<CONTAGION?'vanish':'shrink';
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
 return {tick,infect,stage,level,nameOf,roleplay,message,after,handle,gauges:c=>state.patients[c]&&{rage:state.patients[c].rage,madness:state.patients[c].madness},
  isInfected:character=>stage(character)!=null,infected:()=>Object.keys(state.infected)};
}
module.exports={createRhumertume,pomify,pomifyFinal,progress,moods,parisParts,AVATAR_URL,LAST_DAY};