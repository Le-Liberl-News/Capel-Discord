// Character identity only. No Discord account, reply, ping or mention is published.
function createRoleplayDiscordSender({client,WebhookClient,channelId,webhookUrl,baseUrl}) {
  let webhookPromise;
  async function webhook() {
    if(!webhookUrl)return null;
    webhookPromise ??= (async()=>{const candidate=new WebhookClient({url:webhookUrl});try{const details=await candidate.fetch();return details.channelId===channelId?candidate:null;}catch{return null;}})();
    return webhookPromise;
  }
  return async ({character,text,gif})=>{
    const files=gif?[{attachment:gif,name:'craft.gif'}]:[];
    const allowedMentions={parse:[],repliedUser:false};
    const hook=await webhook();
    if(hook)return hook.send({content:text,username:character,avatarURL:baseUrl?baseUrl.replace(/\/$/,'')+'/pp/'+encodeURIComponent(character)+'.webp':undefined,files,allowedMentions});
    const channel=await client.channels.fetch(channelId);
    if(!channel?.isTextBased?.()||!channel.guild)throw new Error('Roleplay channel unavailable');
    return channel.send({content:'**'+character+'** : '+text,files,allowedMentions});
  };
}
module.exports={createRoleplayDiscordSender};
