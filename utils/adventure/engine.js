// Text adventure (Halloween 2026): a fort played in the bot's DMs. Everything comes from the adventure's JSON
// (rpg/data/aventure.json, format in docs/aventure.md); this engine only reads commands and applies them to one
// player's state: the room, the inventory, the triggers set (a trigger set stays set).
// A command is a verb and nouns ("ouvre la porte avec la clé"): the actions of the JSON whose verb and nouns match,
// in this room, are tried in order; the first whose conditions hold is done (objects used are lost, tools kept,
// triggers set, objects given, text shown); if none holds, the first one's failure text is shown.
const STOPWORDS=new Set(['le','la','les','l','un','une','des','du','de','d','au','aux','a','vers','sur','dans','avec','en','et','ce','cet','cette','ces','mon','ma','mes','son','sa','ses','y','par']);
const DEFAULT_DIRECTIONS={nord:['n','nord'],sud:['s','sud'],est:['e','est'],ouest:['o','ouest'],haut:['monter','haut','h'],bas:['descendre','bas','b']};
const DEFAULT_COMMANDS={inventaire:['inventaire','inv','i'],regarder:['regarder','regarde','r','observer'],aide:['aide','help','?'],aller:['aller','va','vais','marcher','avancer','entrer','entre','go']};
// "Ouvre-la porte, avec l'énorme clé !" -> ['ouvre','porte','enorme','cle'] (no accents, no articles)
function words(text){
 return String(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').replace(/[^a-z0-9?\s-]/g,' ').replace(/-/g,' ')
  .split(/\s+/).filter(w=>w&&!STOPWORDS.has(w));
}
const norm=w=>words(w).join(' ');
function createAdventure(data){
 const rooms=new Map(data.rooms.map(r=>[String(r.id),r])),objects=new Map((data.objects||[]).map(o=>[String(o.id),o]));
 const messages={unknown:"Je n'ai pas compris.",fail:'Rien ne se passe.',noexit:'Vous ne pouvez pas aller par là.',empty:"Vous n'avez rien sur vous.",inventory:'Vous avez :',...data.messages};
 // synonyms: every word of a list stands for the list's key (verbs, nouns, directions, built-in commands)
 const table=(lists,defaults={})=>{const map=new Map();for(const [key,list] of Object.entries({...defaults,...lists}))for(const w of [key,...list])map.set(norm(w),norm(key));return map;};
 const verbs=table(data.verbs),nouns=table(data.nouns),directions=table(data.directions,DEFAULT_DIRECTIONS),commands=table(data.commands,DEFAULT_COMMANDS);
 const room=id=>rooms.get(String(id));
 const objectName=id=>objects.get(String(id))?.name??String(id);
 function fresh(){return {room:String(data.start),inventory:[...(data.inventory||[]).map(String)],triggers:[],visited:[String(data.start)]};}
 // conditions shared by actions, exits and room details
 function holds(state,c){
  const set=new Set(state.triggers),inv=state.inventory;
  return (c.must||[]).every(t=>set.has(String(t)))&&(c.mustnot||[]).every(t=>!set.has(String(t)))
   &&[...(c.use||[]),...(c.tool||[])].every(o=>inv.includes(String(o)));
 }
 function describe(state){
  const r=room(state.room);
  const details=(r.details||[]).filter(d=>holds(state,d)).map(d=>d.text);
  return [r.description,...details].filter(Boolean).join('\n\n');
 }
 function inventory(state){
  if(!state.inventory.length)return messages.empty;
  return messages.inventory+'\n'+state.inventory.map(o=>'• '+objectName(o)).join('\n');
 }
 function apply(state,a){
  for(const o of a.use||[]){const i=state.inventory.indexOf(String(o));if(i>=0)state.inventory.splice(i,1);}
  for(const t of a.effect||[])if(!state.triggers.includes(String(t)))state.triggers.push(String(t));
  for(const o of a.give||[])if(!state.inventory.includes(String(o)))state.inventory.push(String(o));
  if a.to{go(state,a.to)};
 }
 // moving: through one of the room's exits, if its conditions hold; returns the new room's description
 function go(state,direction){
  const exit=room(state.room).exits?.[direction];
  if(exit==null)return {replies:[messages.noexit]};
  const e=typeof exit==='object'?exit:{to:exit};
  if(!holds(state,e))return {replies:[e.fail||messages.noexit]};
  apply(state,e);return enter(state,e.to,e.text);
 }
 function enter(state,to,before){
  state.room=String(to);const first=!state.visited.includes(state.room);if(first)state.visited.push(state.room);
  const final=data.final&&String(data.final.room)===state.room;
  return {replies:[before,describe(state)].filter(Boolean),moved:true,first,final};
 }
 // the actions matching a verb and the nouns said, in this room (place [0]: anywhere); the more nouns, the better
 function candidates(state,verb,said){
  return (data.actions||[]).filter(a=>norm(a.verb)===verb||verbs.get(norm(a.verb))===verb)
   .filter(a=>{const places=(a.place||[0]).map(String);return places.includes('0')||places.includes(state.room);})
   .filter(a=>(a.noun||[]).every(n=>said.includes(nouns.get(norm(n))??norm(n))))
   .sort((a,b)=>(b.noun||[]).length-(a.noun||[]).length);
 }
 function handle(state,text){
  const w=words(text);
  if(!w.length)return {replies:[messages.unknown]};
  const said=w.map(x=>nouns.get(x)??directions.get(x)??x),first=commands.get(w[0])??verbs.get(w[0])??w[0];
  if(first==='inventaire'&&w.length===1)return {replies:[inventory(state)]};
  if(first==='aide')return {replies:[messages.help||'Écrivez ce que vous voulez faire : « nord », « prendre la clé », « ouvrir la porte avec la clé ». « inventaire » liste vos objets, « regarder » décrit la salle.']};
  if(first==='regarder'&&w.length===1)return {replies:[describe(state)],look:true};
  // a direction alone, or "aller nord"
  const direction=directions.get(w[0])??(first==='aller'&&w[1]?directions.get(w[1]):undefined);
  const verb=verbs.get(w[0])??w[0];
  const list=candidates(state,verb,said.slice(1));
  if(list.length){
   const done=list.find(a=>holds(state,a));
   if(!done)return {replies:[list.find(a=>a.fail)?.fail??messages.fail]};
   apply(state,done);
   if(done.move!=null)return enter(state,done.move,done.text);
   return {replies:[done.text||messages.fail]};
  }
  if(direction)return go(state,direction);
  return {replies:[messages.unknown]};
 }
 return {fresh,handle,describe,room,start:state=>({replies:[data.intro,describe(state)].filter(Boolean),moved:true}),words};
}
module.exports={createAdventure,words};
