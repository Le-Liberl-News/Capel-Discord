# Lynx — premier essai de pilotage

Le modèle natif FC `ED6_DT0A/E01SIP00._X2` représente le Lynx (Bobcat).
Une miniature près de l'entrée de l'Antérose sert à embarquer : clic droit,
« Piloter le Lynx », ou Espace à proximité. Le serveur vérifie la distance.

Le pilote apparaît sur la piste en pente de l'aérogare de Bose, dans la scène
unique des 45 extérieurs Bose–Rolent. « Décoller » met les gaz et aide à cabrer
pendant la course au sol. Le curseur Gaz reste réglable à tout moment.

- Flèches haut/bas ou Z/S (W/S en QWERTY) : cabrer/piquer.
- Flèches gauche/droite ou Q/D (A/D en QWERTY) : inclinaison et virage.
- Maj/Ctrl : augmenter/diminuer les gaz.
- Clic droit glissé : regarder autour du vaisseau.
- Mobile : curseur et quatre boutons directionnels.
- Retour piste : remettre le vaisseau au départ. Retour à l'Antérose : quitter.

La simulation fixe à 60 Hz conserve la vitesse quand on coupe les gaz, amortit
le dérapage, fait dépendre la portance de la vitesse et de l'inclinaison, et
permet un décrochage et un atterrissage doux. Un impact fort remet le vaisseau
sur sa piste. Elle est arcade : pas une simulation aéronautique.

Le serveur reçoit uniquement des commandes numérotées, jamais une position
faisant autorité. Il vérifie leur ordre et le temps disponible. Le client
prédit les mêmes pas de simulation puis rejoue les commandes non acquittées.
Les autres pilotes sont visibles dans le même espace, sous des identités
d'avatar anonymes. Chaque joueur pilote pour l'instant son propre Lynx ;
l'intérieur, les passagers et le partage d'un unique vaisseau viendront après.
Le chat garde la règle RP existante.

`build-airship-terrain.mjs` extrait un champ de hauteurs de deux unités depuis
les triangles du terrain original. `flight-ground.bin` (environ 1,7 Mo) est
partagé par client et serveur pour les contacts au sol. Il représente la
surface supérieure ; des détails fins et des parois verticales ne sont pas
des volumes de collision complets. Les raccords imparfaits du terrain restent
ceux du premier assemblage, sans modification des maps.

Reconstruction après un nouvel assemblage :
```
node activity/tools/build-airship-terrain.mjs
npm run activity:build
node --test tests/activity-airship.test.cjs
```
