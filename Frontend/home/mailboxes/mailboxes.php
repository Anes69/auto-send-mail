<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Sendmail</title>
    <link rel="stylesheet" href="../style/reset.css">
    <link rel="stylesheet" href="../style/login.css">
</head>

<body>
    <div class="main">
        <h1>Autosend Mail</h1>
        <h3>Entrez vos identifiants de connexion</h3>

        <form action="">
            <label for="first">
                Utilisateur :
            </label>
            <input type="text" id="first" name="first" placeholder="Entrez votre nom d'utilisateur" required>

            <label for="password">
                Mot de passe :
            </label>
            <input type="password" id="password" name="password" placeholder="Entrez votre mot de passe" required>

            <div class="wrap">
                <button type="submit">
                    Envoyer
                </button>
            </div>
        </form>

        <p>Pas de compte ?
            <a href="#" style="text-decoration: none;">
                Créer un compte
            </a>
        </p>
    </div>
</body>


</html>