async function syncApplicationCommands(rest, commands) {
  // The token identifies the bot application; unrelated activity env IDs cannot
  // accidentally direct registration at another app.
  const application = await rest.get("/oauth2/applications/@me");
  const route = "/applications/" + application.id + "/commands";
  const existing = await rest.get(route);
  const keys = ["id", "type", "name", "name_localizations", "description", "description_localizations", "handler", "contexts", "integration_types", "default_member_permissions", "nsfw"];
  const entryPoints = existing.filter(c => c.type === 4).map(c => Object.fromEntries(keys.filter(k => c[k] !== undefined).map(k => [k,c[k]])));
  for(const entry of entryPoints)entry.handler=1;
  await rest.put(route, { body: [...commands, ...entryPoints] });
  const registered = await rest.get(route);
  for (const command of commands) {
    if (!registered.some(c => c.name === command.name && (c.type ?? 1) === (command.type ?? 1)))
      throw new Error("Commande non enregistrée : " + command.name);
  }
  if (entryPoints.some(c => !registered.some(r => r.id === c.id))) throw new Error("Point de lancement de l'activité absent.");
  return registered.map(c => ({name:c.name,type:c.type}));
}
module.exports = { syncApplicationCommands };
