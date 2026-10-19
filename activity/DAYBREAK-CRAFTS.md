# Crafts Daybreak I

Van, Elaine et Shizuna sont disponibles dans le sélecteur de test du Capel. Ils restent exclus du tirage Discord et requièrent le rôle Daybreak I pour apparaître comme adversaires du combat solo.

Les modèles et textures proviennent de Horizon ; les mouvements de Kaleido Fencer viennent de Daybreak I. Les autres mouvements proviennent de Horizon, avec les tenues originales Daybreak I et le visage Kai validé. Seuls les atlas et effets nécessaires sont livrés.

| Personnage | Craft | Clips natifs |
| --- | --- | --- |
| Van | Coin Bullets : pièce puis tir et impact lumineux sur sa cible | `chr0000_m_btl_craft03_*` |
| Elaine | Kaleido Fencer sans ciblage : capture proche, placement progressif devant son épée, estocades répétées, pause puis slash vert | `chr5110_mot_btl_craft02_1`, `_2` (préparation), `_3` (estocades et slash), `_3_ed` |
| Shizuna | Zeroth Gleam : pétales, vent, traversée, silhouettes noires, rengainage et seconde frappe rouge | `chr5117_m_btl_s_craft00_01` à `_07`, `_09`, `_10b`, `_11` |

Les timings sont partagés entre serveur et affichage dans `daybreak-crafts.cjs`. Van et Shizuna nécessitent une cible, à 18 m et 12 m respectivement. Elaine se déclenche sans visée et capture les ennemis présents dans un rayon de 3 m après 650 ms. Ils sont immobilisés et amenés devant elle pendant 1,1 seconde, avant les premiers dégâts ; les nouveaux arrivants sont exclus. La préparation utilise `_2` de Daybreak I. Les premiers 60 % de `_3` fournissent les estocades ; cette pose est maintenue une seconde avant les derniers 40 % et l'impact final à 4 040 ms. Le clip Daybreak I dure 1,833 s, contre 3,4 s pour la variante Horizon : leurs mouvements diffèrent. Aucun IK du bras ni verrouillage artificiel du bassin ou des jambes n'est appliqué. `_3_ed` assure la récupération. La lame reste verte pendant toute la séquence ; une traînée utilisant `efsl_a003` suit ses extrémités exportées, avec la teinte du graphe natif `_0`. La direction de départ est celle de la caméra, transmise au serveur avec la commande, et reste fixe pendant le craft.

Shizuna recalcule sa ligne à 2 300 ms depuis la position actuelle de sa cible et valide à nouveau tout le trajet. La ligne reste ensuite fixe ; tous les ennemis présents dessus peuvent être touchés. Elle termine 2 m derrière la cible. La variante native `_10b` fournit le rengainage : fourreau visible, lame masquée une fois rentrée. La seconde frappe arrive à 4 488 ms, sur la frame 18 de la banque 13. Les victimes restent étourdies jusqu'à la seconde frappe. Les alliés et adversaires protégés sont exclus ; une interruption libère les étourdissements de cette action.

Les graphes `.vfx` et textures natives sont adaptés en packs gzip `.vfxpack`. La distorsion écran, l'éclairage spéculaire dynamique et les traînées historiques du moteur Horizon restent simplifiés. Les sons utilisent des bruitages Sky. La provenance est enregistrée dans `assets/sky/effects/horizon/source.json` et `assets/sky/combat/daybreak/source.json`.

Les atlas modifiés portent leur empreinte SHA-256 dans leur nom pour éviter de combiner une ancienne image en cache avec de nouvelles dimensions. La marche et la course sont calées sur les pieds, sans utiliser la pointe des armes. Les atlas ont huit directions et restent sous 4096 px de hauteur. Aucun recentrage cinématique n'est ajouté. Le bouton Thors est retiré du client et le serveur ne le propose plus dans le menu du Capel.

Outils locaux : `E:/dev/sky-activity-tools/atelier-sprites/export-zeroth-final.cjs`, `export-zeroth-sheath.cjs`, `export-elaine-salvo.cjs`, `bake-horizon-vfx.py`. La QA navigateur utilise la vraie scène et le serveur de combat.

Validation : `npm run activity:test` ; `node --test tests/activity-training.test.cjs tests/activity-spoiler-access.test.cjs tests/activity-cs2-effects.test.mjs`.

Elaine : le pack dédié conserve les courbes de teinte, les UV des deux textures et les trois traînées natives `trail_rasen*` (historique des matrices). La salve utilise aussi le faisceau natif `_2`, le développement de `_3`, puis le maillage du slash `_4` et son impact `_6`. Le remplissage vert uniforme ajouté autour de la lame a été retiré. Les shaders web reconstruisent teinte et masque ; ils ne reproduisent pas encore exactement les shaders, la distorsion et la simulation du moteur Horizon.

Les effets de préparation et de salve `_1`, `_2`, `_3` utilisent les graphes et les textures de Daybreak I, sous `effects/horizon/daybreak1/` pour éviter les collisions de noms avec Horizon. Les effets du slash final validé restent ceux de Horizon. Les limites du lecteur web restent applicables.

La séquence dure 5 150 ms : 650 ms d’introduction, 1 100 ms de préparation/placement, 1 100 ms d’estocades, 1 000 ms de pause, 700 ms de slash et 600 ms de récupération.

Le flash natif `_2` est déclenché à chaque estocade, avec trois instances réutilisées et un recouvrement borné, plutôt qu’une lecture continue dont seule la traîne bleue restait visible entre les coups.

Correction : la pause tient la frame native 29/55, avant le slash, au lieu de la frame 33 qui interrompait le geste. Le coup reprend à cette même frame et son impact correspond à la frame 34. Le graphe Daybreak I `_3` de préparation circulaire est attaché aux points exportés de la lame avant le coup, et non étiré sur les cibles pendant les estocades. Les gains HDR, recoloration verte et flashs locaux ajoutés ont été retirés ; les limites de conversion des matériaux et graphes natifs subsistent.

Le convertisseur répartit le budget de particules entre les branches du graphe `_3` pour préserver les émetteurs tardifs. Les cylindres plats orientés vers la caméra conservent leurs coordonnées X/Z (au lieu de les aplatir sur X/Y). La préparation suit le ralenti natif avant le coup.

Les estocades utilisent maintenant une passe dédiée `_2_thrust`, extraite du graphe Daybreak I : faisceaux `giza`, lignes blanches/vertes, spirales et petites particules. Les plans dont X ou Y est nul utilisent les deux axes non nuls ; le plan Y/Z de `giza` était auparavant dégénéré et donc invisible. Les particules GPU sont des panneaux texturés face caméra plutôt que des sphères opaques. Le tunnel de vitesse géant du cadrage cinématique est exclu de cette passe.
Les textures, teintes et courbes natives sont conservées. La luminosité HDR et les contributions relatives des couches sont calibrées pour le rendu web d’après la référence vidéo : il ne s’agit pas d’une reproduction certifiée du shader Daybreak. Chaque instance garde la phase verte complète au lieu de disparaître à son apparition ; trois instances bornent le chevauchement. Le slash final et sa pause ne changent pas.

La profondeur des estocades est réduite à un quart du cadrage source pour concentrer les faisceaux sur les cibles rassemblées devant Elaine ; leur largeur et leur animation sont conservées.

La palette des faisceaux giza est maintenant turquoise, assortie au slash final et à la tenue d’Elaine. Les cibles confirmées dans `caught` s’inclinent de 35 degrés et flottent de 0,28 m avec entrée/sortie progressives ; cet effet visuel ne modifie pas les collisions ni la hauteur utilisée pour les dégâts et disparaît lors d’une interruption ou libération.
