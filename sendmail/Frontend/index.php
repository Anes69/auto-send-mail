<?php
/**
 * Index.php - Racine de l'application
 * STATUT : DÉSACTIVÉ (En attente de mise en place de l'auth)
 * Ce fichier servira plus tard à rediriger automatiquement l'utilisateur.
 */

/* // --- BLOC DE REDIRECTION AUTOMATIQUE ---
// À réactiver quand les cookies d'authentification seront gérés par le Backend.

$token = isset($_COOKIE['auth_token']) ? $_COOKIE['auth_token'] : null;

if ($token) {
    // Utilisateur connecté → rediriger vers home
    header('Location: /home/', true, 302);
} else {
    // Utilisateur non connecté → rediriger vers login
    header('Location: /login/', true, 302);
}

exit;
// ---------------------------------------
*/

// Message temporaire pour tes tests
echo "<h1>Racine du projet SendMail</h1>";
echo "<p>La redirection automatique est actuellement <b>désactivée</b>.</p>";
echo "<p>Accéder au projet : <a href='/Frontend/login/'>Cliquer ici pour voir le Dashboard</a></p>";

?>