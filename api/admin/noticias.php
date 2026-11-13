<?php
// Panel: gestión de noticias. Todo exige haber iniciado sesión.
//
//   GET  noticias.php        → todas las noticias (también borradores), sin el cuerpo
//   GET  noticias.php?id=5   → una noticia completa, para editarla
//   POST {"accion":"guardar",  "noticia":{...}}            → crea (sin id) o guarda cambios (con id)
//   POST {"accion":"publicar", "id":5, "publicado":true}   → publica o pasa a borrador
//   POST {"accion":"borrar",   "id":5}                     → borra

require __DIR__ . '/_sesion.php';

const CATEGORIAS = ['Logros', 'Noticias', 'Prensa', 'Conciertos'];

const AGRUPACIONES_NOTICIAS = [
    'banda-sinfonica',
    'coral-cantares',
    'charanga-new-paentamala',
    'claxon-boys',
    'grupos-camara',
];

// Direcciones que no puede tener una noticia porque ya las usa la web
const SLUGS_RESERVADOS = ['ver'];

exigirSesion();

// ── Funciones de ayuda ───────────────────────────────────────

// Quita espacios de los extremos y caracteres invisibles raros (deja los saltos de línea)
function limpiar($valor): string {
    if (!is_string($valor)) return '';
    return trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $valor) ?? '');
}

function esFecha($v): bool {
    return is_string($v)
        && preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $v, $m)
        && checkdate((int)$m[2], (int)$m[3], (int)$m[1]);
}

function esUrl($v): bool {
    return is_string($v) && strlen($v) <= 500 && preg_match('#^https?://\S+$#i', $v);
}

// Foto de la propia web: "/uploads/noticias/2026/11/abc.webp", "/banda/Marco.JPG"...
function esRutaImagen($v): bool {
    return is_string($v)
        && strlen($v) <= 255
        && strpos($v, '..') === false
        && preg_match('#^/[A-Za-z0-9/_\-. ]+\.(jpe?g|png|webp|gif|avif)$#i', $v);
}

// "Lotería de Navidad 2026" → "loteria-de-navidad-2026"
function crearSlug(string $texto): string {
    $t = mb_strtolower($texto, 'UTF-8');
    $t = strtr($t, [
        'á' => 'a', 'à' => 'a', 'ä' => 'a', 'â' => 'a',
        'é' => 'e', 'è' => 'e', 'ë' => 'e', 'ê' => 'e',
        'í' => 'i', 'ì' => 'i', 'ï' => 'i', 'î' => 'i',
        'ó' => 'o', 'ò' => 'o', 'ö' => 'o', 'ô' => 'o',
        'ú' => 'u', 'ù' => 'u', 'ü' => 'u', 'û' => 'u',
        'ñ' => 'n', 'ç' => 'c',
    ]);
    $t = preg_replace('/[^a-z0-9]+/', '-', $t);
    return trim(substr(trim($t, '-'), 0, 120), '-');
}

// Comprueba todos los campos. Devuelve [fila para la base de datos, errores por campo]
function validarNoticia(array $d): array {
    $e = [];

    $titulo = limpiar($d['titulo'] ?? '');
    if ($titulo === '') $e['titulo'] = 'Escribe el título.';
    elseif (mb_strlen($titulo) > 255) $e['titulo'] = 'El título es demasiado largo (máximo 255 caracteres).';

    $slug = crearSlug(limpiar($d['slug'] ?? '') ?: $titulo);
    if ($slug === '') $e['slug'] = 'La dirección de la noticia no puede quedar vacía.';
    elseif (in_array($slug, SLUGS_RESERVADOS, true)) $e['slug'] = 'Esa dirección está reservada. Elige otra.';

    $resumen = limpiar($d['resumen'] ?? '');
    if ($resumen === '') $e['resumen'] = 'Escribe un resumen de una o dos frases.';
    elseif (mb_strlen($resumen) > 500) $e['resumen'] = 'El resumen es demasiado largo (máximo 500 caracteres).';

    $fecha = $d['fecha'] ?? '';
    if (!esFecha($fecha)) $e['fecha'] = 'Elige una fecha válida.';

    $autor = limpiar($d['autor'] ?? '');
    if (mb_strlen($autor) > 120) $e['autor'] = 'El nombre del autor es demasiado largo.';

    $categoria = $d['categoria'] ?? '';
    if (!in_array($categoria, CATEGORIAS, true)) $e['categoria'] = 'Elige una categoría.';

    $imagen    = limpiar($d['imagen'] ?? '');
    $imagenAlt = limpiar($d['imagenAlt'] ?? '');
    $pie       = limpiar($d['pieImagen'] ?? '');
    if ($imagen !== '' && !esRutaImagen($imagen)) $e['imagen'] = 'La foto principal no es válida.';
    if ($imagen !== '' && $imagenAlt === '') $e['imagenAlt'] = 'Describe la foto principal (para quien no puede verla).';
    if (mb_strlen($imagenAlt) > 255) $e['imagenAlt'] = 'La descripción de la foto es demasiado larga.';
    if (mb_strlen($pie) > 255) $e['pieImagen'] = 'El pie de foto es demasiado largo.';

    $lado = ($d['imagenLado'] ?? '') === 'izquierda' ? 'izquierda' : 'derecha';

    $agrupaciones = array_values(array_unique(array_filter(
        is_array($d['agrupaciones'] ?? null) ? $d['agrupaciones'] : [],
        fn($a) => in_array($a, AGRUPACIONES_NOTICIAS, true)
    )));

    $publicado = !empty($d['publicado']);

    // ── Bloques del cuerpo ──
    $bloques = [];
    $lista = is_array($d['contenido'] ?? null) ? array_values($d['contenido']) : [];
    if (count($lista) > 200) $e['contenido'] = 'La noticia tiene demasiados bloques.';

    foreach ($lista as $i => $b) {
        $n    = $i + 1;
        $b    = is_array($b) ? $b : [];
        $tipo = $b['tipo'] ?? '';
        $txt  = limpiar($b['texto'] ?? '');

        switch ($tipo) {
            case 'parrafo':
            case 'subtitulo':
                if ($txt === '') $e["contenido.$i"] = "El bloque $n está vacío.";
                elseif (mb_strlen($txt) > 5000) $e["contenido.$i"] = "El bloque $n es demasiado largo.";
                else $bloques[] = ['tipo' => $tipo, 'texto' => $txt];
                break;

            case 'cita':
                $autorCita = limpiar($b['autor'] ?? '');
                if ($txt === '') $e["contenido.$i"] = "La cita del bloque $n está vacía.";
                else $bloques[] = array_filter(['tipo' => 'cita', 'texto' => $txt, 'autor' => $autorCita]);
                break;

            case 'imagen':
                $src = limpiar($b['src'] ?? '');
                $alt = limpiar($b['alt'] ?? '');
                $pieB = limpiar($b['pie'] ?? '');
                if (!esRutaImagen($src)) $e["contenido.$i"] = "Falta la foto del bloque $n.";
                elseif ($alt === '') $e["contenido.$i"] = "Describe la foto del bloque $n (para quien no puede verla).";
                else $bloques[] = array_filter(['tipo' => 'imagen', 'src' => $src, 'alt' => $alt, 'pie' => $pieB]);
                break;

            case 'enlace':
                $url = limpiar($b['url'] ?? '');
                if (!esUrl($url)) $e["contenido.$i"] = "El enlace del bloque $n tiene que empezar por https://";
                elseif ($txt === '') $e["contenido.$i"] = "Escribe el texto del botón del bloque $n.";
                else $bloques[] = ['tipo' => 'enlace', 'url' => $url, 'texto' => $txt];
                break;

            default:
                $e["contenido.$i"] = "El bloque $n no es válido.";
        }
    }
    if ($publicado && !$bloques && empty($e['contenido'])) {
        $e['contenido'] = 'Añade al menos un párrafo antes de publicar.';
    }

    // ── Fuentes ──
    $fuentes = [];
    $listaF = is_array($d['fuentes'] ?? null) ? array_values($d['fuentes']) : [];
    foreach ($listaF as $i => $f) {
        $n     = $i + 1;
        $f     = is_array($f) ? $f : [];
        $medio = limpiar($f['medio'] ?? '');
        $url   = limpiar($f['url'] ?? '');
        $fF    = $f['fecha'] ?? '';
        if ($medio === '') $e["fuentes.$i"] = "Escribe el nombre del medio de la fuente $n.";
        elseif (!esUrl($url)) $e["fuentes.$i"] = "El enlace de la fuente $n tiene que empezar por https://";
        elseif ($fF !== '' && $fF !== null && !esFecha($fF)) $e["fuentes.$i"] = "La fecha de la fuente $n no es válida.";
        else $fuentes[] = array_filter(['medio' => $medio, 'url' => $url, 'fecha' => $fF ?: null]);
    }

    $fila = [
        'slug'         => $slug,
        'titulo'       => $titulo,
        'resumen'      => $resumen,
        'fecha'        => $fecha,
        'autor'        => $autor ?: null,
        'categoria'    => $categoria,
        'imagen'       => $imagen ?: null,
        'imagen_alt'   => $imagenAlt ?: null,
        'imagen_lado'  => $lado,
        'pie_imagen'   => $pie ?: null,
        'contenido'    => json_encode($bloques, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        'fuentes'      => $fuentes ? json_encode($fuentes, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null,
        'agrupaciones' => implode(',', $agrupaciones),
        'destacada'    => !empty($d['destacada']) ? 1 : 0,
        'publicado'    => $publicado ? 1 : 0,
    ];

    return [$fila, $e];
}

// Fila de la base de datos → formato que usa el panel
function formatearParaPanel(array $n): array {
    return [
        'id'           => (int)$n['id'],
        'slug'         => $n['slug'],
        'titulo'       => $n['titulo'],
        'resumen'      => $n['resumen'],
        'fecha'        => $n['fecha'],
        'autor'        => $n['autor'],
        'categoria'    => $n['categoria'],
        'imagen'       => $n['imagen'],
        'imagenAlt'    => $n['imagen_alt'],
        'imagenLado'   => $n['imagen_lado'],
        'pieImagen'    => $n['pie_imagen'],
        'contenido'    => json_decode($n['contenido'], true) ?: [],
        'fuentes'      => $n['fuentes'] ? (json_decode($n['fuentes'], true) ?: []) : [],
        'agrupaciones' => $n['agrupaciones'] === '' ? [] : explode(',', $n['agrupaciones']),
        'destacada'    => (bool)$n['destacada'],
        'publicado'    => (bool)$n['publicado'],
        'actualizado'  => $n['actualizado'],
    ];
}

// ── Peticiones ───────────────────────────────────────────────

try {
    $db = db();

    // ── Leer ──
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'GET') {
        if (!empty($_GET['id'])) {
            $stmt = $db->prepare('SELECT * FROM noticias WHERE id = :id');
            $stmt->execute([':id' => (int)$_GET['id']]);
            $fila = $stmt->fetch();
            if (!$fila) responder(404, ['error' => 'Esta noticia ya no existe.']);
            responder(200, ['noticia' => formatearParaPanel($fila)]);
        }

        $filas = $db->query(
            'SELECT id, slug, titulo, fecha, categoria, publicado, destacada, actualizado
             FROM noticias ORDER BY fecha DESC, id DESC'
        )->fetchAll();

        responder(200, ['noticias' => array_map(fn($n) => [
            'id'          => (int)$n['id'],
            'slug'        => $n['slug'],
            'titulo'      => $n['titulo'],
            'fecha'       => $n['fecha'],
            'categoria'   => $n['categoria'],
            'publicado'   => (bool)$n['publicado'],
            'destacada'   => (bool)$n['destacada'],
            'actualizado' => $n['actualizado'],
        ], $filas)]);
    }

    // ── Cambiar: hace falta además el código anti-envíos falsos ──
    exigirMetodo('POST');
    exigirCsrf();
    $datos  = leerJson();
    $accion = $datos['accion'] ?? '';

    // Comprueba que existe una noticia con ese id
    $existe = function (int $id) use ($db): bool {
        $s = $db->prepare('SELECT 1 FROM noticias WHERE id = :id');
        $s->execute([':id' => $id]);
        return (bool)$s->fetchColumn();
    };

    if ($accion === 'guardar') {
        $n = $datos['noticia'] ?? null;
        if (!is_array($n)) responder(400, ['error' => 'Faltan los datos de la noticia.']);
        $id = (int)($n['id'] ?? 0);

        if ($id && !$existe($id)) responder(404, ['error' => 'Esta noticia ya no existe.']);

        [$fila, $errores] = validarNoticia($n);

        if (empty($errores['slug'])) {
            $s = $db->prepare('SELECT 1 FROM noticias WHERE slug = :slug AND id <> :id');
            $s->execute([':slug' => $fila['slug'], ':id' => $id]);
            if ($s->fetchColumn()) {
                $errores['slug'] = 'Ya hay otra noticia con esta dirección. Cambia el título o la dirección.';
            }
        }

        if ($errores) {
            responder(422, ['error' => 'Revisa los campos marcados.', 'campos' => $errores]);
        }

        $columnas = array_keys($fila);
        $valores  = [];
        foreach ($fila as $col => $val) $valores[":$col"] = $val;

        if ($id) {
            $sets = implode(', ', array_map(fn($c) => "$c = :$c", $columnas));
            $valores[':id'] = $id;
            $db->prepare("UPDATE noticias SET $sets WHERE id = :id")->execute($valores);
        } else {
            $cols   = implode(', ', $columnas);
            $marcas = implode(', ', array_map(fn($c) => ":$c", $columnas));
            $db->prepare("INSERT INTO noticias ($cols) VALUES ($marcas)")->execute($valores);
            $id = (int)$db->lastInsertId();
        }

        responder(200, ['id' => $id, 'slug' => $fila['slug'], 'publicado' => (bool)$fila['publicado']]);
    }

    if ($accion === 'publicar') {
        $id = (int)($datos['id'] ?? 0);
        if (!$id || !$existe($id)) responder(404, ['error' => 'Esta noticia ya no existe.']);
        $publicado = !empty($datos['publicado']);

        if ($publicado) {
            $s = $db->prepare('SELECT contenido FROM noticias WHERE id = :id');
            $s->execute([':id' => $id]);
            if (!(json_decode((string)$s->fetchColumn(), true) ?: [])) {
                responder(422, ['error' => 'Añade al menos un párrafo antes de publicar.']);
            }
        }

        $db->prepare('UPDATE noticias SET publicado = :p WHERE id = :id')
           ->execute([':p' => $publicado ? 1 : 0, ':id' => $id]);
        responder(200, ['id' => $id, 'publicado' => $publicado]);
    }

    if ($accion === 'borrar') {
        $id = (int)($datos['id'] ?? 0);
        if (!$id || !$existe($id)) responder(404, ['error' => 'Esta noticia ya no existe.']);
        $db->prepare('DELETE FROM noticias WHERE id = :id')->execute([':id' => $id]);
        responder(200, ['id' => $id, 'borrada' => true]);
    }

    responder(400, ['error' => 'Acción no válida.']);
} catch (Throwable $e) {
    responder(500, ['error' => 'No se ha podido completar la operación. Inténtalo de nuevo.']);
}