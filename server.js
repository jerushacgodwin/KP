const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')
const fs = require('fs')

// V38 DIAGNOSTIC ORCHESTRATOR
console.log('##############################################');
console.log('# [KP-V38-FORCED] STARTING...              #');
console.log('##############################################');
console.log('DIR:', __dirname);
console.log('ENV:', process.env.NODE_ENV);

const port = process.env.PORT || 3000

// Helper to find 'next'
function getNext() {
    const searchPoints = [
        'next',
        path.join(__dirname, 'node_modules', 'next'),
        path.join(__dirname, '..', 'node_modules', 'next'),
        path.join(__dirname, 'application', 'node_modules', 'next')
    ];
    for (const p of searchPoints) {
        try {
            const m = require(p);
            console.log(`> [OK] Loaded "next" from: ${p}`);
            return m;
        } catch (e) {}
    }
    return null;
}

const next = getNext();

if (!next) {
    console.error('> [ERROR] "next" module NOT FOUND. Entering Fail-Safe Mode.');
    createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <body style="font-family: system-ui; padding: 2rem; background: #fff5f5;">
                    <h1 style="color: #c53030;">⚠️ [KP-V38] Dependency Missing</h1>
                    <p>The Proxy is <b>Working</b>! But the files are not correctly structured.</p>
                    <pre>__dirname: ${__dirname}</pre>
                </body>
            </html>
        `);
    }).listen(port, () => console.log(`> [FAIL-SAFE] Port ${port} active.`));
} else {
    // Normal startup
    const dev = false
    const app = next({ dev, dir: '.' })
    const handle = app.getRequestHandler()

    app.prepare().then(() => {
        createServer((req, res) => {
            const parsedUrl = parse(req.url, true)
            handle(req, res, parsedUrl)
        }).listen(port, (err) => {
            if (err) throw err
            console.log(`> [READY] KP App is active on port ${port}`);
        })
    }).catch(err => {
        console.error('> [FATAL] App Prepare Error:', err);
    });
}
