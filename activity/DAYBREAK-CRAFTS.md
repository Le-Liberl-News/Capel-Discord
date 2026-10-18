# Crafts Daybreak I

Van, Elaine et Shizuna sont disponibles dans le sélecteur de test de Capel, sans participer au tirage Discord. Le rôle Daybreak I est requis pour les rencontrer en combat solo aléatoire.

Les modèles, textures et mouvements proviennent de Horizon, avec les tenues originales Daybreak I et le visage Kai validé. Les cheveux conservent les longueurs validées. Seuls les atlas et effets nécessaires sont livrés.

| Personnage | Craft | Mouvements natifs |
| --- | --- | --- |
| Van | Coin Bullets : pièce lancée puis tir et impact lumineux sur la cible | `chr0000_m_btl_craft03_*` |
| Elaine | Kaleido Fencer : mêlée obligatoire, rassemblement des adversaires touchés, estocades puis slash vert, sans déplacement du lanceur | `chr5110_m_btl_craft02_1`, `_2_lp` (pr�paration tenue), `_2` (estocade r�p�t�e), `_3`, `_3_ed` |
| Shizuna | Zeroth Gleam : pétales, vent, préparation, traversée instantanée, silhouettes noires des victimes, rengainage puis seconde frappe rouge | `chr5117_m_btl_scraft00_01` à `_07`, `_09`, `_10`, `_11` |

Les noms et associations sont identifiés dans `t_skill.tbl`. Les timings adaptés sont partagés entre serveur et affichage dans `daybreak-crafts.cjs`. Les trois crafts nécessitent une cible. Van peut viser à 18 m, Shizuna à 12 m, Elaine à 3 m. Shizuna frappe tous les adversaires présents sur sa ligne effective au premier slash et termine 2 m derrière sa cible initiale ; le trajet entier doit être praticable. Les cibles réellement touchées restent étourdies jusqu’au second coup. Elaine ne rassemble que les adversaires effectivement touchés dans son rayon initial de mêlée. Les alliés et les adversaires protégés ne sont pas affectés ; l’interruption libère les étourdissements de cette action.

Les graphes `.vfx` natifs et leurs textures DDS sont adaptés en packs gzip `.vfxpack`, chargés à la préparation du combat. Les passes de distorsion écran, l’éclairage spéculaire dynamique et les traînées historiques du moteur Horizon ne sont pas reproduits. Les couleurs natives sont conservées ; le vent est atténué pour garder les sprites lisibles. Les sons restent des bruitages Sky. La provenance et les fichiers sources figurent dans `assets/sky/effects/horizon/source.json` et `assets/sky/combat/daybreak/source.json`.

La marche et la course d’Elaine et Shizuna sont calées sur les pieds, indépendamment de la pointe de leur arme, pour supprimer leur oscillation verticale. Les nouvelles banques ont huit directions, un cadrage commun par animation et des atlas de hauteur maximale 4096 px. Aucun recentrage cinématique de caméra n’est ajouté.

Outils locaux : `E:/dev/sky-activity-tools/atelier-sprites/prepare-native-crafts.py`, `export-native-crafts.cjs`, `bake-horizon-vfx.py`. QA : `qa-full-native-crafts.cjs` utilise la vraie scène et le serveur de combat ; `qa-native-daybreak.cjs` contrôle séparément les effets WebGL.

Validation : `npm run activity:test` ; `node --test tests/activity-cs2-effects.test.mjs tests/activity-cs2-test.cjs tests/activity-training.test.cjs tests/activity-spoiler-access.test.cjs`.
