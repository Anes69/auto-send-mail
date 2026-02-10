/**
 * Register Script
 * Gestion du formulaire d'inscription
 * Envoie les données au Backend
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    
    // Écouter la soumission du formulaire
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Récupérer les données
        const firstname = document.getElementById('firstname').value.trim();
        const lastname = document.getElementById('lastname').value.trim();
        const email = document.getElementById('email').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const password_confirm = document.getElementById('password_confirm').value;
        
        // Validation côté client (UX)
        if (!firstname || !lastname || !email || !username || !password || !password_confirm) {
            showAlert('error', 'Veuillez remplir tous les champs');
            return;
        }
        
        if (password.length < 6) {
            showAlert('error', 'Le mot de passe doit contenir au moins 6 caractères');
            return;
        }
        
        if (password !== password_confirm) {
            showAlert('error', 'Les mots de passe ne correspondent pas');
            return;
        }
        
        if (!validateEmail(email)) {
            showAlert('error', 'Veuillez entrer une adresse email valide');
            return;
        }
        
        // Désactiver le bouton pendant l'envoi
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Création en cours...';
        
        try {
            // Préparer les données
            const data = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
                password: password
            };
            
            // Envoyer au Backend
            // À remplacer par l'URL réelle du Backend
            const response = await fetch('/Backend/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showAlert('success', 'Compte créé avec succès ! Redirection vers connexion...');
                
                // Rediriger vers login après 2 secondes
                setTimeout(() => {
                    window.location.href = '../login/';
                }, 2000);
            } else {
                showAlert('error', result.message || 'Erreur lors de la création du compte');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Créer mon compte';
            }
        } catch (error) {
            console.error('Erreur:', error);
            showAlert('error', 'Erreur serveur. Veuillez réessayer.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Créer mon compte';
        }
    });
});

/**
 * Valider une adresse email
 * @param {string} email - Email à valider
 * @returns {boolean}
 */
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Afficher une alerte
 * @param {string} type - Type d'alerte (success, error, warning, info)
 * @param {string} message - Message à afficher
 */
function showAlert(type, message) {
    const container = document.getElementById('alert-container');
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <span>${message}</span>
        <button class="close-btn">&times;</button>
    `;
    
    // Vider les anciennes alertes
    container.innerHTML = '';
    container.appendChild(alertDiv);
    
    // Scroller vers l'alerte
    alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Fermer l'alerte au clic
    alertDiv.querySelector('.close-btn').addEventListener('click', () => {
        alertDiv.remove();
    });
    
    // Fermer automatiquement après 5 secondes
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}