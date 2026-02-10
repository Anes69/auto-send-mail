/**
 * Fonctions Utilitaires Globales
 * Utilisées dans toute l'application
 */

/**
 * Effectuer un appel API
 * @param {string} method - Méthode HTTP (GET, POST, PUT, DELETE)
 * @param {string} endpoint - URL de l'endpoint Backend
 * @param {object} data - Données à envoyer
 * @returns {Promise}
 */
async function apiCall(method, endpoint, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    // Ajouter le token d'authentification si disponible
    const token = localStorage.getItem('auth_token');
    if (token) {
        options.headers['Authorization'] = 'Bearer ' + token;
    }
    
    // Ajouter le corps pour POST/PUT
    if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(endpoint, options);
        
        // Gestion du statut 401 (non authentifié)
        if (response.status === 401) {
            localStorage.removeItem('auth_token');
            window.location.href = '../login/';
            return;
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erreur API:', error);
        throw error;
    }
}

/**
 * Formatter une date
 * @param {string} date - Date en string
 * @returns {string}
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
}

/**
 * Formatter une heure
 * @param {string} time - Heure en string
 * @returns {string}
 */
function formatTime(time) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(time).toLocaleTimeString('fr-FR', options);
}

/**
 * Afficher une notification
 * @param {string} type - Type (success, error, warning, info)
 * @param {string} message - Message
 * @param {number} duration - Durée en ms
 */
function notify(type, message, duration = 3000) {
    const container = document.getElementById('alert-container');
    if (!container) return;
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <span>${message}</span>
        <button class="close-btn">&times;</button>
    `;
    
    container.appendChild(alertDiv);
    
    // Fermer au clic
    alertDiv.querySelector('.close-btn').addEventListener('click', () => {
        alertDiv.remove();
    });
    
    // Fermer automatiquement
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, duration);
}

/**
 * Vérifier si l'utilisateur est connecté
 * @returns {boolean}
 */
function isAuthenticated() {
    return !!localStorage.getItem('auth_token');
}

/**
 * Rediriger vers une page
 * @param {string} path - Chemin relatif
 */
function redirect(path) {
    window.location.href = path;
}

/**
 * Confirm dialog personnalisé
 * @param {string} message - Message
 * @returns {Promise}
 */
function confirmDialog(message) {
    return new Promise((resolve) => {
        if (confirm(message)) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
}