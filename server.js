const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')
const fs = require('fs')

// V42 LITESPEED-SAFE ORCHESTRATOR
const logStream = fs.createWriteStream(path.join(__dirname, 'server_log.txt'), { flags: 'a' });
function log(msg) {
    const t = new Date().toISOString();
    console.log(`[${t}] ${msg}`);
    logStream.write(`[${t}] ${msg}\n`);
}

log('##############################################');
log('# [KP-V42-LITESPEED] BOOTING...              #');
log('##############################################');
log(`DIR: ${__dirname}`);

const port = process.env.PORT || 3000

function getNext() {
    const points = [
        'next',
        path.join(__dirname, 'node_modules', 'next'),
        path.join(__dirname, '..', 'node_modules', 'next'),
        path.join(__dirname, 'application', 'node_modules', 'next')
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
        res.end('[V42] Engine Missing. Check server_log.txt');
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
