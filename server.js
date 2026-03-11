/**
 * v61 PASSENGER BRIDGE ORCHESTRATOR
 * Instant boot marker to prove Node.js execution.
 */
const fs = require('fs');
const path = require('path');

try { fs.writeFileSync(path.join(__dirname, 'BOOT_TIME.txt'), `NODE-BOOT: ${new Date().toISOString()}`); } catch (e) {}

const port = process.env.PORT || 3000;

const { createServer } = require('http');
const { parse } = require('url');

// 2. Setup Engines
const next = require('next');
const nextApp = next({ dev: false, dir: '.' });
const nextHandler = nextApp.getRequestHandler();

let backendApp = null;
try {
    const backendPath = path.join(__dirname, 'packages', 'server', 'dist', 'app.js');
    if (fs.existsSync(backendPath)) {
        backendApp = require(backendPath);
        if (backendApp.default) backendApp = backendApp.default;
    }
} catch (err) {}

let nextReady = false;
nextApp.prepare().then(() => {
    nextReady = true;
    console.log('> Next.js Prepared');
}).catch(err => {
    console.error(`> Next.js Prep Failed: ${err.message}`);
});

// 3. START SERVER IMMEDIATELY
createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // Route Alpha: Stealth Ping (Always Works)
    if (pathname === '/ping') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('PONG');
        return;
    }

    // Route Beta: Backend (Bypass Next.js check)
    const isBackend = pathname.startsWith('/api') || 
                      pathname.startsWith('/user') || 
                      pathname.startsWith('/student');
                      
    if (backendApp && isBackend) {
        return backendApp(req, res);
    }

    // Route Gamma: Next.js (Check if ready)
    if (nextReady) {
        nextHandler(req, res, parsedUrl);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #f0f0f0;">
                    <div style="text-align: center; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h1 style="color: #22c55e;">🚀 Application is Starting</h1>
                        <p>We are preparing the monorepo. Please refresh in 10 seconds.</p>
                        <p style="color: #999; font-size: 0.8rem;">[v58 Orchestrator]</p>
                    </div>
                    <script>setTimeout(() => window.location.reload(), 5000);</script>
                </body>
            </html>
        `);
    }
}).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Listening on Port ${port}`);
});
