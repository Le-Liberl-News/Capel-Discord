import worldModule from "../utils/activityWorld.js";
// Only the visual Pom is predicted. HP and other players remain server-owned.
export function createShotPrediction(grid, geometry, origin, aim) {
  let clock = 0;
  const world = worldModule.createActivityWorld({ grid, geometry, now: () => clock, ballSpawn: { ...origin, y: origin.y + .375 } });
  const player = { id: "prediction", ...origin, hp: 100 }, players = new Map([[player.id, player]]);
  world.action(player, { type: "pickup" }, players);
  const result = world.action(player, { type: "throw", aim }, players);
  if (result.error) return null;
  return { update(dt) { clock += dt * 1000; world.tick(players); return world.snapshot().pom; } };
}
