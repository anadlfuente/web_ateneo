<?php
// Funciones comunes para comprobar lo que llega de los formularios del panel.
// Las usan noticias.php y eventos.php. No se abre desde el navegador (lo bloquea el .htaccess).

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