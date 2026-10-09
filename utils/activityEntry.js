async function handleActivityEntry(interaction) {
 const entry=interaction.commandType===4 || interaction.isPrimaryEntryPointCommand?.();
 const command=interaction.isChatInputCommand?.() && interaction.commandName==="anterose";
 const button=interaction.isButton?.() && interaction.customId==="activity:enter-private";
 if(!entry && !command && !button)return false;
 try {
  if(interaction.channel?.isDMBased?.()) {await interaction.launchActivity();return true;}
  if(button){await interaction.reply({content:"Ouvrez ce bouton dans vos messages priv\u00e9s avec Capel.",flags:64});return true;}
  await interaction.deferReply({flags:64});
  const message=await interaction.user.send({content:"Ouvrir le monde partag\u00e9",components:[{type:1,components:[{type:2,custom_id:"activity:enter-private",label:"Entrer \u00e0 l\u2019Ant\u00e9rose",style:1}]}],allowedMentions:{parse:[]}});
  await interaction.editReply({content:"Votre bouton de lancement est dans vos messages priv\u00e9s avec Capel.",components:[{type:1,components:[{type:2,style:5,label:"Ouvrir Capel",url:"https://discord.com/channels/@me/"+message.channelId}]}]});
 } catch {const data={content:"Lancement impossible. Autorisez les messages priv\u00e9s de Capel, puis r\u00e9essayez.",flags:64};if(interaction.deferred)await interaction.editReply({content:data.content,components:[]});else if(!interaction.replied)await interaction.reply(data);}
 return true;
}
module.exports={handleActivityEntry};
