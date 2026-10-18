# Première passe Daybreak I

Van, Elaine et Shizuna sont disponibles dans le sélecteur de test de Capel. Ils ne participent pas au tirage Discord. En combat solo aléatoire, ils nécessitent le rôle Daybreak I, comme les autres adversaires soumis aux rôles.

Les modèles, textures et mouvements sont extraits de Horizon. Les tenues sont celles de Daybreak I ; le modèle de Shizuna est `chr5117-original`, pas sa tenue de Daybreak II. Le visage Kai antérieur est conservé, avec les couleurs des textures et les longueurs de cheveux validées. Les modèles 3D complets restent dans les outils locaux, seuls les atlas nécessaires sont livrés.

| Personnage | Première adaptation | Clips natifs |
| --- | --- | --- |
| Van | Lance une pièce puis tire à travers elle sur un ennemi, sans se déplacer | `chr0000_m_btl_craft03_01`, `_02`, `_03`, `_04`, `_04_ed` |
| Elaine | Estocade en ligne droite | `chr5110_m_btl_craft02_1`, `chr5110_m_btl_craft02_2`, `chr5110_m_btl_craft02_3_ed` |
| Shizuna | Préparation, ruée au sabre et récupération | `chr5117_m_btl_craft02_01`, `chr5117_m_btl_craft02_02`, `chr5117_m_btl_craft02_02_ed` |

Les intitulés sont descriptifs, pas une identification officielle des noms des crafts. Les timings adaptés sont centralisés dans `daybreak-crafts.cjs`, partagés entre serveur, entraînement et affichage. Van nécessite un ennemi sélectionné à moins de 18 m ; la pièce est lancée à 700 ms, le tir part à 1 250 ms et arrive à 1 430 ms. Il suit la position de la cible jusqu’au départ du tir, puis celle-ci peut esquiver. Elaine et Shizuna visent le sol ; sur mobile, leur ruée part devant le personnage. Le mouvement est bloqué pendant la séquence et la récupération. Les déplacements respectent les sols et obstacles, les alliés sont protégés et une parade peut interrompre le craft.

Cette passe utilise des accents géométriques colorés et des bruitages Sky existants. Les effets et bruitages Horizon spécifiques ne sont pas encore décodés. Les attaques normales, course de combat, marche hors combat et morts utilisent aussi les mouvements natifs. Toutes les banques ont huit directions et un cadrage commun par animation, contrôlé pendant l’export pour éviter de couper armes, pieds ou cheveux.

Les profils et chemins sources sont enregistrés dans `assets/sky/combat/daybreak/source.json`. Atelier local : `E:/dev/sky-activity-tools/atelier-sprites` ; extraction `prepare-daybreak.py`, export `export-daybreak-game.cjs`, installation `install-daybreak-game.py`. Le rig Kai attache les armes à `RightHand_Point` et ne les montre que pour les clips de combat.

Validation : `node --test tests/activity-daybreak-crafts.test.cjs tests/activity-cs2-test.cjs tests/activity-training.test.cjs tests/activity-spoiler-access.test.cjs`. La QA navigateur locale `E:/dev/sky-activity-tools/qa-daybreak-game.cjs` charge les trois dans la vraie scène et déclenche chaque craft. Aucun changement de caméra cinématique n’est ajouté.
