<?php
// API pública de eventos (solo lectura).
// La web llama a este archivo y recibe la lista de eventos.

require __DIR__ . '/eventos-db.php';

header('Content-Type: application/json; charset=utf-8');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, config()['cors_origins'], true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
}

$esFecha = fn($v) => is_string($v) && preg_match('/^\d{4}-\d{2}-\d{2}$/', $v);

$hoy    = date('Y-m-d');
$where  = ['publicado = 1'];
$params = [];

if (!empty($_GET['id'])) {
    $where[] = 'id = :id';
    $params[':id'] = (int)$_GET['id'];
} elseif (!empty($_GET['pasados'])) {
    $where[] = 'fecha < :hoy';
    $params[':hoy'] = $hoy;
} else {
    $where[] = 'fecha >= :desde';
    $params[':desde'] = $esFecha($_GET['desde'] ?? null) ? $_GET['desde'] : $hoy;
}

if ($esFecha($_GET['hasta'] ?? null)) {
    $where[] = 'fecha <= :hasta';
    $params[':hasta'] = $_GET['hasta'];
}

if (isset($_GET['agrupacion']) && array_key_exists($_GET['agrupacion'], AGRUPACIONES)) {
    $where[] = 'agrupacion = :agrupacion';
    $params[':agrupacion'] = $_GET['agrupacion'];
}

if (!empty($_GET['tipos'])) {
    $tipos = array_values(array_intersect(explode(',', $_GET['tipos']), array_keys(TIPOS)));
    if ($tipos) {
        $marcas = [];
        foreach ($tipos as $i => $t) {
            $marcas[] = ":tipo$i";
            $params[":tipo$i"] = $t;
        }
        $where[] = 'tipo IN (' . implode(', ', $marcas) . ')';
    }
}

$limite = min(max((int)($_GET['limite'] ?? 200), 1), 500);
$orden  = !empty($_GET['pasados']) ? 'fecha DESC, hora DESC' : 'fecha ASC, hora ASC';

$sql = 'SELECT id, titulo, agrupacion, tipo, fecha, hora, lugar, enlace_maps,
               descripcion, imagen, enlace_entradas, destacado
        FROM eventos
        WHERE ' . implode(' AND ', $where) . "
        ORDER BY $orden
        LIMIT $limite";

try {
    $stmt = db()->prepare($sql);
    $stmt->execute($params);
    $eventos = array_map(function ($e) {
        $e['id']        = (int)$e['id'];
        $e['destacado'] = (bool)$e['destacado'];
        $e['hora']      = $e['hora'] ? substr($e['hora'], 0, 5) : null;
        return $e;
    }, $stmt->fetchAll());

    header('Cache-Control: public, max-age=300');
    echo json_encode($eventos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'No se pudieron cargar los eventos']);
}