/**
 * Dev Server avec Browser-Sync
 * Permet le hot-reload en temps réel
 */

const bs = require('browser-sync').create();

bs.init({
    // Proxifier vers Nginx qui sert le Frontend PHP
    proxy: "http://nginx",
    
    // Surveiller les changements dans Frontend
    files: ["/app/source/Frontend/**/*"],
    
    port: 3000,
    host: '0.0.0.0',
    open: false,
    ui: false,
    notify: false,
    
    // Options pour éviter les erreurs de connexion
    reloadOnRestart: true,
    watchOptions: {
        usePolling: true,
        ignored: ['node_modules', '.git']
    }
});