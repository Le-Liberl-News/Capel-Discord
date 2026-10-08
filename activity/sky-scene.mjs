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
export async function createSkyScene(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: false,
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x201b18);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene(),
    camera = new THREE.OrthographicCamera(-12, 12, 8, -8, 0.1, 150),
    avatars = new Map(),
    catalogue = await fetch(new URL("characters.json", ASSETS)).then((r) =>
      r.json(),
    );
  const loaded = await new GLTFLoader().loadAsync(
    new URL("anterose.gltf", ASSETS).href,
  );
  const model = loaded.scene;
  scene.add(model);
  model.traverse((object) => {
    if (object.isMesh) {
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      for (const material of materials)
        if (material.map) {
          material.map.magFilter = THREE.NearestFilter;
          material.map.minFilter = THREE.LinearFilter;
          material.map.needsUpdate = true;
        }
    }
  });
  const grid = await fetch(new URL("navigation.json", ASSETS)).then((r) =>
    r.json(),
  );
  const dialogues = await createDialogues(ASSETS);
  const spawn = grid.spawn ?? pointAt(grid, nearestCell(grid, { x: 0, z: 0 }));
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
    pitch = Math.atan2(11, 13),
    drag = null,
    zoom = 8,
    follow = new THREE.Vector3(spawn.x, spawn.y, spawn.z),
    localId = null,
    lastTime = performance.now(),
    disposed = false;
  const actionQueue = [];
  let environment = { npcs: [], pom: null, receivedAt: 0 },
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
  const oldHelp = document.getElementById("aide");
  if (oldHelp) oldHelp.hidden = true;
  function queueAction(type, target) {
    if (actionQueue.length >= 8) return;
    actionQueue.push({ id: crypto.randomUUID(), type, target });
    menu.hidden = true;
  }
  function interaction(event) {
    const me = avatars.get(localId);
    if (!me || health.hp === 0) return;
    const nearby = (p, r = 2.2) =>
      Math.hypot(p.x - me.position.x, p.z - me.position.z) <= r &&
      Math.abs((p.y ?? 0) - me.position.y) < 1.8;
    pointer.set(
      (event.clientX / innerWidth) * 2 - 1,
      1 - (event.clientY / innerHeight) * 2,
    );
    raycaster.setFromCamera(pointer, camera);
    const candidates = [...avatars].filter(
      ([id]) => id !== localId && id !== "world:pom",
    );
    const hit = raycaster.intersectObjects(
      candidates.map(([, a]) => a.mesh),
    )[0];
    const selected = hit && candidates.find(([, a]) => a.mesh === hit.object);
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
    const ball = environment.pom;
    if (ball?.mode === "rest" && nearby(ball, 2))
      options.push(["Ramasser le Pom", "pickup"]);
    if (ball?.owner === localId) {
      if (selected && !selected[1].npc && selected[1].hp !== 0)
        options.unshift([
          "Lancer sur " + selected[1].displayName,
          "throw",
          selected[0],
        ]);
      else status.textContent = "Clic droit sur un joueur pour lancer le Pom.";
    }
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
  const textureLoader = new THREE.TextureLoader();
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
    const character = catalogue[player.character]
      ? player.character
      : "Estelle";
    if (avatar && avatar.character === character && avatar.dead === dead) {
      avatar.displayName = player.nom ?? player.name ?? player.character;
      avatar.hp = player.hp ?? 100;
      avatar.npc = !!player.npc;
      avatar.walking = !!player.moving;
      if (player.heading) avatar.heading = player.heading;
      avatar.target = { x: player.x, y: player.y ?? 0, z: player.z };
      return avatar;
    }
    if (avatar) {
      scene.remove(avatar.mesh);
      avatar.mesh.geometry.dispose();
      avatar.mesh.material.map.dispose();
      avatar.mesh.material.dispose();
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
    geometry.translate(0, info.height / 2, 0);
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
      character,
      displayName: player.nom ?? player.name ?? player.character,
      dead,
      hp: player.hp ?? 100,
      npc: !!player.npc,
      walking: !!player.moving,
      fallbackDeath: dead && !baseInfo.death,
      info,
      position: {
        x: player.x ?? spawn.x,
        y: player.y ?? spawn.y,
        z: player.z ?? spawn.z,
      },
      target: null,
      direction: 6,
      heading: { dx: 0, dz: -1 },
      time: 0,
    };
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
    endDrag();
  }
  function click(event) {
    if (event.button !== 0) return;
    menu.hidden = true;
    if (health.hp === 0) return;
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
      const cell = nearestCell(grid, hit.point);
      if (!cell) continue;
      const destination = pointAt(grid, cell);
      if (
        Math.hypot(destination.x - hit.point.x, destination.z - hit.point.z) >
          grid.step * 1.5 ||
        Math.abs(destination.y - hit.point.y) > 0.3
      )
        continue;
      const next = route(grid, me.position, destination);
      if (!next.length) continue;
      path = next;
      marker.position.set(destination.x, destination.y + 0.03, destination.z);
      marker.visible = true;
      break;
    }
  }
  function pointerdown(event) {
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
    zoom = THREE.MathUtils.clamp(zoom + event.deltaY * 0.005, 4, 15);
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
      follow.x + Math.sin(yaw) * Math.cos(pitch) * 17,
      follow.y + Math.sin(pitch) * 17,
      follow.z - Math.cos(yaw) * Math.cos(pitch) * 17,
    );
    camera.lookAt(follow);
    camera.updateMatrixWorld();
    const right = {
        x: camera.matrixWorld.elements[0],
        z: camera.matrixWorld.elements[2],
      },
      forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    if (me && health.hp > 0) {
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
        path = route(grid, me.position, {
          x: me.position.x + dx * 0.6,
          z: me.position.z + dz * 0.6,
        });
        marker.visible = false;
      }
    }
    for (const [id, avatar] of avatars) {
      const ballState = environment.pom,
        isPom = id === "world:pom";
      if (isPom && ballState && ballState.mode !== "held") {
        Object.assign(avatar.position, {
          x: ballState.x,
          y: ballState.y,
          z: ballState.z,
        });
        if (ballState.mode === "flight") {
          const elapsed = Math.min(
            0.18,
            Math.max(0, (time - environment.receivedAt) / 1000),
          );
          for (let t = 0.008; t <= elapsed; t += 0.008) {
            const x = ballState.x + ballState.vx * t,
              z = ballState.z + ballState.vz * t;
            const a = Math.round((x - grid.origin.x) / grid.step),
              b = Math.round((z - grid.origin.z) / grid.step);
            const h =
              a < 0 || b < 0 || a >= grid.width || b >= grid.height
                ? null
                : grid.cells[b * grid.width + a];
            if (h === null || Math.abs(h - (ballState.y - 0.9)) >= 0.65) break;
            avatar.position.x = x;
            avatar.position.z = z;
          }
        }
      }
      const motion = isPom
        ? {
            moving: ballState?.mode === "flight",
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
                avatar.npc && id !== "world:pom" ? 0.8 : 6,
              );
      if (motion.moving || avatar.walking) {
        if (motion.moving) avatar.heading = { dx: motion.dx, dz: motion.dz };
        avatar.time += seconds;
      } else avatar.time = 0;
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
      avatar.mesh.position.set(
        avatar.position.x,
        avatar.position.y,
        avatar.position.z,
      );
      avatar.mesh.rotation.z = avatar.fallbackDeath ? Math.PI / 2 : 0;
      avatar.mesh.rotation.y = Math.atan2(
        camera.position.x - avatar.position.x,
        camera.position.z - avatar.position.z,
      );
    }
    if (me)
      follow.lerp(
        new THREE.Vector3(me.position.x, me.position.y, me.position.z),
        1 - Math.exp(-seconds * 7),
      );
    if (!path.length) marker.visible = false;
    const pomAvatar = avatars.get("world:pom"),
      ball = environment.pom;
    if (pomAvatar && ball?.owner) {
      const owner = avatars.get(ball.owner);
      if (owner) {
        pomAvatar.mesh.position.copy(owner.mesh.position);
        pomAvatar.mesh.position.y += 0.85;
        pomAvatar.mesh.position.x += right.x * 0.3;
        pomAvatar.mesh.position.z += right.z * 0.3;
      }
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
      if (id === "world:pom") continue;
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
    messages(messages) {
      dialogues.receive(messages);
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
          if (current && current.dead !== (player.hp === 0))
            await setAvatar({ ...player, ...current.position });
          else if (current) current.hp = player.hp ?? 100;
          continue;
        }
        present.add(player.id);
        await setAvatar(player);
      }
      for (const [id, avatar] of avatars)
        if (!present.has(id)) {
          scene.remove(avatar.mesh);
          avatar.mesh.geometry.dispose();
          avatar.mesh.material.map.dispose();
          avatar.mesh.material.dispose();
          avatars.delete(id);
        }
    },
    async world(result) {
      environment = {
        npcs: result.npcs ?? [],
        pom: result.pom ?? null,
        receivedAt: performance.now(),
      };
      health = { ...result.health, received: performance.now() };
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
          (environment.pom?.owner === localId
            ? "Pom en main : clic droit sur un joueur pour viser."
            : "Clic droit : parler / ramasser le Pom. Glisser : caméra.");
      if (result.actionResult?.error)
        status.textContent = result.actionResult.error;
      if (result.actionResult?.id === actionQueue[0]?.id) actionQueue.shift();
    },
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
      menu.remove();
      status.remove();
      labels.remove();
      style.remove();
      dialogues.dispose();
      renderer.dispose();
    },
  };
}
