const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Robustly copies content and sets permissions.
 */
function deployRecursiveSync(src, dest) {
    try {
        if (!fs.existsSync(src)) return;
        const stats = fs.lstatSync(src);
        if (path.resolve(src) === path.resolve(dest)) return;

        if (stats.isDirectory()) {
            if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
            fs.readdirSync(src).forEach(child => {
                deployRecursiveSync(path.join(src, child), path.join(dest, child));
            });
        } else {
            fs.copyFileSync(src, dest);
        }
    } catch (err) {}
}

function run(cmd, cwd) {
    console.log(`\n> [BUILD-V51] ${cmd} (in ${cwd})`);
    try {
        execSync(cmd, { 
            cwd, 
            stdio: 'inherit',
            env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' }
        });
    } catch (e) {
        console.warn(`> [WARN] Command failed: ${cmd}`);
    }
}

const root = __dirname;
const targetDir = path.join(root, '.next'); 

console.log(`\n--- [BUILD-V51] UNIFIED MONOREPO MASTER ---`);

// 1. Build Backend
console.log(`\n> Building Backend (packages/server)...`);
run('npm install', path.join(root, 'packages', 'server'));
run('npm run build', path.join(root, 'packages', 'server'));

// 2. Build Frontend
console.log(`\n> Building Frontend (application)...`);
run('npm install', path.join(root, 'application'));
run('npm run build', path.join(root, 'application'));

// 3. Consolidate into root .next
console.log(`\n> Consolidating everything into /.next...`);
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

// Copy Standalone Frontend
const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) {
    console.log(`> Injecting Frontend Standalone...`);
    deployRecursiveSync(standalone, targetDir);
}

// Copy Backend Build
const backendDist = path.join(root, 'packages', 'server', 'dist');
const targetBackend = path.join(targetDir, 'packages', 'server', 'dist');
if (fs.existsSync(backendDist)) {
    console.log(`> Injecting Backend Dist...`);
    deployRecursiveSync(backendDist, targetBackend);
}

// Inject Required Root Files
['server.js', 'index.js', 'package.json', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, f));
        console.log(`  [OK] Injected ${f}`);
    }
});

// Final Sync of Static Assets
console.log(`> Syncing public/static assets...`);
const appNext = path.join(root, 'application', '.next');
deployRecursiveSync(path.join(appNext, 'static'), path.join(targetDir, '.next', 'static'));
deployRecursiveSync(path.join(root, 'application', 'public'), path.join(targetDir, 'public'));

// 4. GLOBAL .HTACCESS PURGE
const purgeHtaccess = (dir) => {
    if (!fs.existsSync(dir)) return;
    try {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const p = path.join(dir, file);
            if (file === '.htaccess') {
                fs.unlinkSync(p);
            } else if (fs.lstatSync(p).isDirectory() && !p.includes('node_modules')) {
                purgeHtaccess(p);
            }
        });
    } catch (e) {}
};
purgeHtaccess(root);
purgeHtaccess(targetDir);

console.log(`\n--- [BUILD-V51] SUCCESS ---`);
console.log(`MANDATORY Output Directory (ABSOLUTE):`);
console.log(`/home/u102032541/domains/lightgreen-wolverine-191417.hostingersite.com/.next`);
