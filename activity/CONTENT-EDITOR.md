# Éditeur local de contenu Sky — proposition

## Usage souhaité

Une application lancée sur le PC, ouverte dans le navigateur, avec notre rendu Three.js et les mêmes collisions que l’activité. Deux espaces : **Map** et **Attaque**. Les archives FC/SC/Third restent en lecture seule sur le disque. Chacun indique ses chemins une fois ; un cache local fournit modèles, sprites et effets prêts à prévisualiser. L’éditeur n’a pas besoin d’un compte Discord pour tester.

### Map

Ouvrir l’Antérose, Rolent ou l’arène, puis glisser un objet depuis une bibliothèque avec miniatures. Déplacer, tourner, redimensionner avec les poignées du viewport ; dupliquer, supprimer, annuler. Pouvoir extraire un groupe de meshes d’un décor du jeu et régler son pivot, comme pour le Capel.

- Props : meubles, tonneaux, plantes, accessoires et modèles personnalisés.
- Monstres/PNJ : position de départ, trajet de patrouille, dialogues ; pour un monstre actif, comportement choisi dans des modèles définis par le moteur, avec aggro, PV et réapparition. Importer un modèle ne crée pas son IA.
- Décals : choisir un PNG et cliquer sur un sol ou un mur pour y placer sang, affiche, graffiti. Orientation sur la surface, taille/opacité réglables, aperçu de la transparence et décalage de profondeur pour éviter le clignotement.
- Lumières : emplacement, couleur, rayon, intensité, activation nocturne ; aperçu du cycle jour/nuit. Les textures ont déjà de l’éclairage peint, et les ombres de nouvelles lumières restent à développer et à mesurer sur mobile.
- Collisions/navigation : afficher les obstacles, vérifier les chemins et reconstruire les données quand un meuble bloquant est déplacé. Les décals ne créent pas d’obstacle.

Tout ceci se place dans une **couche** : « Halloween », « décor RP », etc. Le décor de base reste intact. Une couche peut être activée pour une période, puis désactivée pour retrouver la map habituelle, dans le même monde partagé.

### Attaque

Choisir un personnage, puis un emplacement **Attaque normale / Art / Craft**. Un emplacement vide ne crée aucun bouton en jeu. Garder F/C/G sur PC et afficher uniquement les boutons disponibles sur mobile.

Importer une routine AS avec ses véritables banques CH/CP. La timeline contient des pistes distinctes :

| Piste | Réglages visuels |
|---|---|
| Personnage | Banque, poses, direction, durée de chaque frame |
| Mouvement | Déplacement, saut, orientation, retour au contrôle |
| Effets | Sprites du jeu ou personnalisés, position, taille, durée, liaison au personnage/au projectile/à l’impact |
| Son | Début, volume, spatialisation si disponible |
| Combat | Préparation, départ, impact, fin ; portée, zone, dégâts et délai de recharge |

Lecture, pause, déplacement dans la timeline, ralentissement ; mannequin cible qui montre la zone touchée et les PV retirés. Prévisualiser plusieurs directions et un adversaire qui esquive. Les réglages de combat sont validés et exécutés par le serveur ; changer un effet côté client ne change jamais les dégâts. Le test local ne publie aucun GIF ou message Discord.

Les AS donnent des séquences originales, mais le moteur doit traduire leurs déplacements, sons et effets en pistes utilisables : ce n’est pas un import automatique de toutes les mécaniques du jeu.

## Personnages et progression

L’audit local précédent porte sur 84 personnages autorisés : **31 ont attaque, incantation/lancement d’art et craft natifs**, **5 ont attaque et craft sans art natif**, Dorothy a une attaque particulière, Dunan/Aina des séquences spéciales, et 45 n’ont pas de séquence normale retrouvée. Ces ressources ne sont pas encore toutes intégrées : **Renne reste le premier personnage de combat jouable**.

Chaque personnage reçoit une fiche avec ses emplacements disponibles. L’éditeur propose les routines natives compatibles, puis vous choisissez le craft et vérifiez son rendu. Un personnage sans assets de combat peut rester non combattant ou recevoir une animation créée à la main. On ne lui invente pas un trio générique pour remplir les cases.

## Fichiers et publication

Le projet contient des définitions légères : maps, couches, attaques, associations de personnages. Les assets portent des identifiants stables, leur jeu d’origine et leurs empreintes. Vous partagez ces définitions dans Git, avec vos images personnalisées ; chacun reconstruit son cache depuis son installation locale.

**Construire** produit un pack versionné avec uniquement les modèles, textures, sprites et sons réellement utilisés, plus les collisions et les règles. Une validation vérifie références, formats, transparence, timings, limites de dégâts et poids du pack. Un aperçu montre les modifications avant publication.

Le serveur garde les règles/collisions nécessaires à la simulation et sert les assets sélectionnés aux clients. Il n’héberge pas les archives complètes. Les données de combat restent autoritaires côté serveur. Activer ou désactiver une couche recharge une version cohérente pour tous ; un pack défectueux peut revenir à la version précédente.

### Exemple Halloween

Créer une couche « Halloween Rolent », placer citrouilles, affiches et traces de sang, ajouter quelques lumières orangées et des fantômes sur une patrouille. Définir des apparences de Prop Hunt et des Poms citrouilles. Dupliquer un craft existant pour remplacer son effet visuel, sans changer ses dégâts par accident. Tester en local, exporter le pack, l’activer pour l’événement ; à la fin, désactiver la couche.

## Ordre de réalisation proposé

1. Rendre le moteur d’attaque pilotable par des données, à partir de Renne : banques, timeline, effets et règles partagées.
2. Premier éditeur utilisable : placement de props/décals/lumières sur une map et montage des trois actions de Renne ; test local et export reproductible.
3. Importer les personnages natifs par petits groupes, avec contrôle visuel de chaque craft. Commencer par les personnages joueurs les plus utilisés.
4. Ajouter les couches d’événements, puis les comportements de monstres et les outils de navigation plus avancés.

Cette proposition ne constitue pas un éditeur déjà livré. Elle évite de construire deux moteurs de rendu incompatibles : l’éditeur et l’activité réutiliseraient les mêmes modules.

## Introduction du duel livrée avec cette itération

Adaptation courte de FC `ED6_DT01/t4104._sn` : panorama, présentation du premier côté, second côté, retour au centre et lancement. Le script natif fait aussi entrer des équipes par les portes et contient des dialogues d’arbitre ; ces éléments ne sont pas reproduits dans notre duel à deux joueurs. Les neuf secondes sont synchronisées par le serveur. Déplacements, attaques et dégâts sont bloqués pour les participants jusqu’au départ. Les duels déjà acceptés lors d’un redémarrage gardent leur état, sans rejouer l’intro.

Musique de combat locale : FC `BGM/ED6404.ogg`, publiée comme `music/arena.ogg` (Challenger Invited). La piste repart au début lors d’un nouveau duel ; les préférences de volume et de sourdine sont conservées. Catalogue officiel de l’OST : https://www.falcom.co.jp/music-data/sora-ost
