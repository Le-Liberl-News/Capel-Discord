export function createMapMusic(url) {
  const audio = new Audio(url.href);
  audio.loop = true;
  audio.volume = 0.1;
  try { const saved = localStorage.getItem("sky-music-volume"); if (saved !== null && Number.isFinite(Number(saved))) audio.volume = Math.max(0, Math.min(1, Number(saved))); } catch {}
  audio.preload = "auto";
  const button = document.createElement("button");
  button.type = "button";
  button.style.cssText = "position:fixed;right:16px;bottom:16px;padding:8px 12px;border:1px solid #b49760;border-radius:4px;background:#201b18dd;color:#e8d5ad;cursor:pointer;font:12px system-ui";
  let disabled = false, pending = false;
  try { disabled = localStorage.getItem("anterose-music-muted") === "1"; } catch {}
  function update() {
    button.textContent = disabled ? "\u266b Musique coup\u00e9e" : audio.paused ? "\u266b Activer la musique" : "\u266b Musique";
    button.setAttribute("aria-label", disabled || audio.paused ? "Activer la musique" : "Couper la musique");
    button.setAttribute("aria-pressed", String(!disabled && !audio.paused));
  }
  async function play() {
    if (disabled || pending || !audio.paused) return;
    pending = true;
    try { await audio.play(); } catch { /* Retry on a real user gesture. */ }
    finally { pending = false; update(); }
  }
  function gesture(event) {
    if (event.target === button) return;
    if (event.type === "keydown" && event.repeat) return;
    void play();
  }
  button.addEventListener("click", () => {
    disabled = !audio.paused && !disabled;
    if (disabled) audio.pause();
    else void play();
    try { localStorage.setItem("anterose-music-muted", disabled ? "1" : "0"); } catch {}
    update();
  });
  audio.addEventListener("playing", update);
  audio.addEventListener("pause", update);
  audio.addEventListener("error", () => {
    button.textContent = "\u266b Musique indisponible";
    button.title = "Le fichier audio n\u2019a pas pu \u00eatre charg\u00e9.";
  });
  const panel = document.createElement("div"); panel.id="sky-music";
  panel.style.cssText = "position:fixed;right:16px;bottom:16px;display:flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid #b49760;border-radius:4px;background:#201b18ee;color:#e8d5ad;font:12px system-ui";
  button.style.cssText = "border:0;background:transparent;color:inherit;cursor:pointer;font:inherit";
  const slider = document.createElement("input"); slider.type = "range"; slider.min = "0"; slider.max = "100"; slider.step = "1"; slider.value = String(Math.round(audio.volume * 100));
  slider.style.cssText = "width:100px;accent-color:#dab36a"; slider.setAttribute("aria-label", "Volume de la musique");
  slider.addEventListener("input", () => {
    audio.volume = Number(slider.value) / 100;
    slider.title = slider.value + " %";
    try { localStorage.setItem("sky-music-volume", String(audio.volume)); } catch {}
    void play();
  });
  panel.append(button, slider); document.body.append(panel);
  document.addEventListener("pointerdown", gesture);
  document.addEventListener("keydown", gesture);
  update();
  void play();
  return { restart(){audio.currentTime=0;void play();}, setTrack(url) { audio.pause(); audio.src = url.href; audio.load(); void play(); }, dispose() {
    audio.pause();
    document.removeEventListener("pointerdown", gesture);
    document.removeEventListener("keydown", gesture);
    audio.removeAttribute("src");
    audio.load();
    panel.remove();
  }};
}
