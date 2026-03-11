const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const path = require('path')

const dev = false
const app = next({ dev, dir: './application' })
const handle = app.getRequestHandler()

// Import the Express app from the transpiled server package
// Note: We use requirement because of CommonJS in this orchestrator
let expressApp;
try {
  expressApp = require('./packages/server/dist/app').default;
} catch (e) {
  console.warn('Backend server not found or failed to load, continuing with frontend only.');
}

const port = process.env.PORT || 3000

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    // Route /api and /user etc to the Express backend if it exists
    const apiPrefixes = ['/user', '/student', '/teacher', '/finance', '/events', '/class', '/hr', '/library', '/transport', '/hostel', '/attendance', '/exams', '/chapters', '/uploads'];
    
    if (expressApp && apiPrefixes.some(prefix => pathname.startsWith(prefix))) {
      return expressApp(req, res);
    }

    // Default to Next.js frontend
    handle(req, res, parsedUrl)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
