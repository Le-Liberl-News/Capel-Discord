const {randomBytes}=require('node:crypto');
const {ActivityError}=require('./activityService');
const {DT,groundField,initialAirship,validControls,stepAirship,resetAirship}=require('../activity/airship-physics.cjs');
function createActivityAirship({config,ground,now=Date.now,resolveCharacter=async()=>'? ',onSay=()=>{}}){
 const sessions=new Map(),players=new Map(),messages=[];let cursor=0;
 function snapshot(p){return {id:p.id,character:p.character,...p.airship,hp:100,airship:{...p.airship}};}
 function prune(){for(const [id,p]of players)if(now()-p.seen>120000)players.delete(id);for(const [token,s]of sessions)if(s.expires<now())sessions.delete(token);}
 return {
  resetPlayer(id){players.delete(id);},refreshCharacter(){},
  async join({id,channel}){prune();let p=players.get(id);if(!p){p={id,character:await resolveCharacter(id),airship:initialAirship(config.spawn),seen:now(),time:now(),budget:.25};players.set(id,p);}p.seen=now();const token=randomBytes(32).toString('hex');sessions.set(token,{id,channel,expires:now()+7200000});return {activity_token:token,player:snapshot(p),character:p.character,messageCursor:cursor};},
  leave(token,keep=false){const s=sessions.get(token);sessions.delete(token);if(s&&!keep)players.delete(s.id);},
  captureMessage(message){const p=players.get(message.author);if(!p)return false;messages.push({id:'airship:'+ ++cursor,sequence:cursor,author:p.id,character:p.character,text:String(message.text).slice(0,4000),created:now()});return true;},
  async state(token,point,after=0){prune();const session=sessions.get(token),p=session&&players.get(session.id);if(!p)throw new ActivityError('Reconnectez-vous.',401);
   p.seen=now();p.budget=Math.min(2.5,p.budget+Math.max(0,(now()-p.time)/1000));p.time=now();
   const frames=point?.flight?.frames??[];if(!Array.isArray(frames)||frames.length>180)throw new ActivityError('Commande de pilotage invalide.',400);
   for(const f of frames){if(!Number.isSafeInteger(f.sequence)||!validControls(f.controls))throw new ActivityError('Commande de pilotage invalide.',400);if(f.sequence<=p.airship.sequence)continue;if(f.sequence!==p.airship.sequence+1||p.budget<DT)break;stepAirship(p.airship,f.controls,ground,config.spawn);p.airship.sequence=f.sequence;p.budget-=DT;}
   let actionResult;const action=point?.action;if(action){if(typeof action.id!=='string'||action.id.length>80)throw new ActivityError('Action invalide.',400);actionResult={id:action.id};p.actionIds??=new Set();if(!p.actionIds.has(action.id)){p.actionIds.add(action.id);if(p.actionIds.size>128)p.actionIds.delete(p.actionIds.values().next().value);if(action.type==='flight_reset')resetAirship(p.airship,config.spawn);else if(action.type==='say'&&typeof action.text==='string'&&action.text.trim()&&action.text.length<=4000&&now()-(p.spoken??-Infinity)>750){p.spoken=now();this.captureMessage({author:p.id,text:action.text});if(action.rp===true)Promise.resolve().then(()=>onSay({id:'airship-say:'+action.id,actor:p.id,character:p.character,text:action.text,map:'liberl',rp:true})).catch(()=>{});}}}
   while(messages.length>50||messages[0]&&now()-messages[0].created>30000)messages.shift();
   return {character:p.character,joueurs:[...players.values()].filter(other=>other.id===p.id||now()-other.seen<15000).map(snapshot),position:{x:p.airship.x,y:p.airship.y,z:p.airship.z},airship:{...p.airship},movementSequence:p.airship.sequence,health:{hp:100,serverTime:now(),canMove:true},messages:messages.filter(m=>m.sequence>after),messageCursor:cursor,actionResult};
  }
 };
}
module.exports={createActivityAirship};
