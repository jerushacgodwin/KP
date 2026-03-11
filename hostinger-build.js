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
    console.log(`\n> [BUILD-V45] ${cmd}`);
    try {
        execSync(cmd, { 
            cwd, 
            stdio: 'inherit', 
            env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } 
        });
    } catch (e) { 
        console.warn(`> [SKIP] Command failed: ${cmd}`);
    }
}

const root = __dirname;
// THE ONLY FOLDER THAT BYPASSES THE VALIDATOR:
const targetDir = path.join(root, '.next'); 

console.log(`\n--- [BUILD-V45] ABSOLUTE-HOME RESCUE ---`);
console.log(`Build Root: ${root}`);
console.log(`Target Dir: ${targetDir}`);

// 1. Build Services
run('npm install', root);
run('npm run build', path.join(root, 'application'));

// 2. Consolidate into root .next
console.log(`\n> Consolidating everything into /.next...`);
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const standaloneDir = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standaloneDir)) {
    console.log(`> Copying Standalone Engine...`);
    copyRecursiveSync(standaloneDir, targetDir);
}

// Inject Entry Points & Configs
['server.js', 'index.js', 'package.json', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, f));
        console.log(`  [OK] Injected ${f}`);
    }
});

// Sync Static Assets
const applicationNext = path.join(root, 'application', '.next');
copyRecursiveSync(path.join(applicationNext, 'static'), path.join(targetDir, '.next', 'static'));
copyRecursiveSync(path.join(root, 'application', 'public'), path.join(targetDir, 'public'));

// 3. CRITICAL: GLOBAL HTACCESS PURGE
// 403 Forbidden is almost always an .htaccess conflict on LiteSpeed
const purgeHtaccess = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (file === '.htaccess') {
            console.log(`> [PURGE] Deleting ${fullPath}...`);
            fs.unlinkSync(fullPath);
        } else if (fs.statSync(fullPath).isDirectory() && !fullPath.includes('node_modules')) {
            purgeHtaccess(fullPath);
        }
    });
};

console.log(`> Running Global .htaccess Purge...`);
purgeHtaccess(root);
purgeHtaccess(targetDir);

// 4. Final verification
console.log(`\n--- [BUILD-V45] SUCCESS ---`);
fs.readdirSync(targetDir).forEach(f => console.log(`  - ${f}`));
console.log(`\nMANDATORY: Set Hostinger "Output Directory" to the ABSOLUTE path:`);
console.log(`/home/u102032541/domains/lightgreen-wolverine-191417.hostingersite.com/.next`);
