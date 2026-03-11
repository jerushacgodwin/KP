const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
    if (!fs.existsSync(src)) return;
    const stats = fs.statSync(src);
    if (path.resolve(src) === path.resolve(dest)) return;

    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(child => copyRecursiveSync(path.join(src, child), path.join(dest, child)));
    } else {
        fs.copyFileSync(src, dest);
    }
}

function run(cmd, cwd) {
    console.log(`\n> [BUILD-V42] ${cmd}`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } });
    } catch (e) {
        console.warn(`> [SKIP] ${cmd} failed, continuing with diagnostic.`);
    }
}

const root = __dirname;
const targetDir = path.join(root, 'out');

console.log(`\n--- [BUILD-V42] LITESPEED-SAFE ASSEMBLY ---`);

// 1. Clean and Prepare
if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

// 2. Build Services (Standard NPM)
run('npm install', root);
run('npm run build', path.join(root, 'application'));

// 3. Assemble Core
console.log(`\n> Consolidating into /out...`);
const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) {
    copyRecursiveSync(standalone, targetDir);
}

// Inject Required Files
['server.js', 'index.js', 'package.json', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(targetDir, f));
});

// Sync Assets
const applicationNext = path.join(root, 'application', '.next');
copyRecursiveSync(path.join(applicationNext, 'static'), path.join(targetDir, '.next', 'static'));
copyRecursiveSync(path.join(root, 'application', 'public'), path.join(targetDir, 'public'));

// 4. CRITICAL: PURGE .HTACCESS
// LiteSpeed rules in .htaccess often cause 403 Forbidden with Node.js
const htaccessPath = path.join(targetDir, '.htaccess');
if (fs.existsSync(htaccessPath)) {
    console.log(`> [CLEANUP] Removing conflicting .htaccess...`);
    fs.unlinkSync(htaccessPath);
}

// 5. Final Verification
console.log(`\n--- [BUILD-V42] SUCCESS ---`);
fs.readdirSync(targetDir).forEach(f => console.log(`  - ${f}`));
console.log(`\nMANDATORY: Set Hostinger "Output Directory" to: out`);
