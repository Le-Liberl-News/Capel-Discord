// Shared action timings: the server owns damage and cooldowns.
const RENNE = {
  basic: { name: "Coup de faux", key: "f", damage: 12, cooldown: 700, windup: 300, duration: 650, range: 2.5, radius: 1.05 },
  art: { name: "Flèche de feu", key: "c", damage: 20, cooldown: 3500, windup: 1000, duration: 1650, range: 9, radius: 1.4 },
  craft: { name: "Cercle sanglant", key: "g", damage: 30, cooldown: 6000, windup: 650, duration: 1650, range: 8, radius: 1.9 },
};
function attackPoint(origin, aim, kind) {
  const spec = RENNE[kind];
  if (!spec || !aim || ![aim.x, aim.y, aim.z].every(Number.isFinite)) return null;
  const dx = aim.x - origin.x, dz = aim.z - origin.z, distance = Math.hypot(dx, dz);
  if (distance < .05 || distance > 150 || Math.abs(aim.y - origin.y) > 30) return null;
  const length = Math.min(distance, spec.range);
  return { x: origin.x + dx * length / distance, y: kind === "basic" ? origin.y : origin.y + (aim.y - origin.y) * length / distance, z: origin.z + dz * length / distance };
}
module.exports = { RENNE, attackPoint };
