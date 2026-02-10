/**
 * script.js - Sidebar Home
 * Gestion sidebar collapsible + sélection email
 * AutoSend Mail
 */

(function () {
    'use strict';

    /* ==========================================
       DOM ELEMENTS
       ========================================== */
    const sidebar       = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const overlay       = document.getElementById('sidebarOverlay');

    /* ==========================================
       CONSTANTS
       ========================================== */
    const STORAGE_KEY_COLLAPSED = 'sidebar_collapsed';
    const STORAGE_KEY_EMAIL     = 'active_email';
    const MOBILE_BREAKPOINT     = 768;

    /* ==========================================
       HELPERS
       ========================================== */

    function isMobile() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }

    function saveState(key, value) {
        try { localStorage.setItem(key, value); }
        catch (e) { console.warn('localStorage indisponible:', e); }
    }

    function getState(key, fallback) {
        try { return localStorage.getItem(key) || fallback; }
        catch (e) { return fallback; }
    }

    /* ==========================================
       SIDEBAR: COLLAPSE / EXPAND (desktop)
       ========================================== */

    function collapseSidebar() {
        sidebar.classList.add('collapsed');
        saveState(STORAGE_KEY_COLLAPSED, 'true');
    }

    function expandSidebar() {
        sidebar.classList.remove('collapsed');
        saveState(STORAGE_KEY_COLLAPSED, 'false');
    }

    function toggleSidebar() {
        if (isMobile()) return;
        if (sidebar.classList.contains('collapsed')) {
            expandSidebar();
        } else {
            collapseSidebar();
        }
    }

    function restoreSidebarState() {
        if (isMobile()) {
            sidebar.classList.add('collapsed');
            return;
        }
        var isCollapsed = getState(STORAGE_KEY_COLLAPSED, 'false');
        if (isCollapsed === 'true') {
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
        }
    }

    /* ==========================================
       SIDEBAR: MOBILE
       ========================================== */

    function openMobileSidebar() {
        sidebar.classList.add('mobile-open');
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileSidebar() {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
    }

    /* ==========================================
       EMAIL SELECTION (radio, un seul)
       ========================================== */

    function setupEmailSelection() {
        var radios = document.querySelectorAll('input[name="email_active"]');

        // Restaurer la sélection sauvegardée
        var savedEmail = getState(STORAGE_KEY_EMAIL, '');
        if (savedEmail) {
            radios.forEach(function (radio) {
                if (radio.value === savedEmail) {
                    radio.checked = true;
                }
            });
        }

        // Persister au changement
        radios.forEach(function (radio) {
            radio.addEventListener('change', function () {
                if (this.checked) {
                    saveState(STORAGE_KEY_EMAIL, this.value);
                }
            });
        });
    }

    /* ==========================================
       EVENT LISTENERS
       ========================================== */

    // Toggle (cercle bord droit, desktop)
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function (e) {
            e.preventDefault();
            toggleSidebar();
        });
    }

    // Overlay → fermer mobile
    if (overlay) {
        overlay.addEventListener('click', closeMobileSidebar);
    }

    // Escape → fermer mobile
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isMobile()) {
            closeMobileSidebar();
        }
    });

    // Resize
    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (isMobile()) {
                sidebar.classList.add('collapsed');
                closeMobileSidebar();
            } else {
                sidebar.classList.remove('mobile-open');
                overlay.classList.remove('visible');
                document.body.style.overflow = '';
                restoreSidebarState();
            }
        }, 150);
    });

    /* ==========================================
       PUBLIC API (pour les sous-pages)
       ========================================== */
    window.SidebarApp = {
        open: function () {
            if (isMobile()) { openMobileSidebar(); }
            else { expandSidebar(); }
        },
        close: function () {
            if (isMobile()) { closeMobileSidebar(); }
            else { collapseSidebar(); }
        },
        toggle: function () {
            if (isMobile()) {
                sidebar.classList.contains('mobile-open')
                    ? closeMobileSidebar()
                    : openMobileSidebar();
            } else {
                toggleSidebar();
            }
        }
    };

    /* ==========================================
       INIT
       ========================================== */
    function init() {
        restoreSidebarState();
        setupEmailSelection();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();