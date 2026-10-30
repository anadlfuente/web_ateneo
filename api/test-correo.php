<?php
require __DIR__ . '/vendor/autoload.php';
$config = require __DIR__ . '/config.php';

$mail = new PHPMailer\PHPMailer\PHPMailer(true);
$mail->SMTPDebug  = 2;
$mail->isSMTP();
$mail->Host       = $config['smtp_host'];
$mail->Port       = $config['smtp_port'];
$mail->SMTPAuth   = true;
$mail->Username   = $config['smtp_user'];
$mail->Password   = $config['smtp_pass'];
$mail->SMTPSecure = $config['smtp_secure'];

echo "Longitud de la contraseña: " . strlen($config['smtp_pass']) . "\n";
try {
    $mail->smtpConnect();
    echo "\nOK: Gmail acepta usuario y contraseña\n";
} catch (Exception $e) {
    echo "\nFALLA: " . $mail->ErrorInfo . "\n";
}