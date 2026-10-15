# Atelier de maps local

Lancer `Lancer.cmd`, puis ouvrir http://127.0.0.1:3040/.

Les cinq étages Halloween sont disponibles. Sélectionner un objet dans la vue ou la liste. Le glisser déplace au sol ; les trois poignées permettent de déplacer sur un axe. **Z est la hauteur**. Les modes Pivoter et Échelle utilisent les mêmes trois axes. Les champs numériques donnent une position, une rotation en degrés et une échelle précise. Échelle uniforme conserve les proportions.

Glisser un asset de la palette dans la vue, ou cliquer dessus puis sur le sol. Les murs, escaliers, plateformes et décors proviennent des assets natifs. Clic droit : tourner la caméra ; molette : zoom ; bouton central : déplacement de caméra. W/E/R : déplacer/pivoter/échelle. Ctrl+Z et Ctrl+Maj+Z : annuler/rétablir.

Sauvegarder conserve le projet dans `E:/dev/sky-activity-tools/map-editor/projects`. Changer de map sauvegarde les modifications en cours. Exporter reconstruit le modèle et les collisions dans `E:/dev/sky-activity-tools/map-editor/exports`. Tester en jeu ouvre cette version localement. Appliquer localement remplace les fichiers du projet Capel avec une sauvegarde dans `.../backups` ; cela ne publie rien sur le serveur.

La reconstruction vérifie que l’entrée et la sortie sont accessibles à pied. Un mur ou un escalier déplacé change les collisions ; éviter les plateformes superposées (navigation à une hauteur par case). Les assets restent à leur échelle native jusqu’à une modification explicite.

Le catalogue des jeux indexe les modèles FC/SC/The 3rd et Azure ainsi que leurs sprites. Rechercher un code de map/modèle, ouvrir le modèle, puis choisir un de ses éléments natifs. La conversion ne porte que sur le fichier demandé ; certains formats particuliers peuvent échouer et afficher leur diagnostic. Les sprites sont des poses fixes à sélectionner par frame. Aucun jeu n’est décompressé en entier.

Ajouter une lumière crée une source d’éclairage dynamique, réglable dans l’inspecteur : couleur, intensité, portée, scintillement. Déplacer son repère change l’éclairage des surfaces en temps réel. Activer « Lumière du jeu » pour juger le résultat dans l’obscurité. Ces sources utilisent le shader natif du jeu web avec atténuation par distance ; elles ne projettent pas encore d’ombres et traversent les murs.

Le nom de chaque objet et son identifiant stable sont conservés dans `layout.json` (`editorObjects`), pour pouvoir ensuite ajouter des interactions sans dépendre du classement des meshes. L’export produit également `assets-required.json` et un dossier contenant uniquement les textures utilisées par les objets placés.


Dans **PNG et sols personnalisés**, Importer un PNG conserve ses pixels et son canal alpha, puis propose de poser un quad vertical. Il est possible de le déplacer, pivoter et redimensionner comme les autres objets, notamment de le coucher au sol. L’image reste disponible dans la palette sur les autres projets. Limites de l’import : 16 Mo et 8192 pixels par côté.

**Dessiner un sol** : choisir une texture, une hauteur Z et la taille du motif répété ; cliquer les sommets dans la vue, puis Terminer ou Entrée. Les polygones concaves sont acceptés ; un contour qui se croise est refusé. Retour arrière ou Ctrl+Z retire le dernier sommet pendant le dessin, Échap annule. **Rectangle** : cliquer deux coins opposés. Chaque sol devient un objet déplaçable et nommé, avec un véritable maillage plat ; l’export reconstruit la navigation sur sa forme exacte. Les textures et formes restent stockées localement avant une publication explicite.


Ctrl+C copie l’asset sélectionné, Ctrl+V le colle avec un nouvel identifiant et un léger décalage. Le presse-papiers interne reste disponible entre les maps de cette fenêtre. Ctrl+Z annule la pose ; les raccourcis conservent leur fonctionnement texte dans les champs. Les repères liés à la map ne sont pas copiables.

Avant la pose, l’asset suit le curseur sur la surface en semi-transparence. Cliquer le pose ; Échap annule.

Pour rendre un asset mobile : dans l’inspecteur, cocher **Aller-retour horizontal**. La position de l’objet est le départ ; les déplacements X/Y définissent l’autre extrémité. Régler vitesse, pause et largeur jouable carrée (à adapter à la surface réelle du modèle). Le trait bleu montre le trajet. **Animer les plateformes** prévisualise le mouvement ; la plateforme sélectionnée reste au départ pour faciliter sa modification. L’export conserve le modèle natif et produit les définitions de transport utilisées par le jeu. Les plateformes mobiles ne laissent aucun sol fixe dans leur position initiale. Le trajet est à maintenir libre de murs et d’obstacles ; les avertissements de connexion à pied peuvent être normaux si une plateforme fait la liaison.


Le catalogue affiche les **Modèles** par défaut. Cliquer une map active immédiatement son aperçu complet sous le curseur. La grande fenêtre de sélection du catalogue permet de tourner autour du modèle et de cliquer directement un morceau pour le poser seul. Les éléments sont séparés par connexion géométrique, même entre matériaux différents ; les groupes d’origine sont masqués par défaut mais restent disponibles. Un objet du jeu peut comporter plusieurs morceaux disjoints : Ctrl+clic dans la grande vue pour les sélectionner, puis **Utiliser la sélection** pour les placer ensemble. Les pixels et textures restent ceux du jeu, et aucun projet n’est modifié tant qu’on ne pose pas la sélection.

La sélection est surlignée en doré et encadrée. Clic gauche remplace la sélection ; Ctrl+clic ajoute ou retire un morceau. **Utiliser la sélection** ferme la fenêtre et prépare le groupe sous le curseur sur la map. **Ouvrir la grande vue de sélection** permet de revenir au modèle courant.


Le catalogue affiche toute la liste filtrée, sans pagination. Les modèles Sky portent leur nom de lieu issu des en-têtes des scénarios et de la table native `t_town` (recherchable par nom ou code). Survoler une entrée indique les scénarios sources. Les modèles sans association connue sont marqués « Lieu non identifié » ; aucune localisation n’est déduite arbitrairement du code. Le petit index local est généré par `index-locations.py`, sans extraire les jeux sur disque.

Ctrl+Z / Ctrl+Maj+Z annulent et rétablissent aussi les transformations faites dans les champs numériques, même si le champ a encore le focus. Une saisie numérique est une opération ; les recherches et les champs de texte ordinaires conservent leur annulation native.


Les descriptions de `TABLE FC.xlsx`, `TABLE SC.xlsx`, `TABLE 3RD (3).xlsx` et `TABLE ZERO.xlsx` sont prioritaires sur les noms natifs. Elles sont importées dans `table-locations.json`, avec provenance (fichier, onglet, ligne), par `import-table-locations.py`. Les espaces de remplissage, majuscules et suffixes de scénarios `_1` sont normalisés ; une ligne de base exacte prime sur une variante. Azure utilise exclusivement les identifiants de la table ZERO pour ces noms ; toute absence est libellée **spécifique à Azure**. Les autres jeux gardent le nom natif en secours pour les modèles absents de leur table. Les sources XLSX ne sont jamais modifiées.

Pour modifier un modèle déjà posé, sélectionner l’objet puis **Modifier les morceaux du modèle…**. Dans cette fenêtre, Ctrl+clic sélectionne plusieurs morceaux ; on peut les supprimer ou recolorer leurs textures ensemble, en conservant leur transparence. Le découpage propose les morceaux connectés, les surfaces/textures, ou les faces triangulaires pour une sélection fine (maximum 6 000 faces ; isoler un morceau plus petit au besoin). **Appliquer à cet objet** crée une variante réservée à cet objet, sans déplacer son pivot ni modifier les autres exemplaires. Fermer sans appliquer abandonne le brouillon ; Ctrl+Z annule l’application. Sauvegarder le projet conserve la variante et ses textures ; l’export les inclut.
