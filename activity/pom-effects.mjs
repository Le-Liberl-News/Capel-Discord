export function createPomEffects(THREE, scene, canvas) {
  const count = 100, positions = new Float32Array(count * 3), colors = new Float32Array(count * 3);
  const particles = Array.from({ length: count }, () => ({ age: 1, x: 0, y: 0, z: 0 }));
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const image = document.createElement("canvas"); image.width = image.height = 32;
  const ctx = image.getContext("2d"), gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, "rgba(255,255,255,1)"); gradient.addColorStop(0.25, "rgba(255,255,255,.9)"); gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, 32, 32);
  const texture = new THREE.CanvasTexture(image);
  const material = new THREE.PointsMaterial({ size: 0.45, map: texture, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const points = new THREE.Points(geometry, material); points.frustumCulled = false; scene.add(points);
  let audio, cursor = 0, previous, accumulator = 0;
  const unlock = () => {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    audio ??= new Audio();
    if (audio.state === "suspended") audio.resume().catch(() => {});
  };
  canvas.addEventListener("pointerdown", unlock); window.addEventListener("keydown", unlock);
  return {
    launch() {
      previous = null;
      if (!audio || audio.state !== "running") return;
      // A short filtered air burst plus a falling tone, generated locally.
      const t = audio.currentTime, buffer = audio.createBuffer(1, Math.ceil(audio.sampleRate * 0.22), audio.sampleRate);
      const data = buffer.getChannelData(0); for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      const source = audio.createBufferSource(), filter = audio.createBiquadFilter(), gain = audio.createGain();
      source.buffer = buffer; filter.type = "bandpass"; filter.frequency.setValueAtTime(2200, t); filter.frequency.exponentialRampToValueAtTime(350, t + 0.2);
      gain.gain.setValueAtTime(0.001, t); gain.gain.exponentialRampToValueAtTime(0.3, t + 0.012); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      source.connect(filter).connect(gain).connect(audio.destination); source.start(t); source.stop(t + 0.22);
      const oscillator = audio.createOscillator(), tone = audio.createGain(); oscillator.frequency.setValueAtTime(330, t); oscillator.frequency.exponentialRampToValueAtTime(90, t + 0.16);
      tone.gain.setValueAtTime(0.09, t); tone.gain.exponentialRampToValueAtTime(0.001, t + 0.18); oscillator.connect(tone).connect(audio.destination); oscillator.start(t); oscillator.stop(t + 0.18);
    },
    update(dt, position, flying) {
      if (flying && position) {
        accumulator += dt * 100;
        const total = Math.min(20, Math.floor(accumulator)); accumulator -= total;
        for (let i = 0; i < total; i++) {
          const p = particles[cursor++ % count], f = (i + 1) / total;
          const start = previous && previous.distanceTo(position) < 3 ? previous : position;
          p.x = start.x + (position.x - start.x) * f + (Math.random() - 0.5) * 0.12;
          p.y = start.y + (position.y - start.y) * f; p.z = start.z + (position.z - start.z) * f;
          p.age = 0;
        }
        previous = position.clone();
      } else { previous = null; accumulator = 0; }
      particles.forEach((p, i) => {
        p.age += dt; p.y += dt * 0.4;
        positions.set([p.x, p.y, p.z], i * 3);
        const fade = Math.max(0, 1 - p.age / 0.45);
        colors.set([fade, fade * fade * 0.65, fade ** 4 * 0.08], i * 3);
      });
      geometry.attributes.position.needsUpdate = geometry.attributes.color.needsUpdate = true;
    },
    dispose() { canvas.removeEventListener("pointerdown", unlock); window.removeEventListener("keydown", unlock); audio?.close(); scene.remove(points); geometry.dispose(); material.dispose(); texture.dispose(); },
  };
}
