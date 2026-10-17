# Effets natifs de Rean (CS2)

La table anglaise `text/dat_us/t_magic.tbl` associe **Azure Flame Slash** à `AniBtlSCraft00`. Cette fonction se trouve dans `scripts/ani/dat_us/ply000.dat`. Les appels relevés, slots, ancres, paramètres et empreintes des fichiers source sont conservés dans `assets/sky/combat/cs2/flame-effects.json`.

L'extraction utilise `EffFileReader`, `EffSimulation` et `EffShapeGeometry` d'ED8Editor. Les séquences échantillonnées à 30 Hz gardent les chaînes de génération, transformations, couleurs multipliées/ajoutées et découpes UV. `native-cs2-effects.mjs` les dessine par lots avec les mélanges alpha prémultiplié, additif et soustractif correspondants. Les tableaux de sommets sont réutilisés ; chaque instance libère ses géométries et matériaux à sa suppression.

| Fichier natif | Usage dans le craft adapté |
| --- | --- |
| `battle/scre01_1.eff` | Deux premières coupes, avec le mesh `E_EFOBJ038` et sa texture |
| `battle/scre01_3.eff` | Flamme de l'arme, initialement attachée à `R_arm_point:NODE_EFFECT02` |
| `battle/scre00_5.eff` | Départs de rush |
| `battle/scre01_7.eff` | Troisième impact |
| `battle/scre01_6.eff` | Braises après le rush final |
| `battle/scre01_2.eff`, `battle/scre01_4.eff` | Décodés et archivés dans le paquet, sans les fonds de cinématique dans le combat |

L'export du tachi conserve les nœuds non dessinés du modèle, notamment `effect_point02`. Les quatre points projetés de son repère sont enregistrés pour chaque pose et chacune des huit directions ; ils attachent les effets au sprite chibi pendant les changements de banque.

Les animations viennent maintenant de `BTL_S_CRAFT01_02`, `_07`, `_04`, `_05` et `_06`. Le lever et la coupe finale partagent deux fenêtres de `_06`. Le minutage et l'échelle des effets sont adaptés à l'enchaînement à trois coups et à la zone de dégâts du combat ; la simulation des dégâts reste dans `rean-flame-slash.cjs` et `utils/activityReanFlameSlash.js`.

Les outils d'extraction, les sorties brutes du décodeur et les exports de l'atelier sont conservés localement dans `E:/dev/sky-activity-tools/cold-steel2/` et `E:/dev/sky-activity-tools/atelier-sprites/`.
