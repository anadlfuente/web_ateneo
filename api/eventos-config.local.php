<?php
// Configuración para probar en LOCAL (XAMPP).
// En el hosting se creará aparte otro archivo, eventos-config.php, con los datos reales.

return [
    'db_host' => 'localhost',
    'db_name' => 'ateneo',
    'db_user' => 'root',
    'db_pass' => '',

    'cors_origins' => ['http://localhost:3000'],

    // Dirección de la web (para enlaces completos en el mapa del sitio y al compartir)
    'site_url' => 'http://localhost:8000',
    'admin_user'          => 'ateneo',
    'admin_password_hash' => '$2y$12$qVnrpGGOsIMD3.DecbnFCuco1m91MgkAMH2Uzy4fDnlzX0Eolxmcy',

    'uploads_dir' => __DIR__ . '/../uploads/eventos',
    'uploads_url' => 'http://localhost:8000/uploads/eventos',
];