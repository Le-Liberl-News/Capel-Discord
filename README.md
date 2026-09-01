# Capel-Discord

## Table de la mission quotidienne

La mission « une traduction par jour » utilise par défaut la table Sky the 3rd
(`1JZm08gB7IdSR9cvdPCQ0G2t9ymI8nF45RwMQ0d7wWjY`, onglet repère
`gid=824641947`).
Ces deux valeurs peuvent être remplacées avec `DAILY_TABLE_ID` et
`DAILY_TABLE_GID`. La table SC historique reste utilisée par les commandes de
consultation/correction et par les rapports.

Tous les onglets visibles sont découverts automatiquement, mais seuls ceux dont
le header contient exactement, de B à K, `DESCRIPTION`, `STATUT`, `TRADUCTEURS`,
`RELECTEURS`, `SHEET DRIVE`, `BULLES TRADUITES`, `BULLES TOTALES`, `COMPLÉTION`,
`RELECTURE`, `VALIDATION` sont parcourus. Le header peut se trouver à n'importe
quelle ligne. Le nom reste lu en A et le lien Google Sheet en F. Seules les
lignes au statut `Non commencée` sont candidates. Le compte de service de
`credentials.json` doit avoir accès à la table et aux feuilles liées.

## Entrée des signalements en jeu

Les signalements de la DLL peuvent transiter par un webhook Discord entrant, sans exposer
de route HTTP publique :

1. créer un salon texte privé dédié, par exemple `#capel-ingress` ;
2. autoriser Capel à voir le salon, lire son historique, joindre des fichiers, réagir et
   supprimer des messages ;
3. créer un webhook entrant dans ce salon ;
4. ajouter au `.env` du serveur :

```dotenv
DEBUG_INGRESS_CHANNEL_ID=identifiant_du_salon
DEBUG_INGRESS_WEBHOOK_ID=identifiant_du_webhook
```

L'identifiant du webhook est le nombre situé immédiatement après `/api/webhooks/` dans
son URL. L'URL complète, qui contient un secret, ne doit pas être ajoutée au dépôt : elle
est configurée dans le `reporter_config.txt` livré avec la DLL.

Chaque message accepté doit provenir exactement de ce salon et de ce webhook, et contenir
les pièces jointes `report.json` et `capture.png`. Au démarrage, Capel reprend également
les messages restés dans le salon pendant une indisponibilité. La route historique
`POST /debug-screen` reste disponible pendant la migration et utilise le même service de
publication final.

### Écriture Sheets depuis le jeu

La DLL écrit désormais directement dans Google Sheets et vérifie la cellule relue. Après
réussite, elle envoie uniquement un journal distinct du signalement : marqueur
`LIBERLNEWS_SHEET_AUDIT_V1` et pièce jointe `sheet-audit.json`. Aucune capture d'écran et
aucun rapport de bug ne sont produits pour cette commande.

Capel ne modifie aucune cellule pour ce nouveau protocole. Il publie seulement un court
message contenant l'auteur, le script, l'ancien texte et le nouveau texte. Le protocole
`LIBERLNEWS_SHEET_UPDATE_V1` reste accepté temporairement pour les anciennes DLL.

Cette fonction est immédiate et ne demande pas de validation Discord. L'URL du webhook
doit donc être traitée comme un secret donnant indirectement un droit d'écriture sur les
feuilles de traduction. Sa révocation s'effectue en régénérant ou supprimant le webhook
Discord.

## Bouton de publication PatchSC

Capel peut maintenir un panneau persistant permettant à tout membre ayant accès au salon
de lancer la chaîne de publication PatchSC. Le bouton déclenche
`nightly-translation.yml` avec `publish=true` : récupération Drive, réinjection et
vérifications, incrémentation de version, puis construction de la release.

Ajouter au `.env` du serveur :

```dotenv
PATCH_RELEASE_CHANNEL_ID=identifiant_du_salon
PATCHSC_GITHUB_TOKEN=token_finement_scopé
```

Le secret Actions `DISCORD_WEBHOOK_URL` de PatchSC doit viser ce même salon. Après
chaque notification envoyée par ce webhook, Capel replace automatiquement le panneau
et son bouton en dernier message.

Le token doit avoir accès au dépôt privé `Le-Liberl-News/PatchSC`, avec
`Actions: Read and write` et `Contents: Read`. Il ne doit jamais être placé dans le dépôt.
Si une publication est déjà active sur GitHub, Capel refuse une
nouvelle demande. Le verrou est donc conservé même après un redémarrage du bot. Le
panneau est désactivé pendant le traitement et le salon reçoit le lien de la release,
le lien de l'action en échec, ou l'indication qu'aucun changement n'était à publier.
