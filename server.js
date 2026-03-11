const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');
const fs = require('fs');

/**
 * Global Monorepo Orchestrator (v55)
 */
const port = process.env.PORT || 3000;

// 1. Setup Next.js
const next = require('next');
const app = next({ dev: false, dir: '.' });
const handle = app.getRequestHandler();

// 2. Setup Backend
let backendApp = null;
try {
    const backendPath = path.join(__dirname, 'packages', 'server', 'dist', 'app.js');
    if (fs.existsSync(backendPath)) {
        backendApp = require(backendPath);
        if (backendApp.default) backendApp = backendApp.default;
    }
} catch (err) {}

// 3. Start
app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        // Health Check (Bypass)
        if (pathname === '/ping') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('PONG');
            return;
        }

        // Backend Routes
        const isBackend = pathname.startsWith('/api') || 
                          pathname.startsWith('/user') || 
                          pathname.startsWith('/student') || 
                          pathname.startsWith('/teacher');

        if (backendApp && isBackend) {
             backendApp(req, res);
        } else {
             handle(req, res, parsedUrl);
        }
    }).listen(port);
});
