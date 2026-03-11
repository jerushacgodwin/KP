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
console.log(`Target Root: ${root}`);

// 1. Build Frontend (Standalone)
run('npm run build', path.join(root, 'application'));

// 2. Build Backend
run('npm run build', path.join(root, 'packages/server'));

// 3. Flatten Standalone Bundle to Root
console.log('\n> Flattening Standalone Bundle to Root...');

const standalonePath = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalonePath)) {
    console.log('Copying standalone bundle content to root...');
    // This copies server.js (Next.js server) and its isolated node_modules to the root
    run(`cp -r "${standalonePath}/." "${root}/"`);
} else {
    console.error('ERROR: Standalone build not found at', standalonePath);
    process.exit(1);
}

// 4. Copy Static Assets to Root .next
console.log('Copying static assets to root .next/static...');
const staticPath = path.join(root, 'application', '.next', 'static');
const rootStaticPath = path.join(root, '.next', 'static');
fs.mkdirSync(rootStaticPath, { recursive: true });
run(`cp -r "${staticPath}/." "${rootStaticPath}/"`);

console.log('Copying public folder to root public...');
run(`cp -r "application/public" "${root}/public"`);

// 5. Restore our Unified Orchestrator and entry points
console.log('Restoring Unified Orchestrator...');
// Standalone build might have its own server.js, we overwrite it with our unified one
run(`cp "server.js" "index.js" "package.json" ".npmrc" "${root}/"`);

// 6. Add Backend services to Root
console.log('Adding Backend services to root packages/server/dist...');
const serverDistTarget = path.join(root, 'packages', 'server', 'dist');
fs.mkdirSync(serverDistTarget, { recursive: true });
run(`cp -r "packages/server/dist/." "${serverDistTarget}/"`);

// 7. Create a DUMMY output folder just for Hostinger's validator
console.log('Creating dummy folder for Hostinger validator...');
fs.mkdirSync(path.join(root, '.hostinger_dummy'), { recursive: true });
fs.writeFileSync(path.join(root, '.hostinger_dummy', 'ok.txt'), 'ready');

console.log('\n--- ROOT BUILD SUCCESSFUL ---');
console.log('Everything is now at the root. Hostinger "Output Directory" should be LEFT EMPTY.');
