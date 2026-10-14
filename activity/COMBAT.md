# Combat : première passe native

36 personnages : 31 ont attaque / art / craft ; Grant, Don, Deen, Rais et Rocco ont attaque / craft. Sieg et les autres personnages sans séquence exploitable restent non combattants.

- F : attaque ; C : art ; G : craft. Les mêmes trois icônes servent sur mobile. Une action absente est masquée.
- Les poses et leurs banques viennent des AS audités. Le premier craft ayant des frames valides est choisi. Renne garde son Cercle sanglant déjà réglé.
- Les dégâts de départ sont 12 / 20 / 30, avec des délais et des temps de récupération communs. Les tireurs ont une attaque à distance. Le serveur décide des impacts et des PV.
- L’art est une Flèche de feu de test. Les autres crafts utilisent pour l’instant un effet d’impact commun, sans reproduire tous les déplacements, projectiles, invocations et effets de leur AS original.
- Les noms « Craft 1 », etc. sont des identifiants de slots provisoires, pas une identification du nom français de la technique.

## Parade, esquive et combo

Règles communes dans `combat-moves.cjs`, appliquées par le serveur, l'entraînement et le client.

- **Parade / garde (V, bouton 🛡)** : joue l'animation d'attaque normale ; active 350 ms après l'appui, nouvel appui refusé pendant 1,2 s. Un craft qui touche pendant ce temps est annulé ; son lanceur subit l'impact SC/mp094_00, 20 dégâts et un recul de 2 m (les fumées de Nial ne se parent pas). Une attaque normale venant de face (à moins de 60° du regard) est bloquée entièrement avec l'étincelle SC/mp008_01 et casse le combo de l'attaquant ; de côté ou de dos, le coup passe. En ligne, l'appui compte à son arrivée au serveur. L'IA ne pare pas.
- **Esquive (C, bouton »)** : remplace l'art de tous, sauf Kloe qui garde Lacrym. Ruée de 2 m en 160 ms dans la direction de déplacement (sinon face au regard), arrêtée avant un mur ou un bord, refusée pendant un craft, récupération 7 s. Le personnage garde sa pose ; traînée de poussière SC/ms30001c au sol. Une attaque normale en cours est abandonnée. Les données des arts natifs restent dans le catalogue (`nativeSpec`).
- **Combo d'attaque normale** : chaque coup qui touche accélère les suivants de 20 % ; vitesse maximale (40 % du temps normal) dès 3 coups. Impact SC/ms00271b deux fois plus grand, orienté dans le sens du coup, tremblement de la cible et compteur « N coups » (police des dégâts, contour jaune, qui tremble 1 s à chaque coup) affiché à côté pendant deux recharges d'attaque normale. Les impacts propres à un personnage (poing de Zin…) sont gardés. Un coup dans le vide ou bloqué remet le combo à zéro, sans effet ; 2,5 s sans toucher aussi.
- **Dégâts** : tout personnage touché flashe en blanc un instant.
- **Mobile** : les techniques en ligne droite visées au sol partent droit devant le personnage, sans visée.

Les bruitages du jeu (FC, SC, 3rd) sont extraits dans `E:/dev/sky-activity-tools/sons` (`ecouter.html` pour les écouter, `extraire-sons.py` pour régénérer).

## Réglages

`assets/sky/combat/catalogue.json` contient, par personnage, `actions`, `sequences`, `banks` et `source`. Modifier `actions` pour les dégâts, portée, récupération et `projectile` ; `sequences` pour les poses `{bank, pose, ms}` ; conserver `source` pour identifier la routine AS.

`tools/export-combat-catalogue.py` recrée les seules banques utilisées depuis les archives locales extraites et le relevé des AS. `--character` permet de réexporter un personnage. Aucun jeu complet décompressé n’est ajouté au serveur. Les textures sont chargées à la demande pour les personnages présents.

Dorothy demande encore son traitement particulier de photographie : son attaque utilise des banques d’effets SC DT06 non intégrées dans cette passe. Les AS de support d’Aina et Dunan ne sont pas interprétés comme des attaques.

## Messages et captures

Les messages saisis dans l’arène sont reproduits dans le salon 1558125759682576475 sous le nom du personnage. Les autres cartes utilisent le salon 1499373178483507210. Les nouveaux threads de duel sont créés dans le salon 1558125759682576475 ; les GIF et résultats restent dans le thread du match. Les messages Discord entrants et les dialogues PNJ ne sont pas retransmis.

Un craft accepté déclenche une capture de la scène autour de son impact (288 × 216, 12 images). Le serveur vérifie l’auteur et publie le GIF une seule fois avec « Renne lance Cercle sanglant. ». Si aucune capture n’arrive, le texte seul est publié après 30 secondes. Aucun compte Discord, chat ou élément d’interface n’est inclus dans le GIF.

Les duels acceptes ouvrent un fil public dans general (595259248984981516), nomme avec les deux personnages. Le premier message contient le bouton pour regarder depuis les tribunes. Les messages du jeu et GIF des participants/spectateurs vont dans ce fil tant qu’ils sont dans ce match. Hors match, le salon roleplay reste la destination habituelle.

Le fil est enregistre avec le duel et reutilise apres un redemarrage ou une nouvelle tentative. Un nouveau defi apres le depart des deux joueurs ouvre un nouveau match et un nouveau fil. Le GIF conserve la destination du match au moment du craft, meme si son auteur change de map avant l’envoi. Le bot doit pouvoir creer des fils publics et envoyer des messages/fichiers dans general et ses fils. Aucun compte de joueur n’est mentionne ou ajoute au fil.

## RP et biere

La case RP des reglages est desactivee par defaut et conservee sur l'appareil. Sans RP, le chat reste dans le jeu, y compris dans l'arene. Avec RP, les messages des autres cartes vont au salon roleplay ; ceux de l'arene vont au salon de l'arene. Cette option concerne le chat, pas les annonces de matchs et captures.

Une chope est placee sur la table de l'etage de l'Anterose. Clic droit pres de la table puis Boire une biere, ou interaction mobile/espace. Trois bieres en dix minutes appliquent le statut RPG `alcoolise`, pour six tours selon les regles existantes de Capel. Il faut attendre quatre secondes entre deux consommations. Une annonce systeme est envoyee au salon RP lors de l'acquisition du statut. Les messages publies utilisent le meme ajout de hic/hips que la commande anonyme ; le texte en jeu reste intact.

Etude de la tour PVE : [DUNGEON.md](DUNGEON.md).

Garde : maintenir V (ou le bouton bouclier) bloque les attaques normales dans un cône de 120° devant le personnage, orienté au début de l’appui. Les crafts gardent leur parade de 350 ms au début de l’appui, avec récupération de 1,2 s ; le maintien ne renouvelle pas cette fenêtre. Relâcher ou quitter la fenêtre termine la garde. Une garde sans renouvellement réseau expire après 1,8 s.
