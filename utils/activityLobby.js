const { randomBytes } = require("node:crypto");
const { createActivityService, ActivityError } = require("./activityService");
// Real Discord IDs stay inside the server. Every scene exposes random avatar IDs.
function createActivityLobby({ arena, tower = [], rolent = null, huntGame = null, store = null, worldStores = {}, onDuelEnd = async()=>{}, now = Date.now, ...options }) {
  const sessions = new Map(), duels = new Map(), assignments = new Map();
  const active = new Map(), lastSeen = new Map();
  const presenceGrace = 2 * 60 * 1000;
  const sources = new Map(), locations = new Map(), spectators = new Map();
  const tavern = createActivityService({ ...options, onSay:event=>options.onSay?.({...event,map:"anterose"}), now, persistent: true, store: worldStores.anterose });
  const stadium = arena && createActivityService({ ...options, ...arena, now, persistent: true, store: worldStores.arena,
    spawnFor: user => spectators.has(user) ? (arena.spectatorGrid?.spawn ?? arena.grid.spawn) : arena.spawns?.[duels.get(assignments.get(user))?.players.indexOf(user) ?? 0] ?? arena.grid.spawn,
    onDefeat: finishDuel,
    onSay:event=>options.onSay?.({...event,map:"arena"}),
    navigationFor: user => spectators.has(user) ? (arena.spectatorGrid ?? arena.grid) : arena.grid,
    playerPolicy: user => {const duel=duels.get(assignments.get(user)),protectedNow=!!arena.introDuration&&!!duel&&(duel.readyAt===undefined||now()<duel.readyAt);const ended=!!duel?.result;return {spectator:spectators.has(user),canMove:!protectedNow&&!ended,duelProtected:protectedNow||ended,duelFinished:ended,noRespawn:ended,...(ended&&duel.result.loser===user?{hp:0,deadUntil:duel.result.at+10000}:{})};} });
  const city = rolent && createActivityService({ ...options,...rolent,now,persistent:true,store:worldStores.rolent,
    onSay:event=>options.onSay?.({...event,map:"rolent"}),
    playerPolicy:user=>huntGame?.policy(user)??{} });
  const towerArrivals=new Map(),towerTeam=new Map();
  const towers=tower.map((floor,i)=>createActivityService({...options,...floor,dungeon:floor.layout,now,persistent:true,store:worldStores['tower'+(i+1)],combatEnabled:true,canDamage:(_actor,target)=>target.enemy===true,onDrink:null,onCraft:()=>{},residents:{npcs:[],disablePoms:true},spawnFor:user=>towerArrivals.get(user)??floor.grid.spawn,onSay:event=>options.onSay?.({...event,map:'tower'+(i+1)})}));
  const makeDuel = data => {if(data.startsAt===undefined&&data.players.every(p=>data.accepted?.includes(p))){data.readyAt=now();data.startsAt=now()-(arena?.introDuration??0);}return data;};
  const saved=store?.load();
  for (const [id,data] of saved?.duels ?? []) if (data.expires>now()) duels.set(id,makeDuel(data));
  for (const [user,id] of saved?.assignments ?? []) if (duels.has(id)) { assignments.set(user,id); lastSeen.set(user,now()); }
  for (const [user,map] of saved?.locations ?? []) if (["arena","anterose","rolent",...towers.map((_,i)=>"tower"+(i+1))].includes(map)) locations.set(user,map);
  for (const [user] of assignments) if (!locations.has(user)) locations.set(user,"arena");
  for (const [user,id] of saved?.spectators ?? []) spectators.set(user,id);
  const persist=()=>store?.save({spectators:[...spectators],locations:[...locations],duels:[...duels].map(([id,{service,...data}])=>[id,data]),assignments:[...assignments]});
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
  function release(user, returnHome = true) {
    if (returnHome) locations.set(user,"anterose");
    assignments.delete(user); lastSeen.delete(user);
    if (returnHome) for (const session of sessions.values()) if (session.id === user && session.key !== "tavern") session.service.leave(session.token);
  }
  function prune() {
    let changed = false;
    for (const [user] of assignments) if (now() - (lastSeen.get(user) ?? 0) > presenceGrace) { release(user,false); changed = true; }
    for (const [id, duel] of duels) if (duel.expires < now()) {
      for (const [user, match] of assignments) if (match === id) release(user,false); duels.delete(id);resultAttempts.delete(id); changed = true;
    }
    for (const [token, s] of sessions) if (s.expires < now()) sessions.delete(token);
    if (changed) persist();
  }
  function destination(user) {
    prune(); const id = assignments.get(user), duel = duels.get(id);
    const floor=/^tower([1-4])$/.exec(locations.get(user)??"");if(floor&&towers[Number(floor[1])-1]){const map="tower"+floor[1];return {key:map,service:towers[Number(floor[1])-1],map,channel:"map:"+map,match:null};}
    if (city && locations.get(user) === "rolent") return {key:"rolent",service:city,map:"rolent",channel:"map:rolent",match:huntGame?.summary()?.id??null};
    return stadium && locations.get(user) === "arena" ? { key:"arena", service:stadium, map:"arena", channel:"map:arena", match:spectators.has(user) ? "watch:"+spectators.get(user) : duel ? id : null } : { key:"tavern", service:tavern, map:"anterose", channel:"map:anterose", match:null };
  }
  function sanitize(result) {
    const pom = p => p && ({ ...p, owner: alias(p.owner), thrownBy: alias(p.thrownBy) });
    return { ...result, player:result.player && {...result.player,id:alias(result.player.id)},
      joueurs:result.joueurs?.map(p=>({...p,id:alias(p.id)})),
      messages:result.messages?.map(m=>({...m,id:alias(m.id),author:alias(m.author)})),
      pom:pom(result.pom), poms:result.poms?.map(pom),
      combat:result.combat && {...result.combat,attacks:result.combat.attacks.map(a=>({...a,actor:alias(a.actor),target:alias(a.target),hits:a.hits.map(h=>({...h,id:alias(h.id)}))}))} };
  }
  return {
    enterTower(user,floor=1,arrival=null){if(!Number.isInteger(floor)||!towers[floor-1])throw new ActivityError('Etage indisponible.',400);release(user);huntGame?.leave(user);spectators.delete(user);towers[floor-1].resetPlayer(user);towerArrivals.set(user,arrival??tower[floor-1].grid.spawn);locations.set(user,'tower'+floor);persist();},
    identity(token) {prune();const s=sessions.get(token);if(!s)throw new ActivityError("Reconnectez-vous.",401);if(active.get(s.id)!==token)throw new ActivityError("Activit\u00e9 ouverte ailleurs.",409);return {id:s.id,channel:s.channel,map:destination(s.id).map};},
    async terminalPosition(token) {this.identity(token);const s=sessions.get(token);if(!s)throw new ActivityError("Reconnectez-vous.",401);const target=destination(s.id);if(target.key!==s.key)throw new ActivityError("D\u00e9placement en cours.",409);const state=await s.service.state(s.token);return state.joueurs.find(p=>p.id===s.id);},
    refreshCharacter(user) { for(const service of [tavern,stadium,city,...towers])service?.refreshCharacter(user); },
    duelCaptureFor(user){const id=assignments.get(user),duel=duels.get(id);return duel?.result&&now()-duel.result.at<60000?{id,...duel.result,actors:duel.players}:null;},
    matchFor(user) { const target=destination(user),id=target.match?.replace(/^watch:/,'');const d=duels.get(id);return target.map==='arena'&&d?.players.every(p=>d.accepted?.includes(p))?id:null; },
    setDuelThread(id,thread) { const d=duels.get(id);if(d){d.thread=thread;persist();} },
    duelStatus(id,user) {const d=duels.get(id);return d?.players.includes(user)?{accepted:d.accepted?.includes(user)??false}:null;},
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
      if(duels.get(assignments.get(opponent))?.result)release(opponent);
      if (assignments.has(opponent)) throw new ActivityError("Le personnage ciblé est déjà dans un duel actif.");
      huntGame?.leave(user); spectators.delete(user); release(user); persist();
    },
    createDuel({ id, channel, players, names = [] }) {
      prune(); if (!arena) throw new ActivityError("Arène indisponible.");
      for (const user of players) if (assignments.has(user)) throw new ActivityError("Un des personnages est déjà en duel.");
      duels.set(id,makeDuel({channel,players,names,accepted:[],expires:now()+30*60*1000})); persist();
    },
    joinDuel(id, user) {
      prune(); const duel=duels.get(id);
      if (!duel || !duel.players.includes(user)) throw new ActivityError("Invitation expirée ou inaccessible.",403);
      if (assignments.get(user) !== id) { release(user); stadium.resetPlayer(user); }
      huntGame?.leave(user); spectators.delete(user);
      assignments.set(user,id); locations.set(user,"arena"); lastSeen.set(user,now()); persist();
    },
    acceptDuel(id,user) { const duel=duels.get(id); if (!duel?.players.includes(user)) throw new ActivityError("Invitation inaccessible.",403); duel.accepted??=[]; if (!duel.accepted.includes(user)) duel.accepted.push(user); const ready=duel.players.every(p=>duel.accepted.includes(p));if(ready&&duel.startsAt===undefined){duel.startsAt=now()+500;duel.readyAt=duel.startsAt+(arena.introDuration??0);}persist(); return ready; },
    validateSpectate(id) { prune();const duel=duels.get(id);if(!duel||!duel.players.every(p=>duel.accepted?.includes(p)))throw new ActivityError("Ce duel n'est pas disponible.",403); },
    spectateDuel(id,user) { prune(); const duel=duels.get(id); if (!duel||!duel.players.every(p=>duel.accepted?.includes(p))) throw new ActivityError("Ce duel n'est pas disponible.",403);
      if (duel.players.includes(user)) return;
      huntGame?.leave(user); release(user); spectators.set(user,id); stadium.resetPlayer(user); locations.set(user,"arena"); persist();
    },
    createHunt(user,duration) { if(!city||!huntGame)throw new ActivityError("Rolent indisponible.");return huntGame.create(user,duration); },
    cancelHunt(id,user) { huntGame.cancel(id,user); },
    validateJoinHunt(id,user) { huntGame.validateJoin(id,user); },
    huntSummary() { return huntGame?.summary(); },
    startHunt(id,user) { return huntGame.start(id,user); },
    joinHunt(id,user,character) { const existing=locations.get(user)==="rolent"&&sessions.get(active.get(user))?.match===id; huntGame.join(id,user,character); if(!existing){ release(user); spectators.delete(user); city.resetPlayer(user); locations.set(user,"rolent");persist(); } },
    cancelDuel(id) { for (const [user, match] of assignments) if (match===id) release(user); duels.delete(id);resultAttempts.delete(id); persist(); },
    leaveDuel(user) { huntGame?.leave(user); spectators.delete(user); release(user); persist(); },
    captureMessage(message) {
      const target = destination(message.author), session = sessions.get(active.get(message.author));
      if (!session || session.key !== target.key) return false;
      const duelChannel = duels.get(assignments.get(message.author))?.channel;
      if (!message.direct && !sources.get(message.author)?.has(message.channel) && duelChannel !== message.channel && duels.get(this.matchFor(message.author))?.thread !== message.channel) return false;
      return target.service.captureMessage({ ...message, channel: target.channel });
    },
    async join({id,channel}) {
      prune();
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
      if (assignments.has(session.id)) lastSeen.set(session.id,now());
      if (["leave_duel","leave_map"].includes(point?.action?.type)) { huntGame?.leave(session.id); spectators.delete(session.id); release(session.id); persist(); }
      let towerError;
      if(point?.action?.type==='tower_step'){
       session.towerActions??=new Set();const floor=Number((locations.get(session.id)??'').slice(5)),layout=tower[floor-1]?.layout;
       if(!session.towerActions.has(point.action.id)){
        const snapshot=await session.service.state(session.token),player=snapshot.joueurs.find(p=>p.id===session.id),up=point.action.target==='up',down=point.action.target==='down',gate=up?layout?.exit:layout?.start,next=floor+(up?1:-1);
        if(!layout||(!up&&!down)||!towers[next-1]||!player||player.hp<=0||Math.hypot(player.x-gate.x,player.z-gate.z)>2.2||Math.abs(player.y-gate.y)>1.2)towerError='Approchez-vous du passage.';
        else{session.towerActions.add(point.action.id);if(session.towerActions.size>128)session.towerActions.delete(session.towerActions.values().next().value);this.enterTower(session.id,next,up?tower[next-1].layout.start:tower[next-1].layout.exit);}
       }
      }
      const target=destination(session.id); let changed=false;
      if (session.key!==target.key || session.match!==target.match) {
        session.service.leave(session.token);
        const joined=await target.service.join({id:session.id,channel:target.channel});
        Object.assign(session,{key:target.key,match:target.match,service:target.service,token:joined.activity_token}); changed=true;
      }
      const searching=target.map==="rolent" && point?.action?.type==="hunt_find";
      if(point?.action?.type==='attack'&&point.action.target){const original=[...aliases].find(([,value])=>value===point.action.target)?.[0];point={...point,action:{...point.action,target:original??'invalid'}};}
      const result=await session.service.state(session.token,changed?undefined:(searching||point?.action?.type==="tower_step")?{...point,action:undefined}:point,changed?undefined:after);
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
       const own=result.joueurs.find(p=>p.id===session.id);if(own)towerTeam.set(session.id,{id:alias(session.id),character:own.character,hp:own.hp,maxHp:100,floor:Number(target.map.slice(5)),seen:now()});
       team=[...towerTeam].filter(([id,p])=>locations.get(id)?.startsWith('tower')&&now()-p.seen<20000).map(([,p])=>{const {seen,...member}=p;return member;});
      }
      const duelId=target.match?.replace(/^watch:/,""),duel=duels.get(duelId);
      if(duel?.result)publishResult(duelId,duel);
      const introduction=target.map==="arena"&&duel&&(arena.introDuration||duel.result)&&duel.startsAt!==undefined?{id:duelId,startsAt:duel.startsAt,readyAt:duel.readyAt,players:duel.players.map(alias),names:duel.names??[],result:duel.result?{winner:alias(duel.result.winner),loser:alias(duel.result.loser),winnerName:duel.result.winnerName,loserName:duel.result.loserName,at:duel.result.at,point:duel.result.point,action:duel.result.action,captureId:duel.result.captureId}:null}:null;
      return {...sanitize(result),team,duel:introduction,map:target.map,sceneKey:target.key,relocated:changed,ownId:alias(session.id),
        actionResult:towerError?{id:point.action.id,error:towerError}:point?.action?.type==="tower_step"?{id:point.action.id}:changed && point?.action ? {id:point.action.id} : result.actionResult};
    },
  };
}
module.exports={createActivityLobby};
