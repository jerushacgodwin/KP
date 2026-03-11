const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')
const fs = require('fs')

// DIAGNOSTIC HEADER (v29)
console.log('##############################################');
console.log('# [KP-V29-DIAGNOSTIC] STARTING...            #');
console.log('##############################################');
console.log('TIME:', new Date().toISOString());
console.log('DIR:', __dirname);
console.log('CWD:', process.cwd());

const port = process.env.PORT || 3000

// Helper to look for 'next'
function getNext() {
    const search = [
        'next',
        path.join(__dirname, 'node_modules', 'next'),
        path.join(__dirname, '..', 'node_modules', 'next')
    ];
    for (const p of search) {
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
    console.error('> [ERROR] "next" module NOT FOUND. Starting Fail-Safe Diagnostic Server.');
    
    // START FAIL-SAFE SERVER
    createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <body style="font-family: sans-serif; padding: 2rem; background: #fff5f5; color: #c53030;">
                    <h1>⚠️ [KP-V29] Dependency Missing</h1>
                    <p>The Node.js server is <b>RUNNING</b>, but the <b>"next"</b> module is missing.</p>
                    <p><b>This proves your Path/Proxy is working!</b> The issue is just the files.</p>
                    <hr>
                    <pre>
__dirname: ${__dirname}
cwd: ${process.cwd()}
PORT: ${port}
                    </pre>
                </body>
            </html>
        `);
    }).listen(port, () => {
        console.log(`> [FAIL-SAFE] Listening on ${port}. Use this to verify your domain points here.`);
    });
} else {
    // STANDARD STARTUP
    const dev = false
    const app = next({ dev, dir: '.' })
    const handle = app.getRequestHandler()

    app.prepare().then(() => {
        createServer((req, res) => {
            const parsedUrl = parse(req.url, true)
            handle(req, res, parsedUrl)
        }).listen(port, (err) => {
            if (err) throw err
            console.log(`> [READY] KP App active on port ${port}`);
        })
    }).catch(err => {
        console.error('> [FATAL] Startup Error:', err);
    });
}
