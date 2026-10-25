# Diagnostic mémoire du bot

Le démarrage `index.js` installe automatiquement `utils/runtimeDiagnostics.js` avant les autres imports.
Ne pas supprimer ce démarrage ni celui de `LN-Watch` dans le déploiement. Les tests CI vérifient leur présence.

## Garantie et limites

- `LN-Watch` est un processus Python indépendant de `LN-Bot`, de Discord et de MySQL. Il lit `/proc` et les cgroups toutes les 2 secondes. Il ne dépend pas du bon fonctionnement de la boucle Node.
- Il conserve la mémoire du groupe, sa limite effective (y compris un groupe parent), son pic, son swap, les compteurs OOM, les processus du compte Unix, leurs PID/parents et RSS, et le disque libre.
- Les `oom_kill` supplémentaires sont des **faits noyau** ; ils ne disent pas quel PID a été tué. Le processus le plus gros ou la dernière tâche n'est pas une preuve à lui seul.
- Le bot relève automatiquement les origines des timers, événements Discord, requêtes HTTP, sous-processus et workers. Les points d'entrée nouveaux passent par ces mécanismes sans liste de labels à maintenir. Un échantillonnage du tas JavaScript (1 échantillon/Mio d'allocations, relevé toutes les 30 s) fournit des fichiers/lignes pour les allocations retenues.
- Les variations RSS et les pics associés aux tâches incluent les tâches concurrentes. Les allocations natives Canvas ne sont pas attribuées par le profileur JS. Leur hausse reste visible dans RSS/externe et les tâches entourant le pic.
- Un pic de moins de 2 secondes peut échapper aux relevés ; le compteur et le pic mémoire du noyau complètent ces observations. Un gel synchrone bloque les heartbeats Node, mais pas le surveillant Python. Le dernier début de tâche écrit reste consultable.
- Pas de heap dump, pas de Chromium, pas d'arguments de sous-processus, de corps de messages, de requêtes SQL, de jetons ou d'environnement enregistrés.

## Mise en service

Le déploiement du bot installe automatiquement `LN-Watch` sous PM2, avec redémarrage indépendant et seuil de redémarrage du surveillant à 64 Mio. Le bot conserve sa configuration PM2 actuelle.

```bash
pm2 status
cat /home/twnkek290001/LN-Bot/.runtime/diagnostics/access.key
```

Accès normal : Gestion des comptes → « Ouvrir le diagnostic du bot ». Le compte administrateur autorise cet appareil pendant 90 jours, sans clé à saisir. Le diagnostic reste ensuite accessible directement. La clé SSH ci-dessus sert seulement au secours (formulaire replié) ; ne pas la coller dans le chat ni dans une URL. La page n'utilise pas MySQL et n'offre aucune commande d'arrêt/redémarrage. Le bot peut être arrêté sans perdre l'accès aux relevés. Si l'hébergement/PHP tombe complètement, la page aussi sera indisponible jusqu'à son retour.

Le site PHP doit pouvoir lire ce dossier privé sous le même compte Unix. Par défaut il lit `/home/twnkek290001/LN-Bot/.runtime/diagnostics`. Si le chemin diffère dans le jail PHP, régler `LN_DIAGNOSTICS_DIR` dans la configuration PHP vers le chemin accessible équivalent, sans copier la clé ou les relevés dans un dossier public. Une restriction `open_basedir` nécessite d'autoriser ce chemin côté hébergeur.

Pour démarrer manuellement le surveillant sans redémarrer le bot :

```bash
cd /home/twnkek290001/LN-Bot
pm2 start tools/diagnostics/watch.py --name LN-Watch --interpreter python3 --max-memory-restart 64M --restart-delay 5000
pm2 save
```

Vérifier avant qu'il n'existe pas déjà (`pm2 describe LN-Watch`). Un verrou empêche deux instances de collecter simultanément. Le dossier et les fichiers ont des permissions privées. Pour révoquer toutes les sessions de la page, remplacer `access.key` par une nouvelle clé aléatoire privée.

## Lecture après panne

Sur la page, déplier l'incident OOM, puis les relevés avant l'arrêt : RAM du groupe / limite, processus, PID parent et tâches avec code source. Comparer tas JS, externe, RSS. Une hausse de tas et une allocation échantillonnée remontent au fichier/ligne ; une hausse native avec lancement de sous-processus remonte au PID et à la pile du lancement. En cas de tâches concurrentes, conserver le diagnostic comme une hypothèse et isoler le suspect pour le confirmer.

`summary.json` est remplacé atomiquement. Les incidents contiennent leurs dernières 24 secondes détaillées et survivent au redémarrage du surveillant. La courbe garde 1 440 pics par minute. Le journal brut fait au plus deux fichiers d'environ 16 Mio. Les traces Node sont bornées, les anciennes disparaissent après 24 h. Aucun événement ne peut faire grossir un historique sans limite.

## Développement et pérennité

Les hooks sont génériques. Ne pas contourner `child_process`, `worker_threads`, les timers Node et les événements Discord avec des renderers natifs opaques sans ajouter de preuve diagnostique adaptée. Les autres GIF restent désactivés. Sur demande de l’utilisateur, seule la distribution des cartes est réactivée via `utils/mediaRender.js` : tampon indexé réutilisé, une génération active et une en attente, sortie limitée à 1 Mio, marge mémoire du cgroup de 96 Mio et hausse RSS limitée à 32 Mio. Un budget dépassé déclenche une image PNG de la table finale si au moins 32 Mio de marge restent disponibles ; sinon le texte seul est envoyé. Ce repli reste dans la même file séquentielle et son origine est suivie automatiquement. Le suivi automatique des tâches inclut cette file sans label de fonction à maintenir. Les médias non acquittés par la plateforme sont bornés à 4 Mio / 24 fichiers.

Tests :

```bash
node --test tests/runtime-diagnostics.test.cjs
python3 -m unittest discover -s tools/diagnostics -p 'test_*.py'
```

Le site vérifie séparément l'authentification, la lecture sans DB et la révocation de clé avec `python3 tests/test_diagnostics_http.py`.

La commande `node tools/check-adventure-media.cjs` mesure quatre distributions complètes dans un processus de test séparé et enregistre le pic RSS dans `.runtime/adventure-media-memory.json`. Elle est également exécutée en CI. À lancer hors du processus du bot ; les autres animations de pomification restent désactivées.
