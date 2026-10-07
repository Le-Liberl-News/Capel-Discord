<?php
// Point d'entree de l'activite, servi par ta plateforme.
// Le mapping Discord pointe sur ce dossier : PREFIX / -> TARGET ton-domaine.fr/activite
header('Cache-Control: no-store, must-revalidate');
$clientId = '917045604444684368';
?>
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Capel — carte</title>
  <style>
    :root { color-scheme: dark; }
    html, body { margin: 0; height: 100%; overflow: hidden; background: #0e1216; }
    canvas { display: block; width: 100vw; height: 100vh; }
    #bandeau {
      position: fixed; top: 10px; left: 14px; font: 13px/1.4 system-ui, sans-serif;
      color: #8fa2b4; pointer-events: none; white-space: pre-line;
    }
  </style>
</head>
<body>
  <canvas id="scene"></canvas>
  <div id="bandeau">connexion…</div>
  <script>
    window.__CLIENT_ID__ = <?= json_encode($clientId) ?>;
    // api.php relaie vers le bot en local (127.0.0.1:3000).
    window.__API_BASE__ = '/.proxy/api.php';
  </script>
  <script type="module" src="./bundle.js?v=5"></script>
</body>
</html>
