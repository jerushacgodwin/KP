const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')
const fs = require('fs')

// V39 STEALTH ORCHESTRATOR
console.log('##############################################');
console.log('# [KP-V39-STEALTH] ONLINE                    #');
console.log('##############################################');
console.log('DIR:', __dirname);

const port = process.env.PORT || 3000

function getNext() {
    const searchPoints = [
        'next',
        path.join(__dirname, 'node_modules', 'next'),
        path.join(__dirname, '..', 'node_modules', 'next'),
        path.join(__dirname, 'application', 'node_modules', 'next'),
        '/home/u102032541/domains/lightgreen-wolverine-191417.hostingersite.com/nodejs/node_modules/next'
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
    console.error('> [FATAL] Next.js engine not found!');
    createServer((req, res) => {
        res.writeHead(503, { 'Content-Type': 'text/plain' });
        res.end('[V39] Engine Missing. Check logs.');
    }).listen(port);
} else {
    const dev = false
    const app = next({ dev, dir: '.' })
    const handle = app.getRequestHandler()

    app.prepare().then(() => {
        createServer((req, res) => {
            handle(req, res, parse(req.url, true))
        }).listen(port, (err) => {
            if (err) throw err
            console.log(`> [V39-READY] Listening on ${port}`);
        })
    }).catch(err => {
        console.error('> [PREPARE-ERROR]', err);
    });
}
