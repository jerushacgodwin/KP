const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * v63 Build: Managed Bundle Strategy
 * Consolidates into prod_bundle to avoid root collisions and cleaner deployment.
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
// CRITICAL: Dedicated bundle folder for "clean" mover deployment
const targetDir = path.join(root, 'prod_bundle'); 

console.log(`--- [BUILD] v63 MANAGED-BUNDLE ---`);

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
if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

// 3. Deploy Artifacts into Bundle
console.log(`> Bundling artifacts into /prod_bundle...`);

// Standalone UI
const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) deployWithPermissions(standalone, targetDir);

// Backend API
const backendDist = path.join(root, 'packages', 'server', 'dist');
if (fs.existsSync(backendDist)) deployWithPermissions(backendDist, path.join(targetDir, 'packages', 'server', 'dist'));

// NextJS Static Assets
const appNext = path.join(root, 'application', '.next');
deployWithPermissions(path.join(appNext, 'static'), path.join(targetDir, '.next', 'static'));
deployWithPermissions(path.join(root, 'application', 'public'), path.join(targetDir, 'public'));

// 4. Inject Unified Entry (RENAMED to avoid collision)
console.log(`> Injecting bundle-server.js...`);
const orchestratorSrc = path.join(root, 'server.js');
const orchestratorDest = path.join(targetDir, 'bundle-server.js');
if (fs.existsSync(orchestratorSrc)) {
    fs.copyFileSync(orchestratorSrc, orchestratorDest);
    fs.chmodSync(orchestratorDest, 0o644);
}

// Inject Required Files
['package.json', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, f));
        fs.chmodSync(path.join(targetDir, f), 0o644);
    }
});

// Final cleanup: Remove any root .htaccess that might cause 403
if (fs.existsSync(path.join(root, '.htaccess'))) fs.unlinkSync(path.join(root, '.htaccess'));

console.log(`--- [SUCCESS] v63 ---`);
console.log(`TARGET: /prod_bundle`);
console.log(`ENTRY: bundle-server.js`);
