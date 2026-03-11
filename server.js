const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')
const fs = require('fs')

// V45 RESCUE ORCHESTRATOR
const logFile = path.join(__dirname, 'server_log.txt');
function log(msg) {
    const entry = `[${new Date().toISOString()}] ${msg}\n`;
    console.log(msg);
    try { fs.appendFileSync(logFile, entry); } catch (e) {}
}

log('##############################################');
log('# [KP-V45-RESCUE] STARTUP...                #');
log('##############################################');
log(`DIR: ${__dirname}`);
log(`ENV: ${JSON.stringify(process.env, null, 2)}`);

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
    log('> [FATAL] Next.js engine not found! Falling back to Diagnostic Server.');
    createServer((req, res) => {
        log(`> [DIAGNOSTIC-REQ] ${req.url}`);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <div style="font-family: sans-serif; padding: 2rem; border: 10px solid red;">
                <h1>⚠️ [V45] Diagnostic Mode</h1>
                <p>The Proxy is <b>Working</b>, but Next.js dependencies are missing.</p>
                <hr>
                <p><b>Working Directory:</b> ${__dirname}</p>
                <p><b>Files:</b> ${fs.readdirSync(__dirname).join(', ')}</p>
                <p>Check <code>server_log.txt</code> in the root for details.</p>
            </div>
        `);
    }).listen(port, () => log(`> [DIAGNOSTIC] Listening on ${port}`));
} else {
    const app = next({ dev: false, dir: '.' })
    const handle = app.getRequestHandler()

    app.prepare().then(() => {
        createServer((req, res) => {
            const parsedUrl = parse(req.url, true)
            handle(req, res, parsedUrl)
        }).listen(port, (err) => {
            if (err) throw err
            log(`> [READY] KP App is active on port ${port}`);
        })
    }).catch(err => {
        log(`> [FATAL-PREPARE] ${err.message}`);
        log(err.stack);
    });
}
