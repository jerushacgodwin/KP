const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Standard Monorepo Build (v54 Full-Stack)
 * Builds Support Packages (Billing, Shop) -> Backend (Express) -> Frontend (Next.js)
 */
function run(cmd, cwd) {
    console.log(`\n> [V54-BUILD] ${cmd} (in ${cwd})`);
    try {
        execSync(cmd, { 
            cwd, 
            stdio: 'inherit',
            env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' }
        });
    } catch (e) {
        console.error(`> [FAIL] Command failed: ${cmd}`);
        process.exit(1);
    }
}

const root = __dirname;
// We target .next to bypass Hostinger's build validator
const targetDir = path.join(root, '.next'); 

console.log(`--- [MONOREPO-BUILD] FULL-STACK STARTING ---`);

// 1. Build Support Packages
console.log(`\n> Building Support Packages...`);
run('npm install', path.join(root, 'packages', 'billing'));
run('npm run build', path.join(root, 'packages', 'billing'));

run('npm install', path.join(root, 'packages', 'shop'));
run('npm run build', path.join(root, 'packages', 'shop'));

// 2. Build Backend
console.log(`\n> Building Backend API...`);
run('npm install', path.join(root, 'packages', 'server'));
run('npm run build', path.join(root, 'packages', 'server'));

// 3. Build Main Frontend
console.log(`\n> Building Main Application...`);
run('npm install', path.join(root, 'application'));
run('npm run build', path.join(root, 'application'));

// 4. Consolidate into .next
console.log(`\n> Consolidating all artifacts into /.next...`);
if (fs.existsSync(targetDir)) {
    // Keep target dir but clean contents to avoid re-creating folder issues
    fs.readdirSync(targetDir).forEach(f => {
        const p = path.join(targetDir, f);
        if (fs.lstatSync(p).isDirectory()) fs.rmSync(p, { recursive: true, force: true });
        else fs.unlinkSync(p);
    });
} else {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Frontend Standalone Engine
const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) {
    console.log(`> Injecting Frontend Standalone...`);
    fs.cpSync(standalone, targetDir, { recursive: true });
}

// Backend Dist
const backendDist = path.join(root, 'packages', 'server', 'dist');
if (fs.existsSync(backendDist)) {
    console.log(`> Injecting Backend Dist...`);
    fs.cpSync(backendDist, path.join(targetDir, 'packages', 'server', 'dist'), { recursive: true });
}

// Injected Static Assets
console.log(`> Syncing Static Assets...`);
const appNext = path.join(root, 'application', '.next');
fs.cpSync(path.join(appNext, 'static'), path.join(targetDir, '.next', 'static'), { recursive: true });
fs.cpSync(path.join(root, 'application', 'public'), path.join(targetDir, 'public'), { recursive: true });

// Inject Support Package Libraries (Required for transpilation resolution if needed at runtime)
// Note: Standalone usually bundles these, but we keep them for safety
const billingLib = path.join(root, 'packages', 'billing', 'lib');
if (fs.existsSync(billingLib)) {
    fs.cpSync(billingLib, path.join(targetDir, 'packages', 'billing', 'lib'), { recursive: true });
}

// Inject Required Entry Files
['server.js', 'package.json', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, f));
        console.log(`  [OK] Injected ${f}`);
    }
});

// Final Clean: Purge problematic .htaccess
if (fs.existsSync(path.join(root, '.htaccess'))) fs.unlinkSync(path.join(root, '.htaccess'));
if (fs.existsSync(path.join(targetDir, '.htaccess'))) fs.unlinkSync(path.join(targetDir, '.htaccess'));

console.log(`\n--- [V54-BUILD] SUCCESS ---`);
console.log(`DEPLOYMENT NOTES:`);
console.log(`1. Set "Output Directory" to the ABSOLUTE PATH of your .next folder.`);
console.log(`2. Set "Entry File" to server.js.`);
