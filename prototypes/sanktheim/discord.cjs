const crypto=require('node:crypto');
// Acknowledgements are persisted after each part. Discord's nonce and the recent
// message marker close the send/ack crash window without reposting an event.
function createAnnouncements({client,channelId,siege,store}){
 const ledger=store.load()??{};let busy=false;
 async function flush(){
  if(busy||!client.isReady())return;busy=true;
  try{
   if(!siege.outbox().length)return;
   const channel=await client.channels.fetch(channelId);
   if(!channel?.send)throw Error('Salon RP du siège inaccessible.');
   const recent=await channel.messages.fetch({limit:100});
   const markers=new Set([...recent.values()].filter(m=>m.author?.id===client.user.id).flatMap(m=>(m.embeds??[]).map(e=>e.footer?.text)));
   for(const event of siege.outbox()){
    const parts=event.text.match(/[\s\S]{1,1800}/g)??[''];
    for(let i=0;i<parts.length;i++){
     const marker='Sanktheim · '+event.id+' · '+i;
     if(!ledger[marker]&&!markers.has(marker)){
      const nonce=BigInt('0x'+crypto.createHash('sha256').update(marker).digest('hex').slice(0,15)).toString();
      const message=await channel.send({embeds:[{description:parts[i],color:0xb39153,footer:{text:marker}}],allowedMentions:{parse:[]},nonce,enforceNonce:true,...(event.type==='intro'&&i===0?{components:[{type:1,components:[{type:2,custom_id:'sanktheim:join',label:'Prendre part à la défense de Sanktheim',style:1},{type:2,custom_id:'sanktheim:stop',label:'Arrêter le siège',style:2}]}]}:{})});
      ledger[marker]=message.id;
     }else ledger[marker]??=true;
     store.save(ledger);
    }
    siege.acknowledge(event.id);
   }
  }finally{busy=false;}
 }
 return {flush};
}
module.exports={createAnnouncements};
