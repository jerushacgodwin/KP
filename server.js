const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');

/**
 * Clean Monorepo Orchestrator
 * Mounts Express API on /api and Next.js on other routes
 */
const port = process.env.PORT || 3000;
const app = next({ dev: false, dir: '.' });
const handle = app.getRequestHandler();

// Load Backend Express App
let backendApp = null;
const backendPath = path.join(__dirname, 'packages', 'server', 'dist', 'app.js');
if (fs.existsSync(backendPath)) {
    backendApp = require(backendPath);
    if (backendApp.default) backendApp = backendApp.default;
}

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        // Route to Backend
        if (backendApp && (pathname.startsWith('/api') || pathname.startsWith('/user') || pathname.startsWith('/student'))) {
             backendApp(req, res);
        } else {
             handle(req, res, parsedUrl);
        }
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Monorepo server ready on port ${port}`);
    });
});
