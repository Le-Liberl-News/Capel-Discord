# Restaurant Antérose — prototype

Depuis E:\dev\Capel-Discord :

~~~powershell
npm.cmd run activity:build
npm.cmd run activity:test
npm.cmd run activity:preview
~~~

Ouvrir http://127.0.0.1:3012. L’aperçu local permet de sélectionner un sprite ; il ne contacte pas le bot ni la base MySQL.

Clic : destination et chemin autour des obstacles. Flèches ou ZQSD : déplacement continu. Clic droit maintenu et glissé : rotation et inclinaison de caméra autour du personnage. E/R : rotation de caméra. Molette : zoom.

## Rendu et déplacements

- Modèle original T1131 (restaurant de Bose), 24 textures DDS converties en PNG, couleurs des sommets conservées.
- Textures RGB1555 : alpha conservé et rouge pur découpé conformément au viewer de référence ; les autres rouges restent visibles.
- Caméra orthographique ; personnage sur un quad vertical tourné vers la caméra, avec profondeur pour les meubles.
- Sprites CH/CP décodés en atlas : les huit colonnes correspondent aux directions, les lignes aux poses. Animation à 12 images par seconde pendant le déplacement.
- Navigation calculée à partir des triangles du modèle, avec une marge autour des obstacles ; le sol connecté du restaurant, les marches et l’étage sont retenus. Ce maillage est une approximation, pas la collision native du moteur Sky.
- Vitesse constante indépendante du nombre d’images par seconde. Positions des autres joueurs interpolées. Rendu plafonné à 30 images par seconde.

## Bulles de dialogue

Les nouveaux messages du salon Discord sont affichés sur l’avatar de leur auteur, uniquement s’il est présent dans cette activité. Le nom affiché est son personnage du jour. Les bots, les webhooks et les auteurs sans avatar sont ignorés ; les messages restent en mémoire 30 secondes, sans archivage en base. Les longues phrases sont réparties sur des pages de trois lignes, avec affichage progressif à 32 caractères par seconde et temps de lecture avant la page suivante. Chaque personnage a sa propre file, limitée à cinq messages en attente. La pointe de la bulle suit la tête de son avatar ; les bulles simultanées sont réparties pour limiter leur superposition, en gardant chacune sa pointe rattachée à son auteur.

L’aperçu local propose « Tester une bulle » : la phrase saisie est seulement affichée localement, sans envoi à Discord. « Tester deux bulles » ajoute un deuxième personnage de démonstration et fait parler les deux avatars.

Les pièces de la bulle viennent de ED6_DT00/c_waku3._ch et c_icon1._ch, décodées en ARGB4444. La police Averia Sans Libre déjà présente dans le dépôt est chargée localement. Pour réexporter :

~~~powershell
python activity/tools/export_dialogue_assets.py --ui-folder E:\dev\sky-activity-tools\fc-00\ED6_DT00 --output activity/assets/sky/dialogue
~~~

Le test des messages du véritable salon reste à faire dans Discord avec le bot et le client mis à jour ensemble.

## Discord

Le client s’identifie via le SDK et OAuth PKCE. Le serveur vérifie l’identité Discord et l’accès au salon, puis attribue un jeton temporaire à la session. Il reprend getPseudoAnonyme, le tirage existant du bot, et le rafraîchit toutes les 15 secondes. Le client ne choisit pas son personnage ni son identité. Les salons sont séparés et les positions trop rapides ou traversant une case bloquée sont refusées.

Les sprites absents du catalogue sont signalés et affichent Estelle provisoirement. Le raccordement OAuth/Discord complet doit encore être vérifié dans une activité réelle ; les tests locaux utilisent des identités simulées.

## Export

~~~powershell
python activity/tools/export_sky_assets.py --game "C:\Program Files (x86)\Steam\steamapps\common\Trails in the Sky FC" --model E:\dev\sky-activity-tools\fc-0a\ED6_DT0A\t1131._x2 --chips E:\dev\sky-activity-tools\fc-07\ED6_DT07 --extra-chips E:\dev\sky-activity-tools\sc-chips --output activity/assets/sky
node activity/tools/build-navigation.mjs
~~~

Le premier export nécessite les archives extraites avec ed6-archive (outil local existant). Pillow est nécessaire. Les associations du tirage aux fichiers sont dans tools/character-map.json ; les associations de PNJ déduites des scripts demandent encore une vérification visuelle.

## Hébergement

Copier deploy/index.php, deploy/api.php, bundle.js et assets/ dans le dossier activite du site. Le bot doit recevoir les modifications de index.js et utils/activityService.js, ainsi que activity/assets/sky/navigation.json. Le relais PHP transmet l’en-tête Authorization au bot ; l’hébergement doit le fournir à PHP. Ne pas mettre à jour uniquement le client : les anciennes routes state n’ont pas l’identification du prototype.

La publication suit activity/DEPLOYMENT.md. Les contrôles de démonstration restent réservés à l’aperçu local ; le client publié impose Discord.

## Musique et synchronisation

ED6101.ogg accompagne la map en boucle, volume initial 25 %. Le bouton en bas à droite coupe/réactive la musique et conserve ce choix localement. Si la lecture automatique est refusée, le premier geste de l’utilisateur la lance.

Les accusés de position sont comparés à la copie envoyée dans la requête : la latence ne replace plus le personnage à une position valide mais ancienne. Les déplacements refusés par le serveur restent corrigés.
