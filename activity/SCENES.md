# Scènes Sky

La scène de Ray se modifie dans `assets/sky/halloween/ray.sky`. C’est la source unique lue par le serveur et le client. Le fichier est relu à chaque entrée dans la scène ; publier le fichier sur les deux hébergements après modification. Le moteur n’exécute aucun JavaScript contenu dans ce fichier.

Les lignes commencent simultanément au temps courant. `wait` avance le temps : un déplacement ou un fondu ne bloque pas automatiquement les dialogues.

```text
# Fondu depuis le noir en deux secondes
fade in 2 0
title "CTZ · Laboratoire biologique" 6
# Caméra : centre x y z, angle horizontal, inclinaison (degrés), distance, durée du travelling
camera 0 0.8 4 37 37 15 0
# Acteur, départ x y z, arrivée x y z, durée
walk player 0 0 1 0 0 3 3
wait 3
face ray 0 -1
say ray "Bienvenue dans mon laboratoire."
wait 7
```

Acteurs de cette scène : `player`, `ray`, `pumpkin`. Les PNJ sont définis dans `residents.json`. `face acteur dx dz` règle leur orientation. `fade out durée maintien` permet un fondu vers le noir ; `fade in durée maintien` le révèle. `title "Nom du lieu" durée` affiche un titre avec apparition et disparition progressives. Les erreurs indiquent la ligne concernée. Une scène ne peut pas dépasser dix minutes.

## Invitation

`/scene destinataire:@collègue` produit une réponse privée contenant un lien à copier. Tu peux ensuite écrire ton propre MP et coller ce lien : Capel n’envoie pas de MP automatiquement. Le lien ouvre directement la scène via Discord, reste valable sept jours, et est lié au destinataire sélectionné. Il ne contient aucun identifiant de compte. L’invitant doit être administrateur ou être le testeur autorisé ; le destinataire doit appartenir au serveur.

## Éditeur local

Lancer `tools/cutscene-editor/Lancer.cmd`, puis ouvrir http://127.0.0.1:3030. Les projets sont enregistrés dans `E:/dev/sky-activity-tools/cutscenes`, sans copie de tout le jeu sur le serveur. Le script et les projets restent locaux tant qu’ils ne sont pas publiés.

Choisir une map et un sprite, nommer un acteur et cliquer sur Ajouter. Cliquer sur le sol pour le placer. L’outil Destination de marche ajoute un segment depuis sa dernière destination. Répéter pour construire un trajet. Cible de caméra place un plan ; clic droit glissé tourne la vue, Maj + clic droit la déplace. La séquence et le curseur temporel permettent d’examiner les déplacements. Prévisualiser rejoue la scène avec ses dialogues manuels. Arrêter revient à l’édition. Les commandes restent directement modifiables dans le script. Sauvegarder, importer et exporter fonctionnent avec des fichiers `.sky`.

```text
map halloween
actor player "Estelle" 0 0 1 player
actor ray "Ray" 0 0 5 npc
actor cobaye "Mishy" 2 0 6 enemy
```

Les acteurs de rôle `enemy` sont des figurants de cinématique, sans IA de combat. `player` représente le personnage incarné dans le jeu ; le sprite indiqué sert à la prévisualisation. La scène de Ray garde son accès privé. Dans une cinématique, aucune interface de jeu ne s’affiche. Un premier clic gauche termine le texte en cours ; le suivant avance une page ou une réplique. Les dialogues suspendent le temps de la scène jusqu’au clic : aucune expiration automatique. Une commande `wait` après un dialogue ajoute volontairement une attente une fois la réplique passée.
