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
    console.log(`\n> [BUILD] ${cmd}`);
    try {
        execSync(cmd, { 
            cwd, 
            stdio: 'inherit', 
            env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } 
        });
    } catch (e) { 
        console.error(`> [ERROR] Command failed: ${cmd}`);
        process.exit(1);
    }
}

const root = __dirname;
const distDir = path.join(root, 'dist');
const standaloneDir = path.join(root, 'application', '.next', 'standalone');

console.log(`\n--- [BUILD-V33] FLAT ROOT-DIST PREP ---`);
console.log(`Build Root: ${root}`);
console.log(`Target Dist: ${distDir}`);

// 1. Clean Dist
if (fs.existsSync(distDir)) {
    console.log(`> Cleaning existing dist...`);
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Build Services (Standard)
run('npm run build', path.join(root, 'packages/server'));
run('npm run build', path.join(root, 'application'));

// 3. Assemble Dist
console.log(`\n> Assembling Production Bundle in /dist...`);

// Copy Standalone
if (fs.existsSync(standaloneDir)) {
    console.log(`> Copying Standalone Engine...`);
    copyRecursiveSync(standaloneDir, distDir);
} else {
    console.error(`> [FATAL] Standalone not found at ${standaloneDir}`);
    process.exit(1);
}

// Inject Orchestrator & Configs
const filesToInject = ['server.js', 'index.js', 'package.json', '.npmrc', '.env', '.env.local'];
filesToInject.forEach(file => {
    const src = path.join(root, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(distDir, file));
        console.log(`  [OK] Injected ${file}`);
    }
});

// Inject Backend
console.log(`> Injecting Backend services...`);
copyRecursiveSync(path.join(root, 'packages', 'server', 'dist'), path.join(distDir, 'packages', 'server', 'dist'));

// Sync Assets (Required inside standalone structure)
console.log(`> Syncing Static Assets...`);
copyRecursiveSync(path.join(root, 'application', '.next', 'static'), path.join(distDir, '.next', 'static'));
copyRecursiveSync(path.join(root, 'application', 'public'), path.join(distDir, 'public'));

// 4. Verification Check
if (fs.existsSync(path.join(distDir, 'server.js')) && fs.existsSync(path.join(distDir, 'node_modules'))) {
    console.log(`\n--- [BUILD-V33] SUCCESS: DIST IS READY ---`);
    console.log(`MANDATORY: Set Hostinger Output Directory to: dist`);
} else {
    console.error(`\n--- [BUILD-V33] FAILURE: DIST IS INCOMPLETE ---`);
    process.exit(1);
}
