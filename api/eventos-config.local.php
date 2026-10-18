<?php
// Configuración para probar en LOCAL (XAMPP).
// En el hosting se creará aparte otro archivo, eventos-config.php, con los datos reales.

return [
    'db_host' => 'localhost',
    'db_name' => 'ateneo',
    'db_user' => 'root',
    'db_pass' => '',

    'cors_origins' => ['http://localhost:3000'],

    'admin_user'          => 'ateneo',
    'admin_password_hash' => '',

    'uploads_dir' => __DIR__ . '/../uploads/eventos',
    'uploads_url' => 'http://localhost:8000/uploads/eventos',
];