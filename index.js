/**
 * KP APPLICATION - HOSTINGER ENTRY POINT (v48)
 */
console.log('--- [NODE] index.js Booting... ---');

try {
    // We proxy to server.js which contains the Next.js logic
    require('./server.js');
} catch (err) {
    console.error('--- [FATAL] Failed to load server.js ---');
    console.error(err);
    
    // Fallback server to prevent 503/403
    const http = require('http');
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`[V48-BOOT-ERROR] Proxy failed: ${err.message}`);
    }).listen(process.env.PORT || 3000);
}
