<?php
require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 1. CARGAR LA CONFIGURACIÓN
// En el hosting estará fuera de la carpeta pública (/config/config.php).
// En local usamos el config.php de esta misma carpeta.
$configServidor = __DIR__ . '/../../config/config.php';
$config = require (file_exists($configServidor) ? $configServidor : __DIR__ . '/config.php');

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
$datos   = json_decode(file_get_contents('php://input'), true) ?? [];
$nombre  = trim($datos['nombre']  ?? '');
$email   = trim($datos['email']   ?? '');
$asunto  = trim($datos['asunto']  ?? '');
$mensaje = trim($datos['mensaje'] ?? '');
$trampa  = trim($datos['web']     ?? ''); // campo oculto antispam

// 4. ANTISPAM
// Si el campo oculto viene relleno, es un robot: fingimos que todo va bien pero no enviamos nada.
if ($trampa !== '') {
    responder(200, ['ok' => true]);
}

// 5. COMPROBAR QUE LOS DATOS SON CORRECTOS
if ($nombre === '' || $mensaje === '') {
    responder(422, ['ok' => false, 'error' => 'Faltan el nombre o el mensaje.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(422, ['ok' => false, 'error' => 'El email no es válido.']);
}
if (mb_strlen($nombre) > 100 || mb_strlen($mensaje) > 5000) {
    responder(422, ['ok' => false, 'error' => 'El texto es demasiado largo.']);
}

// Traducir el asunto elegido a un texto legible
$asuntos = [
    'unirse'     => 'Quiero unirme a una agrupación',
    'contratar'  => 'Contratar servicios',
    'patrocinio' => 'Información sobre patrocinio',
    'socio'      => 'Hacerme socio',
    'otro'       => 'Otro',
];
$asuntoTexto = $asuntos[$asunto] ?? 'Mensaje de contacto';

// 6. ENVIAR EL CORREO
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
        // Local con Mailpit: sin contraseña ni cifrado
        $mail->SMTPAuth    = false;
        $mail->SMTPAutoTLS = false;
    }

    $mail->CharSet = 'UTF-8';

    // Remitente: la dirección de la web, pero con el nombre de quien escribe
    $mail->setFrom($config['from_email'], "$nombre (vía web)");
    // Destinatario: el correo del Ateneo
    $mail->addAddress($config['to_email']);
    // Al pulsar "Responder", se contesta a la persona que escribió
    $mail->addReplyTo($email, $nombre);

    $mail->Subject = "[Web] $asuntoTexto - $nombre";
    $mail->Body =
        "Nuevo mensaje desde el formulario de contacto de la web\n\n" .
        "Nombre: $nombre\n" .
        "Email: $email\n" .
        "Asunto: $asuntoTexto\n\n" .
        "Mensaje:\n$mensaje\n";

    $mail->send();
    responder(200, ['ok' => true]);

} catch (Exception $e) {
    error_log('Error al enviar correo: ' . $mail->ErrorInfo);
    responder(500, ['ok' => false, 'error' => 'No se ha podido enviar el mensaje. Inténtalo más tarde.']);
}