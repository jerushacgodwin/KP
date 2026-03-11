const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')

console.log('--- STARTING KP UNIFIED ORCHESTRATOR (v25) ---');
console.log('Running from:', __dirname);

// ADD ROOT node_modules TO RESOLUTION PATH
module.paths.push(path.join(__dirname, 'node_modules'));

// Robust require strategy for Next.js
let next;
const possibleNextPaths = [
  'next', 
  path.join(__dirname, 'node_modules', 'next'),
  path.join(__dirname, 'application', 'node_modules', 'next'),
  path.join(__dirname, '..', 'node_modules', 'next') // Hostinger nodejs/public_html cross-path
];

for (const p of possibleNextPaths) {
  try {
    next = require(p);
    console.log(`> [OK] Loaded 'next' from: ${p}`);
    break;
  } catch (e) {
    // try next
  }
}

if (!next) {
  console.error('FATAL: Module "next" not found. Searched:', possibleNextPaths);
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
