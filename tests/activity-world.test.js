const test = require("node:test"),
  assert = require("node:assert/strict");
const { createActivityWorld } = require("../utils/activityWorld");
const { createActivityService } = require("../utils/activityService");
function fixture(cells = Array(100).fill(0)) {
  let time = 0;
  const grid = {
    origin: { x: 0, z: 0 },
    width: 10,
    height: 10,
    step: 1,
    cells,
    spawn: { x: 1, y: 0, z: 1 },
  };
  const players = new Map([
    ["a", { id: "a", x: 1, y: 0, z: 1 }],
    ["b", { id: "b", x: 5, y: 0, z: 1 }],
  ]);
  const world = createActivityWorld({
    grid,
    ballSpawn: { x: 1, y: 0.25, z: 1 },
    now: () => time,
  });
  world.tick(players);
  return {
    grid,
    world,
    players,
    tick: (s) => {
      time += s * 1000;
      world.tick(players);
    },
    now: () => time,
  };
}
test("pickup is atomic and requires proximity; only the carrier can throw", () => {
  const f = fixture(),
    a = f.players.get("a"),
    b = f.players.get("b");
  assert.ok(f.world.action(b, { type: "pickup" }, f.players).error);
  assert.deepEqual(f.world.action(a, { type: "pickup" }, f.players), {});
  b.x = 1;
  assert.ok(f.world.action(b, { type: "pickup" }, f.players).error);
  assert.ok(f.world.action(b, { type: "throw", target: "a" }, f.players).error);
  assert.equal(f.world.snapshot().pom.owner, "a");
});
test("swept collision hits once, loses HP and stops the Pom", () => {
  const f = fixture(),
    a = f.players.get("a");
  f.world.action(a, { type: "pickup" }, f.players);
  f.world.action(a, { type: "throw", target: "b" }, f.players);
  f.tick(0.5);
  assert.equal(f.players.get("b").hp, 75);
  assert.equal(f.world.snapshot().pom.mode, "rest");
  f.tick(0.5);
  assert.equal(f.players.get("b").hp, 75);
});
test("moving sideways before arrival dodges; target does not home", () => {
  const f = fixture(),
    a = f.players.get("a");
  f.world.action(a, { type: "pickup" }, f.players);
  f.world.action(a, { type: "throw", target: "b" }, f.players);
  f.players.get("b").z = 3;
  f.tick(0.5);
  assert.equal(f.players.get("b").hp, 100);
});
test("two obstacle ricochets stop the Pom, including corners and high polling latency", () => {
  const f = fixture(),
    a = f.players.get("a");
  f.world.action(a, { type: "pickup" }, f.players);
  f.world.action(a, { type: "throw", target: "b" }, f.players);
  f.players.get("b").z = 4;
  f.tick(1.5);
  const ball = f.world.snapshot().pom;
  assert.equal(ball.ricochets, 2);
  assert.equal(ball.mode, "rest");
  assert.ok(ball.x >= -0.5 && ball.x <= 9.5);
});
test("death blocks interactions and revives after ten seconds at spawn", () => {
  const f = fixture(),
    a = f.players.get("a"),
    b = f.players.get("b");
  b.hp = 25;
  f.world.action(a, { type: "pickup" }, f.players);
  f.world.action(a, { type: "throw", target: "b" }, f.players);
  f.tick(0.3);
  assert.equal(b.hp, 0);
  assert.equal(b.deadUntil, f.now() + 10000);
  assert.ok(f.world.action(b, { type: "pickup" }, f.players).error);
  f.tick(9.999);
  assert.equal(b.hp, 0);
  f.tick(0.001);
  assert.equal(b.hp, 100);
  assert.equal(b.respawn, 1);
  assert.deepEqual([b.x, b.y, b.z], [1, 0, 1]);
});
test("disconnect releases a carried Pom", () => {
  const f = fixture(),
    a = f.players.get("a");
  f.world.action(a, { type: "pickup" }, f.players);
  f.players.delete("a");
  f.tick(0.1);
  assert.equal(f.world.snapshot().pom.mode, "rest");
});
test("native residents walk only on reachable cells and stop when speaking", () => {
  let time = 0;
  const grid = require("../activity/assets/sky/navigation.json"),
    residents = require("../activity/assets/sky/residents.json");
  const world = createActivityWorld({ grid, ...residents, now: () => time }),
    players = new Map();
  const before = world.snapshot().npcs;
  for (let i = 0; i < 100; i++) {
    time += 100;
    world.tick(players);
    for (const n of world.snapshot().npcs) {
      const x = Math.round((n.x - grid.origin.x) / grid.step),
        z = Math.round((n.z - grid.origin.z) / grid.step);
      if (!n.static) assert.notEqual(grid.cells[z * grid.width + x], null);
    }
  }
  const after = world.snapshot().npcs;
  for (const id of ["npc:manager", "npc:horrace"]) {
    const a = after.find((n) => n.id === id),
      b = before.find((n) => n.id === id);
    assert.deepEqual([a.x, a.y, a.z], [b.x, b.y, b.z]);
  }
  assert.deepEqual(
    [before[2].x, before[2].y, before[2].z],
    [3.299999999999997, 1.65, 10.95],
  );
  assert.ok(
    after.some(
      (n, i) => Math.hypot(n.x - before[i].x, n.z - before[i].z) > 0.4,
    ),
  );
  const n = after[0],
    p = { id: "a", hp: 100, x: n.x, y: n.y, z: n.z };
  players.set(p.id, p);
  const reply = world.action(p, { type: "talk", target: n.id }, players);
  assert.ok(residents.npcs[0].lines.includes(reply.text));
  time += 1000;
  world.tick(players);
  assert.deepEqual(
    [world.snapshot().npcs[0].x, world.snapshot().npcs[0].z],
    [n.x, n.z],
  );
});
test("NPC dialogue shares the room cursor and retries do not replay actions", async () => {
  let time = 0;
  const grid = {
    origin: { x: 0, z: 0 },
    width: 4,
    height: 4,
    step: 1,
    cells: Array(16).fill(0),
    spawn: { x: 0, y: 0, z: 0 },
  };
  const service = createActivityService({
    grid,
    now: () => time,
    resolveCharacter: async () => "Estelle",
    residents: {
      npcs: [
        {
          id: "host",
          name: "Host",
          character: "Host",
          waypoints: [grid.spawn],
          lines: ["Bonjour !"],
        },
      ],
    },
  });
  const a = await service.join({ id: "a", channel: "one" }),
    b = await service.join({ id: "b", channel: "two" });
  const point = {
    x: 0,
    z: 0,
    action: { id: "hello", type: "talk", target: "npc:host" },
  };
  const first = await service.state(a.activity_token, point);
  assert.equal(first.messages[0].text, "Bonjour !");
  const retry = await service.state(
    a.activity_token,
    point,
    first.messageCursor,
  );
  assert.equal(retry.messages.length, 0);
  assert.equal(retry.messageCursor, first.messageCursor);
  const other = await service.state(b.activity_token);
  assert.equal(other.messages.length, 0);
});

test("furniture blocks projectiles and players on another floor cannot be hit", () => {
  const cells = Array(100).fill(0);
  for (let z = 0; z < 10; z++) cells[z * 10 + 3] = null;
  const f = fixture(cells),
    a = f.players.get("a");
  f.world.action(a, { type: "pickup" }, f.players);
  f.world.action(a, { type: "throw", target: "b" }, f.players);
  f.tick(0.7);
  assert.equal(f.players.get("b").hp, 100);
  assert.equal(f.world.snapshot().pom.ricochets, 2);
  const g = fixture();
  g.players.get("b").y = 3;
  g.world.action(g.players.get("a"), { type: "pickup" }, g.players);
  assert.ok(
    g.world.action(
      g.players.get("a"),
      { type: "throw", target: "b" },
      g.players,
    ).error,
  );
});

test("service refuses dead movement and ignores the corpse snapshot on respawn", async () => {
  let time = 0;
  const grid = {
    origin: { x: 0, z: 0 },
    width: 6,
    height: 6,
    step: 1,
    cells: Array(36).fill(0),
    spawn: { x: 0, y: 0, z: 0 },
  };
  const service = createActivityService({
    grid,
    now: () => time,
    resolveCharacter: async () => "Estelle",
  });
  const a = await service.join({ id: "a", channel: "one" }),
    b = await service.join({ id: "b", channel: "one" });
  await service.state(a.activity_token);
  await service.state(b.activity_token, { x: 0.6, z: 0 });
  let hit;
  for (let i = 0; i < 4; i++) {
    time += 100;
    await service.state(a.activity_token, {
      x: 0,
      z: 0,
      action: { id: "pickup-" + i, type: "pickup" },
    });
    await service.state(a.activity_token, {
      x: 0,
      z: 0,
      action: { id: "throw-" + i, type: "throw", target: "b" },
    });
    time += 100;
    hit = await service.state(b.activity_token);
    assert.equal(hit.health.hp, 100 - (i + 1) * 25);
  }
  const frozen = await service.state(b.activity_token, { x: 1, z: 0 });
  assert.equal(frozen.position.x, 0.6);
  assert.equal(frozen.health.hp, 0);
  time = hit.health.deadUntil - 1;
  assert.equal((await service.state(b.activity_token)).health.hp, 0);
  time++;
  const revived = await service.state(b.activity_token, { x: 0.6, z: 0 });
  assert.equal(revived.health.hp, 100);
  assert.equal(revived.position.x, 0);
  assert.equal(revived.health.respawn, 1);
});

test("free aim needs no player target; a descending and a vertical shot can hit a lower floor", () => {
  for (const targetX of [1, 5]) {
    let time = 0;
    const grid = {
      origin: { x: 0, z: 0 },
      step: 1,
      width: 10,
      height: 10,
      cells: Array(100).fill(0),
      spawn: { x: 1, y: 0, z: 1 },
    };
    const players = new Map([
      ["a", { id: "a", x: 1, y: 3, z: 1 }],
      ["b", { id: "b", x: targetX, y: 0, z: 1 }],
    ]);
    const world = require("../utils/activityWorld").createActivityWorld({
      grid,
      ballSpawn: { x: 1, y: 3.5, z: 1 },
      geometry: { sweep: () => null, floor: () => 0 },
      now: () => time,
    });
    world.tick(players);
    world.action(players.get("a"), { type: "pickup" }, players);
    assert.deepEqual(
      world.action(
        players.get("a"),
        { type: "throw", aim: { x: targetX, y: 0.9, z: 1 } },
        players,
      ),
      {},
    );
    assert.ok(world.snapshot().pom.vy < 0);
    time = 400;
    world.tick(players);
    assert.equal(players.get("b").hp, 75);
  }
});
test("invalid free aim does not consume the held Pom", () => {
  const f = fixture(),
    a = f.players.get("a");
  f.world.action(a, { type: "pickup" }, f.players);
  for (const aim of [
    null,
    { x: NaN, y: 0, z: 1 },
    { x: 1, y: Infinity, z: 1 },
    { x: 10000, y: 0, z: 1 },
  ])
    assert.ok(f.world.action(a, { type: "throw", aim }, f.players).error);
  assert.equal(f.world.snapshot().pom.owner, "a");
});
test("server geometry respects the restaurant translation, floors and real surfaces", () => {
  const fs = require("node:fs"),
    path = require("node:path");
  const geometry = require("../utils/activityGeometry").createActivityGeometry(
    JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../activity/assets/sky/anterose.gltf"),
        "utf8",
      ),
    ),
  );
  assert.ok(Math.abs(geometry.floor(-2.4, 1.7, 5)) < 0.01);
  assert.ok(Math.abs(geometry.floor(8.3, 0.2, 5) - 1.5) < 0.01);
  const contact = geometry.sweep(
    { x: -2.4, y: 2, z: 1.7 },
    { x: -2.4, y: -1, z: 1.7 },
    0.22,
  );
  assert.ok(contact);
  assert.ok(contact.normal.y > 0.9);
});

test("a free shot across the real restaurant stairs hits a player below", () => {
  const fs = require("node:fs"),
    path = require("node:path"),
    grid = require("../activity/assets/sky/navigation.json");
  const geometry = require("../utils/activityGeometry").createActivityGeometry(
    JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../activity/assets/sky/anterose.gltf"),
        "utf8",
      ),
    ),
  );
  let time = 0;
  const a = { id: "a", x: 5, y: 1.5, z: -0.4 },
    b = { id: "b", x: 2.2, y: 0, z: -1.2 },
    players = new Map([
      ["a", a],
      ["b", b],
    ]);
  const world = createActivityWorld({
    grid,
    geometry,
    ballSpawn: { x: 5, y: 1.9, z: -0.4 },
    now: () => time,
  });
  world.tick(players);
  world.action(a, { type: "pickup" }, players);
  world.action(a, { type: "throw", aim: { x: b.x, y: 0.9, z: b.z } }, players);
  time = 300;
  world.tick(players);
  assert.equal(b.hp, 75);
});

test("snapshots preserve ordered ricochet corners and unique launch identity", () => {
  const f = fixture(); f.players.delete("b"); const a = f.players.get("a");
  f.world.action(a, {type:"pickup"}, f.players);
  f.world.action(a, {type:"throw", aim:{x:20,y:.9,z:1}}, f.players);
  f.tick(1);
  const ball = f.world.snapshot().pom;
  assert.equal(ball.shotId, 1); assert.ok(ball.trajectory.length >= 3);
  assert.ok(ball.trajectory.length <= 64);
  for (let i=1;i<ball.trajectory.length;i++) assert.ok(ball.trajectory[i].t >= ball.trajectory[i-1].t);
  ball.trajectory[0].x = 999;
  assert.notEqual(f.world.snapshot().pom.trajectory[0].x,999);
});

test("spectators are immune even at projectile height and cannot pick up the Pom",()=>{
 const f=fixture(),a=f.players.get('a'),b=f.players.get('b');b.spectator=true;
 f.world.action(a,{type:'pickup'},f.players);f.world.action(a,{type:'throw',aim:{x:7,y:.9,z:1}},f.players);f.tick(.5);
 assert.equal(b.hp,100);assert.ok(f.world.action(b,{type:'pickup'},f.players).error);
});
