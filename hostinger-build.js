const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * v68 Build: The Relative Dist Fix
 * Uses relative paths to satisfy Hostinger's validator environment.
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

// DIAGNOSTICS
console.log(`--- [ENV] ---`);
console.log(`CWD: ${process.cwd()}`);
console.log(`__DIRNAME: ${__dirname}`);

// CRITICAL: Strictly relative target path
const targetDir = './dist'; 

console.log(`--- [BUILD] v68 RELATIVE-DIST ---`);

// 1. Monorepo Build
run('npm install', './packages/billing');
run('npm run build', './packages/billing');
run('npm install', './packages/shop');
run('npm run build', './packages/shop');
run('npm install', './packages/server');
run('npm run build', './packages/server');
run('npm install', './application');
run('npm run build', './application');

// 2. Prep Target
if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

// 3. Nested Consolidation (Crucial for Next.js folder preservation)
console.log(`> Packing monorepo into RELATIVE ./dist...`);

// Preserving .next folder
deployWithPermissions('./application/.next', './dist/.next');

// UI Standalone contents (node_modules etc)
const standalone = './application/.next/standalone';
if (fs.existsSync(standalone)) {
    fs.readdirSync(standalone).forEach(f => {
        if (f !== '.next') {
            deployWithPermissions(path.join(standalone, f), path.join(targetDir, f));
        }
    });
}

// Backend API
deployWithPermissions('./packages/server/dist', './dist/packages/server/dist');

// 4. Inject Entry Point (index.js)
console.log(`> Injecting index.js...`);
if (fs.existsSync('./server.js')) {
    fs.copyFileSync('./server.js', './dist/index.js');
    fs.chmodSync('./dist/index.js', 0o644);
}

// Shared Files
['package.json', '.env', '.env.local'].forEach(f => {
    if (fs.existsSync(f)) {
        fs.copyFileSync(f, path.join(targetDir, f));
        fs.chmodSync(path.join(targetDir, f), 0o644);
    }
});

// Final cleanup
if (fs.existsSync('./.htaccess')) fs.unlinkSync('./.htaccess');

console.log(`--- [SUCCESS] v68 ---`);
console.log(`TARGET: ./dist`);
console.log(`ENTRY: index.js`);
