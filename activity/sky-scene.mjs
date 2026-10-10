import {createRooftopSky,removeNativeBackdrop} from "./rooftop-sky.mjs";
import {createAirshipScene} from './airship-scene.mjs';
import hangarWorld from './hangar-world.cjs';
import {loadLynx} from './lynx-model.mjs';
import airshipPhysics from './airship-physics.cjs';
import airshipConfig from './assets/sky/liberl/airship.json';
import {createMovingPlatformView} from "./moving-platform-view.mjs";
import {createSupportEffects} from "./support-effects.mjs";
import dungeonMechanics from "./dungeon-mechanics.cjs";
import {createDungeonEffects} from "./dungeon-effects.mjs";
import {createEnemyEffects} from "./enemy-effects.mjs";
import {createTowerTeam} from "./tower-team.mjs";
import {createTavernBeer} from "./tavern-beer.mjs";
import tavernWorld from "./tavern-world.cjs";
import {createAvatarShadow} from "./avatar-shadow.mjs";
import {createDuelFinish} from "./duel-finish.mjs";
import {createDuelIntro} from "./duel-intro.mjs";
import flight from "./flight.cjs";
import {createDayNight} from "./day-night.mjs";
import {createRenneCombat} from "./renne-animation.mjs";
import {createCraftCapture} from "./craft-capture.mjs";
import {createCombatControls} from "./combat-controls.mjs";
import renneMechanics from "./native-combat.cjs";
import terminalWorld from "./terminal-world.cjs";
import {createDamageEffects,damageAmount,newDamageEvents} from "./damage-effects.mjs";
import {CAMERA_PITCH,CAMERA_ZOOM,movementKeys,keyboardLayout,viewportSize} from "./controls.mjs";
import {positionOf,avatarAtPosition} from "./avatar-state.mjs";
import { createTouchControls } from "./touch-controls.mjs";
import { cameraDistance, configureSkyMaterial, createMapShadows, createContactShadow } from "./sky-rendering.mjs";
import { createArenaCutaway, versionAsset } from "./scene-visibility.mjs";
import { createShotPrediction } from "./shot-prediction.mjs";
import collisionModule from "./surface-collision.cjs";
import { createProjectilePlayback } from "./projectile.mjs";
import { createPomEffects } from "./pom-effects.mjs";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { createDialogues } from "./dialogue.mjs";
import { needsCorrection } from "./reconciliation.mjs";
import { advance, route, nearestCell, pointAt, facing } from "./movement.mjs";
export const ASSETS = new URL(
  new URLSearchParams(location.search).has("frame_id")
    ? "/.proxy/assets/sky/"
    : "./assets/sky/",
  location.href,
);
export async function createSkyScene(canvas, map = "anterose") {
  if(map==='liberl')return createAirshipScene(canvas,ASSETS);
  const inTower=/^tower[1-4]$/.test(map);
  const mapAssets = ["anterose","hangar"].includes(map) ? ASSETS : new URL(map + "/", ASSETS);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: false,
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(inTower?0x06080b:0x201b18);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene(),
    walkingCamera = new THREE.OrthographicCamera(-12, 12, 8, -8, 0.1, map === "rolent" ? 350 : 150),
    avatars = new Map(),
    catalogue = await fetch(new URL("characters.json", ASSETS),{cache:"no-store"}).then((r) =>
      r.json(),
    );
  if(inTower)Object.assign(catalogue,await fetch(new URL("enemies/catalogue.json",ASSETS),{cache:"no-store"}).then(r=>r.json()));
  const supportEffects=createSupportEffects(THREE,scene);
  const bossPanel=document.createElement('div');bossPanel.id='sky-boss';bossPanel.hidden=true;bossPanel.style.cssText='position:fixed;top:64px;left:50%;transform:translateX(-50%);padding:8px 18px;background:#211624e8;border:1px solid #dfb075;color:#ffe0a0;font:18px AveriaSky,sans-serif;z-index:25;pointer-events:none;text-align:center';document.body.append(bossPanel);
  const enemyEffects=inTower?createEnemyEffects(THREE,scene):null;
  const flightCamera=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.08,350);
  let camera=walkingCamera,wasFlying=false,flightMotion={moving:false,dx:0,dz:0};
  const version = new URL(import.meta.url).searchParams.get("v") ?? "rooftop-sky-20261009-4";
  const loading = new THREE.LoadingManager();
  loading.setURLModifier(url => versionAsset(url, version));
  const cutaway = map === "arena" ? createArenaCutaway() : null;
  renderer.localClippingEnabled = !!cutaway;
  const loaded = map==="hangar"?{scene:new THREE.Group()}:await new GLTFLoader(loading).loadAsync(
    new URL("anterose.gltf", mapAssets).href,
  );
  const model = new THREE.Group();model.add(loaded.scene);
  if(map==="tower4")removeNativeBackdrop(model);
  const rooftopSky=map==="tower4"?await createRooftopSky(THREE,scene,mapAssets,loading):null;
  const towerLayout=inTower?await fetch(versionAsset(new URL("layout.json",mapAssets),version)).then(r=>r.json()):null;
  const teamPanel=inTower?createTowerTeam(ASSETS,catalogue):null;
  const terminal=map==="anterose"?await fetch(versionAsset(new URL("capel.json",ASSETS),version)).then(r=>r.json()):null;
  let terminalObject=null;
  if(terminal){const asset=await new GLTFLoader(loading).loadAsync(new URL(terminal.model,ASSETS).href);terminalObject=asset.scene;terminalObject.position.set(terminal.position.x,terminal.position.y,terminal.position.z);terminalObject.rotation.y=terminal.rotation;model.add(terminalObject);}

  scene.add(model);
  let lynxObject=null;
  if(map==='hangar'||map==='anterose'){
   const deck=new THREE.Group();if(map==='anterose')deck.position.set(airshipConfig.door.x,airshipConfig.door.y,airshipConfig.door.z+12);model.add(deck);
   const paving=document.createElement('canvas');paving.width=paving.height=128;const ctx=paving.getContext('2d');ctx.fillStyle='#807765';ctx.fillRect(0,0,128,128);ctx.strokeStyle='#625c50';ctx.lineWidth=3;ctx.strokeRect(0,0,128,128);ctx.beginPath();ctx.moveTo(0,64);ctx.lineTo(128,64);ctx.moveTo(64,0);ctx.lineTo(64,64);ctx.moveTo(32,64);ctx.lineTo(32,128);ctx.stroke();const stone=new THREE.CanvasTexture(paving);stone.colorSpace=THREE.SRGBColorSpace;stone.wrapS=stone.wrapT=THREE.RepeatWrapping;stone.repeat.set(10,12);
   const floor=new THREE.Mesh(new THREE.PlaneGeometry(20,24),new THREE.MeshBasicMaterial({map:stone,side:THREE.DoubleSide}));floor.rotation.x=-Math.PI/2;deck.add(floor);
   const lynx=await loadLynx(THREE,ASSETS,10,loading);deck.add(lynx);if(map==='hangar')lynxObject=lynx;

  }
  let hangarDoor=null,wasNearHangarDoor=null;
  if(map==='anterose'){
   hangarDoor=new THREE.Group();hangarDoor.position.set(airshipConfig.door.x,airshipConfig.door.y,airshipConfig.door.z);
   const door=new THREE.Mesh(new THREE.BoxGeometry(2.8,3,.5),new THREE.MeshBasicMaterial({color:0x564333,transparent:true,opacity:0,depthWrite:false}));door.position.y=1.15;hangarDoor.add(door);model.add(hangarDoor);
  }
  model.updateMatrixWorld(true);
  const collision = collisionModule.createSurfaceCollision(THREE, model);
  model.traverse((object) => {
    if (object.isMesh) {
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      for (const material of materials) {
        configureSkyMaterial(material);
        if (material.transparent) object.renderOrder=3;
        if (cutaway) {
          material.clippingPlanes = cutaway.planes;
          material.clipIntersection = true;
          material.needsUpdate = true;
        }
        if (material.map) {
          material.map.magFilter = THREE.NearestFilter;
          material.map.minFilter = THREE.LinearFilter;
          material.map.needsUpdate = true;
        }
      }
    }
  });
  const tavernBeer=map==="anterose"?createTavernBeer(THREE,scene):null;
  const mapShadows=createMapShadows(THREE,renderer,scene,model,map);
  const dayNight=createDayNight(THREE,model,map,mapShadows,map==='hangar'?[{position:[-3.6,1.3,0],color:[1,.1,.1],radius:3,strength:.8},{position:[3.6,1.3,0],color:[.1,1,.3],radius:3,strength:.8}]:towerLayout?.torches??[]);
  const dungeonEffects=inTower?await createDungeonEffects(THREE,scene,ASSETS,towerLayout):null;
  const duelIntro=map==="arena"?createDuelIntro():null;
  let grid = await fetch(versionAsset(new URL("navigation.json", mapAssets), version), { cache: "no-store" }).then((r) =>
    r.json(),
  );
  if(map==="hangar")grid=hangarWorld.grid;
  if(terminal)grid=terminalWorld.terminalNavigation(grid,terminal);
  const spectatorGrid = map === "arena" ? await fetch(versionAsset(new URL("spectator-navigation.json", mapAssets), version)).then(r => r.json()) : null;
  const movingPlatforms=inTower&&towerLayout.movingPlatforms?.length?await createMovingPlatformView(THREE,scene,ASSETS,towerLayout,grid,dayNight):null;
  const airBounds=flight.flightBounds(grid);
  let walkingGrid = grid, movementAllowed = true;
  const propCatalogue = map === "rolent" ? await fetch(new URL("props.json", mapAssets)).then(r => r.json()) : {};
  const propModels = new Map();
  const shadowCanvas=document.createElement("canvas");shadowCanvas.width=64;shadowCanvas.height=64;
  const shadowContext=shadowCanvas.getContext("2d"), gradient=shadowContext.createRadialGradient(32,32,4,32,32,31);
  gradient.addColorStop(0,"rgba(0,0,0,.85)");gradient.addColorStop(.5,"rgba(0,0,0,.5)");gradient.addColorStop(1,"rgba(0,0,0,0)");
  shadowContext.fillStyle=gradient;shadowContext.fillRect(0,0,64,64);
  const shadowTexture=new THREE.CanvasTexture(shadowCanvas);
  function attachShadow(avatar,id) {
    if (id.startsWith("world:pom"))return avatar;
    dayNight.apply(avatar.mesh);
    avatar.shadow=avatar.prop?createContactShadow(THREE,shadowTexture):createAvatarShadow(THREE,avatar,collision,map);scene.add(avatar.shadow);return avatar;
  }
  function removeAvatar(avatar) {
    scene.remove(avatar.mesh);
    if(avatar.shadow){scene.remove(avatar.shadow);avatar.shadow.geometry.dispose();avatar.shadow.material.dispose();}
    if (!avatar.prop) { avatar.mesh.geometry.dispose(); if(avatar.battleTextures){avatar.initialTexture.dispose();for(const texture of avatar.battleTextures.values())texture.dispose();}else{avatar.initialTexture.dispose();avatar.walkingTexture?.dispose();} avatar.mesh.material.dispose(); }
  }
  const dialogues = await createDialogues(ASSETS);
  const spawn = grid.spawn ?? pointAt(grid, nearestCell(grid, { x: 0, z: 0 }));
  const renneCombat=(map==="arena"||inTower)?await createRenneCombat(THREE,scene,ASSETS):null;
  let notifyCapture=()=>{};
  const duelFinish=map==="arena"?createDuelFinish(THREE,renderer,scene,ASSETS,event=>notifyCapture(event),()=>queueAction("leave_duel"),model):null;
  const craftCapture=(renneCombat&&!inTower)?createCraftCapture(THREE,renderer,scene,ASSETS,event=>notifyCapture(event)):null;
  const combatControls=createCombatControls((kind,event)=>startAttack(kind,event));
  function aimForAttack(event,groundOnly=false) {
    const me=avatars.get(localId);if(!me)return null;
    if(event){pointer.set(event.clientX/viewport.width*2-1,1-event.clientY/viewport.height*2);raycaster.setFromCamera(pointer,camera);const candidates=groundOnly?[]:[...avatars].filter(([id,a])=>id!==localId&&!a.npc&&!a.dead);const hit=raycaster.intersectObjects([model,...candidates.map(([,a])=>a.mesh)],true).find(hit=>(!groundOnly||(hit.face&&Math.abs(hit.face.normal.clone().applyNormalMatrix(new THREE.Matrix3().getNormalMatrix(hit.object.matrixWorld)).y)>.45))&&(!cutaway||!model.getObjectById(hit.object.id)||cutaway.visible(hit.point)));if(hit){const avatar=candidates.find(([,a])=>a.mesh.id===hit.object.id)?.[1];return avatar?{...avatar.position}:{x:hit.point.x,y:hit.point.y,z:hit.point.z};}if(groundOnly)return null;}
    const dx=me.heading.dx||0,dz=me.heading.dz||-1,length=Math.hypot(dx,dz)||1;
    const point={x:me.position.x+dx/length*4,y:me.position.y,z:me.position.z+dz/length*4};
    const ground=collision.floor(point.x,point.z,point.y+.6);if(ground!==null)point.y=ground;return point;
  }
  let craftTarget=false,lastCombatDash=null;
  function startAttack(kind,event=cursor,confirmed=false) {
    const me=avatars.get(localId);if(!renneCombat||!connected||!me||!renneMechanics.combatSpec(me.character,kind)||me.dead||health.hp===0||health.spectator||renneCombat.current(localId)||!combatControls.ready(kind))return false;
    const spec=renneMechanics.combatSpec(me.character,kind);let target;
    if(spec.groundTarget&&!confirmed){craftTarget=true;combatControls.targeting('craft');marker.visible=true;return true;}
    if(spec.effect==='heal'&&inTower&&event){pointer.set(event.clientX/viewport.width*2-1,1-event.clientY/viewport.height*2);raycaster.setFromCamera(pointer,camera);const allies=[...avatars].filter(([,a])=>!a.enemy&&!a.npc&&!a.dead);const hit=raycaster.intersectObjects(allies.map(([,a])=>a.mesh),true)[0];target=allies.find(([,a])=>a.mesh.id===hit?.object.id)?.[0];}
    const aim=spec.effect?{...me.position}:aimForAttack(event,spec.groundTarget);if(!aim)return false;
    craftTarget=false;combatControls.targeting(null);
    const action=queueAction("attack",undefined,aim,undefined,{kind,target});if(!action)return false;
    const predicted=renneCombat.predict(action.id,me.position,aim,kind,localId,me.character);if(!predicted){actionQueue.splice(actionQueue.indexOf(action),1);return false;}
    if(spec.dash){localJump=null;jumpPending=false;}
    marker.visible=false;combatControls.started(kind,me.character);
    if(__ACTIVITY_PREVIEW__&&!new URLSearchParams(location.search).has("frame_id"))renneCombat.accept(action.id);
    return true;
  }

  const projectiles = new Map(), effects = new Map(), flying = new Map();
  const raycaster = new THREE.Raycaster(),
    pointer = new THREE.Vector2(),
    keys = new Set();
  let movementSequence = 0;
  let movementTrace = [];
  let localJump=null,jumpPending=false,jumpClockOffset=0,jumpReadyAt=0;
  const recordMovement = (point) => {
    movementTrace.push({ ...point, sequence: ++movementSequence });
    if (movementTrace.length > 1024) movementTrace.shift();
  };
  let path = [],
    yaw = 0,
    pitch = CAMERA_PITCH,
    drag = null,
    zoom = map==="hangar"?8.5:CAMERA_ZOOM,
    follow = new THREE.Vector3(spawn.x, spawn.y, spawn.z),
    localId = null,
    connected = true,
    lastTime = performance.now(),
    disposed = false;
  const actionQueue = [];
  const predictedShots = new Map();
  let notifyAction = () => {},notifyTerminal=()=>{};
  let environment = { npcs: [], poms: [], pom: null, receivedAt: 0 },
    health = { hp: 100 },
    respawn = 0;
  const menu = document.createElement("div"),
    status = document.createElement("div"),
    labels = document.createElement("div");
  labels.id = "sky-labels";
  const nameplates = new Map();
  menu.id = "sky-actions";
  menu.hidden = true;
  status.id = "sky-combat";
  const style = document.createElement("style");
  style.textContent =
    "#sky-labels{position:fixed;inset:0;pointer-events:none;z-index:8}.sky-nameplate{position:absolute;transform:translate(-50%,-100%);color:#ffe8b5;font:16px AveriaSky,sans-serif;text-shadow:1px 1px 2px #000;background:#211c2a9c;border-radius:3px;padding:2px 6px;white-space:nowrap}.sky-hp{height:4px;background:#4c2222;margin-top:3px}.sky-hp i{display:block;height:100%;background:#94d375}#sky-actions{position:fixed;z-index:30;padding:6px;background:#211c2aee;border:2px solid #d9c28d;border-radius:5px;color:white;font:18px AveriaSky,sans-serif}#sky-actions button{display:block;width:100%;text-align:left;padding:8px 12px;background:transparent;color:#fff;border:0;cursor:pointer;font:inherit}#sky-actions button:hover{background:#61537f}#sky-combat{position:fixed;bottom:16px;left:16px;z-index:12;background:#211c2ade;color:#ffe7b0;padding:10px 14px;border:1px solid #c6b27d;border-radius:5px;font:18px AveriaSky,sans-serif;pointer-events:none;white-space:pre-line;max-width:calc(100vw - 64px)}";
  document.head.append(style);
  document.body.append(menu, status, labels);
  const touchButton=document.createElement("button");
  touchButton.id="sky-touch-action";touchButton.type="button";touchButton.textContent="Actions";
  touchButton.setAttribute("aria-pressed","false");
  touchButton.title="Actions";
  if(matchMedia("(any-pointer:coarse)").matches)document.body.dataset.skyTouch="true";
  let touchArmed=false;
  function disarmTouch(){touchArmed=false;touchButton.setAttribute("aria-pressed","false");touchButton.textContent="Actions";}
  touchButton.addEventListener("click",()=>{touchArmed=!touchArmed;touchButton.setAttribute("aria-pressed",String(touchArmed));touchButton.textContent=touchArmed?"Touchez la cible":"Actions";});
  const touchStyle=document.createElement("style");
  touchStyle.textContent="#sky-touch-action{display:none;position:fixed;right:12px;bottom:80px;z-index:25;min-height:48px;min-width:104px;padding:10px 14px;background:#ead29c;color:#241b15;border:2px solid #b49760;border-radius:6px;font:17px AveriaSky,sans-serif;touch-action:manipulation}#sky-touch-action[aria-pressed=true]{background:#ffc569}#sky-touch-action:disabled{opacity:.45}body[data-sky-touch] #sky-touch-action{display:block}@media(any-pointer:coarse){#sky-touch-action{display:block}}@media(max-width:600px){#hud{top:8px!important;left:8px!important;max-width:calc(100vw - 160px)!important;padding:6px 8px!important;font-size:11px!important}#hud h1{font-size:15px!important}#sky-prophunt{top:66px!important;right:8px!important;max-width:calc(100vw - 40px)!important;font-size:13px!important;padding:8px!important}#sky-combat{bottom:70px;left:8px;max-width:calc(100vw - 145px);font-size:13px;padding:6px 8px}#sky-actions button{min-height:44px}.sky-nameplate{font-size:13px}}";
  document.head.append(touchStyle);document.body.append(touchButton);
  const touches=createTouchControls({
    tap:event=>{if(!connected)return;if(touchArmed){disarmTouch();interaction(event);}else click(event);},
    action:event=>{disarmTouch();interaction(event);},
    camera:({dx,dy})=>{menu.hidden=true;yaw+=flight.cameraTurn(dx,avatars.get(localId)?.character==="Sieg");if(avatars.get(localId)?.character==="Sieg")pitch=Math.max(-1.48,Math.min(1.48,pitch+(dy??0)*.006));},
  });
  const oldHelp = document.getElementById("aide");
  if (oldHelp) oldHelp.hidden = true;
  function queueAction(type, target, aim, text, extras = {}) {
    if (actionQueue.length >= 8) return;
    const action = { id: crypto.randomUUID(), type, target, aim, text, ...extras };
    actionQueue.push(action);
    menu.hidden = true;
    notifyAction();
    return action;
  }
  function startJump(){
    const me=avatars.get(localId);if(!inTower||!me||me.character==="Sieg"||localJump||Date.now()+jumpClockOffset<jumpReadyAt||!connected||!movementAllowed||health.hp<=0)return;
    const stick=combatControls.vector(),horizontal=Number(keys.has("arrowright")||keys.has(movementKeys(keyboardLayout()).right))-Number(keys.has("arrowleft")||keys.has(movementKeys(keyboardLayout()).left))+stick.x,vertical=Number(keys.has("arrowup")||keys.has(movementKeys(keyboardLayout()).up))-Number(keys.has("arrowdown")||keys.has(movementKeys(keyboardLayout()).down))-stick.y;
    const right=new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld,0),forward=new THREE.Vector3();camera.getWorldDirection(forward);forward.y=0;forward.normalize();
    let dx=right.x*horizontal+forward.x*vertical,dz=right.z*horizontal+forward.z*vertical;
    if(!horizontal&&!vertical&&path.length){dx=path[0].x-me.position.x;dz=path[0].z-me.position.z;}const length=Math.hypot(dx,dz);const direction={dx:length?dx/length:0,dz:length?dz/length:0};
    const action=queueAction("jump",undefined,undefined,undefined,{direction,origin:{...me.position},started:Date.now()+jumpClockOffset});if(!action)return;localJump={id:action.id,started:Date.now()+jumpClockOffset,origin:{...me.position},...direction};jumpReadyAt=Date.now()+jumpClockOffset+1250;jumpPending=true;path=[];marker.visible=false;
  }
  const jumpButton=document.createElement("button");jumpButton.id="sky-jump";jumpButton.type="button";jumpButton.textContent="↥";jumpButton.title=jumpButton.ariaLabel="Sauter";jumpButton.hidden=!inTower;jumpButton.addEventListener("click",()=>{startJump();jumpButton.blur();});document.body.append(jumpButton);
  touchStyle.textContent+="#sky-jump{position:fixed;right:12px;bottom:145px;width:54px;height:54px;border-radius:50%;border:1px solid #d5bc84;background:#292137;color:#ffe7b0;font:30px system-ui;z-index:27;touch-action:manipulation}#sky-jump[hidden]{display:none}#sky-jump:disabled{opacity:.45}body[data-sky-editing] #sky-jump{display:none}body[data-sky-touch] #sky-jump{left:136px;right:auto;bottom:146px}@media(any-pointer:coarse),(max-width:600px){#sky-jump{left:136px;right:auto;bottom:146px}}";
  function interaction(event) {
    const me = avatars.get(localId);
    if (!connected || !me || health.hp === 0) return;
    const nearby = (p, r = 2.2) =>
      Math.hypot(p.x - me.position.x, p.z - me.position.z) <= r &&
      Math.abs((p.y ?? 0) - me.position.y) < 1.8;
    pointer.set(
      (event.clientX / viewport.width) * 2 - 1,
      1 - (event.clientY / viewport.height) * 2,
    );
    raycaster.setFromCamera(pointer, camera);
    if (environment.game?.role === "hunter" && environment.game.phase === "hunting") {
      const targets = [...avatars].filter(([id,a]) => id !== localId && a.prop);
      const hit = raycaster.intersectObjects([model,...targets.map(([,a]) => a.mesh)],true).find(h => !cutaway || !model.getObjectById(h.object.id) || cutaway.visible(h.point));
      if (hit) {
        const target = targets.find(([,a]) => a.mesh.getObjectById(hit.object.id));
        queueAction("hunt_find", target?.[0], {x:hit.point.x,y:hit.point.y,z:hit.point.z});
      }
      return;
    }
    if(terminal&&terminalWorld.terminalNearby(me.position,terminal)&&raycaster.intersectObject(terminalObject,true).length){menu.hidden=true;path=[];notifyTerminal();return;}
    if (health.spectator) return;
    const ball = environment.poms.find(p => p.owner === localId) ?? environment.poms.filter(p => p.mode === "rest" && nearby(p,2)).sort((a,b)=>Math.hypot(a.x-me.position.x,a.z-me.position.z)-Math.hypot(b.x-me.position.x,b.z-me.position.z))[0];
    if (ball?.owner === localId) {
      const targets = [
        model,
        ...[...avatars]
          .filter(([id, a]) => id !== localId && id !== "world:pom" && !a.npc)
          .map(([, a]) => a.mesh),
      ];
      const hit = raycaster.intersectObjects(targets, true).find(hit => !cutaway || !model.getObjectById(hit.object.id) || cutaway.visible(hit.point));
      let aim;
      if (hit) {
        aim = hit.point.clone();
        const isPlayer = [...avatars.values()].some(
          (a) => a.mesh === hit.object && !a.npc,
        );
        if (
          !isPlayer &&
          hit.face &&
          Math.abs(
            hit.face.normal.clone().transformDirection(hit.object.matrixWorld)
              .y,
          ) > 0.65
        )
          aim.y += 0.65;
      } else
        aim = raycaster.ray.intersectPlane(
          new THREE.Plane(new THREE.Vector3(0, 1, 0), -(me.position.y + 0.9)),
          new THREE.Vector3(),
        );
      if (aim && !predictedShots.has(ball.id) && !actionQueue.length) {
        const simulation = createShotPrediction(grid, collision, me.position, { x: aim.x, y: aim.y, z: aim.z });
        if (!simulation) return;
        const action = queueAction("throw", undefined, { x: aim.x, y: aim.y, z: aim.z });
        if (action) {
          predictedShots.set(ball.id, { action: action.id, confirmed: false });
          projectiles.get(ball.id)?.predict(simulation);
          effects.get(ball.id)?.launch({ x: aim.x - me.position.x, y: aim.y - me.position.y - .9, z: aim.z - me.position.z });
        }
      }
      return;
    }
    if(hangarDoor&&airshipPhysics.airshipNearby(me.position,airshipConfig.door)&&raycaster.intersectObject(hangarDoor,true).length){queueAction('hangar_enter');return;}
    if(lynxObject&&airshipPhysics.airshipNearby(me.position,airshipConfig.lobby,6)&&raycaster.intersectObject(lynxObject,true).length){queueAction('flight_board');return;}
    const options = [];
    if(hangarDoor&&airshipPhysics.airshipNearby(me.position,airshipConfig.door))options.push(['Accéder au Lynx','hangar_enter',undefined]);
    if(lynxObject&&airshipPhysics.airshipNearby(me.position,airshipConfig.lobby,6))options.push(['Piloter le Lynx','flight_board',undefined]);
    if(towerLayout){if(Number(map.slice(5))<4&&nearby(towerLayout.exit))options.push(["Monter","tower_step","up"]);if(Number(map.slice(5))>1&&nearby(towerLayout.start))options.push(["Descendre","tower_step","down"]);}

    if(tavernBeer&&tavernWorld.beerNearby(me.position))options.push(["Boire une bi\u00e8re","drink",undefined]);
    const residents = environment.npcs
      .filter((n) => nearby(n) && Math.abs(n.y - me.position.y) < 0.6)
      .sort(
        (a, b) =>
          Math.hypot(a.x - me.position.x, a.z - me.position.z) -
          Math.hypot(b.x - me.position.x, b.z - me.position.z),
      );
    for (const n of residents)
      options.push(["Parler à " + n.name, "talk", n.id]);
    if (ball?.mode === "rest" && nearby(ball, 2))
      { queueAction("pickup", ball.id); return; }
    menu.replaceChildren();
    for (const [label, type, target] of options) {
      const b = document.createElement("button");
      b.textContent = label;
      b.addEventListener("click", () => queueAction(type, target));
      menu.append(b);
    }
    menu.hidden = !options.length;
    menu.style.left = Math.min(event.clientX, innerWidth - 260) + "px";
    menu.style.top = Math.min(event.clientY, innerHeight - 180) + "px";
  }
  const damageEffects=await createDamageEffects(THREE,scene,labels,new URL("effects/fire-frames.png",ASSETS),loading);
  const textureLoader = new THREE.TextureLoader(loading);
  const textures = new Map();
  const marker = new THREE.Mesh(
    new THREE.RingGeometry(0.15, 0.22, 24),
    new THREE.MeshBasicMaterial({
      color: 0xffd984,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    }),
  );
  marker.rotation.x = -Math.PI / 2;
  marker.visible = false;
  scene.add(marker);
  async function setAvatar(player) {
    let avatar = avatars.get(player.id);
    const dead = player.hp === 0;
    const prop = propCatalogue[player.prop] ? player.prop : null;
    const character = (catalogue[player.character]||renneMechanics.COMBAT[player.character])
      ? player.character
      : "Estelle";
    if (avatar && avatar.character === character && avatar.dead === dead && avatar.prop === prop) {
      avatar.displayName = player.nom ?? player.name ?? player.character;
      avatar.hp = player.hp ?? 100;
      avatar.platformRenderOffset=avatar.platformId===player.platformId?avatar.platformRenderOffset:null;avatar.platformId=player.platformId;avatar.platformOffset=player.platformOffset;avatar.shield=player.shield??null;
      avatar.maxHp=player.maxHp??100;avatar.enemy=!!player.enemy;avatar.enemyAttack=player.attack;avatar.jump=player.jump;
      avatar.npc = !!player.npc;
      avatar.walking = !!player.moving;
      avatar.speed = player.speed ?? 0.8;
      if (player.heading) avatar.heading = player.heading;
      avatar.target = { x: player.x, y: player.y ?? 0, z: player.z };
      return avatar;
    }
    if (avatar) {
      removeAvatar(avatar);
    }
    if (prop) {
      if (!propModels.has(prop)) propModels.set(prop, new GLTFLoader(loading).loadAsync(new URL(propCatalogue[prop].model,mapAssets).href));
      const content = (await propModels.get(prop)).scene.clone(true);
      const box = new THREE.Box3().setFromObject(content), size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
      const scale = propCatalogue[prop].height / size.y;
      content.scale.multiplyScalar(scale);
      content.position.set(-center.x*scale,-box.min.y*scale,-center.z*scale);
      const mesh = new THREE.Group(); mesh.add(content); scene.add(mesh);
      avatar = {mesh,prop,character,dead,hp:player.hp??100,info:{height:1},position:{x:player.x??spawn.x,y:player.y??spawn.y,z:player.z??spawn.z},target:null,heading:{dx:0,dz:-1},time:0};
      attachShadow(avatar,player.id);avatars.set(player.id,avatar); return avatar;
    }
    const baseInfo = (catalogue[character]??renneMechanics.COMBAT[character]?.banks["0"]);
    const battle=renneCombat&&renneCombat.metadataFor(character);
    const combatAssets=battle?await renneCombat.load(character):null;
    const info = battle ? (combatAssets.metadata.banks[dead?"4":"0"]??combatAssets.metadata.banks["0"]) :
      dead && baseInfo.death
        ? {
            ...baseInfo.death,
            height:
              (baseInfo.height * baseInfo.death.frameHeight) /
              baseInfo.frameHeight,
          }
        : baseInfo;
    const textureKey = character + (dead && baseInfo.death ? ":death" : "");
    if (baseInfo.death && !textures.has(character + ":death"))
      textures.set(
        character + ":death",
        textureLoader.loadAsync(new URL(baseInfo.death.texture, ASSETS).href),
      );
    if (!textures.has(textureKey))
      textures.set(
        textureKey,
        textureLoader.loadAsync(new URL(info.texture, ASSETS).href),
      );
    const base = await textures.get(textureKey),
      texture = base.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    texture.repeat.set(1 / info.columns, 1 / info.rows);
    texture.needsUpdate = true;
    let walkingTexture=null;
    if(!battle&&!dead&&baseInfo.walk){const key=character+':walk';if(!textures.has(key))textures.set(key,textureLoader.loadAsync(new URL(baseInfo.walk.texture,ASSETS).href));walkingTexture=(await textures.get(key)).clone();walkingTexture.colorSpace=THREE.SRGBColorSpace;walkingTexture.magFilter=walkingTexture.minFilter=THREE.NearestFilter;walkingTexture.repeat.set(1/baseInfo.walk.columns,1/baseInfo.walk.rows);walkingTexture.needsUpdate=true;}
    const geometry = new THREE.PlaneGeometry(
      (info.height * info.frameWidth) / info.frameHeight,
      info.height,
    );
    geometry.translate(info.centerX??0,info.centerY??(player.id.startsWith("world:pom") ? 0 : info.height / 2),0);
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.15,
        depthWrite: true,
        side: THREE.DoubleSide,
      }),
    );
    scene.add(mesh);
    avatar = {
      mesh,
      prop,
      character,
      displayName: player.nom ?? player.name ?? player.character,
      dead,
      hp: player.hp ?? 100,damageSequence:player.damageSequence??0,damageEvents:player.damageEvents,
      platformId:player.platformId,platformOffset:player.platformOffset,shield:player.shield??null,maxHp:player.maxHp??100,enemy:!!player.enemy,enemyAttack:player.attack,jump:player.jump,
      npc: !!player.npc,
      walking: !!player.moving,
      speed: player.speed ?? 0.8,
      initialTexture:texture,walkingTexture,walkingInfo:baseInfo.walk,
      battleTextures:battle?new Map([...combatAssets.textures].map(([bank,base])=>{const clone=base.clone();clone.needsUpdate=true;return [bank,clone];})):null,
      fallbackDeath: dead && !baseInfo.death && (!battle||!battle.banks["4"]),
      info,
      position: {
        x: player.x ?? spawn.x,
        y: player.y ?? spawn.y,
        z: player.z ?? spawn.z,
      },
      target: null,
      direction: 6,
      heading: player.heading ?? { dx: 0, dz: -1 },
      time: 0,
    };
    attachShadow(avatar,player.id);
    avatars.set(player.id, avatar);
    return avatar;
  }
  let viewport={width:innerWidth,height:innerHeight};
  function resize() {
    const editing=!!document.activeElement?.closest?.("input,textarea,[contenteditable]");
    viewport=viewportSize(viewport,{width:innerWidth,height:innerHeight},editing);
    const aspect=viewport.width/viewport.height;
    camera.left=-zoom*aspect;camera.right=zoom*aspect;camera.top=zoom;camera.bottom=-zoom;
    flightCamera.aspect=aspect;flightCamera.updateProjectionMatrix();
    camera.updateProjectionMatrix();renderer.setSize(viewport.width,viewport.height,false);
    canvas.style.width=viewport.width+"px";canvas.style.height=viewport.height+"px";
  }
  let cursor={clientX:innerWidth/2,clientY:innerHeight/2};
  function keyboardInteraction() {
    const me=avatars.get(localId);if(!me||health.hp===0||health.spectator)return;
    if(hangarDoor&&airshipPhysics.airshipNearby(me.position,airshipConfig.door)){queueAction('hangar_enter');return;}
    if(lynxObject&&airshipPhysics.airshipNearby(me.position,airshipConfig.lobby,6)&&(!terminal||Math.hypot(me.position.x-airshipConfig.lobby.x,me.position.z-airshipConfig.lobby.z)<Math.hypot(me.position.x-terminal.position.x,me.position.z-terminal.position.z))){queueAction('flight_board');return;}
    if(terminal&&terminalWorld.terminalNearby(me.position,terminal)){path=[];notifyTerminal();return;}
    const ball=environment.poms.find(p=>p.owner===localId);
    if(ball || environment.game?.role==="hunter") {interaction(cursor);return;}
    const nearby=environment.npcs.filter(n=>Math.hypot(n.x-me.position.x,n.z-me.position.z)<=2.2 && Math.abs(n.y-me.position.y)<.6).sort((a,b)=>Math.hypot(a.x-me.position.x,a.z-me.position.z)-Math.hypot(b.x-me.position.x,b.z-me.position.z));
    const pom=environment.poms.filter(p=>p.mode==="rest"&&Math.hypot(p.x-me.position.x,p.z-me.position.z)<=2 && Math.abs(p.y-me.position.y)<1.8).sort((a,b)=>Math.hypot(a.x-me.position.x,a.z-me.position.z)-Math.hypot(b.x-me.position.x,b.z-me.position.z))[0];
    if(towerLayout&&Number(map.slice(5))<4&&Math.hypot(me.position.x-towerLayout.exit.x,me.position.z-towerLayout.exit.z)<2.2){queueAction("tower_step","up");return;}
    if(towerLayout&&Number(map.slice(5))>1&&Math.hypot(me.position.x-towerLayout.start.x,me.position.z-towerLayout.start.z)<2.2){queueAction("tower_step","down");return;}
    if(lynxObject&&airshipPhysics.airshipNearby(me.position,airshipConfig.lobby,6)){queueAction('flight_board');return;}
    if(tavernBeer&&tavernWorld.beerNearby(me.position))queueAction("drink");else if(pom)queueAction("pickup",pom.id);else if(nearby[0])queueAction("talk",nearby[0].id);
  }
  function keydown(event) {
    if (!connected || !movementAllowed) return;
    if (document.querySelector("#sky-terminal[open]") || event.target.closest?.("input,textarea,select,button,[contenteditable]"))
      return;
    if(event.code==="Escape"){craftTarget=false;combatControls.targeting(null);marker.visible=false;return;}
    if(inTower&&event.code==="KeyX"){if(!event.repeat)keyboardInteraction();return;}
    if(!event.repeat && ["KeyF","KeyG","KeyC"].includes(event.code)){event.preventDefault();startAttack({KeyF:"basic",KeyG:"craft",KeyC:"art"}[event.code]);return;}
    if(event.code === "Space") {event.preventDefault();if(avatars.get(localId)?.character==="Sieg"){keys.add(" ");return;}if(!event.repeat){if(inTower)startJump();else keyboardInteraction();}return;}
    if (
      [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        " ",
        "z",
        "q",
        "s",
        "d",
        "w",
        "a",
        "e",
        "r",
        "Control",
      ].includes(event.key)
    ) {
      event.preventDefault();
      keys.add(event.key.toLowerCase());
    }
  }
  function keyup(event) {
    keys.delete(event.key.toLowerCase());
  }
  function blur() {
    keys.clear();craftTarget=false;
    endDrag();touches.reset();disarmTouch();
  }
  function click(event) {
    if (event.button !== 0) return;
    menu.hidden = true;
    if(craftTarget){startAttack('craft',event,true);return;}
    if (health.hp === 0 || !movementAllowed) return;
    pointer.set(
      (event.clientX / viewport.width) * 2 - 1,
      (-event.clientY / viewport.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(model, true);
    if (!hits.length) return;
    const me = avatars.get(localId);
    if (!me||me.character==="Sieg") return;
    for (const hit of hits) {
      if (cutaway && !cutaway.visible(hit.point)) continue;
      const cell = nearestCell(walkingGrid, hit.point);
      if (!cell) continue;
      const destination = pointAt(walkingGrid, cell);
      if (
        Math.hypot(destination.x - hit.point.x, destination.z - hit.point.z) >
          walkingGrid.step * 1.5 ||
        Math.abs(destination.y - hit.point.y) > 0.3
      )
        continue;
      const next = route(walkingGrid, me.position, destination);
      if (!next.length) continue;
      path = next;
      marker.position.set(destination.x, destination.y + 0.03, destination.z);
      marker.visible = true;
      break;
    }
  }
  function pointerdown(event) {
    if (!connected) return;
    if (event.pointerType==="touch") {
      event.preventDefault();document.body.dataset.skyTouch="true";menu.hidden=true;touches.down(event);canvas.setPointerCapture(event.pointerId);return;
    }
    if (event.button !== 2) {
      click(event);
      return;
    }
    event.preventDefault();
    drag = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
    canvas.setPointerCapture(event.pointerId);
  }
  function pointermove(event) {
    cursor={clientX:event.clientX,clientY:event.clientY};
    if(touches.has(event.pointerId)){event.preventDefault();touches.move(event);return;}
    if (!drag || event.pointerId !== drag.id) return;
    if (
      Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 5
    )
      drag.moved = true;
    if (!drag.moved) return;
    menu.hidden = true;
    yaw += flight.cameraTurn(event.clientX-drag.x,avatars.get(localId)?.character==="Sieg");
    if(avatars.get(localId)?.character==="Sieg")pitch=Math.max(-1.48,Math.min(1.48,pitch+(event.clientY-drag.y)*.006));
    drag.x = event.clientX;
    drag.y = event.clientY;
  }
  function endDrag(event) {
    if(event&&touches.has(event.pointerId)){
      touches.up(event,event.type!=="pointerup");
      if(canvas.hasPointerCapture(event.pointerId))canvas.releasePointerCapture(event.pointerId);return;
    }
    const previous = drag;
    drag = null;
    if (event?.type === "pointerup" && previous && !previous.moved)
      interaction(event);
    if (previous && canvas.hasPointerCapture(previous.id))
      canvas.releasePointerCapture(previous.id);
  }
  function contextmenu(event) {
    event.preventDefault();
  }

  function wheel(event) {
    event.preventDefault();

  }
  canvas.addEventListener("pointerdown", pointerdown);
  canvas.addEventListener("pointermove", pointermove);
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);
  canvas.addEventListener("lostpointercapture", endDrag);
  canvas.addEventListener("contextmenu", contextmenu);
  canvas.addEventListener("wheel", wheel, { passive: false });
  addEventListener("keydown", keydown);
  addEventListener("keyup", keyup);
  addEventListener("blur", blur);
  addEventListener("resize", resize);
  resize();
  function render(time) {
    if (disposed) return;
    if (time - lastTime < 33) {
      requestAnimationFrame(render);
      return;
    }
    const seconds = Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;
    const me = avatars.get(localId),isFlying=me?.character==="Sieg"&&!me.prop&&!me.dead;
    if(isFlying!==wasFlying){wasFlying=isFlying;camera=isFlying?flightCamera:walkingCamera;pitch=isFlying?.25:CAMERA_PITCH;path=[];keys.clear();marker.visible=false;resize();}
    if(hangarDoor&&connected&&me){const nearDoor=!isFlying&&airshipPhysics.airshipNearby(me.position,airshipConfig.door,1.3);if(nearDoor&&wasNearHangarDoor===false&&health.hp>0&&!actionQueue.some(a=>a.type==='hangar_enter'))queueAction('hangar_enter');wasNearHangarDoor=nearDoor;}
    if(towerLayout?.physicalExit&&connected&&me&&health.hp>0&&!localJump&&!actionQueue.some(a=>a.type==='tower_step')&&Math.hypot(me.position.x-towerLayout.exit.x,me.position.z-towerLayout.exit.z)<.7&&Math.abs(me.position.y-towerLayout.exit.y)<.15)queueAction('tower_step','up');
    if(movingPlatforms){walkingGrid=movingPlatforms.update(Date.now()+jumpClockOffset,me,!!localJump);if(movingPlatforms.relative(me?.position??{},Date.now()+jumpClockOffset))movementTrace=[];}
    const distance=isFlying?3.4782608696:cameraDistance(map);
    if (keys.has("e")) yaw += seconds * 1.5;
    if (keys.has("r")) yaw -= seconds * 1.5;
    camera.position.set(
      follow.x + Math.sin(yaw) * Math.cos(pitch) * distance,
      follow.y + (isFlying?.4:0) + Math.sin(pitch) * distance,
      follow.z - Math.cos(yaw) * Math.cos(pitch) * distance,
    );
    if(isFlying){
      const target={x:follow.x,y:follow.y+.4,z:follow.z},desired={x:camera.position.x,y:camera.position.y,z:camera.position.z},hit=collision.sweep(target,desired,.1);
      if(hit){const length=Math.hypot(desired.x-target.x,desired.y-target.y,desired.z-target.z),fraction=Math.max(.01,(hit.distance-.12)/length);camera.position.set(target.x+(desired.x-target.x)*fraction,target.y+(desired.y-target.y)*fraction,target.z+(desired.z-target.z)*fraction);}
    }
    camera.lookAt(follow.x,follow.y+(isFlying?.4:0),follow.z);
    duelIntro?.update(time,avatars,camera,follow);
    camera.updateMatrixWorld();
    cutaway?.update(camera, follow);
    const right = {
        x: camera.matrixWorld.elements[0],
        z: camera.matrixWorld.elements[2],
      },
      forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    const airForward=forward.clone(),airRight=new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld,0);
    forward.y = 0;
    forward.normalize();
    combatControls.update({arena:map==="arena"||inTower,character:me?.character,connected,alive:health.hp>0,spectator:health.spectator,busy:!!renneCombat?.current(localId)||!movementAllowed,health:{...health,cooldowns:{}}});
    const stick=combatControls.vector();
    flightMotion={moving:false,dx:0,dz:0};
    if (me && !localJump && !renneCombat?.dash(localId) && health.hp > 0 && movementAllowed ) {
      const horizontal =
        Number(keys.has("arrowright") || keys.has(movementKeys(keyboardLayout()).right)) -
        Number(keys.has("arrowleft") || keys.has(movementKeys(keyboardLayout()).left)) + stick.x;
      const vertical =
        Number(keys.has("arrowup") || keys.has(movementKeys(keyboardLayout()).up)) -
        Number(keys.has("arrowdown") || keys.has(movementKeys(keyboardLayout()).down)) - stick.y;
      if(isFlying){
        const lift=Number(keys.has(" "))-Number(keys.has("control"));
        const direction=airForward.multiplyScalar(vertical).addScaledVector(airRight,horizontal);direction.y+=lift;
        path=[];marker.visible=false;flightMotion=flight.moveFlight(me.position,direction,seconds,airBounds,collision,recordMovement);
      }else if (horizontal || vertical) {
        const length = Math.hypot(horizontal, vertical),
          dx = (right.x * horizontal + forward.x * vertical) / length,
          dz = (right.z * horizontal + forward.z * vertical) / length;
        path = route(walkingGrid, me.position, {
          x: me.position.x + dx * 0.6,
          z: me.position.z + dz * 0.6,
        });
        marker.visible = false;
      }
    }
    jumpButton.hidden=!inTower||me?.character==="Sieg";
    jumpButton.disabled=!connected||Date.now()+jumpClockOffset<jumpReadyAt||health.hp<=0||!movementAllowed||!!localJump;
    for (const [id, avatar] of avatars) {
      const dash=avatar.dead?null:renneCombat?.dash(id);
      if(dash){Object.assign(avatar.position,dash.position);avatar.target={...dash.position};if(id===localId){path=[];movementTrace=[];}dash.event.dashFinished=!dash.active;}
      const carried=!dash&&id!==localId&&!avatar.jump&&movingPlatforms&&avatar.platformId&&avatar.platformOffset;
      let carriedMotion;
      if(carried){const p=movingPlatforms.simulation.position(avatar.platformId,Date.now()+jumpClockOffset);if(p){avatar.platformRenderOffset??={...avatar.platformOffset,y:0};carriedMotion=advance(avatar.platformRenderOffset,[{...avatar.platformOffset,y:0}],seconds,6);Object.assign(avatar.position,{x:p.x+avatar.platformRenderOffset.x,y:p.y,z:p.z+avatar.platformRenderOffset.z});}}
      const jump=dash?null:id===localId?localJump:avatar.jump;
      if(jump&&!avatar.dead)Object.assign(avatar.position,dungeonMechanics.jumpDisplayPosition(walkingGrid,jump,Date.now()+jumpClockOffset));
      const ballState = environment.poms.find(p => p.id === id),
        isPom = id.startsWith("world:pom");
      if (isPom && ballState && (ballState.mode !== "held" || predictedShots.has(id)))
        flying.set(id, projectiles.get(id)?.update(seconds, avatar.position));
      const motion = isPom
        ? {
            moving: ballState?.mode === "flight" || predictedShots.has(id),
            dx: ballState?.vx ?? 0,
            dz: ballState?.vz ?? 0,
          }
        : avatar.dead
          ? { moving: false, dx: 0, dz: 0 }
          : dash
            ? {moving:dash.active,dx:dash.event.aim.x-dash.event.origin.x,dz:dash.event.aim.z-dash.event.origin.z}
          : carriedMotion
            ? carriedMotion
          : jump
            ? {moving:true,dx:jump.dx,dz:jump.dz}
          : id === localId
            ? !movementAllowed ? {moving:false,dx:0,dz:0} : isFlying?flightMotion:advance(avatar.position, path, seconds, undefined, recordMovement)
            : avatar.character==="Sieg"&&!avatar.prop?flight.approachFlight(avatar.position,avatar.target,seconds):advance(
                avatar.position,
                avatar.target ? [avatar.target] : [],
                seconds,
                (avatar.npc||avatar.enemy) && id !== "world:pom" ? avatar.speed + 0.1 : 6,
              );
      if (motion.moving || avatar.walking || (avatar.character==="Sieg"&&!avatar.dead)) {
        if (motion.moving) avatar.heading = { dx: motion.dx, dz: motion.dz };
        avatar.time += seconds;
      } else if ((avatar.npc || avatar.enemyAttack) && !avatar.dead) avatar.time += seconds;
      else avatar.time = 0;
      if (!avatar.prop) {
      const attack=avatar.dead?null:renneCombat?.current(id);
      if(attack)avatar.heading={dx:attack.aim.x-attack.origin.x,dz:attack.aim.z-attack.origin.z};
      avatar.direction = facing(
        avatar.heading.dx,
        avatar.heading.dz,
        right,
        forward,
      );
      let info=avatar.info,selectedPose;
      if(!avatar.battleTextures&&avatar.walkingTexture){info=motion.moving?avatar.walkingInfo:avatar.info;avatar.mesh.material.map=motion.moving?avatar.walkingTexture:avatar.initialTexture;}
      if(avatar.battleTextures){const selected=attack?renneCombat.pose(attack):{bank:avatar.dead?(avatar.battleTextures.has(4)?4:0):motion.moving?(avatar.battleTextures.has(1)?1:0):0,pose:avatar.dead?0:Math.floor(avatar.time*8)%Math.max(1,Math.floor((renneCombat.metadataFor(avatar.character).banks[motion.moving&&avatar.battleTextures.has(1)?1:0]??avatar.info).frames/8))};info=renneCombat.metadataFor(avatar.character).banks[selected.bank]??avatar.info;avatar.mesh.material.map=avatar.battleTextures.get(selected.bank);selectedPose=selected.pose;}
      if(avatar.character==="Sieg"&&time>=(avatar.floorCheckedAt??0)){avatar.flightFloor=collision.floor(avatar.position.x,avatar.position.z,avatar.position.y+.1);avatar.floorCheckedAt=time+100;}
      const beating=avatar.character==="Sieg"&&!avatar.dead&&flight.wingbeats(motion.moving||avatar.walking,avatar.position.y,avatar.flightFloor);
      const poses=avatar.enemyAttack&&!avatar.dead?info.attack??info.run:motion.moving||avatar.walking||beating?info.run:info.idle;
      const pose=selectedPose??poses[Math.floor(avatar.time*info.fps)%poses.length],frame=pose*8+(avatar.direction%(info.directions??8));
      avatar.renderFrame={pose,info};
      avatar.footOffset=!avatar.battleTextures&&!avatar.dead?(avatar.info.footOffsets?.[avatar.direction%(avatar.info.directions??8)]??0):0;
      avatar.perched=avatar.character==="Sieg"&&!avatar.dead&&!beating;
      avatar.mesh.material.map.offset.set((frame%info.columns)/info.columns,1-(Math.floor(frame/info.columns)+1)/info.rows);
      }
      avatar.mesh.position.set(
        avatar.position.x,
        avatar.position.y-(avatar.footOffset??0)*(avatar.character==="Sieg"&&!avatar.perched?camera.matrixWorld.elements[5]:1)-(avatar.perched?Math.max(0,avatar.position.y-avatar.flightFloor):0),
        avatar.position.z,
      );
      if(avatar.shadow&&!avatar.shadow.userData.update)avatar.shadow.position.set(avatar.position.x,avatar.position.y+.018,avatar.position.z);
      if (!avatar.prop) {
      avatar.mesh.rotation.z = avatar.fallbackDeath ? Math.PI / 2 : 0;
      if(avatar.character==="Sieg"&&!avatar.dead&&!avatar.perched)avatar.mesh.quaternion.copy(camera.quaternion);
      else if(avatar.character==="Sieg")avatar.mesh.rotation.set(0,Math.atan2(camera.matrixWorld.elements[8],camera.matrixWorld.elements[10]),0);
      else avatar.mesh.rotation.y = Math.atan2(camera.matrixWorld.elements[8],camera.matrixWorld.elements[10]);
      }
    }
    renneCombat?.update(localId,craftCapture,camera,avatars);
    damageEffects.update(seconds,camera,avatars,viewport.width,viewport.height);
    if (me)
      follow.lerp(
        new THREE.Vector3(me.position.x*(map==="hangar"?.35:1), me.position.y, me.position.z*(map==="hangar"?.35:1)),
        1 - Math.exp(-seconds * 7),
      );
    if(craftTarget&&me&&!me.dead&&connected){const point=aimForAttack(cursor,true),target=point&&renneMechanics.attackPoint(me.position,point,'craft',me.character);marker.visible=!!target;if(target){marker.position.set(target.x,target.y+.06,target.z);marker.scale.setScalar(2.5);}}else {craftTarget=false;combatControls.targeting(null);marker.scale.setScalar(1);if(!path.length)marker.visible=false;}
    for (const ball of environment.poms) {
      const pomAvatar = avatars.get(ball.id);
      if (!pomAvatar) continue;
      if (ball.owner && !predictedShots.has(ball.id)) {
        const owner = avatars.get(ball.owner);
        if (owner) {
          pomAvatar.mesh.position.copy(owner.mesh.position);
          pomAvatar.mesh.position.y += 0.9;
          pomAvatar.mesh.position.x += right.x * 0.3;
          pomAvatar.mesh.position.z += right.z * 0.3;
        }
      }
      effects.get(ball.id)?.update(seconds, pomAvatar.mesh.position, flying.get(ball.id), camera);
    }
    if (health.hp === 0) {
      const remaining = Math.max(
        0,
        Math.ceil(
          (health.deadUntil - health.serverTime) / 1000 -
            (performance.now() - health.received) / 1000,
        ),
      );
      status.textContent = "0 / 100 PV · Réapparition dans " + remaining + " s";
    }
    for (const [id, a] of avatars) {
      if (id.startsWith("world:pom") || a.prop) { if(nameplates.has(id)) nameplates.get(id).hidden=true; continue; }
      let label = nameplates.get(id);
      if (!label) {
        label = document.createElement("div");
        label.className = "sky-nameplate";
        labels.append(label);
        nameplates.set(id, label);
      }
      const p = new THREE.Vector3(
        a.position.x,
        a.position.y + a.info.height + 0.15,
        a.position.z,
      ).project(camera);
      label.style.left = ((p.x + 1) * viewport.width) / 2 + "px";
      label.style.top = ((1 - p.y) * viewport.height) / 2 + "px";
      label.hidden = p.z > 1 || Math.abs(p.x) > 1.1 || Math.abs(p.y) > 1.1;
      if (
        label.dataset.hp !== String(a.hp) ||
        label.dataset.name !== a.displayName
      ) {
        label.replaceChildren();
        label.append(document.createTextNode(a.displayName));
        if (!a.npc) {
          const bar = document.createElement("div"),
            fill = document.createElement("i");
          bar.className = "sky-hp";
          fill.style.width = 100*a.hp/(a.maxHp??100) + "%";
          if(a.enemy)fill.style.background="#e76552";
          bar.append(fill);
          label.append(bar);
        }
        label.dataset.hp = String(a.hp);
        label.dataset.name = a.displayName;
      }
    }
    for (const [id, label] of nameplates)
      if (!avatars.has(id)) {
        label.remove();
        nameplates.delete(id);
      }
    enemyEffects?.animate();supportEffects.update(avatars,Date.now()+jumpClockOffset);
    dungeonEffects?.update();
    const lightState=dayNight.update();
    rooftopSky?.update(camera,lightState);
    for(const avatar of avatars.values())avatar.shadow?.userData.update?.(time,lightState);
    dialogues.update(time, avatars, camera);
    renderer.render(scene, camera);
    craftCapture?.update(time);
    duelFinish?.update(time,avatars,camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
  return {
    spawn,
    catalogue,
    ...(__ACTIVITY_PREVIEW__ ? { setDayTime:time=>dayNight.setTime(time), dayTime:()=>dayNight.state(), localAvatar:()=>{const a=avatars.get(localId);return a?{id:localId,character:a.character,prop:a.prop,pose:Math.round(a.info.rows*(1-a.mesh.material.map.offset.y)-1),position:{...a.position},footY:a.mesh.position.y+(a.footOffset??0)*(a.character==="Sieg"&&!a.perched?camera.matrixWorld.elements[5]:1),perched:!!a.perched}:null;}, renderInfo:()=>({calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,perspective:camera.isPerspectiveCamera===true,pitch,camera:camera.position.toArray(),shadows:!!mapShadows,receivers:mapShadows?.overlays.length??0}), projectilePosition: id => { const a=avatars.get(id); return a ? {x:a.mesh.position.x,y:a.mesh.position.y,z:a.mesh.position.z} : null; } } : {}),
    onAction(callback) { notifyAction = callback; },
    onTerminal(callback) {notifyTerminal=callback;},
    onCraftCapture(callback){notifyCapture=callback;},
    attack:startAttack,
    captureNotice(text){status.textContent=text;},
    terminalPoint(){return terminal?{...terminal.position,y:terminal.position.y+.7}:null;},
    lynxPoint(){return lynxObject?{...airshipConfig.lobby,y:airshipConfig.lobby.y+.9}:null;},
    setConnected(value) { connected = value; touchButton.disabled=!value||health.hp===0||!!health.spectator||health.canMove===false; if (!value) { touches.reset();disarmTouch(); path=[]; keys.clear(); marker.visible=false; } },
    async resetSession(player) { touches.reset();disarmTouch();actionQueue.length=0; predictedShots.clear(); for (const playback of projectiles.values()) playback.cancelPrediction(); path=[]; movementTrace=[]; movementSequence=0; keys.clear(); localJump=null;jumpPending=false;marker.visible=false; localId=player.id; await setAvatar(player); Object.assign(avatars.get(localId).position,positionOf(player)); connected=false; },
    messages(messages) {
      dialogues.receive(messages);
    },
    speak(text,rp=false) {
      if (!connected || !text.trim()) return false;
      if (__ACTIVITY_PREVIEW__ && !new URLSearchParams(location.search).has("frame_id")) { this.say(text); return true; }
      return !!queueAction("say", undefined, undefined, text.trim(),{rp});
    },
    say(text) {
      if (!__ACTIVITY_PREVIEW__) return;
      dialogues.receive([
        {
          id: crypto.randomUUID(),
          author: localId,
          character: avatars.get(localId)?.character ?? "Estelle",
          text,
        },
      ]);
    },
    async demoConversation() {
      if (!__ACTIVITY_PREVIEW__) return;
      const me = avatars.get(localId);
      if (!me) return;
      const character = me.character === "Joshua" ? "Estelle" : "Joshua";
      const place = pointAt(
        grid,
        nearestCell(grid, { x: me.position.x - 3, z: me.position.z - 1 }),
      );
      const id = "preview-companion";
      await setAvatar({ id, character, ...place });
      dialogues.receive([
        {
          id: crypto.randomUUID(),
          author: localId,
          character: me.character,
          text: "Salut " + character + " !",
        },
        {
          id: crypto.randomUUID(),
          author: id,
          character,
          text: "Bonjour " + me.character + " !",
        },
      ]);
    },
    async me(player) {
      localId = player.id;
      await setAvatar({ ...spawn, ...player });
    },
    async sync(players) {
      const present = new Set([localId]);
      for (const player of players) {
        const before=avatars.get(player.id);if(before?.hp>0&&player.hp>before.hp)damageEffects.heal(player.id,player.hp-before.hp);
        const lost=damageAmount(before,player);
        const events=newDamageEvents(before,player);
        if(events.length)for(const event of events)damageEffects.hit(player.id,event.amount,false,Math.min(.3,(event.at-events[0].at)/1000));
        else if(lost&&!player.damageEvents)damageEffects.hit(player.id,lost);
        if (player.id === localId) {
          const current = avatars.get(localId);
          if (current && (current.dead !== (player.hp === 0) || current.prop !== (propCatalogue[player.prop] ? player.prop : null) || current.character !== (catalogue[player.character]?player.character:"Estelle")))
            await setAvatar(avatarAtPosition(player,current.position));
          else if (current) {current.hp = player.hp ?? 100;current.shield=player.shield??null;}
          const updated=avatars.get(localId);if(updated){updated.damageSequence=player.damageSequence??0;updated.damageEvents=player.damageEvents;}
          continue;
        }
        present.add(player.id);
        await setAvatar(player);
        const updated=avatars.get(player.id);if(updated){updated.damageSequence=player.damageSequence??0;updated.damageEvents=player.damageEvents;}
      }
      for (const [id, avatar] of avatars)
        if (!present.has(id)) {
          removeAvatar(avatar);
          avatars.delete(id);
        }
    },
    async world(result) {
      teamPanel?.update(result.team);
      enemyEffects?.update(result.enemies??[],result.health?.serverTime??Date.now());
      dialogues.receive((result.enemies??[]).filter(e=>e.utterance&&e.hp>0).map(e=>({id:e.utterance.id,author:e.id,character:e.name,text:e.utterance.text})));
      const boss=(result.enemies??[]).find(e=>e.boss);bossPanel.hidden=!boss; if(boss){bossPanel.textContent=boss.name+' · '+boss.hp+' / '+boss.maxHp+' PV';}
      renneCombat?.receive(result.combat?.attacks??[],result.health?.serverTime??Date.now());
      const dash=result.health?.combatDash;
      if(dash&&dash!==lastCombatDash){lastCombatDash=dash;const me=avatars.get(localId);if(me&&!renneCombat?.dash(localId))Object.assign(me.position,result.position);path=[];movementTrace=[];localJump=null;craftTarget=false;}
      dayNight.sync(result.health?.serverTime);jumpClockOffset=(result.health?.serverTime??Date.now())-Date.now();
      if(inTower){jumpClockOffset=(result.health?.serverTime??Date.now())-Date.now();if(!jumpPending)jumpReadyAt=result.health?.jumpReadyAt??0;dungeonEffects.receive(result.fire??[],result.health?.serverTime??Date.now());const confirmed=result.health?.jump;
        if(confirmed){localJump=confirmed;jumpPending=false;path=[];movementTrace=[];}
        else if(localJump&&(!jumpPending||result.actionResult?.id===localJump.id)){localJump=null;jumpPending=false;movementTrace=[];path=[];const a=avatars.get(localId);if(a)Object.assign(a.position,result.position);}
      }
      duelIntro?.receive(result.duel?.result?null:result.duel,result.health?.serverTime);
      duelFinish?.receive(result.duel,localId,result.health?.serverTime);
      if(result.characterChanged){const me=avatars.get(localId);if(me)Object.assign(me.position,result.position);path=[];movementTrace=[];keys.clear();}
      environment = {
        game: result.game,
        npcs: result.npcs ?? [],
        pom: result.pom ?? null,
        poms: result.poms ?? (result.pom ? [{...result.pom,id:result.pom.id ?? "world:pom"}] : []),
        receivedAt: performance.now(),
      };
      if(result.actionResult?.error){const event=renneCombat?.actions.get(result.actionResult.id);if(event){renneCombat.reject(event.id);combatControls.rejected(event.kind);if(renneMechanics.combatSpec(event.character,event.kind)?.dash){const me=avatars.get(localId);if(me)Object.assign(me.position,result.position);path=[];movementTrace=[];}}}
      combatControls.update({arena:map==="arena"||inTower,character:avatars.get(localId)?.character,connected,alive:result.health?.hp>0,spectator:result.health?.spectator,busy:!!renneCombat?.current(localId),health:result.health});
      for (const ball of environment.poms) {
        if (!projectiles.has(ball.id)) {
          projectiles.set(ball.id,createProjectilePlayback());
          effects.set(ball.id,await createPomEffects(THREE,scene,canvas,ASSETS));
        }
        const predicted = predictedShots.get(ball.id);
        if (predicted && result.actionResult?.id === predicted.action) {
          predicted.confirmed = !result.actionResult.error;
          if (result.actionResult.error) { projectiles.get(ball.id).cancelPrediction(); predictedShots.delete(ball.id); }
        }
        // Ignore a response for the previous poll while the click is still in flight.
        if (predicted && !predicted.confirmed && !result.actionResult?.error) continue;
        if (projectiles.get(ball.id).receive(ball)) effects.get(ball.id).launch();
        if (predicted?.confirmed && ball.mode !== "flight") predictedShots.delete(ball.id);
      }
      touchButton.disabled=!connected||result.health?.hp===0||!!result.health?.spectator||result.health?.canMove===false;
      if(touchButton.disabled)disarmTouch();
      const wasSpectator = !!health.spectator;
      health = { ...result.health, received: performance.now() };
      if (map === "arena" && wasSpectator !== !!health.spectator) { zoom=health.spectator?6.9565217391:CAMERA_ZOOM;resize(); }
      walkingGrid = health.spectator && spectatorGrid ? spectatorGrid : grid;
      movementAllowed = health.canMove !== false;
      if (!movementAllowed) { path=[]; keys.clear(); movementTrace=[]; marker.visible=false; }
      const me = avatars.get(localId);
      if (health.hp === 0 || (health.respawn ?? 0) !== respawn) {
        path = [];
        movementTrace = [];
        keys.clear();
        marker.visible = false;
        if (me) Object.assign(me.position, result.position);
      }
      respawn = health.respawn ?? 0;
      if (health.hp > 0) status.textContent = health.hp + " / 100 PV";
      if (health.spectator && map === "arena") status.textContent = "Tribunes : spectateur";
      if (environment.game) status.textContent = result.notice ?? "";
      if (result.actionResult?.error)
        status.textContent = result.actionResult.error;
      if (result.actionResult?.id === actionQueue[0]?.id) actionQueue.shift();
    },
    leaveDuel() { queueAction("leave_duel"); },
    action() {
      return actionQueue[0];
    },
    correct(position, submitted) {
      const me = avatars.get(localId);
      if(localJump||inTower&&health.jump||renneCombat?.dash(localId)||health.combatDash&&health.serverTime<health.combatLockedUntil||[...(renneCombat?.actions.values()??[])].some(e=>e.actor===localId&&!e.accepted&&!e.cancelled&&renneMechanics.combatSpec(e.character,e.kind)?.dash))return;
      if (me && needsCorrection(me.position, position, submitted,me.character==="Sieg")) {
        Object.assign(me.position, position);
        path = [];
        movementTrace = [];
      }
    },
    movement() {
      const pending=[...(renneCombat?.actions.values()??[])].find(e=>e.actor===localId&&!e.accepted&&!e.cancelled&&renneMechanics.combatSpec(e.character,e.kind)?.dash);
      return {
        ...(pending?.origin??this.position()),
        platform:movingPlatforms?.relative(this.position(),Date.now()+jumpClockOffset)??undefined,
        combatDash:lastCombatDash??undefined,
        trace: movementTrace.map((p) => ({ ...p })),
        sequence: movementSequence,
      };
    },
    acknowledgeMovement(sequence) {
      movementTrace = movementTrace.filter((p) => p.sequence > sequence);
    },
    screenPoint(point) {
      const p = new THREE.Vector3(point.x, point.y, point.z).project(camera);
      return {
        x: ((p.x + 1) * viewport.width) / 2,
        y: ((1 - p.y) * viewport.height) / 2,
      };
    },
    cameraAngles() {
      return { yaw, pitch, zoom };
    },
    position() {
      return avatars.get(localId)?.position ?? spawn;
    },
    dispose() {
      disposed = true;
      endDrag();
      canvas.removeEventListener("pointerdown", pointerdown);
      canvas.removeEventListener("pointermove", pointermove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      canvas.removeEventListener("lostpointercapture", endDrag);
      canvas.removeEventListener("contextmenu", contextmenu);
      canvas.removeEventListener("wheel", wheel);
      removeEventListener("keydown", keydown);
      removeEventListener("keyup", keyup);
      removeEventListener("blur", blur);
      removeEventListener("resize", resize);
      touches.reset();touchButton.remove();touchStyle.remove();
      rooftopSky?.dispose();dayNight.dispose();duelIntro?.dispose();duelFinish?.dispose();combatControls.dispose();craftCapture?.dispose();renneCombat?.dispose();
      teamPanel?.dispose();bossPanel.remove();enemyEffects?.dispose();movingPlatforms?.dispose();supportEffects.dispose();dungeonEffects?.dispose();jumpButton.remove();
      menu.remove();
      status.remove();
      labels.remove();
      style.remove();
      dialogues.dispose();
      damageEffects.dispose();
      for (const effect of effects.values()) effect.dispose();
      const materials = new Set(), maps = new Set();
      scene.traverse(object => { if (object.geometry) object.geometry.dispose(); for (const material of [].concat(object.material ?? [])) { materials.add(material); if (material.map) maps.add(material.map); } });
      for (const texture of maps) texture.dispose(); for (const material of materials) material.dispose();
      for (const pending of propModels.values()) pending.then(value => value.scene.traverse(object => { object.geometry?.dispose(); for(const material of [].concat(object.material??[])){ material.map?.dispose(); material.dispose(); } }));
      mapShadows?.light.shadow.dispose();
      shadowTexture.dispose();
      renderer.dispose();
    },
  };
}
