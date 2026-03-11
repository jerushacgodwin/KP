/**
 * KP APPLICATION - NUCLEAR DIAGNOSTIC (v49)
 * Goal: Proves the Node.js Proxy is working.
 */
const http = require('http');
const port = process.env.PORT || 3000;

console.log('--- [V49-NUCLEAR] BOOTING ---');

const server = http.createServer((req, res) => {
    console.log(`> [REQ] ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <div style="font-family: system-ui; padding: 2rem; border: 10px solid lime;">
            <h1>✅ [V49-SUCCESS] Node.js Proxy is Working!</h1>
            <p>If you see this, the "403 Forbidden" for the Node app is GONE.</p>
            <p><b>Time:</b> ${new Date().toISOString()}</p>
            <p><b>Version:</b> 49.Nuclear</p>
            <hr>
            <p>Next step: Re-enable Next.js once we confirm this works.</p>
        </div>
    `);
});

server.listen(port, () => {
    console.log(`--- [V49-NUCLEAR] LISTENING ON ${port} ---`);
});
