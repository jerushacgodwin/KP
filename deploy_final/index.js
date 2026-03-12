/**
 * v74 MASTER ORCHESTRATOR
 * Standard Next.js Server + Backend API
 * (No standalone mode — output: standalone removed)
 */
const fs = require('fs');
const path = require('path');
const http = require('http');

const port = parseInt(process.env.PORT || '3000', 10);
const logPath = path.join(__dirname, '.deployment_debug.log');

function log(msg) {
    const entry = `[${new Date().toISOString()}] ${msg}\n`;
    console.log(msg);
    try { fs.appendFileSync(logPath, entry); } catch (e) {}
}

log(`--- [ORCHESTRATOR v74 STARTING] ---`);
log(`CWD: ${process.cwd()}`);
log(`DIRNAME: ${__dirname}`);

// 1. Prepare Backend API
let backendApp = null;
try {
    const backendPath = path.join(__dirname, 'packages', 'server', 'dist', 'app.js');
    if (fs.existsSync(backendPath)) {
        // This will now work because we consolidated node_modules in v72
        backendApp = require(backendPath);
        if (backendApp.default) backendApp = backendApp.default;
        log('[OK] Backend API Loaded');
    } else {
        log(`[WARN] Backend not found at ${backendPath}`);
    }
} catch (err) {
    log(`[ERR] Backend Load Failed: ${err.message}`);
}

// 2. Prepare Next.js (standard mode, not standalone)
let nextApp = null;
let nextHandler = null;
try {
    const next = require('next');
    const appDir = path.join(__dirname, 'application');
    nextApp = next({
        dev: false,
        dir: appDir,
        hostname: '0.0.0.0',
        port: port,
    });
    nextHandler = nextApp.getRequestHandler();
    log('[OK] Next.js App Configured');
} catch (err) {
    log(`[ERR] Next.js Setup Failed: ${err.stack}`);
}

// 3. Boot
async function start() {
    // Prepare Next.js
    if (nextApp) {
        try {
            await nextApp.prepare();
            log('[OK] Next.js Ready');
        } catch (err) {
            log(`[ERR] Next.js prepare() failed: ${err.message}`);
            nextHandler = null;
        }
    }

    http.createServer(async (req, res) => {
        try {
            const url = req.url || '/';

            // Diagnostic Endpoints
            if (url === '/ping') {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                return res.end(`PONG v74 (Backend: ${backendApp ? 'LOADED' : 'MISSING'}, Next: ${nextHandler ? 'READY' : 'MISSING'})`);
            }

            if (url === '/debug-logs') {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                return res.end(fs.existsSync(logPath) ? fs.readFileSync(logPath, 'utf8') : 'No logs yet.');
            }

            // Backend API Routing
            const isBackend = url.startsWith('/api') ||
                              url.startsWith('/user') ||
                              url.startsWith('/student');

            if (backendApp && isBackend) {
                return backendApp(req, res);
            }

            // Next.js UI
            if (nextHandler) {
                return await nextHandler(req, res);
            }

            // Fallback
            res.writeHead(503);
            res.end('Application Starting. Check /debug-logs for details.');

        } catch (err) {
            log(`[RUNTIME ERR] ${err.message}`);
            res.writeHead(500);
            res.end('Internal Server Error');
        }
    }).listen(port, () => {
        log(`> Service running on port ${port}`);
    });
}

start().catch(err => {
    log(`[FATAL] ${err.stack}`);
    process.exit(1);
});
