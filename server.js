const http = require('http');

// V30 ABSOLUTE MINIMUM - NO DEPENDENCIES
const port = process.env.PORT || 3000;

console.log('##############################################');
console.log('# [KP-V30-MINIMUM] BOOTING...                #');
console.log('##############################################');
console.log('PORT:', port);
console.log('DIRNAME:', __dirname);
console.log('PROCESS CWD:', process.cwd());

const server = http.createServer((req, res) => {
    console.log(`> [V30-INFO] Incoming Request: ${req.method} ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <html>
            <body style="font-family: system-ui; padding: 3rem; line-height: 1.5; max-width: 800px; margin: auto; background: #f0f7ff;">
                <h1 style="color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 0.5rem;">🎉 [V30] PROXY IS WORKING!</h1>
                <p>If you can see this page, it means <b>Hostinger is correctly reaching your Node.js process</b>.</p>
                <div style="background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #cce0ff; margin-top: 2rem;">
                    <h3>Environment Diagnostics:</h3>
                    <ul>
                        <li><b>Node Version:</b> ${process.version}</li>
                        <li><b>App Directory:</b> <code>${__dirname}</code></li>
                        <li><b>Working Directory:</b> <code>${process.cwd()}</code></li>
                        <li><b>Assigned Port:</b> <code>${port}</code></li>
                    </ul>
                </div>
                <p style="margin-top: 2rem; color: #666;">
                    Next Step: If this works, we will re-enable the full <b>Next.js</b> application.
                </p>
            </body>
        </html>
    `);
});

server.listen(port, () => {
    console.log(`> [V30-READY] Server is listening on port ${port}`);
});
