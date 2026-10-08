# Restaurant AntÃ©rose â€” prototype

Depuis E:\dev\Capel-Discord :

~~~powershell
npm.cmd run activity:build
npm.cmd run activity:test
npm.cmd run activity:preview
~~~

Ouvrir http://127.0.0.1:3012. Lâ€™aperÃ§u local permet de sÃ©lectionner un sprite ; il ne contacte pas le bot ni la base MySQL.

Clic : destination et chemin autour des obstacles. FlÃ¨ches ou ZQSD : dÃ©placement continu. Clic droit maintenu et glissÃ© : rotation et inclinaison de camÃ©ra autour du personnage. E/R : rotation de camÃ©ra. Molette : zoom.

## Rendu et dÃ©placements

- ModÃ¨le original T1131 (restaurant de Bose), 24 textures DDS converties en PNG, couleurs des sommets conservÃ©es.
- Textures RGB1555 : alpha conservÃ© et rouge pur dÃ©coupÃ© conformÃ©ment au viewer de rÃ©fÃ©rence ; les autres rouges restent visibles.
- CamÃ©ra orthographique ; personnage sur un quad vertical tournÃ© vers la camÃ©ra, avec profondeur pour les meubles.
- Sprites CH/CP dÃ©codÃ©s en atlas : les huit colonnes correspondent aux directions, les lignes aux poses. Animation Ã  12 images par seconde pendant le dÃ©placement.
- Navigation calculÃ©e Ã  partir des triangles du modÃ¨le, avec une marge autour des obstacles ; le sol connectÃ© du restaurant, les marches et lâ€™Ã©tage sont retenus. Ce maillage est une approximation, pas la collision native du moteur Sky.
- Vitesse constante indÃ©pendante du nombre dâ€™images par seconde. Positions des autres joueurs interpolÃ©es. Rendu plafonnÃ© Ã  30 images par seconde.

## Bulles de dialogue

Les nouveaux messages du salon Discord sont affichÃ©s sur lâ€™avatar de leur auteur, uniquement sâ€™il est prÃ©sent dans cette activitÃ©. Le nom affichÃ© est son personnage du jour. Les bots, les webhooks et les auteurs sans avatar sont ignorÃ©s ; les messages restent en mÃ©moire 30 secondes, sans archivage en base. Les longues phrases sont rÃ©parties sur des pages de trois lignes, avec affichage progressif Ã  32 caractÃ¨res par seconde et temps de lecture avant la page suivante. Chaque personnage a sa propre file, limitÃ©e Ã  cinq messages en attente. La pointe de la bulle suit la tÃªte de son avatar ; les bulles simultanÃ©es sont rÃ©parties pour limiter leur superposition, en gardant chacune sa pointe rattachÃ©e Ã  son auteur.

Lâ€™aperÃ§u local propose Â« Tester une bulle Â» : la phrase saisie est seulement affichÃ©e localement, sans envoi Ã  Discord. Â« Tester deux bulles Â» ajoute un deuxiÃ¨me personnage de dÃ©monstration et fait parler les deux avatars.

Les piÃ¨ces de la bulle viennent de ED6_DT00/c_waku3._ch et c_icon1._ch, dÃ©codÃ©es en ARGB4444. La police Averia Sans Libre dÃ©jÃ  prÃ©sente dans le dÃ©pÃ´t est chargÃ©e localement. Pour rÃ©exporter :

~~~powershell
python activity/tools/export_dialogue_assets.py --ui-folder E:\dev\sky-activity-tools\fc-00\ED6_DT00 --output activity/assets/sky/dialogue
~~~

Le test des messages du vÃ©ritable salon reste Ã  faire dans Discord avec le bot et le client mis Ã  jour ensemble.

## Discord

Le client sâ€™identifie via le SDK et OAuth PKCE. Le serveur vÃ©rifie lâ€™identitÃ© Discord et lâ€™accÃ¨s au salon, puis attribue un jeton temporaire Ã  la session. Il reprend getPseudoAnonyme, le tirage existant du bot, et le rafraÃ®chit toutes les 15 secondes. Le client ne choisit pas son personnage ni son identitÃ©. Les salons sont sÃ©parÃ©s et les positions trop rapides ou traversant une case bloquÃ©e sont refusÃ©es.

Les sprites absents du catalogue sont signalÃ©s et affichent Estelle provisoirement. Le raccordement OAuth/Discord complet doit encore Ãªtre vÃ©rifiÃ© dans une activitÃ© rÃ©elle ; les tests locaux utilisent des identitÃ©s simulÃ©es.

## Export

~~~powershell
python activity/tools/export_sky_assets.py --game "C:\Program Files (x86)\Steam\steamapps\common\Trails in the Sky FC" --model E:\dev\sky-activity-tools\fc-0a\ED6_DT0A\t1131._x2 --chips E:\dev\sky-activity-tools\fc-07\ED6_DT07 --extra-chips E:\dev\sky-activity-tools\sc-chips --output activity/assets/sky
node activity/tools/build-navigation.mjs
~~~

Le premier export nÃ©cessite les archives extraites avec ed6-archive (outil local existant). Pillow est nÃ©cessaire. Les associations du tirage aux fichiers sont dans tools/character-map.json ; les associations de PNJ dÃ©duites des scripts demandent encore une vÃ©rification visuelle.

## HÃ©bergement

Copier deploy/index.php, deploy/api.php, bundle.js et assets/ dans le dossier activite du site. Le bot doit recevoir les modifications de index.js et utils/activityService.js, ainsi que activity/assets/sky/navigation.json. Le relais PHP transmet lâ€™en-tÃªte Authorization au bot ; lâ€™hÃ©bergement doit le fournir Ã  PHP. Ne pas mettre Ã  jour uniquement le client : les anciennes routes state nâ€™ont pas lâ€™identification du prototype.

La publication suit activity/DEPLOYMENT.md. Les contrÃ´les de dÃ©monstration restent rÃ©servÃ©s Ã  lâ€™aperÃ§u local ; le client publiÃ© impose Discord.

## Musique et synchronisation

ED6101.ogg accompagne la map en boucle, volume initial 25 %. Le bouton en bas Ã  droite coupe/rÃ©active la musique et conserve ce choix localement. Si la lecture automatique est refusÃ©e, le premier geste de lâ€™utilisateur la lance.

Les accusÃ©s de position sont comparÃ©s Ã  la copie envoyÃ©e dans la requÃªte : la latence ne replace plus le personnage Ã  une position valide mais ancienne. Les dÃ©placements refusÃ©s par le serveur restent corrigÃ©s.

## Arène et retour des duels

La navigation de Grancel se régénère avec `node activity/tools/build-navigation.mjs <chemin-absolu-vers-activity/assets/sky/arena> activity/tools/arena-navigation.json`. Cette grille couvre le terrain complet ; les gradins isolés ne sont pas des sols de combat.

Les textures du modèle portent la version du bundle pour éviter les anciens PNG opaques en cache. La découpe des murs suit la caméra et le personnage, sans modifier les collisions physiques ; les clics ignorent les fragments masqués.

L'Antérose et l'arène sont chacune un monde unique partagé par tous les joueurs, indépendamment du salon ou du MP de lancement. Les duels donnent accès à cette même arène : les autres combattants et les Poms sont communs. Revenir à l'Antérose retrouve tous les joueurs qui y sont présents.

## Monde persistant et discussion

Les positions, les PV et la map de chaque joueur, les positions des PNJ et les Poms sont sauvegardés dans les fichiers privés `.runtime/activity-world-anterose.json`, `.runtime/activity-world-arena.json` et `.runtime/activity-duels.json`. Les sauvegardes du monde sont limitées à une par seconde, avec une sauvegarde immédiate lors d'un changement de map. Un avatar déconnecté disparaît de la présence, mais sa position et le monde ne sont pas recréés. Les tirs interrompus par un redémarrage sont posés au sol.

Les messages des salons de lancement autorisés et les MP envoyés à Capel par un joueur présent deviennent des bulles dans sa map actuelle. Le champ « Discussion de la map » transmet directement un message authentifié ; il n'envoie pas de message Discord et ne divulgue pas le compte du joueur. Les autres conversations privées ne sont pas lues.

Discord impose de fermer l'activité avant de la relancer dans un autre contexte. Le nouveau lancement reprend le même avatar dans la même map et invalide l'ancien jeton de contrôle pour éviter les mouvements concurrents.

## Spectateurs et Prop Hunt

Quand les deux invitations privées sont acceptées, General (595259248984981516) reçoit un bouton pour regarder le duel. Les spectateurs partagent l’arène, marchent dans les tribunes, ne subissent pas les tirs et ne ramassent pas de Pom.

`/prophunt [duree:10]` ouvre des inscriptions dans le salon. Participer envoie un bouton privé ; ouvrir ce bouton rejoint Rolent. Le créateur clique Démarrer quand au moins deux joueurs sont entrés. Chasseur tiré au sort, immobile et aveuglé pendant les 30 secondes de préparation. Les autres deviennent des tonneaux ou caisses natifs. Clic droit du chasseur sur un objet à moins de 2,2 unités, sans obstacle, pour trouver un joueur. Tous trouvés : chasseur gagnant ; expiration : joueurs cachés gagnants. Une partie commune à tous les salons, jusqu’à 20 joueurs, 10 minutes par défaut (1 à 30). Retour Antérose quitte la partie. État sauvegardé dans `.runtime/activity-prophunt.json`.

## Rendu de Rolent

Caméra orthographique reculée (120 unités, profondeur 350) : même cadrage, sans sectionner les bâtiments avec le plan proche. Clé rouge exacte traitée aussi en ARGB4444. Les textures contenant une opacité intermédiaire utilisent BLEND, avec profondeur non écrite et décalage polygonal pour les vitrages superposés.

Le décor conserve ses couleurs et textures sans éclairage PBR. Une lumière directionnelle et des surfaces ShadowMaterial ajoutent des ombres douces, calculées une fois au chargement (2048²). Seules les surfaces complètement opaques reçoivent cette couche ; les feuillages restent découpés. Une ombre de contact suit les personnages et objets mobiles dans les trois maps.

## Commandes tactiles

Toucher la map pour marcher. Appui long (450 ms) pour les actions du clic droit. Le bouton Actions arme le prochain toucher : ramasser, parler, tirer ou chercher un objet, selon le contexte. Glisser à deux doigts pour orienter la caméra ; écarter/pincer pour zoomer. Les gestes de caméra annulent le toucher de déplacement et l’appui long. Discussion replie le formulaire sur mobile. Les commandes de souris restent identiques.
