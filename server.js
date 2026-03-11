const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')

// Add current directory to module search path to help Hostinger find 'next'
module.paths.push(path.join(__dirname, 'node_modules'));

// Defensive require strategy for Next.js
let next;
try {
  next = require('next');
} catch (e) {
  console.error('Fatal: "next" module not found. Path searched:', module.paths);
  process.exit(1);
}

const dev = false
const app = next({ dev, dir: './application' })
const handle = app.getRequestHandler()

// Initialize Backend if present
let expressApp;
try {
  // We use the transpiled version of the server
  expressApp = require('./packages/server/dist/app').default;
} catch (e) {
  console.warn('Backend server not loaded. Check packages/server/dist/app.js existence.');
}

const port = process.env.PORT || 3000

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    // Route API paths to Express
    const apiPrefixes = ['/user', '/student', '/teacher', '/finance', '/events', '/class', '/hr', '/library', '/transport', '/hostel', '/attendance', '/exams', '/chapters', '/uploads'];
    
    if (expressApp && apiPrefixes.some(prefix => pathname.startsWith(prefix))) {
      return expressApp(req, res);
    }

    // Default to Next.js Frontend
    handle(req, res, parsedUrl)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on Port ${port}`)
  })
}).catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
