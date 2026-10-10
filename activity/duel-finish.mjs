import { facing } from "./movement.mjs";
import { createArenaCutaway } from "./scene-visibility.mjs";
import { CINEMATIC_DURATION, cinematicPhase, trajectoryPoint, historyPair } from "./cinematic.mjs";
const REPLAY_FRAMES = 20, REPLAY_INTERVAL = 33;
const GIF_INTERVAL=40,GIF_FRAMES=Math.ceil(CINEMATIC_DURATION/GIF_INTERVAL);
function replayWindow(frames, frame, limit = REPLAY_FRAMES) {
  frames.push(frame);
  if (frames.length > limit) frames.shift();
  return frames;
}
function cloneReplayMaterial(source) {
  const clone=source.clone();
  // Keep the native day/night shader without modifying the live material.
  clone.onBeforeCompile=source.onBeforeCompile;
  clone.customProgramCacheKey=source.customProgramCacheKey;
  return clone;
}
function createDuelFinish(THREE, renderer, scene, assets, onCapture, onLeave, model) {
  const width = 448, height = 336, target = new THREE.WebGLRenderTarget(width, height);
  target.texture.colorSpace = THREE.SRGBColorSpace;
  const camera = new THREE.PerspectiveCamera(48, 4 / 3, 0.06, 350), pixels = new Uint8Array(width * height * 4), replay = new THREE.Scene();
  const registry = /* @__PURE__ */ new Map(), textures = /* @__PURE__ */ new Map(), ownedMaterials = /* @__PURE__ */ new Set(), ownedGeometry = /* @__PURE__ */ new Set(), cutaway = createArenaCutaway();
  const panel = document.createElement("div");
  panel.id = "sky-duel-finish";
  panel.hidden = true;
  panel.style.cssText = "position:fixed;inset:0;z-index:36;background:#110e16;overflow:hidden;color:#ffe7b0;text-align:center";
  const style = document.createElement("style");
  style.textContent = "#sky-duel-finish[hidden]{display:none!important}#sky-duel-finish canvas{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}#sky-duel-finish .letterbox{position:absolute;left:0;right:0;height:8%;background:#070508;pointer-events:none}";
  document.head.append(style);
  const view = document.createElement("canvas"), context = view.getContext("2d"), scratch = document.createElement("canvas"), scratchContext = scratch.getContext("2d");
  scratch.width = width;
  scratch.height = height;
  const top = document.createElement("div"), bottom = document.createElement("div");
  top.className = bottom.className = "letterbox";
  top.style.top = "0";
  bottom.style.bottom = "0";
  const title = document.createElement("h2");
  title.style.cssText = "position:absolute;left:12px;right:12px;top:14%;font:clamp(28px,5vw,54px) AveriaSky,sans-serif;margin:0;text-shadow:0 3px 8px #000,0 0 30px #e1a655;opacity:0;transition:opacity .8s";
  const leave = document.createElement("button");
  leave.type = "button";
  leave.textContent = "Retour \xE0 l\u2019Ant\xE9rose";
  leave.style.cssText = "position:absolute;bottom:max(18px,env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);padding:12px 20px;white-space:nowrap;border:1px solid #b49760;border-radius:4px;background:#2d211be8;color:#ffe7b0;font:18px AveriaSky,sans-serif";
  leave.onclick = onLeave;
  const flash = document.createElement("div");
  flash.style.cssText = "position:absolute;inset:0;background:#fff1bf;pointer-events:none;opacity:0";
  panel.append(view, top, bottom, flash, title, leave);
  document.body.append(panel);
  let duel = null, history = [], frames = [], next = 0, finishingAt = null, replayAt = null, encoded = false, worker = null, workerTimer = null, disposed = false, localId = null, clockOffset = 0, displayTarget = null, displayPixels = null, lastCapture = -1;
  const origin = new THREE.Vector3(), victim = new THREE.Vector3(), direction = new THREE.Vector3(), side = new THREE.Vector3(), focus = new THREE.Vector3(), position = new THREE.Vector3();
  function texture(source) {
    if (!source) return null;
    let clone = textures.get(source.uuid);
    if (!clone) {
      clone = source.clone();
      textures.set(source.uuid, clone);
    }
    return clone;
  }
  function material(source) {
    const clone = cloneReplayMaterial(source);
    ownedMaterials.add(clone);
    if (clone.map) clone.map = texture(source.map);
    if (source.clippingPlanes?.length) clone.clippingPlanes = cutaway.planes;
    return clone;
  }
  function register(object, parent) {
    let item = registry.get(object.uuid);
    if (!item) {
      const clone = object.clone(false);
      if (object.material) clone.material = Array.isArray(object.material) ? object.material.map(material) : material(object.material);
      if (object.geometry) {
        clone.geometry = object.geometry.clone();
        ownedGeometry.add(clone.geometry);
      }
      clone.userData = {};
      parent.add(clone);
      item = { clone };
      registry.set(object.uuid, item);
    }
    for (const child of object.children) register(child, item.clone);
  }
  function snapshot(object, nodes) {
    const materials = object.material ? Array.isArray(object.material) ? object.material : [object.material] : [];
    nodes.set(object.uuid, { position: object.position.clone(), quaternion: object.quaternion.clone(), scale: object.scale.clone(), visible: object.visible, projectileDirection: object.userData.skyProjectileDirection ? { ...object.userData.skyProjectileDirection } : null, materials: materials.map((m) => ({ map: m.map, offset: m.map?.offset.clone(), repeat: m.map?.repeat.clone(), opacity: m.opacity, rotation: m.rotation, color: m.color?.clone() })) });
    for (const child of object.children) snapshot(child, nodes);
  }
  function record(time, avatars) {
    const nodes = /* @__PURE__ */ new Map();
    for (const root of scene.children) {
      if (root === model || root.userData.update) continue;
      register(root, replay);
      snapshot(root, nodes);
    }
    const actors = /* @__PURE__ */ new Map();
    for (const [id, a] of avatars) actors.set(id, { uuid: a.mesh.uuid, position: a.mesh.position.clone(), heading: { ...a.heading }, frame: a.renderFrame, map:a.mesh.material.map, dead: a.dead, fallbackDeath: a.fallbackDeath });
    history.push({ time: time + clockOffset, nodes, actors });
    while (history.length > 400) history.shift();
    const retained = new Set(history.flatMap((h) => [...h.nodes.keys()]));
    for (const [id, item] of registry) if (!retained.has(id)) {
      item.ghost?.removeFromParent();item.ghost?.material.map?.dispose();
      item.clone.removeFromParent();
      if (item.clone.geometry) {
        item.clone.geometry.dispose();
        ownedGeometry.delete(item.clone.geometry);
      }
      const ms = item.clone.material ? Array.isArray(item.clone.material) ? item.clone.material : [item.clone.material] : [];
      for (const m of ms) {
        m.dispose();
        ownedMaterials.delete(m);
      }
      registry.delete(id);
    }
    const used = /* @__PURE__ */ new Set();
    for (const h of history) for (const node of h.nodes.values()) for (const m of node.materials) if (m.map) used.add(m.map.uuid);
    for (const [id, t] of textures) if (!used.has(id)) {
      t.dispose();
      textures.delete(id);
    }
  }
  function reset() {
    history = [];
    frames = [];
    finishingAt = replayAt = null;
    encoded = false;
    next = 0;
    lastCapture = -1;
    panel.hidden = true;
    title.style.opacity = "0";
    worker?.terminate();
    worker = null;
    clearTimeout(workerTimer);
    for(const item of registry.values())item.ghost?.material.map?.dispose();
    for (const m of ownedMaterials) m.dispose();
    for (const g of ownedGeometry) g.dispose();
    for (const t of textures.values()) t.dispose();
    ownedMaterials.clear();
    ownedGeometry.clear();
    textures.clear();
    registry.clear();
    replay.clear();
  }
  function prepare() {
    if (model) {
      const backdrop = model.clone(true);
      backdrop.traverse((o) => {
        if (o.material) o.material = Array.isArray(o.material) ? o.material.map(material) : material(o.material);
        o.userData = {};
      });
      replay.add(backdrop);
    }
  }
  function apply(time) {
    const pair = historyPair(history, time);
    if (!pair) return null;
    const { a, b, progress: p } = pair;
    for (const [id, { clone }] of registry) {
      const sa = a.nodes.get(id), sb = b.nodes.get(id), sample = p < 0.5 ? sa ?? sb : sb ?? sa;
      if (!sample) {
        clone.visible = false;
        continue;
      }
      clone.visible = sample.visible;
      clone.userData.projectileDirection = sample.projectileDirection;
      clone.position.copy(sa?.position ?? sample.position).lerp(sb?.position ?? sample.position, p);
      clone.quaternion.copy(sa?.quaternion ?? sample.quaternion).slerp(sb?.quaternion ?? sample.quaternion, p);
      clone.scale.copy(sa?.scale ?? sample.scale).lerp(sb?.scale ?? sample.scale, p);
      const ms = clone.material ? Array.isArray(clone.material) ? clone.material : [clone.material] : [];
      ms.forEach((m, i) => {
        const s = sample.materials[i];
        if (!s) return;
        const map = texture(s.map);
        if (m.map !== map) {
          m.map = map;
          m.needsUpdate = true;
        }
        if (map) {
          map.offset.copy(s.offset);
          map.repeat.copy(s.repeat);
        }
        m.opacity = s.opacity;
        if (s.rotation !== void 0) m.rotation = s.rotation;
        if (s.color) m.color.copy(s.color);
      });
    }
    const actors = /* @__PURE__ */ new Map();
    for (const [id, state] of a.actors) {
      const after = b.actors.get(id) ?? state, selected = p < 0.5 ? state : after;
      actors.set(id, { ...selected, before:state, after, blend:p, position: state.position.clone().lerp(after.position, p) });
    }
    return actors;
  }
  function encode() {
    encoded = true;
    if (frames.length < 4) return;
    worker = new Worker(new URL("combat/gif-worker.js?v=cinematic-20261009-1", assets));
    workerTimer = setTimeout(() => {
      worker?.terminate();
      worker = null;
    }, 90e3);
    worker.onmessage = ({ data }) => {
      clearTimeout(workerTimer);
      worker?.terminate();
      worker = null;
      if (disposed || data.error) return;
      if (duel?.players.includes(localId)) onCapture({ id: duel.result.captureId, bytes: data.bytes });
    };
    worker.onerror = () => {
      clearTimeout(workerTimer);
      worker?.terminate();
      worker = null;
    };
    const buffers = frames.map((frame) => frame.buffer);
    worker.postMessage({ frames: buffers, width, height, delay: Math.round(CINEMATIC_DURATION/frames.length/10)*10, colors: 64,maxBytes:8000000 }, buffers);
    frames = [];
  }
  function read(renderTarget, w, h, output) {
    const previous = renderer.getRenderTarget();
    try {
      renderer.setRenderTarget(renderTarget);
      renderer.render(replay, camera);
      renderer.readRenderTargetPixels(renderTarget, 0, 0, w, h, output);
    } finally {
      renderer.setRenderTarget(previous);
    }
    const frame = new Uint8ClampedArray(output.length);
    for (let y = 0; y < h; y++) frame.set(output.subarray(y * w * 4, (y + 1) * w * 4), (h - y - 1) * w * 4);
    return frame;
  }
  function draw(elapsed) {
    const result = duel.result, phase = cinematicPhase(elapsed, result.action, result.at), actors = apply(phase.time);
    if (!actors) return;
    const winner = actors.get(result.winner), loser = actors.get(result.loser);
    origin.copy(winner?.position ?? new THREE.Vector3());
    victim.copy(loser?.position ?? new THREE.Vector3(result.point.x, result.point.y, result.point.z));
    direction.copy(victim).sub(origin);
    direction.y = 0;
    if (direction.lengthSq() < 0.01) direction.set(0, 0, -1);
    direction.normalize();
    side.set(-direction.z, 0, direction.x);
    const h = Math.min(1.8, winner?.frame?.info?.height ?? 1.6);
    if (phase.kind === "hero") {
      const heading = new THREE.Vector3(winner?.heading.dx ?? 0, 0, winner?.heading.dz ?? -1).normalize();
      const flank = new THREE.Vector3(-heading.z, 0, heading.x);
      focus.copy(origin);
      focus.y += h * 0.56;
      position.copy(origin).addScaledVector(heading, 2.6 - phase.progress * 0.45).addScaledVector(flank, 0.45);
      position.y += h * 0.64;
    } else if (phase.kind === "follow") {
      const action = result.action, trajectory = action?.trajectory;
      if (trajectory?.length) {
        const q = trajectoryPoint(trajectory, (phase.time - action.started) / 1e3, result.point);
        focus.set(q.x, q.y, q.z);
      } else {
        focus.copy(origin);
        if (action?.follow !== "actor" && ["pom", "art", "craft"].includes(action?.kind)) focus.lerp(victim, phase.progress);
        focus.y += 0.9;
      }
      position.copy(focus).addScaledVector(direction, -2.4).addScaledVector(side, 1.2);
      position.y += 1.25;
    } else if (phase.kind === "impact") {
      focus.copy(victim);
      focus.y += 0.65;
      position.copy(victim).addScaledVector(direction, -2.5).addScaledVector(side, 2);
      position.y += 1.4;
      const shake = Math.max(0, 1 - phase.progress * 4) * 0.1;
      position.x += Math.sin(elapsed * 0.17) * shake;
      position.y += Math.cos(elapsed * 0.21) * shake;
    } else {
      const p = phase.progress * phase.progress * (3 - 2 * phase.progress);
      focus.copy(victim);
      focus.y += 0.2;
      position.copy(victim).addScaledVector(direction, -2.5 * (1 - p) + 0.03).addScaledVector(side, 2 * (1 - p));
      position.y += 1.4 + 3.7 * p;
    }
    camera.position.copy(position);
    camera.up.set(0, 1, 0);
    camera.lookAt(focus);
    camera.updateMatrixWorld();
    cutaway.update(camera, focus);
    const right = { x: camera.matrixWorld.elements[0], z: camera.matrixWorld.elements[2] }, forward = { x: -camera.matrixWorld.elements[8], z: -camera.matrixWorld.elements[10] };
    for (const actor of actors.values()) {
      const clone = registry.get(actor.uuid)?.clone;
      if (!clone || !actor.frame) continue;
      const { info, pose } = actor.frame;
      const dir = facing(actor.heading.dx, actor.heading.dz, right, forward) % (info.directions ?? 8), frame = pose * (info.directions ?? 8) + dir;
      clone.visible=true;clone.quaternion.copy(camera.quaternion);
      if (actor.fallbackDeath) clone.rotateZ(Math.PI / 2);
      if (actor.dead) {
        clone.geometry.computeBoundingBox();
        const center = clone.geometry.boundingBox.getCenter(new THREE.Vector3()).applyQuaternion(clone.quaternion);
        clone.position.copy(actor.position).sub(center);
        clone.position.y += 0.08;
      }
      const map = clone.material.map;
      if (map) map.offset.set(frame % info.columns / info.columns, 1 - (Math.floor(frame / info.columns) + 1) / info.rows);
      // Dissolve between recorded sprite poses, rather than holding one sparse
      // snapshot throughout a long slow-motion shot. The live atlas stays untouched.
      const item=registry.get(actor.uuid),after=actor.after,blend=actor.blend;
      if(after?.frame&&blend>0&&blend<1&&actor.before?.frame!==after.frame){
        if(!item.ghost){item.ghost=clone.clone(false);item.ghost.material=clone.material.clone();item.ghost.material.map=null;item.ghost.material.depthWrite=false;item.ghost.material.transparent=true;item.ghost.userData={};clone.parent.add(item.ghost);ownedMaterials.add(item.ghost.material);}
        const ghost=item.ghost,source=after.map;
        if(ghost.userData.source!==source?.uuid){ghost.material.map?.dispose();ghost.material.map=source?.clone();ghost.userData.source=source?.uuid;ghost.material.needsUpdate=true;}
        ghost.visible=clone.visible;ghost.position.copy(clone.position);ghost.quaternion.copy(clone.quaternion);ghost.scale.copy(clone.scale);ghost.material.opacity=blend;
        const next=after.frame.info,d=facing(after.heading.dx,after.heading.dz,right,forward)%(next.directions??8),f=after.frame.pose*(next.directions??8)+d;
        ghost.material.map?.offset.set(f%next.columns/next.columns,1-(Math.floor(f/next.columns)+1)/next.rows);
      }else if(item?.ghost)item.ghost.visible=false;

    }
    for (const { clone } of registry.values()) if (clone.isSprite && clone.userData.projectileDirection) {
      const d = new THREE.Vector3().copy(clone.userData.projectileDirection);
      clone.material.rotation = Math.atan2(d.dot(new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1)), d.dot(new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0)));
    }
    const aspect = innerWidth / innerHeight, w = Math.round(Math.min(960, innerWidth, 960 * aspect)), hh = Math.round(w / aspect);
    if (!displayTarget || view.width !== w || view.height !== hh) {
      displayTarget?.dispose();
      displayTarget = new THREE.WebGLRenderTarget(w, hh);
      displayTarget.texture.colorSpace = THREE.SRGBColorSpace;
      displayPixels = new Uint8Array(w * hh * 4);
      view.width = w;
      view.height = hh;
    }
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    context.putImageData(new ImageData(read(displayTarget, w, hh, displayPixels), w, hh), 0, 0);
    flash.style.opacity = String(phase.kind === "impact" ? Math.max(0, 1 - phase.progress * 8) * 0.65 : 0);
    title.style.opacity = phase.kind === "overhead" ? "1" : "0";
    const captureIndex = Math.min(GIF_FRAMES-1, Math.floor(elapsed / GIF_INTERVAL));
    if (captureIndex > lastCapture) {
      lastCapture = captureIndex;
      camera.aspect = 4 / 3;
      camera.updateProjectionMatrix();
      const frame = read(target, width, height, pixels);
      if (phase.kind === "overhead") {
        scratchContext.putImageData(new ImageData(frame, width, height), 0, 0);
        scratchContext.fillStyle = "#0009";
        scratchContext.fillRect(0, 0, width, 48);
        scratchContext.fillStyle = "#ffe7b0";
        scratchContext.font = "30px AveriaSky,sans-serif";
        scratchContext.textAlign = "center";
        scratchContext.fillText("Victoire de " + result.winnerName, width / 2, 34, width - 24);
        frames.push(new Uint8Array(scratchContext.getImageData(0, 0, width, height).data));
      } else frames.push(new Uint8Array(frame));
    }
  }
  return {
    receive(value, id, serverTime) {
      localId = id;
      if (Number.isFinite(serverTime)) clockOffset = serverTime - performance.now();
      if (value?.id !== duel?.id) reset();
      duel = value;
      if (duel?.result && finishingAt === null) {
        title.textContent = "Victoire de " + duel.result.winnerName + " !";
        finishingAt = performance.now();
      }
    },
    update(time, avatars) {
      if (!duel) return;
      if (!duel.result && time + clockOffset < duel.readyAt) return;
      if (replayAt === null) {
        if (time >= next) {
          next = time + REPLAY_INTERVAL;
          record(time, avatars);
        }
        if (finishingAt !== null && time - finishingAt >= 550) {
          prepare();
          replayAt = time;
          panel.hidden = false;
        } else return;
      }
      if (encoded) {
        if (Math.abs(view.width / view.height - innerWidth / innerHeight) > 0.01) draw(CINEMATIC_DURATION);
        return;
      }
      const elapsed = Math.min(CINEMATIC_DURATION, time - replayAt);
      draw(elapsed);
      if (elapsed >= CINEMATIC_DURATION) encode();
    },
    dispose() {
      disposed = true;
      reset();
      target.dispose();
      displayTarget?.dispose();
      panel.remove();
      style.remove();
    }
  };
}
export {
  REPLAY_FRAMES,
  REPLAY_INTERVAL,
  createDuelFinish,
  cloneReplayMaterial,
  replayWindow
};
