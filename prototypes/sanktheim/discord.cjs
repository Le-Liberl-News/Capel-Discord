const crypto=require('node:crypto');
// Acknowledgements are persisted after each part. Discord's nonce and the recent
// message marker close the send/ack crash window without reposting an event.
function createAnnouncements({client,channelId,siege,store,baseUrl,assignedCharacters=async()=>[],infectedCharacters=()=>[],renderHighlight=async()=>null,renderOverview=summary=>require('./highlights.cjs').renderHighlight({type:'fortress-report',summary})}){
 const ledger=store.load()??{};ledger.mediaJobs??={};
 // Repair recent alerts whose image jobs were discarded by the former timeout path.
 if(ledger.mediaRepairVersion!==1){for(const event of (siege._state?.events??[]).filter(e=>['threshold','soldier-death','soldier-critical','tank-arrival'].includes(e.type)&&e.replay?.scene).slice(-3)){const marker='Sanktheim · '+event.id+' · 0',messageId=ledger[marker];if(typeof messageId==='string'&&!ledger.mediaJobs[marker])ledger.mediaJobs[marker]={event,messageId,embeds:[{description:event.text.slice(0,1800),color:0xb39153,footer:{text:marker}}]};}ledger.mediaRepairVersion=1;store.save(ledger);}let busy=false;const rendering=new Map();
 function scheduleMedia(channel,key,job){if(rendering.has(key)||(job.attempts??0)>=3||Date.now()<(job.retryAt??0))return;job.attempts=(job.attempts??0)+1;store.save(ledger);const task=Promise.resolve().then(async()=>{try{const image=job.event.type==='wave-end'?await renderOverview(job.event.summary):await renderHighlight(job.event);if(image){const embeds=job.embeds.map((e,i)=>i?e:{...e,image:{url:'attachment://'+image.name}});await channel.messages.edit(job.messageId,{embeds,attachments:[],files:[image],allowedMentions:{parse:[]}});}delete ledger.mediaJobs[key];store.save(ledger);}catch(error){console.error('Média Sanktheim:',error.message);job.lastError=error.message;job.retryAt=Date.now()+30000*job.attempts;store.save(ledger);}finally{rendering.delete(key);}});rendering.set(key,task);}

 // the finale's last word waits for its film: is it online yet? (asked at most once a minute; once there, it stays)
 const ready=new Set();let asked=0;
 async function online(url){if(ready.has(url))return true;if(Date.now()-asked<60000)return false;asked=Date.now();try{const r=await fetch(url,{method:'HEAD'});if(r.ok&&/^video\//.test(r.headers.get('content-type')??''))ready.add(url);}catch{}return ready.has(url);}
 async function flush(){
  if(busy||!client.isReady())return;busy=true;
  try{
   if(!siege.outbox().length&&!Object.keys(ledger.mediaJobs).length)return;
   const waiting=siege.outbox().filter(e=>e.type==='finale');if(waiting.length===siege.outbox().length&&!Object.keys(ledger.mediaJobs).length&&!(await Promise.all(waiting.map(e=>online(e.video)))).some(Boolean))return;
   const channel=await client.channels.fetch(channelId);
   if(!channel?.send)throw Error('Salon RP du siège inaccessible.');
   for(const [key,job]of Object.entries(ledger.mediaJobs))scheduleMedia(channel,key,job);
   const recent=await channel.messages.fetch({limit:100});
   const markers=new Set([...recent.values()].filter(m=>m.author?.id===client.user.id).flatMap(m=>(m.embeds??[]).map(e=>e.footer?.text)));
   for(const event of siege.outbox()){
    // the finale: its text, then the film's link (Discord shows its player under it)
    if(event.type==='finale'){const marker='Sanktheim · '+event.id+' · 0';if(!ledger[marker]){if(!await online(event.video))continue;const nonce=BigInt('0x'+crypto.createHash('sha256').update(marker).digest('hex').slice(0,15)).toString();const message=await channel.send({content:event.text+'\n\n'+event.video,allowedMentions:{parse:[]},nonce,enforceNonce:true});ledger[marker]=message.id;store.save(ledger);}siege.acknowledge(event.id);continue;}
    let appeal=null;if(event.type==='wave-end'&&Array.isArray(event.summary?.participants)&&!event.summary.participants.length){const cache='appeal:'+event.id;if(!(cache in ledger)){ledger[cache]=require('./faction-appeals.cjs').appeal(event,await assignedCharacters(),await infectedCharacters());store.save(ledger);}appeal=ledger[cache];}
    const parts=event.text.match(/[\s\S]{1,1800}/g)??[''];
    for(let i=0;i<parts.length;i++){
     const marker='Sanktheim · '+event.id+' · '+i;
     if(!ledger[marker]&&!markers.has(marker)){
      const nonce=BigInt('0x'+crypto.createHash('sha256').update(marker).digest('hex').slice(0,15)).toString();
      const embed={description:parts[i],color:0xb39153,footer:{text:marker}};
      if(i===0){
       if(event.type==='wave-start'&&Number.isFinite(event.fortressDistance))embed.fields=[{name:'Forteresse Méchapom',value:'À '+Math.max(0,Math.round(event.fortressDistance))+' m de la porte'}];
       const mvp=event.summary?.mvp;
       if(mvp){embed.title='🏆 '+mvp.character+' · MVP de la vague';embed.color=0xf0be54;if(baseUrl)embed.thumbnail={url:baseUrl.replace(/\/$/,'')+'/pp/'+encodeURIComponent(mvp.character)+'.webp'};}
      }
      const join=['intro','warning'].includes(event.type)&&i===0;
      const components=join?[{type:1,components:[{type:2,custom_id:'sanktheim:join',label:'Prendre part à la défense de Sanktheim',style:1},...(event.type==='intro'?[{type:2,custom_id:'sanktheim:stop',label:'Arrêter le siège',style:2}]:[])]}]:undefined;
      const message=await channel.send({embeds:[embed,...(i===0&&appeal?[appeal]:[])],allowedMentions:{parse:[]},nonce,enforceNonce:true,...(components?{components}:{})});
      ledger[marker]=message.id;if(i===0&&(['wave-start','threshold','soldier-death','soldier-critical','tank-arrival','mechapom-arrival'].includes(event.type)||event.type==='wave-end'&&event.summary?.walls?.length)){const job={event,messageId:message.id,embeds:[embed,...(appeal?[appeal]:[])]};ledger.mediaJobs[marker]=job;store.save(ledger);scheduleMedia(channel,marker,job);}
     }else ledger[marker]??=true;
     store.save(ledger);
    }
    siege.acknowledge(event.id);
   }
  }finally{busy=false;}
 }
 return {flush,async drainMedia(){while(rendering.size)await Promise.all([...rendering.values()]);}};
}
module.exports={createAnnouncements};
