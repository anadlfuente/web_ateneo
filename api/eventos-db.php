<?php
// Conexión a la base de datos, compartida por la API y el panel.

function config(): array {
    static $config = null;
    if ($config === null) {
        $config = file_exists(__DIR__ . '/eventos-config.php')
            ? require __DIR__ . '/eventos-config.php'
            : require __DIR__ . '/eventos-config.local.php';
    }
    return $config;
}

function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $c = config();
        $pdo = new PDO(
            "mysql:host={$c['db_host']};dbname={$c['db_name']};charset=utf8mb4",
            $c['db_user'],
            $c['db_pass'],
            [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]
        );
    }
    return $pdo;
}

// Agrupaciones válidas
const AGRUPACIONES = [
    'banda'    => 'Banda Sinfónica',
    'coral'    => 'Coral Cantares',
    'charanga' => 'New Charanga Paentamala',
    'claxon'   => 'Claxon Boys',
    'camara'   => 'Grupos de cámara',
    'ateneo'   => 'Ateneo Musical',
];

// Tipos de evento válidos
const TIPOS = [
    'concierto' => 'Concierto',
    'actuacion' => 'Actuación / pasacalles',
    'ensayo'    => 'Ensayo',
    'actividad' => 'Otra actividad',
];