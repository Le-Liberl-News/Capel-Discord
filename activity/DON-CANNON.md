# Don : canon et marteau

Don utilise son canon noir et or extrait de la banque native as00290 (direction 4, pose 0) dans la vue FPS commune. Le HUD disparaît pendant les introductions et le craft. Le craft recule la caméra en troisième personne puis revient en FPS en douceur.

Le tir normal part après 140 ms, avec une vitesse de 22 m/s, une impulsion verticale de 3,5 m/s et une gravité de 14 m/s². Le serveur balaie le trajet par pas de 1/60 s contre les volumes des personnages et le décor. Les explosions appliquent 32 dégâts dans un rayon de 3 m, avec test d’occlusion et protection des alliés. Le boulet réutilise le sprite natif Sky effalp0 de Third déjà présent dans le projet ; aucune provenance FC non vérifiée n’est revendiquée. Le recul physique atteint 1,3 m en 220 ms selon le sol et les obstacles. Le viseur reçoit une impulsion de 0,2 rad vers le haut et jusqu’à 0,08 rad à gauche/droite, une seule fois par tir. Le délai entre tirs est de 1,5 s.

Le marteau est une adaptation des poses natives de canon relevé/recul, rejouées vers le bas pendant une retombée. Ce n’est pas une animation native de Don frappant le sol. Le saut atteint 1,35 m ; l’impact à 900 ms inflige 48 dégâts dans un rayon de 3,7 m et étourdit pendant 2,4 s uniquement les ennemis réellement blessés. La préparation peut être interrompue ; Don est alors reposé au sol sans dégâts d’impact. Le craft dure 1,35 s avec 11 s de récupération.

Effets : SC/sc000_10._ef à la bouche, SC/msc0640._ef pour le boulet, SC/sc006_17._ef pour le marteau. Sons : ed6se487 (SC) au départ, ed6se585 (FC) à l’explosion, ed6se602 (FC) à la retombée. Les sons se trouvent dans les archives disponibles indiquées, malgré le préfixe ED6 commun.

Les personnages étourdis affichent le même SC/paralyze._ef que l’Olivier de l’Antérose, au-dessus de leur tête, jusqu’à la fin du statut. Les effets sont supprimés à la libération/défaite/disparition. La synchronisation des captifs reçus par le client est également complétée pour les effets d’Elaine.

Extraction : tools/export-don.py, tools/export-sounds.py, tools/export-playable-effects.py --only=SC/msc0640._ef,SC/sc000_10._ef,SC/sc006_17._ef et tools/bake-combat-effects.cjs --only=sc-msc0640,sc-sc000_10. Tests : tests/activity-don.test.cjs et contrôle en scène du FPS, du saut, de l’impact et des statuts.

Correction des impacts : la recherche du sol part du haut du segment balistique pour détecter même un plan fin déjà franchi. L'explosion est décalée visuellement vers le haut pour ne pas enterrer sa moitié inférieure, et démarre à sa réception si la confirmation est tardive. Le son d'explosion tolère 1,5 s de retard. Le recul vertical passe à 0,4 rad avec une vibration amortie de 320 ms qui ne s'accumule pas dans la visée.

Le craft dure désormais 2,8 s, atteint 3,8 m, conserve sa hauteur pendant 700 ms puis frappe à 1,9 s. L'impact est au sol 2,1 m devant Don, rayon 4,5 m, effet de taille 10. La caméra conserve la vue troisième personne pendant la retombée. Les poses restent une approximation native (levée, descente inversée, accroupissement tenu) ; une vraie pose de canon à deux mains frappant vers le bas n'est pas disponible.
