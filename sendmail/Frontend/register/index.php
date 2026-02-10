<?php
/**
 * Page Register
 * Formulaire de création de compte
 * Les données seront envoyées au Backend via AJAX
 */
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription - AutoSend Mail</title>
    <link rel="stylesheet" href="../assets/css/reset.css">
    <link rel="stylesheet" href="../assets/css/global.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="register-container">
        <div class="register-box">
            <!-- Logo/Titre -->
            <div class="register-header">
                <h1>AutoSend Mail</h1>
                <p>Créez votre compte</p>
            </div>
            
            <!-- Alertes -->
            <div id="alert-container"></div>
            
            <!-- Formulaire Register -->
            <form id="register-form" class="register-form">
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="firstname">
                            <i class="icon">✍️</i> Prénom
                        </label>
                        <input 
                            type="text" 
                            id="firstname" 
                            name="firstname" 
                            placeholder="Votre prénom"
                            required
                        >
                    </div>
                    
                    <div class="form-group">
                        <label for="lastname">
                            <i class="icon">✍️</i> Nom
                        </label>
                        <input 
                            type="text" 
                            id="lastname" 
                            name="lastname" 
                            placeholder="Votre nom"
                            required
                        >
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="email">
                        <i class="icon">✉️</i> Email
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="votre@email.com"
                        required
                    >
                </div>
                
                <div class="form-group">
                    <label for="username">
                        <i class="icon">👤</i> Utilisateur
                    </label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        placeholder="Nom d'utilisateur"
                        required
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
                        placeholder="Minimum 6 caractères"
                        required
                        minlength="6"
                    >
                </div>
                
                <div class="form-group">
                    <label for="password_confirm">
                        <i class="icon">🔒</i> Confirmer mot de passe
                    </label>
                    <input 
                        type="password" 
                        id="password_confirm" 
                        name="password_confirm" 
                        placeholder="Confirmez votre mot de passe"
                        required
                        minlength="6"
                    >
                </div>
                
                <button type="submit" class="btn btn-primary btn-register">
                    Créer mon compte
                </button>
            </form>
            
            <!-- Lien vers Login -->
            <div class="register-footer">
                <p>Vous avez déjà un compte ?</p>
                <a href="../login/" class="link-login">
                    Se connecter →
                </a>
            </div>
            
        </div>
    </div>
    
    <!-- Scripts -->
    <script src="../assets/js/utils.js"></script>
    <script src="script.js"></script>
</body>
</html>