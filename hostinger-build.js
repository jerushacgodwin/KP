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
    console.log(`\n> [BUILD-V34] ${cmd}`);
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
const standaloneDir = path.join(root, 'application', '.next', 'standalone');

console.log(`\n--- [BUILD-V34] NPM-FLAT-ROOT PREP ---`);
console.log(`Working Directory: ${root}`);

// 1. Build Services
// Using strictly 'npm' to avoid pnpm symlink issues
run('npm install', root); // Ensure root dependencies are flat
run('npm run build', path.join(root, 'packages/server'));
run('npm run build', path.join(root, 'application'));

// 2. Flatten Standalone to Root
// Next.js standalone contains its own node_modules and server.js
if (fs.existsSync(standaloneDir)) {
    console.log(`\n> Moving Standalone Engine to Root...`);
    copyRecursiveSync(standaloneDir, root);
} else {
    console.error(`> [FATAL] Standalone not found at ${standaloneDir}`);
    process.exit(1);
}

// 3. Inject Assets and Manual Overrides
console.log(`> Syncing Static Assets & Backend dist...`);
copyRecursiveSync(path.join(root, 'application', '.next', 'static'), path.join(root, '.next', 'static'));
copyRecursiveSync(path.join(root, 'application', 'public'), path.join(root, 'public'));
copyRecursiveSync(path.join(root, 'packages', 'server', 'dist'), path.join(root, 'packages', 'server', 'dist'));

// 4. Force Cleanup of Conflict Files
const filesToCleanup = ['.htaccess', '.pnpm-debug.log', 'pnpm-lock.yaml'];
filesToCleanup.forEach(f => {
    const p = path.join(root, f);
    if (fs.existsSync(p)) {
        console.log(`> Cleaning up ${f}...`);
        fs.unlinkSync(p);
    }
});

// 5. Final Verification
if (fs.existsSync(path.join(root, 'server.js')) && fs.existsSync(path.join(root, 'node_modules'))) {
    console.log(`\n--- [BUILD-V34] SUCCESS: ROOT IS PRODUCTION-READY ---`);
    console.log(`MANDATORY: Set Hostinger "Output Directory" to EMPTY (leave it blank).`);
} else {
    console.error(`\n--- [BUILD-V34] FAILURE: ROOT MISSING CORE FILES ---`);
    process.exit(1);
}
