import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { createDialogues } from "./dialogue.mjs";
import { advance, route, nearestCell, pointAt, facing } from "./movement.mjs";
const ASSETS = new URL(
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
  let path = [],
    yaw = 0,
    pitch = Math.atan2(11, 13),
    drag = null,
    zoom = 8,
    follow = new THREE.Vector3(spawn.x, spawn.y, spawn.z),
    localId = null,
    lastTime = performance.now(),
    disposed = false;
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
    const character = catalogue[player.character]
      ? player.character
      : "Estelle";
    if (avatar && avatar.character === character) {
      avatar.target = { x: player.x, y: player.y ?? 0, z: player.z };
      return avatar;
    }
    if (avatar) {
      scene.remove(avatar.mesh);
      avatar.mesh.geometry.dispose();
      avatar.mesh.material.map.dispose();
      avatar.mesh.material.dispose();
    }
    const info = catalogue[character];
    if (!textures.has(character))
      textures.set(
        character,
        textureLoader.loadAsync(new URL(info.texture, ASSETS).href),
      );
    const base = await textures.get(character),
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
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
    canvas.setPointerCapture(event.pointerId);
  }
  function pointermove(event) {
    if (!drag || event.pointerId !== drag.id) return;
    yaw -= (event.clientX - drag.x) * 0.006;
    pitch = THREE.MathUtils.clamp(
      pitch + (event.clientY - drag.y) * 0.005,
      Math.PI / 9,
      (Math.PI * 5) / 12,
    );
    drag.x = event.clientX;
    drag.y = event.clientY;
  }
  function endDrag() {
    const previous = drag;
    drag = null;
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
    if (me) {
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
      const motion =
        id === localId
          ? advance(avatar.position, path, seconds)
          : advance(
              avatar.position,
              avatar.target ? [avatar.target] : [],
              seconds,
              6,
            );
      if (motion.moving) {
        avatar.heading = { dx: motion.dx, dz: motion.dz };
        avatar.time += seconds;
      } else avatar.time = 0;
      avatar.direction = facing(
        avatar.heading.dx,
        avatar.heading.dz,
        right,
        forward,
      );
      const poses = motion.moving ? avatar.info.run : avatar.info.idle,
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
        if (player.id === localId) continue;
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
    correct(position) {
      const me = avatars.get(localId);
      if (
        me &&
        position &&
        Math.hypot(me.position.x - position.x, me.position.z - position.z) > 0.8
      ) {
        Object.assign(me.position, position);
        path = [];
      }
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
      dialogues.dispose();
      renderer.dispose();
    },
  };
}
