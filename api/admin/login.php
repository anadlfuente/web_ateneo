<?php
// Entrar en el panel.
// Tras 5 intentos fallidos desde la misma conexión, se bloquea durante 15 minutos.

require __DIR__ . '/_sesion.php';

const MAX_FALLOS      = 5;
const MINUTOS_BLOQUEO = 15;

exigirMetodo('POST');
iniciarSesion();

$datos      = leerJson();
$usuario    = (string)($datos['usuario'] ?? '');
$contrasena = (string)($datos['contrasena'] ?? '');
$ip         = ipCliente();
$c          = config();

try {
    $db = db();

    // Se olvidan los intentos antiguos
    $db->exec('DELETE FROM login_intentos WHERE momento < (NOW() - INTERVAL ' . MINUTOS_BLOQUEO . ' MINUTE)');

    $stmt = $db->prepare('SELECT COUNT(*) FROM login_intentos WHERE ip = :ip');
    $stmt->execute([':ip' => $ip]);
    if ((int)$stmt->fetchColumn() >= MAX_FALLOS) {
        responder(429, ['error' => 'Demasiados intentos fallidos. Espera 15 minutos y vuelve a probar.']);
    }

    $ok = password_verify($contrasena, (string)($c['admin_password_hash'] ?? ''))
       && hash_equals((string)($c['admin_user'] ?? ''), $usuario);

    if (!$ok) {
        $db->prepare('INSERT INTO login_intentos (ip) VALUES (:ip)')->execute([':ip' => $ip]);
        sleep(1);   // frena a quien pruebe contraseñas una tras otra
        responder(401, ['error' => 'Usuario o contraseña incorrectos.']);
    }

    // Correcto: se borran sus fallos y se empieza una sesión nueva
    $db->prepare('DELETE FROM login_intentos WHERE ip = :ip')->execute([':ip' => $ip]);
    session_regenerate_id(true);
    $_SESSION['admin'] = true;
    $_SESSION['csrf']  = bin2hex(random_bytes(32));

    responder(200, ['conectado' => true, 'csrf' => $_SESSION['csrf']]);
} catch (Throwable $e) {
    responder(500, ['error' => 'No se ha podido iniciar sesión. Inténtalo de nuevo más tarde.']);
}