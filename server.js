const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')
const fs = require('fs')

// V48 RESILIENT ORCHESTRATOR
const logFile = path.join(__dirname, 'server_log.txt');
function log(msg) {
    const entry = `[${new Date().toISOString()}] ${msg}\n`;
    console.log(msg);
    try { fs.appendFileSync(logFile, entry); } catch (e) {}
}

log('##############################################');
log('# [KP-V48-PROXY-FIX] SYSTEM ONLINE          #');
log('##############################################');
log(`DIR: ${__dirname}`);
log(`NODE_VERSION: ${process.version}`);

const port = process.env.PORT || 3000

function getNext() {
    const points = [
        'next',
        path.join(__dirname, 'node_modules', 'next'),
        path.join(__dirname, '..', 'node_modules', 'next'),
        '/home/u102032541/domains/lightgreen-wolverine-191417.hostingersite.com/.next/node_modules/next'
    ];
    for (const p of points) {
        try {
            const m = require(p);
            log(`> [OK] Loaded "next" from: ${p}`);
            return m;
        } catch (e) {}
    }
    return null;
}

const next = getNext();

if (!next) {
    log('> [FATAL] Next.js engine not found! Diagnostic screen active.');
    createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <div style="font-family: system-ui; padding: 2rem; border-top: 10px solid gold;">
                <h1>⚠️ [V48] Diagnostic Mode</h1>
                <p>The Proxy is <b>Alive</b>, but Next.js is missing.</p>
                <p><b>Check:</b> <code>server_log.txt</code> in File Manager.</p>
                <pre>Path: ${__dirname}</pre>
            </div>
        `);
    }).listen(port);
} else {
    const app = next({ dev: false, dir: '.' })
    const handle = app.getRequestHandler()

    app.prepare().then(() => {
        createServer((req, res) => {
            handle(req, res, parse(req.url, true))
        }).listen(port, (err) => {
            if (err) throw err
            log(`> [SUCCESS] App listening on port ${port}`);
        })
    }).catch(err => {
        log(`> [ERROR] Prepare failed: ${err.message}`);
    });
}
