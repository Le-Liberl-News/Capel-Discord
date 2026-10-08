export function createMapMusic(url) {
  const audio = new Audio(url.href);
  audio.loop = true;
  audio.volume = 0.25;
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
  document.body.append(button);
  document.addEventListener("pointerdown", gesture);
  document.addEventListener("keydown", gesture);
  update();
  void play();
  return { dispose() {
    audio.pause();
    document.removeEventListener("pointerdown", gesture);
    document.removeEventListener("keydown", gesture);
    audio.removeAttribute("src");
    audio.load();
    button.remove();
  }};
}
