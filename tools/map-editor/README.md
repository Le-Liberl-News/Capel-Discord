# Atelier de maps local

Lancer `Lancer.cmd`, puis ouvrir http://127.0.0.1:3040/.

Les cinq étages Halloween sont disponibles. Sélectionner un objet dans la vue ou la liste. Le glisser déplace au sol ; les trois poignées permettent de déplacer sur un axe. **Z est la hauteur**. Les modes Pivoter et Échelle utilisent les mêmes trois axes. Les champs numériques donnent une position, une rotation en degrés et une échelle précise. Échelle uniforme conserve les proportions.

Glisser un asset de la palette dans la vue, ou cliquer dessus puis sur le sol. Les murs, escaliers, plateformes et décors proviennent des assets natifs. Clic droit : tourner la caméra ; molette : zoom ; bouton central : déplacement de caméra. W/E/R : déplacer/pivoter/échelle. Ctrl+Z et Ctrl+Maj+Z : annuler/rétablir.

Sauvegarder conserve le projet dans `E:/dev/sky-activity-tools/map-editor/projects`. Changer de map sauvegarde les modifications en cours. Exporter reconstruit le modèle et les collisions dans `E:/dev/sky-activity-tools/map-editor/exports`. Tester en jeu ouvre cette version localement. Appliquer localement remplace les fichiers du projet Capel avec une sauvegarde dans `.../backups` ; cela ne publie rien sur le serveur.

La reconstruction vérifie que l’entrée et la sortie sont accessibles à pied. Un mur ou un escalier déplacé change les collisions ; éviter les plateformes superposées (navigation à une hauteur par case). Les assets restent à leur échelle native jusqu’à une modification explicite.
