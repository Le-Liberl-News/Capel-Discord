# Activité Discord — carte isométrique

Petite carte isométrique partagée : chaque participant est un cube rouge, on se
déplace au clic, les positions passent par le bot et sont visibles par tous.

## Contenu

| Fichier | Rôle |
| --- | --- |
| `main.js` | Source du client (canvas, SDK Discord, PKCE). Source de vérité. |
| `index.html` | Page servie par le bot (`GET /`). |
| `bundle.js` | Build de `main.js` (esbuild), commité car il est servi tel quel. |
| `deploy/index.php` | Entrée de la version hébergée sur le site (injecte l'identifiant). |
| `deploy/api.php` | Relais `?r=token` / `?r=state` vers le bot en `127.0.0.1:3000`. |

## Build

Depuis `E:\dev\discord-activity-demo` (où esbuild est installé) :

```
npm.cmd run build
copy /y client\bundle.js ..\Capel-Discord\activity\bundle.js
```

Le serveur du bot remplace `__CLIENT_ID__` par `DISCORD_CLIENT_ID` (sinon
`CLIENT_ID`) au moment de servir le fichier ; la version FTP, elle, reçoit
l'identifiant depuis `index.php` (`window.__CLIENT_ID__`).

## Piège vérifié

Le domaine de l'iframe est `https://<application_id>.discordsays.com`. Si
l'identifiant utilisé par le client ne correspond pas à cette application,
Discord ne répond jamais à la poignée de main : `sdk.ready()` reste en attente.
Le bandeau affiche l'identifiant employé et les messages reçus, ce qui permet de
comparer les deux.

## Déploiement hébergé (site, accès FTP)

Envoyer `deploy/index.php`, `deploy/api.php` et `bundle.js` dans un dossier
`activite/` à la racine du site, puis déclarer le mapping d'URL
`PREFIX /` → `TARGET <domaine>/activite`.

- Le relais PHP a besoin du bot à l'écoute sur `127.0.0.1:3000`.
- `header('Cache-Control: no-store')` et le suffixe `?v=N` évitent de servir un
  ancien bundle (source de plusieurs heures perdues).
