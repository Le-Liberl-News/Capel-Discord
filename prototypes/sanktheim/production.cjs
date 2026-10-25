const path=require('node:path'),fs=require('node:fs');
const world=require('./world-space.cjs');
const {createActivityStateStore}=require('../../utils/activityStateStore');
const {createSiege}=require('./core.cjs');
const {createArenaBridge}=require('./arena-bridge.cjs');
const {createCatalogue}=require('./catalogue.cjs');
const {cohortFromRhumertume}=require('./integration.cjs');
function createProductionSiege({app,client,lobby,access,bearer,rhumertume,resolveCharacter,assignedCharacters=async()=>[],channelId,ownerId,baseUrl,onSay=()=>{},runtime=path.resolve(__dirname,'../../.runtime/sanktheim-live'),now=Date.now}){
 const store=name=>createActivityStateStore(path.join(runtime,name+'.json'));
 const cohort=cohortFromRhumertume(rhumertume);
 const balanceStore=store('balance');let balance=balanceStore.load();
 if(!balance){balance=require('./balance.cjs').calibrate(cohort());if(balance)balanceStore.save(balance);}
 const siege=createSiege({store:store('state'),cohort,balance,now,enableLadders:true,seed:'sanktheim-live-2026'});
 const terrainGeometry=require('../../utils/activityGeometry').createActivityGeometry(JSON.parse(fs.readFileSync(path.resolve(__dirname,'../../activity/assets/sky/sanktheim/forest/terrain.gltf'),'utf8')));
 const nativeGeometry=require("./forest-collision.cjs").createForestCollision(terrainGeometry,()=>siege._state.forestry,1,()=>siege._state.barricades,()=>siege._state.enemies.filter(e=>e.siegeTank));
 const {geometry}=require('./geometry.cjs').createGeometry(siege,nativeGeometry);
 const arena=createArenaBridge({siege,geometry,worldScale:world.SCALE,surfaceJumps:true,onSay,resolveCharacter,isInfected:c=>rhumertume.isInfected(c),now:()=>siege._state.at});
 // Production media stays on the browser-free still renderer.
 const sceneMediaEnabled=false;
 // a blow that takes a wall past a threshold: its replay animated (highlight-replay.cjs, the prepared view of that wall
 // at that threshold), through the shared media gate (utils/mediaRender.js); its still picture when declined
 const thresholdReplay=event=>event.type==='threshold'&&event.replay?.hit?require('../../utils/mediaRender').render(()=>require('./highlights.cjs').renderHighlight(event),{fallback:()=>require('./highlights.cjs').renderHighlight({...event,still:true}),limits:{maxGrowth:96*1048576,maxDuration:20000,maxBytes:4*1048576}}):null;
 const history=sceneMediaEnabled?require('./scene-history.cjs').createSceneHistory({siege,arena,now}):null;
 const warmSpectator=sceneMediaEnabled?require('./spectator-warmup.cjs').createSpectatorWarmup({siege,render:event=>require('./highlights.cjs').renderHighlight(event),log:console.error}):()=>{};
 const recordScene=()=>{if(history)warmSpectator(history.record());};
 const announce=require('./discord.cjs').createAnnouncements({client,channelId,siege,store:store('deliveries'),baseUrl,assignedCharacters,infectedCharacters:()=>rhumertume.infected(),renderHighlight:async event=>{if(event.type==='wave-start')return require('./wave-intro.cjs').renderWaveIntro(event);if(!history)return (await thresholdReplay(event))??require('./highlights.cjs').renderHighlight({...event,still:true});const clip=await history.clip(event);return clip?require('./highlights.cjs').renderHighlight({type:'scene-replay',clip}):null;}});
 const entries=store('entries');const pending=new Map(entries.load()??[]);const saveEntries=()=>entries.save([...pending]);let ready=false;
 const wantsEntry=id=>{const until=pending.get(id)??0;if(until>now())return true;if(pending.delete(id))saveEntries();return false;};
 const isOwner=id=>String(id)===String(ownerId);
 const identity=req=>{const {id}=lobby.identity(bearer(req));return {id:'player-'+id,userId:id};};
 // the last joinings' load times (arena-front.mjs reports them), to see where a slow start goes
 const joinTimings=[];
 app.get('/api/siege/status',(req,res)=>{res.set('Cache-Control','no-store');
  // the wave under way and the next one: the deployment waits for a quiet moment (.github/workflows/deploy.yml)
  const view=ready?siege.snapshot():null,wave=view?.wave?{number:view.wave.number,ends:view.wave.ends}:null;
  const r=v=>Math.round(v*10)/10,st=siege._state,field=ready?{   // what the garrison is doing right now, to see from outside why a wall is falling
    guards:st.soldiers.map(g=>({name:g.name,role:g.role,hp:Math.round(g.hp),x:r(g.x),y:r(g.y),z:r(g.z),moving:!!g.moving,transit:!!g.transit,sleeping:!!g.sleeping,bump:!!g.pomBump,bound:g.pomBoundUntil>st.at,lastShot:g.attackPose?st.at-g.attackPose.at:null})),
    poms:st.enemies.filter(e=>e.hp>0).map(e=>({name:e.pomCharacter??e.character,skirmish:!!e.skirmish,hp:Math.round(e.hp),x:r(e.x),y:r(e.y),z:r(e.z),target:e.target??null,craft:e.pomCraft?.phase??null})),
    walls:st.walls.map(w=>({id:w.id,percent:Math.round(w.hp/w.maxHP*1000)/10})),
    turrets:st.turrets.filter(t=>t.hp>0).map(t=>({type:t.type,x:r(t.x),y:r(t.y),z:r(t.z),lastShot:t.nextAttack?st.at-t.nextAttack:null})),
    online:Object.values(st.players).filter(p=>p.online).length}:null;
  res.json({ready,wave,field,nextWave:view?.nextWave??null,started:siege._state.started,stopped:!!siege._state.stoppedAt,serverTime:siege._state.at,version:'sanktheim-2',pendingAnnouncements:siege.outbox().length,joinTimings});});
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
   if(route==='/timings'){const b=req.body??{},player=siege._state.players[user.id];joinTimings.unshift({at:new Date(now()).toISOString(),character:player?.character??null,marks:Array.isArray(b.marks)?b.marks.slice(0,40):[],files:b.files,kb:b.kb,slowest:Array.isArray(b.slowest)?b.slowest.slice(0,15):[]});joinTimings.length=Math.min(joinTimings.length,10);return res.json({ok:true});}
   if(route==='/entered'){pending.delete(user.userId);saveEntries();return res.json({ok:true});}
   if(route==='/arena'){siege.advance(now());return res.json({...await arena.update(user,req.body??{}),siege:world.snapshot(siege.snapshot())});}
   if(route==='/admin-stop'){
    if(!isOwner(user.userId))return res.status(403).json({error:'Seul le propriétaire peut arrêter le siège.'});
    siege.stop();await announce.flush();return res.json({ok:true});
   }
   return res.status(404).json({error:'Route de siège inconnue.'});
  }catch(e){res.status(e.status??400).json({error:e.message});}
 });
 async function start(){if(ready)return;siege.start();siege.advance(now());arena.tick();recordScene();siege.save();ready=true;await announce.flush();}
 const timer=setInterval(()=>{if(!ready)return;try{siege.advance(now());arena.tick();recordScene();}catch(e){console.error('Siège:',e.message);}},250);timer.unref();
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
    }else{pending.set(interaction.user.id,now()+10*60000);saveEntries();if(lobby.isConnected?.(interaction.user.id))await interaction.reply({content:'Vous rejoignez directement Sanktheim dans votre activité ouverte.',flags:64});else await interaction.launchActivity();}
   }
  }catch(e){pending.delete(interaction.user.id);saveEntries();if(interaction.deferred)await interaction.editReply({content:e.message,components:[]});else if(!interaction.replied)await interaction.reply({content:e.message,flags:64});}
  return true;
 }
 return {start,handle,siege,arena,captureMessage(message){const p=siege._state.players['player-'+message.author.id];if(!p?.online||message.author.bot||message.webhookId||p.discordChannel!==message.channelId)return;arena.chat.push({id:message.id,author:p.id,character:p.name,text:String(message.cleanContent??message.content).slice(0,4000),created:now()});if(arena.chat.length>100)arena.chat.shift();},wantsEntry,consumeEntry:wantsEntry,close(){clearInterval(timer);clearInterval(announcements);siege.save();}};
}
module.exports={createProductionSiege};
