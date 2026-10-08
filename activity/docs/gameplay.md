# Antérose : PNJ et Pom

- Le gérant Lechter, Lenore et Horrace se promènent dans le restaurant. Clic droit à proximité, puis **Parler** : réplique française aléatoire de T1131 (SC), avec la bulle du jeu.
- Le Pom attend sur une table. Approcher, clic droit, **Ramasser le Pom**.
- Avec le Pom en main, clic droit sur un joueur, **Lancer sur…**. Il conserve sa direction : décaler son personnage permet de l’éviter.
- 100 PV, 25 dégâts par impact. Deux ricochets contre les obstacles, puis arrêt ; un impact sur un joueur arrête aussi le Pom. Un tir expire après 2,5 secondes.
- À 0 PV, déplacement et interactions bloqués. Retour à l’entrée après dix secondes avec 100 PV.
- Clic droit glissé : caméra. Les interactions utilisent un clic court.

Le serveur fait autorité sur les PV, la possession, les collisions et les positions des PNJ. Chaque salon a son monde ; une déconnexion libère le Pom. Les collisions utilisent la grille de navigation du restaurant et respectent les étages. Les PNJ ne bloquent pas les joueurs et ne prennent pas de dégâts.

Les sprites proviennent des archives CH/CP du jeu. Les personnages dont une pose de défaite est disponible l’utilisent ; les autres conservent leur sprite couché comme solution provisoire. Les trois parcours d’ambiance sont adaptés au restaurant FC affiché ; ils ne rejouent pas une scène précise du scénario SC.
