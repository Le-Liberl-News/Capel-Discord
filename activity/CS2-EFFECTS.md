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

Le premier impact réussi de Rean ou Mueller attire la victime pendant 160 ms vers le point des coupes, en respectant les murs et les ruptures de sol. Un coup évité, bloqué ou paré ne déclenche aucune attraction. Rean utilise des bruitages Sky synchronisés aux phases du craft : l'installation CS2 locale ne contient pas les fichiers SE originaux. Les sons respectent le volume des effets et cessent si le craft est interrompu.

Le S-craft d'Altina utilise `npc070.dat / AniBtlSCraft00`, les sept clips `BTL_S_CRAFT00_01` à `_07`, le modèle d'épée `C_NPC079_C00` et les effets natifs `sclt00_00`, `_02`, `_03`, `_04`, `_06`, `_07`, `_08`, `_09`, `_10` (dont le mesh d'explosion `E_EFOBJ145`). Les banques 5–11 gardent le visage et les proportions CS2 chibi validés ; la récupération `_06` utilise sa première fenêtre de 40 %, sans la translation cinématique finale. L'épée est exportée à plat et pointe vers le bas, avec son pivot natif `Null_Ride`.

L'adaptation joue 0,4 s de préparation, 3,5 s de surf libre au clavier/stick (8 m/s, arrêt en relâchant les commandes) avec contact balayé et poussée, puis 0,6 s de montée. La visée FPS regarde le sol : mouvement de souris ou glissement tactile pour viser, clic/toucher ou bouton « Viser le sol » pour confirmer. Le serveur valide le sol, la portée et le trajet du plongeon (0,55 s), puis applique l'explosion de rayon 4 m. Sans confirmation après 6 s, elle plonge sous sa position ; une IA vise après 1 s d'arrêt. Altina reste vulnérable et peut être interrompue. Son gardien fusionné ne combat ni ne protège pendant le craft. Les timings, positions, collisions et phases sont partagés avec le client dans `altina-scraft.cjs` ; aucune immunité cinématique n'est ajoutée.

Flame Slash se dirige vers le point de sol choisi, sans sélection ni suivi automatique de personnage. Seul un impact réellement réussi accroche une victime. Le surf Altina transmet uniquement des directions bornées ; position, sol et collisions sont validés sur le serveur. Une direction périmée est arrêtée après 350 ms.
