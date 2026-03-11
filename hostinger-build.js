const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * v67 Build: Nested Production Fix
 * Ensures .next remains a folder after Hostinger's mover step.
 */
function deployWithPermissions(src, dest) {
    try {
        if (!fs.existsSync(src)) return;
        const stats = fs.lstatSync(src);
        if (dest.startsWith(src) && dest !== src) return; 

        if (stats.isDirectory()) {
            if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
            fs.chmodSync(dest, 0o755); 
            fs.readdirSync(src).forEach(child => {
                deployWithPermissions(path.join(src, child), path.join(dest, child));
            });
        } else {
            fs.copyFileSync(src, dest);
            fs.chmodSync(dest, 0o644);
        }
    } catch (err) {}
}

function run(cmd, cwd) {
    try {
        execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } });
    } catch (e) { process.exit(1); }
}

const root = __dirname;
// CRITICAL: We build into "production", and tell Hostinger to look for "production".
// Hostinger then moves "production/*" into the root.
const targetDir = path.join(root, 'production'); 

console.log(`--- [BUILD] v67 NESTED-PRODUCTION ---`);

// 1. Build Layer
run('npm install', path.join(root, 'packages', 'billing'));
run('npm run build', path.join(root, 'packages', 'billing'));
run('npm install', path.join(root, 'packages', 'shop'));
run('npm run build', path.join(root, 'packages', 'shop'));
run('npm install', path.join(root, 'packages', 'server'));
run('npm run build', path.join(root, 'packages', 'server'));
run('npm install', path.join(root, 'application'));
run('npm run build', path.join(root, 'application'));

// 2. Prep Target
if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

// 3. NESTED CONSOLIDATION
console.log(`> Consolidating into /production with NESTED .next...`);

// THE KEY: Copy the ENTIRE .next folder into production/.next
// This ensures that after Hostinger moves "production/*" to "/", the root still has a ".next" folder.
const appNext = path.join(root, 'application', '.next');
deployWithPermissions(appNext, path.join(targetDir, '.next'));

// Also copy standby files (node_modules, package.json etc) into production root
const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) {
    fs.readdirSync(standalone).forEach(f => {
        const src = path.join(standalone, f);
        const dest = path.join(targetDir, f);
        if (f !== '.next') { // Avoid duplicating .next if it's in standalone
            deployWithPermissions(src, dest);
        }
    });
}

// Backend API
const backendDist = path.join(root, 'packages', 'server', 'dist');
deployWithPermissions(backendDist, path.join(targetDir, 'packages', 'server', 'dist'));

// 4. Inject Entry Point (Renamed to index.js for maximum compatibility)
console.log(`> Injecting index.js...`);
const srcServer = path.join(root, 'server.js');
const destIndex = path.join(targetDir, 'index.js');
if (fs.existsSync(srcServer)) {
    fs.copyFileSync(srcServer, destIndex);
    fs.chmodSync(destIndex, 0o644);
}

// Required Files
['package.json', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, f));
        fs.chmodSync(path.join(targetDir, f), 0o644);
    }
});

// Final cleanup
if (fs.existsSync(path.join(root, '.htaccess'))) fs.unlinkSync(path.join(root, '.htaccess'));

console.log(`--- [SUCCESS] v67 ---`);
console.log(`TARGET FOLDER: /production`);
console.log(`ENTRY FILE: index.js`);
