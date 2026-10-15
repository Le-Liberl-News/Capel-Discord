// Rhumertume (Halloween 2026): once a day (twice from October 15), at unpredictable times, one of the characters
// played that day starts turning into a pom-tiron. The illness belongs to the character, whoever plays it.
// In the roleplay channel its words become "pom" little by little, every word after three days.
const DAY_MS=86400000,FULL_MS=3*DAY_MS;
const FIRST_DAY='2026-10-13',FIRST_MINUTE=21*60+8,LAST_DAY='2026-10-31';
const WINDOW=[9*60,23*60+30];          // later days: anywhere between 9:00 and 23:30, Paris time
const casesOn=date=>date>='2026-10-15'?2:1;
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
 // the day's times (minutes, Paris), drawn once; a time added to a day already under way comes after the present minute
 function scheduledMinutes(date,minutes){
  const list=state.schedule[date]==null?[]:[].concat(state.schedule[date]),before=list.length;
  while(list.length<casesOn(date)){const from=list.length===0&&date===FIRST_DAY?null:Math.max(WINDOW[0],Math.min(WINDOW[1],minutes));list.push(from==null?FIRST_MINUTE:from+Math.floor(random()*(WINDOW[1]-from+1)));}
  if(list.length!==before||!Array.isArray(state.schedule[date])){state.schedule[date]=list.sort((a,b)=>a-b);save();}
  return state.schedule[date];
 }
 const drawnOn=date=>state.drawn[date]===undefined?[]:[].concat(state.drawn[date]);
 let busy=false;
 async function tick(){
  if(busy)return;busy=true;
  try{
   const {date,minutes}=parisParts(now());
   if(date<FIRST_DAY||date>LAST_DAY)return;
   const due=scheduledMinutes(date,minutes).filter(m=>m<=minutes).length;
   while(drawnOn(date).length<due){
    const candidates=[...new Set(await charactersOfTheDay())].filter(name=>name&&name!=='Pom'&&!state.infected[name]);
    if(!candidates.length){state.drawn[date]=[...drawnOn(date),null];save();log('rhumertume: no healthy character today');continue;}
    const character=candidates[Math.floor(random()*candidates.length)],previous=state.drawn[date];
    state.infected[character]=now();state.drawn[date]=[...drawnOn(date),character];save();
    // if Discord is unreachable the draw is undone and retried on the next tick
    try{await announce(`${character} semble développer des symptômes préoccupants.`);}catch(error){delete state.infected[character];if(previous===undefined)delete state.drawn[date];else state.drawn[date]=previous;save();throw error;}
   }
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
