<?php
// Relais vers le bot Capel : l'activite ne peut appeler que des fichiers reels
// sous le dossier du mapping, donc /api/... passe par ici (?r=token|state).
$routes = [
    'token' => '/api/token',
    'siege/status' => '/api/siege/status',
    'siege/entered' => '/api/siege/entered',
    'siege/session' => '/api/siege/session',
    'siege/catalogue' => '/api/siege/catalogue',
    'siege/navigation' => '/api/siege/navigation',
    'siege/state' => '/api/siege/state',
    'siege/music' => '/api/siege/music',
    'siege/arena' => '/api/siege/arena',
    'siege/admin-stop' => '/api/siege/admin-stop',
    'siege/timings' => '/api/siege/timings',
    'siege/finale' => '/api/siege/finale',

    'state' => '/api/state',
    'profile' => '/api/profile',
    'terminal' => '/api/terminal',
    'craft-capture' => '/api/craft-capture',
    // the duel against a Discord member: the menu's picker, the challenge, each choice of character or stage
    'solo/players' => '/api/solo/players',
    'solo/challenge' => '/api/solo/challenge',
    'solo/pick' => '/api/solo/pick',
];

$route = $_GET['r'] ?? '';
if (!isset($routes[$route])) {
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode(['erreur' => 'route inconnue']);
    exit;
}

header('Cache-Control: no-store, must-revalidate');
$authorization = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
if ($authorization === '' && function_exists('getallheaders')) {
    foreach (getallheaders() as $name => $value) {
        if (strcasecmp($name, 'Authorization') === 0) $authorization = $value;
    }
}
$corps = file_get_contents('php://input');
// Training configuration is a distinct authenticated GET on the terminal route.
$query = ($route === 'terminal' && ($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'GET' && ($_GET['training'] ?? '') === '1') ? '?training=1' : '';
if ($route === 'siege/finale' && isset($_GET['i'])) $query = '?i=' . intval($_GET['i']);
if ($route === 'siege/navigation') $query = '?layer=' . (($_GET['layer'] ?? '') === 'roof' ? 'roof' : 'ground');
$requete = curl_init('http://127.0.0.1:3000' . $routes[$route] . $query);
curl_setopt_array($requete, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => ($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST',
    CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Authorization: ' . $authorization],
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 30,
]);

// CURLOPT_POSTFIELDS switches cURL to POST, even when its value is null.
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    curl_setopt($requete, CURLOPT_POSTFIELDS, $corps === false ? '' : $corps);
}

$reponse = curl_exec($requete);
$code = curl_getinfo($requete, CURLINFO_HTTP_CODE);
curl_close($requete);

header('Content-Type: application/json');
if ($reponse === false) {
    http_response_code(502);
    echo json_encode(['erreur' => 'bot injoignable sur 127.0.0.1:3000']);
    exit;
}
json_decode($reponse);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(502);
    echo json_encode(['erreur' => 'Serveur temporairement indisponible. Reconnexion en cours.']);
    exit;
}
http_response_code($code ?: 502);
echo $reponse;
