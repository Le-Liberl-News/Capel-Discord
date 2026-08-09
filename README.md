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
