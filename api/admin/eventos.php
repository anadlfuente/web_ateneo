<?php
// Panel: gestión de los eventos del calendario. Todo exige haber iniciado sesión.
//
//   GET  eventos.php        → todos los eventos (también borradores y pasados)
//   GET  eventos.php?id=5   → un evento completo, para editarlo
//   POST {"accion":"guardar",  "evento":{...}}             → crea (sin id) o guarda cambios (con id)
//   POST {"accion":"publicar", "id":5, "publicado":true}   → publica o pasa a borrador
//   POST {"accion":"borrar",   "id":5}                     → borra
//
// Las agrupaciones (AGRUPACIONES) y los tipos (TIPOS) válidos están en eventos-db.php.

require __DIR__ . '/_sesion.php';
require __DIR__ . '/_utilidades.php';

exigirSesion();

// Corrige rutas de cartel antiguas: "public/poster/x.jpg" o "poster/x.jpg" → "/poster/x.jpg"
function normalizarImagen(string $ruta): string {
    if ($ruta === '' || preg_match('#^https?://#i', $ruta)) return $ruta;
    $r = str_replace('\\', '/', $ruta);
    $r = preg_replace('#^/?public/#', '/', $r);
    return '/' . ltrim($r, '/');
}

// Comprueba todos los campos. Devuelve [fila para la base de datos, errores por campo]
function validarEvento(array $d): array {
    $e = [];

    $titulo = limpiar($d['titulo'] ?? '');
    if ($titulo === '') $e['titulo'] = 'Escribe el título.';
    elseif (mb_strlen($titulo) > 150) $e['titulo'] = 'El título es demasiado largo (máximo 150 caracteres).';

    $agrupaciones = array_values(array_unique(array_filter(
        is_array($d['agrupaciones'] ?? null) ? $d['agrupaciones'] : [],
        fn($a) => is_string($a) && array_key_exists($a, AGRUPACIONES)
    )));
    if (!$agrupaciones) $e['agrupaciones'] = 'Elige al menos una agrupación.';

    $tipo = $d['tipo'] ?? '';
    if (!is_string($tipo) || !array_key_exists($tipo, TIPOS)) $e['tipo'] = 'Elige el tipo de evento.';

    $fecha = $d['fecha'] ?? '';
    if (!esFecha($fecha)) $e['fecha'] = 'Elige una fecha válida.';

    $hora = limpiar($d['hora'] ?? '');
    if ($hora !== '' && !preg_match('/^([01]\d|2[0-3]):[0-5]\d$/', $hora)) $e['hora'] = 'La hora no es válida.';

    $lugar = limpiar($d['lugar'] ?? '');
    if (mb_strlen($lugar) > 150) $e['lugar'] = 'El lugar es demasiado largo (máximo 150 caracteres).';

    $maps = limpiar($d['enlaceMaps'] ?? '');
    if ($maps !== '' && !esUrl($maps)) $e['enlaceMaps'] = 'El enlace de Google Maps tiene que empezar por https://';

    $descripcion = limpiar($d['descripcion'] ?? '');
    if (mb_strlen($descripcion) > 5000) $e['descripcion'] = 'La descripción es demasiado larga.';

    $imagen = normalizarImagen(limpiar($d['imagen'] ?? ''));
    if ($imagen !== '' && !esRutaImagen($imagen) && !esUrl($imagen)) $e['imagen'] = 'El cartel no es válido.';

    $entradas = limpiar($d['enlaceEntradas'] ?? '');
    if ($entradas !== '' && (!esUrl($entradas) || strlen($entradas) > 255)) {
        $e['enlaceEntradas'] = 'El enlace de las entradas tiene que empezar por https://';
    }

    $fila = [
        'titulo'          => $titulo,
        'agrupacion'      => implode(',', $agrupaciones),
        'tipo'            => $tipo,
        'fecha'           => $fecha,
        'hora'            => $hora !== '' ? "$hora:00" : null,
        'lugar'           => $lugar ?: null,
        'enlace_maps'     => $maps ?: null,
        'descripcion'     => $descripcion ?: null,
        'imagen'          => $imagen ?: null,
        'enlace_entradas' => $entradas ?: null,
        'destacado'       => !empty($d['destacado']) ? 1 : 0,
        'publicado'       => !empty($d['publicado']) ? 1 : 0,
    ];

    return [$fila, $e];
}

// Fila de la base de datos → formato que usa el panel
function formatearParaPanel(array $ev): array {
    return [
        'id'             => (int)$ev['id'],
        'titulo'         => $ev['titulo'],
        'agrupaciones'   => $ev['agrupacion'] === '' ? [] : explode(',', $ev['agrupacion']),
        'tipo'           => $ev['tipo'],
        'fecha'          => $ev['fecha'],
        'hora'           => $ev['hora'] ? substr($ev['hora'], 0, 5) : '',
        'lugar'          => $ev['lugar'] ?? '',
        'enlaceMaps'     => $ev['enlace_maps'] ?? '',
        'descripcion'    => $ev['descripcion'] ?? '',
        'imagen'         => $ev['imagen'] ? normalizarImagen($ev['imagen']) : '',
        'enlaceEntradas' => $ev['enlace_entradas'] ?? '',
        'destacado'      => (bool)$ev['destacado'],
        'publicado'      => (bool)$ev['publicado'],
    ];
}

try {
    $db = db();

    // ── Leer ──
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'GET') {
        if (!empty($_GET['id'])) {
            $stmt = $db->prepare('SELECT * FROM eventos WHERE id = :id');
            $stmt->execute([':id' => (int)$_GET['id']]);
            $fila = $stmt->fetch();
            if (!$fila) responder(404, ['error' => 'Este evento ya no existe.']);
            responder(200, ['evento' => formatearParaPanel($fila)]);
        }

        $filas = $db->query(
            'SELECT id, titulo, agrupacion, tipo, fecha, hora, lugar, enlace_maps, descripcion,
                    imagen, enlace_entradas, destacado, publicado
             FROM eventos ORDER BY fecha DESC, hora DESC'
        )->fetchAll();

        responder(200, ['eventos' => array_map('formatearParaPanel', $filas)]);
    }

    // ── Cambiar: hace falta además el código anti-envíos falsos ──
    exigirMetodo('POST');
    exigirCsrf();
    $datos  = leerJson();
    $accion = $datos['accion'] ?? '';

    $existe = function (int $id) use ($db): bool {
        $s = $db->prepare('SELECT 1 FROM eventos WHERE id = :id');
        $s->execute([':id' => $id]);
        return (bool)$s->fetchColumn();
    };

    if ($accion === 'guardar') {
        $ev = $datos['evento'] ?? null;
        if (!is_array($ev)) responder(400, ['error' => 'Faltan los datos del evento.']);
        $id = (int)($ev['id'] ?? 0);
        if ($id && !$existe($id)) responder(404, ['error' => 'Este evento ya no existe.']);

        [$fila, $errores] = validarEvento($ev);
        if ($errores) {
            responder(422, ['error' => 'Revisa los campos marcados.', 'campos' => $errores]);
        }

        $columnas = array_keys($fila);
        $valores  = [];
        foreach ($fila as $col => $val) $valores[":$col"] = $val;

        if ($id) {
            $sets = implode(', ', array_map(fn($c) => "$c = :$c", $columnas));
            $valores[':id'] = $id;
            $db->prepare("UPDATE eventos SET $sets WHERE id = :id")->execute($valores);
        } else {
            $cols   = implode(', ', $columnas);
            $marcas = implode(', ', array_map(fn($c) => ":$c", $columnas));
            $db->prepare("INSERT INTO eventos ($cols) VALUES ($marcas)")->execute($valores);
            $id = (int)$db->lastInsertId();
        }

        responder(200, ['id' => $id, 'publicado' => (bool)$fila['publicado']]);
    }

    if ($accion === 'publicar') {
        $id = (int)($datos['id'] ?? 0);
        if (!$id || !$existe($id)) responder(404, ['error' => 'Este evento ya no existe.']);
        $publicado = !empty($datos['publicado']);
        $db->prepare('UPDATE eventos SET publicado = :p WHERE id = :id')
           ->execute([':p' => $publicado ? 1 : 0, ':id' => $id]);
        responder(200, ['id' => $id, 'publicado' => $publicado]);
    }

    if ($accion === 'borrar') {
        $id = (int)($datos['id'] ?? 0);
        if (!$id || !$existe($id)) responder(404, ['error' => 'Este evento ya no existe.']);
        $db->prepare('DELETE FROM eventos WHERE id = :id')->execute([':id' => $id]);
        responder(200, ['id' => $id, 'borrado' => true]);
    }

    responder(400, ['error' => 'Acción no válida.']);
} catch (Throwable $e) {
    responder(500, ['error' => 'No se ha podido completar la operación. Inténtalo de nuevo.']);
}