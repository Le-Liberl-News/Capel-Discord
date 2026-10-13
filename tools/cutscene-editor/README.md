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
