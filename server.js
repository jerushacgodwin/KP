const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')

console.log('--- STARTING KP UNIFIED ORCHESTRATOR (v25) ---');
console.log('Running from:', __dirname);

// ADD ROOT node_modules TO RESOLUTION PATH
module.paths.push(path.join(__dirname, 'node_modules'));

// Robust require strategy for Next.js - Searching multiple root locations
let next;
const homeDir = path.resolve(__dirname, '..');
const possibleNextPaths = [
  'next', // Standard resolution
  path.join(__dirname, 'node_modules', 'next'), // Local to current folder
  path.join(homeDir, 'public_html', 'node_modules', 'next'), // In case it's in public_html
  path.join(homeDir, 'nodejs', 'node_modules', 'next'), // In case it's in nodejs
  path.join(__dirname, 'application', 'node_modules', 'next')
];

console.log(`> [INFO] Searching for 'next' in:`, possibleNextPaths);

for (const p of possibleNextPaths) {
  try {
    next = require(p);
    console.log(`> [OK] Successfully loaded 'next' from: ${p}`);
    break;
  } catch (e) {
    // Continue searching
  }
}

if (!next) {
  console.error('FATAL: Module "next" not found after exhaustive search.');
  console.error('Available paths:', possibleNextPaths);
  console.error('Directory content of __dirname:', require('fs').readdirSync(__dirname));
  process.exit(1);
}

const dev = false
const app = next({ dev, dir: '.' })
const handle = app.getRequestHandler()

// Initialize Backend
let expressApp;
try {
  expressApp = require('./packages/server/dist/app').default;
  console.log(`> [OK] Loaded Backend services.`);
} catch (e) {
  console.warn('> [WARN] Backend services not loaded.');
}

const port = process.env.PORT || 3000

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    const apiPrefixes = ['/user', '/student', '/teacher', '/finance', '/events', '/class', '/hr', '/library', '/transport', '/hostel', '/attendance', '/exams', '/chapters', '/uploads'];
    
    if (expressApp && apiPrefixes.some(prefix => pathname.startsWith(prefix))) {
      return expressApp(req, res);
    }

    handle(req, res, parsedUrl)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> [SUCCESS] active on port: ${port}`)
  })
}).catch((err) => {
  process.exit(1);
});
