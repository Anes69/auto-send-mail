const bs = require('browser-sync').create();

bs.init({
    proxy: "http://nginx", 
    
    files: ["/app/Frontend/**/*"], 
    
    port: 3000,
    host: '0.0.0.0',
    open: false,
    ui: false,
    notify: false
});