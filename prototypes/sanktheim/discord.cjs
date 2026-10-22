const crypto=require('node:crypto');
// Acknowledgements are persisted after each part. Discord's nonce and the recent
// message marker close the send/ack crash window without reposting an event.
function createAnnouncements({client,channelId,siege,store,baseUrl,renderHighlight=async()=>null,renderOverview=summary=>require('./highlights.cjs').renderHighlight({type:'fortress-report',summary})}){
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
    const parts=event.text.match(/[\s\S]{1,1800}/g)??[''];let highlight;
    for(let i=0;i<parts.length;i++){
     const marker='Sanktheim · '+event.id+' · '+i;
     if(!ledger[marker]&&!markers.has(marker)){
      const nonce=BigInt('0x'+crypto.createHash('sha256').update(marker).digest('hex').slice(0,15)).toString();
      const embed={description:parts[i],color:0xb39153,footer:{text:marker}};
      if(i===0){
       if(['threshold','soldier-death','soldier-critical','tank-arrival'].includes(event.type))try{highlight=await renderHighlight(event);}catch(error){console.error('GIF Sanktheim:',error.message);}
       if(event.type==='wave-end'&&event.summary?.walls?.length)try{highlight=await renderOverview(event.summary);}catch(error){console.error('Plan Sanktheim:',error.message);}
       if(highlight)embed.image={url:'attachment://'+highlight.name};
       const mvp=event.summary?.mvp;
       if(mvp){embed.title='🏆 '+mvp.character+' · MVP de la vague';embed.color=0xf0be54;if(baseUrl)embed.thumbnail={url:baseUrl.replace(/\/$/,'')+'/pp/'+encodeURIComponent(mvp.character)+'.webp'};}
      }
      const join=['intro','warning'].includes(event.type)&&i===0;
      const components=join?[{type:1,components:[{type:2,custom_id:'sanktheim:join',label:'Prendre part à la défense de Sanktheim',style:1},...(event.type==='intro'?[{type:2,custom_id:'sanktheim:stop',label:'Arrêter le siège',style:2}]:[])]}]:undefined;
      const message=await channel.send({embeds:[embed],allowedMentions:{parse:[]},nonce,enforceNonce:true,...(i===0&&highlight?{files:[highlight]}:{}),...(components?{components}:{})});
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
