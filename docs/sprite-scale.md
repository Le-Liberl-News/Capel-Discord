# Échelle native des personnages

La référence unique est `activity/assets/sky/sprite-scale.json` : un pixel natif vaut 0,02 unité du monde (50 pixels par mètre). Chaque case conserve ses dimensions et sa transparence ; une image recadrée ou une grande banque de craft ne change pas la taille du personnage.

`normalize-sprite-scale.cjs` applique cette référence aux sprites de carte, de combat et du public de l’arène avant chaque build. Les déplacements d’ancrage, talons de Sieg, images de mort et autres banques gardent leurs coordonnées exprimées en pixels. La garde de 0,025 m des cadavres reste constante. Les images PNG ne sont pas modifiées.

`bodyPixelHeight` représente la silhouette debout, mesurée dans les orientations natives ; elle sert aux noms et aux volumes de tir plutôt que la hauteur du grand rectangle transparent d’un craft. Ries conserve sa hauteur corporelle native de 86 pixels, hors épée dressée. Les tailles volontaires des monstres du catalogue des ennemis restent définies séparément. Le ballon lancé conserve aussi sa taille propre ; un joueur incarnant Pom utilise bien l’échelle commune.

Les métadonnées générées ne doivent plus normaliser un personnage à 1,7 m. Même si un exporteur réintroduit une ancienne valeur, le build recalcule la géométrie avec l’échelle commune.
