const rules=require('../activity/assets/sky/combat/spoiler-access.json');
const {ACTIVITY_GUILD_ID}=require('./activityAccess');
// Exact roles only: having played a later game does not prove earlier games are finished.
function allowedCharacters(roleIds,config=rules){const held=new Set(roleIds);return Object.entries(config.characters).filter(([,game])=>held.has(config.roles[game])).map(([name])=>name);}
function createActivitySpoilerAccess({client,guildId=ACTIVITY_GUILD_ID}){return {async characters(id){try{const guild=await client.guilds.fetch(guildId),member=await guild.members.fetch({user:id,force:true});return allowedCharacters([...member.roles.cache.keys()]);}catch{const error=new Error('Impossible de vérifier les rôles de jeu. Réessayez dans un instant.');error.status=502;throw error;}}};}
module.exports={allowedCharacters,createActivitySpoilerAccess};
