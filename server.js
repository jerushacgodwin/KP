const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')
const fs = require('fs')

// V32 STANDALONE ORCHESTRATOR
console.log('##############################################');
console.log('# [KP-V32-STANDALONE] STARTING...            #');
console.log('##############################################');
console.log('DIR:', __dirname);

const port = process.env.PORT || 3000

// Helper to look for 'next' (adjusted for standalone structure)
function getNext() {
    const search = [
        'next',
        path.join(__dirname, 'node_modules', 'next'), // Inside standalone
        path.join(__dirname, '..', '..', 'node_modules', 'next') // Outside (parent of application)
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
    console.error('> [ERROR] "next" module NOT FOUND. Starting Fail-Safe Diagnostic.');
    
    createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <body style="font-family: sans-serif; padding: 2rem; background: #fff5f5; color: #c53030;">
                    <h1>⚠️ [KP-V32] Standalone Dependency Missing</h1>
                    <p>The Node.js server is <b>RUNNING</b>, but the <b>"next"</b> module was not found in the standalone bundle.</p>
                    <hr>
                    <pre>__dirname: ${__dirname}</pre>
                </body>
            </html>
        `);
    }).listen(port, () => {
        console.log(`> [FAIL-SAFE] Listening on ${port}`);
    });
} else {
    // STANDARD STARTUP (Load our routes)
    const dev = false
    const app = next({ dev, dir: '.' })
    const handle = app.getRequestHandler()

    // Backend Loader
    let expressApp;
    try {
        const backendPath = path.join(__dirname, 'packages', 'server', 'dist', 'app.js');
        if (fs.existsSync(backendPath)) {
            expressApp = require(backendPath).default;
            console.log('> [BACKEND] Loaded.');
        }
    } catch (e) {
        console.warn('> [BACKEND] Load failed:', e.message);
    }

    app.prepare().then(() => {
        createServer((req, res) => {
            const parsedUrl = parse(req.url, true)
            const { pathname } = parsedUrl

            // API Routing
            if (expressApp && pathname.match(/^\/(user|student|teacher|finance|events|class|hr|library|transport|hostel|attendance|exams|chapters|uploads)/)) {
                return expressApp(req, res);
            }

            handle(req, res, parsedUrl)
        }).listen(port, (err) => {
            if (err) throw err
            console.log(`> [READY] KP App active on ${port}`);
        })
    }).catch(err => {
        console.error('> [FATAL] Startup Error:', err);
    });
}
