const { randomBytes } = require("node:crypto");
const { createActivityService, ActivityError } = require("./activityService");
// Real Discord IDs stay inside the server. Every scene exposes random avatar IDs.
function createActivityLobby({ arena, store = null, now = Date.now, ...options }) {
  const tavern = createActivityService({ ...options, now });
  const sessions = new Map(), duels = new Map(), assignments = new Map();
  const active = new Map(), lastSeen = new Map();
  const presenceGrace = 2 * 60 * 1000;
  const makeDuel = data => ({...data,service:createActivityService({...options,...arena,now,spawnFor:user=>arena.spawns?.[data.players.indexOf(user)]??arena.grid.spawn})});
  const saved=store?.load();
  for (const [id,data] of saved?.duels ?? []) if (data.expires>now()) duels.set(id,makeDuel(data));
  for (const [user,id] of saved?.assignments ?? []) if (duels.has(id)) { assignments.set(user,id); lastSeen.set(user,now()); }
  const persist=()=>store?.save({duels:[...duels].map(([id,{service,...data}])=>[id,data]),assignments:[...assignments]});
  const aliases = new Map();
  const alias = id => {
    if (!id || String(id).startsWith("npc:") || String(id).startsWith("world:")) return id;
    if (!aliases.has(id)) aliases.set(id, "avatar:" + randomBytes(12).toString("hex"));
    return aliases.get(id);
  };
  function release(user) {
    const match = assignments.get(user);
    const home = duels.get(match)?.channel;
    // A duel opens in DMs but belongs to the channel where it was challenged.
    if (home) for (const session of sessions.values()) if (session.id === user) { session.channel = home; session.homeChannel = home; }
    assignments.delete(user); lastSeen.delete(user);
    for (const session of sessions.values()) if (session.id === user && session.key === match) session.service.leave(session.token);
  }
  function prune() {
    let changed = false;
    for (const [user] of assignments) if (now() - (lastSeen.get(user) ?? 0) > presenceGrace) { release(user); changed = true; }
    for (const [id, duel] of duels) if (duel.expires < now()) {
      for (const [user, match] of assignments) if (match === id) release(user); duels.delete(id); changed = true;
    }
    for (const [token, s] of sessions) if (s.expires < now()) sessions.delete(token);
    if (changed) persist();
  }
  function destination(user) {
    prune(); const id = assignments.get(user), duel = duels.get(id);
    return duel ? { key:id, service:duel.service, map:"arena", channel:id } : { key:"tavern", service:tavern, map:"anterose" };
  }
  function sanitize(result) {
    const pom = p => p && ({ ...p, owner: alias(p.owner), thrownBy: alias(p.thrownBy) });
    return { ...result, player:result.player && {...result.player,id:alias(result.player.id)},
      joueurs:result.joueurs?.map(p=>({...p,id:alias(p.id)})),
      messages:result.messages?.map(m=>({...m,id:alias(m.id),author:alias(m.author)})),
      pom:pom(result.pom), poms:result.poms?.map(pom) };
  }
  return {
    findDuel(players, channel) {
      prune();
      for (const [id, duel] of duels) {
        if (duel.players.length === players.length && players.every(user => duel.players.includes(user) && (!assignments.has(user) || assignments.get(user) === id)))
          return { id, players: [...duel.players], expires: duel.expires };
      }
      return null;
    },
    prepareDuel(user, opponent) {
      prune();
      if (assignments.has(opponent)) throw new ActivityError("Le personnage ciblé est déjà dans un duel actif.");
      release(user); persist();
    },
    createDuel({ id, channel, players }) {
      prune(); if (!arena) throw new ActivityError("Arène indisponible.");
      for (const user of players) if (assignments.has(user)) throw new ActivityError("Un des personnages est déjà en duel.");
      duels.set(id,makeDuel({channel,players,expires:now()+30*60*1000})); persist();
    },
    joinDuel(id, user) {
      prune(); const duel=duels.get(id);
      if (!duel || !duel.players.includes(user)) throw new ActivityError("Invitation expirée ou inaccessible.",403);
      if (assignments.get(user) !== id) release(user);
      assignments.set(user,id); lastSeen.set(user,now()); persist();
    },
    cancelDuel(id) { for (const [user, match] of assignments) if (match===id) release(user); duels.delete(id); persist(); },
    leaveDuel(user) { release(user); persist(); },
    captureMessage(message) {
      const target=destination(message.author);
      if (target.map==="arena") {
        if (duels.get(target.key).channel !== message.channel) return false;
        return target.service.captureMessage({...message,channel:target.channel});
      }
      return tavern.captureMessage(message);
    },
    async join({id,channel}) {
      prune();
      if (assignments.has(id)) lastSeen.set(id,now());
      const old=sessions.get(active.get(id)); if (old) old.service.leave(old.token,true);
      const target=destination(id), result=await target.service.join({id,channel:target.channel??old?.homeChannel??channel});
      const token=randomBytes(32).toString("hex");
      active.set(id,token);
      sessions.set(token,{id,channel:target.map === "arena" ? duels.get(target.key).channel : (old?.homeChannel ?? channel),homeChannel:old?.homeChannel,key:target.key,service:target.service,token:result.activity_token,expires:now()+2*60*60*1000});
      return {...sanitize(result),activity_token:token,map:target.map};
    },
    async state(token,point,after) {
      prune(); const session=sessions.get(token); if (!session) throw new ActivityError("Reconnectez-vous à l'activité.",401);
      if (active.get(session.id)!==token) throw new ActivityError("Activité ouverte dans une autre fenêtre.",409);
      if (assignments.has(session.id)) lastSeen.set(session.id,now());
      if (point?.action?.type==="leave_duel") { release(session.id); persist(); }
      const target=destination(session.id); let changed=false;
      if (session.key!==target.key) {
        session.service.leave(session.token);
        const joined=await target.service.join({id:session.id,channel:target.channel??session.channel});
        Object.assign(session,{key:target.key,service:target.service,token:joined.activity_token}); changed=true;
      }
      const result=await session.service.state(session.token,changed?undefined:point,changed?undefined:after);
      return {...sanitize(result),map:target.map,sceneKey:target.key,ownId:alias(session.id),
        actionResult:changed && point?.action ? {id:point.action.id} : result.actionResult};
    },
  };
}
module.exports={createActivityLobby};
