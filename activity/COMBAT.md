# Essai de combat : Renne

Dans l’arène uniquement : F, coup de faux (12 dégâts) ; C, Flèche de feu (20) ; G, Cercle sanglant (30). Les boutons correspondants sont disponibles sur mobile : toucher pour attaquer devant soi, glisser puis relâcher pour viser.

Les animations proviennent des banques CH04510 à CH04516 et du script AS04510 de Sky the 3rd. Cercle sanglant utilise les textures natives cr153_00 de SC. Le serveur contrôle les dégâts, les obstacles, les délais et la mort ; les autres personnages ne disposent pas encore de ces attaques.

Les messages saisis dans le jeu sont reproduits dans le salon 1499373178483507210 sous le nom du personnage. Les messages Discord entrants et les dialogues PNJ ne sont pas retransmis.

Un craft accepté déclenche une capture de la scène autour de son impact (288 × 216, 12 images). Le serveur vérifie l’auteur et publie le GIF une seule fois avec « Renne lance Cercle sanglant. ». Si aucune capture n’arrive, le texte seul est publié après 30 secondes. Aucun compte Discord, chat ou élément d’interface n’est inclus dans le GIF.

`npm run activity:build` reconstruit le client et le worker GIF. `npm run activity:test` vérifie les règles de combat et le relais. `activity/tools/export-renne-combat.py --help` décrit l’export reproductible des ressources natives.
