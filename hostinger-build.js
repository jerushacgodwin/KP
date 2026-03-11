const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
    if (!fs.existsSync(src)) return;
    if (path.resolve(src) === path.resolve(dest)) return;
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(child => copyRecursiveSync(path.join(src, child), path.join(dest, child)));
    } else {
        fs.copyFileSync(src, dest);
    }
}

function run(cmd, cwd) {
    console.log(`\n> [BUILD] ${cmd}`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } });
    } catch (e) { process.exit(1); }
}

const root = __dirname;
console.log(`\n--- [BUILD-V29] SIMPLIFIED ROOT DEPLOY ---`);

// 1. Build
run('npm run build', path.join(root, 'application'));
run('npm run build', path.join(root, 'packages/server'));

// 2. Flatten Standalone to Root
const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) {
    console.log(`> Flattening Standalone to Root...`);
    copyRecursiveSync(standalone, root);
}

// 3. Sync Assets
copyRecursiveSync(path.join(root, 'application', '.next', 'static'), path.join(root, '.next', 'static'));
copyRecursiveSync(path.join(root, 'application', 'public'), path.join(root, 'public'));
copyRecursiveSync(path.join(root, 'packages', 'server', 'dist'), path.join(root, 'packages', 'server', 'dist'));

// 4. Force Cleanup .htaccess (Avoid 403 rewriting issues)
const htaccess = path.join(root, '.htaccess');
if (fs.existsSync(htaccess)) {
    console.log(`> Removing .htaccess to prevent proxy conflicts...`);
    fs.unlinkSync(htaccess);
}

console.log(`\n--- [BUILD-V29] ROOT READY ---`);
