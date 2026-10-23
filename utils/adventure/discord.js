// The adventure on Discord: /aventure (admins) posts the invitation in the adventure channel, its button opens the
// game in the player's DMs, and every DM of a player is a command. For now only administrators and the users of
// `allowed` may play (the button checks it; a DM is only read from someone who started through the button).
// When `final.players` players stand in the final room, each of them gets the victory text and the roleplay
// channel the closing one. Players' states survive restarts (store). « /reset » in the DMs starts a player over.
// Each player's last exchanges are kept (logs) for the platform's editor, which follows the games and sends hints
// (snapshot, hint; see platformSync.js).
// Everything is text; a room may have a picture (its "image", a file of rpg/data/aventure/), sent on entering it
// and with « regarder ».
const {ActionRowBuilder,ButtonBuilder,ButtonStyle,PermissionFlagsBits}=require('discord.js');
const path=require('node:path'),fs=require('node:fs');
const {createAdventure}=require('./engine');
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
function createAdventureDiscord({client,data,store,channelId,closingChannelId,allowed=[],files=FILES,log=console.error}){
 const game=createAdventure(data);
 const state=store.load()||{players:{},reached:[],done:false};
 state.logs??={};state.names??={};
 let version=0;   // bumped on every change, so the platform only gets the games when they moved
 const save=()=>{version++;store.save(state);};
 const LOG_SIZE=120;
 // one line of a player's game: a command, the bot's reply, a hint
 function note(id,kind,text){
  if(!text)return;
  const lines=state.logs[id]??=[];
  lines.push({at:Date.now(),kind,text:String(text).slice(0,4000)});
  if(lines.length>LOG_SIZE)lines.splice(0,lines.length-LOG_SIZE);
 }
 const replyText=result=>result.replies.filter(Boolean).join('\n\n');
 const queues=new Map();
 const mayPlay=interaction=>allowed.includes(interaction.user.id)||Boolean(interaction.memberPermissions?.has(PermissionFlagsBits.Administrator));
 // a reply: its texts, then the room's picture when the player enters or looks at it
 async function send(channel,result,player){
  const parts=chunks(result.replies.filter(Boolean).join('\n\n'));
  const image=(result.moved||result.look)&&game.room(player.room)?.image;
  const file=image&&fs.existsSync(path.join(files,image))?{attachment:path.join(files,image),name:path.basename(image)}:null;
  if(image&&!file)log('Aventure, image absente :',image);
  for(let i=0;i<parts.length;i++)await channel.send({content:parts[i],...(i===parts.length-1&&file?{files:[file]}:{}),allowedMentions:{parse:[]}});
  if(!parts.length&&file)await channel.send({files:[file]});
 }
 async function reach(userId){
  if(state.reached.includes(userId))return;
  state.reached.push(userId);save();
  const need=data.final?.players||1;
  if(state.done||state.reached.length<need)return;
  state.done=true;save();
  for(const id of state.reached){
   try{const user=await client.users.fetch(id);await user.send({content:data.final.victory,allowedMentions:{parse:[]}});}catch(e){log('Aventure, victoire :',id,e.code??e);}
  }
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
  if(!mayPlay(interaction)){await interaction.reply({content:"L'aventure n'est pas encore ouverte.",flags:64});return true;}
  await interaction.deferReply({flags:64});
  const id=interaction.user.id,known=state.players[id];
  const player=known||game.fresh();
  state.names[id]=interaction.user.globalName||interaction.user.username||id;
  try{
   const dm=await interaction.user.createDM();
   const opening=known?{replies:[data.messages?.resume||'Vous reprenez votre aventure.',game.describe(player)],look:true}:game.start(player);
   await send(dm,opening,player);
   note(id,'reply',replyText(opening));
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
    state.players[id]=player;state.reached=state.reached.filter(r=>r!==id);note(id,'reply',replyText(restart));save();
    await send(msg.channel,restart,player);
    return;
   }
   const player=state.players[id];
   if(state.done&&state.reached.includes(id)){const over=data.messages?.over||'Votre aventure est terminée.';note(id,'reply',over);save();await msg.channel.send({content:over});return;}
   const result=game.handle(player,msg.content);note(id,'reply',replyText(result));save();
   await send(msg.channel,result,player);
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
 return {handle,message,state,snapshot,hint,version:()=>version};
}
module.exports={createAdventureDiscord,chunks,BUTTON};
