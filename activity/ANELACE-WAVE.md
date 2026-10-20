# Piercing Wave d’Anelace

Le marquage de ligne utilise un demi-rayon de 0,7 m (1,4 m de large) et le croissant avance à 18 m/s au lieu de 9. La zone d’explosion conserve son rayon de 2 m et ses 30 dégâts.

Le projectile balaie le volume réel des personnages entre sa dernière position et la suivante avec une marge de 0,65 m, ainsi que les obstacles avec la même largeur. Le contact hostile le plus proche est retenu. Une victime touchée reçoit les dégâts directs (en conservant garde/parade) puis est exclue des dégâts de zone pour éviter un double impact. Les alliés et les personnages sur un autre étage ne sont pas touchés ; les autres victimes de l’explosion conservent le test d’occlusion.

Le modèle natif Third/sc009_05._ef est ancré sur sa partie mobile 2 : son mouvement d’origine n’est plus ajouté à celui du projectile. Le corps principal est redimensionné pour correspondre à la largeur jouable. Les anciennes copies étirées du croissant sont remplacées par sept flammes Third/ms04671l._ef, avec le traitement orange du phénix de Cassius et un éclat réduit. Les flammes sont libérées à la fin du projectile.

Tests : tests/activity-anelace.test.cjs ; contrôle en scène avec trajet, impact visuel et 30 dégâts. Deux tests existants de la suite activity-special-crafts (fixtures du pilier de Campanella et anneau du phénix) échouent également sur HEAD avant cette modification ; les tests ciblés de Piercing Wave, des collisions et du rendu natif passent.
