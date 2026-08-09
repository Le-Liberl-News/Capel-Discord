# Capel-Discord

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
