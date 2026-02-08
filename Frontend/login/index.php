<?php
/**
 * Page Login
 * Formulaire de connexion simple
 * Les données seront envoyées au Backend via AJAX
 */
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - AutoSend Mail</title>
    <link rel="stylesheet" href="../assets/css/reset.css">
    <link rel="stylesheet" href="../assets/css/global.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="login-container">
        <div class="login-box">
            <!-- Logo/Titre -->
            <div class="login-header">
                <h1>AutoSend Mail</h1>
                <p>Connectez-vous à votre compte</p>
            </div>
            
            <!-- Alertes -->
            <div id="alert-container"></div>
            
            <!-- Formulaire Login -->
            <form id="login-form" class="login-form">
                
                <div class="form-group">
                    <label for="username">
                        <i class="icon">👤</i> Utilisateur
                    </label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        placeholder="Entrez votre nom d'utilisateur"
                        required
                        autocomplete="username"
                    >
                </div>
                
                <div class="form-group">
                    <label for="password">
                        <i class="icon">🔒</i> Mot de passe
                    </label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Entrez votre mot de passe"
                        required
                        autocomplete="current-password"
                    >
                </div>
                
                <button type="submit" class="btn btn-primary btn-login">
                    Se connecter
                </button>
            </form>
            
            <!-- Lien vers Register -->
            <div class="login-footer">
                <p>Pas encore de compte ?</p>
                <a href="../register/" class="link-register">
                    Créer un compte →
                </a>
            </div>
            
        </div>
    </div>
    
    <!-- Scripts -->
    <script src="../assets/js/utils.js"></script>
    <script src="script.js"></script>
</body>
</html>