# Tour procedurale : etude de faisabilite

## Assets verifies

Le scenario SC `ED6_DT21/c0700._sn` affiche explicitement `Esmelas Tower` et reference les sprites de monstres `ch12590` a `ch12651`. La banque de modeles locale `ED6_DT2A` contient `c0700._x3` a `c0707._x3`.

Un export reel de `c0701._x3` avec `activity/tools/export_sky_assets.py` a reussi : 424 meshes, 16 materiaux/textures, environ 4,15 Mo pour le GLTF et les PNG. L'export de controle reste local dans `E:/dev/sky-activity-tools/esmelas-study`. Aucun asset de tour n'est deploye avec cette modification.

Les textures sont `C07C0004`, `0104`, `0204`, `0304`, `0604`, `0704`, `0804`, `0904`, `1004`, `1104`, `1504`, `1604`, `1704`, `1804`, `1904`, `2004`. Le modele exporte utilise les couleurs de sommets et le rendu natif sans eclairage PBR. La conversion existante conserve l'alpha des textures.

## Construction des etages

Les 424 meshes sont des morceaux de dessin du decor, avec des noms generiques, pas un catalogue de salles avec des portes raccordables. Les melanger directement produirait des trous, des murs doubles et des passages bloques. La solution proposee est un petit kit : dalle, mur, angle, porte, escalier, pilier et decor. Les textures d'Esmelas habillent les formes generees ; certains piliers, escaliers et accessoires peuvent etre isoles du modele original. Un editeur local doit enregistrer les points de raccordement et les collisions de chaque morceau.

Le generateur produit un graphe de salles puis place les modules sur une grille. Chaque etage a une graine stable, un point d'entree, une sortie et un chemin garanti entre les deux. Les ennemis et decorations sont places seulement sur des zones accessibles, a distance des escaliers. Le serveur verifie la connexite et refuse un etage invalide ; une forme simple sert de secours.

Le decor, la navigation et les collisions doivent provenir du meme layout. Le client peut assembler les modules et afficher les textures, mais le serveur reste proprietaire des positions, des PV et des coups. Le seed et la version du generateur suffisent pour reconstruire le decor sans stocker une copie GLTF de chaque etage.

## Monde partage et stockage

Une seule carte partagee par numero d'etage : deux groupes au meme etage se rencontrent. Aucun duplicata prive de la tour n'est necessaire. Charger seulement les etages occupes et les voisins immediats, puis decharger le reste. Conserver la progression des joueurs et les changements des etages utiles, avec une politique explicite de regeneration des etages vides, pour que la tour infinie n'accumule pas une infinite de fichiers.

Ne publier que le petit kit de modeles, les textures choisies et les sprites des ennemis utilises. Les archives du jeu et les exports complets restent sur le PC de creation.

## Combat PVE

Le moteur actuel gere les attaques, les arts et les crafts avec PV, delais, collisions et effets confirmes par le serveur. Il vise actuellement les joueurs du salon ; les PNJ de promenade ne sont pas des ennemis combatants. Il faut ajouter des entites ennemies et des factions, generaliser le ciblage aux joueurs et monstres, et couper les degats entre joueurs dans la tour.

L'IA necessaire : repos, perception, poursuite par navigation, preparation visible du coup, attaque esquivable, retour a sa zone, mort. Les sprites CH/CP et scripts AS des monstres doivent etre audites comme ceux des personnages. Le bestiaire du RPG Discord peut fournir des valeurs de depart, mais son combat par tours ne doit pas etre branche tel quel sur la simulation action.

Les personnages sans attaque resteront non-combattants tant qu'aucune capacite ne leur est definie. Prevoir ensuite objets utilisables ou soutien si ces personnages doivent pouvoir progresser seuls.

## Premiere version conseillee

1. Un kit Esmelas, trois formes de salle, un escalier et des layouts sans impasse bloquante.
2. Deux ou trois monstres avec une attaque chacun, poursuite et mort ; combat cooperatif sans degats entre joueurs.
3. Etages numerotes sans limite fixe, ennemis plus difficiles progressivement, nombre d'ennemis simultanes borne.
4. Retour a l'Anterose, sauvegarde de la progression et tests de connexite, collision et reconnexion.

L'idee est faisable. Le gros travail est le kit de decor et l'IA action ; l'extraction des textures, le rendu des sprites et une grande partie du combat existent deja. Un vrai prototype jouable doit preceder l'ajout de boss, butin et evenements.
