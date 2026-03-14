const express = require('express');
const next = require('next');
const path = require('path');

// Port configuration
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

// Initialize Next.js app (pointing to the application workspace)
const app = next({ 
    dev, 
    dir: path.join(__dirname, 'application') 
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    // We use a regular Express app as the main server container
    const server = express();

    // 1. Mount the Express Backend under /api
    try {
        // We load the compiled backend from the server package's dist folder
        const backendApp = require('@kp/server/dist/app').default;
        
        // Hostinger specific: Ensure backend gets the raw /api prefix stripped correctly if needed,
        // or just mount it. The backendApp is already an express instance.
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
