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
    console.log(`\n> [BUILD-V35] ${cmd}`);
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
const targetDir = path.join(root, 'hostinger_ready'); // NOT IN .GITIGNORE
const standaloneDir = path.join(root, 'application', '.next', 'standalone');

console.log(`\n--- [BUILD-V35] UNIGNORED DEPLOYMENT PREP ---`);
console.log(`Working Directory: ${root}`);
console.log(`Target Directory: ${targetDir}`);

// 1. Clean/Create target directory
if (fs.existsSync(targetDir)) {
    console.log(`> Cleaning existing target...`);
    fs.rmSync(targetDir, { recursive: true, force: true });
}
fs.mkdirSync(targetDir, { recursive: true });

// 2. Build Services
run('npm install', root); 
run('npm run build', path.join(root, 'packages/server'));
run('npm run build', path.join(root, 'application'));

// 3. Assemble Everything into hostinger_ready
console.log(`\n> Assembling Production Bundle in /hostinger_ready...`);

// Copy Standalone Engine (which includes node_modules)
if (fs.existsSync(standaloneDir)) {
    console.log(`> Copying Standalone Engine...`);
    copyRecursiveSync(standaloneDir, targetDir);
} else {
    console.error(`> [FATAL] Standalone not found at ${standaloneDir}`);
    process.exit(1);
}

// Inject Orchestrator & Configs
const filesToInject = ['server.js', 'index.js', 'package.json', '.env', '.env.local'];
filesToInject.forEach(file => {
    const src = path.join(root, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, file));
        console.log(`  [OK] Injected ${file}`);
    }
});

// Inject Backend
console.log(`> Injecting Backend services...`);
copyRecursiveSync(path.join(root, 'packages', 'server', 'dist'), path.join(targetDir, 'packages', 'server', 'dist'));

// Sync Assets (Required inside standalone structure)
console.log(`> Syncing Static Assets...`);
copyRecursiveSync(path.join(root, 'application', '.next', 'static'), path.join(targetDir, '.next', 'static'));
copyRecursiveSync(path.join(root, 'application', 'public'), path.join(targetDir, 'public'));

// 4. Force Cleanup of Conflict Files in target
const htaccess = path.join(targetDir, '.htaccess');
if (fs.existsSync(htaccess)) {
    fs.unlinkSync(htaccess);
}

// 5. Final Verification
if (fs.existsSync(path.join(targetDir, 'server.js')) && fs.existsSync(path.join(targetDir, 'node_modules'))) {
    console.log(`\n--- [BUILD-V35] SUCCESS: HOSTINGER_READY IS PRODUCTION-READY ---`);
    console.log(`MANDATORY: Set Hostinger Output Directory to: hostinger_ready`);
} else {
    console.error(`\n--- [BUILD-V35] FAILURE: BUNDLE IS INCOMPLETE ---`);
    process.exit(1);
}
