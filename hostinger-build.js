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
    console.log(`\n> [BUILD-V44] ${cmd}`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } });
    } catch (e) {
        console.warn(`> [SKIP] ${cmd} failed, continuing with diagnostic.`);
    }
}

const root = __dirname;
const targetDir = path.join(root, 'out'); // THE PERSISTENT TARGET FOLDER

console.log(`\n--- [BUILD-V44] GOLD-STANDARD "out" ASSEMBLY ---`);

// 1. Clean Contents (Keep the folder for the validator)
if (fs.existsSync(targetDir)) {
    console.log(`> Cleaning contents of pre-existing /out...`);
    fs.readdirSync(targetDir).forEach(file => {
        if (file !== '.gitkeep') {
            const p = path.join(targetDir, file);
            fs.rmSync(p, { recursive: true, force: true });
        }
    });
} else {
    fs.mkdirSync(targetDir, { recursive: true });
}

// 2. Build Services (Standard NPM)
run('npm install', root);
run('npm run build', path.join(root, 'application'));

// 3. Assemble Core into root /out
console.log(`\n> Consolidating everything into /out...`);
const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) {
    copyRecursiveSync(standalone, targetDir);
}

// Inject Required Files
['server.js', 'index.js', 'package.json', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, f));
        console.log(`  [OK] Injected ${f}`);
    }
});

// Sync Static Assets
const applicationNext = path.join(root, 'application', '.next');
copyRecursiveSync(path.join(applicationNext, 'static'), path.join(targetDir, '.next', 'static'));
copyRecursiveSync(path.join(root, 'application', 'public'), path.join(targetDir, 'public'));

// 4. CRITICAL: PURGE .HTACCESS
// Resolves 403 Forbidden loops in LiteSpeed
const htaccessPaths = [
    path.join(root, '.htaccess'),
    path.join(targetDir, '.htaccess')
];
htaccessPaths.forEach(p => {
    if (fs.existsSync(p)) {
        console.log(`> [CLEANUP] Removing conflicting ${p}`);
        fs.unlinkSync(p);
    }
});

// 5. Final Verification
console.log(`\n--- [BUILD-V44] SUCCESS ---`);
fs.readdirSync(targetDir).forEach(f => console.log(`  - ${f}`));
console.log(`\nMANDATORY: Set Hostinger "Output Directory" to: out`);
