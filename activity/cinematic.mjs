const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const mix = (a, b, t) => a + (b - a) * t;
const CINEMATIC_DURATION = 7400;
function cinematicPhase(elapsed, action, impactAt) {
  const impact = Number.isFinite(action?.impactAt) ? action.impactAt : impactAt;
  const start = Number.isFinite(action?.started) ? Math.min(action.started, impact) : impact - 1200;
  const release = action?.kind==='basic' ? mix(start,impact,.25) : Number.isFinite(action?.releaseAt) ? clamp(action.releaseAt, start, impact) : mix(start, impact, action?.kind === "basic" ? 0.85 : 0.6);
  if (elapsed < 1600) return { kind: "hero", progress: clamp(elapsed / 1600), time: mix(start - 100, release, clamp(elapsed / 1600)) };
  if (elapsed < 3500) return { kind: "follow", progress: clamp((elapsed - 1600) / 1900), time: mix(release, impact, clamp((elapsed - 1600) / 1900)) };
  if (elapsed < 5200) {
    const p = clamp((elapsed - 3500) / 1700);
    return { kind: "impact", progress: p, time: impact - 40 + Math.max(0, p - 0.2) / 0.8 * 440 };
  }
  return { kind: "overhead", progress: clamp((elapsed - 5200) / 2200), time: impact + 400 };
}
function trajectoryPoint(points, time, fallback) {
  if (!points?.length) return fallback;
  if (time <= points[0].t) return { ...points[0] };
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1], b = points[i];
    if (time <= b.t) {
      const p = clamp((time - a.t) / (b.t - a.t || 1));
      return { x: mix(a.x, b.x, p), y: mix(a.y, b.y, p), z: mix(a.z, b.z, p) };
    }
  }
  return { ...points.at(-1) };
}
function historyPair(history, time) {
  if (!history.length) return null;
  if (time <= history[0].time) return { a: history[0], b: history[0], progress: 0 };
  for (let i = 1; i < history.length; i++) if (history[i].time >= time) {
    const a = history[i - 1], b = history[i];
    return { a, b, progress: clamp((time - a.time) / (b.time - a.time || 1)) };
  }
  return { a: history.at(-1), b: history.at(-1), progress: 0 };
}
export {
  CINEMATIC_DURATION,
  cinematicPhase,
  historyPair,
  trajectoryPoint
};
