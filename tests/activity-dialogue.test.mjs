import test from "node:test";
import assert from "node:assert/strict";
import {
  graphemes,
  paginateDialogue,
  typewriterState,
  DialogueQueue,
} from "../activity/dialogue-text.mjs";
test("text reveals whole graphemes, including joined emoji and accents", () => {
  const chars = graphemes("e\u0301👨‍👩‍👧‍👦!");
  assert.equal(chars.length, 3);
  assert.equal(typewriterState(chars, 32).text, "e\u0301");
  assert.equal(typewriterState(chars, 64).text, "e\u0301👨‍👩‍👧‍👦");
  assert.equal(typewriterState(chars, 100).complete, true);
  assert.equal(typewriterState(chars, 100).expired, false);
  assert.equal(typewriterState(chars, 4000).expired, true);
});
test("long messages paginate without losing words or overflowing lines", () => {
  const text =
    "Une longue phrase avec des accents et une trèslonguechaînenonséparée.".repeat(
      8,
    );
  const pages = paginateDialogue(text, (s) => graphemes(s).length, 20);
  assert.ok(pages.length > 1);
  assert.ok(pages.every((p) => p.split("\n").length <= 3));
  assert.ok(
    pages.every((p) => p.split("\n").every((l) => graphemes(l).length <= 20)),
  );
  assert.equal(pages.join("\n").replace(/\s/g, ""), text.replace(/\s/g, ""));
});
test("explicit line breaks survive pagination", () =>
  assert.deepEqual(
    paginateDialogue("A\nB\nC\nD", (s) => s.length, 10),
    ["A\nB\nC", "D"],
  ));
test("messages queue independently for each avatar and polling retries do not replay them", () => {
  const q = new DialogueQueue();
  const first = { id: "1", author: "alice", text: "Salut" };
  q.receive([
    first,
    { id: "2", author: "alice", text: "Ça va ?" },
    { id: "3", author: "bob", text: "Oui" },
  ]);
  q.receive([first]);
  assert.equal(q.next("alice").id, "1");
  assert.equal(q.next("bob").id, "3");
  assert.equal(q.next("alice").id, "2");
  assert.equal(q.next("alice"), undefined);
  q.receive([first]);
  assert.equal(q.next("alice"), undefined);
});
test("dialogue queues are bounded and empty messages are ignored", () => {
  const q = new DialogueQueue();
  q.receive(
    Array.from({ length: 9 }, (_, i) => ({
      id: String(i),
      author: "alice",
      text: "Bonjour",
    })),
  );
  assert.equal(q.queues.get("alice").length, 5);
  q.receive([{ id: "empty", author: "bob", text: " " }]);
  assert.equal(q.next("bob"), undefined);
  q.remove("alice");
  assert.equal(q.next("alice"), undefined);
});

import { placeDialogues } from "../activity/dialogue-placement.mjs";
const viewport = { width: 1000, height: 800 };
const overlaps = (a, b) =>
  a.left < b.left + b.width &&
  a.left + a.width > b.left &&
  a.top < b.top + b.height &&
  a.top + a.height > b.top;
test("a speech pointer stays at the speaker when the speaker moves", () => {
  const first = { id: "alice", x: 500, y: 350, width: 300, height: 140 };
  const before = placeDialogues([first], viewport).get("alice");
  const after = placeDialogues([{ ...first, x: 560, y: 380 }], viewport).get(
    "alice",
  );
  assert.equal(after.anchorX, 560);
  assert.equal(after.anchorY, 380);
  assert.equal(after.left - before.left, 60);
  assert.equal(after.top - before.top, 30);
  assert.equal(after.side, "above");
});
test("simultaneous speakers keep separate bubbles and their own pointers", () => {
  const result = placeDialogues(
    [
      { id: "alice", x: 500, y: 350, width: 300, height: 140 },
      { id: "bob", x: 560, y: 370, width: 300, height: 140 },
    ],
    viewport,
  );
  assert.equal(result.size, 2);
  const a = result.get("alice"),
    b = result.get("bob");
  assert.equal(a.anchorX, 500);
  assert.equal(b.anchorX, 560);
  assert.equal(b.anchorY, 370);
  assert.equal(overlaps(a, b), false);
});
test("avoiding the HUD does not detach the pointer from the avatar", () => {
  const hud = { left: 16, top: 16, width: 340, height: 230 };
  const p = placeDialogues(
    [{ id: "alice", x: 500, y: 300, width: 450, height: 145 }],
    viewport,
    [hud],
  ).get("alice");
  assert.equal(overlaps(p, hud), false);
  assert.equal(p.anchorX, 500);
  assert.equal(p.anchorY, 300);
});
test("a speaker near the top edge keeps a visible bubble pointing back to them", () => {
  const p = placeDialogues(
    [{ id: "alice", x: 70, y: 90, width: 300, height: 140 }],
    viewport,
  ).get("alice");
  assert.equal(p.side, "below");
  assert.equal(p.anchorX, 70);
  assert.equal(p.anchorY, 90);
  assert.ok(
    p.left >= 16 && p.top >= 16 && p.top + p.height <= viewport.height - 16,
  );
});


test('Sieg speech plays its native cry once and other characters stay silent',async()=>{
 const {createCharacterVoices}=await import('../activity/character-voices.mjs');let plays=0,pauses=0,url;const sound={currentTime:5,play(){plays++;return Promise.resolve();},pause(){pauses++;}};
 const voices=createCharacterVoices(new URL('https://example.test/assets/'),value=>{url=value;return sound;});voices.speak('Estelle');assert.equal(plays,0);voices.speak('Sieg');assert.equal(plays,1);assert.equal(sound.currentTime,0);assert.ok(url.endsWith('/sounds/sieg.ogg'));voices.dispose();assert.equal(pauses,1);
});
