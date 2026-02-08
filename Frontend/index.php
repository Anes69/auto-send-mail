<?php
/**
 * Index.php - Racine de l'application
 * Vérifie si l'utilisateur est connecté et redirige en conséquence
 */

// Vérifier si le token d'authentification existe
$token = isset($_COOKIE['auth_token']) ? $_COOKIE['auth_token'] : null;

if ($token) {
    // Utilisateur connecté → rediriger vers home
    header('Location: /home/', true, 302);
} else {
    // Utilisateur non connecté → rediriger vers login
    header('Location: /login/', true, 302);
}

exit;
?>