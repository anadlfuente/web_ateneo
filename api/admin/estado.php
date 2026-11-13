<?php
// Dice a la pantalla si hay una sesión abierta (y le da el código anti-envíos falsos).

require __DIR__ . '/_sesion.php';

exigirMetodo('GET');
iniciarSesion();

responder(200, [
    'conectado' => estaConectado(),
    'csrf'      => estaConectado() ? tokenCsrf() : null,
]);