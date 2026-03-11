const http = require('http');
const fs = require('fs');
const path = require('path');

// V37 BREADCRUMB - ZERO DEPENDENCIES
const port = process.env.PORT || 3000;

console.log('##############################################');
console.log('# [KP-V37-BREADCRUMB] STARTUP...             #');
console.log('##############################################');
console.log('PORT:', port);
console.log('DIR:', __dirname);
console.log('FILES:', fs.readdirSync(__dirname));

const server = http.createServer((req, res) => {
    console.log(`> [REQ] ${req.url}`);
    
    // Simple diagnostic routing
    if (req.url === '/test-node') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('[V37] Node.js is ALIVE and reachable!');
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <div style="font-family: sans-serif; padding: 20px; border: 5px solid #3b82f6; border-radius: 10px;">
            <h1 style="color: #3b82f6;">🚀 [V37] BREADCRUMB READY</h1>
            <p>If you see this, the <b>Node.js Proxy is SUCCESSFUL!</b></p>
            <hr>
            <p><b>Diagnostic Links:</b></p>
            <ul>
                <li><a href="/test-node">Test Node.js directly</a></li>
                <li><a href="/hostinger_test.html">Test Static File access</a> (Check public folder)</li>
            </ul>
        </div>
    `);
});

server.listen(port, () => {
    console.log(`> [V37-READY] Listening on ${port}`);
});
