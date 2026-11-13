<?php
// Mapa del sitio (sitemap.xml) para Google y Bing.
// El .htaccess hace que /sitemap.xml lo genere este archivo.
// Las páginas fijas están en la lista de abajo; las noticias publicadas se añaden solas.

require __DIR__ . '/eventos-db.php';

$siteUrl = rtrim(config()['site_url'] ?? 'https://ateneomusicalmieres.es', '/');

// Páginas fijas de la web. Si se crea o se borra una página, hay que tocar esta lista.
const PAGINAS_FIJAS = [
    '/',
    '/historia/',
    '/banda/historia/',
    '/banda/directores/',
    '/banda/organigrama/',
    '/coral/historia/',
    '/coral/director/',
    '/coral/organigrama/',
    '/charanga/',
    '/claxon/',
    '/calendar/',
    '/noticias/',
    '/galeria/',
    '/join/',
    '/contacto/',
    '/transparencia/',
    '/legal/',
];

$urls = array_map(fn($p) => ['loc' => $siteUrl . $p, 'lastmod' => null], PAGINAS_FIJAS);

try {
    $stmt = db()->query('SELECT slug, actualizado FROM noticias WHERE publicado = 1 ORDER BY fecha DESC');
    foreach ($stmt->fetchAll() as $n) {
        $urls[] = [
            'loc'     => $siteUrl . '/noticias/' . $n['slug'] . '/',
            'lastmod' => date('Y-m-d', strtotime($n['actualizado'])),
        ];
    }
} catch (Throwable $e) {
    // Si falla la base de datos, el mapa sale solo con las páginas fijas
}

header('Content-Type: application/xml; charset=utf-8');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as $u) {
    echo "  <url>\n    <loc>" . htmlspecialchars($u['loc'], ENT_XML1) . "</loc>\n";
    if ($u['lastmod']) {
        echo "    <lastmod>{$u['lastmod']}</lastmod>\n";
    }
    echo "  </url>\n";
}
echo "</urlset>\n";