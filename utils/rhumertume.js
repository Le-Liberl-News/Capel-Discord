// Rhumertume (Halloween 2026): once a day, at an unpredictable time, one of the characters played that day
// starts turning into a pom-tiron. The illness belongs to the character, whoever plays it.
// In the roleplay channel its words become "pom" little by little, every word after three days.
const DAY_MS=86400000,FULL_MS=3*DAY_MS;
const FIRST_DAY='2026-10-13',FIRST_MINUTE=21*60+8,LAST_DAY='2026-10-31';
const WINDOW=[9*60,23*60+30];          // later days: anywhere between 9:00 and 23:30, Paris time
const AVATAR_URL='https://leliberlnews.fr/activite/assets/sky/halloween/pom-tiron.png';
const parisFormat=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
function parisParts(ms){const p=Object.fromEntries(parisFormat.formatToParts(ms).map(x=>[x.type,x.value]));return {date:`${p.year}-${p.month}-${p.day}`,minutes:Number(p.hour)*60+Number(p.minute)};}
const PROTECTED=/(https?:\/\/\S+|<[^>\s]+>|:[\w~]+:)/u,WORD=/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;
function pom(word){return word.length>1&&word===word.toLocaleUpperCase('fr')&&word!==word.toLocaleLowerCase('fr')?'POM':word[0]!==word[0].toLocaleLowerCase('fr')?'Pom':'pom';}
// Each word turns into "pom" with the given probability; links, mentions, emojis and punctuation are kept.
function pomify(text,stage,random=Math.random){
 return String(text).split(PROTECTED).map((part,i)=>i%2?part:part.replace(WORD,word=>stage>=1||random()<stage?pom(word):word)).join('');
}
function createRhumertume({store,now=()=>Date.now(),random=Math.random,charactersOfTheDay,announce,log=()=>{}}){
 const state={schedule:{},drawn:{},infected:{},...(store.load()??{})};
 const save=()=>store.save(state);
 function scheduledMinute(date){
  if(state.schedule[date]==null){state.schedule[date]=date===FIRST_DAY?FIRST_MINUTE:WINDOW[0]+Math.floor(random()*(WINDOW[1]-WINDOW[0]+1));save();}
  return state.schedule[date];
 }
 let busy=false;
 async function tick(){
  if(busy)return;busy=true;
  try{
   const {date,minutes}=parisParts(now());
   if(date<FIRST_DAY||date>LAST_DAY||date in state.drawn||minutes<scheduledMinute(date))return;
   const candidates=[...new Set(await charactersOfTheDay())].filter(name=>name&&name!=='Pom'&&!state.infected[name]);
   if(!candidates.length){state.drawn[date]=null;save();log('rhumertume: no healthy character today');return;}
   const character=candidates[Math.floor(random()*candidates.length)];
   state.infected[character]=now();state.drawn[date]=character;save();
   // if Discord is unreachable the draw is undone and retried on the next tick
   try{await announce(`${character} semble développer des symptômes préoccupants.`);}catch(error){delete state.infected[character];delete state.drawn[date];save();throw error;}
  }finally{busy=false;}
 }
 // 0 right after the first symptoms, 1 three days later; null when healthy or once October is over
 function stage(character){
  const since=state.infected[character];
  if(since==null||parisParts(now()).date>LAST_DAY)return null;
  return Math.max(0,Math.min(1,(now()-since)/FULL_MS));
 }
 function roleplay(character,text){const s=stage(character);return s==null?null:{text:pomify(text,s,random),avatarURL:AVATAR_URL};}
 return {tick,stage,roleplay,isInfected:character=>stage(character)!=null,infected:()=>Object.keys(state.infected).filter(c=>stage(c)!=null)};
}
module.exports={createRhumertume,pomify,parisParts,AVATAR_URL,FIRST_DAY,LAST_DAY};
