# Atelier cinématiques local

Double-cliquer `Lancer.cmd`, puis ouvrir http://127.0.0.1:3030.

- Choisir une map, ajouter des PNJ ou des ennemis avec leurs sprites et les placer au clic sur une surface.
- Ajouter des trajets, orientations, dialogues, attentes et plans de caméra ; modifier aussi directement le script.
- Inspecter la séquence avec le curseur temporel, puis Prévisualiser pour jouer avec les fondus, bandes noires et dialogues au clic.
- Arrêter revient à l’édition. La prévisualisation de lecture utilise le zoom du jeu ; l’édition permet de tourner, déplacer et zoomer la vue.
- Sauvegarder écrit dans `E:/dev/sky-activity-tools/cutscenes`. Les boutons Importer et Exporter manipulent des fichiers `.sky`.

Les ennemis sont des acteurs de scène, sans IA de combat. Les déplacements sont des segments directs : ajouter des étapes pour contourner les murs. L’éditeur ne publie pas les projets automatiquement. Pour remplacer la scène de test de Ray, son script est `activity/assets/sky/halloween/ray.sky` ; publier ce fichier sur les deux hébergements. Le rôle `player` utilise le personnage du joueur en production et le sprite choisi dans l’éditeur.

## Manipulation directe

Saisir et glisser un sprite le déplace en continu sur la map. Un clic simple sélectionne le personnage ; un clic dans le vide ne le téléporte plus. Les points jaunes de son trajet se déplacent également à la souris. Déplacer le personnage translate son trajet ; déplacer une étape conserve la jonction avec l’étape suivante. Centrer agrandit la sélection ; Vue d’ensemble revient à une vue large. Annuler / Rétablir et Ctrl+Z / Ctrl+Y permettent de revenir sur ces modifications. La caméra garde son cadrage lors des déplacements.


## Trajectoires, assets et plans

- **Trajet courbe** : cliquer le point de courbure, puis la destination. Le point violet et la destination jaune peuvent ensuite être glissés. Plusieurs commandes peuvent former un trajet plus long.
- **Orientation** : sélectionner un personnage ou un objet, puis une direction N/NE/E/etc., ou saisir un angle (0° nord, 90° est) et appliquer. Les objets apparus peuvent être glissés dans la map après leur apparition.
- **Transition du plan** : coupe directe, travelling interpolé, ou fondu noir. La durée s’applique au travelling ou au fondu entier.
- **Objets, effets et sons** : choisir une catégorie, rechercher un identifiant, cliquer le sol pour choisir la position et insérer. Les effets utilisent le moteur natif d’assemblage EF, pas leur texture seule. Le bouton Écouter permet de chercher les bruitages.
- Les archives installées FC, SC et Third sont indexées sans être décompressées intégralement. Un sprite ou un WAV est extrait uniquement lorsqu’il est choisi. Les noms `Third/ch01220._ch` désignent les feuilles natives ; certaines feuilles contiennent des poses de scène plutôt qu’une marche complète.
- Les objets disponibles comprennent les modèles GLTF du jeu déjà extraits et les modèles X3 convertis dans l’atelier. Les modèles X3 des archives installées sont également proposés et convertis à la demande, avec leurs textures. Une référence dont le décodeur ne peut pas lire le modèle ou retrouver une texture produit une erreur explicite.
- **Assets à publier** compare les dépendances sélectionnées au manifeste du serveur publié (ou au manifeste local si le serveur est inaccessible, ce qui est indiqué). **Préparer le dossier** écrit un paquet sous `E:/dev/sky-activity-tools/cutscenes/packages/`, avec le script portable, les seuls fichiers nécessaires, `manifest.json` et `characters-to-merge.json` à fusionner au catalogue du jeu. Ce bouton ne publie rien et n’écrase pas les scènes existantes.

### Nouvelles commandes

```text
# Départ, contrôle Bézier, arrivée et durée
curve player 0 0 1 4 0 2 0 0 4 4
# Plan : focus XYZ, angles en degrés, distance, durée, transition
camera 0 1 4 37 40 15 2 fade
asset caisse model "rolent/props/crate/anterose.gltf"
wait 5
spawn caisse1 caisse 2 0 3 90 1
wait 3
remove caisse1
# Catalogue EF contenant {id, entries}, fourni automatiquement par l’export
asset halo effect "scene-library/halo.json"
effect halo1 halo 0 0 3 0 0.05 4
asset son sound "sounds/sieg.ogg"
sound son 0.7
```

`asset` déclare une ressource ; `spawn` et `effect` la rendent visible seulement à leur instant dans la séquence. `remove` la retire. Le scrubber reconstruit ces apparitions dans les deux sens. Un effet s’arrête également après sa durée.
