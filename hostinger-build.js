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
    console.log(`\n> [BUILD-V37] ${cmd}`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } });
    } catch (e) {
        console.warn(`> [SKIP] ${cmd} failed, continuing with diagnostic.`);
    }
}

const root = __dirname;
const targetDir = path.join(root, 'hostinger_ready');

console.log(`\n--- [BUILD-V37] BREADCRUMB ASSEMBLY ---`);

// 1. Clean and Prepare
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
fs.readdirSync(targetDir).forEach(f => {
    if (f !== '.gitkeep') fs.rmSync(path.join(targetDir, f), { recursive: true, force: true });
});

// 2. Build (Minimal)
run('npm install', root);
run('npm run build', path.join(root, 'application'));

// 3. Assemble Core
['server.js', 'index.js', 'package.json', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, f));
        console.log(`  [OK] ${f}`);
    }
});

// 4. Assemble Public (Breadcrumbs)
console.log(`> Deploying public breadcrumbs...`);
copyRecursiveSync(path.join(root, 'public'), path.join(targetDir, 'public'));

// 5. Standalone Check
const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) {
    console.log(`> Standalone found! Injecting into bundle.`);
    copyRecursiveSync(standalone, targetDir);
}

// 6. Final verification & Mandatory log for Hostinger validator
console.log(`\n> Verification List for ${targetDir}:`);
fs.readdirSync(targetDir).forEach(f => console.log(`  - ${f}`));

console.log(`\n--- [BUILD-V37] READY TO MOVE ---`);
console.log(`Set "Output Directory" to: hostinger_ready`);
