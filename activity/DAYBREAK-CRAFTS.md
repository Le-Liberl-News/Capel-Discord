# Crafts Daybreak I

Van, Elaine et Shizuna sont disponibles dans le sélecteur de test du Capel. Ils restent exclus du tirage Discord et requièrent le rôle Daybreak I pour apparaître comme adversaires du combat solo.

Les modèles, textures et mouvements proviennent de Horizon, avec les tenues originales Daybreak I et le visage Kai validé. Seuls les atlas et effets nécessaires sont livrés.

| Personnage | Craft | Clips natifs |
| --- | --- | --- |
| Van | Coin Bullets : pièce puis tir et impact lumineux sur sa cible | `chr0000_m_btl_craft03_*` |
| Elaine | Kaleido Fencer sans ciblage : capture proche, placement progressif devant son épée, estocades répétées, pause puis slash vert | `chr5110_m_btl_craft02_1`, `_2_lp` (préparation), `_2` (estocade initiale), `_3` (salve complète), `_3_lp` (pause), `_3_ed` |
| Shizuna | Zeroth Gleam : pétales, vent, traversée, silhouettes noires, rengainage et seconde frappe rouge | `chr5117_m_btl_s_craft00_01` à `_07`, `_09`, `_10b`, `_11` |

Les timings sont partagés entre serveur et affichage dans `daybreak-crafts.cjs`. Van et Shizuna nécessitent une cible, à 18 m et 12 m respectivement. Elaine se déclenche sans visée et capture les ennemis présents dans un rayon de 3 m après 650 ms. Ils sont immobilisés et amenés devant elle pendant 1,1 seconde, avant les premiers dégâts ; les nouveaux arrivants sont exclus. La salve utilise les premiers 78 % de `_3`, avec racine, bassin et jambes calés sur la pose de combat et bras droit réorienté en estocades vers l'avant. Il s'agit d'une adaptation, pas d'une lecture brute du clip. Après deux secondes de pause, les derniers 22 % fournissent un coup séparé, synchronisé avec l'impact à 7 050 ms, puis `_3_ed` assure la récupération. La lame reste verte pendant toute la séquence ; une traînée utilisant `efsl_a003` suit ses extrémités exportées, avec la teinte du graphe natif `_0`. La direction de départ est celle de la caméra, transmise au serveur avec la commande, et reste fixe pendant le craft.

Shizuna recalcule sa ligne à 2 300 ms depuis la position actuelle de sa cible et valide à nouveau tout le trajet. La ligne reste ensuite fixe ; tous les ennemis présents dessus peuvent être touchés. Elle termine 2 m derrière la cible. La variante native `_10b` fournit le rengainage : fourreau visible, lame masquée une fois rentrée. La seconde frappe arrive à 4 488 ms, sur la frame 18 de la banque 13. Les victimes restent étourdies jusqu'à la seconde frappe. Les alliés et adversaires protégés sont exclus ; une interruption libère les étourdissements de cette action.

Les graphes `.vfx` et textures natives sont adaptés en packs gzip `.vfxpack`. La distorsion écran, l'éclairage spéculaire dynamique et les traînées historiques du moteur Horizon restent simplifiés. Les sons utilisent des bruitages Sky. La provenance est enregistrée dans `assets/sky/effects/horizon/source.json` et `assets/sky/combat/daybreak/source.json`.

Les atlas modifiés portent leur empreinte SHA-256 dans leur nom pour éviter de combiner une ancienne image en cache avec de nouvelles dimensions. La marche et la course sont calées sur les pieds, sans utiliser la pointe des armes. Les atlas ont huit directions et restent sous 4096 px de hauteur. Aucun recentrage cinématique n'est ajouté. Le bouton Thors est retiré du client et le serveur ne le propose plus dans le menu du Capel.

Outils locaux : `E:/dev/sky-activity-tools/atelier-sprites/export-zeroth-final.cjs`, `export-zeroth-sheath.cjs`, `export-elaine-salvo.cjs`, `bake-horizon-vfx.py`. La QA navigateur utilise la vraie scène et le serveur de combat.

Validation : `npm run activity:test` ; `node --test tests/activity-training.test.cjs tests/activity-spoiler-access.test.cjs tests/activity-cs2-effects.test.mjs`.

Elaine : le pack dédié conserve les courbes de teinte, les UV des deux textures et les trois traînées natives `trail_rasen*` (historique des matrices). La salve utilise aussi le faisceau natif `_2`, le développement de `_3`, puis le maillage du slash `_4` et son impact `_6`. Le remplissage vert uniforme ajouté autour de la lame a été retiré. Les shaders web reconstruisent teinte et masque ; ils ne reproduisent pas encore exactement les shaders, la distorsion et la simulation du moteur Horizon.
