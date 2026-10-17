// Rhumertume (Halloween 2026): twice a day, at unpredictable times between 10:00 and 13:00 (Paris), one of the characters
// played that day starts turning into a pom-tiron; an administrator can also infect a character with /pomifier.
// The illness belongs to the character, whoever plays it. In the roleplay chat its avatar becomes a pom-tiron and its
// words become "pom" little by little: 30% after an hour, 60% after 3h30, every word after 7 hours.
// Everything stops at midnight on November 1st.
const {PermissionFlagsBits}=require('discord.js');
const HOUR=3600000,LAST_DAY='2026-10-31';
const WINDOW=[10*60,13*60];
const CASES_PER_DAY=2;
const PROGRESS=[[0,0],[HOUR,.3],[3.5*HOUR,.6],[7*HOUR,1]];
const AVATAR_URL='https://leliberlnews.fr/activite/assets/sky/chat/pom-tiron.png';
const parisFormat=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
function parisParts(ms){const p=Object.fromEntries(parisFormat.formatToParts(ms).map(x=>[x.type,x.value]));return {date:`${p.year}-${p.month}-${p.day}`,minutes:Number(p.hour)*60+Number(p.minute)};}
const PROTECTED=/(https?:\/\/\S+|<[^>\s]+>|:[\w~]+:)/u,WORD=/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;
function pom(word){return word.length>1&&word===word.toLocaleUpperCase('fr')&&word!==word.toLocaleLowerCase('fr')?'POM':word[0]!==word[0].toLocaleLowerCase('fr')?'Pom':'pom';}
// Each word turns into "pom" with the given probability; links, mentions, emojis and punctuation are kept.
function pomify(text,stage,random=Math.random){
 return String(text).split(PROTECTED).map((part,i)=>i%2?part:part.replace(WORD,word=>stage>=1||random()<stage?pom(word):word)).join('');
}
// share of the words turned into "pom", time since the first symptoms
function progress(elapsed){
 for(let i=1;i<PROGRESS.length;i++){const [t0,s0]=PROGRESS[i-1],[t1,s1]=PROGRESS[i];if(elapsed<t1)return s0+(s1-s0)*Math.max(0,elapsed-t0)/(t1-t0);}
 return 1;
}
const symptoms=character=>`${character} semble développer des symptômes préoccupants.`;
function createRhumertume({store,now=()=>Date.now(),random=Math.random,charactersOfTheDay,characterNames=[],announce,log=()=>{}}){
 const state={schedule:{},drawn:{},infected:{},...(store.load()??{})};
 const save=()=>store.save(state);
 const over=()=>parisParts(now()).date>LAST_DAY;
 // the day's times (minutes, Paris), drawn once inside the window; a day picked up late only gets the times still ahead
 function scheduledMinutes(date,minutes){
  const list=state.schedule[date]==null?[]:[].concat(state.schedule[date]),before=list.length;
  while(list.length<CASES_PER_DAY&&minutes<WINDOW[1]){const from=Math.max(WINDOW[0],minutes);list.push(from+Math.floor(random()*(WINDOW[1]-from+1)));}
  if(list.length!==before||!Array.isArray(state.schedule[date])){state.schedule[date]=list.sort((a,b)=>a-b);save();}
  return state.schedule[date];
 }
 const drawnOn=date=>state.drawn[date]===undefined?[]:[].concat(state.drawn[date]);
 let busy=false;
 async function tick(){
  if(busy)return;busy=true;
  try{
   const {date,minutes}=parisParts(now());
   if(date>LAST_DAY)return;
   const due=scheduledMinutes(date,minutes).filter(m=>m<=minutes).length;
   while(drawnOn(date).length<due){
    const candidates=[...new Set(await charactersOfTheDay())].filter(name=>name&&name!=='Pom'&&!state.infected[name]);
    if(!candidates.length){state.drawn[date]=[...drawnOn(date),null];save();log('rhumertume: no healthy character today');continue;}
    const character=candidates[Math.floor(random()*candidates.length)],previous=state.drawn[date];
    state.infected[character]=now();state.drawn[date]=[...drawnOn(date),character];save();
    // if Discord is unreachable the draw is undone and retried on the next tick
    try{await announce(symptoms(character));}catch(error){delete state.infected[character];if(previous===undefined)delete state.drawn[date];else state.drawn[date]=previous;save();throw error;}
   }
  }finally{busy=false;}
 }
 // an administrator's choice, announced like a draw
 async function infect(character){
  if(over())throw Error('La rhumertume est terminée.');
  if(state.infected[character])throw Error(`${character} est déjà atteint·e.`);
  state.infected[character]=now();save();
  try{await announce(symptoms(character));}catch(error){delete state.infected[character];save();throw error;}
 }
 // share of pom in the words: 0 right after the first symptoms, 1 seven hours later; null when healthy or once October is over
 function stage(character){
  const since=state.infected[character];
  if(since==null||over())return null;
  return progress(now()-since);
 }
 function roleplay(character,text){const s=stage(character);return s==null?null:{text:pomify(text,s,random),avatarURL:AVATAR_URL};}
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
 return {tick,infect,stage,roleplay,handle,isInfected:character=>stage(character)!=null,infected:()=>Object.keys(state.infected).filter(c=>stage(c)!=null)};
}
module.exports={createRhumertume,pomify,progress,parisParts,AVATAR_URL,LAST_DAY};
