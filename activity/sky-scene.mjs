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
  const mapAssets = map === "anterose" ? ASSETS : new URL(map + "/", ASSETS);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: false,
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x201b18);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene(),
    camera = new THREE.OrthographicCamera(-12, 12, 8, -8, 0.1, map === "rolent" ? 350 : 150),
    avatars = new Map(),
    catalogue = await fetch(new URL("characters.json", ASSETS)).then((r) =>
      r.json(),
    );
  const version = new URL(import.meta.url).searchParams.get("v") ?? "rolent-20261008-3";
  const loading = new THREE.LoadingManager();
  loading.setURLModifier(url => versionAsset(url, version));
  const cutaway = map === "arena" ? createArenaCutaway() : null;
  renderer.localClippingEnabled = !!cutaway;
  const loaded = await new GLTFLoader(loading).loadAsync(
    new URL("anterose.gltf", mapAssets).href,
  );
  const model = loaded.scene;
  scene.add(model);
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
  const mapShadows=createMapShadows(THREE,renderer,scene,model,map);
  const grid = await fetch(versionAsset(new URL("navigation.json", mapAssets), version), { cache: "no-store" }).then((r) =>
    r.json(),
  );
  const spectatorGrid = map === "arena" ? await fetch(versionAsset(new URL("spectator-navigation.json", mapAssets), version)).then(r => r.json()) : null;
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
    avatar.shadow=createContactShadow(THREE,shadowTexture);scene.add(avatar.shadow);return avatar;
  }
  function removeAvatar(avatar) {
    scene.remove(avatar.mesh);
    if(avatar.shadow){scene.remove(avatar.shadow);avatar.shadow.geometry.dispose();avatar.shadow.material.dispose();}
    if (!avatar.prop) { avatar.mesh.geometry.dispose(); avatar.mesh.material.map.dispose(); avatar.mesh.material.dispose(); }
  }
  const dialogues = await createDialogues(ASSETS);
  const spawn = grid.spawn ?? pointAt(grid, nearestCell(grid, { x: 0, z: 0 }));
  const projectiles = new Map(), effects = new Map(), flying = new Map();
  const raycaster = new THREE.Raycaster(),
    pointer = new THREE.Vector2(),
    keys = new Set();
  let movementSequence = 0;
  let movementTrace = [];
  const recordMovement = (point) => {
    movementTrace.push({ ...point, sequence: ++movementSequence });
    if (movementTrace.length > 1024) movementTrace.shift();
  };
  let path = [],
    yaw = 0,
    pitch = Math.PI / 4,
    drag = null,
    zoom = 12,
    follow = new THREE.Vector3(spawn.x, spawn.y, spawn.z),
    localId = null,
    connected = true,
    lastTime = performance.now(),
    disposed = false;
  const actionQueue = [];
  const predictedShots = new Map();
  let notifyAction = () => {};
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
  touchButton.title="Actions puis toucher la cible, ou appui long. Deux doigts : caméra.";
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
    camera:({dx,dy,scale})=>{menu.hidden=true;yaw-=dx*.006;pitch=THREE.MathUtils.clamp(pitch+dy*.005,Math.PI/9,Math.PI*5/12);zoom=THREE.MathUtils.clamp(zoom*scale,4,map==="arena"?30:15);resize();},
  });
  const oldHelp = document.getElementById("aide");
  if (oldHelp) oldHelp.hidden = true;
  function queueAction(type, target, aim, text) {
    if (actionQueue.length >= 8) return;
    const action = { id: crypto.randomUUID(), type, target, aim, text };
    actionQueue.push(action);
    menu.hidden = true;
    notifyAction();
    return action;
  }
  function interaction(event) {
    const me = avatars.get(localId);
    if (!connected || !me || health.hp === 0) return;
    const nearby = (p, r = 2.2) =>
      Math.hypot(p.x - me.position.x, p.z - me.position.z) <= r &&
      Math.abs((p.y ?? 0) - me.position.y) < 1.8;
    pointer.set(
      (event.clientX / innerWidth) * 2 - 1,
      1 - (event.clientY / innerHeight) * 2,
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
    const options = [];
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
    const character = catalogue[player.character]
      ? player.character
      : "Estelle";
    if (avatar && avatar.character === character && avatar.dead === dead && avatar.prop === prop) {
      avatar.displayName = player.nom ?? player.name ?? player.character;
      avatar.hp = player.hp ?? 100;
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
    const baseInfo = catalogue[character];
    const info =
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
    const geometry = new THREE.PlaneGeometry(
      (info.height * info.frameWidth) / info.frameHeight,
      info.height,
    );
    geometry.translate(0, player.id.startsWith("world:pom") ? 0 : info.height / 2, 0);
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
      hp: player.hp ?? 100,
      npc: !!player.npc,
      walking: !!player.moving,
      speed: player.speed ?? 0.8,
      fallbackDeath: dead && !baseInfo.death,
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
  function resize() {
    const aspect = innerWidth / innerHeight;
    camera.left = -zoom * aspect;
    camera.right = zoom * aspect;
    camera.top = zoom;
    camera.bottom = -zoom;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight, false);
  }
  function keydown(event) {
    if (!connected || !movementAllowed) return;
    if (event.target.closest?.("input,textarea,select,[contenteditable]"))
      return;
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
    keys.clear();
    endDrag();touches.reset();disarmTouch();
  }
  function click(event) {
    if (event.button !== 0) return;
    menu.hidden = true;
    if (health.hp === 0 || !movementAllowed) return;
    pointer.set(
      (event.clientX / innerWidth) * 2 - 1,
      (-event.clientY / innerHeight) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(model, true);
    if (!hits.length) return;
    const me = avatars.get(localId);
    if (!me) return;
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
    if(touches.has(event.pointerId)){event.preventDefault();touches.move(event);return;}
    if (!drag || event.pointerId !== drag.id) return;
    if (
      Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 5
    )
      drag.moved = true;
    if (!drag.moved) return;
    menu.hidden = true;
    yaw -= (event.clientX - drag.x) * 0.006;
    pitch = THREE.MathUtils.clamp(
      pitch + (event.clientY - drag.y) * 0.005,
      Math.PI / 9,
      (Math.PI * 5) / 12,
    );
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
    zoom = THREE.MathUtils.clamp(zoom + event.deltaY * 0.005, 4, map === "arena" ? 30 : 15);
    resize();
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
    const me = avatars.get(localId);
    if (keys.has("e")) yaw += seconds * 1.5;
    if (keys.has("r")) yaw -= seconds * 1.5;
    camera.position.set(
      follow.x + Math.sin(yaw) * Math.cos(pitch) * cameraDistance(map),
      follow.y + Math.sin(pitch) * cameraDistance(map),
      follow.z - Math.cos(yaw) * Math.cos(pitch) * cameraDistance(map),
    );
    camera.lookAt(follow);
    camera.updateMatrixWorld();
    cutaway?.update(camera, follow);
    const right = {
        x: camera.matrixWorld.elements[0],
        z: camera.matrixWorld.elements[2],
      },
      forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    if (me && health.hp > 0 && movementAllowed) {
      const horizontal =
        Number(keys.has("arrowright") || keys.has("d")) -
        Number(keys.has("arrowleft") || keys.has("q") || keys.has("a"));
      const vertical =
        Number(keys.has("arrowup") || keys.has("z") || keys.has("w")) -
        Number(keys.has("arrowdown") || keys.has("s"));
      if (horizontal || vertical) {
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
    for (const [id, avatar] of avatars) {
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
          : id === localId
            ? advance(avatar.position, path, seconds, undefined, recordMovement)
            : advance(
                avatar.position,
                avatar.target ? [avatar.target] : [],
                seconds,
                avatar.npc && id !== "world:pom" ? avatar.speed + 0.1 : 6,
              );
      if (motion.moving || avatar.walking) {
        if (motion.moving) avatar.heading = { dx: motion.dx, dz: motion.dz };
        avatar.time += seconds;
      } else if (avatar.npc && !avatar.dead) avatar.time += seconds;
      else avatar.time = 0;
      if (!avatar.prop) {
      avatar.direction = facing(
        avatar.heading.dx,
        avatar.heading.dz,
        right,
        forward,
      );
      const poses =
          motion.moving || avatar.walking ? avatar.info.run : avatar.info.idle,
        pose = poses[Math.floor(avatar.time * avatar.info.fps) % poses.length],
        frame = pose * 8 + (avatar.direction % (avatar.info.directions ?? 8));
      avatar.mesh.material.map.offset.set(
        (frame % avatar.info.columns) / avatar.info.columns,
        1 - (Math.floor(frame / avatar.info.columns) + 1) / avatar.info.rows,
      );
      }
      avatar.mesh.position.set(
        avatar.position.x,
        avatar.position.y,
        avatar.position.z,
      );
      if(avatar.shadow)avatar.shadow.position.set(avatar.position.x,avatar.position.y+.018,avatar.position.z);
      if (!avatar.prop) {
      avatar.mesh.rotation.z = avatar.fallbackDeath ? Math.PI / 2 : 0;
      avatar.mesh.rotation.y = Math.atan2(
        camera.position.x - avatar.position.x,
        camera.position.z - avatar.position.z,
      );
      }
    }
    if (me)
      follow.lerp(
        new THREE.Vector3(me.position.x, me.position.y, me.position.z),
        1 - Math.exp(-seconds * 7),
      );
    if (!path.length) marker.visible = false;
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
      label.style.left = ((p.x + 1) * innerWidth) / 2 + "px";
      label.style.top = ((1 - p.y) * innerHeight) / 2 + "px";
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
          fill.style.width = a.hp + "%";
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
    dialogues.update(time, avatars, camera);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
  return {
    spawn,
    catalogue,
    ...(__ACTIVITY_PREVIEW__ ? { renderInfo:()=>({calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,camera:camera.position.toArray(),shadows:!!mapShadows,receivers:mapShadows?.overlays.length??0}), projectilePosition: id => { const a=avatars.get(id); return a ? {x:a.mesh.position.x,y:a.mesh.position.y,z:a.mesh.position.z} : null; } } : {}),
    onAction(callback) { notifyAction = callback; },
    setConnected(value) { connected = value; touchButton.disabled=!value||health.hp===0||!!health.spectator||health.canMove===false; if (!value) { touches.reset();disarmTouch(); path=[]; keys.clear(); marker.visible=false; } },
    async resetSession(player) { touches.reset();disarmTouch();actionQueue.length=0; predictedShots.clear(); for (const playback of projectiles.values()) playback.cancelPrediction(); path=[]; movementTrace=[]; movementSequence=0; keys.clear(); marker.visible=false; localId=player.id; await setAvatar(player); Object.assign(avatars.get(localId).position,player); connected=false; },
    messages(messages) {
      dialogues.receive(messages);
    },
    speak(text) {
      if (!connected || !text.trim()) return false;
      if (__ACTIVITY_PREVIEW__ && !new URLSearchParams(location.search).has("frame_id")) { this.say(text); return true; }
      return !!queueAction("say", undefined, undefined, text.trim());
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
        if (player.id === localId) {
          const current = avatars.get(localId);
          if (current && (current.dead !== (player.hp === 0) || current.prop !== (propCatalogue[player.prop] ? player.prop : null)))
            await setAvatar({ ...player, ...current.position });
          else if (current) current.hp = player.hp ?? 100;
          continue;
        }
        present.add(player.id);
        await setAvatar(player);
      }
      for (const [id, avatar] of avatars)
        if (!present.has(id)) {
          removeAvatar(avatar);
          avatars.delete(id);
        }
    },
    async world(result) {
      environment = {
        game: result.game,
        npcs: result.npcs ?? [],
        pom: result.pom ?? null,
        poms: result.poms ?? (result.pom ? [{...result.pom,id:result.pom.id ?? "world:pom"}] : []),
        receivedAt: performance.now(),
      };
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
      if (map === "arena" && wasSpectator !== !!health.spectator) { zoom=health.spectator?22:12;resize(); }
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
      if (health.hp > 0)
        status.textContent =
          health.hp +
          " / 100 PV · " +
          (environment.poms.some(p => p.owner === localId)
            ? "Pom en main : clic droit pour tirer vers le point visé."
            : "Clic droit : parler / ramasser le Pom. Glisser : caméra.");
      if(document.body.dataset.skyTouch && health.hp>0) status.textContent=environment.poms.some(p=>p.owner===localId)?"Actions puis toucher pour tirer.":"Toucher : marcher. Appui long : actions. Deux doigts : caméra.";
      if (health.spectator && map === "arena") status.textContent = "Tribunes : spectateur";
      if (environment.game) status.textContent = result.notice ?? (document.body.dataset.skyTouch?"Toucher : marcher. Actions puis toucher un objet pour chercher.":"Rolent : clic droit pour chercher un objet proche.");
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
      if (me && needsCorrection(me.position, position, submitted)) {
        Object.assign(me.position, position);
        path = [];
        movementTrace = [];
      }
    },
    movement() {
      return {
        ...this.position(),
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
        x: ((p.x + 1) * innerWidth) / 2,
        y: ((1 - p.y) * innerHeight) / 2,
      };
    },
    cameraAngles() {
      return { yaw, pitch };
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
      menu.remove();
      status.remove();
      labels.remove();
      style.remove();
      dialogues.dispose();
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
