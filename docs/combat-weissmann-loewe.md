Weissmann — Another Dimension

AS 26 référence ms04550c, sc001_25 et ms04550b. mp007_01 est chargé mais aucun lancement de cet effet n’apparaît dans les instructions accessibles de cette séquence. La version jouable capture les adversaires dans un cercle de rayon 2,25 m au clic, inflige 5 dégâts toutes les 0,5 s (quatre fois), puis 110 dégâts à 2,6 s. Il incante deux secondes puis joue les poses de CH04552. La projection verticale dure 0,8 s et revient au point de départ. Annulation sûre si le lanceur meurt, part ou est interrompu ; alliés de la tour et spectateurs protégés.

Loewe — Onde du Lion

CH04549 contient 33 images : les numéros de l’atelier sont comptés à partir de 1. La préparation joue 22–33 ; le maintien alterne 32/33 pendant deux secondes. L’impact arrive sur la pose de l’épée plantée, à 585 ms. Rayon 6 m, dégâts 60, stun et pose au sol 2,5 s, avec une rotation visuelle de 450 ms au renversement. Les effets sélectionnés sont cr04150, sc053_07, sc008_00, sc006_17 (SC), puis cr163_01 (Third) sur les cibles. La recoloration garde les parties blanches et transforme les parties colorées en bleu sombre ; pour cr163_01, seules les parties violettes sont recolorées.

Le moteur et l’atelier reconstruisent maintenant les anneaux (primitive 9) et les faisceaux croisés (primitive 7), notamment ceux de Third/mgfire50. Les effets jouables sont précalculés en atlas afin d’éviter de recalculer l’animation native à chaque frame.

Correction du rendu : les deux crafts utilisent les assemblages natifs en volume avec fusion normale, pas les atlas aplatis en additive. Le cast de Weissmann utilise cr04150 recoloré rouge sang ; sa zone comporte mgfire50 et le modèle ms04550 (texture de visages, animation squelettique native), même sans cible. Le modèle est adapté au rayon de la zone, avec faces agrandies par répétition UV 0,2 et contour circulaire adouci. Les parties du modèle qui descendent sont maintenues juste au-dessus du terrain pour éviter les coupures. Le sprite CH04549 conserve 0,02 unité par pixel comme les autres banques ; ses cylindres de nova suivent réellement le plan du sol.
