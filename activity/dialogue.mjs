import {createCharacterVoices} from './character-voices.mjs';
import * as THREE from "three";
import { placeDialogues } from "./dialogue-placement.mjs";
import {
  DialogueQueue,
  graphemes,
  paginateDialogue,
  typewriterState,
} from "./dialogue-text.mjs";
export async function createDialogues(assets) {
  const url = (name) => new URL("dialogue/" + name, assets).href;
  const font = await new FontFace(
    "AveriaSky",
    'url("' + url("AveriaSansLibre-Regular.ttf") + '")',
  ).load();
  document.fonts.add(font);
  await Promise.all(
    ["frame.png", "name.png", "tail.png", "continue.png"].map(async (name) => {
      const image = new Image();
      image.src = url(name);
      await image.decode();
    }),
  );
  const style = document.createElement("style");
  style.textContent = [
    "#sky-dialogues{position:fixed;inset:0;pointer-events:none;z-index:10}",
    '.sky-dialogue{position:absolute;box-sizing:border-box;border:24px solid transparent;border-image:url("' +
      url("frame.png") +
      '") 32 fill / 24px stretch;color:#fff;font:24px/1.3 AveriaSky,sans-serif;filter:drop-shadow(2px 3px 2px #0009);text-shadow:1px 2px 1px #000;--speaker-x:70%;--tail-height:30px}',
    '.sky-dialogue-name{color:#ffd778;font-size:27px;line-height:36px;height:36px;margin:-8px -8px 10px;padding:0 16px;overflow:hidden;white-space:nowrap;border-image:url("' +
      url("name.png") +
      '") 0 8 0 8 fill / 0 8px 0 8px stretch}',
    ".sky-dialogue-text{white-space:pre-wrap;overflow-wrap:anywhere;padding-bottom:16px}",
    '.sky-dialogue-tail{position:absolute;left:calc(var(--speaker-x) - 30px);top:calc(100% + 14px);width:40px;height:var(--tail-height);background:url("' +
      url("tail.png") +
      '") center/100% 100% no-repeat}',
    '.sky-dialogue-continue{position:absolute;bottom:-21px;left:calc(var(--speaker-x) - 12px);width:24px;height:26px;background:url("' +
      url("continue.png") +
      '") center/100% 100% no-repeat;animation:sky-dialogue-pulse .8s ease-in-out infinite alternate}',
    '.sky-dialogue[data-side="below"] .sky-dialogue-tail{top:auto;bottom:calc(100% + 14px);transform:scaleY(-1)}',
    '.sky-dialogue[data-side="below"] .sky-dialogue-continue{bottom:auto;top:-21px;rotate:180deg}',
    "@keyframes sky-dialogue-pulse{to{transform:translateY(3px)}}",
    "@media(prefers-reduced-motion:reduce){.sky-dialogue-continue{animation:none}}",
  ].join("\n");
  document.head.append(style);
  const layer = document.createElement("div");
  layer.id = "sky-dialogues";
  document.body.append(layer);
  const voices=createCharacterVoices(assets);
  const queue = new DialogueQueue(),
    active = new Map();
  const context = document.createElement("canvas").getContext("2d");
  context.font = "24px AveriaSky";
  function widthFor(message) {
    const textWidth = Math.max(
      ...message.text
        .split("\n")
        .map((line) => context.measureText(line).width),
    );
    const nameWidth =
      (context.measureText(message.character).width * 27) / 24 + 32;
    return Math.min(
      560,
      innerWidth - 32,
      Math.max(240, Math.max(textWidth, nameWidth) + 52),
    );
  }
  function open(author, message, time,avatar) {
    voices.speak(avatar.character);
    const width = widthFor(message),
      pages = paginateDialogue(
        message.text,
        (text) => context.measureText(text).width,
        width - 48,
      );
    const element = document.createElement("section");
    element.className = "sky-dialogue";
    element.dataset.author = author;
    element.style.width = width + "px";
    element.setAttribute(
      "aria-label",
      message.character + " : " + message.text,
    );
    const name = document.createElement("div");
    name.className = "sky-dialogue-name";
    name.textContent = message.character;
    const text = document.createElement("div");
    text.className = "sky-dialogue-text";
    text.style.height =
      Math.max(...pages.map((page) => page.split("\n").length)) * 31.2 + "px";
    const tail = document.createElement("div");
    tail.className = "sky-dialogue-tail";
    const continuation = document.createElement("div");
    continuation.className = "sky-dialogue-continue";
    continuation.hidden = true;
    element.append(name, text, tail, continuation);
    layer.append(element);
    const item = {
      element,
      text,
      continuation,
      pages,
      page: 0,
      characters: graphemes(pages[0]),
      started: time,
      width,
      message,
    };
    active.set(author, item);
    return item;
  }
  return {
    receive(messages) {
      queue.receive(messages);
    },
    update(time, avatars, camera) {
      const anchors = [];
      for (const id of queue.queues.keys())
        if (!avatars.has(id)) queue.remove(id);
      for (const [id, item] of active)
        if (!avatars.has(id)) {
          item.element.remove();
          active.delete(id);
          queue.remove(id);
        }
      for (const [id, avatar] of avatars) {
        let item = active.get(id);
        if (!item) {
          const next = queue.next(id);
          if (next) item = open(id, next, time,avatar);
        }
        if (!item) continue;
        const width = widthFor(item.message);
        if (item.width !== width) {
          item.width = width;
          item.element.style.width = width + "px";
          item.pages = paginateDialogue(
            item.message.text,
            (text) => context.measureText(text).width,
            width - 48,
          );
          item.page = Math.min(item.page, item.pages.length - 1);
          item.characters = graphemes(item.pages[item.page]);
          item.started = time;
          item.text.style.height =
            Math.max(...item.pages.map((page) => page.split("\n").length)) *
              31.2 +
            "px";
        }
        let progress = typewriterState(item.characters, time - item.started);
        if (progress.expired) {
          if (++item.page < item.pages.length) {
            item.started = time;
            item.characters = graphemes(item.pages[item.page]);
            progress = typewriterState(item.characters, 0);
          } else {
            item.element.remove();
            active.delete(id);
            continue;
          }
        }
        item.text.textContent = progress.text;
        item.continuation.hidden = !progress.complete;
        const head = new THREE.Vector3(
          avatar.position.x,
          avatar.position.y + avatar.info.height,
          avatar.position.z,
        ).project(camera);
        const x = ((head.x + 1) * innerWidth) / 2,
          y = ((1 - head.y) * innerHeight) / 2;
        item.element.hidden =
          head.z < -1 ||
          head.z > 1 ||
          x < 0 ||
          x > innerWidth ||
          y < 0 ||
          y > innerHeight;
        if (!item.element.hidden)
          anchors.push({
            id,
            x,
            y: y - 8,
            width: item.width,
            height: item.element.offsetHeight,
          });
      }
      const hud = document.getElementById("hud")?.getBoundingClientRect();
      const placements = placeDialogues(
        anchors,
        { width: innerWidth, height: innerHeight },
        hud
          ? [
              {
                left: hud.left,
                top: hud.top,
                width: hud.width,
                height: hud.height,
              },
            ]
          : [],
      );
      for (const [id, placement] of placements) {
        const item = active.get(id);
        item.element.style.left = placement.left + "px";
        item.element.style.top = placement.top + "px";
        item.element.dataset.side = placement.side;
        // Absolute children use the padding box: compensate for the 24px frame.
        item.element.style.setProperty(
          "--speaker-x",
          placement.anchorX - placement.left - 24 + "px",
        );
        const distance =
          placement.side === "above"
            ? placement.anchorY - placement.top - placement.height + 10
            : placement.top - placement.anchorY + 10;
        item.element.style.setProperty(
          "--tail-height",
          distance / (22 / 24) + "px",
        );
      }
    },
    dispose() {
      voices.dispose();
      layer.remove();
      style.remove();
      document.fonts.delete(font);
      active.clear();
    },
  };
}
