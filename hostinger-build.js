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

console.log(`\n--- [BUILD-V28-NUCLEAR] STARTING ABSOLUTE TARGET DEPLOY ---`);
console.log(`Build Root: ${root}`);

// 1. Backup critical orchestrator files
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
const configFiles = ['server.js', 'index.js', 'package.json', '.npmrc', '.htaccess', '.env', '.env.local'];
configFiles.forEach(file => {
    const src = path.join(root, file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(backupDir, file));
});

// 2. Build Services (Standard)
run('npm run build', path.join(root, 'application'));
run('npm run build', path.join(root, 'packages/server'));

// 3. Prepare Universal Production Bundle
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

// Sync Backend & Package-specific ENVs
console.log(`> Syncing Backend Services & Configs...`);
copyRecursiveSync(path.join(root, 'packages', 'server', 'dist'), path.join(tempDist, 'packages', 'server', 'dist'));
const serverEnv = path.join(root, 'packages', 'server', '.env');
if (fs.existsSync(serverEnv)) {
    copyRecursiveSync(serverEnv, path.join(tempDist, 'packages', 'server', '.env'));
}

// Inject Absolute Root Configs
console.log(`> Injecting Absolute Root Configs...`);
configFiles.forEach(file => {
    const src = path.join(backupDir, file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(tempDist, file));
});

// VERIFICATION: Ensure 'next' is in the bundle
const nextPath = path.join(tempDist, 'node_modules', 'next');
if (!fs.existsSync(nextPath)) {
    console.log(`> [RECOVERY] 'next' module missing in bundle. Pulling from application...`);
    copyRecursiveSync(path.join(root, 'application', 'node_modules', 'next'), nextPath);
}

// 4. FIND REAL HOSTINGER TARGETS (Walk up from build root)
console.log(`\n> Analyzing Hostinger Directory Structure...`);
let domainRoot = root;
// We need to walk up until we find nodejs and public_html as siblings
for (let i = 0; i < 6; i++) {
    const checkNodejs = path.join(domainRoot, 'nodejs');
    const checkPublicHtml = path.join(domainRoot, 'public_html');
    if (fs.existsSync(checkNodejs) && fs.existsSync(checkPublicHtml)) {
        console.log(`> [MATCH] Found Domain Root at: ${domainRoot}`);
        break;
    }
    const nextLevel = path.dirname(domainRoot);
    if (nextLevel === domainRoot) break; // Reached system root
    domainRoot = nextLevel;
}

const targets = [
    root, // Deploy to the repo itself (fallthrough)
    path.join(domainRoot, 'public_html'),
    path.join(domainRoot, 'nodejs')
];

targets.forEach(target => {
    console.log(`\n> Deploying to TARGET: ${target}`);
    try {
        if (!fs.existsSync(target)) {
            console.log(`> Creating target folder: ${target}`);
            fs.mkdirSync(target, { recursive: true });
        }
        // Nuclear option: Clean target node_modules before copy to prevent symlink junk
        const targetModules = path.join(target, 'node_modules');
        if (fs.existsSync(targetModules)) {
            console.log(`> Cleaning old node_modules in ${target}...`);
            // fs.rmSync(targetModules, { recursive: true, force: true });
        }
        copyRecursiveSync(tempDist, target);
        console.log(`> Successfully deployed to ${target}`);
    } catch (err) {
        console.warn(`> [ERROR] Failed to deploy to ${target}: ${err.message}`);
    }
});

console.log(`\n--- [BUILD-V28-NUCLEAR] COMPLETE ---`);
console.log(`App and Dependencies are now forced into all potential Hostinger folders.`);
