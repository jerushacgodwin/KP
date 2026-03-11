/**
 * v72 MASTER ORCHESTRATOR (Robust Standalone Bridge)
 * High-reliability hand-off for Next.js + Backend API
 */
const fs = require('fs');
const path = require('path');
const { createServer } = require('http');

const port = process.env.PORT || 3000;
const logPath = path.join(__dirname, '.deployment_debug.log');

function log(msg) {
    const entry = `[${new Date().toISOString()}] ${msg}\n`;
    console.log(msg);
    try { fs.appendFileSync(logPath, entry); } catch (e) {}
}

log(`--- [ORCHESTRATOR v72 STARTING] ---`);
log(`CWD: ${process.cwd()}`);
log(`DIRNAME: ${__dirname}`);

// 1. Prepare Next.js Standalone Handler
let nextHandler = null;
try {
    const nextServerPath = path.join(__dirname, 'node_modules', 'next', 'dist', 'server', 'next-server.js');
    if (fs.existsSync(nextServerPath)) {
        const NextServer = require(nextServerPath).default;
        const configPath = path.join(__dirname, 'next-config-standalone.json');
        const nextConfig = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : {};
        
        const nextApp = new NextServer({
            hostname: 'localhost',
            port: port,
            dir: path.join(__dirname, 'application'),
            dev: false,
            customServer: true,
            conf: nextConfig
        });
        
        nextHandler = nextApp.getRequestHandler();
        log('[OK] Next.js Standalone Handler Loaded');
    } else {
        log(`[ERR] NextServer not found at ${nextServerPath}`);
    }
} catch (err) {
    log(`[ERR] Next.js Setup Failed: ${err.stack}`);
}

// 2. Prepare Backend API
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
    log(`[ERR] Backend Load Failed (Likely deps): ${err.message}`);
    log(`HINT: Check if node_modules/express exists.`);
}

// 3. Start Unified Server
createServer(async (req, res) => {
    try {
        const url = req.url || '/';

        // Diagnostic Endpoints
        if (url === '/ping') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            return res.end(`PONG v72 (Backend: ${backendApp ? 'LOADED' : 'MISSING'})`);
        }
        
        if (url === '/debug-logs') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            return res.end(fs.existsSync(logPath) ? fs.readFileSync(logPath, 'utf8') : 'No logs yet.');
        }

        // Backend Routing
        const isBackend = url.startsWith('/api') || 
                          url.startsWith('/user') || 
                          url.startsWith('/student');
        
        if (backendApp && isBackend) {
            return backendApp(req, res);
        }

        // Next.js UI Routing
        if (nextHandler) {
            return await nextHandler(req, res);
        }

        // Fallback
        res.writeHead(503);
        res.end(`Application Starting or Unavailable. Check /debug-logs`);

    } catch (err) {
        log(`[RUNTIME ERR] ${err.message}`);
        res.writeHead(500);
        res.end('Internal Server Error');
    }
}).listen(port, () => {
    log(`> Service running on port ${port}`);
});
