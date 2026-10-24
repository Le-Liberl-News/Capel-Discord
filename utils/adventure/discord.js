// The adventure on Discord: /aventure (admins) posts the invitation in the adventure channel, its button opens the
// game in the player's DMs, and every DM of a player is a command. Anyone who sees the invitation may play (the channel
// itself is hidden for now); a DM is only read from someone who started through the button.
// When `final.players` players stand in the final room, each of them gets the victory text and the roleplay
// channel the closing one. Players' states survive restarts (store). « /reset » in the DMs starts a player over.
// Each player's last exchanges are kept (logs) for the platform's editor, which follows the games and sends hints
// (snapshot, hint; see platformSync.js).
// Everything is text; a room may have a picture (its "image", a file of rpg/data/aventure/), sent on entering it
// and with « regarder ».
const {ActionRowBuilder,ButtonBuilder,ButtonStyle,PermissionFlagsBits}=require('discord.js');
const path=require('node:path'),fs=require('node:fs'),crypto=require('node:crypto');
const {createAdventure}=require('./engine');
const {renderAnimation}=require('./animations');
const FILES=path.join(__dirname,'../../rpg/data/aventure');
const BUTTON='aventure:jouer',LIMIT=1900;
// Discord refuses messages over 2000 characters: cut between paragraphs, then lines, then words
function chunks(text){
 const out=[];let rest=String(text);
 while(rest.length>LIMIT){
  const cut=Math.max(rest.lastIndexOf('\n\n',LIMIT),rest.lastIndexOf('\n',LIMIT),rest.lastIndexOf(' ',LIMIT));
  const at=cut>0?cut:LIMIT;out.push(rest.slice(0,at));rest=rest.slice(at).trimStart();
 }
 if(rest)out.push(rest);return out;
}
function createAdventureDiscord({client,data,store,channelId,closingChannelId,files=FILES,log=console.error}){
 const game=createAdventure(data);
 const state=store.load()||{players:{},reached:[],done:false};
 state.logs??={};state.names??={};state.won??=[];
 let version=0;   // bumped on every change, so the platform only gets the games when they moved
 const listeners=new Set();   // told of every change (the platform's sync sends it at once)
 const save=()=>{version++;store.save(state);for(const listener of listeners)listener();};
 // the animations drawn since the platform last got them, by their SHA-1: the editor and the spectators show them
 const pendingMedia=new Map();
 const LOG_SIZE=120;
 // one line of a player's game: a command, the bot's reply, a hint
 function note(id,kind,text,media=[]){
  if(!text&&!media.length)return;
  const lines=state.logs[id]??=[];
  lines.push({at:Date.now(),kind,text:String(text||'').slice(0,4000),room:state.players[id]?.room,...(media.length?{media}:{})});
  if(lines.length>LOG_SIZE)lines.splice(0,lines.length-LOG_SIZE);
 }
 const replyText=result=>result.replies.filter(Boolean).join('\n\n');
 const queues=new Map();
 // a reply: its texts, then the room's picture when the player enters or looks at it
 // a reply to a player: its texts, then the room's picture when they enter or look at it and the action's animation;
 // kept in the player's log with what was attached (`id`)
 async function send(channel,result,player,id){
  const parts=chunks(result.replies.filter(Boolean).join('\n\n'));
  const attached=[],media=[];
  const image=(result.moved||result.look)&&game.room(player.room)?.image;
  if(image){
   if(fs.existsSync(path.join(files,image))){attached.push({attachment:path.join(files,image),name:path.basename(image)});media.push({type:'image',file:image});}
   else log('Aventure, image absente :',image);
  }
  // an action's animation (the cards dealt…), drawn from what the player said; the text goes without it if it fails
  if(result.animation){
   try{
    const animation=await renderAnimation(result.animation.name,result.animation.words);
    if(animation){
     const sha=crypto.createHash('sha1').update(animation.attachment).digest('hex');
     attached.push(animation);media.push({type:'animation',sha});pendingMedia.set(sha,animation.attachment);
    }
   }catch(e){log('Aventure, animation :',result.animation.name,e.message);}
  }
  if(id){note(id,'reply',replyText(result),media);save();}
  for(let i=0;i<parts.length;i++)await channel.send({content:parts[i],...(i===parts.length-1&&attached.length?{files:attached}:{}),allowedMentions:{parse:[]}});
  if(!parts.length&&attached.length)await channel.send({files:attached});
 }
 const tell=async(id,content,what)=>{
  if(!content)return;
  try{const user=await client.users.fetch(id);await user.send({content,allowedMentions:{parse:[]}});note(id,'reply',content);}catch(e){log('Aventure, '+what+' :',id,e.code??e);}
 };
 // the final room: the adventure ends for everyone once `final.players` players stand in it (players of any games,
 // they do not need to have played together); until then, those who arrived wait and hear of each newcomer.
 // Arriving after the end still gets the victory.
 async function reach(userId){
  if(state.reached.includes(userId))return;
  state.reached.push(userId);save();
  const need=data.final?.players||1,count=state.reached.length;
  // a win is told once to each player, even one who starts over after the end
  const win=async id=>{if(state.won.includes(id))return;state.won.push(id);await tell(id,data.final.victory,'victoire');};
  if(state.done){await win(userId);save();return;}
  if(count<need){
   const waiting=(data.messages?.waiting||'Il faut être {total} dans cette salle pour achever l’aventure : vous êtes {n} pour l’instant. Attendez vos compagnons…')
    .replaceAll('{n}',String(count)).replaceAll('{total}',String(need));
   for(const id of state.reached)await tell(id,id===userId?waiting:(data.messages?.joined||'Un compagnon vous a rejoint ({n}/{total}).').replaceAll('{n}',String(count)).replaceAll('{total}',String(need)),'attente');
   save();
   return;
  }
  state.done=true;save();
  for(const id of state.reached)await win(id);
  save();
  if(data.final.closing&&closingChannelId){
   try{const channel=await client.channels.fetch(closingChannelId);await channel.send({content:data.final.closing,allowedMentions:{parse:[]}});}catch(e){log('Aventure, clôture :',e.code??e);}
  }
 }
 async function handle(interaction){
  if(interaction.isChatInputCommand?.()&&interaction.commandName==='aventure'){
   if(!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)){await interaction.reply({content:'Commande réservée aux administrateurs.',flags:64});return true;}
   const channel=await client.channels.fetch(channelId);
   const row=new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId(BUTTON).setLabel(data.post?.button||'Entrer').setStyle(ButtonStyle.Primary));
   await channel.send({content:data.post?.text||'Une aventure vous attend.',components:[row],allowedMentions:{parse:[]}});
   await interaction.reply({content:'Invitation publiée dans <#'+channelId+'>.',flags:64});
   return true;
  }
  if(!(interaction.isButton?.()&&interaction.customId===BUTTON))return false;
  await interaction.deferReply({flags:64});
  const id=interaction.user.id,known=state.players[id];
  const player=known||game.fresh();
  state.names[id]=interaction.user.globalName||interaction.user.username||id;
  try{
   const dm=await interaction.user.createDM();
   const opening=known?{replies:[data.messages?.resume||'Vous reprenez votre aventure.',game.describe(player)],look:true}:game.start(player);
   await send(dm,opening,player,id);
  }catch(e){
   log('Aventure, MP :',e.code??e);
   await interaction.editReply({content:"Je n'arrive pas à t'écrire en message privé : autorise les MP des membres du serveur puis réessaie."});return true;
  }
  if(!known)state.players[id]=player;
  save();
  await interaction.editReply({content:'Je t’ai écrit en message privé.'});
  return true;
 }
 // a DM from a player: one command, played after the previous one is answered
 function message(msg){
  if(msg.author.bot||msg.guild||!state.players[msg.author.id]||!msg.content.trim())return false;
  const id=msg.author.id;
  state.names[id]=msg.author.globalName||msg.author.username||state.names[id]||id;
  const next=(queues.get(id)||Promise.resolve()).then(async()=>{
   note(id,'command',msg.content.trim());
   // « /reset »: the adventure starts over, even after its end (a win already told is not told again)
   if(msg.content.trim().toLowerCase()==='/reset'){
    const player=game.fresh(),start=game.start(player);
    const restart={...start,replies:[data.messages?.reset||'Votre aventure recommence depuis le début.',...start.replies]};
    state.players[id]=player;state.reached=state.reached.filter(r=>r!==id);
    await send(msg.channel,restart,player,id);
    return;
   }
   const player=state.players[id];
   if(state.done&&state.reached.includes(id)){const over=data.messages?.over||'Votre aventure est terminée.';note(id,'reply',over);save();await msg.channel.send({content:over});return;}
   const result=game.handle(player,msg.content);
   await send(msg.channel,result,player,id);
   if(result.final)await reach(id);
  }).catch(e=>log('Aventure :',e));
  queues.set(id,next);
  return true;
 }
 // the games for the platform: every player's state and last exchanges
 const snapshot=()=>Object.entries(state.players).map(([id,player])=>({id,name:state.names[id]||id,state:player,log:state.logs[id]||[]}));
 // a hint written on the platform, sent in DM
 async function hint(id,text){
  if(!state.players[id])throw new Error('joueur inconnu');
  const user=await client.users.fetch(id);
  await user.send({content:(data.messages?.hint||'💡 **Indice** : ')+text,allowedMentions:{parse:[]}});
  note(id,'hint',text);save();
 }
 // the animations the platform does not have yet, and their delivery
 const media=()=>[...pendingMedia].map(([sha,data])=>({sha,type:'image/gif',data:data.toString('base64')}));
 const mediaSent=shas=>{for(const sha of shas)pendingMedia.delete(sha);};
 const subscribe=listener=>{listeners.add(listener);return()=>listeners.delete(listener);};
 return {handle,message,state,snapshot,hint,media,mediaSent,subscribe,version:()=>version};
}
module.exports={createAdventureDiscord,chunks,BUTTON};
