const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');
const fs = require('fs');

/**
 * Full-Stack Monorepo Orchestrator (v54)
 * Hosts Express API + Next.js UI in one process.
 */
const port = process.env.PORT || 3000;

// 1. SETUP NEXT.JS
const next = require('next');
const app = next({ dev: false, dir: '.' });
const handle = app.getRequestHandler();

// 2. SETUP BACKEND
let backendApp = null;
try {
    const backendPath = path.join(__dirname, 'packages', 'server', 'dist', 'app.js');
    if (fs.existsSync(backendPath)) {
        backendApp = require(backendPath);
        if (backendApp.default) backendApp = backendApp.default;
        console.log(`> [OK] Backend API loaded.`);
    } else {
        console.warn(`> [SKIP] Backend API not found at ${backendPath}`);
    }
} catch (err) {
    console.error(`> [FAIL] Backend loading error: ${err.message}`);
}

// 3. START UNIFIED SERVER
app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        // Route to Backend
        // We route /api and other common backend prefixes to the Express app
        const isApi = pathname.startsWith('/api') || 
                      pathname.startsWith('/user') || 
                      pathname.startsWith('/student') || 
                      pathname.startsWith('/teacher') ||
                      pathname.startsWith('/finance') ||
                      pathname.startsWith('/events') ||
                      pathname.startsWith('/class') ||
                      pathname.startsWith('/hr') ||
                      pathname.startsWith('/library') ||
                      pathname.startsWith('/transport') ||
                      pathname.startsWith('/hostel') ||
                      pathname.startsWith('/attendance') ||
                      pathname.startsWith('/exams') ||
                      pathname.startsWith('/chapters');

        if (backendApp && isApi) {
             backendApp(req, res);
        } else {
             handle(req, res, parsedUrl);
        }
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Full-Stack Server active on port ${port}`);
    });
}).catch(err => {
    console.error(`> [FATAL] Next.js preparation failed: ${err.message}`);
    
    // Emergency Fallback: Just run Backend
    if (backendApp) {
        console.log('> Falling back to Backend-only mode.');
        createServer(backendApp).listen(port);
    }
});
