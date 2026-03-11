/**
 * KP APPLICATION - DEFINITIVE BOOTLOADER (v59)
 */
const fs = require('fs');
const path = require('path');

// Diagnostic Marker
const marker = path.join(__dirname, 'I_REALLY_STARTED.txt');
try { fs.writeFileSync(marker, `BOOT-V59: ACTIVE\nTIME: ${new Date().toISOString()}\nDIR: ${__dirname}`); } catch (e) {}

console.log('--- [V59] DEFINITIVE BOOT ---');

try {
    require('./server.js');
} catch (err) {
    const http = require('http');
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`BOOT_ERROR_V59: ${err.message}\nCheck I_REALLY_STARTED.txt`);
    }).listen(process.env.PORT || 3000);
}
