/**
 * KP APPLICATION - PASSENGER BOOTSTRAP (v52)
 */
const fs = require('fs');
const path = require('path');

// Absolute path to domain root for visible logging
const domainRoot = '/home/u102032541/domains/lightgreen-wolverine-191417.hostingersite.com';
const bootLog = path.join(domainRoot, 'BOOT_LOG.txt');

function log(msg) {
    const entry = `[${new Date().toISOString()}] ${msg}\n`;
    try { fs.appendFileSync(bootLog, entry); } catch (e) {}
    console.log(msg);
}

log('--- [V52] PASSENGER BOOT INITIATED ---');
log(`Working Dir: ${__dirname}`);
log(`Process UID: ${process.getuid ? process.getuid() : 'N/A'}`);

try {
    log('> Attempting to load server.js...');
    require('./server.js');
    log('> [OK] server.js requested.');
} catch (err) {
    log(`> [FATAL] Boot failure: ${err.message}`);
    log(err.stack);
    
    // Emergency fallback server
    const http = require('http');
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`BOOT_FAILURE_V52: ${err.message}\nCheck BOOT_LOG.txt in domain root.`);
    }).listen(process.env.PORT || 3000);
}
