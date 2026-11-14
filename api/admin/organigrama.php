<?php
// Panel: organigrama (secciones y músicos) de la Banda y la Coral. Todo exige haber iniciado sesión.
// Cada acción devuelve el organigrama completo de la agrupación, ya actualizado.
//
//   GET  organigrama.php?agrupacion=banda   → secciones con todos sus músicos (también los inactivos)
//   POST {"accion": ...}
//     crear_seccion      {agrupacion, nombre}
//     renombrar_seccion  {id, nombre}
//     borrar_seccion     {id}                  (solo si no tiene músicos)
//     ordenar_secciones  {agrupacion, ids}     (ids en el orden nuevo)
//     guardar_musico     {musico: {id?, seccionId, nombre, cargo, activo}}
//     borrar_musico      {id}
//     ordenar_musicos    {seccionId, ids}      (ids en el orden nuevo)

require __DIR__ . '/_sesion.php';
require __DIR__ . '/_utilidades.php';

// Agrupaciones que tienen organigrama en la web
const AGRUPACIONES_ORGANIGRAMA = ['banda', 'coral'];

exigirSesion();

// ── Funciones de ayuda ───────────────────────────────────────

// Secciones de una agrupación, en orden, con sus músicos en orden
function leerOrganigrama(PDO $db, string $agrupacion): array {
    $s = $db->prepare('SELECT id, nombre FROM secciones WHERE agrupacion = :a ORDER BY orden, nombre');
    $s->execute([':a' => $agrupacion]);

    $secciones = [];
    foreach ($s->fetchAll() as $f) {
        $secciones[(int)$f['id']] = ['id' => (int)$f['id'], 'nombre' => $f['nombre'], 'musicos' => []];
    }

    if ($secciones) {
        $m = $db->prepare(
            'SELECT m.id, m.seccion_id, m.nombre, m.cargo, m.activo
             FROM musicos m JOIN secciones s ON s.id = m.seccion_id
             WHERE s.agrupacion = :a
             ORDER BY m.orden, m.nombre'
        );
        $m->execute([':a' => $agrupacion]);
        foreach ($m->fetchAll() as $f) {
            $secciones[(int)$f['seccion_id']]['musicos'][] = [
                'id'     => (int)$f['id'],
                'nombre' => $f['nombre'],
                'cargo'  => $f['cargo'] ?? '',
                'activo' => (bool)$f['activo'],
            ];
        }
    }

    return array_values($secciones);
}

// Agrupación a la que pertenece una sección (o null si no existe)
function agrupacionDeSeccion(PDO $db, int $id): ?string {
    $s = $db->prepare('SELECT agrupacion FROM secciones WHERE id = :id');
    $s->execute([':id' => $id]);
    $a = $s->fetchColumn();
    return $a === false ? null : $a;
}

function agrupacionValida($valor): string {
    if (!is_string($valor) || !in_array($valor, AGRUPACIONES_ORGANIGRAMA, true)) {
        responder(400, ['error' => 'Agrupación no válida.']);
    }
    return $valor;
}

function nombreSeccionValido($valor): string {
    $n = limpiar($valor);
    if ($n === '') {
        responder(422, ['error' => 'Revisa los campos marcados.', 'campos' => ['nombre' => 'Escribe el nombre de la sección.']]);
    }
    if (mb_strlen($n) > 80) {
        responder(422, ['error' => 'Revisa los campos marcados.', 'campos' => ['nombre' => 'El nombre es demasiado largo (máximo 80 caracteres).']]);
    }
    return $n;
}

function seccionRepetida(): void {
    responder(422, ['error' => 'Revisa los campos marcados.', 'campos' => ['nombre' => 'Ya hay una sección con ese nombre.']]);
}

// Guarda un orden nuevo. $ids son los ids en el orden en que deben salir,
// y tienen que ser exactamente los del grupo (para no desordenar nada si otra persona
// ha cambiado algo a la vez).
function guardarOrden(PDO $db, string $tabla, string $campoGrupo, $valorGrupo, $ids): void {
    if (!is_array($ids)) responder(400, ['error' => 'Orden no válido.']);

    $s = $db->prepare("SELECT id FROM $tabla WHERE $campoGrupo = :g");
    $s->execute([':g' => $valorGrupo]);
    $actuales = array_map('intval', $s->fetchAll(PDO::FETCH_COLUMN));
    $nuevos   = array_map('intval', $ids);

    $a = $actuales;
    $b = $nuevos;
    sort($a);
    sort($b);
    if ($a !== $b) {
        responder(409, ['error' => 'El organigrama ha cambiado mientras lo editabas. Recarga la página.']);
    }

    $db->beginTransaction();
    $u = $db->prepare("UPDATE $tabla SET orden = :o WHERE id = :id");
    foreach ($nuevos as $i => $id) {
        $u->execute([':o' => $i + 1, ':id' => $id]);
    }
    $db->commit();
}

// ── Peticiones ───────────────────────────────────────────────

try {
    $db = db();

    // ── Leer ──
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'GET') {
        $agr = agrupacionValida($_GET['agrupacion'] ?? '');
        responder(200, ['secciones' => leerOrganigrama($db, $agr)]);
    }

    // ── Cambiar ──
    exigirMetodo('POST');
    exigirCsrf();
    $d      = leerJson();
    $accion = $d['accion'] ?? '';

    // Secciones

    if ($accion === 'crear_seccion') {
        $agr    = agrupacionValida($d['agrupacion'] ?? '');
        $nombre = nombreSeccionValido($d['nombre'] ?? '');

        $s = $db->prepare('SELECT COALESCE(MAX(orden), 0) + 1 FROM secciones WHERE agrupacion = :a');
        $s->execute([':a' => $agr]);
        try {
            $db->prepare('INSERT INTO secciones (agrupacion, nombre, orden) VALUES (:a, :n, :o)')
               ->execute([':a' => $agr, ':n' => $nombre, ':o' => (int)$s->fetchColumn()]);
        } catch (PDOException $ex) {
            if ((string)$ex->getCode() === '23000') seccionRepetida();
            throw $ex;
        }
        responder(200, ['secciones' => leerOrganigrama($db, $agr)]);
    }

    if ($accion === 'renombrar_seccion') {
        $id  = (int)($d['id'] ?? 0);
        $agr = agrupacionDeSeccion($db, $id);
        if (!$agr) responder(404, ['error' => 'Esa sección ya no existe. Recarga la página.']);
        $nombre = nombreSeccionValido($d['nombre'] ?? '');
        try {
            $db->prepare('UPDATE secciones SET nombre = :n WHERE id = :id')->execute([':n' => $nombre, ':id' => $id]);
        } catch (PDOException $ex) {
            if ((string)$ex->getCode() === '23000') seccionRepetida();
            throw $ex;
        }
        responder(200, ['secciones' => leerOrganigrama($db, $agr)]);
    }

    if ($accion === 'borrar_seccion') {
        $id  = (int)($d['id'] ?? 0);
        $agr = agrupacionDeSeccion($db, $id);
        if (!$agr) responder(404, ['error' => 'Esa sección ya no existe. Recarga la página.']);

        $s = $db->prepare('SELECT COUNT(*) FROM musicos WHERE seccion_id = :id');
        $s->execute([':id' => $id]);
        if ((int)$s->fetchColumn() > 0) {
            responder(409, ['error' => 'Esta sección tiene músicos. Muévelos a otra sección o bórralos antes.']);
        }
        $db->prepare('DELETE FROM secciones WHERE id = :id')->execute([':id' => $id]);
        responder(200, ['secciones' => leerOrganigrama($db, $agr)]);
    }

    if ($accion === 'ordenar_secciones') {
        $agr = agrupacionValida($d['agrupacion'] ?? '');
        guardarOrden($db, 'secciones', 'agrupacion', $agr, $d['ids'] ?? null);
        responder(200, ['secciones' => leerOrganigrama($db, $agr)]);
    }

    // Músicos

    if ($accion === 'guardar_musico') {
        $m = $d['musico'] ?? null;
        if (!is_array($m)) responder(400, ['error' => 'Faltan los datos.']);

        $id        = (int)($m['id'] ?? 0);
        $seccionId = (int)($m['seccionId'] ?? 0);
        $agr       = agrupacionDeSeccion($db, $seccionId);
        if (!$agr) responder(404, ['error' => 'Esa sección ya no existe. Recarga la página.']);

        $nombre  = limpiar($m['nombre'] ?? '');
        $cargo   = limpiar($m['cargo'] ?? '');
        $activo  = !empty($m['activo']) ? 1 : 0;
        $errores = [];
        if ($nombre === '') $errores['nombre'] = 'Escribe el nombre y los apellidos.';
        elseif (mb_strlen($nombre) > 120) $errores['nombre'] = 'El nombre es demasiado largo.';
        if (mb_strlen($cargo) > 60) $errores['cargo'] = 'El cargo es demasiado largo (máximo 60 caracteres).';
        if ($errores) responder(422, ['error' => 'Revisa los campos marcados.', 'campos' => $errores]);

        // Siguiente posición libre en una sección (para añadir al final)
        $siguiente = $db->prepare('SELECT COALESCE(MAX(orden), 0) + 1 FROM musicos WHERE seccion_id = :s');

        if ($id) {
            $s = $db->prepare('SELECT seccion_id FROM musicos WHERE id = :id');
            $s->execute([':id' => $id]);
            $seccionActual = $s->fetchColumn();
            if ($seccionActual === false) responder(404, ['error' => 'Este músico ya no existe. Recarga la página.']);
            if (agrupacionDeSeccion($db, (int)$seccionActual) !== $agr) {
                responder(400, ['error' => 'Solo se puede cambiar de sección dentro de la misma agrupación.']);
            }

            if ((int)$seccionActual !== $seccionId) {
                // Cambia de sección: pasa al final de la nueva
                $siguiente->execute([':s' => $seccionId]);
                $db->prepare('UPDATE musicos SET seccion_id = :s, nombre = :n, cargo = :c, activo = :a, orden = :o WHERE id = :id')
                   ->execute([
                       ':s' => $seccionId, ':n' => $nombre, ':c' => $cargo ?: null, ':a' => $activo,
                       ':o' => (int)$siguiente->fetchColumn(), ':id' => $id,
                   ]);
            } else {
                $db->prepare('UPDATE musicos SET nombre = :n, cargo = :c, activo = :a WHERE id = :id')
                   ->execute([':n' => $nombre, ':c' => $cargo ?: null, ':a' => $activo, ':id' => $id]);
            }
        } else {
            $siguiente->execute([':s' => $seccionId]);
            $db->prepare('INSERT INTO musicos (seccion_id, nombre, cargo, orden, activo) VALUES (:s, :n, :c, :o, :a)')
               ->execute([
                   ':s' => $seccionId, ':n' => $nombre, ':c' => $cargo ?: null,
                   ':o' => (int)$siguiente->fetchColumn(), ':a' => $activo,
               ]);
        }
        responder(200, ['secciones' => leerOrganigrama($db, $agr)]);
    }

    if ($accion === 'borrar_musico') {
        $id = (int)($d['id'] ?? 0);
        $s  = $db->prepare('SELECT seccion_id FROM musicos WHERE id = :id');
        $s->execute([':id' => $id]);
        $seccionId = $s->fetchColumn();
        if ($seccionId === false) responder(404, ['error' => 'Este músico ya no existe. Recarga la página.']);
        $agr = agrupacionDeSeccion($db, (int)$seccionId);

        $db->prepare('DELETE FROM musicos WHERE id = :id')->execute([':id' => $id]);
        responder(200, ['secciones' => leerOrganigrama($db, $agr)]);
    }

    if ($accion === 'ordenar_musicos') {
        $seccionId = (int)($d['seccionId'] ?? 0);
        $agr       = agrupacionDeSeccion($db, $seccionId);
        if (!$agr) responder(404, ['error' => 'Esa sección ya no existe. Recarga la página.']);
        guardarOrden($db, 'musicos', 'seccion_id', $seccionId, $d['ids'] ?? null);
        responder(200, ['secciones' => leerOrganigrama($db, $agr)]);
    }

    responder(400, ['error' => 'Acción no válida.']);
} catch (Throwable $e) {
    if (isset($db) && $db->inTransaction()) $db->rollBack();
    responder(500, ['error' => 'No se ha podido completar la operación. Inténtalo de nuevo.']);
}