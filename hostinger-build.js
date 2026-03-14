const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log("=== [1/3] Building Monorepo Packages ===");
try {
    execSync('npm run build -w @kp/billing -w @kp/server -w @kp/shop', { stdio: 'inherit' });
} catch (e) {
    console.error("Built failed for internal packages.");
    process.exit(1);
}

console.log("=== [2/3] Building Next.js Frontend ===");
try {
    execSync('npm run build -w application', { stdio: 'inherit' });
} catch (e) {
    console.error("Built failed for Next.js application.");
    process.exit(1);
}

console.log("=== [3/3] Packaging for Hostinger into 'hostinger-dist' ===");
const outDir = path.join(__dirname, 'hostinger-dist');
if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir);

// We need the workspaces configuration, server.js wrapper, and the actual code.
// Hostinger's Git Deployment CI will copy this folder's contents and then run `npm install && npm start`.
const itemsToCopy = ['application', 'packages', 'server.js', 'package.json', 'package-lock.json', 'lerna.json'];

itemsToCopy.forEach(item => {
    const src = path.join(__dirname, item);
    const dest = path.join(outDir, item);
    
    if (!fs.existsSync(src)) return;

    fs.cpSync(src, dest, { 
        recursive: true, 
        // Skip copying existing dependencies; Hostinger reinstalls them in the fresh directory
        filter: (source) => {
            const basename = path.basename(source);
            return basename !== 'node_modules' && basename !== '.git';
        }
    });
});

console.log(`=== Build and Packaging Complete! ===`);
console.log(`Please ensure Hostinger's Output Directory is set to "hostinger-dist"`);
