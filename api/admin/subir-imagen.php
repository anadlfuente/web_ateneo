<?php
// Panel: subir una foto para una noticia.
//
// Comprueba que es una imagen de verdad, la gira si viene de un móvil,
// la reduce a 1600 px como mucho, la convierte a WebP (pesa mucho menos)
// y la guarda en uploads/noticias/AAAA/MM/ con un nombre al azar.
// Devuelve la ruta para guardarla en la noticia.

require __DIR__ . '/_sesion.php';

const MAX_MB   = 15;     // peso máximo de la foto original
const MAX_LADO = 1600;   // píxeles del lado más largo, después de reducirla
const CALIDAD  = 82;     // calidad de la foto guardada (0-100)

exigirMetodo('POST');
exigirSesion();
exigirCsrf();

// Carpeta de destino: fotos de noticias o carteles de eventos
$destino = in_array($_POST['destino'] ?? '', ['noticias', 'eventos'], true) ? $_POST['destino'] : 'noticias';

if (!function_exists('imagecreatetruecolor')) {
    responder(500, ['error' => 'El servidor no puede procesar fotos (falta la extensión GD de PHP).']);
}

// ── 1. Recibir el archivo ──
$f = $_FILES['imagen'] ?? null;
if (!is_array($f) || is_array($f['error'] ?? null)) {
    responder(400, ['error' => 'No ha llegado ninguna foto.']);
}
if (in_array($f['error'], [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE], true) || $f['size'] > MAX_MB * 1024 * 1024) {
    responder(413, ['error' => 'La foto pesa demasiado (máximo ' . MAX_MB . ' MB).']);
}
if ($f['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($f['tmp_name'])) {
    responder(400, ['error' => 'No se ha podido recibir la foto. Inténtalo de nuevo.']);
}

// ── 2. Comprobar que es una foto de verdad ──
$abrir = [
    IMAGETYPE_JPEG => 'imagecreatefromjpeg',
    IMAGETYPE_PNG  => 'imagecreatefrompng',
    IMAGETYPE_WEBP => 'imagecreatefromwebp',
];
$info = @getimagesize($f['tmp_name']);
if (!$info || !isset($abrir[$info[2]]) || !function_exists($abrir[$info[2]])) {
    responder(415, ['error' => 'El archivo no es una foto válida. Usa JPG, PNG o WebP.']);
}
[$ancho, $alto, $tipo] = $info;
if ($ancho < 1 || $alto < 1 || $ancho * $alto > 40000000) {
    responder(415, ['error' => 'La foto tiene demasiados píxeles. Prueba con una más pequeña.']);
}

ini_set('memory_limit', '512M');
$origen = @$abrir[$tipo]($f['tmp_name']);
if (!$origen) {
    responder(415, ['error' => 'No se ha podido abrir la foto. Prueba con otra.']);
}

// ── 3. Girarla si es de móvil (los móviles guardan el giro aparte) ──
if ($tipo === IMAGETYPE_JPEG && function_exists('exif_read_data')) {
    $exif = @exif_read_data($f['tmp_name']);
    $giro = [3 => 180, 6 => -90, 8 => 90][(int)($exif['Orientation'] ?? 1)] ?? 0;
    if ($giro) {
        $girada = imagerotate($origen, $giro, 0);
        if ($girada) {
            imagedestroy($origen);
            $origen = $girada;
        }
    }
}
$ancho = imagesx($origen);
$alto  = imagesy($origen);

// ── 4. Reducirla ──
$escala     = min(1, MAX_LADO / max($ancho, $alto));
$nuevoAncho = max(1, (int)round($ancho * $escala));
$nuevoAlto  = max(1, (int)round($alto * $escala));

$webp    = function_exists('imagewebp');
$destino = imagecreatetruecolor($nuevoAncho, $nuevoAlto);
if ($webp) {
    // WebP admite transparencia (por si es un PNG con fondo transparente)
    imagealphablending($destino, false);
    imagesavealpha($destino, true);
    imagefill($destino, 0, 0, imagecolorallocatealpha($destino, 0, 0, 0, 127));
} else {
    imagefill($destino, 0, 0, imagecolorallocate($destino, 255, 255, 255));
}
imagecopyresampled($destino, $origen, 0, 0, 0, 0, $nuevoAncho, $nuevoAlto, $ancho, $alto);
imagedestroy($origen);

// ── 5. Guardarla ──
$raizUploads = __DIR__ . '/../../uploads';
$sub         = date('Y') . '/' . date('m');
$carpeta     = "$raizUploads/$destino/$sub";

if (!is_dir($carpeta) && !mkdir($carpeta, 0755, true)) {
    responder(500, ['error' => 'No se ha podido guardar la foto.']);
}

// Protección de la carpeta uploads/: ahí solo puede haber fotos, nunca código
$htaccess = "$raizUploads/.htaccess";
if (!file_exists($htaccess)) {
    $reglas = <<<'REGLAS'
# En esta carpeta solo hay fotos: no se puede ejecutar ningún código
<FilesMatch "\.(php\d?|phtml|phar|pl|py|cgi|sh)$">
  Require all denied
</FilesMatch>
REGLAS;
    @file_put_contents($htaccess, $reglas . "\n");
}

$nombre = bin2hex(random_bytes(8)) . ($webp ? '.webp' : '.jpg');
$ok = $webp
    ? imagewebp($destino, "$carpeta/$nombre", CALIDAD)
    : imagejpeg($destino, "$carpeta/$nombre", CALIDAD);
imagedestroy($destino);

if (!$ok) {
    responder(500, ['error' => 'No se ha podido guardar la foto.']);
}

responder(200, [
    'ruta'  => "/uploads/$destino/$sub/$nombre",
    'ancho' => $nuevoAncho,
    'alto'  => $nuevoAlto,
]);