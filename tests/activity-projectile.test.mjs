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

const { createShotPrediction } = await import("../activity/shot-prediction.mjs");
const grid = { origin:{x:-50,z:-50},step:1,width:100,height:100,cells:Array(10000).fill(0),spawn:{x:0,y:0,z:0} };
test("click prediction moves on the first frame and late launch acknowledgement neither rewinds nor replays sound", () => {
 const playback=createProjectilePlayback(), p={x:0,y:.9,z:0};
 playback.receive({mode:"held",owner:"me",x:0,y:.9,z:0});
 playback.predict(createShotPrediction(grid,null,{x:0,y:0,z:0},{x:20,y:.9,z:0}));
 assert.equal(playback.update(1/60,p),true); assert.ok(p.x>.29 && p.x<.31);
 for(let i=0;i<29;i++)playback.update(1/60,p);
 const before=p.x;
 assert.equal(playback.receive({mode:"flight",shotId:1,x:0,y:.9,z:0,trajectory:[{t:0,x:0,y:.9,z:0}]}),false);
 playback.update(1/60,p);assert.ok(p.x>before);assert.ok(p.x>8);
});
test("prediction uses real obstacle ricochets and server hit smoothly stops it",()=>{
 const geometry={floor:()=>0,sweep(from,to){return from.x<2 && to.x>=2?{point:{x:1.99,y:.9,z:0},normal:{x:-1,y:0,z:0}}:null;}};
 const simulation=createShotPrediction(grid,geometry,{x:0,y:0,z:0},{x:20,y:.9,z:0});
 let ball=simulation.update(.15);assert.equal(ball.ricochets,1);assert.ok(ball.vx<0);assert.ok(ball.x<2);
 const playback=createProjectilePlayback(),p={x:0,y:.9,z:0};playback.predict(createShotPrediction(grid,null,{x:0,y:0,z:0},{x:20,y:.9,z:0}));playback.update(.2,p);
 const before=p.x;playback.receive({shotId:1,mode:"rest",x:2,y:.375,z:0,trajectory:[{t:0,x:0,y:.9,z:0},{t:.1,x:2,y:.9,z:0}]});playback.update(.016,p);
 assert.ok(p.x<before && p.x>2);assert.ok(p.y<.9 && p.y>.375);
});
test("a launch snapshot with no travelled segment has no stationary fire trail",()=>{
 const playback=createProjectilePlayback(),p={x:0,y:.9,z:0};
 playback.receive({shotId:1,mode:"flight",trajectory:[{t:0,...p}]});assert.equal(playback.update(.016,p),false);
});
