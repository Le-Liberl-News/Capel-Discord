# Actions des héros

F : attaque normale. G : craft. C : art. Les boutons tactiles utilisent le même ciblage.

| Personnage | Craft | Art |
|---|---|---|
| Scherazard | Fouet constricteur : point au sol, segment de 8 unités, ralentissement à 45 % pendant 4 s. AS 17. | Lame de vent, ancien art de Joshua. |
| Olivier | Requiem : six salves autour de lui, rayon 6, 48 dégâts au total. AS 27, banque dynamique CH0426A. | Épine d’argent, mirage. |
| Kloe | Sturm : cible ennemie, 3 impacts, stun jusqu’à la fin de l’animation. AS 17. | Lacrym : clic sur soi ou sur un allié vivant dans la tour, +35 PV. |
| Agate | Impact enflammé : saut vers le point au sol, impact de zone. AS 17. | Forte : +25 % de dégâts pendant 10 s. |
| Tita | Smoke Cannon : point au sol, obscurcissement de la vision des cibles touchées pendant 5 s. AS 16. | Matière noire, espace. |
| Zin | True Distend : immobile pendant l’animation, puis +60 % de dégâts et réduction de 60 % des dégâts reçus pendant 10 s. AS 17. | Crest : réduction de 25 % des dégâts reçus pendant 10 s. |
| Kevin | Carreau gorgone : tir vers le point au sol, immobilisation de 3 s à l’impact. AS 19 de The 3rd. | Earth Guard : absorbe entièrement le prochain coup, expire après 30 s. |
| Joshua | Black Fang conservé. | Soul Blur, temps. |

Les attaques normales sont conservées. Le serveur valide les cibles, les obstacles, les dégâts et les durées. Les alliés de la tour ne subissent aucun dégât de ces attaques. Les buffs de même type ne s’additionnent pas ; un buff plus faible ne prolonge pas un buff plus fort. Un coup absorbé entièrement par Earth Guard n’applique pas de statut.

Paramètres : `assets/sky/combat/hero-actions.json`. Les séquences viennent des AS, les effets des EF sélectionnés. `tools/export-combat-catalogue.py` exporte les banques nécessaires, `tools/export-playable-effects.py` les dépendances des EF, puis `tools/bake-combat-effects.cjs` produit les atlas utilisés en combat. Le serveur ne stocke pas le jeu décompressé.
