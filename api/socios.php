<?php
require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 1. CARGAR LA CONFIGURACIÓN (la misma que usa contacto.php)
// En el hosting estará fuera de la carpeta pública (/config/config.php).
// En local usamos el config.php de esta misma carpeta.
$configServidor = __DIR__ . '/../../config/config.php';
$config = require (file_exists($configServidor) ? $configServidor : __DIR__ . '/config.php');

// Hora española para la fecha que aparece en el correo
date_default_timezone_set('Europe/Madrid');

// 2. CABECERAS
header('Content-Type: application/json; charset=utf-8');

// Permite que la web en local (localhost:3000) hable con este PHP
if (!empty($config['allowed_origin'])) {
    header('Access-Control-Allow-Origin: ' . $config['allowed_origin']);
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Función para contestar a la web y terminar
function responder($codigo, $datos) {
    http_response_code($codigo);
    echo json_encode($datos);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(405, ['ok' => false, 'error' => 'Método no permitido']);
}

// 3. LEER LOS DATOS DEL FORMULARIO
$datos     = json_decode(file_get_contents('php://input'), true) ?? [];
$nombre    = trim($datos['nombre']    ?? '');
$apellidos = trim($datos['apellidos'] ?? '');
$email     = trim($datos['email']     ?? '');
$telefono  = trim($datos['telefono']  ?? '');
$trampa    = trim($datos['web']       ?? ''); // campo oculto antispam

// 4. ANTISPAM
// Si el campo oculto viene relleno, es un robot: fingimos que todo va bien pero no enviamos nada.
if ($trampa !== '') {
    responder(200, ['ok' => true]);
}

// 5. COMPROBAR QUE LOS DATOS SON CORRECTOS
if ($nombre === '' || $apellidos === '') {
    responder(422, ['ok' => false, 'error' => 'Faltan el nombre o los apellidos.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(422, ['ok' => false, 'error' => 'El email no es válido.']);
}
if (mb_strlen($nombre) > 100 || mb_strlen($apellidos) > 150) {
    responder(422, ['ok' => false, 'error' => 'El nombre o los apellidos son demasiado largos.']);
}
// Teléfono opcional: solo números, espacios, +, guiones y paréntesis
if ($telefono !== '' && !preg_match('/^[0-9 +()\-]{6,20}$/', $telefono)) {
    responder(422, ['ok' => false, 'error' => 'El teléfono no es válido.']);
}

$nombreCompleto = "$nombre $apellidos";

// 6. ENVIAR EL CORREO AL ATENEO
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->Port = $config['smtp_port'];

    if ($config['smtp_user'] !== '') {
        // Hosting real: con usuario y contraseña
        $mail->SMTPAuth   = true;
        $mail->Username   = $config['smtp_user'];
        $mail->Password   = $config['smtp_pass'];
        $mail->SMTPSecure = $config['smtp_secure'];
    } else {
        // Local: sin contraseña ni cifrado
        $mail->SMTPAuth    = false;
        $mail->SMTPAutoTLS = false;
    }

    $mail->CharSet = 'UTF-8';

    // Remitente: la dirección de la web, con el nombre de quien solicita el alta
    $mail->setFrom($config['from_email'], "$nombreCompleto (vía web)");
    // Destinatario: el correo de socios si existe en la configuración; si no, el general
    $mail->addAddress($config['socios_email'] ?? $config['to_email']);
    // Al pulsar "Responder", se contesta a la persona interesada
    $mail->addReplyTo($email, $nombreCompleto);

    $mail->Subject = "[Web] Solicitud de alta como socio - $nombreCompleto";
    $mail->Body =
        "Nueva solicitud de alta de socio desde la web\n\n" .
        "Nombre: $nombre\n" .
        "Apellidos: $apellidos\n" .
        "Email: $email\n" .
        "Teléfono: " . ($telefono !== '' ? $telefono : '(no indicado)') . "\n\n" .
        "La persona ha aceptado la política de privacidad.\n" .
        "Fecha de la solicitud: " . date('d/m/Y H:i') . "\n";

    $mail->send();
    responder(200, ['ok' => true]);

} catch (Exception $e) {
    error_log('Error al enviar solicitud de socio: ' . $mail->ErrorInfo);
    responder(500, ['ok' => false, 'error' => 'No se ha podido enviar la solicitud. Inténtalo más tarde.']);
}