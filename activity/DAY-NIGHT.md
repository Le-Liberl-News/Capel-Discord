# Jour et nuit

Un cycle complet dure 120 secondes. L’heure reçue du serveur aligne toutes les maps et tous les joueurs. Le cycle continue quand personne n’est connecté et reste identique après un changement de map.

`activity/day-night.mjs` conserve les textures, les transparences et les couleurs natives. Les teintes passent progressivement du jour à la nuit ; les ombres ajoutées de Rolent disparaissent la nuit. Les personnages suivent le même éclairage, mais les effets de combat restent lumineux.

`MAP_LIGHTS` définit les sources locales par map : `id`, `position` (x, y, z), `color` (RGB linéaire), `radius` et `strength`. Le Capel est la première source configurée. L’éclairage varie avec la distance et s’allume à la tombée de la nuit. Cette version ne calcule pas encore l’occlusion des sources locales par les murs : les lampadaires et bougies nécessitent leur placement précis et cette étape pour éviter la lumière traversante.

La prévisualisation expose `setDayTime(milliseconds)` pour comparer les phases sans attendre (`60000` : midi, `0` : minuit, `null` : cycle normal). Aucun réglage de test n’est publié dans l’interface.
