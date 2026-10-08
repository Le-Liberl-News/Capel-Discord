const test = require("node:test"),
  assert = require("node:assert/strict");
const { createActivityService } = require("../utils/activityService");
function fixture() {
  let clock = 0,
    character = "Estelle";
  const grid = {
    origin: { x: 0, z: 0 },
    step: 1,
    width: 8,
    height: 8,
    cells: Array(64).fill(0),
    spawn: { x: 0, y: 0, z: 0 },
  };
  const service = createActivityService({
    grid,
    resolveCharacter: async () => character,
    now: () => clock,
  });
  return {
    service,
    grid,
    tick: (t) => (clock += t),
    character: (name) => (character = name),
  };
}
test("positions use authenticated identity, not an id supplied by the client", async () => {
  const f = fixture(),
    session = await f.service.join({ id: "alice", channel: "room" });
  const state = await f.service.state(session.activity_token, {
    id: "someone-else",
    x: 0,
    z: 0,
  });
  assert.equal(state.joueurs[0].id, "alice");
  assert.equal(state.joueurs[0].character, "Estelle");
  await assert.rejects(() => f.service.state("invalid"), { status: 401 });
});
test("room isolation and presence expiry", async () => {
  const f = fixture(),
    a = await f.service.join({ id: "alice", channel: "one" }),
    b = await f.service.join({ id: "bob", channel: "two" });
  await f.service.state(a.activity_token);
  const state = await f.service.state(b.activity_token);
  assert.deepEqual(
    state.joueurs.map((x) => x.id),
    ["bob"],
  );
  f.tick(16000);
  const next = await f.service.state(a.activity_token);
  assert.deepEqual(
    next.joueurs.map((x) => x.id),
    ["alice"],
  );
});
test("legitimate movement is accepted; teleporting and invalid numbers are rejected", async () => {
  const f = fixture(),
    s = await f.service.join({ id: "a", channel: "one" });
  await f.service.state(s.activity_token);
  f.tick(250);
  let result = await f.service.state(s.activity_token, { x: 1, z: 0 });
  assert.equal(result.position.x, 1);
  result = await f.service.state(s.activity_token, { x: 7, z: 7 });
  assert.equal(result.position.x, 1);
  await assert.rejects(
    () => f.service.state(s.activity_token, { x: "bad", z: 0 }),
    { status: 400 },
  );
});
test("moving through a wall is rejected even when the endpoint is clear", async () => {
  const f = fixture();
  f.grid.cells[1] = null;
  const s = await f.service.join({ id: "a", channel: "one" });
  await f.service.state(s.activity_token);
  f.tick(1000);
  const result = await f.service.state(s.activity_token, { x: 2, z: 0 });
  assert.equal(result.position.x, 0);
});
test("the daily assignment is refreshed on the server", async () => {
  const f = fixture(),
    s = await f.service.join({ id: "a", channel: "one" });
  assert.equal(s.character, "Estelle");
  f.character("Joshua");
  f.tick(16000);
  const result = await f.service.state(s.activity_token);
  assert.equal(result.character, "Joshua");
  assert.equal(result.joueurs[0].nom, "Joshua");
});
test("expired sessions cannot update positions", async () => {
  const f = fixture(),
    s = await f.service.join({ id: "a", channel: "one" });
  f.tick(7200001);
  await assert.rejects(() => f.service.state(s.activity_token), {
    status: 401,
  });
});

test("server accepts the actual staircase route up and down", async () => {
  const fs = require("node:fs");
  const grid = JSON.parse(
    fs.readFileSync(
      require("node:path").join(
        __dirname,
        "../activity/assets/sky/navigation.json",
      ),
    ),
  );
  const { route } = await import("../activity/movement.mjs");
  let clock = 0;
  const service = createActivityService({
    grid,
    resolveCharacter: async () => "Estelle",
    now: () => clock,
  });
  const session = await service.join({ id: "alice", channel: "room" });
  const upstairs = { x: 6.8, z: 4.8 };
  const up = route(grid, grid.spawn, upstairs);
  const down = route(grid, up.at(-1), grid.spawn);
  for (const point of [...up, ...down]) {
    clock += 300;
    const state = await service.state(session.activity_token, point);
    assert.deepEqual(state.position, point);
  }
});
test("server rejects a shortcut over a sudden height change", async () => {
  const f = fixture();
  f.grid.cells[1] = 2;
  const session = await f.service.join({ id: "alice", channel: "room" });
  f.tick(1000);
  const state = await f.service.state(session.activity_token, { x: 1, z: 0 });
  assert.deepEqual(state.position, { x: 0, y: 0, z: 0 });
});

test("chat relays only humans with an avatar in the same room, with a resumable cursor", async () => {
  const f = fixture();
  const alice = await f.service.join({ id: "alice", channel: "one" });
  const bob = await f.service.join({ id: "bob", channel: "one" });
  const other = await f.service.join({ id: "other", channel: "two" });
  await f.service.state(alice.activity_token);
  await f.service.state(bob.activity_token);
  await f.service.state(other.activity_token);
  const message = {
    id: "message1",
    channel: "one",
    author: "alice",
    text: "Bonjour !",
  };
  assert.equal(
    f.service.captureMessage({ ...message, author: "outsider" }),
    false,
  );
  assert.equal(f.service.captureMessage({ ...message, channel: "two" }), false);
  assert.equal(f.service.captureMessage({ ...message, bot: true }), false);
  assert.equal(f.service.captureMessage({ ...message, webhook: true }), false);
  assert.equal(f.service.captureMessage(message), true);
  assert.equal(f.service.captureMessage(message), false);
  const state = await f.service.state(bob.activity_token);
  assert.equal(state.messages.length, 1);
  assert.equal(state.messages[0].character, "Estelle");
  assert.equal(state.messages[0].text, "Bonjour !");
  assert.equal(
    (await f.service.state(other.activity_token)).messages.length,
    0,
  );
  assert.equal(
    (await f.service.state(bob.activity_token, undefined, state.messageCursor))
      .messages.length,
    0,
  );
  assert.equal((await f.service.state(bob.activity_token)).messages.length, 1);
  const newcomer = await f.service.join({ id: "new", channel: "one" });
  assert.equal(
    (await f.service.state(newcomer.activity_token)).messages.length,
    0,
  );
});
test("chat disappears when its author leaves and stale presence cannot speak", async () => {
  const f = fixture();
  const alice = await f.service.join({ id: "alice", channel: "one" });
  const bob = await f.service.join({ id: "bob", channel: "one" });
  await f.service.state(alice.activity_token);
  await f.service.state(bob.activity_token);
  f.service.captureMessage({
    id: "1",
    channel: "one",
    author: "alice",
    text: "Salut",
  });
  f.tick(16000);
  assert.equal((await f.service.state(bob.activity_token)).messages.length, 0);
  assert.equal(
    f.service.captureMessage({
      id: "2",
      channel: "one",
      author: "alice",
      text: "Absent",
    }),
    false,
  );
});

test("chat accepts long messages without splitting unicode characters and keeps memory bounded", async () => {
  const f = fixture();
  const session = await f.service.join({ id: "alice", channel: "one" });
  await f.service.state(session.activity_token);
  assert.equal(
    f.service.captureMessage({
      id: "long",
      channel: "one",
      author: "alice",
      text: "😀".repeat(4100),
    }),
    true,
  );
  const state = await f.service.state(session.activity_token);
  assert.equal(Array.from(state.messages[0].text).length, 4000);
  assert.equal(state.messages[0].text.endsWith("😀"), true);
});
