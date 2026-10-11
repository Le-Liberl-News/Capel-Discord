const CHANNEL='1558125759682576475';
function createArenaBoard({client,lobby,duels,ranking,assigned,store,now=Date.now}) {
 const saved=store.load()??{};const queue=new Map();let page=0,busy=false,ticking=false;
 const button=(id,label,style=2)=>({type:2,custom_id:'arena:'+id,label,style});
 async function refresh() {
  if(busy)return;busy=true;
  try {
   await ranking.settle();const channel=await client.channels.fetch(CHANNEL);
   if(!saved.permissions){await channel.permissionOverwrites.edit(client.user.id,{SendMessages:true,CreatePublicThreads:true,SendMessagesInThreads:true});await channel.permissionOverwrites.edit(channel.guild.roles.everyone,{SendMessages:false,CreatePublicThreads:false,CreatePrivateThreads:false});saved.permissions=true;store.save(saved);}
   const scores=new Map(ranking.rows().map(r=>[r.user,r]));
   const rows=(await assigned()).map(({user,name})=>({...scores.get(user),user,name,pb:scores.get(user)?.pb??0})).sort((a,b)=>b.pb-a.pb||a.name.localeCompare(b.name,'fr'));
   const pages=Math.max(1,Math.ceil(rows.length/15));page=Math.min(page,pages-1);const slice=rows.slice(page*15,page*15+15);
   const table=slice.map((r,i)=>`${String(page*15+i+1).padStart(2)} ${r.name.padEnd(18)} ${String(r.wins??0).padStart(2)}  ${r.lastWin===undefined?'⚪':r.lastWin?'🟢':'🔴'} ${String(r.streak??0).padStart(2)}  ${r.pb} (${(r.delta??0)>=0?'+':''}${r.delta??0})`).join('\n');
   const components=[];for(let i=0;i<slice.length;i+=5)components.push({type:1,components:slice.slice(i,i+5).map(r=>button('challenge:'+encodeURIComponent(r.name),r.name))});
   components.push({type:1,components:[button('previous','◀'),button('next','▶'),button('queue','File d’attente',1),button('leave','Quitter la file'),button('requests','Mes défis')]});
   const payload={embeds:[{title:'CAPEL · ARÈNE DE GRANCEL',color:0x68baa0,description:'```text\nTHE ORBAL CALCULATOR\nCOMBATTANTS DU JOUR\n\n   Personnage          V   Série   PB\n'+(table||'Aucun combattant attribué.')+'\n```',footer:{text:`Page ${page+1}/${pages} · ${queue.size} en attente · PB versés à minuit (Paris)`}}],components,allowedMentions:{parse:[]}};
   let message;if(saved.message)try{message=await channel.messages.fetch(saved.message);}catch(e){if(e.code!==10008)throw e;}
   if(message)await message.edit(payload);else{message=await channel.send(payload);saved.message=message.id;store.save(saved);}
  }finally{busy=false;}
 }
 return {refresh,
  async tick(){if(ticking)return;ticking=true;try{
   for(const [id,at] of queue)if(now()-at>10*60*1000||lobby.matchFor(id))queue.delete(id);
   const ready=[...queue.keys()].filter(id=>lobby.isConnected(id));
   while(ready.length>=2){const pair=ready.splice(0,2);pair.forEach(id=>queue.delete(id));try{await duels.match(pair,client);}catch(e){console.error('Arena matchmaking:',e.message);}}
   await refresh();
  }finally{ticking=false;}},
  async handle(i){if(!i.isButton?.()||!i.customId.startsWith('arena:'))return false;
   const action=i.customId.slice(6),user=i.user.id;
   try {
    if(action==='next'||action==='previous'){await i.deferUpdate();page=Math.max(0,page+(action==='next'?1:-1));await refresh();}
    else if(action==='leave'){queue.delete(user);await i.reply({content:'File quittée.',flags:64});await refresh();}
    else if(action==='queue'){if(lobby.matchFor(user))throw Error('Vous êtes déjà en duel.');if(lobby.isConnected(user))await i.reply({content:'En attente dans la file.',flags:64});else await i.launchActivity();queue.set(user,now());await refresh();}
    else if(action==='open'){if(lobby.isConnected(user))await i.reply({content:'Activite ouverte.',flags:64});else await i.launchActivity();}
    else if(action==='requests'){const requests=duels.pending(user).slice(0,5);await i.reply({content:requests.length?'Défis reçus :':'Aucun défi en attente.',flags:64,components:requests.length?[{type:1,components:requests.map(r=>button('accept:'+r.id,r.opponent,1))}]:[]});}
    else if(action.startsWith('accept:')){if(lobby.isConnected(user))await i.reply({content:'Duel rejoint.',flags:64});else await i.launchActivity();await duels.accept(action.slice(7),user,client);}
    else if(action.startsWith('challenge:')){await i.deferReply({flags:64});const id=await duels.boardChallenge(user,decodeURIComponent(action.slice(10)),client);await i.editReply({components:[{type:1,components:[button('accept:'+id,'Jouer',1)]}],content:'Défi envoyé. Rejoignez l’activité ; votre adversaire peut accepter dans « Mes défis ».'});}
   }catch(e){const payload={content:e.message||'Action impossible.',flags:64};if(i.deferred)await i.editReply(payload);else if(!i.replied)await i.reply(payload);}
   return true;
  }
 };
}
module.exports={createArenaBoard};
