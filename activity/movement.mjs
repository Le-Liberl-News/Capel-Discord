export const SPEED = 3.5;
export function cellAt(grid, x, z) {
  return {
    x: Math.round((x - grid.origin.x) / grid.step),
    z: Math.round((z - grid.origin.z) / grid.step),
  };
}
export function indexAt(grid, x, z) {
  return x < 0 || z < 0 || x >= grid.width || z >= grid.height
    ? -1
    : z * grid.width + x;
}
export function walkable(grid, x, z) {
  const i = indexAt(grid, x, z);
  return i >= 0 && grid.cells[i] !== null;
}
export function pointAt(grid, cell) {
  return {
    x: grid.origin.x + cell.x * grid.step,
    z: grid.origin.z + cell.z * grid.step,
    y: grid.cells[indexAt(grid, cell.x, cell.z)],
  };
}
export function nearestCell(grid, point) {
  const start = cellAt(grid, point.x, point.z);
  if (walkable(grid, start.x, start.z)) return start;
  let best = null,
    distance = Infinity;
  for (let z = 0; z < grid.height; z++)
    for (let x = 0; x < grid.width; x++)
      if (walkable(grid, x, z)) {
        const d = (x - start.x) ** 2 + (z - start.z) ** 2;
        if (d < distance) {
          distance = d;
          best = { x, z };
        }
      }
  return best;
}
export function route(grid, from, to) {
  const start = nearestCell(grid, from),
    goal = cellAt(grid, to.x, to.z);
  if (!start || !walkable(grid, goal.x, goal.z)) return [];
  const a = indexAt(grid, start.x, start.z),
    b = indexAt(grid, goal.x, goal.z),
    open = new Set([a]),
    previous = new Map(),
    costs = new Map([[a, 0]]);
  const heuristic = (i) =>
    Math.hypot((i % grid.width) - goal.x, Math.floor(i / grid.width) - goal.z);
  while (open.size) {
    let current = -1,
      score = Infinity;
    for (const i of open) {
      const s = costs.get(i) + heuristic(i);
      if (s < score) {
        score = s;
        current = i;
      }
    }
    if (current === b) {
      const points = [];
      while (current !== a) {
        points.push(
          pointAt(grid, {
            x: current % grid.width,
            z: Math.floor(current / grid.width),
          }),
        );
        current = previous.get(current);
      }
      points.reverse();
      const destination = {x:to.x,z:to.z,y:grid.cells[b]};
      if (!points.length || Math.hypot(points.at(-1).x-to.x,points.at(-1).z-to.z)>1e-6) points.push(destination);
      return smoothRoute(grid, from, points);
    }
    open.delete(current);
    const x = current % grid.width,
      z = Math.floor(current / grid.width);
    for (const [dx, dz] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ]) {
      const nx = x + dx,
        nz = z + dz,
        next = indexAt(grid, nx, nz);
      if (!walkable(grid, nx, nz)) continue;
      if (Math.abs(grid.cells[next] - grid.cells[current]) > 0.35) continue;
      if (
        dx &&
        dz &&
        (!walkable(grid, x + dx, z) || !walkable(grid, x, z + dz))
      )
        continue;
      const cost = costs.get(current) + Math.hypot(dx, dz);
      if (cost >= (costs.get(next) ?? Infinity)) continue;
      previous.set(next, current);
      costs.set(next, cost);
      open.add(next);
    }
  }
  return [];
}
// Remove grid zigzags on a clear, level floor; preserve individual stair rises.
export function smoothRoute(grid, from, points) {
  const clear = (a, b) => {
    if (Math.abs((a.y ?? b.y) - b.y) > 0.02) return false;
    const distance = Math.hypot(b.x - a.x, b.z - a.z);
    const steps = Math.max(1, Math.ceil(distance / (grid.step / 4)));
    let previous = cellAt(grid, a.x, a.z);
    for (let i = 0; i <= steps; i++) {
      const f = i / steps, cell = cellAt(grid, a.x + (b.x - a.x) * f, a.z + (b.z - a.z) * f);
      if (!walkable(grid, cell.x, cell.z) || Math.abs(grid.cells[indexAt(grid, cell.x, cell.z)] - b.y) > 0.02) return false;
      if (cell.x !== previous.x && cell.z !== previous.z &&
        (!walkable(grid, cell.x, previous.z) || !walkable(grid, previous.x, cell.z))) return false;
      previous = cell;
    }
    return true;
  };
  const result = []; let anchor = from, start = 0;
  while (start < points.length) {
    let end = start;
    for (let i = start + 1; i < points.length; i++) if (clear(anchor, points[i])) end = i;
    result.push(points[end]); anchor = points[end]; start = end + 1;
  }
  return result;
}
export function advance(position, points, seconds, speed = SPEED, record = () => {}) {
  let remaining = Math.max(0, seconds) * speed,
    moved = 0,
    dx = 0,
    dz = 0;
  while (points.length && remaining > 0) {
    const next = points[0],
      x = next.x - position.x,
      z = next.z - position.z,
      distance = Math.hypot(x, z);
    if (distance < 1e-6) {
      points.shift();
      continue;
    }
    const length = Math.min(distance, remaining);
    dx = x / distance;
    dz = z / distance;
    position.x += dx * length;
    position.z += dz * length;
    position.y = (position.y ?? 0) + ((next.y ?? position.y ?? 0) - (position.y ?? 0)) * (length / distance);
    record({ ...position });
    moved += length;
    remaining -= length;
    if (length >= distance - 1e-6) points.shift();
  }
  return { moving: moved > 1e-5, dx, dz };
}
export function facing(dx, dz, right, forward) {
  const horizontal = dx * right.x + dz * right.z,
    vertical = dx * forward.x + dz * forward.z;
  return (
    ((Math.round((Math.PI - Math.atan2(vertical, horizontal)) / (Math.PI / 4)) %
      8) +
      8) %
    8
  );
}
