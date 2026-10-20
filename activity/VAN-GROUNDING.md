# Appuis de Van

Les banques 0 et 5 à 9 sont réexportées depuis le modèle de Van, avec la même forme chibi, tenue et animations. Pour ces clips stationnaires uniquement, les sommets des semelles sont identifiés par leur poids de skinning Foot/Toe ; la jambe dont la semelle est plus haute est descendue jusqu’au même plan que l’autre. Le décalage avant/arrière est conservé. La course et les attaques ordinaires ne changent pas.

Chaque cellule contient deux contacts de semelle dans le champ `footContacts`, en pixels par rapport à la cellule recadrée. Le jeu les transforme depuis le plan du sprite et les projette sur le sol suivant le rayon de vue, puis dessine une petite ombre de contact sous chaque pied. Cela conserve l’impression de profondeur du pied arrière au lieu de l’interpréter comme un pied suspendu. Les contacts sont masqués en saut, à la mort ou quand le sprite est caché ; les ressources sont partagées et libérées avec la scène.

Les sources et réglages utilisés sont enregistrés dans `assets/sky/combat/daybreak/van-grounding-source.json`. Le rig et l’exporteur locaux de l’atelier sont indiqués dans ce fichier.
