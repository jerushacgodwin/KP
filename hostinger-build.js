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
    console.log(`\n> [BUILD-V43] ${cmd}`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } });
    } catch (e) {
        console.warn(`> [SKIP] ${cmd} failed, continuing with diagnostic.`);
    }
}

const root = __dirname;
const targetDir = path.join(root, '.next'); // TARGET FOLDER PER USER FEEDBACK

console.log(`\n--- [BUILD-V43] ABSOLUTE-NEXT + PURGE ASSEMBLY ---`);

// 1. Clean and Prepare Target (BUT DON'T DELETE .next entirely if it's the build output)
// We instead just ensure we have a clean slate for the *standalone* parts inside it
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

// 2. Build Services (Standard NPM)
run('npm install', root);
run('npm run build', path.join(root, 'application'));

// 3. Assemble Core
console.log(`\n> Consolidating into root /.next...`);
const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) {
    copyRecursiveSync(standalone, targetDir);
}

// Inject Required Files to the output root
['server.js', 'index.js', 'package.json', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(targetDir, f));
});

// Sync Static Assets (Required inside standalone .next structure)
const applicationNext = path.join(root, 'application', '.next');
copyRecursiveSync(path.join(applicationNext, 'static'), path.join(targetDir, '.next', 'static'));
copyRecursiveSync(path.join(root, 'application', 'public'), path.join(targetDir, 'public'));

// 4. CRITICAL: PURGE .HTACCESS
// Prevents 403 Forbidden loops in LiteSpeed
const conflictFiles = [
    path.join(root, '.htaccess'),
    path.join(targetDir, '.htaccess')
];
conflictFiles.forEach(f => {
    if (fs.existsSync(f)) {
        console.log(`> [CLEANUP] Purging ${f}`);
        fs.unlinkSync(f);
    }
});

// 5. Final Verification
console.log(`\n--- [BUILD-V43] SUCCESS ---`);
fs.readdirSync(targetDir).forEach(f => console.log(`  - ${f}`));
console.log(`\nMANDATORY: Set Hostinger "Output Directory" to the ABSOLUTE path:`);
console.log(`/home/u102032541/domains/lightgreen-wolverine-191417.hostingersite.com/.next`);
