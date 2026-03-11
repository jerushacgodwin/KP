const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')
const fs = require('fs')

// V40 DIRECT-HOME ORCHESTRATOR
console.log('##############################################');
console.log('# [KP-V40-DIRECT-HOME] SYSTEM BOOT          #');
console.log('##############################################');
console.log('DIR:', __dirname);

const port = process.env.PORT || 3000

function getNext() {
    const searchPoints = [
        'next',
        path.join(__dirname, 'node_modules', 'next'),
        path.join(__dirname, '..', 'node_modules', 'next'),
        path.join('/home/u102032541/domains/lightgreen-wolverine-191417.hostingersite.com/nodejs', 'node_modules', 'next')
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
        res.writeHead(503, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <body style="font-family: system-ui; padding: 2rem;">
                    <h1>503 Service Unavailable</h1>
                    <p>[V40] Engine Missing at: ${__dirname}</p>
                    <pre>Files: ${fs.readdirSync(__dirname).join(', ')}</pre>
                </body>
            </html>
        `);
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
            console.log(`> [V40-READY] Listening on ${port}`);
        })
    }).catch(err => {
        console.error('> [PREPARE-ERROR]', err);
    });
}
