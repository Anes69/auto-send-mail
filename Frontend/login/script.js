/**
 * Login Script
 * Gestion du formulaire de connexion
 * Envoie les données au Backend
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    
    // Écouter la soumission du formulaire
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Récupérer les données
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        // Validation côté client (UX)
        if (!username || !password) {
            showAlert('error', 'Veuillez remplir tous les champs');
            return;
        }
        
        // Désactiver le bouton pendant l'envoi
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Connexion en cours...';
        
        try {
            // Préparer les données
            const data = {
                username: username,
                password: password
            };
            
            // Envoyer au Backend
            // À remplacer par l'URL réelle du Backend
            const response = await fetch('/Backend/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showAlert('success', 'Connexion réussie ! Redirection...');
                
                // Stocker le token si disponible
                if (result.token) {
                    localStorage.setItem('auth_token', result.token);
                }
                
                // Rediriger vers home après 1.5 secondes
                setTimeout(() => {
                    window.location.href = '../home/';
                }, 1500);
            } else {
                showAlert('error', result.message || 'Identifiants incorrects');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Se connecter';
            }
        } catch (error) {
            console.error('Erreur:', error);
            showAlert('error', 'Erreur serveur. Veuillez réessayer.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Se connecter';
        }
    });
});

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