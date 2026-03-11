const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Robustly copies content, skipping if src and dest are identical.
 */
function copyRecursiveSync(src, dest) {
    if (!fs.existsSync(src)) return;
    const stats = fs.statSync(src);
    if (path.resolve(src) === path.resolve(dest)) return;

    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(child => {
            copyRecursiveSync(path.join(src, child), path.join(dest, child));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

function run(cmd, cwd) {
    console.log(`\n> [BUILD] Running: ${cmd}${cwd ? ' in ' + cwd : ''}`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } });
    } catch (e) {
        process.exit(1);
    }
}

const root = __dirname;
const backupDir = path.join(root, '.production_backup');

console.log(`\n--- [BUILD-V27-FINGERPRINT] STARTING UNIFIED DEPLOY ---`);
console.log(`Execution Root: ${root}`);

// 1. Backup critical orchestrator files
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
['server.js', 'index.js', 'package.json', '.npmrc', '.htaccess'].forEach(file => {
    const src = path.join(root, file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(backupDir, file));
});

// 2. Build Services
run('npm run build', path.join(root, 'application'));
run('npm run build', path.join(root, 'packages/server'));

// 3. Prepare Universal Production Bundle in a temporary folder
const tempDist = path.join(root, '.temp_production_bundle');
if (fs.existsSync(tempDist)) fs.rmSync(tempDist, { recursive: true, force: true });
fs.mkdirSync(tempDist, { recursive: true });

// Copy Standalone Engine
const standalonePath = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalonePath)) {
    console.log(`> Extracting Standalone Engine...`);
    copyRecursiveSync(standalonePath, tempDist);
}

// Sync Assets
console.log(`> Syncing Static Assets...`);
copyRecursiveSync(path.join(root, 'application', '.next', 'static'), path.join(tempDist, '.next', 'static'));
copyRecursiveSync(path.join(root, 'application', 'public'), path.join(tempDist, 'public'));

// Sync Backend
console.log(`> Syncing Backend Services...`);
copyRecursiveSync(path.join(root, 'packages', 'server', 'dist'), path.join(tempDist, 'packages', 'server', 'dist'));

// Inject Orchestrator
console.log(`> Injecting Unified Orchestrator...`);
['server.js', 'index.js', 'package.json', '.npmrc', '.htaccess'].forEach(file => {
    const src = path.join(backupDir, file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(tempDist, file));
});

// 4. VERIFICATION: Ensure 'next' is in the bundle
const nextPath = path.join(tempDist, 'node_modules', 'next');
if (!fs.existsSync(nextPath)) {
    console.log(`> [RECOVERY] 'next' module missing in bundle. Pulling from application...`);
    copyRecursiveSync(path.join(root, 'application', 'node_modules', 'next'), nextPath);
}

// 5. BRUTE FORCE DEPLOYMENT: Deploy to ALL potential targets
const targets = [
    root,
    path.join(root, 'public_html'),
    path.join(root, 'nodejs')
];

targets.forEach(target => {
    if (target === root) {
         console.log(`\n> Deploying to ROOT: ${target}`);
         copyRecursiveSync(tempDist, target);
    } else {
         console.log(`\n> Deploying to SECONDARY TARGET: ${target}`);
         if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });
         copyRecursiveSync(tempDist, target);
    }
});

// 6. Hostinger Build Validator satisfying
const marker = path.join(root, '.hostinger_v27_verified');
if (!fs.existsSync(marker)) fs.mkdirSync(marker);
fs.writeFileSync(path.join(marker, 'build.txt'), `Build V27 Successful - ${new Date().toISOString()}`);

console.log(`\n--- [BUILD-V27-FINGERPRINT] ALL TARGETS POPULATED ---`);
console.log(`App is now present in ROOT, public_html, and nodejs folders.`);
