// Rhumertume (Halloween 2026): twice a day, at unpredictable times between 10:00 and 13:00 (Paris), one of the characters
// played that day starts turning into a pom-tiron; an administrator can also infect a character with /pomifier.
// The illness belongs to the character, whoever plays it. In the roleplay chat its words become "pom" little by little
// (30% after an hour, 60% after 3h30, every word but one in eight after 7 hours) and are shown in a Sky bubble; its
// avatar is a pom wearing the character's hair, in three stages: PomX at once, PompomX from 3h30, PomdeterX from 7 hours,
// each step announced with a Pokémon-like evolution GIF. How the player writes feeds two gauges: rage (capitals, "!")
// makes the pom bite whoever spoke lately, who may catch the illness; madness ("?", emojis) makes it hurt itself.
// "pom", "citrouille", "potiron" and plain full stops calm both. New cases stop after October 31; the sick stay sick.
const {PermissionFlagsBits}=require('discord.js');
const HOUR=3600000,LAST_DAY='2026-10-31';
const WINDOW=[10*60,13*60];
const CASES_PER_DAY=2;
const PROGRESS=[[0,0],[HOUR,.3],[3.5*HOUR,.6],[7*HOUR,1]];
const AVATAR_URL='https://leliberlnews.fr/activite/assets/sky/chat/pom-tiron.png';
const PREFIX=['','Pom','Pompom','Pomdeter'];
const GAUGE_DECAY=8,ACTION_AT=70,AFTER_ACTION=35,CONTAGION=.3,RECENT=30*60000;
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
function progress(elapsed){
 for(let i=1;i<PROGRESS.length;i++){const [t0,s0]=PROGRESS[i-1],[t1,s1]=PROGRESS[i];if(elapsed<t1)return s0+(s1-s0)*Math.max(0,elapsed-t0)/(t1-t0);}
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
function createRhumertume({store,now=()=>Date.now(),random=Math.random,charactersOfTheDay,characterNames=[],announce,render,log=()=>{}}){
 const state={schedule:{},drawn:{},infected:{},patients:{},...(store.load()??{})};
 state.patients??={};
 const save=()=>store.save(state);
 const pictures=()=>render??(render=require('./pomRendering'));
 const drawsOver=()=>parisParts(now()).date>LAST_DAY;
 const recent=new Map();   // character -> last time it spoke in the roleplay chat
 // the day's times (minutes, Paris), drawn once inside the window; a day picked up late only gets the times still ahead
 function scheduledMinutes(date,minutes){
  const list=state.schedule[date]==null?[]:[].concat(state.schedule[date]),before=list.length;
  while(list.length<CASES_PER_DAY&&minutes<WINDOW[1]){const from=Math.max(WINDOW[0],minutes);list.push(from+Math.floor(random()*(WINDOW[1]-from+1)));}
  if(list.length!==before||!Array.isArray(state.schedule[date])){state.schedule[date]=list.sort((a,b)=>a-b);save();}
  return state.schedule[date];
 }
 const drawnOn=date=>state.drawn[date]===undefined?[]:[].concat(state.drawn[date]);
 // 0 right after the first symptoms, 1 seven hours later; null when healthy
 function stage(character){const since=state.infected[character];return since==null?null:progress(now()-since);}
 const level=character=>{const s=stage(character);return s==null?0:levelOf(s);};
 const nameOf=(character,lvl=level(character))=>PREFIX[lvl]+character;
 const avatarOf=(character,lvl=level(character))=>characterNames.includes(character)?pictures().avatarURL(character,lvl):AVATAR_URL;
 // a patient's book-keeping (gauges, last stage announced); one infected before this version starts where it is
 function patient(character){
  return state.patients[character]??={announced:level(character),rage:0,madness:0,updated:now(),lastRage:0,lastMadness:0};
 }
 // an announcement with its GIF; the text alone if the picture fails
 async function announceWith(text,picture){
  let files=[];
  try{files=[await picture()];}catch(error){log('rhumertume: picture: '+error.message);}
  await announce(text,files);
 }
 async function catches(character){
  state.infected[character]=now();state.patients[character]={announced:1,rage:0,madness:0,updated:now(),lastRage:0,lastMadness:0};save();
  try{await announceWith(symptoms(character),()=>pictures().renderEvolution(character,0,1));}
  catch(error){delete state.infected[character];delete state.patients[character];save();throw error;}
 }
 // a stage reached since the last announcement: "Quoi ? PomX évolue ?!" and the GIF
 async function evolutions(){
  for(const character of Object.keys(state.infected)){
   const p=patient(character),lvl=level(character);
   if(lvl<=p.announced)continue;
   await announceWith(`Quoi ? ${nameOf(character,lvl-1)} évolue ?!`,()=>pictures().renderEvolution(character,lvl-1,lvl));
   p.announced=lvl;save();
  }
 }
 let busy=false;
 async function tick(){
  if(busy)return;busy=true;
  try{
   await evolutions();
   const {date,minutes}=parisParts(now());
   if(date>LAST_DAY)return;
   const due=scheduledMinutes(date,minutes).filter(m=>m<=minutes).length;
   while(drawnOn(date).length<due){
    const candidates=[...new Set(await charactersOfTheDay())].filter(name=>name&&name!=='Pom'&&!state.infected[name]);
    if(!candidates.length){state.drawn[date]=[...drawnOn(date),null];save();log('rhumertume: no healthy character today');continue;}
    const character=candidates[Math.floor(random()*candidates.length)],previous=state.drawn[date];
    state.drawn[date]=[...drawnOn(date),character];save();
    // if Discord is unreachable the draw is undone and retried on the next tick
    try{await catches(character);}catch(error){if(previous===undefined)delete state.drawn[date];else state.drawn[date]=previous;save();throw error;}
   }
  }finally{busy=false;}
 }
 // an administrator's choice, announced like a draw
 async function infect(character){
  if(drawsOver())throw Error('La rhumertume ne fait plus de nouvelles victimes.');
  if(state.infected[character])throw Error(`${character} est déjà atteint·e.`);
  await catches(character);
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
 // after the pom's message: a bite when the rage is high (the victim may catch it), a self-inflicted mishap when madness is
 async function after(character){
  if(stage(character)==null)return;
  const p=patient(character),t=now();
  if(p.rage>=ACTION_AT&&t-p.lastRage>=HOUR){
   const victims=[...recent].filter(([name,at])=>name!==character&&name!=='Pom'&&t-at<=RECENT).map(([name])=>name);
   if(victims.length){
    const victim=pick(victims);p.lastRage=t;p.rage=AFTER_ACTION;save();
    await announce(fill(pick(RAGE),{perso:nameOf(character),victime:stage(victim)==null?victim:nameOf(victim)}),[]);
    if(stage(victim)==null&&random()<CONTAGION)await catches(victim);
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