import {createHorrorMembranes} from './horror-membranes.mjs';
import {createHalloweenDungeonView} from './halloween-dungeon-view.mjs';
import {createSceneAssets} from './scene-assets.mjs';
import {createHalloweenScene} from './halloween-scene.mjs';
import sceneScript from './scene-script.cjs';
import {installCinematicStyle} from './cinematic-frame.mjs';
import halloweenResidents from './assets/sky/halloween/residents.json';
import {loadArenaModel,preloadArena} from './arena-preload.mjs';
import photoMechanics from './dorothy-photo.cjs';
import smokeMechanics from './nial-smoke.cjs';
import loeweMechanics from './loewe-collapse.cjs';
import dimensionMechanics from './weissmann-dimension.cjs';
import drinkingContest from './drinking-contest.cjs';
import {createDrinkingTable} from './drinking-table.mjs';
import spriteScale from './assets/sky/sprite-scale.json';
import {createArenaAudience} from './arena-audience.mjs';
import arenaIntroDefinition from './assets/sky/arena/intro.json';
import axisIntroDefinition from './assets/sky/axis/intro.json';
import {createTowerGates} from './tower-gates.mjs';
import {recordCorrection,recordDiagnostic} from './diagnostics.mjs';
import playerHealth from './player-health.cjs';
import {createJosetteView,combatKeyAction,fpsMouseLook} from './josette-view.mjs';
import projectionMechanics from './combat-projection.cjs';
import diveMechanics from './sieg-dive.cjs';
import {createSiegDiveView} from './sieg-dive-view.mjs';
import {createTavernTables} from './tavern-tables.mjs';
import {createRooftopSky,removeNativeBackdrop} from "./rooftop-sky.mjs";
import {AXIS_LIGHTS,createAxisSky,installSkyGlow} from "./axis-sky.mjs";
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
import cookingMechanics from './phyllis-cooking.cjs';
import patDriveMechanics from './pat-drive.cjs';
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
import {CAMERA_PITCH,CAMERA_ZOOM,movementKeys,keyboardLayout,viewportSize,remapKey} from "./controls.mjs";
import {positionOf,avatarAtPosition} from "./avatar-state.mjs";
import { createTouchControls } from "./touch-controls.mjs";
import { cameraDistance, configureSkyMaterial, createMapShadows, createContactShadow } from "./sky-rendering.mjs";
import { versionAsset } from "./scene-visibility.mjs";
import { createXRayPass } from "./xray-pass.mjs";
import { createCombatFeedback } from "./combat-feedback.mjs";
import combatMoves from "./combat-moves.cjs";
import { createShotPrediction } from "./shot-prediction.mjs";
import collisionModule from "./surface-collision.cjs";
import combatGround from "./combat-ground.cjs";
import { createProjectilePlayback } from "./projectile.mjs";
import { createPomEffects } from "./pom-effects.mjs";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { createDialogues } from "./dialogue.mjs";
import { needsCorrection } from "./reconciliation.mjs";
import { advance, route, nearestCell, pointAt, facing, cellAt } from "./movement.mjs";
import {shareTexture} from './shared-texture.mjs';
export const ASSETS = new URL(
  new URLSearchParams(location.search).has("frame_id")
    ? "/.proxy/assets/sky/"
    : "./assets/sky/",
  location.href,
);
export function prepareTrainingArena(){const version=new URL(import.meta.url).searchParams.get('v')??'rooftop-sky-20261009-4';return preloadArena(ASSETS,version);}
export async function createSkyScene(canvas, map = "anterose", {localTraining=false}={}) {
  installCinematicStyle();if(map==='liberl')return createAirshipScene(canvas,ASSETS);
  const inDungeon=/^hallow[1-5]$/.test(map),floorNumber=Number(map.slice(inDungeon?6:5)),inTower=/^tower[1-4]$/.test(map)||inDungeon;
  // the two duel venues: Grancel ("arena") and the top of the Axis Pillar ("axis")
  const isArena=map==='arena'||map==='axis';
  const canJump=inTower||isArena;
  const mapAssets = ["anterose","hangar"].includes(map) ? ASSETS : new URL(map + "/", ASSETS);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: false,
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(inTower?0x06080b:map==='axis'?0x8db9df:0x201b18);   // Axis: open sky above the sea of clouds
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene(),
    walkingCamera = new THREE.OrthographicCamera(-12, 12, 8, -8, 0.1, map === "rolent" ? 350 : 150),
    avatars = new Map(),
    catalogue = await fetch(new URL("characters.json", ASSETS),{cache:"no-store"}).then((r) =>
      r.json(),
    );
  if(inTower||isArena||map==='halloween')Object.assign(catalogue,await fetch(new URL("enemies/catalogue.json",ASSETS),{cache:"no-store"}).then(r=>r.json()));
  if(map==="halloween")Object.assign(catalogue,await fetch(new URL("halloween/catalogue.json",ASSETS)).then(r=>r.json()));
  const combatPreparation=(isArena||inTower&&!inDungeon)?createRenneCombat(THREE,scene,ASSETS):null;combatPreparation?.catch(()=>{});
  const supportEffects=createSupportEffects(THREE,scene);
  const photoWhite=document.createElement('div');photoWhite.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:18;background:#fff;opacity:0';document.body.append(photoWhite);const photoGhosts=new Map();
  const blindness=document.createElement('div');blindness.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:19;background:radial-gradient(ellipse at center,transparent 5%,rgba(0,0,0,.85) 48%,#000 80%);transition:opacity .15s;opacity:0';document.body.append(blindness);
  const bossPanel=document.createElement('div');bossPanel.id='sky-boss';bossPanel.hidden=true;bossPanel.style.cssText='position:fixed;top:64px;left:50%;transform:translateX(-50%);padding:8px 18px;background:#211624e8;border:1px solid #dfb075;color:#ffe0a0;font:18px AveriaSky,sans-serif;z-index:25;pointer-events:none;text-align:center';document.body.append(bossPanel);
  const enemyEffects=inTower&&!inDungeon?createEnemyEffects(THREE,scene):null;
  const flightCamera=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.08,350);
  let localCombo=null;let cookingHeld=false;let patDrive=null,patDriveId=null;let wasIntro=false;let camera=walkingCamera,wasFlying=false,wasFPS=false,flightMotion={moving:false,dx:0,dz:0};
  const version = new URL(import.meta.url).searchParams.get("v") ?? "rooftop-sky-20261009-4";
  const loading = new THREE.LoadingManager();
  loading.setURLModifier(url => versionAsset(url, version));
  // Walls are no longer cut away around the action: fighters and effects show through them instead (xray-pass.mjs).
  const cutaway = null, xray = isArena ? createXRayPass(THREE) : null;
  renderer.localClippingEnabled = !!cutaway;
  const loaded = map==="hangar"?{scene:new THREE.Group()}:isArena?await loadArenaModel(ASSETS,version,map):await new GLTFLoader(loading).loadAsync(
    new URL("anterose.gltf", mapAssets).href,
  );
  const model = new THREE.Group();model.add(loaded.scene);model.userData.noXRay=true;
  if(map==="tower4")removeNativeBackdrop(model);
  const rooftopSky=map==="tower4"?await createRooftopSky(THREE,scene,mapAssets,loading):map==="axis"?await createAxisSky(THREE,scene,mapAssets,loading):null;
  const towerLayout=inTower?await fetch(versionAsset(new URL("layout.json",mapAssets),version)).then(r=>r.json()):null;
  const teamPanel=inTower&&!inDungeon?createTowerTeam(ASSETS,catalogue):null;
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
        if(material.userData?.horrorDecal)object.raycast=()=>{};
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
  const skyGlow=map==="axis"?installSkyGlow(model):null;
  const tavernBeer=map==="anterose"?createTavernBeer(THREE,scene):null;
  const tavernTables=map==='anterose'?await createTavernTables(THREE,model,collision,ASSETS):null;
  const horrorMembranes=inDungeon?await createHorrorMembranes(model,ASSETS,towerLayout.membranes):null;
  const halloweenDecor=inDungeon?await createHalloweenDungeonView(model,ASSETS,towerLayout):null;
  const mapShadows=createMapShadows(THREE,renderer,scene,model,map);
  const dayNight=createDayNight(THREE,model,map,mapShadows,map==='axis'?AXIS_LIGHTS:tavernTables?tavernTables.lights:map==='hangar'?[{position:[-3.6,1.3,0],color:[1,.1,.1],radius:3,strength:.8},{position:[3.6,1.3,0],color:[.1,1,.3],radius:3,strength:.8}]:towerLayout?.lights??towerLayout?.torches??[]);
  halloweenDecor?.install();
  const towerGates=inTower?await createTowerGates(THREE,scene,ASSETS,towerLayout,floorNumber):null;
  const dungeonEffects=inTower&&!inDungeon?await createDungeonEffects(THREE,scene,ASSETS,towerLayout):null;
  const duelIntro=isArena?createDuelIntro({assets:ASSETS,venue:map,onSpeech:message=>dialogues.receive([message])}):null;
  let grid = await fetch(versionAsset(new URL("navigation.json", mapAssets), version), { cache: "no-store" }).then((r) =>
    r.json(),
  );
  if(map==="hangar")grid=hangarWorld.grid;
  if(terminal)grid=terminalWorld.terminalNavigation(grid,terminal);
  const spectatorGrid = isArena ? await fetch(versionAsset(new URL("spectator-navigation.json", mapAssets), version)).then(r => r.json()) : null;
  const movingPlatforms=inTower&&towerLayout.movingPlatforms?.length?await createMovingPlatformView(THREE,scene,ASSETS,towerLayout,grid,dayNight):null;
  const arenaAudience=map==='arena'?await createArenaAudience(THREE,scene,ASSETS,catalogue,arenaIntroDefinition,cutaway):null;
  const introCamera=isArena?new THREE.PerspectiveCamera(53.2,innerWidth/innerHeight,.08,250):null;
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
    avatar.shadow=avatar.prop?createContactShadow(THREE,shadowTexture):createAvatarShadow(THREE,avatar,collision,map);avatar.shadow.userData.noXRay=true;scene.add(avatar.shadow);return avatar;
  }
  function removeAvatar(avatar) {
    scene.remove(avatar.mesh);
    if(avatar.shadow){scene.remove(avatar.shadow);avatar.shadow.geometry.dispose();avatar.shadow.material.dispose();}
    if (!avatar.prop) { avatar.mesh.geometry.dispose(); if(avatar.battleTextures){avatar.initialTexture.dispose();for(const texture of avatar.battleTextures.values())texture.dispose();}else{avatar.initialTexture.dispose();avatar.walkingTexture?.dispose();avatar.craftTexture?.dispose();} avatar.mesh.material.dispose(); }
  }
  const dialogues = await createDialogues(ASSETS);
  const halloweenDefinition=map==="halloween"?sceneScript.compileScene(await fetch(new URL('halloween/ray.sky',ASSETS),{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Scène de Ray inaccessible');return r.text();})):null;
  const cinematicAssets=halloweenDefinition?await createSceneAssets({THREE,loader:new GLTFLoader(),scene,definition:halloweenDefinition,resolve:p=>new URL(p,ASSETS).href}):null;
  const halloweenScene=halloweenDefinition?createHalloweenScene({definition:halloweenDefinition,onFrame:(time,index)=>cinematicAssets?.update(time,index,true),onDispose:()=>cinematicAssets?.dispose(),onSpeech:message=>dialogues.receive([message]),onAdvance:()=>dialogues.advanceManual(),bindings:Object.assign({ray:'npc:halloween-ray',pumpkin:'npc:halloween-pumpkin'},Object.fromEntries(halloweenDefinition.actors.filter(a=>a.kind!=='player').map(a=>[a.name,'npc:halloween-'+a.name])))}):null;
  if(halloweenScene)dayNight.setTime(60000);
  let previewDrinkingClock=null,previewDimension=null,previewCollapse=null;
  const drinkingTable=map==="anterose"?await createDrinkingTable(THREE,scene,ASSETS):null;
  const previewRoom=__ACTIVITY_PREVIEW__&&inDungeon?towerLayout.rooms[Number(new URLSearchParams(location.search).get('room'))]:null;
  const spawn = previewRoom?{x:previewRoom.x,y:previewRoom.y,z:previewRoom.z}:grid.spawn ?? pointAt(grid, nearestCell(grid, { x: 0, z: 0 }));
  const renneCombat=await combatPreparation;
  renneCombat?.warmup(renderer,camera);
  let notifyCapture=()=>{};
  const duelFinish=isArena?createDuelFinish(THREE,renderer,scene,ASSETS,event=>notifyCapture(event),()=>queueAction("leave_duel"),model,id=>notifyRematch(id)):null;
  const craftCapture=(renneCombat&&!inTower&&!localTraining)?createCraftCapture(THREE,renderer,scene,ASSETS,event=>notifyCapture(event)):null;
  const josetteView=renneCombat?await createJosetteView(THREE,ASSETS):null;
  const siegDiveView=await createSiegDiveView(THREE,scene,ASSETS);let divePending=null;
  const combatControls=createCombatControls((kind,event)=>startAttack(kind,event),(phase,event)=>cookingInput(phase,event));
  function aimForAttack(event,groundOnly=false) {
    const me=avatars.get(localId);if(!me)return null;
    if(event){pointer.set(event.clientX/viewport.width*2-1,1-event.clientY/viewport.height*2);raycaster.setFromCamera(pointer,camera);const candidates=groundOnly?[]:[...avatars].filter(([id,a])=>id!==localId&&!a.npc&&!a.dead);const hit=raycaster.intersectObjects([model,...candidates.map(([,a])=>a.mesh)],true).find(hit=>(!groundOnly||(hit.face&&Math.abs(hit.face.normal.clone().applyNormalMatrix(new THREE.Matrix3().getNormalMatrix(hit.object.matrixWorld)).y)>.45)||(hit.combatGround=combatGround.stepAimPoint(hit.point,walkingGrid)))&&(!cutaway||!model.getObjectById(hit.object.id)||cutaway.visible(hit.point)));if(hit){const avatar=candidates.find(([,a])=>a.mesh.id===hit.object.id)?.[1];return avatar?{...avatar.position}:{x:hit.point.x,y:hit.combatGround?.y??hit.point.y,z:hit.point.z};}if(groundOnly)return null;}
    const dx=me.heading.dx||0,dz=me.heading.dz||-1,length=Math.hypot(dx,dz)||1;
    const point={x:me.position.x+dx/length*4,y:me.position.y,z:me.position.z+dz/length*4};
    const ground=collision.floor(point.x,point.z,point.y+.6);if(ground!==null)point.y=ground;return point;
  }
  const crosshair=document.createElement('div');crosshair.textContent='+';crosshair.style.cssText='position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);font:28px monospace;color:#fff;text-shadow:0 0 3px #000;pointer-events:none;z-index:20';crosshair.hidden=true;document.body.append(crosshair);
  const fpsActive=()=>!!renneCombat&&avatars.get(localId)?.character==='Josette'&&!avatars.get(localId)?.dead&&!health.spectator&&!duelIntro?.active(performance.now());
  let craftTarget=false,lastCombatDash=null;
  function pickCombatTarget(event,spec){
    if(!event)return null;
    pointer.set(event.clientX/viewport.width*2-1,1-event.clientY/viewport.height*2);raycaster.setFromCamera(pointer,camera);
    const candidates=[...avatars].filter(([id,a])=>!a.npc&&!a.dead&&a.catCling?.target!==localId&&(spec.effect?(!a.enemy&&(id===localId||inTower)):(id!==localId&&(a.enemy||!inTower))));
    const hit=raycaster.intersectObjects(candidates.map(([,a])=>a.mesh),true)[0];
    return candidates.find(([,a])=>a.mesh.id===hit?.object.id)?.[0]??null;
  }
  let juliaCombo=null;
  function cookingInput(phase,event){const me=avatars.get(localId);if(phase==='end'){const wasHeld=cookingHeld;cookingHeld=false;if(wasHeld){if(__ACTIVITY_PREVIEW__&&!localTraining&&!new URLSearchParams(location.search).has('frame_id')){cookingMechanics.cookingTick(me,Date.now());delete me.cooking;}else queueAction('attack',undefined,me?.position,undefined,{kind:'craft',cookPhase:'end'});}return me?.character==='Phyllis';}if(me?.character!=='Phyllis')return false;if(!connected||!movementAllowed||me.dead||health.spectator||!(map==='arena'||inTower))return true;if(cookingHeld)return true;const stock=me.foodStock??health.foodStock??[];if(stock.length&&!me.cooking&&!combatControls.ready('craft'))return true;const fromButton=!!event?.target?.closest?.('#sky-renne-actions'),direction=me.heading??{dx:0,dz:-1},length=Math.hypot(direction.dx,direction.dz)||1;const selected=stock.length?(fromButton?{x:me.position.x+(direction.dx||0)/length*14,y:me.position.y,z:me.position.z+(Math.hypot(direction.dx,direction.dz)>0?direction.dz:-1)/length*14}:aimForAttack(event??cursor,true)):null;if(stock.length&&!selected)return true;const aim=stock.length&&selected?renneMechanics.attackPoint(me.position,selected,'craft','Phyllis'):{...me.position};if(!aim)return true;if(__ACTIVITY_PREVIEW__&&!localTraining&&!new URLSearchParams(location.search).has('frame_id')){if(stock.length){const food=stock.shift(),attack={id:crypto.randomUUID(),actor:localId,character:'Phyllis',kind:'craft',food,origin:{...me.position},aim,started:Date.now(),impactAt:Date.now()+700,endsAt:Date.now()+2500,hits:[]};attack.foodShots=cookingMechanics.makeFoodShots(attack);renneCombat.receive([attack],Date.now());combatControls.started('craft','Phyllis');}else{cookingHeld=true;cookingMechanics.beginCooking(me,Date.now());}}else {const action=queueAction('attack',undefined,aim,undefined,{kind:'craft',cookPhase:'begin'});if(action){cookingHeld=!stock.length;if(stock.length)combatControls.started('craft','Phyllis');}}return true;}
  // movement direction from the keys / stick (camera relative), else the clicked path, else the facing
  function movementDirection(me){
    const stick=combatControls.vector(),controls=movementKeys(keyboardLayout()),horizontal=Number(keys.has("arrowright")||keys.has(controls.right))-Number(keys.has("arrowleft")||keys.has(controls.left))+stick.x,vertical=Number(keys.has("arrowup")||keys.has(controls.up))-Number(keys.has("arrowdown")||keys.has(controls.down))-stick.y;
    const right=new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld,0),forward=new THREE.Vector3();camera.getWorldDirection(forward);forward.y=0;forward.normalize();
    let dx=right.x*horizontal+forward.x*vertical,dz=right.z*horizontal+forward.z*vertical;
    if(!horizontal&&!vertical&&path.length){dx=path[0].x-me.position.x;dz=path[0].z-me.position.z;}
    if(Math.hypot(dx,dz)<1e-6){dx=me.heading?.dx??0;dz=me.heading?.dz??-1;}
    return {x:dx,z:dz};
  }
  function startDodge(){
    const me=avatars.get(localId);if(!renneCombat||!connected||!me||me.dead||health.hp<=0||health.spectator||!movementAllowed||!combatControls.ready('art'))return false;
    if(renneCombat.current(localId)?.kind==='craft'||localJump||me.siegDive)return false;
    const direction=movementDirection(me),walkable=p=>{const c=cellAt(walkingGrid,p.x,p.z);return c.x>=0&&c.z>=0&&c.x<walkingGrid.width&&c.z<walkingGrid.height&&walkingGrid.cells[c.z*walkingGrid.width+c.x]!==null;};
    const end=combatMoves.dodgeEndpoint(me.position,direction,{floor:p=>collision.floor(p.x,p.z,p.y+.6),walkable});if(!end)return false;
    const action=queueAction('attack',undefined,end,undefined,{kind:'art',direction});if(!action)return false;
    const predicted=renneCombat.predict(action.id,me.position,end,'art',localId,me.character);if(!predicted){actionQueue.splice(actionQueue.indexOf(action),1);return false;}
    localJump=null;jumpPending=false;combatControls.started('art',me.character);
    if(__ACTIVITY_PREVIEW__&&!new URLSearchParams(location.search).has("frame_id"))renneCombat.accept(action.id);
    return true;
  }
  function startParry(){
    const me=avatars.get(localId);if(!connected||!me||me.dead||health.hp<=0||health.spectator||!combatControls.ready('parry'))return false;
    if(!queueAction('parry'))return false;
    combatControls.started('parry',me.character);combatFeedback?.parryPressed(localId);return true;
  }
  function startAttack(kind,event=cursor,confirmed=false) {
    if(kind==='parry')return startParry();
    if(kind==='art'&&renneMechanics.combatSpec(avatars.get(localId)?.character,'art')?.dodge)return startDodge();
    if(kind==='craft'&&avatars.get(localId)?.character==='Phyllis')return cookingInput('begin',event);
    const bird=avatars.get(localId);
    if(kind==='craft'&&bird?.character==='Campanella'&&health.canDetonate&&connected){return !!queueAction('attack',undefined,bird.position,undefined,{kind});}
    if(bird?.character==='Sieg'){
      if(kind!=='craft'||!connected||bird.dead||health.hp<=0||health.spectator||!movementAllowed||bird.siegDive||divePending||!combatControls.ready(kind))return false;
      const v=new THREE.Vector3();camera.getWorldDirection(v);const direction={x:v.x,y:v.y,z:v.z},points=diveMechanics.divePath(bird.position,direction,grid,collision);if(!points)return false;
      const action=queueAction('sieg_dive',undefined,undefined,undefined,{direction});if(!action)return false;
      bird.siegDive={id:action.id,started:Date.now()+jumpClockOffset,duration:diveMechanics.SIEG_DIVE.duration*(points.length-1)/40,points};divePending=__ACTIVITY_PREVIEW__?null:action.id;path=[];movementTrace=[];combatControls.started('craft','Sieg');return true;
    }
    const me=avatars.get(localId);const continuing=kind==='craft'&&me?.character==='Julia'&&juliaCombo&&juliaCombo.stage<3&&performance.now()<juliaCombo.until;if(!renneCombat||!connected||!me||!renneMechanics.combatSpec(me.character,kind)||me.dead||health.hp===0||health.spectator||renneCombat.current(localId)||(!continuing&&!combatControls.ready(kind)))return false;
    const spec=renneMechanics.combatSpec(me.character,kind);let target;
    if((spec.groundTarget||spec.targetRequired)&&!confirmed&&!(spec.chargeStun&&pickCombatTarget(event,spec))){craftTarget=kind;combatControls.targeting(kind);marker.visible=true;return true;}
    if(spec.targetRequired){target=pickCombatTarget(event,spec);if(!target)return false;}
    if(spec.optionalTarget)target=pickCombatTarget(event,spec);
    let ray=null;if(spec.fps){const origin={x:me.position.x,y:me.position.y+1.45,z:me.position.z},direction=new THREE.Vector3();camera.getWorldDirection(direction);ray={origin,direction:{x:direction.x,y:direction.y,z:direction.z}};}
    const photoHeading=me.heading??{dx:0,dz:-1};
    const aim=spec.special==='photo'?{x:me.position.x+photoHeading.dx*14,y:me.position.y,z:me.position.z+photoHeading.dz*14}:ray?{x:ray.origin.x+ray.direction.x*spec.range,y:ray.origin.y+ray.direction.y*spec.range,z:ray.origin.z+ray.direction.z*spec.range}:target?{...avatars.get(target).position}:spec.effect||spec.selfTarget?{...me.position}:aimForAttack(event,spec.groundTarget);if(!aim)return false;
    craftTarget=false;combatControls.targeting(null);
    const stage=spec.special==='trinity'?(continuing?juliaCombo.stage+1:1):1;
    const action=queueAction("attack",undefined,aim,undefined,{kind,target,ray});if(!action)return false;
    const tempo=kind==='basic'?combatMoves.comboFactor(combatMoves.comboOf({combo:localCombo},Date.now()+jumpClockOffset)):1;
    const predicted=renneCombat.predict(action.id,ray?.origin??me.position,aim,kind,localId,me.character,ray,stage,tempo);if(!predicted){actionQueue.splice(actionQueue.indexOf(action),1);return false;}
    if(spec.dash||spec.leap){localJump=null;jumpPending=false;}
    if(spec.lockMovement){path=[];keys.clear();movementTrace=[];}
    if(spec.special==='trinity'){juliaCombo={stage,until:continuing?juliaCombo.until:performance.now()+spec.comboWindow};craftTarget=stage<3?'craft':false;combatControls.targeting(craftTarget||null);}
    marker.visible=false;combatControls.started(kind,me.character,spec.cooldown*tempo);
    if(__ACTIVITY_PREVIEW__&&!new URLSearchParams(location.search).has("frame_id"))renneCombat.accept(action.id);
    return true;
  }

  const projectiles = new Map(), effects = new Map(), flying = new Map();
  const raycaster = new THREE.Raycaster(),
    pointer = new THREE.Vector2(),
    keys = new Set();
  let movementSequence = 0;
  let movementTrace = [];
  let landedJump=null,localJump=null,jumpPending=false,jumpClockOffset=0,jumpReadyAt=0;
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
  let notifyAction = () => {},notifyTerminal=()=>{},notifyRematch=async()=>{};
  let environment = { npcs: [], poms: [], pom: null, receivedAt: 0 },
    health = { hp: playerHealth.PLAYER_MAX_HP,maxHp:playerHealth.PLAYER_MAX_HP },
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
    camera:({dx,dy})=>{menu.hidden=true;yaw+=flight.cameraTurn(dx,avatars.get(localId)?.character==="Sieg"||health.spectator);if(avatars.get(localId)?.character==="Sieg"||health.spectator||fpsActive())pitch=Math.max(-1.48,Math.min(1.48,pitch+(dy??0)*.006));},
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
    const me=avatars.get(localId);if(!canJump||!me||health.spectator||me.character==="Sieg"||localJump||Date.now()+jumpClockOffset<jumpReadyAt||!connected||!movementAllowed||health.hp<=0)return;
    const stick=combatControls.vector(),horizontal=Number(keys.has("arrowright")||keys.has(movementKeys(keyboardLayout()).right))-Number(keys.has("arrowleft")||keys.has(movementKeys(keyboardLayout()).left))+stick.x,vertical=Number(keys.has("arrowup")||keys.has(movementKeys(keyboardLayout()).up))-Number(keys.has("arrowdown")||keys.has(movementKeys(keyboardLayout()).down))-stick.y;
    const right=new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld,0),forward=new THREE.Vector3();camera.getWorldDirection(forward);forward.y=0;forward.normalize();
    let dx=right.x*horizontal+forward.x*vertical,dz=right.z*horizontal+forward.z*vertical;
    if(!horizontal&&!vertical&&path.length){dx=path[0].x-me.position.x;dz=path[0].z-me.position.z;}const length=Math.hypot(dx,dz);const direction={dx:length?dx/length:0,dz:length?dz/length:0};
    landedJump=null;const action=queueAction("jump",undefined,undefined,undefined,{direction,origin:{...me.position},started:Date.now()+jumpClockOffset});if(!action)return;localJump={id:action.id,started:Date.now()+jumpClockOffset,origin:{...me.position},...direction};jumpReadyAt=Date.now()+jumpClockOffset+1250;jumpPending=true;path=[];marker.visible=false;
  }
  const jumpButton=document.createElement("button");jumpButton.id="sky-jump";jumpButton.type="button";jumpButton.textContent="↥";jumpButton.title=jumpButton.ariaLabel="Sauter";jumpButton.hidden=!canJump;jumpButton.addEventListener("click",()=>{startJump();jumpButton.blur();});document.body.append(jumpButton);
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
    if(drinkingTable?.nearby(me.position))options.push(["Démarrer un concours de boisson","drinking_contest",undefined]);
    if(hangarDoor&&airshipPhysics.airshipNearby(me.position,airshipConfig.door))options.push(['Accéder au Lynx','hangar_enter',undefined]);
    if(lynxObject&&airshipPhysics.airshipNearby(me.position,airshipConfig.lobby,6))options.push(['Piloter le Lynx','flight_board',undefined]);


    if(tavernBeer&&tavernWorld.beerNearby(me.position))options.push(["Boire une bi\u00e8re","drink",undefined]);
    const residents = environment.npcs
      .filter((n) => nearby(n) && Math.abs(n.y - me.position.y) < 0.6)
      .sort(
        (a, b) =>
          Math.hypot(a.x - me.position.x, a.z - me.position.z) -
          Math.hypot(b.x - me.position.x, b.z - me.position.z),
      );
    for (const n of residents)
      if(!n.drinkingScene)options.push(["Parler à " + n.name, "talk", n.id]);
    if (ball?.mode === "rest" && nearby(ball, 2))
      { queueAction("pickup", ball.id); return; }
    menu.replaceChildren();
    for (const [label, type, target] of options) {
      const b = document.createElement("button");
      b.textContent = label;
      b.addEventListener("click", () => {if(type==="drinking_contest"){menu.hidden=true;drinkingTable.open();}else queueAction(type, target);});
      menu.append(b);
    }
    menu.hidden = !options.length;
    menu.style.left = Math.min(event.clientX, innerWidth - 260) + "px";
    menu.style.top = Math.min(event.clientY, innerHeight - 180) + "px";
  }
  const damageEffects=await createDamageEffects(THREE,scene,labels,new URL("effects/fire-frames.png",ASSETS),loading);
  const combatFeedback=combatPreparation?await createCombatFeedback(THREE,scene,ASSETS,labels):null;
  const textureLoader = new THREE.TextureLoader(loading);
  const textures = new Map();
  const muellerTarget=new THREE.Mesh(new THREE.RingGeometry(.98,1,64),new THREE.MeshBasicMaterial({color:0xc58aff,transparent:true,opacity:.8,depthWrite:false,side:THREE.DoubleSide}));muellerTarget.rotation.x=-Math.PI/2;muellerTarget.visible=false;scene.add(muellerTarget);
  const marker = new THREE.Mesh(
    new THREE.RingGeometry(0.15, 0.22, 24),
    new THREE.MeshBasicMaterial({
      color: 0xffd984,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    }),
  );marker.userData.noXRay=true;
  marker.rotation.x = -Math.PI / 2;
  marker.visible = false;
  scene.add(marker);
  const aimLine=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({color:0xffd984,transparent:true,opacity:.38,depthWrite:false,side:THREE.DoubleSide}));
  aimLine.rotation.x=-Math.PI/2;aimLine.visible=false;scene.add(aimLine);
  async function setAvatar(player) {
    let avatar = avatars.get(player.id);
    const dead = player.hp === 0;
    const prop = propCatalogue[player.prop] ? player.prop : null;
    // a character with the rhumertume shows up as a pom-tiron, still under its own name
    const character = player.pumpkin&&catalogue['Pom-tiron'] ? 'Pom-tiron' : (catalogue[player.character]||renneMechanics.COMBAT[player.character]||player.character==='Anton')
      ? player.character
      : "Estelle";
    if (avatar && avatar.character === character && avatar.dead === dead && avatar.prop === prop) {
      avatar.displayName = player.nom ?? player.name ?? player.character;
      avatar.hp = player.hp ?? 100;
      avatar.platformRenderOffset=avatar.platformId===player.platformId?avatar.platformRenderOffset:null;avatar.platformId=player.platformId;avatar.platformOffset=player.platformOffset;avatar.shield=player.shield??null;avatar.guard=player.guard??null;
      avatar.maxHp=player.maxHp??playerHealth.PLAYER_MAX_HP;avatar.enemy=!!player.enemy;avatar.enemyAttack=player.attack;avatar.jump=player.jump;avatar.knockback=player.knockback??null;avatar.dimensionLift=player.dimensionLift??null;avatar.fallAnimation=player.fallAnimation??null;avatar.siegDive=player.siegDive??null;avatar.catCling=player.catCling??null;
      avatar.npc = !!player.npc;
      avatar.foodStock=player.foodStock??[];avatar.cooking=player.cooking??null;avatar.walking = !!player.moving;
      avatar.frozenUntil=player.stoneUntil;avatar.downUntil=player.downUntil;avatar.speed = player.speed ?? 0.8;avatar.spawnedAt=player.spawnedAt;avatar.summoned=player.summoned;avatar.deathAt=player.deathAt;
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
    let baseInfo = (catalogue[character]??renneMechanics.COMBAT[character]?.banks["0"]??catalogue.Estelle);if(player.id.startsWith("world:pom")){const factor=spriteScale.ballSpriteHeight/baseInfo.height;baseInfo={...baseInfo,height:spriteScale.ballSpriteHeight,bodyHeight:baseInfo.bodyHeight*factor,footOffsets:baseInfo.footOffsets?.map(v=>v*factor)};}
    const battle=renneCombat&&renneCombat.metadataFor(character);
    const combatAssets=renneCombat?await renneCombat.load(character):null;
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
    let craftTexture=null;
    if(!battle&&!dead&&baseInfo.craft){const key=character+':craft';if(!textures.has(key))textures.set(key,textureLoader.loadAsync(new URL(baseInfo.craft.texture,ASSETS).href));craftTexture=(await textures.get(key)).clone();craftTexture.colorSpace=THREE.SRGBColorSpace;craftTexture.magFilter=craftTexture.minFilter=THREE.NearestFilter;craftTexture.generateMipmaps=false;craftTexture.repeat.set(1/baseInfo.craft.columns,1/baseInfo.craft.rows);craftTexture.needsUpdate=true;}
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
      dead,deathStarted:performance.now(),
      hp: player.hp ?? 100,damageSequence:player.damageSequence??0,damageEvents:player.damageEvents,
      towerArrival:inTower&&!player.enemy&&!player.npc&&!String(player.id).startsWith("world:")?performance.now():null,platformId:player.platformId,platformOffset:player.platformOffset,shield:player.shield??null,guard:player.guard??null,maxHp:player.maxHp??playerHealth.PLAYER_MAX_HP,enemy:!!player.enemy,enemyAttack:player.attack,jump:player.jump,knockback:player.knockback??null,dimensionLift:player.dimensionLift??null,fallAnimation:player.fallAnimation??null,siegDive:player.siegDive??null,catCling:player.catCling??null,
      frozenUntil:player.stoneUntil,downUntil:player.downUntil,spawnedAt:player.spawnedAt,summoned:player.summoned,deathAt:player.deathAt,npc: !!player.npc,
      foodStock:player.foodStock??[],cooking:player.cooking??null,walking: !!player.moving,
      speed: player.speed ?? 0.8,
      initialTexture:texture,walkingTexture,walkingInfo:baseInfo.walk,craftTexture,craftInfo:baseInfo.craft,
      battleTextures:battle?new Map([...combatAssets.textures].map(([bank,base])=>{const clone=shareTexture(base);renderer.initTexture(clone);return [bank,clone];})):null,
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
    if(towerLayout&&floorNumber<(towerLayout.totalFloors??4)&&Math.hypot(me.position.x-towerLayout.exit.x,me.position.z-towerLayout.exit.z)<2.2){queueAction("tower_step","up");return;}
    if(towerLayout&&floorNumber>1&&Math.hypot(me.position.x-towerLayout.start.x,me.position.z-towerLayout.start.z)<2.2){queueAction("tower_step","down");return;}
    if(lynxObject&&airshipPhysics.airshipNearby(me.position,airshipConfig.lobby,6)){queueAction('flight_board');return;}
    if(drinkingTable?.nearby(me.position))drinkingTable.open();else if(tavernBeer&&tavernWorld.beerNearby(me.position))queueAction("drink");else if(pom)queueAction("pickup",pom.id);else if(nearby[0])queueAction("talk",nearby[0].id);
  }
  function keydown(rawEvent) {
    const mapped=remapKey(rawEvent),event={code:mapped.code,key:mapped.key,repeat:rawEvent.repeat,target:rawEvent.target,preventDefault:()=>rawEvent.preventDefault()};
    if (!connected || (!movementAllowed&&!health.spectator)) return;
    if (document.querySelector("#sky-terminal[open]") || event.target.closest?.("input,textarea,select,button,[contenteditable]"))
      return;
    if(event.code==="Escape"){juliaCombo=null;craftTarget=false;combatControls.targeting(null);marker.visible=false;return;}
    if(event.code==="KeyX"){if(!event.repeat)keyboardInteraction();return;}
    if(!event.repeat && ["KeyF","KeyG","KeyC","KeyV"].includes(event.code)){event.preventDefault();const kind=combatKeyAction(event.code,avatars.get(localId)?.character);if(kind){if(kind!=='craft'||!cookingInput('begin'))startAttack(kind);}return;}
    if(event.code === "Space") {event.preventDefault();if(avatars.get(localId)?.character==="Sieg"||health.spectator){keys.add(" ");return;}if(!event.repeat){if(canJump)startJump();else keyboardInteraction();}return;}
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
    if(remapKey(event).code==='KeyG')cookingInput('end');
    keys.delete(remapKey(event).key.toLowerCase());
  }
  function blur() {
    cookingInput('end');
    keys.clear();craftTarget=false;
    endDrag();touches.reset();disarmTouch();
  }
  function click(event) {
    if (event.button !== 0) return;
    menu.hidden = true;
    if(fpsActive()){startAttack('basic',event,true);return;}
    if(craftTarget){startAttack(craftTarget,event,true);return;}
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
  function releaseMouse(){if(document.pointerLockElement===canvas)document.exitPointerLock();}
  function lockedMouseMove(event){if(document.pointerLockElement===canvas&&fpsActive())pointermove({...event,clientX:viewport.width/2,clientY:viewport.height/2,movementX:event.movementX,movementY:event.movementY,pointerType:"locked"});}
  function focusUI(event){if(event.target?.closest?.("input,textarea,select,dialog,[contenteditable]"))releaseMouse();}
  document.addEventListener("mousemove",lockedMouseMove);document.addEventListener("focusin",focusUI);
  function pointerdown(event) {
    if (!connected) return;
    if(fpsActive()&&event.pointerType!=="touch"&&document.pointerLockElement!==canvas){try{const request=canvas.requestPointerLock?.();request?.catch?.(()=>{});}catch{}}
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
    if(document.pointerLockElement===canvas&&event.pointerType!=="locked")return;
    const previousCursor=cursor;
    cursor={clientX:event.clientX,clientY:event.clientY};
    if(touches.has(event.pointerId)){event.preventDefault();touches.move(event);return;}
    if(fpsActive()&&event.pointerType!=="touch"){
      if(document.querySelector("#sky-terminal[open]")||document.activeElement?.closest?.("input,textarea,select,[contenteditable]"))return;
      const dx=Number.isFinite(event.movementX)?event.movementX:event.clientX-previousCursor.clientX;
      const dy=Number.isFinite(event.movementY)?event.movementY:event.clientY-previousCursor.clientY;
      ({yaw,pitch}=fpsMouseLook(yaw,pitch,dx,dy));
      if(drag){drag.moved=true;drag.x=event.clientX;drag.y=event.clientY;}
      return;
    }
    if (!drag || event.pointerId !== drag.id) return;
    if (
      Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 5
    )
      drag.moved = true;
    if (!drag.moved) return;
    menu.hidden = true;
    yaw += flight.cameraTurn(event.clientX-drag.x,avatars.get(localId)?.character==="Sieg"||health.spectator);
    if(avatars.get(localId)?.character==="Sieg"||health.spectator||fpsActive())pitch=Math.max(-1.48,Math.min(1.48,pitch+(event.clientY-drag.y)*.006));
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
    if(lastTime&&time-lastTime>500)recordDiagnostic('render-stall',{map,durationMs:Math.round(time-lastTime),hidden:document.hidden},!document.hidden);
    const seconds = Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;
    if(__ACTIVITY_PREVIEW__&&!localTraining&&!new URLSearchParams(location.search).has('frame_id')){const cook=avatars.get(localId);if(cook?.character==='Phyllis'){if(cook.cooking&&cookingHeld)cook.cooking.heldUntil=Date.now()+1500;cookingMechanics.cookingTick(cook,Date.now());health.foodStock=cook.foodStock??[];health.cooking=cook.cooking;health.movementFactor=cook.cooking?.08:1;}}const introPlaying=!!duelIntro?.active(time);if(halloweenScene?.active(time)){movementAllowed=false;path=[];keys.clear();}else if(halloweenScene)movementAllowed=health.canMove!==false;if(wasIntro&&!introPlaying&&!health.spectator&&!["Josette","Sieg"].includes(avatars.get(localId)?.character))yaw=Math.PI/2;wasIntro=introPlaying;const me = avatars.get(localId),isFlying=!introPlaying&&!halloweenScene?.active(time)&&me?.character==="Sieg"&&!me.prop&&!me.dead;
    if(previewCollapse){const age=Date.now()-previewCollapse.started;for(const target of previewCollapse.targets){const a=avatars.get(target.id);if(!a)continue;const push={origin:{x:target.point.x,y:target.point.y-.8,z:target.point.z},end:{x:target.point.x+(target.point.x>=-1?1.5:-1.5),y:target.point.y-.8,z:target.point.z},started:previewCollapse.started+585,duration:250};if(age>=585){Object.assign(a.position,projectionMechanics.projectionPosition(push,Date.now()));a.knockback=age<835?push:null;}a.downUntil=age>=835&&age<3335?previewCollapse.started+3335:0;a.fallAnimation=age>=585&&age<1035?{started:previewCollapse.started+585,duration:450,sign:target.point.x>=-1?1:-1}:null;}if(age>3400)previewCollapse=null;}
    if(previewDimension){const age=Date.now()-previewDimension.started;for(const target of previewDimension.targets){const a=avatars.get(target.id);if(!a)continue;if(age>=2600&&age<3400)a.dimensionLift={origin:target.point,started:previewDimension.started+2600,duration:800,height:2};else if(age>=3400){a.dimensionLift=null;Object.assign(a.position,target.point);}}if(age>4000)previewDimension=null;}
    const freeSpectator=!!health.spectator;const isFPS=fpsActive();canvas.style.cursor=isFPS?"none":"";crosshair.hidden=!isFPS;if(!isFPS||document.querySelector("#sky-terminal[open]"))releaseMouse();
    if(isFlying!==wasFlying||isFPS!==wasFPS){wasFlying=isFlying;wasFPS=isFPS;camera=isFlying||isFPS||health.spectator?flightCamera:walkingCamera;pitch=isFPS?0:isFlying?.25:CAMERA_PITCH;path=[];keys.clear();marker.visible=false;resize();}
    if(hangarDoor&&connected&&me){const nearDoor=!isFlying&&airshipPhysics.airshipNearby(me.position,airshipConfig.door,1.3);if(nearDoor&&wasNearHangarDoor===false&&health.hp>0&&!actionQueue.some(a=>a.type==='hangar_enter'))queueAction('hangar_enter');wasNearHangarDoor=nearDoor;}
    towerGates?.draw(time);if(towerGates&&connected&&me&&health.hp>0&&!localJump&&!actionQueue.some(a=>a.type==='tower_step')){const direction=towerGates.check(me.position);if(direction)queueAction('tower_step',direction);}
    if(movingPlatforms){walkingGrid=movingPlatforms.update(Date.now()+jumpClockOffset,me,!!localJump);if(movingPlatforms.relative(me?.position??{},Date.now()+jumpClockOffset))movementTrace=[];}
    camera=introPlaying?introCamera:isFlying||isFPS||freeSpectator?flightCamera:walkingCamera;renderer.localClippingEnabled=!!cutaway&&!introPlaying;if(introPlaying){introCamera.aspect=viewport.width/viewport.height;introCamera.updateProjectionMatrix();}
    const distance=isFlying||freeSpectator?3.4782608696:cameraDistance(map);
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
    if(isFPS&&me){camera.position.set(me.position.x,me.position.y+1.45,me.position.z);camera.lookAt(me.position.x-Math.sin(yaw)*Math.cos(pitch),me.position.y+1.45-Math.sin(pitch),me.position.z+Math.cos(yaw)*Math.cos(pitch));}
    const localAttack=renneCombat?.current(localId),josetteBlend=josetteView?.update({camera,position:me?.position,attack:localAttack,spec:localAttack?renneMechanics.combatSpec('Josette',localAttack.kind):null,active:isFPS,time,moving:me?.walking||keys.size>0,yaw})??0;crosshair.hidden=!isFPS||josetteBlend>.05;
    if(introPlaying||!freeSpectator)duelIntro?.update(time,avatars,camera,follow);
    halloweenScene?.update(time,avatars,localId,camera,follow);
    camera.updateMatrixWorld();
    arenaAudience?.update(time,camera);
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
    combatControls.update({arena:isArena||inTower&&!inDungeon,character:inDungeon?undefined:me?.character,connected,alive:health.hp>0,spectator:health.spectator,busy:!!renneCombat?.current(localId)||!movementAllowed,health:{...health,cooldowns:{}}});
    const stick=combatControls.vector();
    if(freeSpectator){const controls=movementKeys(keyboardLayout()),h=Number(keys.has('arrowright')||keys.has(controls.right))-Number(keys.has('arrowleft')||keys.has(controls.left))+stick.x,v=Number(keys.has('arrowup')||keys.has(controls.up))-Number(keys.has('arrowdown')||keys.has(controls.down))-stick.y,lift=Number(keys.has(' '))-Number(keys.has('control'));const motion=airForward.clone().multiplyScalar(v).addScaledVector(airRight,h);motion.y+=lift;if(motion.length()>1)motion.normalize();follow.addScaledVector(motion,seconds*8);}
    const patEvent=renneCombat?.inertia(localId);if(!patEvent||!connected||!movementAllowed||health.hp<=0){patDrive=null;patDriveId=null;}else if(patEvent.id!==patDriveId){patDrive=patDriveMechanics.createPatDrive(me.heading);patDriveId=patEvent.id;}
    if(localJump&&me){const landing=dungeonMechanics.predictedLanding(walkingGrid,localJump,Date.now()+jumpClockOffset,collision);if(landing){landedJump=localJump.id;Object.assign(me.position,landing);localJump=null;jumpPending=false;movementTrace=[];}}
    flightMotion={moving:false,dx:0,dz:0};
    if (!freeSpectator && me && !me.siegDive && !localJump && !renneCombat?.dash(localId) && health.hp > 0 && movementAllowed ) {
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
      }else if (!patEvent&&(horizontal || vertical)) {
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
    let patMotion=null;
    if(patDrive&&movementAllowed&&!localJump&&me){const controls=movementKeys(keyboardLayout()),h=Number(keys.has('arrowright')||keys.has(controls.right))-Number(keys.has('arrowleft')||keys.has(controls.left))+stick.x,v=Number(keys.has('arrowup')||keys.has(controls.up))-Number(keys.has('arrowdown')||keys.has(controls.down))-stick.y,goal=path[0],input=h||v?{x:right.x*h+forward.x*v,z:right.z*h+forward.z*v}:goal?{x:goal.x-me.position.x,z:goal.z-me.position.z}:{x:0,z:0};if(goal&&Math.hypot(input.x,input.z)<.5)path.shift();const drift=patDrive.step(input,seconds,Math.min(1,(health.movementFactor??6)/6)),next={x:me.position.x+drift.x,y:me.position.y,z:me.position.z+drift.z},cx=Math.round((next.x-walkingGrid.origin.x)/walkingGrid.step),cz=Math.round((next.z-walkingGrid.origin.z)/walkingGrid.step),floor=cx>=0&&cz>=0&&cx<walkingGrid.width&&cz<walkingGrid.height?walkingGrid.cells[cz*walkingGrid.width+cx]:null,hit=collision.sweep({...me.position,y:me.position.y+.7},{...next,y:next.y+.7},.22);if(hit)patDrive.bounce(hit.normal);else if(floor!==null&&Math.abs(floor-next.y)<.65){Object.assign(me.position,{...next,y:floor});recordMovement(me.position);}else patDrive.stop();patMotion={moving:drift.speed>.15,dx:drift.vx,dz:drift.vz};}
    jumpButton.hidden=!canJump||health.spectator||me?.character==="Sieg";
    jumpButton.disabled=!connected||Date.now()+jumpClockOffset<jumpReadyAt||health.hp<=0||!movementAllowed||!!localJump;
    for (const [id, avatar] of avatars) {
      if(avatar.siegDive&&!avatar.dead){Object.assign(avatar.position,diveMechanics.divePosition(avatar.siegDive,Date.now()+jumpClockOffset));const first=avatar.siegDive.points[0],last=avatar.siegDive.points.at(-1);avatar.heading={dx:last.x-first.x,dz:last.z-first.z};if(__ACTIVITY_PREVIEW__&&Date.now()+jumpClockOffset>=avatar.siegDive.started+avatar.siegDive.duration)avatar.siegDive=null;}
      const dash=avatar.dead?null:renneCombat?.dash(id);
      if(dash){Object.assign(avatar.position,dash.position);avatar.target={...dash.position};if(id===localId){path=[];movementTrace=[];}dash.event.dashFinished=!dash.active;if(!dash.active)dash.event.localDashFinished=true;}
      const carried=!dash&&id!==localId&&!avatar.jump&&movingPlatforms&&avatar.platformId&&avatar.platformOffset;
      let carriedMotion;
      if(carried){const p=movingPlatforms.simulation.position(avatar.platformId,Date.now()+jumpClockOffset);if(p){avatar.platformRenderOffset??={...avatar.platformOffset,y:0};carriedMotion=advance(avatar.platformRenderOffset,[{...avatar.platformOffset,y:0}],seconds,6);Object.assign(avatar.position,{x:p.x+avatar.platformRenderOffset.x,y:p.y,z:p.z+avatar.platformRenderOffset.z});}}
      const jump=dash?null:id===localId?localJump:avatar.jump;
      if(jump&&!avatar.dead)Object.assign(avatar.position,dungeonMechanics.jumpDisplayPosition(walkingGrid,jump,Date.now()+jumpClockOffset));
      const ballState = environment.poms.find(p => p.id === id),
        isPom = id.startsWith("world:pom");
      if (isPom && ballState && (ballState.mode !== "held" || predictedShots.has(id)))
        flying.set(id, projectiles.get(id)?.update(seconds, avatar.position));
      const motion = avatar.scriptControlled?{moving:!!avatar.scriptWalking,dx:avatar.heading.dx,dz:avatar.heading.dz}:isPom
        ? {
            moving: ballState?.mode === "flight" || predictedShots.has(id),
            dx: ballState?.vx ?? 0,
            dz: ballState?.vz ?? 0,
          }
        : (avatar.knockback||avatar.siegDive)&&!avatar.dead
          ? {moving:false,dx:0,dz:0}
        : avatar.dead
          ? { moving: false, dx: 0, dz: 0 }
          : dash
            ? {moving:dash.active,dx:dash.event.aim.x-dash.event.origin.x,dz:dash.event.aim.z-dash.event.origin.z}
          : carriedMotion
            ? carriedMotion
          : jump
            ? {moving:true,dx:jump.dx,dz:jump.dz}
          : introPlaying
            ? {moving:!!avatar.introWalking,dx:avatar.heading.dx,dz:avatar.heading.dz}
          : id === localId
            ? !movementAllowed ? {moving:false,dx:0,dz:0} : isFlying?flightMotion:patMotion??advance(avatar.position, path, seconds, renneCombat?.current(localId)&&renneMechanics.combatSpec(me.character,renneCombat.current(localId).kind)?.lockMovement?0:3.5*(health.movementFactor??1), recordMovement)
            : avatar.character==="Sieg"&&!avatar.prop?flight.approachFlight(avatar.position,avatar.target,seconds):advance(
                avatar.position,
                avatar.target ? [avatar.target] : [],
                seconds,
                (avatar.npc||avatar.enemy) && id !== "world:pom" ? avatar.speed + 0.1 : 6,
              );
      if(avatar.catCling&&!avatar.dead){const carrier=avatars.get(avatar.catCling.target);if(carrier)Object.assign(avatar.position,{x:carrier.position.x+.18,y:carrier.position.y+.8,z:carrier.position.z+.12});}
      if(avatar.knockback&&!avatar.dead)Object.assign(avatar.position,projectionMechanics.projectionPosition(avatar.knockback,Date.now()+jumpClockOffset));
      if(avatar.dimensionLift)Object.assign(avatar.position,dimensionMechanics.liftPosition(avatar.dimensionLift,Date.now()+jumpClockOffset));
      if (motion.moving || avatar.walking || (avatar.character==="Sieg"&&!avatar.dead)) {
        if (motion.moving) avatar.heading = { dx: motion.dx, dz: motion.dz };
        avatar.time += seconds;
      } else if ((avatar.npc || avatar.enemyAttack) && !avatar.dead) avatar.time += seconds;
      else avatar.time = 0;
      const down=avatar.downUntil>Date.now()+jumpClockOffset,fall=avatar.fallAnimation?loeweMechanics.fallPose(avatar.fallAnimation,Date.now()+jumpClockOffset):null,falling=fall?.active;
      let craftTilt=null,bodyScale=1,bodyOffsetX=0;
      if (!avatar.prop) {
      const attack=avatar.dead||down?null:renneCombat?.current(id);if(avatar.character==='Loewe'){const visual=loeweMechanics.loeweVisual(attack);bodyScale=visual.scale;bodyOffsetX=visual.offsetX;}
      if(attack&&renneMechanics.combatSpec(attack.character,attack.kind)?.special!=='smoke')avatar.heading={dx:attack.aim.x-attack.origin.x,dz:attack.aim.z-attack.origin.z};
      avatar.direction = facing(
        avatar.heading.dx,
        avatar.heading.dz,
        right,
        forward,
      );
      let info=avatar.info,selectedPose,selectedDirection,craftHidden=false,craftFlip=false;
      if(!avatar.battleTextures&&avatar.walkingTexture){info=motion.moving?avatar.walkingInfo:avatar.info;avatar.mesh.material.map=motion.moving?avatar.walkingTexture:avatar.initialTexture;}
      // Nial's cigarette drag: front-facing sheet for the gesture, then back to his usual sprite
      if(!avatar.battleTextures&&avatar.craftTexture){const drag=attack&&renneMechanics.combatSpec(attack.character,attack.kind)?.special==='smoke'?smokeMechanics.cigarettePose(avatar.craftInfo,performance.now()-attack.localStart):null;if(drag){info=avatar.craftInfo;avatar.mesh.material.map=avatar.craftTexture;selectedPose=drag.pose;selectedDirection=0;}else if(avatar.mesh.material.map===avatar.craftTexture)avatar.mesh.material.map=avatar.initialTexture;}
      if(avatar.battleTextures){const selected=attack?renneCombat.pose(attack,avatar.direction):{bank:avatar.dead||down&&!falling?(avatar.battleTextures.has(4)?4:0):motion.moving?(avatar.battleTextures.has(1)?1:0):0,pose:avatar.dead||down&&!falling?Math.min(Math.max(0,Math.floor((renneCombat.metadataFor(avatar.character).banks[4]?.frames??8)/(renneCombat.metadataFor(avatar.character).banks[4]?.directions??8))-1),down?999:Math.floor((time-avatar.deathStarted)/100)):Math.floor(avatar.time*8)%Math.max(1,Math.floor((renneCombat.metadataFor(avatar.character).banks[motion.moving&&avatar.battleTextures.has(1)?1:0]??avatar.info).frames/8))};if(selected.firing){const angle=selected.heading*Math.PI/180;avatar.direction=facing(Math.sin(angle),-Math.cos(angle),right,forward);selected.pose=[12,11,10,4,5,6,7,8][avatar.direction%8];}info=renneCombat.metadataFor(avatar.character).banks[selected.bank]??avatar.info;avatar.mesh.material.map=avatar.battleTextures.get(selected.bank);selectedPose=selected.pose;selectedDirection=selected.direction;craftHidden=!!selected.hidden;craftFlip=!!selected.flipX;craftTilt=selected.tiltDirection;}
      if(avatar.character==="Sieg"&&time>=(avatar.floorCheckedAt??0)){avatar.flightFloor=collision.floor(avatar.position.x,avatar.position.z,avatar.position.y+.1);avatar.floorCheckedAt=time+100;}
      const beating=avatar.character==="Sieg"&&!avatar.dead&&flight.wingbeats(motion.moving||avatar.walking||!!avatar.siegDive,avatar.position.y,avatar.flightFloor);
      const poses=avatar.enemyAttack&&!avatar.dead?info.attack??info.run:motion.moving||avatar.walking||beating?info.run:info.idle;
      const pose=selectedPose??(avatar.dead?Math.min(Math.max(0,Math.floor((info.frames??8)/(info.directions??8))-1),Math.floor((time-avatar.deathStarted)/100)):poses[Math.floor(avatar.time*info.fps)%poses.length]),frame=pose*(info.directions??8)+((selectedDirection??avatar.direction)%(info.directions??8));
      if(avatar.geometryInfo!==info){avatar.mesh.geometry.dispose();avatar.mesh.geometry=new THREE.PlaneGeometry(info.height*info.frameWidth/info.frameHeight,info.height);avatar.mesh.geometry.translate(info.centerX??0,info.centerY??info.height/2,0);avatar.nativeAnchor=null;avatar.geometryInfo=info;}
      if(info.anchors){const [ax,ay]=info.anchors[avatar.direction%8],offset={x:(128-ax)*info.pixelScale,y:(ay-176)*info.pixelScale},previous=avatar.nativeAnchor??{x:0,y:0};avatar.mesh.geometry.translate(offset.x-previous.x,offset.y-previous.y,0);avatar.nativeAnchor=offset;}
      if(avatar.summoned){const scale=Math.max(0,Math.min(1,(Date.now()+jumpClockOffset-avatar.spawnedAt)/700));avatar.mesh.scale.setScalar(avatar.deathAt?0:scale);}
      avatar.mesh.material.color.set(avatar.frozenUntil>Date.now()+jumpClockOffset?0x82baff:0xffffff);
      avatar.deathLift=avatar.dead||down?(info.groundOffsets?.[frame]??0):0;
      if(avatar.character==="Cassius"||avatar.character==="Mueller")avatar.mesh.scale.x=craftFlip?-1:1;
      avatar.renderFrame={pose,info};avatar.mesh.visible=!craftHidden&&!(id===localId&&isFPS&&josetteBlend<.12);avatar.mesh.material.opacity=id===localId&&isFPS?Math.max(0,Math.min(1,(josetteBlend-.12)/.25)):1;
      avatar.footOffset=!avatar.battleTextures&&!avatar.dead?(avatar.info.footOffsets?.[avatar.direction%(avatar.info.directions??8)]??0):0;
      avatar.perched=avatar.character==="Sieg"&&!avatar.dead&&!beating;
      avatar.mesh.material.map.offset.set((frame%info.columns)/info.columns,1-(Math.floor(frame/info.columns)+1)/info.rows);
      }
      if(avatar.character==='Loewe')avatar.mesh.scale.setScalar(bodyScale);else if(avatar.info.sceneScale)avatar.mesh.scale.setScalar(avatar.info.sceneScale);
      avatar.mesh.position.set(
        avatar.position.x+(avatar.introOffset?.x??0)+bodyOffsetX*right.x,
        avatar.position.y+(avatar.deathLift??0)-(avatar.footOffset??0)*(avatar.character==="Sieg"&&!avatar.perched?camera.matrixWorld.elements[5]:1)-(avatar.perched?Math.max(0,avatar.position.y-avatar.flightFloor):0),
        avatar.position.z+(avatar.introOffset?.z??0)+bodyOffsetX*right.z,
      );
      if(avatar.shadow&&!avatar.shadow.userData.update)avatar.shadow.position.set(avatar.position.x,avatar.position.y+.018,avatar.position.z);
      if (!avatar.prop) {
      if(avatar.fallbackDeath||down&&(!avatar.battleTextures?.has(4)))avatar.mesh.position.y+=avatar.info.height/2+Math.abs(avatar.info.centerX??0);
      avatar.mesh.rotation.z = falling?fall.angle:avatar.fallbackDeath||down&&(!avatar.battleTextures?.has(4)) ? Math.PI / 2 : 0;
      if(falling)avatar.mesh.position.y+=fall.hop+(avatar.geometryInfo?.centerY??avatar.info.height/2)*(1-Math.cos(fall.angle));
      if(avatar.character==="Sieg"&&!avatar.dead&&!avatar.perched)avatar.mesh.quaternion.copy(camera.quaternion);
      else if(avatar.character==="Sieg")avatar.mesh.rotation.set(0,Math.atan2(camera.matrixWorld.elements[8],camera.matrixWorld.elements[10]),0);
      else avatar.mesh.rotation.set(0,Math.atan2(camera.matrixWorld.elements[8],camera.matrixWorld.elements[10]),avatar.mesh.rotation.z);
      if(craftTilt){
        const m=camera.matrixWorld.elements,sx=craftTilt.x*m[0]+craftTilt.y*m[1]+craftTilt.z*m[2],sy=craftTilt.x*m[4]+craftTilt.y*m[5]+craftTilt.z*m[6],targetAngle=-Math.atan2(sx,sy);
        const previous=avatar.craftTiltAngle??targetAngle,angle=previous+Math.atan2(Math.sin(targetAngle-previous),Math.cos(targetAngle-previous))*(1-Math.exp(-seconds*12));avatar.craftTiltAngle=angle;
        avatar.mesh.quaternion.copy(camera.quaternion).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),angle));
        const pivot=new THREE.Vector3(0,.85,0).applyQuaternion(avatar.mesh.quaternion);avatar.mesh.position.add(new THREE.Vector3(0,.85,0).sub(pivot));
      }else avatar.craftTiltAngle=null;
      }
    }
    const photoTime=(health.serverTime??Date.now())+(performance.now()-(health.received??performance.now())),photoAmount=photoMechanics.photoStrength(health.photoFlash,photoTime);
    photoWhite.style.opacity=String(photoAmount*.95);
    for(const [id,ghost] of photoGhosts){const a=avatars.get(id);if(!a||!photoAmount){scene.remove(ghost);ghost.material.dispose();photoGhosts.delete(id);}}
    if(photoAmount)for(const [id,a] of avatars){if(a.character!=='Dorothy'||id===localId)continue;let ghost=photoGhosts.get(id);if(!ghost){ghost=a.mesh.clone();ghost.material=a.mesh.material.clone();ghost.material.depthWrite=false;scene.add(ghost);photoGhosts.set(id,ghost);}ghost.geometry=a.mesh.geometry;ghost.material.map=a.mesh.material.map;ghost.material.opacity=.4*photoAmount;ghost.position.copy(a.mesh.position).addScaledVector(right,.25*photoAmount);ghost.quaternion.copy(a.mesh.quaternion);ghost.scale.copy(a.mesh.scale);ghost.visible=a.mesh.visible;}
    // hidden in Nial's smoke only once the cloud has come out of his cigarette (not during the drag)
    const cloudDelay=actor=>avatars.get(actor)?.craftInfo?.smokeStartsAtMs??0;
    // fade in and out of the smoke over 0.6 s instead of vanishing at once
    for(const a of avatars.values()){const inside=(renneCombat?.smokeAmount(a.position,cloudDelay)??0)>0;a.smokeVeil=Math.max(0,Math.min(1,(a.smokeVeil??0)+(inside?1:-1)*seconds/.6));if(a.smokeVeil>0){const base=a.prop?1:a.mesh.material.opacity;a.mesh.material.opacity=base+(.02-base)*a.smokeVeil;a.smokeDimmed=true;}else if(a.smokeDimmed){a.smokeDimmed=false;if(a.prop)a.mesh.material.opacity=1;}}
    siegDiveView.draw(avatars,Date.now()+jumpClockOffset);
    renneCombat?.update(localId,craftCapture,camera,avatars);
    damageEffects.update(seconds,camera,avatars,viewport.width,viewport.height);
    if(combatFeedback){combatFeedback.update(renneCombat?.actions??new Map(),avatars,camera,viewport.width,viewport.height);combatFeedback.setCombo(combatMoves.comboOf({combo:localCombo},Date.now()+jumpClockOffset));}
    if (me&&!freeSpectator)
      follow.lerp(
        new THREE.Vector3(me.position.x*(map==="hangar"?.35:1), me.position.y, me.position.z*(map==="hangar"?.35:1)),
        1 - Math.exp(-seconds * 7),
      );
    if(juliaCombo&&(performance.now()>juliaCombo.until||me?.character!=='Julia'||health.hp<=0)){juliaCombo=null;craftTarget=false;combatControls.targeting(null);}
    aimLine.visible=false;
    if(craftTarget&&me&&!me.dead&&connected){const spec=renneMechanics.combatSpec(me.character,craftTarget),selected=spec.targetRequired?pickCombatTarget(cursor,spec):null,point=spec.targetRequired?avatars.get(selected)?.position:aimForAttack(cursor,true),target=spec.targetRequired?point:point&&renneMechanics.attackPoint(me.position,point,craftTarget,me.character);marker.visible=!!target;aimLine.visible=!!target&&renneMechanics.combatSpec(me.character,craftTarget)?.shape==='line';if(target){if(aimLine.visible)marker.visible=false;marker.position.set(target.x,target.y+.06,target.z);marker.scale.setScalar(spec.special==='dimension'?spec.radius/.22:2.5);if(aimLine.visible){const dx=target.x-me.position.x,dz=target.z-me.position.z;aimLine.position.set((target.x+me.position.x)/2,combatGround.lineMarkerHeight(me.position,target),(target.z+me.position.z)/2);aimLine.rotation.z=-Math.atan2(dz,dx);aimLine.scale.set(Math.hypot(dx,dz),renneMechanics.combatSpec(me.character,craftTarget).radius*2,1);}}}else {craftTarget=false;combatControls.targeting(null);marker.scale.setScalar(1);if(!path.length)marker.visible=false;}
    muellerTarget.visible=!!craftTarget&&renneMechanics.combatSpec(me?.character,craftTarget)?.special==='mueller'&&marker.visible;if(muellerTarget.visible){muellerTarget.position.copy(marker.position);muellerTarget.scale.setScalar(renneMechanics.combatSpec(me.character,craftTarget).radius);marker.visible=false;}
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
      status.textContent = "0 / "+(health.maxHp??playerHealth.PLAYER_MAX_HP)+" PV"+(health.noRespawn?"":" · Réapparition dans " + remaining + " s");
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
        a.position.y + (a.info.bodyHeight??a.info.height) + 0.15,
        a.position.z,
      ).project(camera);
      label.style.left = ((p.x + 1) * viewport.width) / 2 + "px";
      label.style.top = ((1 - p.y) * viewport.height) / 2 + "px";
      label.style.opacity=String(1-.98*(a.smokeVeil??0));
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
          fill.style.width = 100*a.hp/(a.maxHp??playerHealth.PLAYER_MAX_HP) + "%";
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
    tavernTables?.update(time,camera);
    horrorMembranes?.update(Date.now()+jumpClockOffset);
    halloweenDecor?.update(camera,avatars.get(localId)?.position);
    const lightState=dayNight.update();dayNight.photo(renneCombat?.photoFlashes()??[]);
    rooftopSky?.update(camera,lightState);skyGlow?.update();
    for(const avatar of avatars.values())avatar.shadow?.userData.update?.(time,lightState);
    if(previewDrinkingClock){previewDrinkingClock.tick(environment.npcs);dialogues.receive(environment.npcs.filter(n=>n.utterance).map(n=>({...n.utterance,author:n.id})));}
    drinkingTable?.update(time,avatars);
    dialogues.update(time, avatars, camera);
    renderer.render(scene, camera);
    xray?.render(renderer, scene, camera);
    craftCapture?.update(time);
    duelFinish?.update(time,avatars,camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
  return {
    spawn,
    prepareCombat:character=>renneCombat?.load(character),
    retainCombatCharacters:characters=>renneCombat?.retainCharacters(characters),
    resetTraining(){renneCombat?.reset();for(const a of avatars.values())removeAvatar(a);avatars.clear();path=[];movementTrace=[];localJump=null;actionQueue.length=0;},
    trainingGeometry:()=>({grid,geometry:collision}),
    playerCharacter:()=>avatars.get(localId)?.character,
    catalogue,
    ...(__ACTIVITY_PREVIEW__ ? { setDayTime:time=>dayNight.setTime(time), dayTime:()=>dayNight.state(), localAvatar:()=>{const a=avatars.get(localId);return a?{id:localId,character:a.character,prop:a.prop,pose:Math.round(a.info.rows*(1-a.mesh.material.map.offset.y)-1),position:{...a.position},footY:a.mesh.position.y+(a.footOffset??0)*(a.character==="Sieg"&&!a.perched?camera.matrixWorld.elements[5]:1),perched:!!a.perched}:null;}, renderInfo:()=>({calls:renderer.info.render.calls,combatEffects:renneCombat?.effectStats(),triangles:renderer.info.render.triangles,perspective:camera.isPerspectiveCamera===true,pitch,camera:camera.position.toArray(),shadows:!!mapShadows,receivers:mapShadows?.overlays.length??0}), projectilePosition: id => { const a=avatars.get(id); return a ? {x:a.mesh.position.x,y:a.mesh.position.y,z:a.mesh.position.z} : null; } } : {}),
    onAction(callback) { notifyAction = callback; },
    onTerminal(callback) {notifyTerminal=callback;},
    onRematch(callback){notifyRematch=callback;},
    onCraftCapture(callback){notifyCapture=callback;},
    attack:startAttack,
    captureNotice(text){status.textContent=text;},
    terminalPoint(){return terminal?{...terminal.position,y:terminal.position.y+.7}:null;},
    lynxPoint(){return lynxObject?{...airshipConfig.lobby,y:airshipConfig.lobby.y+.9}:null;},
    setConnected(value) { connected = value; touchButton.disabled=!value||health.hp===0||!!health.spectator||health.canMove===false; if (!value) { cookingInput('end');touches.reset();disarmTouch(); path=[]; keys.clear(); marker.visible=false; } },
    async resetSession(player) { touches.reset();disarmTouch();actionQueue.length=0; predictedShots.clear(); for (const playback of projectiles.values()) playback.cancelPrediction(); path=[]; movementTrace=[]; movementSequence=0; keys.clear(); landedJump=null;localJump=null;jumpPending=false;marker.visible=false; localId=player.id; await setAvatar(player); Object.assign(avatars.get(localId).position,positionOf(player)); connected=false; },
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
    async demoPhoto(){if(!__ACTIVITY_PREVIEW__||!renneCombat)return;const origin={x:-1,y:0,z:3.25};await setAvatar({id:localId,character:'Dorothy',...origin,hp:500});const started=Date.now()-520;renneCombat.receive([{id:crypto.randomUUID(),actor:localId,character:'Dorothy',kind:'craft',origin,aim:{x:-1,y:0,z:13.25},started,impactAt:started+500,endsAt:started+1250,hits:[]}],Date.now());},
    async demoLoewe(){if(!__ACTIVITY_PREVIEW__||!renneCombat)return;const origin={x:-1,y:0,z:3.25};await setAvatar({id:localId,character:'Loewe',...origin,hp:500});Object.assign(avatars.get(localId).position,origin);const targets=[{id:'preview-collapse-1',character:'Estelle',x:-4,y:0,z:3.25},{id:'preview-collapse-2',character:'Joshua',x:2,y:0,z:3.25}];for(const p of targets)await setAvatar({...p,hp:500});const started=Date.now(),hits=targets.map(p=>({id:p.id,collapse:true,at:started+585,point:{x:p.x,y:p.y+.8,z:p.z}}));previewCollapse={started,targets:hits};renneCombat.receive([{id:crypto.randomUUID(),actor:localId,character:'Loewe',kind:'craft',special:'loewe',origin,aim:origin,started,impactAt:started+585,endsAt:started+2780,hits}],started);},
    async demoDimension(empty=false){if(!__ACTIVITY_PREVIEW__||!renneCombat)return;const origin={x:-1,y:0,z:3.25};await setAvatar({id:localId,character:'Weissmann',...origin,hp:500});Object.assign(avatars.get(localId).position,origin);const targets=empty?[]:[{id:'preview-dimension-1',character:'Estelle',x:-2.25,y:0,z:4.25},{id:'preview-dimension-2',character:'Joshua',x:.25,y:0,z:4.25}];for(const p of targets)await setAvatar({...p,hp:500});const started=Date.now(),hits=targets.map(p=>({id:p.id,trapped:true,at:started,point:{x:p.x,y:p.y,z:p.z}})),event={id:crypto.randomUUID(),actor:localId,character:'Weissmann',kind:'craft',technique:'Another Dimension',special:'dimension',origin,aim:{x:-1,y:0,z:4.25},started,impactAt:started+2600,endsAt:started+4000,hits};previewDimension={started,targets:hits};renneCombat.receive([event],started);},
    async demoIntro(){if(!__ACTIVITY_PREVIEW__||!duelIntro)return;const own=avatars.get(localId),axisVenue=map==='axis',other={id:'preview-arena-foe',character:own.character==='Joshua'?'Renne':'Joshua',x:axisVenue?0:-1,y:0,z:axisVenue?9.5:-16.25,hp:500};Object.assign(own.position,axisVenue?{x:0,y:0,z:-9.5}:{x:-1,y:0,z:3.25});await setAvatar(other);const now=Date.now();duelIntro.receive({id:crypto.randomUUID(),startsAt:now,readyAt:now+(axisVenue?axisIntroDefinition:arenaIntroDefinition).duration,venue:map,players:[localId,other.id],names:[own.character,other.character],titles:['Titre à renseigner','Titre à renseigner'],phrases:['Que le meilleur gagne !','À nous deux !'],streaks:[2,1]},now);},
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
    async demoDrinkingTable(){
      if(!__ACTIVITY_PREVIEW__||map!=="anterose")return;
      const data=await fetch(new URL("residents.json",ASSETS)).then(r=>r.json());environment.npcs=data.npcs.filter(n=>n.drinkingScene).map(n=>({...n,...n.waypoints[0],id:"npc:"+n.id,npc:true}));for(const npc of environment.npcs)await setAvatar(npc);
      await setAvatar({id:localId,character:avatars.get(localId)?.character??"Estelle",x:-7.6,y:1.5,z:-2.5});Object.assign(avatars.get(localId).position,{x:-7.6,y:1.5,z:-2.5});previewDrinkingClock=drinkingContest.createDrinkingDialogue();
    },
    async me(player) {
      localId = player.id;
      await setAvatar({ ...spawn, ...player });
      if(halloweenScene){for(const n of [...halloweenResidents.npcs.filter(n=>!halloweenDefinition.actors.some(a=>'halloween-'+a.name===n.id)),...halloweenDefinition.actors.filter(a=>a.kind!=='player').map(a=>({id:'halloween-'+a.name,character:a.character,waypoints:[a.position],heading:{dx:0,dz:-1}}))])await setAvatar({...n,...n.waypoints[0],id:'npc:'+n.id,npc:true,hp:500});if(__ACTIVITY_PREVIEW__&&!new URLSearchParams(location.search).has('frame_id'))halloweenScene.start(performance.now());}
    },
    async sync(players) {
      const present = new Set([localId]);
      for (const player of players) {
        const before=avatars.get(player.id);if(before?.hp>0&&player.hp>before.hp)damageEffects.heal(player.id,player.hp-before.hp);
        const lost=damageAmount(before,player);
        // smoke ticks would give away where the hidden players are: only the player being hurt sees them
        const events=newDamageEvents(before,player).filter(e=>!e.smoke||player.id===localId);
        if(events.length)for(const event of events){const delay=Math.min(.8,(event.at-events[0].at)/1000),own=combatFeedback?.impact(player.id,event,delay);damageEffects.hit(player.id,event.amount,false,delay,own?{...event,quiet:true}:event);}
        else if(lost&&!player.damageEvents)damageEffects.hit(player.id,lost);
        if (player.id === localId) {
          localCombo=player.combo??null;
          const current = avatars.get(localId);
          if (current && (current.dead !== (player.hp === 0) || current.prop !== (propCatalogue[player.prop] ? player.prop : null) || current.character !== (catalogue[player.character]?player.character:"Estelle")))
            await setAvatar(avatarAtPosition(player,current.position));
          else if (current) {current.catCling=player.catCling??null;current.hp = player.hp ?? 100;current.shield=player.shield??null;current.guard=player.guard??null;current.foodStock=player.foodStock??[];current.cooking=player.cooking??null;}
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
      halloweenScene?.receive(result.halloween,result.health?.serverTime);
      teamPanel?.update(result.team);
      enemyEffects?.update(result.enemies??[],result.health?.serverTime??Date.now());
      dialogues.receive((result.enemies??[]).filter(e=>e.utterance&&e.hp>0).map(e=>({id:e.utterance.id,author:e.id,character:e.name,text:e.utterance.text})));
      const boss=(result.enemies??[]).find(e=>e.boss);bossPanel.hidden=!boss; if(boss){bossPanel.textContent=boss.name+' · '+boss.hp+' / '+boss.maxHp+' PV';}
      renneCombat?.receive(result.combat?.attacks??[],result.health?.serverTime??Date.now());
      const dash=result.health?.combatDash;
      if(dash&&dash!==lastCombatDash){lastCombatDash=dash;const me=avatars.get(localId);if(me&&!renneCombat?.dash(localId))Object.assign(me.position,result.position);path=[];movementTrace=[];localJump=null;craftTarget=me?.character==='Julia'&&juliaCombo?.stage<3?'craft':false;combatControls.targeting(craftTarget||null);}
      dayNight.sync(result.health?.serverTime);jumpClockOffset=(result.health?.serverTime??Date.now())-Date.now();
      const bird=avatars.get(localId);
    if(bird){bird.frozenUntil=result.health?.frozenUntil;bird.downUntil=result.health?.downUntil;const previous=bird.siegDive,confirmed=result.health?.siegDive;if(confirmed){bird.siegDive=confirmed;divePending=null;}else if(!divePending||result.actionResult?.id===divePending){bird.siegDive=null;if(result.actionResult?.error&&result.actionResult.id===divePending)combatControls.rejected('craft');divePending=null;if(previous)Object.assign(bird.position,result.position);}if(previous||bird.siegDive){path=[];movementTrace=[];}}
      const pushed=avatars.get(localId);if(pushed){const previous=pushed.knockback;pushed.knockback=result.health?.knockback??null;pushed.dimensionLift=result.health?.dimensionLift??null;pushed.fallAnimation=result.health?.fallAnimation??null;if(pushed.knockback||previous){path=[];movementTrace=[];localJump=null;if(!pushed.knockback)Object.assign(pushed.position,result.position);}}
      if(canJump){jumpClockOffset=(result.health?.serverTime??Date.now())-Date.now();if(!jumpPending)jumpReadyAt=result.health?.jumpReadyAt??0;dungeonEffects?.receive(result.fire??[],result.health?.serverTime??Date.now());const confirmed=result.health?.jump;
        if(confirmed&&confirmed.id!==landedJump){localJump=confirmed;jumpPending=false;path=[];movementTrace=[];}
        else if(localJump&&(!jumpPending||result.actionResult?.id===localJump.id)){localJump=null;jumpPending=false;movementTrace=[];path=[];const a=avatars.get(localId);if(a)Object.assign(a.position,result.position);}
      }
      duelIntro?.receive(result.duel?.result?null:result.duel,result.health?.serverTime);
      duelFinish?.receive(result.duel,localId,result.health?.serverTime);
      if(result.characterChanged){const me=avatars.get(localId);if(me)Object.assign(me.position,result.position);path=[];movementTrace=[];keys.clear();}
      dialogues.receive((result.npcs??[]).filter(n=>n.utterance).map(n=>({...n.utterance,author:n.id})));
      environment = {
        game: result.game,
        npcs: result.npcs ?? [],
        pom: result.pom ?? null,
        poms: result.poms ?? (result.pom ? [{...result.pom,id:result.pom.id ?? "world:pom"}] : []),
        receivedAt: performance.now(),
      };
      if(result.actionResult?.error){const event=renneCombat?.actions.get(result.actionResult.id);if(event){renneCombat.reject(event.id);combatControls.rejected(event.kind);if(event.character==='Julia'&&event.kind==='craft'){juliaCombo=null;craftTarget=false;combatControls.targeting(null);}if(renneMechanics.combatSpec(event.character,event.kind)?.dash){const me=avatars.get(localId);if(me)Object.assign(me.position,result.position);path=[];movementTrace=[];}}}
      combatControls.update({arena:isArena||inTower&&!inDungeon,character:inDungeon?undefined:avatars.get(localId)?.character,connected,alive:result.health?.hp>0,spectator:result.health?.spectator,busy:!!renneCombat?.current(localId),health:result.health});
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
      if (isArena && wasSpectator !== !!health.spectator) { camera=health.spectator?flightCamera:walkingCamera;pitch=health.spectator?.25:CAMERA_PITCH;zoom=health.spectator?6.9565217391:CAMERA_ZOOM;resize(); }
      walkingGrid = health.spectator && spectatorGrid ? spectatorGrid : grid;
      movementAllowed = (health.spectator||health.canMove !== false)&&!halloweenScene?.active(performance.now());const cat=avatars.get(localId);if(cat)cat.catCling=health.catCling??null;blindness.style.opacity=health.blindUntil>health.serverTime?'1':'0';
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
      if (health.hp > 0) status.textContent = health.hp + " / "+(health.maxHp??playerHealth.PLAYER_MAX_HP)+" PV";
      if (health.spectator && isArena) status.textContent = map==="axis"?"Bord du sommet : spectateur":"Tribunes : spectateur";
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
      if(halloweenScene?.active(performance.now()))return;
      const me = avatars.get(localId);
      if(health.dimensionLift||health.catCling||localJump||inTower&&health.jump&&health.jump.id!==landedJump||renneCombat?.dash(localId)||health.combatDash&&health.serverTime<health.combatLockedUntil||[...(renneCombat?.actions.values()??[])].some(e=>e.actor===localId&&!e.accepted&&!e.cancelled&&(renneMechanics.combatSpec(e.character,e.kind)?.dash||renneMechanics.combatSpec(e.character,e.kind)?.leap)))return;
      if (me && needsCorrection(me.position, position, submitted,me.character==="Sieg")) {
        recordCorrection(me.position,position,submitted,map);
        Object.assign(me.position, position);
        path = [];
        movementTrace = [];
      }
    },
    movement() {
      const pending=[...(renneCombat?.actions.values()??[])].find(e=>e.actor===localId&&!e.accepted&&!e.cancelled&&(renneMechanics.combatSpec(e.character,e.kind)?.dash||renneMechanics.combatSpec(e.character,e.kind)?.leap));
      return {
        heading:avatars.get(localId)?.character==='Josette'?{dx:-Math.sin(yaw),dz:Math.cos(yaw)}:{...avatars.get(localId)?.heading},
        cookingHeld,
        sceneReady:map==='halloween'?'halloween':undefined,
        ...halloweenScene?.state(),
        jumpLanding:landedJump,
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
      releaseMouse();document.removeEventListener("mousemove",lockedMouseMove);document.removeEventListener("focusin",focusUI);
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
      muellerTarget.geometry.dispose();muellerTarget.material.dispose();
      touches.reset();touchButton.remove();touchStyle.remove();
      horrorMembranes?.dispose();halloweenDecor?.dispose();halloweenScene?.dispose();arenaAudience?.dispose();rooftopSky?.dispose();dayNight.dispose();duelIntro?.dispose();duelFinish?.dispose();josetteView?.dispose();siegDiveView.dispose();combatControls.dispose();craftCapture?.dispose();renneCombat?.dispose();
      drinkingTable?.dispose();tavernTables?.dispose();crosshair.remove();blindness.remove();photoWhite.remove();for(const ghost of photoGhosts.values()){scene.remove(ghost);ghost.material.dispose();}teamPanel?.dispose();bossPanel.remove();enemyEffects?.dispose();movingPlatforms?.dispose();supportEffects.dispose();dungeonEffects?.dispose();towerGates?.dispose();jumpButton.remove();
      menu.remove();
      status.remove();
      labels.remove();
      style.remove();
      dialogues.dispose();
      damageEffects.dispose();combatFeedback?.dispose();
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
