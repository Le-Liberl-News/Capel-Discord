const { randomBytes } = require("node:crypto");
const { createActivityService, ActivityError } = require("./activityService");
// Real Discord IDs stay inside the server. Every scene exposes random avatar IDs.
function createActivityLobby({ arena, axis=null, gehenna=null, random=Math.random, tower = [], rolent = null, airship = null, huntGame = null, store = null, worldStores = {}, onDuelEnd = async()=>{}, getArenaStreak=()=>0, now = Date.now, ...options }) {
  const sessions = new Map(), duels = new Map(), assignments = new Map();
  const active = new Map(), lastSeen = new Map(),completedCaptures=new Map();
  const trainingRequests=new Map();let trainingSequence=0;
  // the arena board's queue (user -> time joined), shown to the queued player inside the activity
  const presenceGrace = 2 * 60 * 1000;
  // A started duel is called off when one fighter stays away: 1 min once they have reached the arena, 3 min to get
  // there at first (opening the activity from a DM, loading the venue); a finished one once someone has left for 30 s.
  const duelAbsence = 60 * 1000, duelArrival = 3 * 60 * 1000, finishedAbsence = 30 * 1000;
  const isReady = duel => !!duel && duel.players.every(p => duel.accepted?.includes(p));
  const sources = new Map(), locations = new Map(), spectators = new Map();
  const tavern = createActivityService({ ...options, onSay:event=>options.onSay?.({...event,map:"anterose"}), now, persistent: true, store: worldStores.anterose });
  const skies=airship&&require('./activityAirship').createActivityAirship({...airship,now,resolveCharacter:options.resolveCharacter,onSay:options.onSay,store:worldStores.liberl});
  const hangar=airship&&createActivityService({...options,grid:require('../activity/hangar-world.cjs').grid,residents:{npcs:[],disablePoms:true},geometry:null,onSay:event=>options.onSay?.({...event,map:'hangar'}),now,persistent:true,store:worldStores.hangar});
  // Duel venues: Grancel (client map "arena") and the top of the Axis Pillar (client map "axis").
  // Both keep the "arena" location and publication channel; each duel draws its venue once.
  const venueConfig=duel=>duel?.venue==='gehenna'&&gehenna?gehenna:duel?.venue==='axis'&&axis?axis:arena;
  const venueOf=duel=>duel?.venue==='gehenna'&&gehenna?'gehenna':duel?.venue==='axis'&&axis?'axis':'arena';
  const isArena=map=>map==='arena'||map==='axis'||map==='gehenna';
  const makeStadium=(venue,config)=>config&&createActivityService({ ...options, ...config, jumpEnabled:true, now, persistent: true, store: worldStores[venue],
    spawnFor: user => spectators.has(user) ? (config.spectatorGrid?.spawn ?? config.grid.spawn) : config.spawns?.[duels.get(assignments.get(user))?.players.indexOf(user) ?? 0] ?? config.grid.spawn,
    onDefeat: finishDuel,
    onSay:event=>options.onSay?.({...event,map:"arena"}),
    navigationFor: user => spectators.has(user) ? (config.spectatorGrid ?? config.grid) : config.grid,
    playerPolicy: user => {const duel=duels.get(assignments.get(user)),protectedNow=!!config.introDuration&&!!duel&&(duel.readyAt===undefined||now()<duel.readyAt);const ended=!!duel?.result;return {spectator:spectators.has(user),canMove:!protectedNow&&!ended,duelProtected:protectedNow||ended,duelFinished:ended,noRespawn:ended,...(ended&&duel.result.loser===user?{hp:0,deadUntil:duel.result.at+10000}:{})};} });
  const stadiums={arena:makeStadium('arena',arena),axis:makeStadium('axis',axis),gehenna:makeStadium('gehenna',gehenna)};
  const stadium=stadiums.arena,stadiumOf=duel=>stadiums[venueOf(duel)];
  const city = rolent && createActivityService({ ...options,...rolent,now,persistent:true,store:worldStores.rolent,
    onSay:event=>options.onSay?.({...event,map:"rolent"}),
    playerPolicy:user=>huntGame?.policy(user)??{} });
  const towerArrivals=new Map(),towerTeam=new Map();
  // the tower is climbed with the character chosen in the menu (playTowerAs), on every floor
  const towerCharacters=new Map();
  const towers=tower.map((floor,i)=>createActivityService({...options,...floor,resolveCharacter:async user=>towerCharacters.get(user)??options.resolveCharacter(user),dungeon:floor.layout,now,persistent:true,store:worldStores['tower'+(i+1)],combatEnabled:true,canDamage:(_actor,target)=>target.enemy===true,onDrink:null,onCraft:()=>{},residents:{npcs:[],disablePoms:true},spawnFor:user=>towerArrivals.get(user)??floor.grid.spawn,onSay:event=>options.onSay?.({...event,map:'tower'+(i+1)})}));
  const makeDuel = data => {if(data.startsAt===undefined&&data.players.every(p=>data.accepted?.includes(p))){data.readyAt=now();data.startsAt=now()-(venueConfig(data)?.introDuration??0);}return data;};
  const saved=store?.load();
  for(const [id,replay]of saved?.completedCaptures??[])if(now()-replay.at<600000)completedCaptures.set(id,replay);
  for (const [id,data] of saved?.duels ?? []) if (data.expires>now()) duels.set(id,makeDuel(data));
  for (const [user,id] of saved?.assignments ?? []) if (duels.has(id)) { assignments.set(user,id); lastSeen.set(user,now()); }
  for (const [user,map] of saved?.locations ?? []) if (["arena","anterose","rolent","hangar","liberl",...towers.map((_,i)=>"tower"+(i+1))].includes(map)) locations.set(user,map);
  for (const [user] of assignments) if (!locations.has(user)) locations.set(user,"arena");
  for (const [user,id] of saved?.spectators ?? []) spectators.set(user,id);
  const persist=()=>store?.save({completedCaptures:[...completedCaptures],spectators:[...spectators],locations:[...locations],duels:[...duels].map(([id,{service,...data}])=>[id,data]),assignments:[...assignments]});
  const publishingResults=new Set(),resultAttempts=new Map();
  function publishResult(id,duel){
   if(!duel.result||duel.result.published||publishingResults.has(id)||now()-(resultAttempts.get(id)??-Infinity)<5000)return;
   resultAttempts.set(id,now());
   publishingResults.add(id);
   Promise.resolve().then(()=>onDuelEnd({id,...duel.result,actors:duel.players})).then(()=>{duel.result.published=true;persist();}).catch(error=>console.error("Activity duel result publication failed:",error.code??"unavailable")).finally(()=>publishingResults.delete(id));
  }
  function finishDuel(event){
   const id=assignments.get(event.victim.id),duel=duels.get(id);
   if(!duel||duel.result||!duel.players.every(p=>duel.accepted?.includes(p))||now()<(duel.readyAt??0))return;
   const winner=duel.players.find(p=>p!==event.victim.id),winnerPlayer=event.players.get(winner);
   duel.result={winner,loser:event.victim.id,winnerName:winnerPlayer?.character??duel.names?.[duel.players.indexOf(winner)]??"?",loserName:event.victim.character??duel.names?.[duel.players.indexOf(event.victim.id)]??"?",at:event.at,point:event.point,action:event.action,captureId:"duel-result:"+id};
   for(const user of duel.players){const p=event.players.get(user);if(p)Object.assign(p,{duelProtected:true,duelFinished:true,noRespawn:true,canMove:false});}
   persist();publishResult(id,duel);
  }
  const aliases = new Map();
  const alias = id => {
    if (!id || String(id).startsWith("npc:") || String(id).startsWith("world:")) return id;
    if (!aliases.has(id)) aliases.set(id, "avatar:" + randomBytes(12).toString("hex"));
    return aliases.get(id);
  };
  function detach(user, returnHome = true) {
    if (returnHome) {locations.set(user,"anterose");}
    assignments.delete(user); lastSeen.delete(user);
    if (returnHome) for (const session of sessions.values()) if (session.id === user && session.key !== "tavern") session.service.leave(session.token);
  }
  function closeDuel(id) {
    if (!duels.has(id)) return;
    for (const [user, match] of assignments) if (match === id) detach(user);
    for (const [user, match] of spectators) if (match === id) { spectators.delete(user); detach(user); }
    const completed=duels.get(id);if(completed?.result)completedCaptures.set(completed.result.captureId,{id,...completed.result,actors:completed.players});
    stadiumOf(completed)?.closeRoom("map:"+venueOf(completed)+":"+id);
    duels.delete(id); resultAttempts.delete(id);
  }
  function release(user, returnHome = true, cancel = true) {
    const id=assignments.get(user);
    if(cancel && id)closeDuel(id);
    detach(user,returnHome);
  }
  function prune() {
    let changed = false;
    for(const [id,replay]of completedCaptures)if(now()-replay.at>=600000){completedCaptures.delete(id);changed=true;}
    for (const [id, duel] of duels) if (isReady(duel)) {
      const away = user => now() - Math.max(lastSeen.get(user) ?? 0, duel.readyAt ?? 0) > (duel.result ? finishedAbsence : duel.arrived?.[user] ? duelAbsence : duelArrival);
      if (duel.players.some(away)) { closeDuel(id); changed = true; }
    }
    for (const [user, id] of assignments) if (!isReady(duels.get(id)) && now() - (lastSeen.get(user) ?? 0) > presenceGrace) { release(user,false,false); changed = true; }
    for (const [id, duel] of duels) if (duel.expires < now()) {
      closeDuel(id); changed = true;
    }
    for (const [token, s] of sessions) if (s.expires < now()) sessions.delete(token);
    if (changed) persist();
  }
  function destination(user) {
    prune(); const id = assignments.get(user), duel = duels.get(id);
    if(hangar&&locations.get(user)==='hangar')return {key:'hangar',service:hangar,map:'hangar',channel:'map:hangar',match:null};
    if(skies&&locations.get(user)==='liberl')return {key:'liberl',service:skies,map:'liberl',channel:'map:liberl',match:null};
    const floor=/^tower([1-4])$/.exec(locations.get(user)??"");if(floor&&towers[Number(floor[1])-1]){const map="tower"+floor[1];return {key:map,service:towers[Number(floor[1])-1],map,channel:"map:"+map,match:null};}
    if (city && locations.get(user) === "rolent") return {key:"rolent",service:city,map:"rolent",channel:"map:rolent",match:huntGame?.summary()?.id??null};
    const arenaId=spectators.get(user) ?? (duel ? id : null);
    return stadium && locations.get(user) === "arena" && duels.has(arenaId) ? { key:"arena:"+arenaId, service:stadiumOf(duels.get(arenaId)), map:venueOf(duels.get(arenaId)), channel:"map:"+venueOf(duels.get(arenaId))+":"+arenaId, match:spectators.has(user) ? "watch:"+arenaId : arenaId } : { key:"tavern", service:tavern, map:"anterose", channel:"map:anterose", match:null };
  }
  function sanitize(result) {
    const pom = p => p && ({ ...p, owner: alias(p.owner), thrownBy: alias(p.thrownBy) });
    const cat=p=>p?{...p,catCling:p.catCling?{target:alias(p.catCling.target),started:p.catCling.started}:null,catCarrier:p.catCarrier?{active:p.catCarrier.active}:null}:p;
    return { ...result, health:cat(result.health), player:result.player && {...cat(result.player),id:alias(result.player.id)},
      joueurs:result.joueurs?.map(p=>({...cat(p),id:alias(p.id)})),
      messages:result.messages?.map(m=>({...m,id:alias(m.id),author:alias(m.author)})),
      enemies:result.enemies?.map(p=>({...cat(p),owner:alias(p.owner)})),
      pom:pom(result.pom), poms:result.poms?.map(pom),
      combat:result.combat && {...result.combat,attacks:result.combat.attacks.map(a=>({...a,actor:alias(a.actor),target:alias(a.target),caught:a.caught?.map(alias),hits:a.hits.map(h=>({...h,id:alias(h.id)}))}))} };
  }
  return {
    requestTraining(user,mode='duel'){if(mode!=='duel')throw new ActivityError('Mode indisponible.',403);this.leaveStaleDuel(user);trainingRequests.set(user,{id:String(++trainingSequence)+':'+now(),mode,expires:now()+120000});},
    cancelTraining(user){trainingRequests.delete(user);},
    playTowerAs(user,character){towerCharacters.set(user,character);for(const service of towers)service.refreshCharacter(user);},
    enterTower(user,floor=1,arrival=null){if(!Number.isInteger(floor)||!towers[floor-1])throw new ActivityError('Etage indisponible.',400);release(user);huntGame?.leave(user);spectators.delete(user);towers[floor-1].resetPlayer(user);towerArrivals.set(user,arrival??tower[floor-1].grid.spawn);locations.set(user,'tower'+floor);persist();},
    identity(token) {prune();const s=sessions.get(token);if(!s)throw new ActivityError("Reconnectez-vous.",401);if(active.get(s.id)!==token)throw new ActivityError("Activit\u00e9 ouverte ailleurs.",409);return {id:s.id,channel:s.channel,map:destination(s.id).map};},
    async terminalPosition(token) {this.identity(token);const s=sessions.get(token);if(!s)throw new ActivityError("Reconnectez-vous.",401);const target=destination(s.id);if(target.key!==s.key)throw new ActivityError("D\u00e9placement en cours.",409);const state=await s.service.state(s.token);return state.joueurs.find(p=>p.id===s.id);},
    refreshCharacter(user) { for(const service of [tavern,hangar,stadium,stadiums.axis,stadiums.gehenna,city,skies,...towers])service?.refreshCharacter(user); },
    duelCaptureFor(user,captureId){const completed=captureId&&completedCaptures.get(captureId);if(completed?.actors.includes(user)&&now()-completed.at<600000)return completed;const id=captureId?[...duels].find(([,d])=>d.result?.captureId===captureId&&d.players.includes(user))?.[0]:assignments.get(user),duel=duels.get(id);return duel?.players.includes(user)&&duel.result&&now()-duel.result.at<600000?{id,...duel.result,actors:duel.players}:null;},
    matchFor(user) { const target=destination(user),id=target.match?.replace(/^watch:/,'');const d=duels.get(id);return isArena(target.map)&&d?.players.every(p=>d.accepted?.includes(p))?id:null; },
    setDuelThread(id,thread) { const d=duels.get(id);if(d){d.thread=thread;persist();} },
    rematchOpponent(id,user){const d=duels.get(id);if(!d?.result||!d.players.includes(user))throw new ActivityError("Revanche indisponible.",403);const name=d.names[1-d.players.indexOf(user)];closeDuel(id);persist();return name;},
    duelStatus(id,user) {const d=duels.get(id);return d?.players.includes(user)?{accepted:d.accepted?.includes(user)??false}:null;},
    // in a started duel that is not over: the only case that keeps someone from training, the queue or a new challenge
    busyInDuel(user) { prune(); const duel=duels.get(assignments.get(user)); return isReady(duel)&&!duel.result; },
    // a finished duel, or a challenge nobody accepted yet, gives way to whatever the player asks for next
    leaveStaleDuel(user) { const duel=duels.get(assignments.get(user)); if(duel&&(duel.result||!isReady(duel))){ release(user); persist(); } },
    // fighters of a started duel who have not reached it a while after it began, each named once (to send them the way in)
    duelLatecomers(after=20000) { prune(); const late=[]; for(const [id,duel] of duels) if(isReady(duel)&&!duel.result&&now()-(duel.readyAt??0)>after) for(const user of duel.players) if(!duel.arrived?.[user]&&!duel.reminded?.[user]){ (duel.reminded??={})[user]=true; late.push({id,user}); } if(late.length)persist(); return late; },
    markReminded(id,user) { const duel=duels.get(id); if(duel){ (duel.reminded??={})[user]=true; persist(); } },
    isConnected(user) { const session=sessions.get(active.get(user));return !!session && session.expires>now() && now()-(session.seen??-Infinity)<15000; },
    findDuel(players, channel) {
      prune();
      for (const [id, duel] of duels) {
        if(duel.result)continue;
        if(duel.players.every(user=>duel.accepted?.includes(user))&&!duel.players.some(user=>assignments.get(user)===id))continue;
        if (duel.players.length === players.length && players.every(user => duel.players.includes(user) && (!assignments.has(user) || assignments.get(user) === id)))
          return { id, players: [...duel.players], expires: duel.expires };
      }
      return null;
    },
    prepareDuel(user, opponent) {
      prune();
      // a finished duel, or one whose fighter has closed the activity, no longer keeps the opponent busy
      const theirs=duels.get(assignments.get(opponent));
      if(theirs&&(theirs.result||!this.isConnected(opponent)))release(opponent);
      if (assignments.has(opponent)) throw new ActivityError("Le personnage ciblé est déjà dans un duel actif.");
      huntGame?.leave(user); spectators.delete(user); release(user); persist();
    },
    createDuel({ id, channel, players, names = [] }) {
      prune(); if (!arena) throw new ActivityError("Arène indisponible.");
      for (const user of players) if (assignments.has(user)) throw new ActivityError("Un des personnages est déjà en duel.");
      duels.set(id,makeDuel({channel,players,names,venue:gehenna?['arena',...(axis?['axis']:[]),'gehenna'][Math.min(axis?2:1,Math.floor(random()*(axis?3:2)))]:axis&&random()<.5?'axis':'arena',accepted:[],expires:now()+30*60*1000})); persist();
    },
    joinDuel(id, user) {
      prune(); const duel=duels.get(id);
      if (!duel || !duel.players.includes(user)) throw new ActivityError("Invitation expirée ou inaccessible.",403);
      if (assignments.get(user) !== id) { release(user); stadiumOf(duel).resetPlayer(user); }
      huntGame?.leave(user); spectators.delete(user);
      assignments.set(user,id); locations.set(user,"arena"); lastSeen.set(user,now()); persist();
    },
    acceptDuel(id,user) { prune();const duel=duels.get(id); if (!duel?.players.includes(user)) throw new ActivityError("Invitation inaccessible.",403); duel.accepted??=[]; if (!duel.accepted.includes(user)) duel.accepted.push(user); const ready=duel.players.every(p=>duel.accepted.includes(p));if(ready&&duel.startsAt===undefined){stadiumOf(duel).resetBalls("map:"+venueOf(duel)+":"+id);duel.startsAt=now()+500;duel.readyAt=duel.startsAt+(venueConfig(duel).introDuration??0);}persist(); return ready; },
    validateSpectate(id) { prune();const duel=duels.get(id);if(!duel||!duel.players.every(p=>duel.accepted?.includes(p)))throw new ActivityError("Ce duel n'est pas disponible.",403); },
    spectateDuel(id,user) { prune(); const duel=duels.get(id); if (!duel||!duel.players.every(p=>duel.accepted?.includes(p))) throw new ActivityError("Ce duel n'est pas disponible.",403);
      if (duel.players.includes(user)) return;
      huntGame?.leave(user); release(user); spectators.set(user,id); stadiumOf(duel).resetPlayer(user); locations.set(user,"arena"); persist();
    },
    createHunt(user,duration) { if(!city||!huntGame)throw new ActivityError("Rolent indisponible.");return huntGame.create(user,duration); },
    cancelHunt(id,user) { huntGame.cancel(id,user); },
    validateJoinHunt(id,user) { huntGame.validateJoin(id,user); },
    huntSummary() { return huntGame?.summary(); },
    startHunt(id,user) { return huntGame.start(id,user); },
    joinHunt(id,user,character) { const existing=locations.get(user)==="rolent"&&sessions.get(active.get(user))?.match===id; huntGame.join(id,user,character); if(!existing){ release(user); spectators.delete(user); city.resetPlayer(user); locations.set(user,"rolent");persist(); } },
    cancelDuel(id) { closeDuel(id); persist(); },
    leaveDuel(user,cancel=true) { huntGame?.leave(user); spectators.delete(user); release(user,true,cancel); persist(); },
    captureMessage(message) {
      const target = destination(message.author), session = sessions.get(active.get(message.author));
      if (!session || session.key !== target.key) return false;
      const duelChannel = duels.get(assignments.get(message.author))?.channel;
      if (!message.direct && !sources.get(message.author)?.has(message.channel) && duelChannel !== message.channel && duels.get(this.matchFor(message.author))?.thread !== message.channel) return false;
      return target.service.captureMessage({ ...message, channel: target.channel });
    },
    async join({id,channel}) {
      if (assignments.has(id)) lastSeen.set(id,now());
      const old=sessions.get(active.get(id)); if (old) old.service.leave(old.token,true);
      const target=destination(id), result=await target.service.join({id,channel:target.channel});
      const token=randomBytes(32).toString("hex");
      active.set(id,token);
      if (!sources.has(id)) sources.set(id,new Set());
      sources.get(id).add(channel);
      sessions.set(token,{id,channel,key:target.key,match:target.match,service:target.service,token:result.activity_token,seen:now(),expires:now()+2*60*60*1000});
      return {...sanitize(result),activity_token:token,map:target.map};
    },
    async state(token,point,after) {
      prune(); const session=sessions.get(token); if (!session) throw new ActivityError("Reconnectez-vous à l'activité.",401);
      if (active.get(session.id)!==token) throw new ActivityError("Activité ouverte dans une autre fenêtre.",409);
      session.seen=now();
      const trainingRequest=trainingRequests.get(session.id);if(trainingRequest&&(trainingRequest.expires<=now()||point?.trainingAck===trainingRequest.id))trainingRequests.delete(session.id);
      if (assignments.has(session.id)) lastSeen.set(session.id,now());
      { const id=assignments.get(session.id),duel=duels.get(id); if(duel&&session.key==="arena:"+id&&!duel.arrived?.[session.id]){ (duel.arrived??={})[session.id]=true; persist(); } }
      if (["leave_duel","leave_map"].includes(point?.action?.type)) { skies?.resetPlayer(session.id);huntGame?.leave(session.id); spectators.delete(session.id); release(session.id); persist(); }
      let boardingError;
      if(point?.action?.type==='hangar_enter'&&session.hangarAction!==point.action.id){
       if(!hangar||!['anterose'].includes(destination(session.id).map))boardingError='Passage indisponible.';
       else{const snapshot=await session.service.state(session.token),player=snapshot.joueurs.find(p=>p.id===session.id);if(!player||player.hp<=0||!require('../activity/airship-physics.cjs').airshipNearby(player,airship.config.door))boardingError='Approchez-vous de la porte arrière.';else{release(session.id);locations.set(session.id,'hangar');session.hangarAction=point.action.id;persist();}}
      }
      if(point?.action?.type==='flight_board'){
       if(session.boardedAction===point.action.id){}
       else if(!skies||destination(session.id).map!=='hangar')boardingError='Lynx indisponible.';
       else{const snapshot=await session.service.state(session.token),player=snapshot.joueurs.find(p=>p.id===session.id);
        if(!player||player.hp<=0||!require('../activity/airship-physics.cjs').airshipNearby(player,airship.config.lobby,6))boardingError='Approchez-vous du Lynx.';
        else{release(session.id);locations.set(session.id,'liberl');session.boardedAction=point.action.id;persist();}
       }
      }
      let towerError;
      if(point?.action?.type==='tower_step'&&session.key===destination(session.id).key){
       session.towerActions??=new Set();const floor=Number((locations.get(session.id)??'').slice(5)),levels=tower,services=towers,layout=levels[floor-1]?.layout;
       if(!session.towerActions.has(point.action.id)){
        const snapshot=await session.service.state(session.token),player=snapshot.joueurs.find(p=>p.id===session.id),up=point.action.target==='up',down=point.action.target==='down',gate=up?layout?.exit:layout?.start,next=floor+(up?1:-1);
        if(!layout||(!up&&!down)||!services[next-1]||!player||player.hp<=0||Math.hypot(player.x-gate.x,player.z-gate.z)>2.2||Math.abs(player.y-gate.y)>1.2)towerError='Approchez-vous du passage.';
        else{session.towerActions.add(point.action.id);if(session.towerActions.size>128)session.towerActions.delete(session.towerActions.values().next().value);this.enterTower(session.id,next,up?levels[next-1].layout.start:levels[next-1].layout.exit);}
       }
      }
      const target=destination(session.id); let changed=false;
      if (session.key!==target.key || session.match!==target.match) {
        session.service.leave(session.token);
        const joined=await target.service.join({id:session.id,channel:target.channel});
        Object.assign(session,{key:target.key,match:target.match,service:target.service,token:joined.activity_token}); changed=true;
      }
      const searching=target.map==="rolent" && point?.action?.type==="hunt_find";
      if(point?.action?.type==='attack'&&point.action.target){const original=String(point.action.target).startsWith('world:enemy:')?point.action.target:[...aliases].find(([,value])=>value===point.action.target)?.[0];point={...point,action:{...point.action,target:original??'invalid'}};}
      const result=await session.service.state(session.token,changed||point?.passive?undefined:(searching||['tower_step','flight_board','hangar_enter'].includes(point?.action?.type))?(Number.isFinite(point?.x)?{...point,action:undefined}:undefined):point,changed?undefined:after);
      if (target.map==="rolent" && huntGame) {
        if(searching&&!changed) {
          const original=[...aliases].find(([,value])=>value===point.action.target)?.[0];
          const answer=huntGame.find(session.id,{...point.action,target:point.action.target ? original ?? "invalid" : undefined},result.joueurs,rolent.geometry);
          result.actionResult={id:point.action.id,error:answer.error};
          result.notice=answer.text;
        }
        result.game=huntGame.status(session.id);
        result.joueurs=huntGame.render(result.joueurs,session.id);
        if(result.game.role==="hunter" && result.game.phase==="preparation") result.messages=result.messages.filter(m=>m.author===session.id);
        result.health={...result.health,...huntGame.policy(session.id)};
      }
      let team;
      if(target.map.startsWith('tower')){
       const own=result.joueurs.find(p=>p.id===session.id);if(own)towerTeam.set(session.id,{id:alias(session.id),character:own.character,hp:own.hp,maxHp:own.maxHp??500,floor:Number(target.map.slice(5)),seen:now()});
       team=[...towerTeam].filter(([id,p])=>locations.get(id)?.startsWith('tower')&&now()-p.seen<20000).map(([,p])=>{const {seen,...member}=p;return member;});
      }
      const duelId=target.match?.replace(/^watch:/,""),duel=duels.get(duelId);
      if(duel?.result)publishResult(duelId,duel);
      const introduction=isArena(target.map)&&duel&&(venueConfig(duel).introDuration||duel.result)&&duel.startsAt!==undefined?{id:duelId,venue:venueOf(duel),startsAt:duel.startsAt,readyAt:duel.readyAt,players:duel.players.map(alias),names:duel.names??[],titles:duel.players.map((user,i)=>require('./characters').characterTitle(duel.names?.[i]??result.joueurs.find(p=>p.id===user)?.character)),phrases:(duel.names??[]).map((name,i)=>require('./characters').characterEntrance(name,duel.names[1-i])),streaks:duel.players.map(getArenaStreak),result:duel.result?{winner:alias(duel.result.winner),loser:alias(duel.result.loser),winnerName:duel.result.winnerName,loserName:duel.result.loserName,at:duel.result.at,point:duel.result.point,action:duel.result.action,captureId:duel.result.captureId}:null}:null;
      if(isArena(target.map))trainingRequests.delete(session.id);
      return {...sanitize(result),trainingRequest:trainingRequests.get(session.id)?.id,trainingMode:trainingRequests.get(session.id)?.mode,team,duel:introduction,map:target.map,sceneKey:target.key,relocated:changed,ownId:alias(session.id),
        actionResult:boardingError?{id:point.action.id,error:boardingError}:['flight_board','hangar_enter'].includes(point?.action?.type)?{id:point.action.id}:towerError?{id:point.action.id,error:towerError}:point?.action?.type==="tower_step"?{id:point.action.id}:changed && point?.action ? {id:point.action.id} : result.actionResult};
    },
  };
}
module.exports={createActivityLobby};
