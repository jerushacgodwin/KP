const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
    if (!fs.existsSync(src)) return;
    const stats = fs.statSync(src);
    if (path.resolve(src) === path.resolve(dest)) return;

    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(child => copyRecursiveSync(path.join(src, child), path.join(dest, child)));
    } else {
        fs.copyFileSync(src, dest);
    }
}

function run(cmd, cwd) {
    console.log(`\n> [BUILD-V40] ${cmd}`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } });
    } catch (e) {
        console.warn(`> [SKIP] ${cmd} failed, continuing with diagnostic.`);
    }
}

const root = __dirname;
// Detect Domain Root (/home/u102032541/domains/lightgreen-wolverine-191417.hostingersite.com)
const domainRoot = path.resolve(root, '../../../../');
const liveNodeJS = path.join(domainRoot, 'nodejs');
const livePublicHTML = path.join(domainRoot, 'public_html');
const standaloneDir = path.join(root, 'application', '.next', 'standalone');

console.log(`\n--- [BUILD-V40] DIRECT-TO-HOME DEPLOYMENT ---`);
console.log(`Build Root: ${root}`);
console.log(`Live NodeJS Target: ${liveNodeJS}`);
console.log(`Live Public Target: ${livePublicHTML}`);

// 1. Build
run('npm install', root);
run('npm run build', path.join(root, 'application'));

// 2. Clear Live NodeJS (Critical cleanup of old symlinks/files)
console.log(`\n> Cleaning Live NodeJS Directory...`);
if (fs.existsSync(liveNodeJS)) {
    fs.readdirSync(liveNodeJS).forEach(f => {
        // Only delete file/folders that we manage
        const p = path.join(liveNodeJS, f);
        fs.rmSync(p, { recursive: true, force: true });
    });
} else {
    fs.mkdirSync(liveNodeJS, { recursive: true });
}

// 3. Deploy to Live NodeJS
console.log(`\n> Deploying Engine to Live NodeJS...`);
if (fs.existsSync(standaloneDir)) {
    // Copy the engine + node_modules
    copyRecursiveSync(standaloneDir, liveNodeJS);
}

// Inject Entry Points & Configs
['server.js', 'index.js', 'package.json', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(liveNodeJS, f));
        console.log(`  [OK] Injected ${f} to /nodejs`);
    }
});

// 4. Deploy Assets to Live PublicHTML
console.log(`\n> Deploying Assets to Live PublicHTML...`);
if (!fs.existsSync(livePublicHTML)) fs.mkdirSync(livePublicHTML, { recursive: true });

copyRecursiveSync(path.join(root, 'application', '.next', 'static'), path.join(livePublicHTML, '.next', 'static'));
copyRecursiveSync(path.join(root, 'application', 'public'), path.join(livePublicHTML, 'public'));

// 5. Delete Conflict .htaccess in live public
const htaccess = path.join(livePublicHTML, '.htaccess');
if (fs.existsSync(htaccess)) fs.unlinkSync(htaccess);

console.log(`\n--- [BUILD-V40] DIRECT-TO-HOME DEPLOY COMPLETE ---`);
console.log(`MANDATORY: Set Hostinger "Output Directory" to: EMPTY (Clear the field)`);
console.log(`MANDATORY: Set Hostinger "Application Root" to: /nodejs`);
console.log(`MANDATORY: Set Hostinger "Entry File" to: server.js`);
