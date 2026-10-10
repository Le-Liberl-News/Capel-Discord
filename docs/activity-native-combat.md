# Animations de combat natives

Joshua utilise `as04200._dt` de The 3rd. Son art reprend les poses de l’entrée **19 (Craft 4)** ; l’effet de vent est l’assemblage **SC/mg050_0._ef**, nommé ウィンドカッタ dans le fichier, et son effet enfant `mg050_1`. L’incantation dure une seconde avant le lancement : le halo **SC/mgaria0._ef** utilise son cylindre texturé et ses particules autour de Joshua, y compris pendant un déplacement.

Black Fang reprend l’entrée **27**. La commande **0x6A** charge explicitement les ressources `CH0420A` / `CH0420AP` dans la banque **12** : cette banque est différente de `CH0420C`. Les poses de cette banque servent à la traversée ; les poses de chute de la mise en scène originale sont écartées. Joshua traverse le segment en **220 ms**, après 80 ms de préparation. Une lame étirée et des rémanences suivent toute la longueur. Le trajet sélectionné inflige **3 × 10 PV**, aux instants 300, 380 et 460 ms. Les murs et les trous bloquent la traversée ; les alliés de la tour restent protégés.

Olivier utilise **as04260**, vérifié sur les sprites décodés. **as04250** représente une autre tenue de Joshua.

Les AS donnent les banques, poses, attentes, références aux effets et commandes de déclenchement. Les EF donnent les émissions, courbes, couleurs et cellules de textures. Le moteur lit ces assemblages plutôt qu’une texture fixe. Cette base permet d’adapter les autres arts, mais elle ne reproduit pas encore toutes les commandes de déplacement/caméra des AS ni les rubans, déformations et géométries spéciales des EF. Ces effets sont actuellement rendus sur un plan animé face à la caméra.

Chaque perte de PV produit un événement numéroté ; les impacts rapprochés restent distincts et une réponse réseau répétée ne les rejoue pas. Intensité : `damage5` en dessous de 10 PV, `damage3` dès 10, `damage2` dès 20, `damage1` dès 35, `damage0` dès 50. **`damage4._ef` est absent des archives SC et The 3rd disponibles.** Les boucliers ne produisent un impact de dégâts que pour les PV effectivement perdus.

Seules les banques et dépendances nécessaires sont exportées. `activity/tools/export-combat-catalogue.py` reconstruit les sprites ; `activity/tools/export-playable-effects.py` copie les assemblages sélectionnés depuis l’atelier local. Le choix temporaire au Capel expire à minuit à Paris le 10 octobre 2026.

Estelle : craft **Onde sismique**, entrée **17 (Craft 2)** de `as04000._dt`. La pose 7 touche le sol après **210 ms** ; neuf éruptions du matériau natif **SC/mg011_0._ef** avancent sur la ligne sélectionnée en **480 ms**, jusqu’à 8 unités. Chaque cible reçoit **30 PV** une seule fois au passage de l’onde. La largeur est de 1,5 unité ; les murs arrêtent le trajet et les alliés de la tour restent protégés. L’art **Lance de terre** reprend les poses natives d’incantation/lancement et le même assemblage de terre, après une seconde de halo ; dégâts **20 PV**.
