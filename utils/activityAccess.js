const ACTIVITY_GUILD_ID='595259248984981514';
class ActivityAccessError extends Error {constructor(message,status=403){super(message);this.status=status;}}
function createActivityAccess({client,guildId=ACTIVITY_GUILD_ID,now=Date.now}){const members=new Map();
 async function assertMember(id,{force=false}={}){if(!force&&now()<(members.get(id)??0))return;try{const guild=await client.guilds.fetch(guildId);const member=await guild.members.fetch({user:id,force:true});if(!member)throw new ActivityAccessError('Cette activité est réservée aux membres du serveur Liberl News.');members.set(id,now()+30000);}catch(error){members.delete(id);if(error.status===403||[10004,10007,50001,50013].includes(error.code))throw new ActivityAccessError('Cette activité est réservée aux membres du serveur Liberl News.');throw new ActivityAccessError('Vérification du serveur temporairement indisponible.',502);}}
 function assertContext(channel,claimedGuild,id){if(channel?.guild){if(channel.guild.id!==guildId||claimedGuild!==guildId)throw new ActivityAccessError('Cette activité est réservée au serveur Liberl News.');}else if(!channel?.isDMBased?.()||channel.recipient?.id!==id)throw new ActivityAccessError('Conversation privée invalide.');}
 return {assertMember,assertContext,invalidate:id=>members.delete(id)};
}
module.exports={ACTIVITY_GUILD_ID,ActivityAccessError,createActivityAccess};
