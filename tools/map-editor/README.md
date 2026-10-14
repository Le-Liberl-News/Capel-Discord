# Atelier de maps local

Lancer `Lancer.cmd`, puis ouvrir http://127.0.0.1:3040/.

Les cinq étages Halloween sont disponibles. Sélectionner un objet dans la vue ou la liste. Le glisser déplace au sol ; les trois poignées permettent de déplacer sur un axe. **Z est la hauteur**. Les modes Pivoter et Échelle utilisent les mêmes trois axes. Les champs numériques donnent une position, une rotation en degrés et une échelle précise. Échelle uniforme conserve les proportions.

Glisser un asset de la palette dans la vue, ou cliquer dessus puis sur le sol. Les murs, escaliers, plateformes et décors proviennent des assets natifs. Clic droit : tourner la caméra ; molette : zoom ; bouton central : déplacement de caméra. W/E/R : déplacer/pivoter/échelle. Ctrl+Z et Ctrl+Maj+Z : annuler/rétablir.

Sauvegarder conserve le projet dans `E:/dev/sky-activity-tools/map-editor/projects`. Changer de map sauvegarde les modifications en cours. Exporter reconstruit le modèle et les collisions dans `E:/dev/sky-activity-tools/map-editor/exports`. Tester en jeu ouvre cette version localement. Appliquer localement remplace les fichiers du projet Capel avec une sauvegarde dans `.../backups` ; cela ne publie rien sur le serveur.

La reconstruction vérifie que l’entrée et la sortie sont accessibles à pied. Un mur ou un escalier déplacé change les collisions ; éviter les plateformes superposées (navigation à une hauteur par case). Les assets restent à leur échelle native jusqu’à une modification explicite.

Le catalogue des jeux indexe les modèles FC/SC/The 3rd et Azure ainsi que leurs sprites. Rechercher un code de map/modèle, ouvrir le modèle, puis choisir un de ses éléments natifs. La conversion ne porte que sur le fichier demandé ; certains formats particuliers peuvent échouer et afficher leur diagnostic. Les sprites sont des poses fixes à sélectionner par frame. Aucun jeu n’est décompressé en entier.

Ajouter une lumière crée une source d’éclairage dynamique, réglable dans l’inspecteur : couleur, intensité, portée, scintillement. Déplacer son repère change l’éclairage des surfaces en temps réel. Activer « Lumière du jeu » pour juger le résultat dans l’obscurité. Ces sources utilisent le shader natif du jeu web avec atténuation par distance ; elles ne projettent pas encore d’ombres et traversent les murs.

Le nom de chaque objet et son identifiant stable sont conservés dans `layout.json` (`editorObjects`), pour pouvoir ensuite ajouter des interactions sans dépendre du classement des meshes. L’export produit également `assets-required.json` et un dossier contenant uniquement les textures utilisées par les objets placés.
