const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Silent Monorepo Build (v55 Production Bridge)
 */
function deployWithPermissions(src, dest) {
    try {
        if (!fs.existsSync(src)) return;
        const stats = fs.lstatSync(src);
        if (path.resolve(src) === path.resolve(dest)) return;

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
        execSync(cmd, { 
            cwd, 
            stdio: 'inherit',
            env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' }
        });
    } catch (e) {
        process.exit(1);
    }
}

const root = __dirname;
// Target "production" instead of dot-folder ".next" to satisfy LiteSpeed
const targetDir = path.join(root, 'production'); 

console.log(`--- [MONOREPO-BUILD] V55 PRODUCTION-BRIDGE ---`);

// 1. Build
run('npm install', path.join(root, 'packages', 'billing'));
run('npm run build', path.join(root, 'packages', 'billing'));
run('npm install', path.join(root, 'packages', 'shop'));
run('npm run build', path.join(root, 'packages', 'shop'));
run('npm install', path.join(root, 'packages', 'server'));
run('npm run build', path.join(root, 'packages', 'server'));
run('npm install', path.join(root, 'application'));
run('npm run build', path.join(root, 'application'));

// 2. Consolidate (Silently)
if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

// Core Engines
const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) deployWithPermissions(standalone, targetDir);

const backendDist = path.join(root, 'packages', 'server', 'dist');
deployWithPermissions(backendDist, path.join(targetDir, 'packages', 'server', 'dist'));

// Assets
const appNext = path.join(root, 'application', '.next');
deployWithPermissions(path.join(appNext, 'static'), path.join(targetDir, '.next', 'static'));
deployWithPermissions(path.join(root, 'application', 'public'), path.join(targetDir, 'public'));

// Root Files
['server.js', 'package.json', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, f));
        fs.chmodSync(path.join(targetDir, f), 0o644);
    }
});

// Purge conflicts
if (fs.existsSync(path.join(root, '.htaccess'))) fs.unlinkSync(path.join(root, '.htaccess'));
if (fs.existsSync(path.join(targetDir, '.htaccess'))) fs.unlinkSync(path.join(targetDir, '.htaccess'));

console.log(`--- [BUILD-SUCCESS] ---`);
console.log(`TARGET: /production`);
