<?php
// Configuración REAL del hosting (Hostinger). No se sube a GitHub.

return [
    'db_host' => 'localhost',
    'db_name' => 'u290061075_ateneo',   // el nombre exacto de Hostinger
    'db_user' => 'u290061075_admin',   // el usuario exacto de Hostinger
    'db_pass' => 'Miere$_2018_web',

    // La web y la API están en el mismo dominio, así que no hace falta CORS
    'cors_origins' => [],

    'admin_user'          => 'ateneo',
    'admin_password_hash' => '',

    'uploads_dir' => __DIR__ . '/../uploads/eventos',
    'uploads_url' => 'https://ateneomusicalmieres.es/uploads/eventos',
];