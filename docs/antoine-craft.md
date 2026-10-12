# Antoine, le chat

G puis clic sur le sol : bond de 12 mètres maximum, 0,7 mètre de hauteur, 0,35 seconde. Il s’accroche au premier ennemi vivant le plus proche à moins de 1,05 mètre de son atterrissage. Les alliés de la tour sont exclus.

Accroché : morsure de 8 PV toutes les 650 ms, petites éclaboussures natives Third/msc0601._ef ; vitesse du porteur multipliée par 0,8. Antoine suit le torse du porteur et ne peut plus marcher ni lancer une technique.

Seul un impact de singe-mouton sur le porteur, même absorbé par une protection, le décroche. Le porteur ne peut ni cibler ni toucher Antoine avec ses attaques. Les autres coups et les morsures ne provoquent pas de décrochage. Les singes-moutons peuvent maintenant toucher leur lanceur après un ricochet. En PvE, l’accrochage expire après 10 secondes et le bond a une récupération de 20 secondes depuis son déclenchement. L’IA d’arène cherche un singe-mouton puis un mur et provoque un ricochet sur elle-même en restant sur le trajet de retour. Décès, disparition ou changement de personnage terminent l’accrochage ; la position de retour est recherchée sur le sol voisin accessible.

La spritesheet originale est activity/assets/sky/ch01700.png : 8 × 8 cases de 72 × 53 pixels (576 × 424), transparence PNG. Copie fournie sur le Bureau : Antoine-spritesheet.png. Le sprite accroché utilise provisoirement son sprite existant, placé sur le torse ; aucune nouvelle pose n’a été inventée.

Effets additionnels précalculés à partir des assemblages natifs du jeu : cœurs et onde répulsive d’Anton, terre d’Estelle, faisceau d’arrivée dans la tour, pétales de Richard, luth d’Olivier, glace et éclats de Campanella. Les cristaux terminent leur apparition puis restent sur leur dernière frame visible jusqu’au dégel.

Le bond laisse huit copies du sprite original, teintées en orange et estompées en 260 ms. Third/mp003_00._ef se joue au point de départ, son axe orienté selon la dérivée initiale du bond. La pose accrochée conserve l’image originale intacte ; les essais de découpes externes ne sont pas utilisés par le jeu.
