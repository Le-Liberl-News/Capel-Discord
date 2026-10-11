const CHANNEL='1558125759682576475';
function createArenaBoard({client,lobby,duels,ranking,assigned,store,now=Date.now,render=require("./activityArenaBoardImage").renderArenaBoard}) {
 const saved=store.load()??{};const queue=new Map();let page=0,busy=false,ticking=false,lastSignature=null;
 const button=(id,label,style=2)=>({type:2,custom_id:'arena:'+id,label,style});
 async function refresh() {
  if(busy)return;busy=true;
  try {
   await ranking.settle();const channel=await client.channels.fetch(CHANNEL);
   if(!saved.permissions){await channel.permissionOverwrites.edit(client.user.id,{SendMessages:true,CreatePublicThreads:true,SendMessagesInThreads:true});await channel.permissionOverwrites.edit(channel.guild.roles.everyone,{SendMessages:false,CreatePublicThreads:false,CreatePrivateThreads:false});saved.permissions=true;store.save(saved);}
   const scores=new Map(ranking.rows().map(r=>[r.user,r]));
   const rows=(await assigned()).map(({user,name})=>({...scores.get(user),user,name,pb:scores.get(user)?.pb??0})).sort((a,b)=>b.pb-a.pb||a.name.localeCompare(b.name,'fr'));
   const pages=Math.max(1,Math.ceil(rows.length/12));page=Math.min(page,pages-1);const slice=rows.slice(page*12,page*12+12).map(({name,wins,streak,lastWin,delta,pb})=>({name,wins,streak,lastWin,delta,pb}));
   const components=[{type:1,components:[button('choose','D\u00e9fier',1),button('queue','File d\u2019attente',1),button('leave','Quitter la file'),button('requests','Mes d\u00e9fis')]}];
   if(pages>1)components.push({type:1,components:[{...button('previous','\u25c0'),disabled:page===0},{...button('next','\u25b6'),disabled:page===pages-1}]});
   const visual={rows:slice,page,pages,queueSize:queue.size};const signature=JSON.stringify(visual);
   if(signature===lastSignature)return;
   const image=await render(visual);
   const payload={embeds:[{color:0x68baa0,image:{url:'attachment://arena.png'}}],attachments:[],files:[{attachment:image,name:'arena.png'}],components,allowedMentions:{parse:[]}};
   let message;if(saved.message)try{message=await channel.messages.fetch(saved.message);}catch(e){if(e.code!==10008)throw e;}
   if(message)await message.edit(payload);else{message=await channel.send(payload);saved.message=message.id;store.save(saved);}lastSignature=signature;
  }finally{busy=false;}
 }
 return {refresh,
  async tick(){if(ticking)return;ticking=true;try{
   for(const [id,at] of queue)if(now()-at>10*60*1000||lobby.matchFor(id))queue.delete(id);
   const ready=[...queue.keys()].filter(id=>lobby.isConnected(id));
   while(ready.length>=2){const pair=ready.splice(0,2);pair.forEach(id=>queue.delete(id));try{await duels.match(pair,client);}catch(e){console.error('Arena matchmaking:',e.message);}}
   await refresh();
  }finally{ticking=false;}},
  async handle(i){if((!i.isButton?.()&&!i.isModalSubmit?.())||!i.customId.startsWith('arena:'))return false;
   const action=i.customId.slice(6),user=i.user.id;
   try {
    if(action==='choose'){
     const characters=(await assigned()).filter(r=>r.user!==user).map(r=>r.name).sort((a,b)=>a.localeCompare(b,'fr'));
     if(!characters.length)throw Error("Aucun adversaire disponible.");
     const groups=[];for(let n=0;n<characters.length;n+=25){const choices=characters.slice(n,n+25);groups.push({type:18,label:characters.length<=25?'Personnage':(choices[0]+' \u2014 '+choices.at(-1)).slice(0,45),component:{type:3,custom_id:'opponent:'+n,placeholder:'Choisir un personnage',min_values:characters.length<=25?1:0,max_values:1,required:characters.length<=25,options:choices.map(name=>({label:name,value:name}))}});}
     await i.showModal({custom_id:'arena:challenge-modal',title:'D\u00e9fier un personnage',components:groups});
    }
    else if(action==='challenge-modal'){
     await i.deferReply({flags:64});const names=[];
     for(let n=0;n<125;n+=25){try{names.push(...i.fields.getStringSelectValues('opponent:'+n));}catch{}}
     if(names.length!==1)throw Error('Choisissez un seul personnage.');
     const available=await assigned();if(!available.some(r=>r.user!==user&&r.name===names[0]))throw Error('Personnage indisponible.');
     const id=await duels.boardChallenge(user,names[0],client);await i.editReply({components:[{type:1,components:[button('accept:'+id,'Jouer',1)]}],content:'D\u00e9fi envoy\u00e9. Votre adversaire a re\u00e7u un MP pour accepter.'});
    }
    else if(action==='next'||action==='previous'){await i.deferUpdate();page=Math.max(0,page+(action==='next'?1:-1));await refresh();}
    else if(action==='leave'){queue.delete(user);await i.reply({content:'File quittée.',flags:64});await refresh();}
    else if(action==='queue'){if(lobby.matchFor(user))throw Error('Vous êtes déjà en duel.');if(lobby.isConnected(user))await i.reply({content:'En attente dans la file.',flags:64});else await i.launchActivity();queue.set(user,now());await refresh();}
    else if(action==='open'){if(lobby.isConnected(user))await i.reply({content:'Activite ouverte.',flags:64});else await i.launchActivity();}
    else if(action==='requests'){const requests=duels.pending(user).slice(0,5);await i.reply({content:requests.length?'Défis reçus :':'Aucun défi en attente.',flags:64,components:requests.length?[{type:1,components:requests.map(r=>button('accept:'+r.id,r.opponent,1))}]:[]});}
    else if(action.startsWith('accept:')){if(lobby.isConnected(user))await i.reply({content:'Duel rejoint.',flags:64});else await i.launchActivity();await duels.accept(action.slice(7),user,client);}
    else if(action.startsWith('challenge:')){await i.deferReply({flags:64});const id=await duels.boardChallenge(user,decodeURIComponent(action.slice(10)),client);await i.editReply({components:[{type:1,components:[button('accept:'+id,'Jouer',1)]}],content:'Défi envoyé. Rejoignez l’activité ; votre adversaire a reçu un MP pour accepter.'});}
   }catch(e){const payload={content:e.message||'Action impossible.',flags:64};if(i.deferred)await i.editReply(payload);else if(!i.replied)await i.reply(payload);}
   return true;
  }
 };
}
module.exports={createArenaBoard};
