<?php
// Relais vers le bot Capel : l'activite ne peut appeler que des fichiers reels
// sous le dossier du mapping, donc /api/... passe par ici (?r=token|state).
$routes = [
    'token' => '/api/token',
    'state' => '/api/state',
    'profile' => '/api/profile',
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
$requete = curl_init('http://127.0.0.1:3000' . $routes[$route]);
curl_setopt_array($requete, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => ($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST',
    CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Authorization: ' . $authorization],
    CURLOPT_POSTFIELDS => $corps === false || $corps === '' ? null : $corps,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 30,
]);

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
