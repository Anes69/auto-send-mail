/**
 * Gestion des onglets (folder tabs)
 * Chargement AJAX du contenu sans rechargement de page
 */

(function() {
    'use strict';

    // Sélecteurs
    const folderTabs = document.getElementById('folderTabs');
    const folderContent = document.getElementById('folderContent');
    const tabButtons = document.querySelectorAll('.folder-tab');

    // Mapping des onglets vers leurs fichiers partiels
    const tabPartials = {
        'campagnes': 'folder/campagnes/campagne.php',
        'templates': 'folder/templates/templates.php',
        'tableau': 'folder/tableau/tableau.php',
        'calendrier': 'folder/calendrier/calendrier.php',
        'compte': 'folder/compte/compte.php'
    };

    /**
     * Charge le contenu d'un onglet via AJAX
     * @param {string} tabId - ID de l'onglet à charger
     */
    function loadTabContent(tabId) {
        const partial = tabPartials[tabId];
        
        if (!partial) {
            console.error(`Onglet inconnu: ${tabId}`);
            return;
        }

        // Afficher un loader pendant le chargement
        folderContent.innerHTML = '<div class="loading">Chargement...</div>';

        // Requête AJAX
        fetch(partial)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                folderContent.innerHTML = html;
            })
            .catch(error => {
                console.error('Erreur lors du chargement:', error);
                folderContent.innerHTML = `
                    <div class="error">
                        <p>❌ Erreur de chargement</p>
                        <p>${error.message}</p>
                    </div>
                `;
            });
    }

    /**
     * Met à jour l'état visuel des onglets
     * @param {HTMLElement} activeButton - Bouton actif
     */
    function updateTabState(activeButton) {
        // Retirer la classe active de tous les onglets
        tabButtons.forEach(btn => {
            btn.classList.remove('is-active');
            btn.setAttribute('aria-selected', 'false');
        });

        // Activer l'onglet cliqué
        activeButton.classList.add('is-active');
        activeButton.setAttribute('aria-selected', 'true');
    }

    /**
     * Gestion du clic sur un onglet
     */
    function handleTabClick(event) {
        const button = event.currentTarget;
        const tabId = button.getAttribute('data-tab');

        // Mettre à jour l'état visuel
        updateTabState(button);

        // Charger le contenu
        loadTabContent(tabId);

        // Optionnel: mettre à jour l'URL sans recharger la page
        if (history.pushState) {
            const newUrl = `${window.location.pathname}?tab=${tabId}`;
            history.pushState({ tab: tabId }, '', newUrl);
        }
    }

    /**
     * Initialisation des événements
     */
    function init() {
        tabButtons.forEach(button => {
            button.addEventListener('click', handleTabClick);
        });

        // Gestion du bouton retour du navigateur
        window.addEventListener('popstate', function(event) {
            if (event.state && event.state.tab) {
                const button = document.querySelector(`[data-tab="${event.state.tab}"]`);
                if (button) {
                    updateTabState(button);
                    loadTabContent(event.state.tab);
                }
            }
        });
    }

    // Lancer l'initialisation quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();