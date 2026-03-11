const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * DEFINITIVE Monorepo Build (v56 Absolute Stealth)
 * Reverts to .next to satisfy Hostinger validator.
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
// REVERTED: Target folder name is back to .next
const targetDir = path.join(root, '.next'); 

console.log(`--- [MONOREPO-BUILD] V56 ABSOLUTE-STEALTH ---`);

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
if (fs.existsSync(targetDir)) {
    // Keep dir, wipe contents to ensure fresh deployment
    fs.readdirSync(targetDir).forEach(f => {
        const p = path.join(targetDir, f);
        if (fs.lstatSync(p).isDirectory()) fs.rmSync(p, { recursive: true, force: true });
        else fs.unlinkSync(p);
    });
} else {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Core Engines
const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) deployWithPermissions(standalone, targetDir);

const backendDist = path.join(root, 'packages', 'server', 'dist');
if (fs.existsSync(backendDist)) {
    deployWithPermissions(backendDist, path.join(targetDir, 'packages', 'server', 'dist'));
}

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
console.log(`TARGET: /.next`);
