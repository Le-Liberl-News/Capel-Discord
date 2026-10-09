import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { advance, route, facing } from "../activity/movement.mjs";
const grid = {
  origin: { x: 0, z: 0 },
  step: 1,
  width: 5,
  height: 5,
  cells: Array(25).fill(0),
};
const position = () => ({ x: 0, y: 0, z: 0 });
test("movement covers the same distance at different frame rates", () => {
  for (const frames of [10, 30, 60, 144]) {
    const p = position(),
      points = [{ x: 10, y: 0, z: 0 }];
    for (let i = 0; i < frames; i++) advance(p, points, 1 / frames);
    assert.ok(Math.abs(p.x - 3.5) < 1e-8);
    assert.equal(p.z, 0);
  }
});
test("a frame can finish one waypoint and continue to the next without teleporting", () => {
  const p = position(),
    points = [
      { x: 1, y: 0, z: 0 },
      { x: 1, y: 0, z: 4 },
    ];
  advance(p, points, 1);
  assert.deepEqual(p, { x: 1, y: 0, z: 2.5 });
  assert.equal(points.length, 1);
});
test("movement stops exactly at its destination", () => {
  const p = position(),
    points = [{ x: 0.1, y: 0, z: 0 }];
  advance(p, points, 0.1);
  assert.equal(p.x, 0.1);
  assert.equal(points.length, 0);
});
test("path goes around furniture and never crosses blocked cells", () => {
  const cells = [...grid.cells];
  cells[12] = null;
  const path = route({ ...grid, cells }, { x: 0, z: 2 }, { x: 4, z: 2 });
  assert.ok(path.length);
  assert.ok(path.every((p) => !(p.x === 2 && p.z === 2)));
  assert.deepEqual(path.at(-1), { x: 4, y: 0, z: 2 });
});
test("diagonal movement cannot cut between two walls", () => {
  const g = {
    origin: { x: 0, z: 0 },
    step: 1,
    width: 2,
    height: 2,
    cells: [0, null, null, 0],
  };
  assert.deepEqual(route(g, { x: 0, z: 0 }, { x: 1, z: 1 }), []);
});
test("outside the floor is not a destination", () =>
  assert.deepEqual(route(grid, { x: 0, z: 0 }, { x: 50, z: 50 }), []));
test("Sky atlas directions follow west, northwest, north, northeast, east, southeast, south, southwest", () => {
  const right = { x: 1, z: 0 },
    forward = { x: 0, z: 1 };
  for (const [x, z, index] of [
    [-1, 0, 0],
    [-1, 1, 1],
    [0, 1, 2],
    [1, 1, 3],
    [1, 0, 4],
    [1, -1, 5],
    [0, -1, 6],
    [-1, -1, 7],
  ])
    assert.equal(facing(x, z, right, forward), index);
});
test("real restaurant spawn is on a walkable floor and connected to a destination", () => {
  const g = JSON.parse(
    fs.readFileSync(
      new URL("../activity/assets/sky/navigation.json", import.meta.url),
    ),
  );
  assert.equal(g.spawn.y, 0);
  assert.ok(route(g, g.spawn, { x: 0, z: 1 }).length);
});

test('restaurant upstairs is reached through successive stair heights and can be left again', () => {
 const g=JSON.parse(fs.readFileSync(new URL('../activity/assets/sky/navigation.json',import.meta.url)));
 const destination={x:8,z:.2};
 const path=route(g,g.spawn,destination);
 assert.ok(path.length);
 assert.equal(path.at(-1).y,1.5);
 assert.ok(path.some(p=>p.y===.5));
 assert.ok(path.some(p=>p.y===1));
 let previous=g.spawn;
 for(const point of path){assert.ok(Math.abs(point.y-previous.y)<=.35);previous=point;}
 assert.ok(route(g,path.at(-1),g.spawn).length);
});
test('height changes smoothly while walking onto a step',()=>{
 const p={x:0,y:0,z:0};
 advance(p,[{x:1,y:.25,z:0}],.1,1);
 assert.equal(p.y,.025);
});


test("a delayed accepted position never rewinds local movement", async () => {
  const { needsCorrection } = await import("../activity/reconciliation.mjs");
  const sent = { x: 1, z: 2 };
  assert.equal(needsCorrection({ x: 5, z: 2 }, { ...sent }, sent), false);
  assert.equal(needsCorrection({ x: 5, z: 2 }, { x: 0, z: 2 }, sent), true);
  assert.equal(needsCorrection({ x: 1.2, z: 2 }, { x: 1.01, z: 2 }, sent), false);
});

test("music retries blocked autoplay on a gesture and remembers mute", async () => {
  const { createMapMusic } = await import("../activity/music.mjs");
  const previous = { Audio: globalThis.Audio, document: globalThis.document, localStorage: globalThis.localStorage };
  const events = new Map(), storage = new Map();
  let audio;
  const elements = [];
  const button = { style: {}, events: {}, setAttribute() {}, addEventListener(name, cb) { this.events[name] = cb; }, remove() {} };
  globalThis.document = {
    createElement: () => { const e = elements.length === 0 ? button : { style:{},events:{},setAttribute(){},addEventListener(n,cb){this.events[n]=cb;},append(){},remove(){} }; elements.push(e); return e; }, body: { append() {} },
    addEventListener: (name, cb) => events.set(name, cb),
    removeEventListener: (name) => events.delete(name),
  };
  globalThis.localStorage = { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) };
  globalThis.Audio = class {
    paused = true;
    calls = 0;
    constructor(url) { this.url = url; audio = this; }
    async play() { if (++this.calls === 1) throw new Error("Autoplay blocked"); this.paused = false; }
    pause() { this.paused = true; }
    addEventListener() {}
    removeAttribute() {}
    load() {}
  };
  let music;
  try {
    music = createMapMusic(new URL("https://example.test/anterose.ogg"));
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(audio.paused, true);
    events.get("pointerdown")({ target: {} });
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(audio.paused, false);
    assert.equal(audio.loop, true);
    assert.equal(audio.volume, .1);
    const slider = elements.find(e => e.type === "range"); slider.value = "7"; slider.events.input();
    assert.equal(audio.volume,.07); assert.equal(storage.get("sky-music-volume"),"0.07");
    button.events.click();
    assert.equal(audio.paused, true);
    assert.equal(storage.get("anterose-music-muted"), "1");
    events.get("pointerdown")({ target: {} });
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(audio.paused, true, "moving must not unmute music");
  } finally {
    music?.dispose();
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete globalThis[key]; else globalThis[key] = value;
    }
  }
});

test("the restaurant music asset is an Ogg file", () => {
  const music = fs.readFileSync(new URL("../activity/assets/sky/music/anterose.ogg", import.meta.url));
  assert.equal(music.subarray(0, 4).toString(), "OggS");
  assert.ok(music.length > 100000);
});

test("open-floor route follows a straight non-grid diagonal", () => {
 const g={origin:{x:0,z:0},width:20,height:20,step:1,cells:Array(400).fill(0)};
 const p=route(g,{x:1.1,y:0,z:1.2},{x:17,z:9});
 assert.equal(p.length,1); assert.deepEqual(p[0],{x:17,y:0,z:9});
});

test("held movement retains the exact heading instead of snapping back to grid centers", () => {
 const g={origin:{x:0,z:0},width:30,height:30,step:.2,cells:Array(900).fill(0)};
 const p={x:1.03,y:0,z:1.02},dx=.4,dz=Math.sqrt(1-dx*dx);
 for(let i=0;i<90;i++) { const path=route(g,p,{x:p.x+dx*.6,z:p.z+dz*.6}); const motion=advance(p,path,1/60,1); assert.ok(Math.abs(motion.dx-dx)<1e-7); assert.ok(Math.abs(motion.dz-dz)<1e-7); }
});

import * as THREE from "three";
import { createArenaCutaway, versionAsset } from "../activity/scene-visibility.mjs";
test("arena navigation reaches both ends of the combat field", () => {
  const arena = JSON.parse(fs.readFileSync(new URL("../activity/assets/sky/arena/navigation.json", import.meta.url)));
  for (const target of [{x:0,z:-22},{x:0,z:10},{x:-9,z:-15},{x:8,z:-15}]) {
    const path = route(arena, arena.spawn, target);
    assert.ok(path.length, JSON.stringify(target));
    assert.equal(path.at(-1).x, target.x);
    assert.equal(path.at(-1).z, target.z);
  }
});
test("arena foreground cut follows rotations and never removes ground or rear walls", () => {
  const cut = createArenaCutaway(), focus = new THREE.Vector3(0,0,0), camera = new THREE.PerspectiveCamera();
  for (const sign of [-1,1]) {
    camera.position.set(0,12,sign*17); camera.lookAt(focus); camera.updateMatrixWorld(); cut.update(camera,focus);
    assert.equal(cut.visible(new THREE.Vector3(0,5,sign*8)),false);
    assert.equal(cut.visible(new THREE.Vector3(0,0,sign*8)),true);
    assert.equal(cut.visible(new THREE.Vector3(0,5,-sign*8)),true);
  }
});
test("asset versions refresh old textures without rewriting embedded model buffers", () => {
  assert.equal(versionAsset("https://example.test/plant.png?old=1","new"),"https://example.test/plant.png?old=1&v=new");
  assert.equal(versionAsset("data:application/octet-stream;base64,AA==","new"),"data:application/octet-stream;base64,AA==");
});

import {cameraDistance,configureSkyMaterial,createMapShadows} from "../activity/sky-rendering.mjs";
test("Rolent camera keeps nearby building roofs ahead of the near plane at all rotations",()=>{
 for(const pitch of [Math.PI/9,Math.PI/4,Math.PI*5/12])for(const yaw of [0,Math.PI/2,Math.PI,Math.PI*1.5]){
  const focus=new THREE.Vector3(-48,0,40),camera=new THREE.OrthographicCamera(-18,18,12,-12,.1,350),distance=cameraDistance("rolent");
  camera.position.set(focus.x+Math.sin(yaw)*Math.cos(pitch)*distance,Math.sin(pitch)*distance,focus.z-Math.cos(yaw)*Math.cos(pitch)*distance);camera.lookAt(focus);camera.updateMatrixWorld();
  for(const x of [-18,0,18])for(const z of [-18,0,18]){const point=new THREE.Vector3(focus.x+x,13,focus.z+z).project(camera);assert.ok(point.z>-1&&point.z<1);}
 }
});
test("translucent glass blends without writing coplanar depth",()=>{
 const material=new THREE.MeshBasicMaterial({transparent:true,opacity:.5});configureSkyMaterial(material);assert.equal(material.depthWrite,false);assert.equal(material.polygonOffset,true);assert.ok(material.polygonOffsetUnits<0);
 const opaque=new THREE.MeshBasicMaterial();configureSkyMaterial(opaque);assert.equal(opaque.depthWrite,true);
});
test("Rolent original translucent textures are exported as blending surfaces",()=>{
 const model=JSON.parse(fs.readFileSync(new URL("../activity/assets/sky/rolent/anterose.gltf",import.meta.url)));
 for(const name of ["T01O1701.png","T02O1703.png","T02O1803.png"]){const image=model.images.findIndex(i=>i.uri===name),texture=model.textures.findIndex(t=>t.source===image),material=model.materials.find(m=>m.pbrMetallicRoughness.baseColorTexture.index===texture);assert.equal(material.alphaMode,"BLEND");assert.equal(material.extras.skyShadowReceiver,false);}
});
test("map shadows retain native colours and do not cover transparent foliage",()=>{
 const scene=new THREE.Scene(),model=new THREE.Group(),renderer={shadowMap:{}};scene.add(model);
 for(const receiver of [true,false]){const material=new THREE.MeshBasicMaterial();material.userData.skyShadowReceiver=receiver;model.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),material));}
 const shadows=createMapShadows(THREE,renderer,scene,model,"rolent");assert.equal(shadows.overlays.length,1);assert.equal(shadows.overlays[0].material.depthWrite,false);assert.equal(shadows.overlays[0].material.side,THREE.DoubleSide);assert.equal(shadows.overlays[0].receiveShadow,true);assert.equal(renderer.shadowMap.autoUpdate,false);assert.equal(renderer.shadowMap.needsUpdate,true);
});

import {createTouchControls} from "../activity/touch-controls.mjs";
function touchFixture(){const calls=[],timers=new Map();let next=0;const controls=createTouchControls({tap:p=>calls.push(["tap",p]),action:p=>calls.push(["action",p]),camera:p=>calls.push(["camera",p]),setTimer:fn=>{timers.set(++next,fn);return next;},clearTimer:id=>timers.delete(id)});const event=(id,x=100,y=100)=>({pointerId:id,clientX:x,clientY:y});return {controls,calls,event,hold(){for(const [id,fn] of [...timers]){timers.delete(id);fn();}}};}
test("touch taps move only on release; long presses interact once without moving",()=>{
 const f=touchFixture();f.controls.down(f.event(1));assert.equal(f.calls.length,0);f.controls.up(f.event(1));assert.equal(f.calls[0][0],"tap");f.hold();assert.equal(f.calls.length,1);
 f.controls.down(f.event(2));f.hold();f.controls.up(f.event(2));assert.deepEqual(f.calls.map(c=>c[0]),["tap","action"]);
});
test("touch drags and cancellations never cause accidental actions or walking",()=>{
 const f=touchFixture();f.controls.down(f.event(1));f.controls.move(f.event(1,140));f.hold();f.controls.up(f.event(1,140));assert.equal(f.calls.length,0);
 f.controls.down(f.event(2));f.controls.up(f.event(2),true);f.hold();assert.equal(f.calls.length,0);
 f.controls.down(f.event(3));f.controls.reset();f.hold();f.controls.up(f.event(3));assert.equal(f.calls.length,0);
});
test("two finger camera gestures cancel long presses and never trigger leftover taps",()=>{
 const f=touchFixture();f.controls.down(f.event(1,100));f.controls.down(f.event(2,200));f.hold();f.controls.move(f.event(2,220,120));assert.equal(f.calls.length,1);assert.equal(f.calls[0][0],"camera");assert.ok(f.calls[0][1].scale<1);assert.equal(f.calls[0][1].dx,10);
 f.controls.up(f.event(2,220,120));f.controls.up(f.event(1));assert.equal(f.calls.length,1);
});

import {positionOf,avatarAtPosition} from "../activity/avatar-state.mjs";
test("local prop changes preserve predicted position without retaining stale appearance",()=>{
 const old={id:"old",character:"Kanone",prop:null,x:3,y:0,z:5};
 const next=avatarAtPosition({id:"avatar:current",character:"Kanone",prop:"barrel",x:1,y:0,z:1},old);
 assert.equal(next.prop,"barrel");assert.equal(next.id,"avatar:current");assert.deepEqual(positionOf(next),{x:3,y:0,z:5});
 const found=avatarAtPosition({...next,prop:null,character:"Phyllis"},{...old,prop:"barrel"});assert.equal(found.prop,null);assert.equal(found.character,"Phyllis");assert.deepEqual(Object.keys(positionOf(found)),["x","y","z"]);
});

test("keyboard layouts select distinct movement keys and keyboard opening preserves world size",async()=>{
 const {movementKeys,viewportSize,CAMERA_PITCH,CAMERA_ZOOM}=await import("../activity/controls.mjs");
 assert.equal(movementKeys("AZERTY").up,"z");assert.equal(movementKeys("AZERTY").left,"q");assert.equal(movementKeys("QWERTY").up,"w");assert.equal(movementKeys("QWERTY").left,"a");
 const full={width:390,height:844},short={width:390,height:360};assert.deepEqual(viewportSize(full,short,true),full);assert.deepEqual(viewportSize(full,short,false),short);assert.deepEqual(viewportSize(full,{width:844,height:390},true),{width:844,height:390});assert.equal(CAMERA_PITCH,Math.PI/4);assert.equal(CAMERA_ZOOM,5.5);
});

test("damage feedback uses confirmed HP losses, including lethal hits, without replaying snapshots",async()=>{
 const {damageAmount}=await import("../activity/damage-effects.mjs");
 assert.equal(damageAmount(undefined,{hp:75}),0);assert.equal(damageAmount({hp:100},{hp:75}),25);assert.equal(damageAmount({hp:75},{hp:75}),0);assert.equal(damageAmount({hp:75},{hp:100}),0);assert.equal(damageAmount({hp:20},{hp:0}),20);assert.equal(damageAmount({hp:100,npc:true},{hp:75,npc:true}),0);
});


test('duel introduction follows the FC presentation order and never replays an expired match',async()=>{
 const {duelPhase}=await import('../activity/duel-intro.mjs');const duel={startsAt:1000,readyAt:10000};
 assert.equal(duelPhase(duel,500).kind,'overview');assert.equal(duelPhase(duel,3000).side,0);
 assert.equal(duelPhase(duel,5000).side,1);assert.equal(duelPhase(duel,7500).kind,'versus');
 assert.equal(duelPhase(duel,9500).kind,'begin');assert.equal(duelPhase(duel,10000),null);assert.equal(duelPhase(null,0),null);
});


test('sprite shadows project the silhouette along the light and retain ground height',async()=>{
 const {projectShadow,shadowDirection,shadowBasis}=await import('../activity/avatar-shadow.mjs');
 const p={x:2,y:2,z:3};const east=projectShadow(p,0,{x:1,y:1,z:0});assert.deepEqual(east,{x:0,y:.022,z:3});
 const west=projectShadow(p,0,{x:-1,y:1,z:0});assert.equal(west.x,4);
 const upstairs=projectShadow(p,1,{x:1,y:1,z:0});assert.equal(upstairs.x,1);assert.equal(upstairs.y,1.022);
 assert.notDeepEqual(shadowDirection(.25),shadowDirection(.75));
 const light=shadowDirection(.5),basis=shadowBasis(light);assert.equal(Math.abs(basis.right.x*light.x+basis.right.z*light.z),0);assert.ok(Math.hypot(basis.right.x,basis.right.z)>.99);
});

test('duel replay retains only the last twenty frames',async()=>{
 const {replayWindow}=await import('../activity/duel-finish.mjs');const frames=[];for(let i=0;i<100;i++)replayWindow(frames,i);
 assert.equal(frames.length,20);assert.equal(frames[0],80);assert.equal(frames.at(-1),99);
});


test('cinematic markers replay preparation, release, impact slow motion and the defeated body',async()=>{
 const {cinematicPhase,CINEMATIC_DURATION}=await import('../activity/cinematic.mjs');
 const attack={kind:'craft',started:1000,releaseAt:1800,impactAt:2400};
 assert.deepEqual(cinematicPhase(0,attack,2500),{kind:'hero',progress:0,time:900});
 assert.equal(cinematicPhase(1600,attack,2500).time,1800);
 assert.equal(cinematicPhase(3500,attack,2500).kind,'impact');
 assert.equal(cinematicPhase(3700,attack,2500).time,2360);
 assert.equal(cinematicPhase(5200,attack,2500).time,2800);
 assert.equal(cinematicPhase(CINEMATIC_DURATION,attack,2500).progress,1);
 assert.equal(cinematicPhase(3500,null,2500).time,2460);
});

test('cinematic projectile tracking retains actual ricochets and vertical movement',async()=>{
 const {trajectoryPoint}=await import('../activity/cinematic.mjs');
 const points=[{t:0,x:0,y:3,z:0},{t:.5,x:5,y:2,z:0},{t:1,x:5,y:1,z:5}];
 assert.deepEqual(trajectoryPoint(points,.25),{x:2.5,y:2.5,z:0});
 assert.deepEqual(trajectoryPoint(points,.75),{x:5,y:1.5,z:2.5});
 assert.equal(trajectoryPoint(points,2).z,5);
 assert.deepEqual(trajectoryPoint([],1,{x:8,y:0,z:1}),{x:8,y:0,z:1});
});

test('scene history interpolates locally without changing recorded world states',async()=>{
 const {historyPair}=await import('../activity/cinematic.mjs');
 const history=[{time:1000,position:{x:0}},{time:1100,position:{x:1}}],before=structuredClone(history);
 assert.equal(historyPair(history,1050).progress,.5);
 assert.equal(historyPair(history,500).a.time,1000);
 assert.equal(historyPair(history,1500).b.time,1100);
 assert.deepEqual(history,before);assert.equal(historyPair([],1000),null);
});


test('cinematic materials keep native day/night shaders without changing live colours',async()=>{
 const {cloneReplayMaterial}=await import('../activity/duel-finish.mjs');
 const source=new THREE.MeshBasicMaterial({color:0xffccaa});source.onBeforeCompile=shader=>{shader.uniforms.testLight={value:.3};};source.customProgramCacheKey=()=> 'night';
 const clone=cloneReplayMaterial(source),shader={uniforms:{}};clone.onBeforeCompile(shader);assert.equal(shader.uniforms.testLight.value,.3);assert.equal(clone.customProgramCacheKey(),'night');clone.color.set(0x000000);assert.equal(source.color.getHex(),0xffccaa);assert.notEqual(clone,source);clone.dispose();source.dispose();
});
