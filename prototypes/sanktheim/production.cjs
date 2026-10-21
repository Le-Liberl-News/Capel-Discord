const path=require('node:path'),fs=require('node:fs');
const world=require('./world-space.cjs');
const {createActivityStateStore}=require('../../utils/activityStateStore');
const {createSiege}=require('./core.cjs');
const {createArenaBridge}=require('./arena-bridge.cjs');
const {createCatalogue}=require('./catalogue.cjs');
const {cohortFromRhumertume}=require('./integration.cjs');
function createProductionSiege({app,client,lobby,access,bearer,rhumertume,resolveCharacter,channelId,ownerId,onSay=()=>{},runtime=path.resolve(__dirname,'../../.runtime/sanktheim-live'),now=Date.now}){
 const store=name=>createActivityStateStore(path.join(runtime,name+'.json'));
 const cohort=cohortFromRhumertume(rhumertume);
 const balanceStore=store('balance');let balance=balanceStore.load();
 if(!balance){balance=require('./balance.cjs').calibrate(cohort());if(balance)balanceStore.save(balance);}
 const siege=createSiege({store:store('state'),cohort,balance,now,enableLadders:true,seed:'sanktheim-live-2026'});
 const nativeGeometry=require('../../utils/activityGeometry').createActivityGeometry(JSON.parse(fs.readFileSync(path.resolve(__dirname,'../../activity/assets/sky/sanktheim/map/model.gltf'),'utf8')));
 const {geometry}=require('./geometry.cjs').createGeometry(siege,nativeGeometry);
 const arena=createArenaBridge({siege,geometry,worldScale:world.SCALE,surfaceJumps:true,onSay,resolveCharacter,isInfected:c=>rhumertume.isInfected(c),now:()=>siege._state.at});
 const announce=require('./discord.cjs').createAnnouncements({client,channelId,siege,store:store('deliveries')});
 const pending=new Set();let ready=false;
 const isOwner=id=>String(id)===String(ownerId);
 const identity=req=>{const {id}=lobby.identity(bearer(req));return {id:'player-'+id,userId:id};};
 app.get('/api/siege/status',(req,res)=>{res.set('Cache-Control','no-store');res.json({ready,started:siege._state.started,stopped:!!siege._state.stoppedAt,serverTime:siege._state.at,version:'sanktheim-1',pendingAnnouncements:siege.outbox().length});});
 app.use('/api/siege',async(req,res)=>{
  try{
   const user=identity(req);await access.assertMember(user.userId);
   if(!ready)return res.status(503).json({error:'Le siège se prépare, réessayez dans quelques secondes.'});
   res.set('Cache-Control','no-store');
   const route=req.path;
   const readonly=['/session','/catalogue','/navigation','/state','/music'];
   if(req.method!=='POST'&&!readonly.includes(route))return res.status(405).json({error:'Méthode refusée.'});
   if(route==='/session'){const player=await arena.join(user);siege._state.players[user.id].discordChannel=lobby.identity(bearer(req)).channel;return res.json({player,owner:isOwner(user.userId),notice:'Votre personnage du jour · Défense de Sanktheim'});}
   if(route==='/catalogue')return res.json(createCatalogue(cohort)());
   if(route==='/navigation')return res.json(arena.navigation(req.query.layer==='roof'));
   if(route==='/state')return res.json(world.snapshot(siege.snapshot()));
   if(route==='/music')return res.json(require('./music.json'));
   if(route==='/arena')return res.json({...await arena.update(user,req.body??{}),siege:world.snapshot(siege.snapshot())});
   if(route==='/admin-stop'){
    if(!isOwner(user.userId))return res.status(403).json({error:'Seul le propriétaire peut arrêter le siège.'});
    siege.stop();await announce.flush();return res.json({ok:true});
   }
   return res.status(404).json({error:'Route de siège inconnue.'});
  }catch(e){res.status(e.status??400).json({error:e.message});}
 });
 async function start(){if(ready)return;siege.start();siege.advance(now());arena.tick();siege.save();ready=true;await announce.flush();}
 const timer=setInterval(()=>{if(!ready)return;try{siege.advance(now());arena.tick();}catch(e){console.error('Siège:',e.message);}},250);timer.unref();
 const announcements=setInterval(()=>{if(ready)void announce.flush().catch(e=>console.error('Annonces Sanktheim:',e.message));},10000);announcements.unref();
 async function handle(interaction){
  if(!['sanktheim:join','sanktheim:enter','sanktheim:stop'].includes(interaction.customId))return false;
  try{
   await access.assertMember(interaction.user.id);
   if(interaction.customId==='sanktheim:stop'){
    if(!isOwner(interaction.user.id))throw Error('Seul le propriétaire peut arrêter le siège.');
    siege.stop();await interaction.reply({content:'Le siège de Sanktheim est arrêté.',flags:64});await announce.flush();
   }else{
    if(siege._state.stoppedAt)throw Error('Ce siège est terminé.');
    if(!await resolveCharacter(interaction.user.id))throw Error('Tirez votre personnage du jour avant de participer.');
    if(!interaction.channel?.isDMBased?.()){
     await interaction.deferReply({flags:64});
     const message=await interaction.user.send({content:'Rejoindre la défense de Sanktheim avec votre personnage du jour.',components:[{type:1,components:[{type:2,custom_id:'sanktheim:enter',label:'Entrer à Sanktheim',style:1}]}],allowedMentions:{parse:[]}});
     await interaction.editReply({content:'Votre bouton de lancement est dans vos messages privés avec Capel.',components:[{type:1,components:[{type:2,style:5,label:'Ouvrir Capel',url:'https://discord.com/channels/@me/'+message.channelId}]}]});
    }else{pending.add(interaction.user.id);await interaction.launchActivity();}
   }
  }catch(e){pending.delete(interaction.user.id);if(interaction.deferred)await interaction.editReply({content:e.message,components:[]});else if(!interaction.replied)await interaction.reply({content:e.message,flags:64});}
  return true;
 }
 return {start,handle,siege,arena,captureMessage(message){const p=siege._state.players['player-'+message.author.id];if(!p?.online||message.author.bot||message.webhookId||p.discordChannel!==message.channelId)return;arena.chat.push({id:message.id,author:p.id,character:p.name,text:String(message.cleanContent??message.content).slice(0,4000),created:now()});if(arena.chat.length>100)arena.chat.shift();},consumeEntry(id){const value=pending.has(id);pending.delete(id);return value;},close(){clearInterval(timer);clearInterval(announcements);siege.save();}};
}
module.exports={createProductionSiege};
