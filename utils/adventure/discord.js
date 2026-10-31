// The adventure on Discord: /aventure (admins) posts the invitation in the adventure channel, its button opens the
// game in the player's DMs, and every DM of a player is a command. Anyone who sees the invitation may play (the channel
// itself is hidden for now); a DM is only read from someone who started through the button.
// When `final.players` players stand in the final room, each of them gets the victory text, and the channel where the
// invitation was posted the closing one (either may be a list of messages, for a text longer than one). The notices
// channel (notifyChannelId, which stays when the invitation moves elsewhere) hears of every game started, with the
// link where it can be followed on the website, and of every game won. Players' states survive restarts (store). « /reset » in the DMs starts a player over.
// Each player's last exchanges are kept (logs) for the platform's editor, which follows the games and sends hints
// (snapshot, hint; see platformSync.js).
// Everything is text; a room may have a picture (its "image", a file of rpg/data/aventure/), sent on entering it
// and with « regarder ».
const {ActionRowBuilder,ButtonBuilder,ButtonStyle,PermissionFlagsBits}=require('discord.js');
const path=require('node:path'),fs=require('node:fs'),crypto=require('node:crypto');
const {createAdventure}=require('./engine');
const roomHistory=require('./roomHistory');
const {renderStill,valuesOf}=require('./animations');
const renderFinalFrame=async(name,words)=>{if(name!=='cartes')throw Error('animation inconnue : '+name);const values=valuesOf(words);return values.length===4?renderStill(words):null;};
const FILES=path.join(__dirname,'../../rpg/data/aventure');
const BUTTON='aventure:jouer',LIMIT=1900;
// Discord refuses messages over 2000 characters: cut at the last paragraph's end, else a line's, else a sentence's,
// a word only when none comes in the second half of the message (the latest of them all was nearly always a space,
// which cut sentences in two)
function chunks(text){
 const out=[];let rest=String(text).trim();
 const sentence=text=>Math.max(...['. ','! ','? ','… ','.\n','!\n','?\n','…\n'].map(end=>{const i=text.lastIndexOf(end,LIMIT-1);return i<0?-1:i+end.length-1;}));
 while(rest.length>LIMIT){
  let at=-1;
  for(const find of [r=>r.lastIndexOf('\n\n',LIMIT),r=>r.lastIndexOf('\n',LIMIT),sentence,r=>r.lastIndexOf(' ',LIMIT)]){at=find(rest);if(at>=LIMIT/2)break;}
  if(at<=0)at=LIMIT;
  out.push(rest.slice(0,at).trimEnd());rest=rest.slice(at).trimStart();
 }
 if(rest)out.push(rest);return out;
}
// a text of the data: one string, or a list of them sent one after the other (each cut if still too long)
const messages=value=>[].concat(value??[]).filter(Boolean).flatMap(text=>chunks(text));
const PLATFORM_URL=(process.env.PLATFORM_URL||'https://leliberlnews.fr').replace(/\/+$/,'');
// a command as the « Commandes » table groups it: lower case, single spaces, no end punctuation, straight apostrophes
const normalize=text=>String(text).normalize('NFC').toLowerCase().replace(/[’‘`]/g,"'").replace(/\s+/g,' ').trim().replace(/^[.!?…,;:]+|[.!?…,;:]+$/gu,'').trim();
const DISTINCT=2000;   // distinct commands kept per player, the rest only counted
function count(typed,text){
 const command=normalize(text);typed.count++;if(!command)return;
 if(typed.commands[command]!=null||Object.keys(typed.commands).length<DISTINCT)typed.commands[command]=(typed.commands[command]??0)+1;
}
function createAdventureDiscord({client,data,store,channelId,notifyChannelId=null,files=FILES,log=console.error,render=renderFinalFrame,shareWait=30000,archive=null,closingAttachment=null,onCollectiveVictory=async()=>{}}){
 const game=createAdventure(data),webInstance=crypto.randomBytes(8).toString('hex');
 const state=store.load()||{players:{},reached:[],done:false};
 state.logs??={};state.names??={};state.won??=[];state.shares??={};
 // every command each player typed, counted in full (the log keeps only the last exchanges): their number and each
 // distinct command (normalized) with its uses, for the platform's « Commandes ». Games begun before this was kept
 // start from what their log still had (partial: the number is a minimum).
 state.typed??={};
 for(const id of Object.keys(state.players))if(!state.typed[id]){const typed=state.typed[id]={count:0,commands:{},partial:true};for(const line of state.logs[id]??[])if(line.kind==='command')count(typed,line.text);}
 for(const id of Object.keys(state.players))state.typed[id].history??=roomHistory.create(state.logs[id]??[],true);
 state.archiveRuns??={};
 function ensureArchive(id){if(!archive)return null;if(!state.archiveRuns[id]){const typed=state.typed[id]??{},history=typed.history;const run=state.archiveRuns[id]={run:archive.newRun(),partial:!!state.players[id]&&(history?.partial??true)};const lines=[...(history?.lines??[]),...(state.logs[id]??[])],seen=new Set();archive.meta(run.run,{user:id,name:state.names[id]??id,state:state.players[id]??{},typed:{count:typed.count??0,commands:typed.commands??{}},partial:run.partial});for(const line of lines){const key=JSON.stringify([line.at,line.kind,line.room,line.text]);if(!seen.has(key)){seen.add(key);archive.append(run.run,line);}}delete typed.history;}return state.archiveRuns[id];}
 if(archive){for(const id of Object.keys(state.players)){ensureArchive(id);delete state.typed[id].history;}store.save(state);}
 let version=0;   // bumped on every change, so the platform only gets the games when they moved
 const listeners=new Set();   // told of every change (the platform's sync sends it at once)
 const save=()=>{if(archive)for(const id of Object.keys(state.players)){const run=ensureArchive(id);archive.meta(run.run,{user:id,name:state.names[id]??id,state:state.players[id],typed:state.typed[id],partial:run.partial});}version++;store.save(state);for(const listener of listeners)listener();};
 // the animations drawn since the platform last got them, by their SHA-1: the editor and the spectators show them
 // Bound RAM even when the platform cannot acknowledge media for a long time.
 const pendingMedia=require('../mediaRender').createMediaCache({sizeOf:item=>item.data.length});
 const commandRooms=new Map();
 const LOG_SIZE=120,LOG_TEXT=20000;   // a reply is kept whole (a long one was cut at 4000 characters)
 // one line of a player's game: a command, the bot's reply, a hint
 function note(id,kind,text,media=[],room=state.players[id]?.room){
  if(!text&&!media.length)return;
  if(archive)ensureArchive(id);if(kind==='command')commandRooms.set(id,room);
  const lines=state.logs[id]??=[];
  const line={at:Date.now(),kind,text:String(text||'').slice(0,LOG_TEXT),room,...(commandRooms.has(id)?{sourceRoom:commandRooms.get(id)}:{}),...(media.length?{media}:{})};lines.push(line);
  const typed=state.typed[id]??={count:0,commands:{}};if(archive){const run=ensureArchive(id);archive.append(run.run,{...line,text:String(text||'')});}else{typed.history??=roomHistory.create([],false);roomHistory.append(typed.history,line);}
  if(lines.length>LOG_SIZE)lines.splice(0,lines.length-LOG_SIZE);
 }
 const replyText=result=>result.replies.filter(Boolean).join('\n\n');
 const queues=new Map();
 // a reply: its texts, then the room's picture when the player enters or looks at it
 // a reply to a player: its texts, then the room's picture when they enter or look at it and the action's animation;
 // kept in the player's log with what was attached (`id`)
 async function send(channel,result,player,id){
  const sendingRun=id&&archive?ensureArchive(id).run:null;
  const parts=chunks(result.replies.filter(Boolean).join('\n\n'));
  const attached=[],media=[];
  const image=(result.moved||result.look)&&game.room(player.room)?.image;
  if(image){
   if(fs.existsSync(path.join(files,image))){attached.push({attachment:path.join(files,image),name:path.basename(image)});media.push({type:'image',file:image});}
   else log('Aventure, image absente :',image);
  }
  // an action's animation (the cards dealt…), drawn from what the player said; the text goes without it if it fails
  if(result.animation&&channel.browser){
   const values=valuesOf(result.animation.words);if(result.animation.name==='cartes'&&values.length===4)media.push({type:'cards',values});
  }else if(result.animation){
   try{
    const animation=await render(result.animation.name,result.animation.words);
    if(id&&archive&&state.archiveRuns[id]?.run!==sendingRun)return;
    if(animation){
     const sha=crypto.createHash('sha1').update(animation.attachment).digest('hex');
     attached.push(animation);media.push({type:'animation',sha});pendingMedia.set(sha,{data:animation.attachment,type:animation.name.endsWith('.png')?'image/png':'image/gif'});
    }
   }catch(e){log('Aventure, animation :',result.animation.name,e.message);}
  }
  if(id&&archive&&state.archiveRuns[id]?.run!==sendingRun)return;
  if(id){note(id,'reply',replyText(result),media,player.room);save();}
  for(let i=0;i<parts.length;i++)await channel.send({content:parts[i],...(i===parts.length-1&&attached.length?{files:attached}:{}),allowedMentions:{parse:[]}});
  if(!parts.length&&attached.length)await channel.send({files:attached});
 }
 const tell=async(id,content,what)=>{
  const parts=messages(content);if(!parts.length)return;if(id.startsWith('web_')){for(const part of parts)note(id,'reply',part);save();return;}const expectedRun=state.archiveRuns[id]?.run;
  // each message sent is one line of the log, as the player saw it
  try{const user=await client.users.fetch(id);for(const part of parts){await user.send({content:part,allowedMentions:{parse:[]}});if(archive&&state.archiveRuns[id]?.run!==expectedRun)return;note(id,'reply',part);}}catch(e){log('Aventure, '+what+' :',id,e.code??e);}
 };
 // the notices channel: a game started (with its link on the website, once the platform has given it) or won
 const waiters=new Map();
 function shared(shares){
  let changed=false;
  for(const [id,token]of Object.entries(shares||{}))if(token&&state.shares[id]!==token){state.shares[id]=token;changed=true;for(const done of waiters.get(id)??[])done();waiters.delete(id);}
  if(changed)store.save(state);
 }
 const linkOf=id=>state.shares[id]?PLATFORM_URL+'/aventure/?p='+state.shares[id]:null;
 function shareOf(id){
  if(state.shares[id])return Promise.resolve(linkOf(id));
  return new Promise(resolve=>{const timer=setTimeout(()=>resolve(null),shareWait);timer.unref?.();waiters.set(id,[...(waiters.get(id)??[]),()=>{clearTimeout(timer);resolve(linkOf(id));}]);});
 }
 async function notify(id,what){
  if(!notifyChannelId)return;
  try{
   const name='**'+(state.names[id]||id)+'**',link=await shareOf(id);
   const text=what==='start'?name+' commence une partie de l’aventure.':what==='restart'?name+' recommence l’aventure depuis le début.':name+' a terminé l’aventure !';
   const channel=await client.channels.fetch(notifyChannelId);
   await channel.send({content:text+(link?'\nÀ suivre ici : <'+link+'>':''),allowedMentions:{parse:[]}});
  }catch(e){log('Aventure, notification :',e.code??e);}
 }
 // the final room: the adventure ends for everyone once `final.players` players stand in it (players of any games,
 // they do not need to have played together); until then, those who arrived wait and hear of each newcomer.
 // Arriving after the end still gets the victory.
 function endingFor(id){
  const others=state.reached.filter(other=>other!==id).slice(0,2).map(other=>String(state.names[other]||'Un compagnon').replace(/([\\_*~`>|])/g,'\\$1'));
  const texts=[].concat(data.final?.victory||[]);
  if(others.length===2&&texts.length)texts[0]=texts[0].replace('Deux autres humains, pomifiés comme vous,',others.join(' et ')+', deux autres humains pomifiés comme vous,');
  return texts;
 }
 async function reach(userId){
  if(state.reached.includes(userId))return;
  state.reached.push(userId);save();
  const need=data.final?.players||1,count=state.reached.length;
  // a win is told once to each player, even one who starts over after the end
  const win=async id=>{if(state.won.includes(id))return;state.won.push(id);await tell(id,endingFor(id),'victoire');void notify(id,'end');};
  if(state.done){await win(userId);save();return;}
  if(count<need){
   const waiting=(data.messages?.waiting||'Il faut être {total} dans cette salle pour achever l’aventure : vous êtes {n} pour l’instant. Attendez vos compagnons…')
    .replaceAll('{n}',String(count)).replaceAll('{total}',String(need));
   for(const id of state.reached)await tell(id,id===userId?waiting:(data.messages?.joined||'Un compagnon vous a rejoint ({n}/{total}).').replaceAll('{n}',String(count)).replaceAll('{total}',String(need)),'attente');
   save();
   return;
  }
  await onCollectiveVictory();
  state.done=true;save();
  for(const id of state.reached)await win(id);
  save();
  // the closing words, where the invitation to play was posted
  const closing=messages(data.final.closing),where=channelId;
  if(closing.length&&where){
   try{const channel=await client.channels.fetch(where);for(let i=0;i<closing.length;i++)await channel.send({content:closing[i],...(closingAttachment&&i===closing.length-1?{files:[{attachment:closingAttachment,name:'depomification.gif'}]}:{}),allowedMentions:{parse:[]}});}catch(e){log('Aventure, clôture :',e.code??e);}
  }
 }
 async function publishInvitation(){
  if(state.invitation?.channel===channelId&&state.invitation.message)return state.invitation;
  const channel=await client.channels.fetch(channelId);
  const row=new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId(BUTTON).setLabel(data.post?.button||'Entrer').setStyle(ButtonStyle.Primary));
  const posted=await channel.send({content:data.post?.text||'Une aventure vous attend.',components:[row],allowedMentions:{parse:[]},nonce:'dolce-opening-20261030',enforceNonce:true});
  state.invitation={channel:channelId,message:posted?.id??null};save();return state.invitation;
 }
 async function handle(interaction){
  if(interaction.isChatInputCommand?.()&&interaction.commandName==='aventure'){
   if(!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)){await interaction.reply({content:'Commande réservée aux administrateurs.',flags:64});return true;}
   await publishInvitation();
   await interaction.reply({content:'Invitation publiée dans <#'+channelId+'>.',flags:64});
   return true;
  }
  if(!(interaction.isButton?.()&&interaction.customId===BUTTON))return false;
  await interaction.deferReply({flags:64});
  const id=interaction.user.id,known=state.players[id];
  const player=known||game.fresh();
  state.names[id]=interaction.user.globalName||interaction.user.username||id;
  try{
   const dm=await interaction.user.createDM();
   const opening=known?{replies:[data.messages?.resume||'Vous reprenez votre aventure.',game.describe(player)],look:true}:game.start(player);
   await send(dm,opening,player,id);
  }catch(e){
   log('Aventure, MP :',e.code??e);
   await interaction.editReply({content:"Je n'arrive pas à t'écrire en message privé : autorise les MP des membres du serveur puis réessaie."});return true;
  }
  if(!known)state.players[id]=player;
  save();
  if(!known)void notify(id,'start');
  await interaction.editReply({content:'Je t’ai écrit en message privé.'});
  return true;
 }
 // Raw dispatches precede messageCreate. Cold DM channels are currently dropped by
 // discord.js 14.26 before messageCreate, even with Partials.Channel enabled.
 // Both entrances share the same queue and a bounded message-id receipt cache.
 const dmReceipts=new Map();
 function rawMessage(packet){
  const data=packet?.d;
  if(packet?.t!=='MESSAGE_CREATE'||!data||data.guild_id||data.author?.bot||!state.players[data.author?.id]||!String(data.content||'').trim()||!/^\d{17,20}$/.test(data.channel_id||'')||!/^\d{17,20}$/.test(data.id||''))return false;
  let channelPromise;
  return message({id:data.id,author:{id:data.author.id,bot:false,globalName:data.author.global_name,username:data.author.username},guild:null,content:data.content,channel:{send:async payload=>{
   channelPromise??=client.channels.fetch(data.channel_id);
   const channel=await channelPromise;
   if(!channel?.isDMBased())throw Error('Le canal reçu n’est pas une conversation privée.');
   return channel.send(payload);
  }}});
 }
 // a DM from a player: one command, played after the previous one is answered
 function message(msg){
  if(!msg.author||msg.author.bot||msg.guild||!state.players[msg.author.id]||!String(msg.content||'').trim())return false;
  if(msg.id){const now=Date.now();for(const [id,at]of dmReceipts){if(now-at<600000)break;dmReceipts.delete(id);}if(dmReceipts.has(msg.id))return true;dmReceipts.set(msg.id,now);while(dmReceipts.size>2048)dmReceipts.delete(dmReceipts.keys().next().value);}
  const id=msg.author.id,requestedRun=state.archiveRuns[id]?.run;
  state.names[id]=msg.author.globalName||msg.author.username||state.names[id]||id;
  const next=(queues.get(id)||Promise.resolve()).then(()=>processCommand(msg,id,requestedRun)).catch(e=>log('Aventure :',e));
  queues.set(id,next);
  return true;
 }
 async function processCommand(msg,id,requestedRun){
   if(!state.players[id]||archive&&state.archiveRuns[id]?.run!==requestedRun)return;
   note(id,'command',msg.content.trim());count(state.typed[id]??={count:0,commands:{}},msg.content);
   // « /reset »: the adventure starts over, even after its end (a win already told is not told again)
   if(msg.content.trim().toLowerCase()==='/reset'){
    if(archive){state.archiveRuns[id]={run:archive.newRun(),partial:false};archive.meta(state.archiveRuns[id].run,{user:id,name:state.names[id]??id,state:{},typed:{},partial:false});}else state.typed[id].history=roomHistory.create([],false);
    commandRooms.delete(id);
    const player=game.fresh(),start=game.start(player);
    const restart={...start,replies:[data.messages?.reset||'Votre aventure recommence depuis le début.',...start.replies]};
    state.players[id]=player;state.reached=state.reached.filter(r=>r!==id);
    await send(msg.channel,restart,player,id);void notify(id,'restart');
    return;
   }
   const player=state.players[id];
   if(state.done&&state.reached.includes(id)){const over=data.messages?.over||'Votre aventure est terminée.';note(id,'reply',over);save();await msg.channel.send({content:over});return;}
   const result=game.handle(player,msg.content);
   await send(msg.channel,result,player,id);
   if(result.final&&(!archive||state.archiveRuns[id]?.run===requestedRun))await reach(id);
 }
 // Browser transport: same player state, queue, archive, media budget and collective ending as DMs.
 const feedbackPending=new Map();
 async function feedback(id,text,requestId){
  if(!state.won.includes(id))throw Object.assign(Error('Terminez l’aventure avant de laisser un commentaire.'),{status:403});
  text=String(text||'').trim();if(!text||Array.from(text).length>1500)throw Object.assign(Error('Le commentaire doit contenir de 1 à 1 500 caractères.'),{status:400});
  if(!/^[a-zA-Z0-9-]{16,80}$/.test(requestId||''))throw Object.assign(Error('Identifiant de commentaire requis.'),{status:400});
  state.feedback??={};if(state.feedback[id])return {accepted:true};
  if(feedbackPending.has(id))return feedbackPending.get(id);
  const task=(async()=>{
   const channel=await client.channels.fetch('889835278494203915');
   const name=String(state.names[id]||'Voyageur').replace(/([\\_*~`>|])/g,'\\$1');
   const nonce=crypto.createHash('sha256').update('adventure-feedback:'+id).digest('hex').slice(0,24);
   const message=await channel.send({content:'<@369731837053894656>\n**Commentaire de '+name+' — Dolce Traccia**\n\n'+text,allowedMentions:{parse:[],users:['369731837053894656']},nonce,enforceNonce:true});
   state.feedback[id]={message:message.id,at:Date.now()};save();return {accepted:true};
  })();feedbackPending.set(id,task);try{return await task;}finally{feedbackPending.delete(id);}
 }
 function webView(id){const player=state.players[id];return {instance:webInstance,started:!!player,name:state.names[id]||'Voyageur',revision:version,
  room:player?{id:player.room,name:game.room(player.room)?.name||''}:null,
  progress:player?structuredClone(player):null,
  commandUsage:{...(state.typed[id]?.commands||{})},
  inventory:player?player.inventory.map(key=>({id:key,name:(data.objects||[]).find(o=>String(o.id)===key)?.name||key})):[],
  ended:state.won.includes(id),ending:state.won.includes(id)?endingFor(id):[],lines:(state.logs[id]||[]).map(line=>({...line,key:crypto.createHash('sha1').update(JSON.stringify(line)).digest('hex')}))};}
 async function web({id,name,action='state',text='',requestId=''}){
  if(!/^(?:\d{17,20}|web_[a-f0-9]{24})$/.test(id))throw Object.assign(new Error('Identité invalide.'),{status:401});
  if(action==='state')return webView(id);
  if(!['start','command','restart'].includes(action))throw Object.assign(new Error('Action inconnue.'),{status:400});
  if(!/^[a-zA-Z0-9-]{16,80}$/.test(requestId))throw Object.assign(new Error('Identifiant de commande requis.'),{status:400});
  text=String(text).trim();if(action==='command'&&(!text||text.length>1000))throw Object.assign(new Error('Commande trop longue ou vide.'),{status:400});
  const pending=(queues.get(id)||Promise.resolve()).then(async()=>{
   state.webReceipts??={};const receipts=state.webReceipts[id]??=[];
   if(receipts.includes(requestId))return webView(id);
   if(action!=='start'&&!state.players[id])throw Object.assign(new Error('Commencez une partie avant de jouer.'),{status:409});
   if(action==='start'&&!state.players[id]){
    const chosen=String(name??'Voyageur').normalize('NFC').replace(/[\u0000-\u001f\u007f]/g,' ').replace(/\s+/gu,' ').trim();
    if(!chosen||Array.from(chosen).length>60)throw Object.assign(Error('Choisissez un nom de 1 à 60 caractères.'),{status:400});
    state.names[id]=chosen;
   }else state.names[id]??='Voyageur';
   receipts.push(requestId);if(receipts.length>24)receipts.shift();
   const channel={browser:true,send:async()=>{}};
   if(action==='start'&&state.players[id]){save();return webView(id);}
   if(action==='start'){
    state.players[id]=game.fresh();
    await send(channel,game.start(state.players[id]),state.players[id],id);void notify(id,'start');
   }else{
    if(!state.players[id])throw Object.assign(new Error('Commencez une partie avant de jouer.'),{status:409});
    if(action==='restart')text='/reset';
    // Reuse the DM command handler, including reset, animations, final-room coordination and counting.
    await processCommand({content:text,channel},id,state.archiveRuns[id]?.run);
   }
   save();return webView(id);
  });
  queues.set(id,pending);
  const result=pending.finally(()=>{if(queues.get(id)===pending)queues.delete(id);});
  return result;
 }
 // the games for the platform: every player's state and last exchanges
 const snapshot=()=>Object.entries(state.players).map(([id,player])=>({id,...(archive?{archive:ensureArchive(id)}:{}),name:state.names[id]||id,state:player,log:archive?[]:(state.logs[id]||[]),typed:state.typed[id]??{count:0,commands:{}}}));
 // a hint written on the platform, sent in DM
 async function hint(id,text){
  if(!state.players[id])throw new Error('joueur inconnu');
  const expectedRun=state.archiveRuns[id]?.run;
  if(id.startsWith('web_')){note(id,'hint',text);save();return;}
  const user=await client.users.fetch(id);
  await user.send({content:(data.messages?.hint||'💡 **Indice** : ')+text,allowedMentions:{parse:[]}});
  if(!state.players[id]||archive&&state.archiveRuns[id]?.run!==expectedRun)return;
  note(id,'hint',text);save();
 }
 // the animations the platform does not have yet, and their delivery
 const media=()=>[...pendingMedia].map(([sha,item])=>({sha,type:item.type,data:item.data.toString('base64')}));
 const mediaSent=shas=>{for(const sha of shas)pendingMedia.delete(sha);};
 const subscribe=listener=>{listeners.add(listener);return()=>listeners.delete(listener);};
 function forget(items){let changed=false;for(const item of items){archive?.remove(item.run);if(state.archiveRuns[item.user]?.run!==item.run)continue;changed=true;for(const key of ['players','logs','typed','names','shares','archiveRuns','webReceipts','feedback'])if(state[key])delete state[key][item.user];state.reached=state.reached.filter(id=>id!==item.user);state.won=state.won.filter(id=>id!==item.user);commandRooms.delete(item.user);queues.delete(item.user);}if(changed)save();}
 function webMedia(id,{file,sha}){
  if(file){const allowed=new Set(data.rooms.map(r=>r.image).filter(Boolean));if(!allowed.has(file))return null;
   const resolved=path.resolve(files,file);if(!resolved.startsWith(path.resolve(files)+path.sep)||!fs.existsSync(resolved))return null;
   const ext=path.extname(file).toLowerCase(),mime={'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.gif':'image/gif'}[ext];
   if(!mime)return null;return {mime,data:fs.readFileSync(resolved).toString('base64')};}
  if(!/^[a-f0-9]{40}$/.test(sha||'')||!state.logs[id]?.some(l=>l.media?.some(m=>m.sha===sha)))return null;
  const item=pendingMedia.get(sha);return item?{mime:item.type,data:item.data.toString('base64')}:null;
 }
 return {feedback,publishInvitation,web,webView,webMedia,handle,message,rawMessage,state,snapshot,hint,media,mediaSent,subscribe,shared,forget,archiveBatch:()=>archive?.batch()??[],archiveAck:(items,runs)=>archive?.ack(items,runs),version:()=>version};
}
module.exports={createAdventureDiscord,chunks,messages,normalize,BUTTON};
