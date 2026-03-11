/**
 * v71 MASTER ORCHESTRATOR (Standalone Bridge)
 * Hand-off for Next.js Standalone + Backend API
 */
const fs = require('fs');
const path = require('path');
const { createServer } = require('http');

const port = process.env.PORT || 3000;
console.log(`--- [ORCHESTRATOR v71 STARTING] ---`);

// 1. Prepare Next.js Standalone Handler
let nextHandler = null;
try {
    // We use the internal next-server to avoid needing the full 'next' package
    const NextServer = require('./node_modules/next/dist/server/next-server').default;
    
    // Config was extracted during build
    const configPath = path.join(__dirname, 'next-config-standalone.json');
    const nextConfig = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : {};
    
    const nextApp = new NextServer({
        hostname: 'localhost',
        port: port,
        dir: path.join(__dirname, 'application'), // Standalone app code folder
        dev: false,
        customServer: true,
        conf: nextConfig
    });
    
    nextHandler = nextApp.getRequestHandler();
    console.log('[OK] Next.js Standalone Handler Loaded');
} catch (err) {
    console.error(`[ERR] Next.js Setup Failed: ${err.message}`);
}

// 2. Prepare Backend API
let backendApp = null;
try {
    const backendPath = path.join(__dirname, 'packages', 'server', 'dist', 'app.js');
    if (fs.existsSync(backendPath)) {
        backendApp = require(backendPath);
        if (backendApp.default) backendApp = backendApp.default;
        console.log('[OK] Backend API Loaded');
    } else {
        console.log(`[WARN] Backend not found at ${backendPath}`);
    }
} catch (err) {
    console.error(`[ERR] Backend Load Failed: ${err.message}`);
}

// 3. Start Single Unified Server
createServer(async (req, res) => {
    try {
        const url = req.url || '/';

        // Ping (Diagnostic)
        if (url === '/ping') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            return res.end('PONG v71');
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
        res.end('Application Starting or Unavailable');

    } catch (err) {
        console.error(`[RUNTIME ERR] ${err.message}`);
        res.writeHead(500);
        res.end('Internal Server Error');
    }
}).listen(port, () => {
    console.log(`> Service running on port ${port}`);
});
