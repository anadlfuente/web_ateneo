<?php
// Página de una noticia en el hosting: /noticias/<slug>/
//
// El .htaccess manda aquí esas direcciones. Este archivo coge la página
// "ver" que genera Next (noticias/ver/index.html) y, antes de enviarla,
// le escribe dentro el título, la descripción, la imagen para compartir,
// los datos estructurados y el texto de la noticia. Así Google y las IA
// ven el contenido aunque no ejecuten JavaScript. Después React carga
// encima la página normal, con su diseño.

require __DIR__ . '/eventos-db.php';

const NOMBRE_WEB = 'Ateneo Musical de Mieres';

// Perfiles oficiales del Ateneo, para que buscadores e IA sepan que son la misma entidad.
// Pon aquí el enlace a la ficha de Wikidata y a las redes, por ejemplo:
//   'https://www.wikidata.org/wiki/Q123456789',
//   'https://www.instagram.com/bandademieres/',
const PERFILES_ATENEO = [
    'https://www.wikidata.org/wiki/Q142010590',
    'https://www.facebook.com/Bandaateneomieres/',
    'https://www.youtube.com/@BandaMusicaMieres',
    'https://www.instagram.com/bandademieres/'
];

$siteUrl = rtrim(config()['site_url'] ?? 'https://ateneomusicalmieres.es', '/');

// ── Funciones de ayuda ──

function e(?string $texto): string {
    return htmlspecialchars($texto ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function urlCompleta(string $ruta, string $siteUrl): string {
    return preg_match('#^https?://#', $ruta) ? $ruta : $siteUrl . '/' . ltrim($ruta, '/');
}

function esEnlaceValido(?string $url): bool {
    return is_string($url) && preg_match('#^https?://#', $url);
}

// "2026-11-05" → "5 de noviembre de 2026"
function fechaLarga(string $fecha): string {
    $meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
              'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    [$a, $m, $d] = array_map('intval', explode('-', $fecha));
    return "$d de {$meses[$m - 1]} de $a";
}

// ── 1. La página que genera Next ──
// En el hosting está en noticias/ver/; en local, en out/noticias/ver/ tras `npm run build`.

$plantilla = null;
foreach ([__DIR__ . '/../noticias/ver/index.html', __DIR__ . '/../out/noticias/ver/index.html'] as $ruta) {
    if (is_file($ruta)) {
        $plantilla = file_get_contents($ruta);
        break;
    }
}
if ($plantilla === null) {
    http_response_code(500);
    exit('Falta la página noticias/ver/index.html');
}

header('Content-Type: text/html; charset=utf-8');

// ── 2. Buscar la noticia ──

$slug = (string)($_GET['slug'] ?? '');
$n = null;

if (preg_match('/^[a-z0-9-]{1,160}$/', $slug)) {
    try {
        $stmt = db()->prepare('SELECT * FROM noticias WHERE slug = :slug AND publicado = 1');
        $stmt->execute([':slug' => $slug]);
        $n = $stmt->fetch() ?: null;
    } catch (Throwable $e) {
        // Si falla la base de datos, se envía la página tal cual y React mostrará el aviso de error
        echo $plantilla;
        exit;
    }
}

// No existe o no está publicada: la página avisa, y los buscadores no la indexan
if (!$n) {
    http_response_code(404);
    echo str_replace('</head>', '<meta name="robots" content="noindex">' . "\n</head>", $plantilla);
    exit;
}

$contenido = json_decode($n['contenido'], true) ?: [];
$fuentes   = $n['fuentes'] ? (json_decode($n['fuentes'], true) ?: []) : [];
$url       = $siteUrl . '/noticias/' . $n['slug'] . '/';
$imagen    = urlCompleta($n['imagen'] ?: '/logo_ateneo.png', $siteUrl);

// ── 3. El texto de la noticia en HTML ──

$cuerpo  = '<article class="max-w-5xl mx-auto px-6 py-16">';
$cuerpo .= '<h1 class="text-4xl font-bold mb-3">' . e($n['titulo']) . '</h1>';
$cuerpo .= '<p class="text-sm mb-6">'
         . ($n['autor'] ? 'Por ' . e($n['autor']) . ' · ' : '')
         . '<time datetime="' . e($n['fecha']) . '">' . e(fechaLarga($n['fecha'])) . '</time></p>';
$cuerpo .= '<div class="space-y-6"><p class="text-xl">' . e($n['resumen']) . '</p>';

foreach ($contenido as $bloque) {
    switch ($bloque['tipo'] ?? '') {
        case 'parrafo':
            $cuerpo .= '<p>' . e($bloque['texto'] ?? '') . '</p>';
            break;
        case 'subtitulo':
            $cuerpo .= '<h2 class="text-2xl font-bold">' . e($bloque['texto'] ?? '') . '</h2>';
            break;
        case 'cita':
            $cuerpo .= '<blockquote><p>' . e($bloque['texto'] ?? '') . '</p>'
                     . (!empty($bloque['autor']) ? '<footer>— ' . e($bloque['autor']) . '</footer>' : '')
                     . '</blockquote>';
            break;
        case 'imagen':
            $cuerpo .= '<figure><img src="' . e($bloque['src'] ?? '') . '" alt="' . e($bloque['alt'] ?? '') . '" loading="lazy">'
                     . (!empty($bloque['pie']) ? '<figcaption>' . e($bloque['pie']) . '</figcaption>' : '')
                     . '</figure>';
            break;
        case 'enlace':
            if (esEnlaceValido($bloque['url'] ?? null)) {
                $cuerpo .= '<p><a href="' . e($bloque['url']) . '" rel="noopener noreferrer">' . e($bloque['texto'] ?? $bloque['url']) . '</a></p>';
            }
            break;
    }
}
$cuerpo .= '</div>';

$fuentesValidas = array_values(array_filter($fuentes, fn($f) => esEnlaceValido($f['url'] ?? null)));
if ($fuentesValidas) {
    $cuerpo .= '<p class="mt-12 font-semibold">' . (count($fuentesValidas) === 1 ? 'Fuente' : 'Fuentes') . '</p><ul>';
    foreach ($fuentesValidas as $f) {
        $cuerpo .= '<li>' . e($f['medio'] ?? '')
                 . (!empty($f['fecha']) ? ' (' . e(fechaLarga($f['fecha'])) . ')' : '')
                 . ' – <a href="' . e($f['url']) . '" rel="noopener noreferrer">Leer noticia completa</a></li>';
    }
    $cuerpo .= '</ul>';
}
$cuerpo .= '</article>';

// ── 4. Datos estructurados (le dicen a Google y a las IA qué es esta página y de quién) ──

$editor = [
    '@type' => 'Organization',
    'name'  => NOMBRE_WEB,
    'url'   => $siteUrl . '/',
    'logo'  => ['@type' => 'ImageObject', 'url' => $siteUrl . '/logo_ateneo.png'],
];
if (PERFILES_ATENEO) {
    $editor['sameAs'] = PERFILES_ATENEO;
}

$datos = [
    '@context'         => 'https://schema.org',
    '@type'            => 'NewsArticle',
    'headline'         => mb_substr($n['titulo'], 0, 110),
    'description'      => $n['resumen'],
    'image'            => [$imagen],
    'datePublished'    => $n['fecha'],
    'dateModified'     => date('c', strtotime($n['actualizado'])),
    'inLanguage'       => 'es-ES',
    'mainEntityOfPage' => $url,
    'author'           => $n['autor'] ? ['@type' => 'Person', 'name' => $n['autor']] : $editor,
    'publisher'        => $editor,
];
if ($fuentesValidas) {
    $datos['isBasedOn'] = array_map(fn($f) => $f['url'], $fuentesValidas);
}

// ── 5. Etiquetas de la cabecera ──

$cabecera = implode("\n", [
    '<link rel="canonical" href="' . e($url) . '">',
    '<meta name="description" content="' . e($n['resumen']) . '">',
    '<meta property="og:type" content="article">',
    '<meta property="og:site_name" content="' . e(NOMBRE_WEB) . '">',
    '<meta property="og:locale" content="es_ES">',
    '<meta property="og:title" content="' . e($n['titulo']) . '">',
    '<meta property="og:description" content="' . e($n['resumen']) . '">',
    '<meta property="og:url" content="' . e($url) . '">',
    '<meta property="og:image" content="' . e($imagen) . '">',
    '<meta property="article:published_time" content="' . e($n['fecha']) . '">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<script type="application/ld+json">'
        . json_encode($datos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG)
        . '</script>',
]);

// ── 6. Montar la página ──

$pagina = $plantilla;

// Título de la pestaña
$pagina = preg_replace_callback(
    '#<title>.*?</title>#s',
    fn() => '<title>' . e($n['titulo'] . ' | ' . NOMBRE_WEB) . '</title>',
    $pagina,
    1
);

// Se quita la descripción general de la web (se pone la de la noticia)
$pagina = preg_replace('#<meta name="description"[^>]*>#', '', $pagina, 1);

// Etiquetas nuevas antes de </head>
$pagina = preg_replace_callback('#</head>#', fn() => $cabecera . "\n</head>", $pagina, 1);

// Texto de la noticia dentro del hueco que deja la página "ver"
$pagina = preg_replace_callback(
    '#(<div id="noticia-precargada"[^>]*>)(</div>)#',
    fn($m) => $m[1] . $cuerpo . $m[2],
    $pagina,
    1
);

header('Cache-Control: public, max-age=300');
echo $pagina;