const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')
const fs = require('fs')

// V43 HIGH-RESILIENCE ORCHESTRATOR
const logFile = path.join(__dirname, 'server_log.txt');
function log(msg) {
    const entry = `[${new Date().toISOString()}] ${msg}\n`;
    console.log(msg);
    try { fs.appendFileSync(logFile, entry); } catch (e) {}
}

log('##############################################');
log('# [KP-V43-RESILIENT] BOOTING...              #');
log('##############################################');
log(`DIR: ${__dirname}`);

const port = process.env.PORT || 3000

function getNext() {
    const points = [
        'next',
        path.join(__dirname, 'node_modules', 'next'),
        path.join(__dirname, '..', 'node_modules', 'next')
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
    log('> [FATAL] Next.js engine NOT FOUND.');
    createServer((req, res) => {
        res.writeHead(503, { 'Content-Type': 'text/plain' });
        res.end('[V43] Engine Missing. Check server_log.txt for clues.');
    }).listen(port);
} else {
    const app = next({ dev: false, dir: '.' })
    const handle = app.getRequestHandler()

    app.prepare().then(() => {
        createServer((req, res) => {
            handle(req, res, parse(req.url, true))
        }).listen(port, (err) => {
            if (err) throw err
            log(`> [READY] Listening on port ${port}`);
        })
    }).catch(err => {
        log(`> [PREPARE-ERROR] ${err.message}`);
    });
}
