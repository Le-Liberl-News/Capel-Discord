<?php
header('Cache-Control: no-store, must-revalidate');
$clientId = '917045604444684368';
?>
<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Antérose · Capel</title><style>
:root{color-scheme:dark}html,body{margin:0;height:100%;overflow:hidden;background:#201b18}canvas{display:block;width:100vw;height:100vh;touch-action:none}#hud{position:fixed;top:16px;left:16px;max-width:360px;padding:12px 16px;border:1px solid #b49760;border-radius:6px;background:#2d211bee;color:#f3dfb4;font:14px/1.5 system-ui;box-shadow:0 4px 20px #0006}h1{font:600 19px Georgia;margin:0 0 4px}#bandeau{white-space:pre-line}#aide{position:fixed;bottom:16px;left:16px;padding:8px 12px;border-radius:4px;background:#201b18dd;color:#e8d5ad;font:12px system-ui}
</style></head><body><canvas id="scene"></canvas><aside id="hud"><h1>Restaurant Antérose</h1><div id="bandeau">Chargement…</div></aside><div id="aide">Clic : se déplacer · ZQSD / flèches : courir · Clic droit glissé / E / R : caméra · Molette : zoom</div><script>window.__CLIENT_ID__=<?= json_encode($clientId) ?>;window.__API_BASE__=new URLSearchParams(location.search).has('frame_id')?'/.proxy/api.php':'./api.php';</script><script type="module" src="./bundle.js?v=<?= (int) @filemtime(__DIR__ . '/bundle.js') ?>"></script></body></html>