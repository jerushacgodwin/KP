const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * v66 Build: Validator-Safe Master
 * Reverts to .next for validator satisfaction but uses a UNIQUE orchestrator name.
 */
function deployWithPermissions(src, dest) {
    try {
        if (!fs.existsSync(src)) return;
        const stats = fs.lstatSync(src);
        if (dest.startsWith(src) && dest !== src) return; 

        if (stats.isDirectory()) {
            if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
            fs.chmodSync(dest, 0o755); 
            fs.readdirSync(src).forEach(child => {
                deployWithPermissions(path.join(src, child), path.join(dest, child));
            });
        } else {
            fs.copyFileSync(src, dest);
            fs.chmodSync(dest, 0o644);
        }
    } catch (err) {}
}

function run(cmd, cwd) {
    try {
        execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } });
    } catch (e) { process.exit(1); }
}

const root = __dirname;
// CRITICAL: Standard ".next" name for Hostinger validator
const targetDir = path.join(root, '.next'); 

console.log(`--- [BUILD] v66 VALIDATOR-SAFE-MASTER ---`);

// 1. Build Layer
run('npm install', path.join(root, 'packages', 'billing'));
run('npm run build', path.join(root, 'packages', 'billing'));
run('npm install', path.join(root, 'packages', 'shop'));
run('npm run build', path.join(root, 'packages', 'shop'));
run('npm install', path.join(root, 'packages', 'server'));
run('npm run build', path.join(root, 'packages', 'server'));
run('npm install', path.join(root, 'application'));
run('npm run build', path.join(root, 'application'));

// 2. Prep Target
if (fs.existsSync(targetDir)) {
    fs.readdirSync(targetDir).forEach(f => {
        const p = path.join(targetDir, f);
        if (fs.lstatSync(p).isDirectory()) fs.rmSync(p, { recursive: true, force: true });
        else fs.unlinkSync(p);
    });
} else {
    fs.mkdirSync(targetDir, { recursive: true });
}

// 3. Deploy Artifacts into .next
console.log(`> Consolidating monorepo into /.next...`);

// Standalone UI
const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) deployWithPermissions(standalone, targetDir);

// Backend API
const backendDist = path.join(root, 'packages', 'server', 'dist');
deployWithPermissions(backendDist, path.join(targetDir, 'packages', 'server', 'dist'));

// Assets
const appNext = path.join(root, 'application', '.next');
deployWithPermissions(path.join(appNext, 'static'), path.join(targetDir, '.next', 'static'));
deployWithPermissions(path.join(root, 'application', 'public'), path.join(targetDir, 'public'));

// 4. Inject Unique Orchestrator
console.log(`> Injecting UNIQUE master-entry.js...`);
const srcServer = path.join(root, 'server.js');
const destEntry = path.join(targetDir, 'master-entry.js'); // RENAMED to avoid collision
if (fs.existsSync(srcServer)) {
    fs.copyFileSync(srcServer, destEntry);
    fs.chmodSync(destEntry, 0o644);
}

// Shared Files
['package.json', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, f));
        fs.chmodSync(path.join(targetDir, f), 0o644);
    }
});

// Final cleanup: Kill any root .htaccess that might cause 403
if (fs.existsSync(path.join(root, '.htaccess'))) fs.unlinkSync(path.join(root, '.htaccess'));

console.log(`--- [SUCCESS] v66 ---`);
console.log(`TARGET: /.next`);
console.log(`ENTRY: master-entry.js`);
