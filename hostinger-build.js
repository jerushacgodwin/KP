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
    console.log(`\n> [BUILD-V38] ${cmd}`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } });
    } catch (e) {
        console.warn(`> [SKIP] ${cmd} failed, continuing with diagnostic.`);
    }
}

const root = __dirname;
const targetDir = path.join(root, 'deploy'); // VISIBLE FOLDER

console.log(`\n--- [BUILD-V38] FORCED VISIBILITY ASSEMBLY ---`);
console.log(`Build Root: ${root}`);
console.log(`Output Dir: ${targetDir}`);

// 1. Clean and Prepare
if (fs.existsSync(targetDir)) {
    console.log(`> Cleaning existing contents of /deploy...`);
    fs.rmSync(targetDir, { recursive: true, force: true });
}
fs.mkdirSync(targetDir, { recursive: true });

// 2. Build (Standard)
run('npm install', root);
run('npm run build', path.join(root, 'application'));

// 3. Assemble Core
['server.js', 'index.js', 'package.json', 'node_modules', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        console.log(`  > Copying ${f}...`);
        copyRecursiveSync(src, path.join(targetDir, f));
    }
});

// 4. Assemble Public
if (fs.existsSync(path.join(root, 'public'))) {
    copyRecursiveSync(path.join(root, 'public'), path.join(targetDir, 'public'));
}

// 5. Standalone Sync
const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) {
    console.log(`> Injecting Standalone Engine...`);
    copyRecursiveSync(standalone, targetDir);
}

// 6. Sync Assets
copyRecursiveSync(path.join(root, 'application', '.next', 'static'), path.join(targetDir, '.next', 'static'));
copyRecursiveSync(path.join(root, 'application', 'public'), path.join(targetDir, 'public'));

console.log(`\n--- [BUILD-V38] FOLDER CONTENT CHECK ---`);
fs.readdirSync(targetDir).forEach(f => console.log(`  - ${f}`));

console.log(`\n--- [BUILD-V38] DONE ---`);
console.log(`MANDATORY: Set Hostinger "Output Directory" to: deploy`);
