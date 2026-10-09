// Character identity only. No Discord account, reply, ping or mention is published.
function createRoleplayDiscordSender({client,WebhookClient,channelId,webhookUrl,baseUrl}) {
  let webhookPromise;
  async function webhook() {
    if(!webhookUrl)return null;
    webhookPromise ??= (async()=>{const candidate=new WebhookClient({url:webhookUrl});try{const details=await candidate.fetch();return details.channelId===channelId?candidate:null;}catch{return null;}})();
    return webhookPromise;
  }
  return async ({character,text,gif,threadId})=>{
    const files=gif?[{attachment:gif,name:'craft.gif'}]:[];
    const allowedMentions={parse:[],repliedUser:false};
    const thread=threadId?await client.channels.fetch(threadId):null;
    if(threadId&&(!thread?.isThread?.()||!thread.guild))throw new Error("Match thread unavailable");
    const hook=!threadId||thread.parentId===channelId?await webhook():null;
    if(hook)return hook.send({...(threadId?{threadId}:{}),content:text,username:character,avatarURL:baseUrl?baseUrl.replace(/\/$/,'')+'/pp/'+encodeURIComponent(character)+'.webp':undefined,files,allowedMentions});
    const channel=thread??await client.channels.fetch(channelId);
    if(!channel?.isTextBased?.()||!channel.guild)throw new Error('Roleplay channel unavailable');
    return channel.send({content:'**'+character+'** : '+text,files,allowedMentions});
  };
}
module.exports={createRoleplayDiscordSender};
