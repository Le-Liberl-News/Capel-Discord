Personnages et titres : `rpg/data/persos.json`.

Modifier `titre` pour changer le texte sous le nom pendant l’introduction de l’arène. Les nouvelles fiches ont « Titre à renseigner ».

Pour ajouter un personnage au tirage, copier une fiche dans ce même fichier, modifier son nom et son titre et retirer `anonymeIndex` : il sera ajouté à la fin. `combo` est le nom du personnage associé. Garder les indices existants : les attributions Discord les utilisent.

Déployer le bot après modification. Il transmet les titres aux activités à chaque introduction. Aucun second fichier de titres n’est à modifier.

Scène de référence : Sky the 3rd, `e1001._sn`, fonction 5, sur `U4166`. Travelling de 6 s : cible (18700,7000,-6450) → (12830,1710,-6480), distance (0,2340,-10000) → (0,12200,-21480), zoom 2570 → 2130, rotation 90000, perspective 532. Plan large : cible (2690,0,-6500), distance (0,17470,-27990), zoom 730, perspective 554. Les unités et l’axe X sont adaptés au rendu web ; les valeurs natives restent dans `arena/intro.json`.

Public : personnages 10 à 49 du script, banques `ch01200`, `ch01210`, `ch01220`, `ch01230`, `ch01180`, `ch01490`, animation de la fonction 2. Sons originaux : `ED6SE174` et `ED6SE175`, archive DT28. La position de la loge du script reçoit le duc Dunan, sans présentateur.
