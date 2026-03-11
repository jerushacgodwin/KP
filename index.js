/**
 * KP APPLICATION - ENTRYPOINT BRIDGE (v57)
 */
const fs = require('fs');
const path = require('path');

// Diagnostic: Log where we are booting from
const logFile = path.join(__dirname, 'boot_diag.txt');
function log(msg) {
    const entry = `[${new Date().toISOString()}] ${msg}\n`;
    try { fs.appendFileSync(logFile, entry); } catch (e) {}
    console.log(msg);
}

log(`--- [BOOT] v57 STARTING ---`);
log(`__dirname: ${__dirname}`);
log(`cwd: ${process.cwd()}`);

try {
    const serverPath = path.join(__dirname, 'server.js');
    if (fs.existsSync(serverPath)) {
        log(`> Found server.js at ${serverPath}. Requiring...`);
        require(serverPath);
    } else {
        log(`> [ERROR] server.js not found at ${serverPath}`);
        // Fallback or handle error
    }
} catch (err) {
    log(`> [FATAL] Boot execution failed: ${err.message}`);
    log(err.stack);
}
