const { randomBytes } = require("node:crypto");
class ActivityError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}
function createActivityService({ grid, resolveCharacter, now = Date.now }) {
  let messageSequence = 0;
  const messageStreams = new Map();
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
  function prune() {
    const time = now();
    for (const [token, session] of sessions)
      if (session.expires <= time) sessions.delete(token);
    for (const [id, room] of rooms) {
      for (const [user, player] of room)
        if (time - player.seen > 15000) room.delete(user);
      if (!room.size) {
        rooms.delete(id);
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
    async join({ id, channel }) {
      prune();
      const session = {
        id,
        channel,
        expires: now() + 2 * 60 * 60 * 1000,
        refreshAt: 0,
        messageStart: messageSequence,
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
          ...spawn,
        },
      };
    },
    async state(token, point, after) {
      const session = sessionFor(token);
      await refresh(session);
      let room = rooms.get(session.channel);
      if (!room) {
        room = new Map();
        rooms.set(session.channel, room);
      }
      let player = room.get(session.id);
      if (!player)
        player = {
          id: session.id,
          ...spawn,
          seen: now() - 150,
          character: session.character,
        };
      if (point) {
        const x = Number(point.x),
          z = Number(point.z);
        if (!Number.isFinite(x) || !Number.isFinite(z))
          throw new ActivityError("Position invalide.");
        const distance = Math.hypot(x - player.x, z - player.z),
          allowance =
            Math.min(2, Math.max(0.15, (now() - player.seen) / 1000)) * 4.5 +
            0.15;
        let valid = distance <= allowance && canWalk(x, z);
        let previousHeight = player.y ?? grid.cells[index(player.x, player.z)];
        for (let t = 0; valid && t <= distance; t += step / 2) {
          const fraction = distance ? t / distance : 0;
          valid = canWalk(
            player.x + (x - player.x) * fraction,
            player.z + (z - player.z) * fraction,
          );
          if (valid) {
            const height =
              grid.cells[
                index(
                  player.x + (x - player.x) * fraction,
                  player.z + (z - player.z) * fraction,
                )
              ];
            valid = Math.abs(height - previousHeight) <= 0.35;
            previousHeight = height;
          }
        }
        if (valid)
          valid = Math.abs(grid.cells[index(x, z)] - previousHeight) <= 0.35;
        if (valid) {
          player.x = x;
          player.z = z;
          player.y = grid.cells[index(x, z)];
        }
      }
      player.seen = now();
      player.nom = session.character;
      player.character = session.character;
      room.set(session.id, player);
      return {
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
                ) && room.has(message.author),
          )
          .map(({ created, ...message }) => message),
        character: session.character,
        position: { x: player.x, y: player.y, z: player.z },
        joueurs: [...room.values()].map(({ seen, ...rest }) => rest),
      };
    },
  };
}
module.exports = { createActivityService, ActivityError };
