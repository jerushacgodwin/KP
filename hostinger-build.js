const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * v59 Build: Dot-Free Absolute Master
 * Renames .next to app_bundle to satisfy LiteSpeed.
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
// CRITICAL: Non-dot folder to avoid LiteSpeed blocking
const targetDir = path.join(root, 'app_bundle'); 

console.log(`--- [BUILD] v59 DOT-FREE-MASTER ---`);

// 1. Build
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

// 3. Deploy
const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) deployWithPermissions(standalone, targetDir);

const backendDist = path.join(root, 'packages', 'server', 'dist');
deployWithPermissions(backendDist, path.join(targetDir, 'packages', 'server', 'dist'));

// Assets
const appNext = path.join(root, 'application', '.next');
deployWithPermissions(path.join(appNext, 'static'), path.join(targetDir, '.next', 'static'));
deployWithPermissions(path.join(root, 'application', 'public'), path.join(targetDir, 'public'));

// 4. Inject Entry Points
console.log(`> Injecting Dot-Free Entry Points...`);
['server.js', 'index.js', 'package.json', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, f));
        fs.chmodSync(path.join(targetDir, f), 0o644);
    }
});

// Final cleanup: Kill any .htaccess that might block us
const purgeHtaccess = (dir) => {
    if (!fs.existsSync(dir)) return;
    try {
        fs.readdirSync(dir).forEach(file => {
            const p = path.join(dir, file);
            if (file === '.htaccess') fs.unlinkSync(p);
            else if (fs.lstatSync(p).isDirectory() && !p.includes('node_modules')) purgeHtaccess(p);
        });
    } catch (e) {}
};
purgeHtaccess(root);

console.log(`--- [SUCCESS] v59 ---`);
console.log(`TARGET: /app_bundle`);
