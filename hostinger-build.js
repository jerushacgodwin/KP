const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * v70 Build: The Un-Ignored Output
 * Uses a folder explicitly un-ignored in .gitignore for validator visibility.
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

console.log(`--- [BUILD] v70 UN-IGNORED-FIX ---`);

// 1. Core Build Steps
run('npm install', './packages/billing');
run('npm run build', './packages/billing');
run('npm install', './packages/shop');
run('npm run build', './packages/shop');
run('npm install', './packages/server');
run('npm run build', './packages/server');
run('npm install', './application');
run('npm run build', './application');

// CRITICAL: New un-ignored folder name
const targetDir = './deploy_final'; 

// 2. Prep Target
if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

// 3. Verbose Consolidation
console.log(`> Packing into UN-IGNORED ./deploy_final...`);

// Preserving .next folder (Nested)
deployWithPermissions('./application/.next', './deploy_final/.next');

// UI Standalone contents
const standalone = './application/.next/standalone';
if (fs.existsSync(standalone)) {
    fs.readdirSync(standalone).forEach(f => {
        if (f !== '.next') {
            deployWithPermissions(path.join(standalone, f), path.join(targetDir, f));
        }
    });
}

// Ensure the application code is in the right place
// Standalone usually puts the app in a subfolder with its name
// In our case: deploy_final/application/

// Backend API
deployWithPermissions('./packages/server/dist', './deploy_final/packages/server/dist');

// 5. Inject Entry Point (index.js)
console.log(`> Injecting index.js...`);
const srcServer = './server.js';
if (fs.existsSync(srcServer)) {
    fs.copyFileSync(srcServer, './deploy_final/index.js');
    fs.chmodSync('./deploy_final/index.js', 0o644);
}

// Required Files
['package.json', '.env', '.env.local'].forEach(f => {
    if (fs.existsSync(f)) {
        fs.copyFileSync(f, path.join(targetDir, f));
        fs.chmodSync(path.join(targetDir, f), 0o644);
    }
});

// Final cleanup: Kill any root .htaccess
if (fs.existsSync('./.htaccess')) fs.unlinkSync('./.htaccess');

console.log(`--- [SUCCESS] v70 ---`);
console.log(`TARGET: ./deploy_final`);
console.log(`ENTRY: index.js`);

// Full Validator Map
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
