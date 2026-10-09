# Combat : première passe native

36 personnages : 31 ont attaque / art / craft ; Grant, Don, Deen, Rais et Rocco ont attaque / craft. Sieg et les autres personnages sans séquence exploitable restent non combattants.

- F : attaque ; C : art ; G : craft. Les mêmes trois icônes servent sur mobile. Une action absente est masquée.
- Les poses et leurs banques viennent des AS audités. Le premier craft ayant des frames valides est choisi. Renne garde son Cercle sanglant déjà réglé.
- Les dégâts de départ sont 12 / 20 / 30, avec des délais et des temps de récupération communs. Les tireurs ont une attaque à distance. Le serveur décide des impacts et des PV.
- L’art est une Flèche de feu de test. Les autres crafts utilisent pour l’instant un effet d’impact commun, sans reproduire tous les déplacements, projectiles, invocations et effets de leur AS original.
- Les noms « Craft 1 », etc. sont des identifiants de slots provisoires, pas une identification du nom français de la technique.

## Réglages

`assets/sky/combat/catalogue.json` contient, par personnage, `actions`, `sequences`, `banks` et `source`. Modifier `actions` pour les dégâts, portée, récupération et `projectile` ; `sequences` pour les poses `{bank, pose, ms}` ; conserver `source` pour identifier la routine AS.

`tools/export-combat-catalogue.py` recrée les seules banques utilisées depuis les archives locales extraites et le relevé des AS. `--character` permet de réexporter un personnage. Aucun jeu complet décompressé n’est ajouté au serveur. Les textures sont chargées à la demande pour les personnages présents.

Dorothy demande encore son traitement particulier de photographie : son attaque utilise des banques d’effets SC DT06 non intégrées dans cette passe. Les AS de support d’Aina et Dunan ne sont pas interprétés comme des attaques.

## Messages et captures

Les messages saisis dans le jeu sont reproduits dans le salon 1499373178483507210 sous le nom du personnage. Les messages Discord entrants et les dialogues PNJ ne sont pas retransmis.

Un craft accepté déclenche une capture de la scène autour de son impact (288 × 216, 12 images). Le serveur vérifie l’auteur et publie le GIF une seule fois avec « Renne lance Cercle sanglant. ». Si aucune capture n’arrive, le texte seul est publié après 30 secondes. Aucun compte Discord, chat ou élément d’interface n’est inclus dans le GIF.

Les duels acceptes ouvrent un fil public dans general (595259248984981516), nomme avec les deux personnages. Le premier message contient le bouton pour regarder depuis les tribunes. Les messages du jeu et GIF des participants/spectateurs vont dans ce fil tant qu’ils sont dans ce match. Hors match, le salon roleplay reste la destination habituelle.

Le fil est enregistre avec le duel et reutilise apres un redemarrage ou une nouvelle tentative. Un nouveau defi apres le depart des deux joueurs ouvre un nouveau match et un nouveau fil. Le GIF conserve la destination du match au moment du craft, meme si son auteur change de map avant l’envoi. Le bot doit pouvoir creer des fils publics et envoyer des messages/fichiers dans general et ses fils. Aucun compte de joueur n’est mentionne ou ajoute au fil.
