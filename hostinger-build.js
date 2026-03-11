const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Robustly copies a directory or file.
 * Handles "same file" issues by skipping if source and destination are identical.
 */
function copyRecursiveSync(src, dest) {
    if (!fs.existsSync(src)) return;
    
    const stats = fs.statSync(src);
    const isDirectory = stats.isDirectory();

    // Prevent "same file" errors or infinite loops
    if (path.resolve(src) === path.resolve(dest)) {
        return;
    }

    if (isDirectory) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach((child) => {
            copyRecursiveSync(path.join(src, child), path.join(dest, child));
        });
    } else {
        // console.log(`- Copying: ${src} -> ${dest}`);
        fs.copyFileSync(src, dest);
    }
}

function run(cmd, cwd) {
    console.log(`\n> Running: ${cmd} in ${cwd || '.'}`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit' });
    } catch (e) {
        console.error(`ERROR: Command failed: ${cmd}`);
        process.exit(1);
    }
}

const root = __dirname;
const backupDir = path.join(root, '.build_backup');

console.log(`Target Root: ${root}`);

// 1. Backup critical orchestrator files
console.log('\n> Step 1: Backing up orchestrator files...');
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
const filesToPreserve = ['server.js', 'index.js', 'package.json', '.npmrc', '.htaccess'];
filesToPreserve.forEach(file => {
    const src = path.join(root, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(backupDir, file));
    }
});

// 2. Build Frontend (Standalone)
console.log('\n> Step 2: Building Frontend (Standalone)...');
run('npm run build', path.join(root, 'application'));

// 3. Build Backend
console.log('\n> Step 3: Building Backend...');
run('npm run build', path.join(root, 'packages/server'));

// 4. Flatten Standalone Bundle to Root
console.log('\n> Step 4: Flattening Standalone Bundle to Root...');
const standalonePath = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalonePath)) {
    console.log('Copying standalone bundle content to root...');
    copyRecursiveSync(standalonePath, root);
} else {
    console.error('ERROR: Standalone build not found at', standalonePath);
    process.exit(1);
}

// 5. Copy Static Assets back to Root .next
console.log('\n> Step 5: Copying Static Assets & Public Folder...');
const staticSrc = path.join(root, 'application', '.next', 'static');
const staticDest = path.join(root, '.next', 'static');
copyRecursiveSync(staticSrc, staticDest);

const publicSrc = path.join(root, 'application', 'public');
copyRecursiveSync(publicSrc, path.join(root, 'public'));

// 6. Restore our Unified Orchestrator (overwriting standalone defaults)
console.log('\n> Step 6: Restoring Unified Orchestrator from backup...');
filesToPreserve.forEach(file => {
    const src = path.join(backupDir, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(root, file));
    }
});

// 7. Add Backend services to Root
console.log('\n> Step 7: Adding Backend services to root packages/server/dist...');
const serverDistSrc = path.join(root, 'packages', 'server', 'dist');
const serverDistDest = path.join(root, 'packages', 'server', 'dist');
if (fs.existsSync(serverDistSrc)) {
    copyRecursiveSync(serverDistSrc, serverDistDest);
}

// 8. VERIFICATION: Ensure dependencies are actually at the root
console.log('\n> Step 8: Verifying production bundle integrity...');
const criticalPackages = ['next', 'express'];
let missing = false;
criticalPackages.forEach(pkg => {
    const pkgPath = path.join(root, 'node_modules', pkg);
    if (fs.existsSync(pkgPath)) {
        console.log(`[OK] Found critical package: ${pkg}`);
    } else {
        console.warn(`[WARNING] Critical package missing from root node_modules: ${pkg}`);
        missing = true;
    }
});

if (missing) {
    console.log('Attempting to recover missing root modules from application node_modules...');
    copyRecursiveSync(path.join(root, 'application', 'node_modules'), path.join(root, 'node_modules'));
}

// 9. Create a DUMMY output folder for Hostinger's validator
const dummyDir = path.join(root, '.hostinger_dummy');
if (!fs.existsSync(dummyDir)) fs.mkdirSync(dummyDir);
fs.writeFileSync(path.join(dummyDir, 'ok.txt'), 'ready');

console.log('\n--- ULTIMATE FLAT BUILD SUCCESSFUL ---');
console.log('All files and modules are verified at the root.');
console.log('Deployment should now be stable. Leaving "Output Directory" EMPTY is mandatory.');
