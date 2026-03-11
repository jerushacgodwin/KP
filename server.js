const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')
const fs = require('fs')

// NUCLEAR DIAGNOSTIC STARTUP (v28)
console.log('##############################################');
console.log('# [KP-V28-MASTER] STARTING SERVER...         #');
console.log('##############################################');
console.log('TIMESTAMP:', new Date().toISOString());
console.log('__dirname:', __dirname);
console.log('CWD:', process.cwd());

// Helper to find 'next' in any adjacent directory
function getNextModule() {
    const homeDir = path.resolve(__dirname, '..');
    const searchPoints = [
        path.join(__dirname, 'node_modules', 'next'),
        path.join(homeDir, 'public_html', 'node_modules', 'next'),
        path.join(homeDir, 'nodejs', 'node_modules', 'next'),
        'next' // Global
    ];

    console.log('> Searching for "next" module in:', searchPoints);

    for (const p of searchPoints) {
        try {
            const m = require(p);
            console.log(`> [FOUND] Loaded "next" from: ${p}`);
            return m;
        } catch (e) {
            // try next point
        }
    }
    return null;
}

const next = getNextModule();

if (!next) {
    console.error('##############################################');
    console.error('# [FATAL] module "next" NOT FOUND!           #');
    console.error('##############################################');
    try {
        console.log('> Directory contents of current folder:', fs.readdirSync(__dirname));
        console.log('> Directory contents of parent folder:', fs.readdirSync(path.resolve(__dirname, '..')));
    } catch (e) {}
    process.exit(1);
}

const dev = false
const app = next({ dev, dir: '.' })
const handle = app.getRequestHandler()

// Backend Loader
let expressApp;
try {
    const backendPath = path.join(__dirname, 'packages', 'server', 'dist', 'app.js');
    if (fs.existsSync(backendPath)) {
        expressApp = require(backendPath).default;
        console.log('> [BACKEND] Loaded successfully.');
    } else {
        console.log(`> [BACKEND] Missing dist at: ${backendPath}`);
    }
} catch (e) {
    console.warn('> [BACKEND] Failed to load:', e.message);
}

const port = process.env.PORT || 3000

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        const { pathname } = parsedUrl

        // API routing
        if (expressApp && pathname.match(/^\/(user|student|teacher|finance|events|class|hr|library|transport|hostel|attendance|exams|chapters|uploads)/)) {
            return expressApp(req, res);
        }

        handle(req, res, parsedUrl)
    }).listen(port, (err) => {
        if (err) throw err
        console.log(`> [STARTUP] Success! Listening on port ${port}`);
    })
}).catch((err) => {
    console.error('> [STARTUP] Preparation error:', err);
    process.exit(1);
});
