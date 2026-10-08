const { randomBytes } = require("node:crypto");
const { createActivityService, ActivityError } = require("./activityService");
// Real Discord IDs stay inside the server. Every scene exposes random avatar IDs.
function createActivityLobby({ arena, store = null, now = Date.now, ...options }) {
  const tavern = createActivityService({ ...options, now });
  const sessions = new Map(), duels = new Map(), assignments = new Map();
  const active = new Map();
  const makeDuel = data => ({...data,service:createActivityService({...options,...arena,now,spawnFor:user=>arena.spawns?.[data.players.indexOf(user)]??arena.grid.spawn})});
  const saved=store?.load();
  for (const [id,data] of saved?.duels ?? []) if (data.expires>now()) duels.set(id,makeDuel(data));
  for (const [user,id] of saved?.assignments ?? []) if (duels.has(id)) assignments.set(user,id);
  const persist=()=>store?.save({duels:[...duels].map(([id,{service,...data}])=>[id,data]),assignments:[...assignments]});
  const aliases = new Map();
  const alias = id => {
    if (!id || String(id).startsWith("npc:") || String(id).startsWith("world:")) return id;
    if (!aliases.has(id)) aliases.set(id, "avatar:" + randomBytes(12).toString("hex"));
    return aliases.get(id);
  };
  function prune() {
    for (const [id, duel] of duels) if (duel.expires < now()) {
      duels.delete(id); for (const [user, match] of assignments) if (match === id) assignments.delete(user);
    }
    for (const [token, s] of sessions) if (s.expires < now()) sessions.delete(token);
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
    createDuel({ id, channel, players }) {
      prune(); if (!arena) throw new ActivityError("Arène indisponible.");
      for (const user of players) if (assignments.has(user)) throw new ActivityError("Un des personnages est déjà en duel.");
      duels.set(id,makeDuel({channel,players,expires:now()+30*60*1000})); persist();
    },
    joinDuel(id, user) {
      prune(); const duel=duels.get(id);
      if (!duel || !duel.players.includes(user)) throw new ActivityError("Invitation expirée ou inaccessible.",403);
      if (assignments.has(user) && assignments.get(user)!==id) throw new ActivityError("Vous êtes déjà en duel.");
      assignments.set(user,id); persist();
    },
    cancelDuel(id) { duels.delete(id); for (const [user, match] of assignments) if (match===id) assignments.delete(user); persist(); },
    leaveDuel(user) { assignments.delete(user); persist(); },
    captureMessage(message) {
      const target=destination(message.author);
      if (target.map==="arena") {
        if (duels.get(target.key).channel !== message.channel) return false;
        return target.service.captureMessage({...message,channel:target.channel});
      }
      return tavern.captureMessage(message);
    },
    async join({id,channel}) {
      const old=sessions.get(active.get(id)); if (old) old.service.leave(old.token,true);
      const target=destination(id), result=await target.service.join({id,channel:target.channel??channel});
      const token=randomBytes(32).toString("hex");
      active.set(id,token);
      sessions.set(token,{id,channel,key:target.key,service:target.service,token:result.activity_token,expires:now()+2*60*60*1000});
      return {...sanitize(result),activity_token:token,map:target.map};
    },
    async state(token,point,after) {
      prune(); const session=sessions.get(token); if (!session) throw new ActivityError("Reconnectez-vous à l'activité.",401);
      if (active.get(session.id)!==token) throw new ActivityError("Activité ouverte dans une autre fenêtre.",409);
      if (point?.action?.type==="leave_duel") { assignments.delete(session.id); persist(); }
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
