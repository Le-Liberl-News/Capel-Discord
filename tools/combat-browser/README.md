# Atelier combat local

Double-cliquer sur `Lancer.cmd`. Garder la fenêtre du serveur ouverte. Adresse : http://127.0.0.1:3020.

- **Personnages** : routines AS, toutes les banques disponibles, directions disponibles, banques charg�es par les crafts et S-crafts, animations actuellement utilisées dans le jeu.
- **Effets** : assemblages EF de SC et The 3rd : émissions, courbes de position, rotation, taille, couleur et animation des cellules. Vue orientable, lecture et timeline.
- **Textures** : planches seules et découpage manuel, séparés des effets animés.
- Pause, frame suivante/précédente, vitesse, zoom et fond.
- **Copier le GIF** : animation de la sélection, 640 px, 15 images/s, avec le zoom, la vitesse et le fond choisis. Coller avec Ctrl+V dans Discord. Le fichier temporaire reste sur le PC (aucun envoi au serveur public). En cas d’échec du presse-papiers, un lien permet de le télécharger. Les séquences dépassant une minute sont limitées à 60 secondes.
- **Ajouter aux choix**, puis **Exporter les choix** pour transmettre `choix-combat-sky.json`, avec animation, effet, timings et mécanique souhaitée. Les choix restent aussi dans ce navigateur.

Les routines montrent les poses et attentes extraites des AS. Elles ne reproduisent pas les déplacements, branchements conditionnels ou effets 3D complets des scripts. Les entrées « actuellement en jeu » montrent nos séquences configurées ; la vitesse 2 reproduit leur accélération actuelle. Les textures d’effets gardent leur nom de fichier, sans leur attribuer un faux nom de sort.

Préparation ou mise à jour :

```powershell
python tools/combat-browser/export.py --sprites-only
node tools/combat-browser/server.cjs
```

Données extraites : `E:/dev/sky-activity-tools`. Décodage AS : `E:/dev/Website/toolchain`. Cache PNG et catalogue : `E:/dev/sky-activity-tools/atelier-combat`, hors du dépôt et du serveur public. Ces chemins peuvent être remplacés par `--extracted`, `--decoder`, `--output` ; le serveur accepte le dossier de cache puis le port comme arguments.

Prérequis : Node.js, Python et Pillow. Aucune connexion Discord ; serveur exclusivement sur 127.0.0.1. Aucun contenu de l’activité déployée n’est modifié.

Le lecteur EF est une reconstitution locale, pas le moteur original. Les géométries spéciales, les rubans et les trajectoires dépendant des acteurs ne sont pas encore reproduits exactement ; les limitations de l’effet sélectionné sont affichées. Les références des effets sont conservées dans les choix exportés. Format brut : 0x4BD0, 16 parties, 8 émissions par partie. Les offsets sont vérifiés dans le binaire local ed6_win3.exe ; le format apparenté est documenté par [Falcom-Tools](https://github.com/game-a11y/Falcom-Tools/blob/master/ED7/Decompiler/3rdEffectFile.py).

Si E: manque de place, les sources The 3rd peuvent être déplacées dans `~/.codex/sky-effect-work/third-33/ED6_DT33` ; l’export les retrouve à cet emplacement.

Modèles d’effets X3 : `python tools/combat-browser/export_models.py cr04150b`. Le lecteur utilise le maillage et ses UV ; la déformation du squelette interne du modèle reste à compléter. Les déclenchements retardés et les cercles posés au sol sont pris en charge.
