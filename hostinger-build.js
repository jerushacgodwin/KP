const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd, cwd) {
    console.log(`\n> Running: ${cmd} in ${cwd || '.'}`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit' });
    } catch (e) {
        console.error(`Command failed: ${cmd}`);
        process.exit(1);
    }
}

const root = __dirname;
const backupDir = path.join(root, '.build_backup');

console.log(`Target Root: ${root}`);

// 1. Backup critical orchestrator files before build
console.log('\n> Backing up orchestrator files...');
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
const filesToPreserve = ['server.js', 'index.js', 'package.json', '.npmrc', '.htaccess'];
filesToPreserve.forEach(file => {
    if (fs.existsSync(path.join(root, file))) {
        fs.copyFileSync(path.join(root, file), path.join(backupDir, file));
    }
});

// 2. Build Frontend (Standalone)
run('npm run build', path.join(root, 'application'));

// 3. Build Backend
run('npm run build', path.join(root, 'packages/server'));

// 4. Flatten Standalone Bundle to Root
console.log('\n> Flattening Standalone Bundle to Root...');
const standalonePath = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalonePath)) {
    console.log('Copying standalone bundle content to root...');
    // Use rsync-style copy (cp -r ./dir/.)
    // Note: This may overwrite root node_modules, which is what we want for standalone
    run(`cp -r "${standalonePath}/." "${root}/"`);
} else {
    console.error('ERROR: Standalone build not found at', standalonePath);
    process.exit(1);
}

// 5. Copy Static Assets back to Root .next
console.log('Copying static assets to root .next/static...');
const staticPath = path.join(root, 'application', '.next', 'static');
const rootStaticPath = path.join(root, '.next', 'static');
fs.mkdirSync(rootStaticPath, { recursive: true });
run(`cp -r "${staticPath}/." "${rootStaticPath}/"`);

console.log('Copying public folder to root public...');
run(`cp -r "application/public" "${root}/public"`);

// 6. Restore our Unified Orchestrator (overwriting standalone defaults)
console.log('\n> Restoring Unified Orchestrator from backup...');
filesToPreserve.forEach(file => {
    if (fs.existsSync(path.join(backupDir, file))) {
        fs.copyFileSync(path.join(backupDir, file), path.join(root, file));
    }
});

// 7. Add Backend services to Root
console.log('Adding Backend services to root packages/server/dist...');
const serverDistTarget = path.join(root, 'packages', 'server', 'dist');
fs.mkdirSync(serverDistTarget, { recursive: true });
run(`cp -r "packages/server/dist/." "${serverDistTarget}/"`);

// 8. Create a DUMMY output folder for Hostinger's validator
console.log('Creating dummy folder for Hostinger validator...');
const dummyDir = path.join(root, '.hostinger_dummy');
if (!fs.existsSync(dummyDir)) fs.mkdirSync(dummyDir);
fs.writeFileSync(path.join(dummyDir, 'ok.txt'), 'ready');

console.log('\n--- ROOT BUILD SUCCESSFUL ---');
console.log('Deployment structure is now flat at the root.');
console.log('Hostinger "Output Directory" should be LEFT EMPTY in the dashboard.');
