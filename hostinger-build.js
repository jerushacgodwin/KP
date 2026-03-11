const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * v62 Build: In-Place Monorepo Master
 * Consolidates everything into the root to satisfy Output Directory: null.
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

console.log(`--- [BUILD] v62 IN-PLACE-MASTER ---`);

// 1. Build Layer
run('npm install', path.join(root, 'packages', 'billing'));
run('npm run build', path.join(root, 'packages', 'billing'));
run('npm install', path.join(root, 'packages', 'shop'));
run('npm run build', path.join(root, 'packages', 'shop'));
run('npm install', path.join(root, 'packages', 'server'));
run('npm run build', path.join(root, 'packages', 'server'));
run('npm install', path.join(root, 'application'));
run('npm run build', path.join(root, 'application'));

// 2. Consolidate into Root (In-Place)
console.log(`> Consolidating into Root...`);

// Standalone UI Contents
const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) {
    // Copy contents of standalone into root
    fs.readdirSync(standalone).forEach(f => {
        const src = path.join(standalone, f);
        const dest = path.join(root, f);
        deployWithPermissions(src, dest);
    });
}

// Backend Dist
const backendDist = path.join(root, 'packages', 'server', 'dist');
if (fs.existsSync(backendDist)) {
    deployWithPermissions(backendDist, path.join(root, 'packages', 'server', 'dist'));
}

// NextJS Static Assets
const appNext = path.join(root, 'application', '.next');
deployWithPermissions(path.join(appNext, 'static'), path.join(root, '.next', 'static'));
deployWithPermissions(path.join(root, 'application', 'public'), path.join(root, 'public'));

// Force Permissions on Core Entry Points
['server.js', 'package.json', 'index.js'].forEach(f => {
    const p = path.join(root, f);
    if (fs.existsSync(p)) fs.chmodSync(p, 0o644);
});

// Final cleanup: Kill .htaccess to prevent LiteSpeed proxy blocks
if (fs.existsSync(path.join(root, '.htaccess'))) fs.unlinkSync(path.join(root, '.htaccess'));

console.log(`--- [SUCCESS] v62 ---`);
console.log(`MODE: IN-PLACE (ROOT)`);
