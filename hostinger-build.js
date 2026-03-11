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

console.log(`\n--- STARTING V25 MASTER BUILD ---`);
console.log(`Root Directory: ${root}`);

// 1. Backup critical files
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
['server.js', 'index.js', 'package.json', '.npmrc', '.htaccess'].forEach(file => {
    const src = path.join(root, file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(backupDir, file));
});

// 2. Build Services
run('npm run build', path.join(root, 'application'));
run('npm run build', path.join(root, 'packages/server'));

// 3. Flatten Standalone Bundle
const standalonePath = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalonePath)) {
    console.log(`\n> Deploying Standalone Engine to Root...`);
    copyRecursiveSync(standalonePath, root);
    
    console.log(`> Restoring Orchestrator files...`);
    ['server.js', 'index.js', 'package.json', '.npmrc', '.htaccess'].forEach(file => {
        const src = path.join(backupDir, file);
        if (fs.existsSync(src)) fs.copyFileSync(src, path.join(root, file));
    });
}

// 4. Static Assets Sync
console.log(`\n> Copying Static Assets...`);
copyRecursiveSync(path.join(root, 'application', '.next', 'static'), path.join(root, '.next', 'static'));
copyRecursiveSync(path.join(root, 'application', 'public'), path.join(root, 'public'));

// 5. Backend Integration
console.log(`\n> Integrating Backend Services...`);
const backendDist = path.join(root, 'packages', 'server', 'dist');
if (fs.existsSync(backendDist)) {
    copyRecursiveSync(backendDist, path.join(root, 'packages', 'server', 'dist'));
}

// 6. MODULE RECOVERY (The "Next.js" Fix)
console.log(`\n> Step 6: Verifying Critical Modules...`);
const nextModRoot = path.join(root, 'node_modules', 'next');
if (!fs.existsSync(nextModRoot)) {
    console.log(`> [CRITICAL] 'next' module missing at root. Searching sub-packages...`);
    const searchPaths = [
        path.join(root, 'application', 'node_modules', 'next'),
        path.join(root, 'packages', 'server', 'node_modules', 'next')
    ];
    for (const p of searchPaths) {
        if (fs.existsSync(p)) {
            console.log(`> Found 'next' at ${p}. Recovering to root...`);
            copyRecursiveSync(p, nextModRoot);
            break;
        }
    }
}

// 7. Hostinger Dummy Output
const dummy = path.join(root, '.hostinger_verified');
if (!fs.existsSync(dummy)) fs.mkdirSync(dummy);
fs.writeFileSync(path.join(dummy, 'ok.txt'), 'ready');

console.log(`\n--- V25 BUILD COMPLETED SUCCESSFULLY ---`);
