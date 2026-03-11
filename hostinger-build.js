const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Robustly copies content and sets permissions (644 for files, 755 for dirs).
 */
function deployRecursiveSync(src, dest) {
    try {
        if (!fs.existsSync(src)) return;
        const stats = fs.lstatSync(src);
        if (path.resolve(src) === path.resolve(dest)) return;

        if (stats.isDirectory()) {
            if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
            fs.chmodSync(dest, 0o755); // Directory permissions
            fs.readdirSync(src).forEach(child => {
                deployRecursiveSync(path.join(src, child), path.join(dest, child));
            });
        } else {
            fs.copyFileSync(src, dest);
            fs.chmodSync(dest, 0o644); // File permissions
        }
    } catch (err) {}
}

function run(cmd, cwd) {
    console.log(`\n> [BUILD-V48] ${cmd}`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit' });
    } catch (e) {
        console.warn(`> [SKIP] Command failed: ${cmd}`);
    }
}

const root = __dirname;
const targetDir = path.join(root, '.next'); 

console.log(`\n--- [BUILD-V48] PERMISSION-SAFE PROXY FIX ---`);

// 1. Build
run('npm install', root);
run('npm run build', path.join(root, 'application'));

// 2. Consolidate into root .next
console.log(`\n> Consolidating into /.next with permission enforcement...`);
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) {
    deployRecursiveSync(standalone, targetDir);
}

// Inject Required Files
['server.js', 'index.js', 'package.json', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, f));
        fs.chmodSync(path.join(targetDir, f), 0o644);
        console.log(`  [OK] Injected ${f}`);
    }
});

// Sync Assets
const appNext = path.join(root, 'application', '.next');
deployRecursiveSync(path.join(appNext, 'static'), path.join(targetDir, '.next', 'static'));
deployRecursiveSync(path.join(root, 'application', 'public'), path.join(targetDir, 'public'));

// 3. INJECT LITESPEED BRIDGE .HTACCESS
// This forces LiteSpeed to pass requests to the Node.js process instead of 403-ing
const bridgeHtaccess = `
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.js$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.js [L]
</IfModule>
`;
fs.writeFileSync(path.join(targetDir, '.htaccess'), bridgeHtaccess.trim());
fs.chmodSync(path.join(targetDir, '.htaccess'), 0o644);
console.log(`> [BRIDGE] Injected Node-Bridge .htaccess`);

// 4. CLEANUP OLD CONFLICTS
if (fs.existsSync(path.join(root, '.htaccess'))) {
    fs.unlinkSync(path.join(root, '.htaccess'));
}

console.log(`\n--- [BUILD-V48] SUCCESS ---`);
fs.readdirSync(targetDir).forEach(f => console.log(`  - ${f}`));
console.log(`\nMANDATORY: Set Hostinger "Entry File" to: index.js`);
console.log(`MANDATORY Output Directory (ABSOLUTE):`);
console.log(`/home/u102032541/domains/lightgreen-wolverine-191417.hostingersite.com/.next`);
