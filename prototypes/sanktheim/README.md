## Mise à jour de présentation et de synchronisation

Entrée MP directe conservée jusqu’à confirmation du chargement ; initialisation du mode unique. Déplacements avec temps réel par requête, crédit conservé et séquences anti-relecture, à la manière du jeu normal. Interface repliée par défaut, saisie RP compacte, options dans l’engrenage, saut tactile uniquement. Défenses à 2 500 000 PV ; migration proportionnelle de la sauvegarde.

Les préavis portent le bouton de participation. Bilans sans liste des indemnes, portrait du MVP et séries personnelles tous les cinq poms sans mourir. GIFs de destruction pré-calculés depuis le modèle natif ; GIFs d’alerte sous 10 % et de décès avec sprites et PV réels, encodés dans un worker pour laisser tourner la simulation. Nouvelle alerte critique après récupération à 15 %.

# Défense de Sanktheim — intégration publiée

`production.cjs` branche le mode sur les sessions authentifiées du Capel et le personnage du jour, avec lecture seule de la contamination réelle. Les annonces RP sont envoyées par `discord.cjs`, conservées et dédupliquées après redémarrage. Le siège progresse sans onglet connecté. Les PV des soldats sont divisés par deux et les sauvegardes existantes migrent une seule fois. État de production séparé : `.runtime/sanktheim-live/`. Aucun bouton ni API de test en production ; arrêt réservé au propriétaire de l’événement.

Le client et toutes les ressources sont publiés via le pipeline normal du bot et du site. Le menu Capel et le bouton envoyé dans le salon RP permettent de rejoindre. `server.cjs` reste un aperçu local indépendant, sans messages Discord. Les notes ci-dessous retracent la maquette et peuvent décrire des valeurs anciennes ; les constantes de `core.cjs` sont la référence.

---

# Défense de Sanktheim — maquette locale non publiée

Lancer `node prototypes/sanktheim/server.cjs` depuis le dépôt, puis ouvrir http://127.0.0.1:3064. L’aperçu de destruction seule reste à http://127.0.0.1:3063/sanktheim-destruction/index.html.

Aucune connexion Discord et aucune modification des routes de production. Le message introductif, les avertissements, les seuils et les morts sont conservés dans une boîte d’envoi persistante (`/api/outbox`), sans les envoyer. L’interface locale montre la prévisualisation du message et son bouton. Le bouton d’arrêt de cette interface contrôle seulement cette simulation locale, liée à 127.0.0.1. `ownerControls` refuse tout autre identifiant que le propriétaire configuré pour une future intégration Discord.

## Simulation

- Serveur indépendant de l’onglet, sauvegarde atomique dans `.runtime/sanktheim-preview/`. Reprise et rattrapage temporel après redémarrage. Les joueurs déconnectés ne défendent pas indéfiniment.
- Cinq défenses indépendantes : deux murailles, deux tours, porte en bois ajoutée sous l’arche native. Quatre niveaux de dégradation après l’état intact. Le dernier ouvre le passage au niveau du sol. Un plancher texturé FC est ajouté derrière la façade.
- Brèche = le siège continue. Les corps des défenseurs peuvent bloquer le trajet des poms terrestres ; les attaquants cherchent alors à les combattre. Les volants doivent être abattus à distance. Le siège ne s’arrête que manuellement.
- Compteur cumulatif `passés / engagés` : une arrivée est une unité ; une réapparition compte comme un nouvel engagement. Le même passage n’est compté qu’une fois par unité. Le nombre de contaminés distincts est affiché séparément.
- Vagues de cinq minutes, vers 10/13/16/19/22 h avec décalage persistant de ±15 min (première vague jamais avant 10 h). Chaque préavis survient exactement cinq minutes avant sa vague : « Des cris de pom-garous se font entendre loin vers la forêt de Mistwald. Une nouvelle attaque est imminente ! ». Aucun pom-garou n’est ajouté, son modèle reste à concevoir.
- Trêve de 23 h à 10 h, Europe/Paris, avec gestion du changement d’heure. Message nocturne une fois par date. La vague de test peut avancer l’horloge locale à midi ; l’interface signale alors explicitement HORLOGE DE TEST.
- Un mur est choisi pseudo-aléatoirement une fois au spawn. Les frappes d’un soldat ou d’un joueur reprennent l’aggro pendant 12 s. Le contact avec un défenseur bouchant une brèche provoque aussi le combat.
- Poms de 300/450/550 PV ; saut, morsure accrochée dix secondes, ralentissement à 55 % de vitesse, libération par coup allié. Daspi : vol bas et attaque à distance seulement. Réapparitions durant la vague.
- Huit soldats réellement présents dans FC/t3400._sn : Jules, Hector, Chesley, Wayne, Talbot, Dale, Wolpe, Olnis ; noms, index et sprites extraits dans garrison.json. Placement défensif adapté, soldats aux remparts et au sol, PV, tirs, dialogues, cadavres et petites traces de sang persistants.
- Déplacement ZQSD/WASD, saut, échelles E, tir de test. Skybox procédurale jour/nuit et torches nocturnes. Emplacements de tourelles inactifs, les armes restent à identifier.

## Contamination et équilibre

Par défaut : **10 personnages fictifs de test**, pas la liste réellement contaminée sur Discord. `SANKTHEIM_COHORT_FILE` peut désigner une copie locale de l’état de rhumertume (lecture seulement), ou une liste `{character,stage,kind}`. `cohortFromRhumertume` fournit également une lecture directe de l’instance existante pour un branchement futur ; aucune contamination n’est créée par ce mini-jeu. L’identification des personnages daspi doit être fournie par l’événement.

Le calibrage est figé dans balance.json au lancement. Les infections suivantes ajoutent de la pression au lieu de gonfler secrètement les PV des murs. La calibration actuelle est celle de la cohorte de test ; elle devra être recalculée à partir de la vraie cohorte lors de l’activation.

Chaque défense a 20 millions de PV. La borne conservatrice suppose tous les attaquants au stade trois, tous sur un mur, sans déplacement, interruption ni riposte, un coup toutes les deux secondes : après dix vagues intégrales (deux journées), il reste 2 % de PV. L’évolution seule ne dépasse donc pas cette borne ; de nouveaux contaminés peuvent accroître la pression. Le moteur accepte au plus 64 poms simultanés ; au-delà, les identités tournent lors des renforts.

Les PV des soldats sont obtenus par une simulation de deux vagues avec la cohorte de départ concentrée sur Jules, sans joueur mais avec les tirs de la garnison : PV = dégâts première vague + moitié des dégâts deuxième vague. Test de référence à dix contaminés : 21 715 PV ; survie à la première vague et mort pendant la deuxième. L’aggro et le body blocking sont appliqués par le serveur, pas décidés par le navigateur.

## Validation et limites avant activation

`node --test prototypes/sanktheim/core.test.cjs` vérifie persistance, absence des clients, morsure/secours, calendrier Paris et changement d’heure, préavis sans doublons, aggro, brèches traversables et compteur, arrêt réservé au propriétaire et les bornes d’équilibrage.

La maquette utilise désormais le moteur natif de l’arène : déplacements, FPS selon le personnage, attaques et crafts. Le personnage provient du résolveur serveur ; l’aperçu local utilise Julia faute de session Discord authentifiée. La connexion à l’attribution quotidienne réelle reste à brancher. La navigation est simplifiée autour du parvis, des échelles et du passage ; elle doit être finalisée avec les collisions complètes de la carte avant mise en service. Les corps et gravats ne possèdent pas de rigid bodies : les pierres utilisent une trajectoire balistique et des rebonds amortis, puis se stabilisent sur le terrain. Les tranches des brèches restent volontairement anguleuses. Les dialogues de siège sont nouveaux, les noms et sprites sont natifs.

À terminer avant publication : navigation complète sur tous les remparts, commandes mobiles, connexion autorisée au salon RP et à la session Discord, reprise durable des envois avec déduplication côté Discord, choix des tourelles, essais multijoueurs et mobiles. Ne pas déployer ce dossier tel quel.

## Pom-garou et participants

Variante possible au stade 3 (25 % au passage de stade, tirage sauvegardé avant annonce ; les anciennes évolutions déjà annoncées restent inchangées). 84 sprites avec les masques et réglages de cheveux existants, générés par `E:/dev/_pom/garou_build.py` depuis `pom_garou.png`. Ressources locales dans `activity/assets/sky/chat/pom/` ; elles devront accompagner une publication ultérieure du bot et du site.

Au siège : 750 PV, cleave frontal de 120 degrés sur 3,6 m, 48 dégâts aux défenseurs, réutilisant le slash natif de Mueller `SC/cr130_02._ef`. Pas de morsure accrochée pour cette variante. Les dégâts aux murs restent ceux du stade 3 afin de respecter la borne de deux journées. Le bilan garde les noms des personnages participants, même sans dégâts ou après déconnexion. Admission des contaminés interdite côté serveur et revérifiée à chaque mise à jour.

## Accès et reprise de l’aperçu

Le bouton « Réinitialiser : murs intacts » répare les cinq défenses, réanime la garnison et réouvre le test après un arrêt manuel. L’état précédent est archivé localement avant remise à zéro. « Déclencher une vague test » lance ensuite un assaut sans brèche imposée.

La navigation native échantillonne les sols du modèle et vérifie les déplacements contre ses triangles, côté serveur et côté client ; la bande invisible devant la façade est supprimée. Deux échelles inclinées partagent leurs coordonnées entre rendu et simulation : pied (-5,0,±11), sommet (-17,11.8,±11), montée/descente joueur 4,2 s via le bouton Échelle à proximité. Une partie des poms terrestres tente une montée de 22 s, puis vise les défenseurs sur la muraille. Le cadrage orthographique local est reculé (5,2 contre 3,826 dans l’arène) ; la vue FPS garde son cadrage natif.


## Garnison et présentation

Les gardes utilisent désormais les véritables planches FC CH00320/321/322/324 (soldat de l’armée royale, AS00320) pour attente, course, tir et mort. Les noms restent ceux du script de Sanktheim. Les trois gardes déployés poursuivent le pom le plus proche et tirent à courte portée ; un tir inflige 85 dégâts toutes les 950 ms dans la simulation native. Les tirs montrent animation, flash et impact Sky. La garnison aide aussi à débarrasser les alliés des poms accrochés.

La morsure transmet maintenant `catCling` au moteur d’arène pour suivre exactement le porteur à chaque image. Les morts laissent un corps distinct de l’unité réapparue et du sang au sol (500 corps récents maximum, sauvegardés jusqu’à réinitialisation). Les dialogues dépendent de la préparation, de l’assaut ou de l’accalmie.

Échelles : arrivée automatique au pied, parcours continu en animation de marche/course passant par le rebord extérieur (-12.55,13.7,±11), puis le dessus du parapet (-14.85,13.7,±11) puis la plateforme (-15.2,11.75,±11). Même trajet partagé par joueurs, poms et garnison. Pas de bouton Échelle. Une sortie de la zone d’arrivée est requise avant de reprendre l’échelle dans l’autre sens.

Le passe de transparence est limité au seul joueur local. Les autres acteurs, échelles, corps et flammes gardent le test de profondeur normal. Les flammes sont des sprites animés issus de MGFire3 natif de Sky, sans poteaux ou coupes construits en 3D. Les lumières ponctuelles restent dynamiques.

Musique : bascule automatique vague/accalmie prête dans `music.json`, avec reprise après interaction pour les navigateurs bloquant l’autoplay. Les deux références musicales n’ont pas été fournies dans la demande ; les pistes sont donc encore vides.


## Révision de l’échelle, des sauts et du bilan

La carte est affichée et collisionnée à 2/3 de sa taille d’origine, sans réduire les sprites. Le serveur garde les coordonnées de la source pour la simulation persistante ; le pont de combat convertit synchroniquement en mètres du monde et restaure les coordonnées natives après chaque opération. Géométrie, échelles, spawns, gardes, brèches et corps partagent la conversion. La navigation couvre maintenant les limites du modèle ; les surfaces proches du joueur sont résolues à sa hauteur, sans forcer un étage prédéfini.

Les sauts du siège utilisent une trajectoire balistique calculée sur les triangles réels, partagée par prédiction et autorité. Une collision latérale arrête/glisse le mouvement horizontal et poursuit la chute ; aucun retour automatique au point de départ. On peut tomber des remparts ou atterrir sur un toit inférieur, avec une hauteur de saut normale de 1,6 m environ.

Les soldats endormis ont un sprite couché au-dessus du sol, à l’échelle native, au lieu d’une rotation de leur plan vertical qui les enfouissait dans la pierre. Les points de flamme sur les deux supports hauts du modèle proviennent de leurs sommets mesurés : (-19.200029,16.28919,-10) et (-27.00003,16.28919,-10). Les supports bas 2D utilisent l’atlas bois/métal original de Sanktheim. Le sang reprend les éclaboussures de `Third/mgblood.png`, l’atlas de la morsure d’Antoine.

Les corps disparaissent une heure après la fin de la dernière vague ; un nouvel assaut renouvelle ce délai à sa fin. Chaque participant figure au bilan avec son total d’éliminations et le pom le plus éliminé, y compris zéro élimination. Le moteur de combat signale les coups mortels afin que deux joueurs touchant ensemble une cible ne reçoivent pas la même élimination.

Les trois MP3 fournis sont lus localement depuis `music-sources.json`, avec streaming HTTP et requêtes Range : préparation durant les dix minutes précédant la vague, combat pendant la vague, Dawn of Arnenberg pendant les accalmies. Aucun MP3 n’est téléversé.

## Tourelles locales
Le Capel natif est placé sur la muraille (source -21.5, 11.75, 0). X ou le bouton de proximité ouvre le choix automatique/manuelle ; cliquer ensuite sur une surface visible et assez plane. Deux tourelles vivantes maximum et deux installations par jour civil de Paris, pour tous les joueurs et les deux types réunis. Détruire une tourelle ne rembourse pas une installation ; la réinitialisation locale remet aussi le quota à zéro. Les créneaux et les emplacements dont le canon est masqué vers le terrain des attaquants sont refusés. Le serveur valide la proximité du Capel, le support et les recouvrements.
Automatique : laser toutes les 1,6 s sur le pom visible le plus proche. Manuelle : interaction de proximité, caméra FPS et réticule, clic/F pour un tir large de 120 dégâts, dix munitions par installation ; X/Échap pour quitter. Les murs bloquent les lasers. Une seule personne peut contrôler chaque canon ; mort, déconnexion ou destruction libère le poste. Les tourelles ont 140 PV : vingt coups normaux de pom stade 1. Modèles mécaniques provisoires avec canon orientable, impact natif Sky, son et barre de vie. Les installations et munitions sont persistantes ; la réinitialisation locale les efface.
Les bâtiments ont désormais 5 millions de PV par section, avec migration au même pourcentage de solidité. Les dialogues contextuels sont espacés de 6,5 à 13,5 s minimum entre soldats, et de 30 à 85 s par soldat ; les cauchemars des dormeurs sont plus rares. Aucune publication Discord.

Les échelles des joueurs utilisent une progression contrôlée : maintenir une direction vers l’autre extrémité pour avancer, relâcher pour s’arrêter, maintenir la direction inverse pour reculer. Les entrées clavier et joystick sont transmises au serveur et expirent après 400 ms sans paquet. Les attaques natives restent possibles à l’arrêt, sans quitter le rail. Les poms IA conservent leur montée lente. La visée des tourelles manuelles couvre 360° horizontalement et presque ±90° verticalement. Les deux types de tourelles sont des cibles de proximité des poms.

## Renforts et retour des coups
Le Capel propose aussi dix barricades au maximum, posées sur la route extérieure et détruites en cinq coups. Le panneau permet de démonter les tourelles et barricades ; démonter une tourelle ne rembourse pas le quota du jour. Une caméra libre indépendante (déplacement, R/F en hauteur, clic droit pour regarder, molette) sert au placement ; validation ou Échap rend la caméra du personnage.
Les stades 3 pomdeter et funèbre utilisent leurs textures à cheveux distinctes et leurs échelles (1,35 et 1,25 m). La cohorte locale inclut Mueller pomdeter et Kloe funèbre. Le funèbre reste à environ 18 unités source du mur et lance une sphère 3D en cloche : traînée native Third/ms04671l comme le phénix de Cassius, impact SC/msc0640, cadence IA 7,5 s, 2,5 fois un coup stade 3 au mur, appliqué seulement à l’impact.
Les impacts aux murs ont un flash blanc masqué à la section, un effet natif et des nombres violets. Le délai normal d’un pom contrôlé est 667 ms ; le catapulte contrôlé tire toutes les 2,5 s. Les sauts sur gardes/défenseurs accrochent quatre secondes avec morsures et ralentissement ; un allié peut libérer la victime en frappant le pom. Les poms joueurs restent vivants et contrôlables entre les vagues, sous le feu des deux sentinelles de permanence.
Les déplacements partagent glissade de capsule et chute gravitaire : sortir d’un rebord n’exige plus de sauter, et un contact déjà derrière les pieds ne bloque plus la sortie. La caméra de Julia conserve la position du lancement de Trinity Kleis jusqu’au début de disparition de la première traînée, à la troisième ligne terminée, ou à la sortie du personnage du cadre ; retour en 350 ms.
Discord reste débranché dans ce prototype : la simulation continue sans visiteur, mais aucun message n’est envoyé. Les annonces restent dans l’outbox persistante (préavis, départ, seuils, morts de soldats, bilan sans MVP joueur, trêve).


## Essai local : projecteurs, mines et couvertures
Les trois accessoires natifs SC sont dans `activity/assets/sky/sanktheim/props/`. `t41spt03` contient quatre rigs ; une instance complète est conservée par projecteur. Deux projecteurs reposent sur la muraille, orientés vers la route extérieure : faisceau volumétrique doux et SpotLight, intensité liée au cycle nocturne. `t23bed01` est une couverture drapée en volume, affichée seulement sur les soldats couchés, vivants et hors vague.

Le Capel propose dix mines actives maximum, via la même caméra de placement libre que les tourelles. `t31orb00` fournit le modèle. Sol et limite sont validés côté serveur. Armement en 1,2 s ; un pom terrestre marchant à proximité déclenche une explosion. Les poms proches suivent une parabole de 1,6 s (sommet à 5 unités source), tournent et meurent au sol. Les défenseurs ne déclenchent pas les mines ; les dégâts et éliminations sont attribués au poseur. Mines et projections survivent dans l’état persistant. Les mines ne consomment pas le quota journalier des tourelles.

## Faisabilité de l’abattage des arbres
`python prototypes/sanktheim/tools/audit-trees.py` analyse la carte et écrit son rapport ainsi qu’un arbre témoin dans `.runtime/sanktheim-tree-audit/`, sans changer la carte. La texture de tronc `r01o0804.png` couvre 2 575 triangles répartis en 103 composantes connexes : 25 triangles par tronc, hauteurs de 5,26 ou 5,51 unités source. Les éléments de carte sont des morceaux spatiaux mêlant parfois terrain, bâtiments et végétation : supprimer un mesh entier supprimerait aussi autre chose que l’arbre.

Une extraction témoin regroupe un tronc de 25 triangles et 49 triangles de feuillage `t06o0005.png`, sans terrain. Le rattachement du feuillage par proximité est une preuve de faisabilité à vérifier sur tous les arbres, pas une segmentation parfaite garantie. Un système jouable devrait produire des identifiants stables, attribuer le feuillage à chaque tronc, séparer ces triangles du terrain, puis retirer leur collision serveur et client après abattage. La mécanique de bûcheronnage décrite ci-dessous utilise maintenant cette séparation.


## Bûcheronnage et réserve commune (activité et aperçu local)
`tools/export-forest.py` sépare les 103 arbres du terrain natif, en conservant textures, UV et normales. Les triangles de végétation qui ne peuvent pas être attribués restent dans le terrain : aucun sol n’est supprimé. Les fichiers de `activity/assets/sky/sanktheim/forest/` contiennent le terrain sans arbres et les 103 arbres indépendants. `forest.json` donne leurs pivots, rayons, identifiants et rendements.

Un défenseur vivant à proximité peut cliquer sur « Couper cet arbre » ou utiliser X. Une minute de travail serveur est nécessaire. Déplacement, blessure, attaque, saut, échelle, mort, déconnexion ou passage en pom interrompent la coupe ; le travail accompli sur l’arbre est conservé. Un seul bûcheron travaille sur un arbre à la fois. La chute dure environ deux secondes, laisse une souche et retire la collision du grand tronc. Le bois est crédité une seule fois, dans la réserve commune persistante, visible en petit dans le panneau Remparts.

Après la coupe, l’arbre repousse à 25 %, 50 %, 75 % et 100 % au bout de 1 h 30, 3 h, 4 h 30 et 6 h. Il est à nouveau exploitable à 6 h. Les horodatages serveur permettent de repousser même sans activité ouverte ; les collisions des troncs/souches sont identiques pour la prédiction et le serveur.

La forêt entière rapporte exactement 1 000 bois (73 arbres à 10, 30 arbres à 9). Répartition libre confirmée par le joueur : canon automatique ou manuel 300, barricade 30, mine 20. Le lot 2 canons + 10 barricades + 5 mines coûte donc exactement toute une récolte. Le coût est débité seulement après une installation valide ; un échec ou un double envoi ne dépense pas le bois deux fois. Démonter ne rembourse pas. Les limites existantes des canons restent en place, les barricades passent à dix actives, les mines restent limitées à dix actives. La réserve commence à zéro, sans détruire les installations déjà présentes dans une sauvegarde.


## Permanence pendant les accalmies (activité et aperçu local)
Deux gardes vivants sont postés côté assaut, devant la muraille, en dehors des vagues. Ils ne dorment pas et tirent à vue sur les poms contrôlés, avec vérification de la ligne de vue, pose de tir, projectile et son existants. Les autres gardes ne tirent pas pendant cette phase ; deux peuvent dormir sur les murs. Chaque fin de vague sélectionne deux autres gardes vivants, en priorité ceux qui ont assuré le moins de permanences. Les relèves utilisent les déplacements et échelles existants. Un décès est remplacé et le tour de garde est conservé à la sauvegarde.

La fin de vague ne tue plus les poms joueurs. Après une mort normale, ils peuvent réapparaître après le délai habituel, même pendant l’accalmie. Connexion, reconnexion et reset utilisent un spawn source explicite côté assaut (-48, 0.04, 0), quel que soit l’ancien emplacement sauvegardé ; les poms volants commencent à leur altitude de vol. Les coups et morsures restent utilisables hors vague, sans créer de statistiques de vague fictives.
