// Character identity only. No Discord account, reply, ping or mention is published.
function createRoleplayDiscordSender({client,WebhookClient,channelId,webhookUrl,baseUrl,avatarFor}) {
  let webhookPromise;
  async function webhook() {
    if(!webhookUrl)return null;
    webhookPromise ??= (async()=>{const candidate=new WebhookClient({url:webhookUrl});try{const details=await candidate.fetch();return details.channelId===channelId?candidate:null;}catch{return null;}})();
    return webhookPromise;
  }
  return async ({character,text,gif,threadId,fileName,avatarURL,username=character})=>{
    const portrait=avatarURL??avatarFor?.(character)??(baseUrl?baseUrl.replace(/\/$/,'')+'/pp/'+encodeURIComponent(character)+'.webp':undefined);
    const files=gif?[{attachment:gif,name:fileName??'craft.gif'}]:[];
    const allowedMentions={parse:[],repliedUser:false};
    const thread=threadId?await client.channels.fetch(threadId):null;
    if(threadId&&(!thread?.isThread?.()||!thread.guild))throw new Error("Match thread unavailable");
    const hook=!threadId||thread.parentId===channelId?await webhook():null;
    if(hook)return hook.send({...(threadId?{threadId}:{}),content:text,username,avatarURL:portrait,files,allowedMentions});
    const channel=thread??await client.channels.fetch(channelId);
    if(!channel?.isTextBased?.()||!channel.guild)throw new Error('Roleplay channel unavailable');
    return channel.send(portrait?{embeds:[{author:{name:username,icon_url:portrait},description:text}],files,allowedMentions}:{content:'**'+username+'** : '+text,files,allowedMentions});
  };
}
module.exports={createRoleplayDiscordSender};
