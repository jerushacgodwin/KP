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
        execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } });
    } catch (e) { 
        console.warn(`Build command failed: ${cmd}`);
        process.exit(1);
    }
}

const root = __dirname;
const standaloneDir = path.join(root, 'application', '.next', 'standalone');

console.log(`\n--- [BUILD-V32] STANDALONE AUTO-PACKAGE ---`);

// 1. Build Backend
run('npm run build', path.join(root, 'packages/server'));

// 2. Build Frontend (Standalone)
run('npm run build', path.join(root, 'application'));

// 3. Verify Standalone Folder
if (!fs.existsSync(standaloneDir)) {
    console.error(`> [FATAL] Standalone folder missing at ${standaloneDir}`);
    process.exit(1);
}

// 4. Inject Our Custom Files into Standalone
console.log(`\n> Injecting Orchestrator into Standalone...`);
const filesToInject = ['server.js', 'package.json', '.npmrc', '.env', '.env.local'];
filesToInject.forEach(file => {
    const src = path.join(root, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(standaloneDir, file));
        console.log(`  [OK] Injected ${file}`);
    }
});

// 5. Inject Backend into Standalone
console.log(`> Injecting Backend services...`);
const backendSrc = path.join(root, 'packages', 'server', 'dist');
const backendDest = path.join(standaloneDir, 'packages', 'server', 'dist');
copyRecursiveSync(backendSrc, backendDest);

// 6. Sync Assets into Standalone (Next.js requires these inside the standalone folder)
console.log(`> Syncing Static Assets...`);
copyRecursiveSync(path.join(root, 'application', '.next', 'static'), path.join(standaloneDir, '.next', 'static'));
copyRecursiveSync(path.join(root, 'application', 'public'), path.join(standaloneDir, 'public'));

console.log(`\n--- [BUILD-V32] STANDALONE READY ---`);
console.log(`NEXT STEP: Set Hostinger Output Directory to: application/.next/standalone`);
