const flight=require("../activity/flight.cjs");
const { randomBytes } = require("node:crypto");
const { createActivityWorld, MAX_HP } = require("./activityWorld");
class ActivityError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}
function createActivityService({
  grid,
  resolveCharacter,
  now = Date.now,
  residents = { npcs: [] },
  geometry = null,
  spawnFor = () => grid.spawn,
  persistent = false,
  store = null,
  navigationFor = () => grid,
  playerPolicy = () => ({}),
  combatEnabled = false,
  enemySpawns = [],
  canDamage = () => true,
  onSay = () => {},
  onDrink = null,
  onCraft = () => {},
  onDefeat = () => {},
}) {
  const saved = store?.load() ?? {};
  const remembered = new Map(saved.players ?? []);
  const worldStates = saved.worlds ?? {};
  let lastSave = -Infinity;
  let messageSequence = 0;
  const messageStreams = new Map();
  const worlds = new Map();
  const sessions = new Map(),
    rooms = new Map(),
    step = grid.step;
  const index = (x, z) => {
    const a = Math.round((x - grid.origin.x) / step),
      b = Math.round((z - grid.origin.z) / step);
    return a < 0 || b < 0 || a >= grid.width || b >= grid.height
      ? -1
      : b * grid.width + a;
  };
  const canWalk = (x, z) => {
    const i = index(x, z);
    return i >= 0 && grid.cells[i] !== null;
  };
  const spawn = grid.spawn;
  function save(force = false) {
    if (!store || (!force && now() - lastSave < 1000)) return;
    for (const room of rooms.values()) for (const [id, player] of room) remembered.set(id, { ...player });
    for (const [id, world] of worlds) worldStates[id] = world.snapshot();
    store.save({ players: [...remembered], worlds: worldStates });
    lastSave = now();
  }
  function prune() {
    const time = now();
    for (const [token, session] of sessions)
      if (session.expires <= time) sessions.delete(token);
    for (const [id, room] of rooms) {
      for (const [user, player] of room)
        if (time - player.seen > 15000) { if (persistent) remembered.set(user, { ...player }); worlds.get(id)?.depart(user,player); room.delete(user); }
      if (!room.size) {
        if (persistent) worlds.get(id)?.tick(room);
        else { rooms.delete(id); worlds.delete(id); }
        messageStreams.delete(id);
      } else if (messageStreams.has(id))
        messageStreams.set(
          id,
          messageStreams
            .get(id)
            .filter((message) => time - message.created < 30000),
        );
    }
  }
  async function refresh(session) {
    if (now() >= session.refreshAt) {
      session.character = await resolveCharacter(session.id);
      session.refreshAt = now() + 15000;
    }
  }
  function sessionFor(token) {
    prune();
    const session = sessions.get(token);
    if (!session)
      throw new ActivityError("Reconnectez-vous à l’activité.", 401);
    return session;
  }
  return {
    refreshCharacter(user) {for(const s of sessions.values())if(s.id===user)s.refreshAt=0;},
    captureMessage({
      id,
      channel,
      author,
      text,
      bot = false,
      webhook = false,
    }) {
      prune();
      if (bot || webhook || typeof text !== "string" || !text.trim() || !id)
        return false;
      const player = rooms.get(channel)?.get(author);
      if (!player) return false;
      const events = messageStreams.get(channel) ?? [];
      if (events.some((message) => message.id === id)) return false;
      events.push({
        id,
        author,
        character: player.character,
        text: Array.from(text.trim()).slice(0, 4000).join(""),
        sequence: ++messageSequence,
        created: now(),
      });
      messageStreams.set(channel, events.slice(-50));
      return true;
    },
    leave(token, keepPlayer = false) {
      const session = sessions.get(token); if (!session) return;
      const room = rooms.get(session.channel), player = room?.get(session.id);
      if (persistent && player) remembered.set(session.id, { ...player });
      if (!keepPlayer) { worlds.get(session.channel)?.depart(session.id,player); room?.delete(session.id); if (room) worlds.get(session.channel)?.tick(room); }
      sessions.delete(token); save(true);
    },
    resetPlayer(id) { remembered.delete(id); for (const [key,room] of rooms) { worlds.get(key)?.depart(id,room.get(id)); room.delete(id); } save(true); },
    async join({ id, channel }) {
      prune();
      const session = {
        id,
        channel,
        expires: now() + 2 * 60 * 60 * 1000,
        refreshAt: 0,
        messageStart: messageSequence,
        joinedAt: now(),
      };
      await refresh(session);
      const token = randomBytes(32).toString("hex");
      sessions.set(token, session);
      return {
        activity_token: token,
        messageCursor: messageSequence,
        character: session.character,
        player: {
          id,
          nom: session.character,
          character: session.character,
          ...(rooms.get(channel)?.get(id) ?? remembered.get(id) ?? spawnFor(id)),
          hp: (rooms.get(channel)?.get(id) ?? remembered.get(id))?.hp ?? MAX_HP,
          deadUntil: (rooms.get(channel)?.get(id) ?? remembered.get(id))?.deadUntil ?? 0,
          ...playerPolicy(id),
        },
      };
    },
    async state(token, point, after) {
      const session = sessionFor(token);
      await refresh(session);
      const walkingGrid = navigationFor(session.id) ?? grid, step = walkingGrid.step;
      const index = (x,z) => {
        const a=Math.round((x-walkingGrid.origin.x)/step),b=Math.round((z-walkingGrid.origin.z)/step);
        return a<0||b<0||a>=walkingGrid.width||b>=walkingGrid.height ? -1 : b*walkingGrid.width+a;
      };
      const canWalk=(x,z)=>{const i=index(x,z);return i>=0&&walkingGrid.cells[i]!==null;};
      let room = rooms.get(session.channel);
      if (!room) {
        room = new Map();
        rooms.set(session.channel, room);
      }
      let player = room.get(session.id);
      if (!player)
        player = {
          id: session.id,
          ...(session.playerState ?? remembered.get(session.id) ?? spawnFor(session.id)),
          seen: now() - 150,
          character: (session.playerState ?? remembered.get(session.id))?.character ?? session.character,
        };
      Object.assign(player,{spectator:false,canMove:true,duelProtected:false,duelFinished:false,noRespawn:false,prop:null},playerPolicy(session.id));
      const characterChanged=player.character!==session.character;
      if(characterChanged&&player.character==="Sieg")Object.assign(player,flight.landingPoint(walkingGrid,player));
      if(characterChanged)player.acceptedAt=now();
      if(session.character==="Sieg"&&!player.prop&&(characterChanged||player.y<flight.flightBounds(walkingGrid).minY))player.y=Math.max(player.y+.4,flight.flightBounds(walkingGrid).minY);
      player.character=session.character;
      let world = worlds.get(session.channel);
      if (!world) {
        world = createActivityWorld({ grid, ...residents, now, geometry, spawnFor, combatEnabled, enemySpawns, canDamage, onCraft, onDefeat, initialState: worldStates[session.channel] });
        worlds.set(session.channel, world);
      }
      room.set(session.id, player);
      player.acceptedAt ??= session.joinedAt;
      const previousRespawn = player.respawn ?? 0;
      for(const member of room.values())Object.assign(member,playerPolicy(member.id));
      world.tick(room);
      const justRespawned = (player.respawn ?? 0) !== previousRespawn;
      if (point && !characterChanged && player.hp > 0 && !justRespawned && player.canMove !== false && now() >= (player.combatLockedUntil ?? 0)) {
        const flying=session.character==="Sieg"&&!player.prop;
        const x = Number(point.x),
          z = Number(point.z),y=flying?Number(point.y):player.y;
        if(flying&&!Number.isFinite(y))throw new ActivityError("Altitude invalide.");
        if (!Number.isFinite(x) || !Number.isFinite(z))
          throw new ActivityError("Position invalide.");
        const allowance =
          Math.min(5, Math.max(0.15, (now() - (player.acceptedAt ?? player.seen)) / 1000)) * 4.5 +
          0.15;
        // Validate each travelled segment rather than the chord between polls.
        // Sequence numbers let a retry replay an already acknowledged prefix.
        let samples = [{ x, y, z }],
          lastSequence = session.movementSequence ?? 0;
        if (point.trace !== undefined) {
          if (!Array.isArray(point.trace) || point.trace.length > 1024)
            throw new ActivityError("Invalid movement trace.");
          let sequence = 0;
          for (const sample of point.trace) {
            if (
              !sample ||
              !Number.isFinite(sample.x) ||
              !Number.isFinite(sample.z) ||
              (flying&&!Number.isFinite(sample.y)) ||
              !Number.isSafeInteger(sample.sequence) ||
              sample.sequence <= sequence
            )
              throw new ActivityError("Invalid movement trace.");
            sequence = sample.sequence;
          }
          samples = point.trace.filter(
            (sample) => sample.sequence > lastSequence,
          );
          samples = [...samples, { x, y, z }];
          lastSequence = Math.max(lastSequence, sequence);
        }
        if(flying){
          const bounds=flight.flightBounds(walkingGrid);let valid=flight.insideFlight({x,y,z},bounds),travelled=0,from=player;
          for(const to of samples){travelled+=Math.hypot(to.x-from.x,to.y-from.y,to.z-from.z);if(!valid||travelled>allowance||!flight.insideFlight(to,bounds)||!flight.clearFlight(from,to,geometry)){valid=false;break;}from=to;}
          if(valid){session.movementSequence=lastSequence;player.acceptedAt=now();Object.assign(player,{x,y,z});}
        }else {
        let valid = canWalk(x, z),
          travelled = 0,
          from = player;
        for (const to of samples) {
          if (!valid) break;
          const distance = Math.hypot(to.x - from.x, to.z - from.z);
          travelled += distance;
          valid = travelled <= allowance && canWalk(to.x, to.z);
          let previousHeight = walkingGrid.cells[index(from.x, from.z)];
          for (let t = 0; valid && t <= distance; t += step / 2) {
            const fraction = distance ? t / distance : 0;
            const px = from.x + (to.x - from.x) * fraction;
            const pz = from.z + (to.z - from.z) * fraction;
            valid = canWalk(px, pz);
            if (valid) {
              const height = walkingGrid.cells[index(px, pz)];
              valid = Math.abs(height - previousHeight) <= 0.35;
              previousHeight = height;
            }
          }
          if (valid)
            valid =
              Math.abs(walkingGrid.cells[index(to.x, to.z)] - previousHeight) <= 0.35;
          from = to;
        }
        if (valid) {
          session.movementSequence = lastSequence;
          player.acceptedAt = now();
          player.x = x;
          player.z = z;
          player.y = walkingGrid.cells[index(x, z)];
        }
        }
      }
      player.seen = now();
      player.nom = session.character;
      player.character = session.character;
      room.set(session.id, player);
      let actionResult;
      if (
        point?.action &&
        typeof point.action.id === "string" &&
        point.action.id.length <= 80
      ) {
        // A lost response may replay an action; never throw or talk twice.
        session.actionIds ??= new Set();
        session.actionResults ??= new Map();
        if (!session.actionIds.has(point.action.id)) {
          session.actionIds.add(point.action.id);
          session.lastAction = point.action.id;
          if (point.action.type === "say") {
            const text = typeof point.action.text === "string" ? point.action.text.trim() : "";
            if (!text || Array.from(text).length > 4000) actionResult = { error: "Message invalide." };
            else if (now() - (session.lastSpeech ?? -Infinity) < 1000) actionResult = { error: "Attendez une seconde entre deux messages." };
            else { session.lastSpeech = now(); actionResult = { text, speaker: player.id, character: session.character }; }
          } else if(point.action.type==='drink'&&onDrink){actionResult=await onDrink({id:point.action.id,actor:session.id,character:session.character,player:{...player},channel:session.channel});}
          else if(player.duelProtected) actionResult={error:player.duelFinished?"Le duel est termine.":"Le combat va commencer."};
          else actionResult = world.action(player, point.action, room);
          if (actionResult.text) {
            const events = messageStreams.get(session.channel) ?? [];
            events.push({
              id: point.action.id,
              author: actionResult.speaker,
              character: actionResult.character,
              text: actionResult.text,
              sequence: ++messageSequence,
              created: now(),
            });
            messageStreams.set(session.channel, events.slice(-50));
          }
          if(point.action.type === "say" && actionResult.text) {
            Promise.resolve().then(()=>onSay({id:point.action.id,actor:session.id,character:session.character,text:actionResult.text,rp:point.action.rp===true})).catch(error=>console.error("Activity roleplay message failed:",error.code??"unavailable"));
          }
          session.actionResults.set(point.action.id,actionResult);
          if(session.actionResults.size>128)session.actionResults.delete(session.actionResults.keys().next().value);
          session.actionResult = actionResult;
        } else actionResult = session.actionResults.get(point.action.id) ?? {};
      }
      session.playerState = { ...player };
      const environment = world.snapshot();
      save();
      return {
        ...environment,
        movementSequence: session.movementSequence ?? 0,
        actionResult: point?.action
          ? { id: point.action.id, error: actionResult?.error }
          : undefined,
        health: {
          hp: player.hp,
          spectator: player.spectator,
          canMove: player.canMove !== false && now() >= (player.combatLockedUntil ?? 0),
          combatLockedUntil: player.combatLockedUntil ?? 0,
          cooldowns: world.cooldownsFor?.(player.id) ?? {},
          maxHp: MAX_HP,
          deadUntil: player.deadUntil,
          respawn: player.respawn ?? 0,
          serverTime: now(),
        },
        messageCursor: messageSequence,
        messages: (messageStreams.get(session.channel) ?? [])
          .filter(
            (message) =>
              message.sequence >
                Math.max(
                  session.messageStart,
                  Number.isSafeInteger(after) && after <= messageSequence
                    ? after
                    : session.messageStart,
                ) &&
              (room.has(message.author) ||
                environment.npcs.some((n) => n.id === message.author)),
          )
          .map(({ created, ...message }) => message),
        character: session.character,
        characterChanged,
        position: { x: player.x, y: player.y, z: player.z },
        joueurs: [...room.values()].map(({ seen, lastTalk, acceptedAt, ...rest }) => rest),
      };
    },
  };
}
module.exports = { createActivityService, ActivityError };
