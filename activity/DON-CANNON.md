# Don : canon FPS et marteau

Le canon noir et or vient de la banque native as00290. Le HUD disparaît pendant l’introduction et le craft. Le projectile réutilise effalp0 de Third, sans revendication de provenance FC.

Le tir part après 140 ms, à 22 m/s avec une impulsion verticale de 3,5 m/s et une gravité de 14 m/s². Le trajet est balayé contre le décor et les personnages par pas de 1/60 s. Le sol est interrogé depuis le haut du segment pour ne pas ignorer un plan fin. Les collisions distinguent le centre du projectile et le point exact de la surface : l’explosion normale est placée sur cette surface sans décalage vertical ni déclenchement anticipé. Elle inflige 32 dégâts dans un rayon de 3 m avec occlusion et protection des alliés.

Le recul physique atteint 1,3 m en 220 ms selon le sol et les obstacles. Le viseur reçoit une impulsion verticale de 0,3 rad (1,5 fois l’initiale) et jusqu’à 0,08 rad horizontalement. Une vibration amortie de 320 ms affecte seulement la caméra rendue. Le délai entre tirs est de 1,5 s. Le son d’explosion tolère une confirmation tardive jusqu’à 1,5 s.

Le craft dure 2,25 s : départ du saut à 220 ms, montée parabolique de 2,7 m jusqu’à 910 ms, descente renforcée sur 340 ms et retombée à 1,25 s, puis pose abaissée maintenue. Aucun palier au sommet. L’impact est au sol 2,1 m devant Don, rayon 4,5 m, 48 dégâts et 2,4 s de stun sur les ennemis effectivement blessés. La caméra reste derrière lui pendant la retombée.

Le craft utilise une feuille arrière dédiée, composée au chargement à partir du corps natif sans canon, des découpes de bras natifs et du canon séparé. Celui-ci tourne pendant la montée et la chute, reste devant le corps au sommet puis passe derrière dès la phase de chute rapide (1 020 ms) ; le corps et les pieds conservent leur ancrage. Cette pose est pour l’instant une vue arrière unique, y compris pour les observateurs. Les animations habituelles gardent leurs huit directions. Le cache de métadonnées reste propre à la scène pour ne pas altérer les banques natives partagées.

Effets : SC/sc000_10._ef au départ, SC/msc0640._ef à l’impact du boulet et SC/sc006_17._ef pour le marteau. Sons : ed6se487 (SC), ed6se585 (FC), ed6se602 (FC). Les personnages étourdis affichent SC/paralyze._ef comme Olivier dans l’Antérose.

Extraction : tools/export-don.py et tools/export-sounds.py. Vérification : tests/activity-don.test.cjs et contrôle du FPS, du saut et du marteau dans la scène réelle.
