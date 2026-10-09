const {terminalNearby}=require("../activity/terminal-world.cjs");
const {ActivityError}=require("./activityService");
function createActivityTerminal({lobby,duels,client,resolveCharacter,assignedCharacters,terminal,announceHunt=async()=>{},huntStarted=async()=>{},testCharacters=null,now=Date.now}) {
 const pending=new Map(),completed=new Map();
 async function nearby(token) {
  const identity=lobby.identity(token),p=await lobby.terminalPosition(token);
  if(identity.map!=="anterose"||!p||p.hp===0||!terminalNearby(p,terminal))
   throw new ActivityError("Approchez-vous du Capel.",403);
  return identity;
 }
 async function menu(token) {
  const {id}=await nearby(token),own=await resolveCharacter(id),characters=await assignedCharacters();
  return {testCharacters:testCharacters?.menu(id)??null,characters:characters.filter(name=>name!==own),hunt:lobby.huntSummary(),requests:duels.pending(id)};
 }
 async function perform(token,body) {
  const {id}=lobby.identity(token);
  switch(body.action) {
   case "test_character": {
    await nearby(token);
    if(!testCharacters)throw new ActivityError("Test indisponible.",403);
    testCharacters.set(id,body.character);lobby.refreshCharacter(id);
    return {message:"Personnage modifi\u00e9."};
   }
   case "duel": {
    await nearby(token);
    if(typeof body.character!=="string"||!(await assignedCharacters()).includes(body.character))throw new ActivityError("Personnage indisponible.",400);
    return duels.challenge({id},body.character,client);
   }
   case "accept":return duels.accept(body.invitation,id,client);
   case "decline":return duels.decline(body.invitation,id);
   case "hunt_create": {
    await nearby(token);
    const character=await resolveCharacter(id),game=lobby.createHunt(id,10);
    try {await announceHunt(game);lobby.joinHunt(game.id,id,character);}catch(error){lobby.cancelHunt(game.id,id);throw error;}
    return {message:"Partie ouverte."};
   }
   case "hunt_join":await nearby(token);lobby.validateJoinHunt(body.invitation,id);lobby.joinHunt(body.invitation,id,await resolveCharacter(id));return {message:"Partie rejointe."};
   case "hunt_start":{const state=lobby.startHunt(body.invitation,id);try{await huntStarted(state);}catch(error){console.error("Activity Prop Hunt announcement failed:",error.code??"unavailable");}return {message:"Partie lanc\u00e9e."};}
   default:throw new ActivityError("Action inconnue.",400);
  }
 }
 async function action(token,body) {
  const {id}=lobby.identity(token);
  if(!body||typeof body.request!=="string"||!/^[a-zA-Z0-9-]{8,64}$/.test(body.request)||typeof body.action!=="string"||
   (["accept","decline","hunt_join","hunt_start"].includes(body.action)&&(typeof body.invitation!=="string"||body.invitation.length>80)))throw new ActivityError("Requ\u00eate invalide.",400);
  for(const [key,value]of completed)if(value.expires<now())completed.delete(key);
  const key=id+":"+body.request,fingerprint=JSON.stringify([body.action,body.character,body.invitation]);
  const previous=completed.get(key);
  if(previous){if(previous.fingerprint!==fingerprint)throw new ActivityError("Requ\u00eate d\u00e9j\u00e0 utilis\u00e9e.",409);return previous.result;}
  if(pending.has(id))throw new ActivityError("Action en cours.",409);
  pending.set(id,true);
  try {const result=await perform(token,body);completed.set(key,{fingerprint,result,expires:now()+60000});return result;}
  finally {pending.delete(id);}
 }
 return {menu,action};
}
module.exports={createActivityTerminal};
