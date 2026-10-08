import test from "node:test";
import assert from "node:assert/strict";
import { createProjectilePlayback } from "../activity/projectile.mjs";
test("authoritative ricochet follows both segments and repeated snapshots do not replay sound", () => {
  const playback = createProjectilePlayback(), p = {};
  const snapshot = { shotId: 1, mode: "flight", trajectory: [{t:0,x:0,y:1,z:0},{t:.1,x:1,y:1,z:0},{t:.2,x:1,y:1,z:1}], x:1,y:1,z:1 };
  assert.equal(playback.receive(snapshot), true);
  playback.update(.05,p); assert.equal(p.x,.5); assert.equal(p.z,0);
  assert.equal(playback.receive(structuredClone(snapshot)), false);
  playback.update(.1,p); assert.equal(p.x,1); assert.ok(Math.abs(p.z-.5)<1e-8);
  playback.update(.05,p); assert.equal(p.z,1);
});
test("resting drop eases without resets on repeated server responses", () => {
  const playback = createProjectilePlayback(), p = {};
  const snapshot = { shotId:1, mode:"rest", x:0,y:.375,z:0,trajectory:[{t:0,x:0,y:2,z:0}] };
  playback.receive(snapshot); playback.update(.05,p); const first=p.y;
  playback.receive(structuredClone(snapshot)); playback.update(.05,p);
  assert.ok(p.y<first && p.y>.375); assert.equal(snapshot.trajectory[0].y,2);
});
