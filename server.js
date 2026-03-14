const express = require('express');
const next = require('next');
const path = require('path');

// Port configuration
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

// Initialize Next.js app (pointing to the application workspace)
process.chdir(path.join(__dirname, 'application'));
const app = next({ 
    dev,
    hostname: 'localhost',
    port,
    dir: process.cwd()
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    // We use a regular Express app as the main server container
    const server = express();

    // 1. Mount the Express Backend under /api
    try {
        const backendApp = require('@kp/server/dist/app').default;
        server.use('/api', backendApp);
        console.log('[Server] Successfully mounted Express backend at /api');
    } catch (err) {
        console.error('[Server] Failed to load Express backend:', err.message);
        console.log('[Server] Make sure to run `npm run build -w @kp/server`');
    }

    // 2. Handle all other requests with Next.js (Frontend)
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    // Start listening on the designated port
    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`[Server] > Unified Server ready on http://localhost:${port}`);
    });
}).catch(err => {
    console.error('[Server] Next.js preparation failed:', err);
    process.exit(1);
});
