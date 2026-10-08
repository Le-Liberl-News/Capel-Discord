# Antérose : PNJ et Pom

- Le gérant Lechter reste à l’entrée, Horrace est assis à sa table, Lenore suit son parcours du script SC avec ses pauses. Positions et orientations viennent de T1131. Clic droit à proximité, puis **Parler** : réplique française du script.
- Le Pom attend sur une table. Approcher, clic droit, **Ramasser le Pom**.
- Avec le Pom en main, un clic droit court tire directement vers le point cliqué. Aucun joueur cible n’est requis. La trajectoire reste droite et peut descendre vers un niveau inférieur ; bouger permet d’esquiver.
- 100 PV, 25 dégâts par impact. Deux ricochets contre les obstacles, puis arrêt ; un impact sur un joueur arrête aussi le Pom. Un tir expire après 2,5 secondes.
- À 0 PV, déplacement et interactions bloqués. Retour à l’entrée après dix secondes avec 100 PV.
- Clic droit glissé : caméra. Les interactions utilisent un clic court.

Le serveur fait autorité sur les PV, la possession, les collisions et les positions des PNJ. Chaque salon a son monde ; une déconnexion libère le Pom. Les tirs utilisent les surfaces 3D du décor pour les ricochets, et une collision 3D avec les joueurs. La grille sert seulement aux déplacements. Les PNJ ne bloquent pas les joueurs et ne prennent pas de dégâts.

Les sprites proviennent des archives CH/CP du jeu. Les personnages dont une pose de défaite est disponible l’utilisent ; les autres conservent leur sprite couché comme solution provisoire. Le décor SC T1131 contient plusieurs intérieurs de Bose ; le restaurant est centré avec la transformation `x = -x_jeu / 1000 - 45`, `y = y_jeu / 1000`, `z = z_jeu / 1000`.
