<?php
// API pública del organigrama (solo lectura).
// Devuelve las secciones de una agrupación (banda o coral) con sus músicos activos.

require __DIR__ . '/eventos-db.php';

header('Content-Type: application/json; charset=utf-8');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, config()['cors_origins'], true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
}

$agrupacion = $_GET['agrupacion'] ?? '';
if (!array_key_exists($agrupacion, AGRUPACIONES)) {
    http_response_code(400);
    echo json_encode(['error' => 'Agrupación no válida']);
    exit;
}

$sql = 'SELECT s.id AS seccion_id, s.nombre AS seccion, m.nombre, m.cargo
        FROM secciones s
        JOIN musicos m ON m.seccion_id = s.id AND m.activo = 1
        WHERE s.agrupacion = :agrupacion
        ORDER BY s.orden, s.nombre, m.orden, m.nombre';

try {
    $stmt = db()->prepare($sql);
    $stmt->execute([':agrupacion' => $agrupacion]);

    // Agrupa las filas por sección, respetando el orden
    $secciones = [];
    foreach ($stmt->fetchAll() as $fila) {
        $id = $fila['seccion_id'];
        if (!isset($secciones[$id])) {
            $secciones[$id] = ['nombre' => $fila['seccion'], 'miembros' => []];
        }
        $secciones[$id]['miembros'][] = [
            'nombre' => $fila['nombre'],
            'cargo'  => $fila['cargo'],
        ];
    }

    header('Cache-Control: public, max-age=300');
    echo json_encode(array_values($secciones), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'No se pudo cargar el organigrama']);
}