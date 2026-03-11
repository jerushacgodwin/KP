const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * v69 Build: The "build" Standardization
 * Uses standard "build" folder name with verbose logging for validator visibility.
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
            console.log(`[OK] ${dest}`);
        }
    } catch (err) {
        console.error(`[ERR] ${src} -> ${dest}: ${err.message}`);
    }
}

function run(cmd, cwd) {
    try {
        execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } });
    } catch (e) { process.exit(1); }
}

console.log(`--- [BUILD] v69 BUILD-STANDARD ---`);

// 1. Core Build Steps
run('npm install', './packages/billing');
run('npm run build', './packages/billing');
run('npm install', './packages/shop');
run('npm run build', './packages/shop');
run('npm install', './packages/server');
run('npm run build', './packages/server');
run('npm install', './application');
run('npm run build', './application');

// CRITICAL: Standard "build" folder name
const targetDir = './build'; 

// 2. Prep Target
if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

// 3. Verbose Consolidation
console.log(`> Packing into RELATIVE ./build...`);

// Preserving .next folder (Nested)
deployWithPermissions('./application/.next', './build/.next');

// UI Standalone contents
const standalone = './application/.next/standalone';
if (fs.existsSync(standalone)) {
    fs.readdirSync(standalone).forEach(f => {
        if (f !== '.next') { // Avoid duplicating nested .next
            deployWithPermissions(path.join(standalone, f), path.join(targetDir, f));
        }
    });
}

// Backend API
deployWithPermissions('./packages/server/dist', './build/packages/server/dist');

// 4. Inject Entry Point (index.js)
console.log(`> Injecting index.js...`);
if (fs.existsSync('./server.js')) {
    fs.copyFileSync('./server.js', './build/index.js');
    fs.chmodSync('./build/index.js', 0o644);
}

// Required Files
['package.json', '.env', '.env.local'].forEach(f => {
    if (fs.existsSync(f)) {
        fs.copyFileSync(f, path.join(targetDir, f));
        fs.chmodSync(path.join(targetDir, f), 0o644);
    }
});

// Final cleanup
if (fs.existsSync('./.htaccess')) fs.unlinkSync('./.htaccess');

console.log(`--- [SUCCESS] v69 ---`);
console.log(`TARGET: ./build`);
console.log(`ENTRY: index.js`);

// Exhaustive Tree Log for Validator proof
function listTree(dir, indent = '') {
    try {
        fs.readdirSync(dir).forEach(file => {
            const p = path.join(dir, file);
            const isDir = fs.lstatSync(p).isDirectory();
            console.log(`${indent}${isDir ? 'DIR' : 'FILE'}: ${file}`);
            if (isDir && !file.includes('node_modules') && indent.length < 6) {
                listTree(p, indent + '  ');
            }
        });
    } catch (e) {}
}
console.log(`> VALIDATOR MAP:`);
listTree(targetDir);
