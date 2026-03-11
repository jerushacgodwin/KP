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
    console.log(`\n> [BUILD-V41] ${cmd}`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } });
    } catch (e) {
        console.warn(`> [SKIP] ${cmd} failed, continuing with diagnostic.`);
    }
}

const root = __dirname;
const targetDir = path.join(root, '.next'); // ROOT-LEVEL .NEXT

console.log(`\n--- [BUILD-V41] ABSOLUTE-NEXT ASSEMBLY ---`);
console.log(`Build Root: ${root}`);
console.log(`Output Dir: ${targetDir}`);

// 1. Clean and Prepare
// We don't delete .next entirely because Next.js build might write to it first
// But we want to ensure it's a CLEAN deployment target
const applicationNext = path.join(root, 'application', '.next');

// 2. Build Services (Standard NPM)
run('npm install', root);
run('npm run build', path.join(root, 'application'));

// 3. Assemble Core into root .next
console.log(`\n> Consolidating everything into root .next folder...`);
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

// Copy Standalone Engine
const standaloneDir = path.join(applicationNext, 'standalone');
if (fs.existsSync(standaloneDir)) {
    console.log(`> Copying Standalone Engine...`);
    copyRecursiveSync(standaloneDir, targetDir);
}

// Inject Orchestrators & Configs
['server.js', 'index.js', 'package.json', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, f));
        console.log(`  [OK] Injected ${f}`);
    }
});

// Sync Assets
console.log(`> Syncing Static Assets...`);
copyRecursiveSync(path.join(applicationNext, 'static'), path.join(targetDir, '.next', 'static'));
copyRecursiveSync(path.join(root, 'application', 'public'), path.join(targetDir, 'public'));

console.log(`\n--- [BUILD-V41] FOLDER CONTENT CHECK ---`);
fs.readdirSync(targetDir).forEach(f => console.log(`  - ${f}`));

console.log(`\n--- [BUILD-V41] DONE ---`);
console.log(`RECOMMENDED: Set Hostinger "Output Directory" to the absolute path:`);
console.log(`/home/u102032541/domains/lightgreen-wolverine-191417.hostingersite.com/.next`);
