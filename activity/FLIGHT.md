# Vol de Sieg et choix de test

Aujourd’hui, le Capel propose « Personnage (test) » : selection d’un sprite existant, ou « Personnage du jour » pour restaurer l’apparence normale. Le choix concerne seulement le joueur authentifie present devant le Capel. Il ne modifie pas les attributions Discord. La selection est conservee en memoire jusqu’au redemarrage ou jusqu’au 10 octobre 2026 a 00 h, heure de Paris (9 octobre, 22 h UTC). Le serveur et le menu refusent toute nouvelle selection apres cette heure.

Sieg vole sur toutes les maps : ZQSD ou WASD selon le clavier choisi, avec une avance dans la direction de la camera. Clic droit maintenu : orientation horizontale et verticale. Espace monte, Ctrl descend. Sur mobile, le joystick suit aussi la direction du regard ; le geste de camera a deux doigts permet de regler son inclinaison.

La camera de Sieg est en perspective, avec protection contre le sol et les obstacles. Les autres personnages gardent leur camera habituelle. Le sprite natif anime ses ailes en vol et fait face a la camera ; les autres joueurs voient son altitude interpolee.

`activity/flight.cjs` partage les limites, la vitesse et les collisions entre client et serveur. Le serveur valide la distance parcourue en 3D et chaque segment des traces. Les murs et plafonds bloquent le vol, avec glissement le long des surfaces. Un changement depuis Sieg replace le personnage sur une case au sol accessible. Les deguisements de Prop Hunt et les phases immobiles ne permettent pas de voler.
