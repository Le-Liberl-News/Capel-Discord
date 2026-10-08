export async function createPomEffects(THREE, scene, canvas, assets) {
  const loader = new THREE.TextureLoader();
  const [boltTexture, frameTexture] = await Promise.all([
    loader.loadAsync(new URL("effects/fire-bolt.png", assets).href),
    loader.loadAsync(new URL("effects/fire-frames.png", assets).href),
  ]);
  for (const texture of [boltTexture, frameTexture]) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.LinearFilter;
  }
  const material = new THREE.SpriteMaterial({ map: boltTexture, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const bolt = new THREE.Sprite(material); bolt.scale.set(3.2, 0.8, 1); bolt.visible = false; scene.add(bolt);
  const flames = Array.from({ length: 3 }, (_, i) => {
    const texture = frameTexture.clone(); texture.repeat.set(0.25, 1);
    const flame = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 1 - i * 0.23 }));
    flame.scale.setScalar(1.15 - i * 0.2); flame.visible = false; scene.add(flame); return flame;
  });
  let audio, previous, elapsed = 0;
  const direction = new THREE.Vector3(1,0,0), right = new THREE.Vector3(), up = new THREE.Vector3();
  const unlock = () => {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    audio ??= new Audio();
    if (audio.state === "suspended") audio.resume().catch(() => {});
  };
  canvas.addEventListener("pointerdown", unlock); window.addEventListener("keydown", unlock);
  return {
    launch() {
      previous = null; elapsed = 0;
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
    update(dt, position, flying, camera) {
      elapsed += dt;
      bolt.visible = !!(flying && position);
      for (const flame of flames) flame.visible = bolt.visible;
      if (!bolt.visible) { previous = null; return; }
      if (previous && previous.distanceToSquared(position) > 0.000001)
        direction.copy(position).sub(previous).normalize();
      previous = position.clone();
      // The original FIRE texture points right. Rotate its billboard into the
      // actual screen direction and keep the bright tip just behind the Pom.
      right.setFromMatrixColumn(camera.matrixWorld, 0);
      up.setFromMatrixColumn(camera.matrixWorld, 1);
      material.rotation = Math.atan2(direction.dot(up), direction.dot(right));
      bolt.position.copy(position).addScaledVector(direction, -1.25);
      flames.forEach((flame, i) => {
        flame.position.copy(position).addScaledVector(direction, -0.5 - i * 0.5);
        flame.material.map.offset.x = ((Math.floor(elapsed * 16) + i) % 4) / 4;
        flame.scale.setScalar((1.15 - i * 0.2) * (1 + Math.sin(elapsed * 30 + i) * 0.08));
      });
    },
    dispose() {
      canvas.removeEventListener("pointerdown", unlock); window.removeEventListener("keydown", unlock); audio?.close();
      scene.remove(bolt); material.dispose(); boltTexture.dispose(); frameTexture.dispose();
      for (const flame of flames) { scene.remove(flame); flame.material.map.dispose(); flame.material.dispose(); }
    },
  };
}
