<?php
// Código común del panel de administración.
// Lo cargan todos los archivos de api/admin/. No se abre desde el navegador (lo bloquea el .htaccess).

require __DIR__ . '/../eventos-db.php';

const MINUTOS_SESION = 120;   // la sesión caduca tras 2 horas sin usarla

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

// En local, la web (localhost:3000) y el PHP (localhost:8000) son direcciones distintas:
// se les permite hablar, enviando la cookie de sesión.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, config()['cors_origins'], true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Vary: Origin');
}
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Responde en JSON y termina
function responder(int $codigo, array $datos) {
    http_response_code($codigo);
    echo json_encode($datos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function exigirMetodo(string $metodo): void {
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== $metodo) {
        responder(405, ['error' => 'Método no permitido']);
    }
}

// Lee el cuerpo JSON de la petición (solo se aceptan peticiones en JSON)
function leerJson(): array {
    if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
        responder(415, ['error' => 'Formato no válido']);
    }
    $datos = json_decode(file_get_contents('php://input'), true);
    return is_array($datos) ? $datos : [];
}

function ipCliente(): string {
    return substr((string)($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45);
}

// Inicia la sesión con una cookie segura y la cierra si lleva demasiado tiempo sin usarse
function iniciarSesion(): void {
    if (session_status() === PHP_SESSION_ACTIVE) return;

    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
          || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');

    session_name('ateneo_admin');
    session_set_cookie_params([
        'lifetime' => 0,          // se borra al cerrar el navegador
        'path'     => '/',
        'secure'   => $https,     // en el hosting, solo por HTTPS
        'httponly' => true,       // JavaScript no puede leerla
        'samesite' => 'Strict',   // otras webs no pueden usarla
    ]);
    session_start();

    if (isset($_SESSION['ultimo_uso']) && time() - $_SESSION['ultimo_uso'] > MINUTOS_SESION * 60) {
        $_SESSION = [];
        session_regenerate_id(true);
    }
    $_SESSION['ultimo_uso'] = time();
}

function estaConectado(): bool {
    return !empty($_SESSION['admin']);
}

// Código anti-envíos falsos: la pantalla lo recibe al entrar y lo manda en cada cambio
function tokenCsrf(): string {
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

// Para todo lo que guarda, cambia o borra: hace falta sesión y código anti-envíos falsos
function exigirSesion(): void {
    iniciarSesion();
    if (!estaConectado()) {
        responder(401, ['error' => 'La sesión ha caducado. Vuelve a entrar.']);
    }
}

function exigirCsrf(): void {
    $enviado = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    if (!is_string($enviado) || empty($_SESSION['csrf']) || !hash_equals($_SESSION['csrf'], $enviado)) {
        responder(403, ['error' => 'La sesión no es válida. Recarga la página.']);
    }
}