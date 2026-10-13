const {randomBytes}=require('node:crypto');
const {ACTIVITY_GUILD_ID}=require('./activityAccess');
const {ActivityError}=require('./activityService');
function createSceneInvitations({client,canInvite,store=null,now=Date.now}){
 const invitations=new Map((store?.load()??[]).filter(([,value])=>value.expires>now()));
 const persist=()=>store?.save([...invitations]);
 function prune(){let dirty=false;for(const [id,value]of invitations)if(value.expires<=now()){invitations.delete(id);dirty=true;}if(dirty)persist();}
 return {
  allowed(user){prune();return [...invitations.values()].some(value=>value.user===user&&value.claimed);},
  claim(customId,user){prune();const value=invitations.get(customId);if(!value||value.user!==user)throw new ActivityError('Lien de scène expiré ou inaccessible.',403);value.claimed=true;persist();},
  async create(issuer,recipient){
   if(!await canInvite(issuer,{force:true}))throw new ActivityError('Création de lien de scène non autorisée.',403);
   const guild=await client.guilds.fetch(ACTIVITY_GUILD_ID);await guild.members.fetch({user:recipient,force:true});
   prune();const id='scene:'+randomBytes(18).toString('hex');invitations.set(id,{user:recipient,expires:now()+7*86400000,claimed:false});persist();
   const appId=client.application?.id??client.user?.id;if(!appId)throw new ActivityError('Application indisponible.',503);
   return 'https://discord.com/activities/'+appId+'?custom_id='+encodeURIComponent(id);
  },
  async handle(interaction){
   if(!interaction.isChatInputCommand?.()||interaction.commandName!=='scene')return false;
   await interaction.deferReply({flags:64});
   try{const recipient=interaction.options.getUser('destinataire',true);if(recipient.bot)throw new ActivityError('Choisissez un joueur.',400);const link=await this.create(interaction.user.id,recipient.id);await interaction.editReply({content:'Copie ce lien dans ton propre message :\n'+link+'\nValable sept jours, uniquement pour le destinataire choisi.',allowedMentions:{parse:[]}});}
   catch(error){await interaction.editReply({content:error instanceof ActivityError?error.message:'Impossible de créer ce lien. Vérifiez que le destinataire est membre du serveur.'});}
   return true;
  }
 };
}
module.exports={createSceneInvitations};
