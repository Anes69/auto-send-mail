<?php
/**
 * Home - Dashboard Principal
 * Sidebar collapsible
 * Application AutoSend Mail
 */

// TODO: Récupérer les données utilisateur depuis la BDD
$username = "Anes69";
$userEmails = [
    ['email' => 'anes@example.com', 'checked' => true],
    ['email' => 'contact@sendmail.io', 'checked' => false],
    ['email' => 'pro@company.fr', 'checked' => false],
];
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - AutoSend Mail</title>
    <link rel="stylesheet" href="../assets/css/reset.css">
    <link rel="stylesheet" href="../assets/css/global.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- ============================== -->
    <!-- SIDEBAR                        -->
    <!-- ============================== -->
    <aside class="sidebar" id="sidebar">

        <!-- ===== TOP: Logo + User ===== -->
        <div class="sidebar-top">
            <!-- Logo -->
            <div class="sidebar-logo">
                <span class="sidebar-logo-icon">📧</span>
                <span class="sidebar-logo-text">SendMail</span>
            </div>

            <!-- User (nom seulement) -->
            <div class="sidebar-user">
                <span class="user-name"><?= htmlspecialchars($username) ?></span>
            </div>
        </div>

        <!-- ===== MIDDLE: Comptes email ===== -->
        <div class="sidebar-middle">
            <div class="user-emails">
                <span class="emails-label">Comptes email</span>
                <?php foreach (array_slice($userEmails, 0, 3) as $i => $mail): ?>
                    <label class="email-item" title="<?= htmlspecialchars($mail['email']) ?>">
                        <input
                            type="radio"
                            name="email_active"
                            value="<?= htmlspecialchars($mail['email']) ?>"
                            <?= $mail['checked'] ? 'checked' : '' ?>
                        >
                        <span class="email-radiomark"></span>
                        <span class="email-text"><?= htmlspecialchars($mail['email']) ?></span>
                    </label>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- ===== BOTTOM: Paramètres + Déconnexion ===== -->
        <div class="sidebar-footer">
            <a href="#" class="sidebar-footer-btn btn-settings" title="Paramètres">
                <span class="footer-icon">⚙️</span>
                <span class="footer-text">Paramètres</span>
            </a>
            <a href="../login/" class="sidebar-footer-btn btn-logout" title="Déconnexion">
                <span class="footer-icon">🚪</span>
                <span class="footer-text">Déconnexion</span>
            </a>
        </div>

        <!-- Toggle Button (cercle au bord droit) -->
        <button class="sidebar-toggle" id="sidebarToggle" title="Réduire / Étendre">
            <span class="toggle-arrow">◀</span>
        </button>
    </aside>

    <!-- ============================== -->
    <!-- MOBILE OVERLAY                 -->
    <!-- ============================== -->
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <!-- ============================== -->
    <!-- MAIN CONTENT                   -->
    <!-- ============================== -->
    <main class="main-content" id="mainContent">
        <!-- Contenu injecté par les sous-pages -->
    </main>

    <!-- Scripts -->
    <script src="../assets/js/utils.js"></script>
    <script src="script.js"></script>
</body>
</html>