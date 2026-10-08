const { randomBytes } = require("node:crypto");
const { createActivityService, ActivityError } = require("./activityService");
// Real Discord IDs stay inside the server. Every scene exposes random avatar IDs.
function createActivityLobby({ arena, store = null, worldStores = {}, now = Date.now, ...options }) {
  const sessions = new Map(), duels = new Map(), assignments = new Map();
  const active = new Map(), lastSeen = new Map();
  const presenceGrace = 2 * 60 * 1000;
  const sources = new Map(), locations = new Map();
  const tavern = createActivityService({ ...options, now, persistent: true, store: worldStores.anterose });
  const stadium = arena && createActivityService({ ...options, ...arena, now, persistent: true, store: worldStores.arena,
    spawnFor: user => arena.spawns?.[duels.get(assignments.get(user))?.players.indexOf(user) ?? 0] ?? arena.grid.spawn });
  const makeDuel = data => data;
  const saved=store?.load();
  for (const [id,data] of saved?.duels ?? []) if (data.expires>now()) duels.set(id,makeDuel(data));
  for (const [user,id] of saved?.assignments ?? []) if (duels.has(id)) { assignments.set(user,id); lastSeen.set(user,now()); }
  for (const [user,map] of saved?.locations ?? []) if (["arena","anterose"].includes(map)) locations.set(user,map);
  for (const [user] of assignments) if (!locations.has(user)) locations.set(user,"arena");
  const persist=()=>store?.save({locations:[...locations],duels:[...duels].map(([id,{service,...data}])=>[id,data]),assignments:[...assignments]});
  const aliases = new Map();
  const alias = id => {
    if (!id || String(id).startsWith("npc:") || String(id).startsWith("world:")) return id;
    if (!aliases.has(id)) aliases.set(id, "avatar:" + randomBytes(12).toString("hex"));
    return aliases.get(id);
  };
  function release(user, returnHome = true) {
    if (returnHome) locations.set(user,"anterose");
    assignments.delete(user); lastSeen.delete(user);
    if (returnHome) for (const session of sessions.values()) if (session.id === user && session.key === "arena") session.service.leave(session.token);
  }
  function prune() {
    let changed = false;
    for (const [user] of assignments) if (now() - (lastSeen.get(user) ?? 0) > presenceGrace) { release(user,false); changed = true; }
    for (const [id, duel] of duels) if (duel.expires < now()) {
      for (const [user, match] of assignments) if (match === id) release(user,false); duels.delete(id); changed = true;
    }
    for (const [token, s] of sessions) if (s.expires < now()) sessions.delete(token);
    if (changed) persist();
  }
  function destination(user) {
    prune(); const id = assignments.get(user), duel = duels.get(id);
    return stadium && locations.get(user) === "arena" ? { key:"arena", service:stadium, map:"arena", channel:"map:arena", match:duel ? id : null } : { key:"tavern", service:tavern, map:"anterose", channel:"map:anterose", match:null };
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
      if (assignments.get(user) !== id) { release(user); stadium.resetPlayer(user); }
      assignments.set(user,id); locations.set(user,"arena"); lastSeen.set(user,now()); persist();
    },
    cancelDuel(id) { for (const [user, match] of assignments) if (match===id) release(user); duels.delete(id); persist(); },
    leaveDuel(user) { release(user); persist(); },
    captureMessage(message) {
      const target = destination(message.author), session = sessions.get(active.get(message.author));
      if (!session || session.key !== target.key) return false;
      const duelChannel = duels.get(assignments.get(message.author))?.channel;
      if (!message.direct && !sources.get(message.author)?.has(message.channel) && duelChannel !== message.channel) return false;
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
      sessions.set(token,{id,channel,key:target.key,match:target.match,service:target.service,token:result.activity_token,expires:now()+2*60*60*1000});
      return {...sanitize(result),activity_token:token,map:target.map};
    },
    async state(token,point,after) {
      prune(); const session=sessions.get(token); if (!session) throw new ActivityError("Reconnectez-vous à l'activité.",401);
      if (active.get(session.id)!==token) throw new ActivityError("Activité ouverte dans une autre fenêtre.",409);
      if (assignments.has(session.id)) lastSeen.set(session.id,now());
      if (point?.action?.type==="leave_duel") { release(session.id); persist(); }
      const target=destination(session.id); let changed=false;
      if (session.key!==target.key || session.match!==target.match) {
        session.service.leave(session.token);
        const joined=await target.service.join({id:session.id,channel:target.channel});
        Object.assign(session,{key:target.key,match:target.match,service:target.service,token:joined.activity_token}); changed=true;
      }
      const result=await session.service.state(session.token,changed?undefined:point,changed?undefined:after);
      return {...sanitize(result),map:target.map,sceneKey:target.key,relocated:changed,ownId:alias(session.id),
        actionResult:changed && point?.action ? {id:point.action.id} : result.actionResult};
    },
  };
}
module.exports={createActivityLobby};
