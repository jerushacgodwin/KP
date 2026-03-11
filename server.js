const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')
const fs = require('fs')

// DIAGNOSTIC LOGGING
const SIGNATURE = '[KP-V27-STARTUP]';
console.log(`${SIGNATURE} --- UNIFIED ORCHESTRATOR INIT ---`);
console.log(`${SIGNATURE} Current __dirname:`, __dirname);
console.log(`${SIGNATURE} Current Process CWD:`, process.cwd());

// Helper to search for a package in common Hostinger locations
function resolveModule(name) {
    const homeDir = path.resolve(__dirname, '..');
    const searchPaths = [
        path.join(__dirname, 'node_modules', name),
        path.join(homeDir, 'public_html', 'node_modules', name),
        path.join(homeDir, 'nodejs', 'node_modules', name),
        path.join(__dirname, 'application', 'node_modules', name),
        name // Global fallback
    ];

    console.log(`${SIGNATURE} Searching for module "${name}" in:`, searchPaths);

    for (const p of searchPaths) {
        try {
            const mod = require(p);
            console.log(`${SIGNATURE} [SUCCESS] Loaded "${name}" from: ${p}`);
            return mod;
        } catch (e) {
            // try next
        }
    }
    return null;
}

// 1. Resolve Next.js
const next = resolveModule('next');
if (!next) {
    console.error(`${SIGNATURE} [FATAL] Critical module "next" not found.`);
    // Diagnostic: List directory contents to see what's actually there
    try {
        console.log(`${SIGNATURE} Directory listing of ${__dirname}:`, fs.readdirSync(__dirname));
        console.log(`${SIGNATURE} Directory listing of parent:`, fs.readdirSync(path.resolve(__dirname, '..')));
    } catch (err) {}
    process.exit(1);
}

const dev = false
const app = next({ dev, dir: '.' })
const handle = app.getRequestHandler()

// 2. Resolve Backend
let expressApp;
try {
    const backendPath = path.join(__dirname, 'packages', 'server', 'dist', 'app.js');
    if (fs.existsSync(backendPath)) {
        expressApp = require(backendPath).default;
        console.log(`${SIGNATURE} [SUCCESS] Loaded Express Backend.`);
    } else {
        console.warn(`${SIGNATURE} [WARN] Backend dist not found at ${backendPath}`);
    }
} catch (e) {
    console.warn(`${SIGNATURE} [WARN] Backend failed to load:`, e.message);
}

const port = process.env.PORT || 3000

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    // API Routes to Express
    const apiPrefixes = ['/user', '/student', '/teacher', '/finance', '/events', '/class', '/hr', '/library', '/transport', '/hostel', '/attendance', '/exams', '/chapters', '/uploads'];
    
    if (expressApp && apiPrefixes.some(prefix => pathname.startsWith(prefix))) {
      return expressApp(req, res);
    }

    // Default to Next.js
    handle(req, res, parsedUrl)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`${SIGNATURE} [READY] Active on port: ${port}`)
  })
}).catch((err) => {
  console.error(`${SIGNATURE} [FATAL] Lifecycle error:`, err);
  process.exit(1);
});
