<?php
// API pública de noticias (solo lectura).
// Solo devuelve noticias publicadas.
//
//   noticias.php                          → listado (sin el cuerpo), de la más reciente a la más antigua
//   noticias.php?agrupacion=coral-cantares → solo las de una agrupación
//   noticias.php?limite=4                 → como mucho 4
//   noticias.php?slug=estrenamos-web-2026 → una noticia completa

require __DIR__ . '/eventos-db.php';

header('Content-Type: application/json; charset=utf-8');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, config()['cors_origins'], true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
}

// Agrupaciones válidas en las noticias (las mismas claves que en lib/noticias.ts)
const AGRUPACIONES_NOTICIAS = [
    'banda-sinfonica',
    'coral-cantares',
    'charanga-new-paentamala',
    'claxon-boys',
    'grupos-camara',
];

// Convierte una fila de la base de datos en el formato que usa la web
function formatearNoticia(array $n, bool $completa): array {
    $noticia = [
        'slug'         => $n['slug'],
        'titulo'       => $n['titulo'],
        'resumen'      => $n['resumen'],
        'fecha'        => $n['fecha'],
        'autor'        => $n['autor'],
        'categoria'    => $n['categoria'],
        'imagen'       => $n['imagen'],
        'imagenAlt'    => $n['imagen_alt'],
        'destacada'    => (bool)$n['destacada'],
        'agrupaciones' => $n['agrupaciones'] === '' ? [] : explode(',', $n['agrupaciones']),
        'fuentes'      => $n['fuentes'] ? (json_decode($n['fuentes'], true) ?: []) : [],
    ];

    if ($completa) {
        $noticia['imagenLado'] = $n['imagen_lado'];
        $noticia['pieImagen']  = $n['pie_imagen'];
        $noticia['contenido']  = json_decode($n['contenido'], true) ?: [];
    }

    return $noticia;
}

try {
    // ── Una noticia concreta ──
    if (!empty($_GET['slug'])) {
        $stmt = db()->prepare('SELECT * FROM noticias WHERE slug = :slug AND publicado = 1');
        $stmt->execute([':slug' => (string)$_GET['slug']]);
        $fila = $stmt->fetch();

        if (!$fila) {
            http_response_code(404);
            echo json_encode(['error' => 'Noticia no encontrada']);
            exit;
        }

        header('Cache-Control: public, max-age=60');
        echo json_encode(formatearNoticia($fila, true), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    // ── Listado ──
    $where  = ['publicado = 1'];
    $params = [];

    if (isset($_GET['agrupacion']) && in_array($_GET['agrupacion'], AGRUPACIONES_NOTICIAS, true)) {
        $where[] = 'FIND_IN_SET(:agrupacion, agrupaciones)';
        $params[':agrupacion'] = $_GET['agrupacion'];
    }

    $limite = min(max((int)($_GET['limite'] ?? 200), 1), 500);

        $sql = 'SELECT slug, titulo, resumen, fecha, autor, categoria, imagen, imagen_alt, destacada, agrupaciones, fuentes
            FROM noticias
            WHERE ' . implode(' AND ', $where) . "
            ORDER BY fecha DESC, id DESC
            LIMIT $limite";

    $stmt = db()->prepare($sql);
    $stmt->execute($params);
    $noticias = array_map(fn($n) => formatearNoticia($n, false), $stmt->fetchAll());

    header('Cache-Control: public, max-age=60');
    echo json_encode($noticias, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'No se pudieron cargar las noticias']);
}