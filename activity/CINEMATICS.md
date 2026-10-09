# Fin de duel

`duel-finish.mjs` enregistre 8,5 secondes de positions, poses et effets en mémoire, à 10 Hz. Les ressources des effets expirés sont libérées. Aucun enregistrement n’est envoyé au serveur.

Au premier KO confirmé, la scène est reconstruite séparément du monde partagé. Les sprites choisissent leur direction selon la caméra de relecture. Les positions sont interpolées ; les poses et textures restent discrètes.

| Plan | Durée |
| --- | --- |
| Vainqueur de face, rapprochement | 1,6 s |
| Suivi du projectile ou de l’acteur | 1,9 s |
| Impact, arrêt bref, ralenti, flash et secousse | 1,7 s |
| Déplacement vers une vue plongeante du vaincu, victoire | 2,2 s |

## Marqueurs d’une attaque

Le résultat public du duel contient `action` :

- `kind`, `id`, `technique` : identification sans compte Discord.
- `started`, `releaseAt`, `impactAt`, `endsAt` : temps serveur en millisecondes.
- `follow` : `actor` pour un coup ou un déplacement, `projectile` pour un tir.
- `origin`, `aim` : positions `{x, y, z}`.
- `trajectory` pour le Pom : points `{t, x, y, z}`, avec `t` en secondes depuis le lancement. Les ricochets sont conservés.

Pour une future charge ou un saut, utiliser `follow: "actor"` et animer la position réelle de l’acteur : la relecture reprendra aussi sa hauteur. Sans historique complet (reconnexion après le KO), les plans utilisent les derniers états disponibles.

Le GIF reprend les quatre plans : 24 images de 224 × 168, palette de 64 couleurs, durée de 7,44 secondes. Il utilise le relais de capture existant ; un seul des deux joueurs suffit pour le publier dans le thread du match. Le texte de victoire reste indépendant de la capture.
