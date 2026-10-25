# Instructions de travail

## Diagnostic mémoire permanent

Le diagnostic fait partie du fonctionnement du bot, pas d'une session de développement :

- Conserver l'installation automatique de `utils/runtimeDiagnostics.js` au début de `index.js`, le middleware HTTP et le processus indépendant `LN-Watch` dans le déploiement.
- Utiliser les mécanismes standard Node pour les sous-processus, workers, timers et événements. Les origines sont collectées automatiquement ; ne pas remplacer cela par une liste de labels à maintenir à la main.
- Pour toute nouvelle tâche coûteuse, vérifier que son origine fichier/ligne et ses processus enfants apparaissent dans le diagnostic. Compléter les hooks génériques si un nouveau mécanisme les contourne.
- Garder les relevés et leurs historiques bornés ; ne jamais enregistrer de secrets, messages, arguments de commandes ou dumps complets en production.
- Distinguer une hausse du compteur OOM (confirmée) d'une attribution à une tâche concurrente (hypothèse). Ne pas promettre une certitude que les données ne donnent pas.
- Lire `tools/diagnostics/README.md` pour l'installation, les limites et les tests. Les tests CI protègent l'installation automatique.
