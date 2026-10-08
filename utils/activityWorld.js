// Authoritative room simulation. Coordinates and HP are never supplied by clients.
const MAX_HP = 100,
  DAMAGE = 25,
  RESPAWN_MS = 10000;
function createActivityWorld({
  grid,
  npcs = [],
  ballSpawn = grid.spawn,
  now = Date.now,
  geometry = null,
}) {
  const index = (x, z) => {
    const a = Math.round((x - grid.origin.x) / grid.step),
      b = Math.round((z - grid.origin.z) / grid.step);
    return a < 0 || b < 0 || a >= grid.width || b >= grid.height
      ? -1
      : b * grid.width + a;
  };
  const height = (x, z) => {
    const i = index(x, z);
    return i < 0 ? null : grid.cells[i];
  };
  const point = (i) => ({
    x: grid.origin.x + (i % grid.width) * grid.step,
    y: grid.cells[i],
    z: grid.origin.z + Math.floor(i / grid.width) * grid.step,
  });
  function nearest(p) {
    let best = null,
      score = Infinity;
    for (let i = 0; i < grid.cells.length; i++)
      if (grid.cells[i] !== null) {
        const q = point(i),
          d =
            (q.x - p.x) ** 2 + (q.z - p.z) ** 2 + 16 * (q.y - (p.y ?? 0)) ** 2;
        if (d < score) {
          score = d;
          best = i;
        }
      }
    return best;
  }
  function route(from, to) {
    const start = nearest(from),
      end = nearest(to),
      queue = [start],
      parents = new Map([[start, null]]);
    for (let head = 0; head < queue.length && !parents.has(end); head++) {
      const i = queue[head],
        x = i % grid.width,
        z = Math.floor(i / grid.width);
      for (const [dx, dz] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const a = x + dx,
          b = z + dz,
          j = b * grid.width + a;
        if (
          a < 0 ||
          b < 0 ||
          a >= grid.width ||
          b >= grid.height ||
          grid.cells[j] === null ||
          parents.has(j) ||
          Math.abs(grid.cells[j] - grid.cells[i]) > 0.35
        )
          continue;
        parents.set(j, i);
        queue.push(j);
      }
    }
    if (!parents.has(end)) return [];
    const result = [];
    for (let i = end; i !== start; i = parents.get(i)) result.push(point(i));
    return result.reverse();
  }
  const residents = npcs.map((n, i) => ({
    ...n,
    ...n.waypoints[0],
    id: "npc:" + n.id,
    npc: true,
    path: [],
    next: 1,
    pause: n.initialPause ?? 1 + i * 2,
    heading: n.heading ?? { dx: 0, dz: -1 },
    talkUntil: 0,
  }));
  const ball = {
    ...ballSpawn,
    mode: "rest",
    owner: null,
    vx: 0,
    vz: 0,
    vy: 0,
    ricochets: 0,
    thrownBy: null,
    flight: 0,
  };
  let last = now();
  const resetBall = () =>
    Object.assign(ball, ballSpawn, {
      mode: "rest",
      owner: null,
      vx: 0,
      vz: 0,
      vy: 0,
      ricochets: 0,
      flight: 0,
    });
  const stop = () => {
    ball.mode = "rest";
    ball.owner = null;
    ball.vx = ball.vy = ball.vz = 0;
    const ground = geometry
      ? geometry.floor(ball.x, ball.z, ball.y + 0.1)
      : height(ball.x, ball.z);
    if (ground === null) {
      resetBall();
      return;
    }
    ball.y = ground + 0.375;
  };
  function tick(players) {
    const time = now(),
      elapsed = Math.max(0, (time - last) / 1000);
    last = time;
    for (const p of players.values()) {
      p.hp ??= MAX_HP;
      p.deadUntil ??= 0;
      if (p.hp === 0 && time >= p.deadUntil) {
        Object.assign(p, grid.spawn);
        p.hp = MAX_HP;
        p.deadUntil = 0;
        p.respawn = (p.respawn ?? 0) + 1;
      }
    }
    if (ball.owner && !players.has(ball.owner)) stop();
    // No absent players are hit after a long pause. Bounded work per request.
    const duration = Math.min(elapsed, 2),
      steps = Math.ceil(duration * 120),
      dt = steps ? duration / steps : 0;
    for (let step = 0; step < steps; step++) {
      for (const n of residents) {
        if (n.static || time < n.talkUntil) continue;
        if (n.pause > 0) {
          n.pause -= dt;
          continue;
        }
        if (!n.path.length) {
          n.destination = n.waypoints[n.next % n.waypoints.length];
          n.path = route(n, n.destination);
          n.next++;
          if (!n.path.length) {
            n.pause = n.destination.wait ?? 0;
            continue;
          }
        }
        let budget = (n.speed ?? 0.65) * dt;
        while (budget > 0 && n.path.length) {
          const q = n.path[0],
            dx = q.x - n.x,
            dz = q.z - n.z,
            d = Math.hypot(dx, dz),
            f = d ? Math.min(1, budget / d) : 1;
          n.x += dx * f;
          n.z += dz * f;
          n.y += (q.y - n.y) * f;
          n.heading = { dx, dz };
          budget -= d * f;
          if (f === 1) n.path.shift();
          else break;
        }
        if (!n.path.length) {
          n.pause = n.destination.wait ?? 0;
          if (n.destination.angle !== undefined) {
            const a = (n.destination.angle * Math.PI) / 180;
            n.heading = { dx: -Math.sin(a), dz: Math.cos(a) };
          }
        }
      }
      if (ball.mode !== "flight") continue;
      ball.flight += dt;
      if (ball.flight > 2.5 || (ball.stopAt && ball.flight >= ball.stopAt)) {
        stop();
        continue;
      }
      const x = ball.x + ball.vx * dt,
        z = ball.z + ball.vz * dt,
        y = ball.y + ball.vy * dt;
      const free = (a, b) => {
        const h = height(a, b);
        return h !== null && Math.abs(h - (ball.y - 0.9)) < 0.65;
      };
      const contact = geometry?.sweep(ball, { x, y, z }, 0.22);
      if (contact || (!geometry && !free(x, z))) {
        if (ball.ricochets >= 2) {
          stop();
          continue;
        }
        if (contact) {
          const normal = contact.normal,
            dot = ball.vx * normal.x + ball.vy * normal.y + ball.vz * normal.z;
          ball.vx -= 2 * dot * normal.x;
          ball.vy -= 2 * dot * normal.y;
          ball.vz -= 2 * dot * normal.z;
          Object.assign(ball, contact.point);
          ball.x += normal.x * 0.015;
          ball.y += normal.y * 0.015;
          ball.z += normal.z * 0.015;
        } else {
          const blockedX = !free(x, ball.z),
            blockedZ = !free(ball.x, z);
          if (blockedX || !blockedZ) ball.vx = -ball.vx;
          if (blockedZ || !blockedX) ball.vz = -ball.vz;
        }
        ball.ricochets++;
        if (ball.ricochets >= 2) {
          ball.vx *= 0.5;
          ball.vy *= 0.5;
          ball.vz *= 0.5;
          ball.stopAt = ball.flight + 0.2;
        }
        continue;
      }
      for (const p of players.values()) {
        if (p.hp === 0 || p.id === ball.thrownBy) continue;
        const dx = x - ball.x,
          dy = y - ball.y,
          dz = z - ball.z,
          length = dx * dx + dy * dy + dz * dz;
        const struck = [0.35, 0.9, 1.45].some((offset) => {
          const cy = (p.y ?? 0) + offset,
            t = length
              ? Math.max(
                  0,
                  Math.min(
                    1,
                    ((p.x - ball.x) * dx +
                      (cy - ball.y) * dy +
                      (p.z - ball.z) * dz) /
                      length,
                  ),
                )
              : 0;
          return (
            Math.hypot(
              p.x - ball.x - t * dx,
              cy - ball.y - t * dy,
              p.z - ball.z - t * dz,
            ) < 0.5
          );
        });
        if (struck) {
          p.hp = Math.max(0, p.hp - DAMAGE);
          if (p.hp === 0) p.deadUntil = time + RESPAWN_MS;
          ball.x = x;
          ball.z = z;
          ball.y = y;
          stop();
          break;
        }
      }
      if (ball.mode === "flight") {
        ball.x = x;
        ball.z = z;
        ball.y = y;
      }
    }
    if (ball.mode === "held") {
      const p = players.get(ball.owner);
      if (!p || p.hp === 0) stop();
      else {
        ball.x = p.x;
        ball.z = p.z;
        ball.y = (p.y ?? 0) + 0.9;
      }
    }
  }
  function action(player, command, players) {
    if (!command || player.hp === 0) return { error: "Action impossible." };
    if (command.type === "talk") {
      const n = residents.find((n) => n.id === command.target);
      if (
        !n ||
        Math.hypot(player.x - n.x, player.z - n.z) > 2.2 ||
        Math.abs((player.y ?? 0) - n.y) > 0.6
      )
        return { error: "Approchez-vous du personnage." };
      if (now() < (player.lastTalk ?? -Infinity) + 1500) return {};
      player.lastTalk = now();
      n.talkUntil = now() + 5000;
      return {
        speaker: n.id,
        character: n.name,
        text: n.lines[Math.floor(Math.random() * n.lines.length)],
      };
    }
    if (command.type === "pickup") {
      if (
        ball.mode !== "rest" ||
        Math.hypot(player.x - ball.x, player.z - ball.z) > 2 ||
        Math.abs((player.y ?? 0) - ball.y) > 1.8
      )
        return { error: "Approchez-vous du Pom." };
      Object.assign(ball, {
        mode: "held",
        owner: player.id,
        ricochets: 0,
        x: player.x,
        z: player.z,
        y: (player.y ?? 0) + 0.9,
      });
      return {};
    }
    if (command.type === "throw") {
      if (ball.mode !== "held" || ball.owner !== player.id)
        return { error: "Vous ne portez pas le Pom." };
      let target = command.aim;
      if (target !== undefined) {
        if (!target || ![target.x, target.y, target.z].every(Number.isFinite))
          return { error: "Direction invalide." };
      } else {
        // Compatibility for clients opened before the free-aim update.
        const p = players.get(command.target);
        if (
          !p ||
          p.id === player.id ||
          p.hp === 0 ||
          Math.abs((p.y ?? 0) - (player.y ?? 0)) > 0.6
        )
          return { error: "Cible invalide." };
        target = { x: p.x, y: (p.y ?? 0) + 0.9, z: p.z };
      }
      const dx = target.x - player.x,
        dy = target.y - ((player.y ?? 0) + 0.9),
        dz = target.z - player.z,
        d = Math.hypot(dx, dy, dz);
      if (d < 0.15 || d > 150) return { error: "Direction invalide." };
      Object.assign(ball, {
        mode: "flight",
        owner: null,
        thrownBy: player.id,
        x: player.x,
        z: player.z,
        y: (player.y ?? 0) + 0.9,
        vx: (dx / d) * 18,
        vy: (dy / d) * 18,
        vz: (dz / d) * 18,
        flight: 0,
        stopAt: 0,
        ricochets: 0,
      });
      return {};
    }
    return { error: "Action inconnue." };
  }
  return {
    tick,
    action,
    resetBall,
    snapshot: () => ({
      npcs: residents.map(
        ({
          lines,
          path,
          next,
          pause,
          talkUntil,
          waypoints,
          destination,
          ...n
        }) => ({
          ...n,
          moving:
            !n.static && pause <= 0 && now() >= talkUntil && path.length > 0,
        }),
      ),
      pom: { ...ball },
    }),
  };
}
module.exports = { createActivityWorld, MAX_HP, DAMAGE, RESPAWN_MS };
