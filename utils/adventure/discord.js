// The adventure on Discord: /aventure (admins) posts the invitation in the adventure channel, its button opens the
// game in the player's DMs, and every DM of a player is a command. For now only administrators and the users of
// `allowed` may play (the button checks it; a DM is only read from someone who started through the button).
// When `final.players` players stand in the final room, each of them gets the victory text and the roleplay
// channel the closing one. Players' states survive restarts (store).
const {ActionRowBuilder,ButtonBuilder,ButtonStyle,PermissionFlagsBits}=require('discord.js');
const {createAdventure}=require('./engine');
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
function createAdventureDiscord({client,data,store,channelId,closingChannelId,allowed=[],renderMap,log=console.error}){
 const game=createAdventure(data);
 const state=store.load()||{players:{},reached:[],done:false};
 const save=()=>store.save(state);
 const queues=new Map();
 const mayPlay=interaction=>allowed.includes(interaction.user.id)||Boolean(interaction.memberPermissions?.has(PermissionFlagsBits.Administrator));
 // a reply: its texts, then the plan when the player moved (or asked for it)
 async function send(channel,result,player){
  const parts=chunks(result.replies.filter(Boolean).join('\n\n'));
  const map=(result.moved||result.map)&&renderMap?await renderMap(data,player.room).catch(e=>{log('Aventure, plan :',e);return null;}):null;
  if(!parts.length&&!map)return;
  for(let i=0;i<parts.length;i++)await channel.send({content:parts[i],...(i===parts.length-1&&map?{files:[map]}:{}),allowedMentions:{parse:[]}});
  if(!parts.length)await channel.send({files:[map]});
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
  try{
   const dm=await interaction.user.createDM();
   if(known)await send(dm,{replies:[data.messages?.resume||'Vous reprenez votre aventure.',game.describe(player)],map:true},player);
   else await send(dm,game.start(player),player);
  }catch(e){
   log('Aventure, MP :',e.code??e);
   await interaction.editReply({content:"Je n'arrive pas à t'écrire en message privé : autorise les MP des membres du serveur puis réessaie."});return true;
  }
  if(!known){state.players[id]=player;save();}
  await interaction.editReply({content:'Je t’ai écrit en message privé.'});
  return true;
 }
 // a DM from a player: one command, played after the previous one is answered
 function message(msg){
  if(msg.author.bot||msg.guild||!state.players[msg.author.id]||!msg.content.trim())return false;
  const id=msg.author.id;
  const next=(queues.get(id)||Promise.resolve()).then(async()=>{
   const player=state.players[id];
   if(state.done&&state.reached.includes(id)){await msg.channel.send({content:data.messages?.over||'Votre aventure est terminée.'});return;}
   const result=game.handle(player,msg.content);save();
   await send(msg.channel,result,player);
   if(result.final)await reach(id);
  }).catch(e=>log('Aventure :',e));
  queues.set(id,next);
  return true;
 }
 return {handle,message,state};
}
module.exports={createAdventureDiscord,chunks,BUTTON};
