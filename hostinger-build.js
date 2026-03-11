const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * v65 Build: The "dist" Monolithic Bridge
 * Uses standard "dist" folder to satisfy Hostinger validator.
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
// CRITICAL: Standard "dist" name for Hostinger validator
const targetDir = path.join(root, 'dist'); 

console.log(`--- [BUILD] v65 DIST-BRIDGE-MONOLITH ---`);

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
if (fs.existsSync(targetDir)) {
    fs.readdirSync(targetDir).forEach(f => {
        const p = path.join(targetDir, f);
        if (fs.lstatSync(p).isDirectory()) fs.rmSync(p, { recursive: true, force: true });
        else fs.unlinkSync(p);
    });
} else {
    fs.mkdirSync(targetDir, { recursive: true });
}

// 3. Monolithic Consolidation
console.log(`> Packing monorepo into /dist...`);

// Standalone UI Contents
const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) deployWithPermissions(standalone, targetDir);

// Backend Server Dist
const backendDist = path.join(root, 'packages', 'server', 'dist');
deployWithPermissions(backendDist, path.join(targetDir, 'packages', 'server', 'dist'));

// Static Assets
const appNext = path.join(root, 'application', '.next');
deployWithPermissions(path.join(appNext, 'static'), path.join(targetDir, '.next', 'static'));
deployWithPermissions(path.join(root, 'application', 'public'), path.join(targetDir, 'public'));

// 4. Inject Unified Entry Points
['server.js', 'package.json', 'index.js', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, f));
        fs.chmodSync(path.join(targetDir, f), 0o644);
    }
});

// Final cleanup: Kill any root .htaccess that might cause 403
if (fs.existsSync(path.join(root, '.htaccess'))) fs.unlinkSync(path.join(root, '.htaccess'));

// 5. Diagnostic Tree Log (For Validator Visibility)
console.log(`--- [SUCCESS] v65 ---`);
console.log(`TARGET: /dist`);
function listTree(dir, indent = '') {
    try {
        fs.readdirSync(dir).forEach(file => {
            const p = path.join(dir, file);
            console.log(`${indent}${fs.lstatSync(p).isDirectory() ? 'DIR' : 'FILE'}: ${file}`);
            if (fs.lstatSync(p).isDirectory() && !file.includes('node_modules') && indent.length < 5) {
                listTree(p, indent + '  ');
            }
        });
    } catch (e) {}
}
console.log(`> VALIDATOR MAP:`);
listTree(targetDir);
