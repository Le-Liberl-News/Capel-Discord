const {PermissionFlagsBits}=require('discord.js');
const {ACTIVITY_GUILD_ID}=require('./activityAccess');
function createHalloweenAccess(client,{now=Date.now}={}) {
 const cache=new Map();
 return async function allowed(id,{force=false}={}) {
  const previous=cache.get(id);if(!force&&previous&&now()-previous.at<10000)return previous.allowed;
  let allowed=false;
  try{const guild=await client.guilds.fetch(ACTIVITY_GUILD_ID);const member=await guild.members.fetch({user:id,force:true});allowed=member.permissions.has(PermissionFlagsBits.Administrator);}catch{}
  cache.set(id,{at:now(),allowed});return allowed;
 };
}
module.exports={createHalloweenAccess};
