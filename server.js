const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')
const fs = require('fs')

// V51 UNIFIED MONOREPO ORCHESTRATOR
const logFile = path.join(__dirname, 'server_log.txt');
function log(msg) {
    const entry = `[${new Date().toISOString()}] ${msg}\n`;
    console.log(msg);
    try { fs.appendFileSync(logFile, entry); } catch (e) {}
}

log('--- [KP-V51] UNIFIED MONOREPO STARTING ---');

const port = process.env.PORT || 3000;

// 1. LOAD BACKEND (Express)
let backendApp = null;
try {
    const backendPath = path.join(__dirname, 'packages', 'server', 'dist', 'app.js');
    if (fs.existsSync(backendPath)) {
        backendApp = require(backendPath);
        if (backendApp.default) backendApp = backendApp.default; // Handle ES modules
        log(`> [OK] Backend (Express) loaded from: ${backendPath}`);
    } else {
        log(`> [WARN] Backend dist not found at: ${backendPath}`);
    }
} catch (err) {
    log(`> [ERROR] Failed to load backend: ${err.message}`);
}

// 2. LOAD FRONTEND (Next.js)
let nextHandler = null;
let nextApp = null;
try {
    const next = require('next');
    nextApp = next({ dev: false, dir: '.' });
    nextHandler = nextApp.getRequestHandler();
    log(`> [OK] Next.js engine loaded.`);
} catch (err) {
    log(`> [FATAL] Next.js engine not found: ${err.message}`);
}

// 3. START UNIFIED SERVER
if (nextApp) {
    nextApp.prepare().then(() => {
        createServer((req, res) => {
            const parsedUrl = parse(req.url, true);
            const { pathname } = parsedUrl;

            // Route to Backend API
            // Check if backendApp exists and if the route starts with its base routes
            // Note: Express apps are also (req, res) => handlers
            if (backendApp && (pathname.startsWith('/api') || pathname === '/' && req.headers['x-requested-with'])) {
                backendApp(req, res);
            } else {
                nextHandler(req, res, parsedUrl);
            }
        }).listen(port, (err) => {
            if (err) throw err;
            log(`> [READY] Unified Monorepo active on port ${port}`);
        });
    }).catch(err => {
        log(`> [FATAL-PREPARE] ${err.message}`);
    });
} else {
    // Fallback: Just run Backend if Next.js fails
    if (backendApp) {
        log(`> [FALLBACK] Running Backend only.`);
        createServer(backendApp).listen(port);
    } else {
        log(`> [FATAL] No apps to run.`);
        createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('[V51] No app engines found. Check server_log.txt');
        }).listen(port);
    }
}
