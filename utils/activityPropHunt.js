const {ActivityError}=require('./activityService');
function createActivityPropHunt({lobby,resolveCharacter}) {
 const panel=summary=>({content:'Prop Hunt a Rolent \u2014 inscriptions ouvertes.\n30 secondes pour se cacher, puis '+summary.duration+' minutes de recherche. Les apparences sont des objets de la ville.',components:[{type:1,components:[{type:2,custom_id:'prophunt:signup:'+summary.id,label:'Participer',style:1},{type:2,custom_id:'prophunt:start:'+summary.id,label:'Demarrer',style:3}]}],allowedMentions:{parse:[]}});
 return {async handle(interaction){
  if(interaction.isChatInputCommand?.()&&interaction.commandName==='prophunt'){
   await interaction.deferReply({flags:64});
   let opened;
   try{const game=opened=lobby.createHunt(interaction.user.id,interaction.options.getInteger('duree')??10);await interaction.channel.send(panel(game));await interaction.editReply({content:'Partie ouverte. Utilise Participer, ouvre le bouton prive, puis Demarrer quand les joueurs sont dans Rolent.'});}
   catch(error){if(opened)lobby.cancelHunt(opened.id,interaction.user.id);await interaction.editReply({content:error instanceof ActivityError?error.message:'Impossible de creer la partie. Reessayez.'});}
   return true;
  }
  if(!interaction.isButton?.())return false;
  const kind=interaction.customId;
  if(kind.startsWith('prophunt:signup:')){
   await interaction.deferReply({flags:64});try{
    const id=kind.slice('prophunt:signup:'.length),game=lobby.huntSummary();if(!game||game.id!==id||game.phase!=='waiting')throw new ActivityError('Les inscriptions sont fermees.');
    await interaction.user.send({content:'Entre dans Rolent pour le Prop Hunt. Ton role sera tire au sort au demarrage.',components:[{type:1,components:[{type:2,custom_id:'activity:prophunt:'+id,label:'Entrer dans Rolent',style:1}]}],allowedMentions:{parse:[]}});
    await interaction.editReply({content:'Bouton envoye en message prive.'});
   }catch(error){await interaction.editReply({content:error instanceof ActivityError?error.message:'Ouvrez vos messages prives a Capel puis reessayez.'});}return true;
  }
  if(kind.startsWith('activity:prophunt:')){
   try{if(!interaction.channel?.isDMBased?.())throw new ActivityError('Ouvrez le bouton prive.');const id=kind.slice('activity:prophunt:'.length);const character=await resolveCharacter(interaction.user.id);lobby.validateJoinHunt(id,interaction.user.id);if(lobby.isConnected(interaction.user.id)){lobby.joinHunt(id,interaction.user.id,character);await interaction.reply({content:"Vous rejoignez Rolent dans votre activité déjà ouverte.",flags:64});}else{await interaction.launchActivity();lobby.joinHunt(id,interaction.user.id,character);}}
   catch(error){if(!interaction.replied)await interaction.reply({content:error instanceof ActivityError?error.message:'Fermez votre activite actuelle puis reessayez ce bouton.',flags:64});}return true;
  }
  if(kind.startsWith('prophunt:start:')){
   await interaction.deferReply({flags:64});try{
    const state=lobby.startHunt(kind.slice('prophunt:start:'.length),interaction.user.id);
    await interaction.editReply({content:'Preparation commencee : 30 secondes. '+state.hunter+' sera le chasseur.'});
    try{await interaction.message.edit({content:'Prop Hunt commence ! '+state.hunter+' cherche les autres personnages.\n30 secondes de preparation, puis '+lobby.huntSummary().duration+' minutes de recherche.',components:[],allowedMentions:{parse:[]}});}catch{}
   }catch(error){await interaction.editReply({content:error instanceof ActivityError?error.message:'Impossible de demarrer.'});}return true;
  }
  return false;
 }};
}
module.exports={createActivityPropHunt};
