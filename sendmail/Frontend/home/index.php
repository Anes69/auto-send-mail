<?php
/**
 * Home - Dashboard Principal
 * Sidebar collapsible (NE PAS TOUCHER)
 * Folder UI (tabs) + contenu injecté (sans reload)
 */

// TODO: Récupérer les données utilisateur depuis la BDD
$username = "Anes69";
$userEmails = [
    ['email' => 'anes@example.com', 'checked' => true],
    ['email' => 'contact@sendmail.io', 'checked' => false],
    ['email' => 'pro@company.fr', 'checked' => false],
];

/**
 * Onglets (ordre imposé)
 * - id: identifiant logique
 * - label: texte affiché
 * - partial: fichier inclus côté serveur (HTML partiel / fragment)
 */
$tabs = [
    [
        'id' => 'campagnes',
        'label' => 'Campagnes',
        'partial' => __DIR__ . '/campagnes/campagne.php',
    ],
    [
        'id' => 'templates',
        'label' => 'Templates',
        'partial' => __DIR__ . '/templates/templates.php',
    ],
    [
        'id' => 'tableau',
        'label' => 'Tableau',
        'partial' => __DIR__ . '/tableau/tableau.php',
    ],
    [
        'id' => 'calendrier',
        'label' => 'Calendrier',
        'partial' => __DIR__ . '/calendrier/calendrier.php',
    ],
    [
        'id' => 'compte',
        'label' => 'Compte',
        'partial' => __DIR__ . '/compte/compte.php',
    ],
];

// onglet actif par défaut
$defaultTabId = 'campagnes';

// (optionnel) autoriser un chargement initial via ?tab=...
$requestedTabId = isset($_GET['tab']) ? (string) $_GET['tab'] : $defaultTabId;

// sécuriser: tab doit exister
$tabIds = array_column($tabs, 'id');
$activeTabId = in_array($requestedTabId, $tabIds, true) ? $requestedTabId : $defaultTabId;

// retrouver le partial du tab actif
$activeTab = null;
foreach ($tabs as $t) {
    if ($t['id'] === $activeTabId) {
        $activeTab = $t;
        break;
    }
}
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

    <!-- ===================================================== -->
    <!-- SIDEBAR (INTOUCHABLE)                                 -->
    <!-- ===================================================== -->
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-top">
            <div class="sidebar-logo">
                <span class="sidebar-logo-icon">📧</span>
                <span class="sidebar-logo-text">SendMail</span>
            </div>
            <div class="sidebar-user">
                <span class="user-name"><?= htmlspecialchars($username) ?></span>
            </div>
        </div>

        <div class="sidebar-middle">
            <div class="user-emails">
                <span class="emails-label">Comptes email</span>
                <?php foreach (array_slice($userEmails, 0, 3) as $mail): ?>
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

        <button class="sidebar-toggle" id="sidebarToggle" title="Réduire / Étendre">
            <span class="toggle-arrow">◀</span>
        </button>
    </aside>

    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <!-- ===================================================== -->
    <!-- WORKSPACE (ZONE FOLDER UI)                            -->
    <!-- ===================================================== -->
    <main class="main-content" id="mainContent">

        <section class="workspace" id="workspace">

            <!-- =============================== -->
            <!-- FOLDER TABS (ordre imposé)      -->
            <!-- =============================== -->
            <nav class="folder-tabs" id="folderTabs" aria-label="Navigation dossier">
                <?php foreach ($tabs as $tab): ?>
                    <button
                        type="button"
                        class="folder-tab<?= $tab['id'] === $activeTabId ? ' is-active' : '' ?>"
                        data-tab="<?= htmlspecialchars($tab['id']) ?>"
                        aria-selected="<?= $tab['id'] === $activeTabId ? 'true' : 'false' ?>"
                    >
                        <?= htmlspecialchars($tab['label']) ?>
                    </button>
                <?php endforeach; ?>
            </nav>

            <!-- =============================== -->
            <!-- FOLDER PANEL (content)          -->
            <!-- =============================== -->
            <section class="folder-panel" id="folderPanel">
                <div class="folder-panel-inner" id="folderContent">
                    <?php
                    // rendu initial (1er chargement)
                    if ($activeTab && is_file($activeTab['partial'])) {
                        include $activeTab['partial'];
                    } else {
                        echo "<p>Onglet introuvable ou non configuré.</p>";
                    }
                    ?>
                </div>
            </section>

        </section>
    </main>

    <script src="../assets/js/utils.js"></script>
    <script src="script.js"></script>
</body>
</html>