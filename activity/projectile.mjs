// Follow authoritative segments, including every corner, without predicting through walls.
export function createProjectilePlayback() {
  let shot, time = 0, state, settled, prediction, predicted;
  return {
    predict(simulation) { prediction = simulation; predicted = simulation.update(0); time = 0; settled = null; },
    cancelPrediction() { prediction = null; predicted = null; },
    receive(next) {
      const changed = next?.shotId != null && next.shotId !== shot;
      const launched = changed && next.mode === "flight";
      if (changed) { shot = next.shotId; if (!prediction) time = 0; settled = null; }
      state = next;
      return launched && !prediction;
    },
    update(dt, position) {
      if (prediction) {
        predicted = prediction.update(dt);
        if (!state || state.mode === "held" || state.mode === "flight") {
          Object.assign(position, { x: predicted.x, y: predicted.y, z: predicted.z });
          return predicted.mode === "flight";
        }
        // An authoritative stop/hit overrides prediction without replaying the launch.
        prediction = null; predicted = null; settled = { ...position };
        time = state.trajectory?.at(-1)?.t ?? 0;
      }
      if (!state || state.mode === "held") return false;
      const points = state.trajectory;
      if (!points?.length) { Object.assign(position, { x: state.x, y: state.y, z: state.z }); return false; }
      const previous = { ...position };
      const end = points.at(-1).t;
      const target = state.mode === "flight" ? Math.max(0, end - 0.12) : end;
      time = Math.min(end, time + dt * (target - time > 0.3 ? 1.35 : 1));
      let a = points[0], b = a;
      for (const point of points) { if (point.t <= time) a = point; else { b = point; break; } b = a; }
      const fraction = b.t > a.t ? (time - a.t) / (b.t - a.t) : 0;
      if (!settled) for (const key of ["x", "y", "z"]) position[key] = a[key] + (b[key] - a[key]) * fraction;
      if (state.mode === "rest" && time >= end) {
        // Ease the final drop onto the floor instead of snapping down.
        settled ??= { ...position };
        const f = 1 - Math.exp(-dt * 12);
        for (const key of ["x", "y", "z"]) { settled[key] += (state[key] - settled[key]) * f; position[key] = settled[key]; }

      }
      return (state.mode === "flight" || time < end) && Math.hypot(position.x - previous.x, position.y - previous.y, position.z - previous.z) > .00001;
    },
  };
}
