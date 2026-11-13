<?php
// Salir del panel.

require __DIR__ . '/_sesion.php';

exigirMetodo('POST');
iniciarSesion();

if (estaConectado()) {
    exigirCsrf();
}

$_SESSION = [];
$p = session_get_cookie_params();
setcookie(session_name(), '', [
    'expires'  => time() - 3600,
    'path'     => $p['path'],
    'secure'   => $p['secure'],
    'httponly' => $p['httponly'],
    'samesite' => $p['samesite'],
]);
session_destroy();

responder(200, ['conectado' => false]);