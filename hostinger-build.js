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

// 1. Clean and Create Dist
const dist = path.join(__dirname, 'dist');
console.log(`Target Dist: ${dist}`);
if (fs.existsSync(dist)) {
    console.log('Cleaning existing dist...');
    fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist, { recursive: true });

// 2. Build Frontend (Standalone)
run('npm run build', path.join(__dirname, 'application'));

// 3. Build Backend
run('npm run build', path.join(__dirname, 'packages/server'));

// 4. Organize Dist for Hostinger logic
// Hostinger moves the CONTENTS of the specified "Output Directory" to the root.
console.log('\n> Organizing files for Hostinger deployment...');

const standalonePath = path.join(__dirname, 'application', '.next', 'standalone');
if (fs.existsSync(standalonePath)) {
    console.log('Copying standalone bundle...');
    run(`cp -r "${standalonePath}/." "${dist}/"`);
} else {
    console.error('ERROR: Standalone build not found at', standalonePath);
    process.exit(1);
}

// Next.js needs /public and /.next/static to be manually copied into the production runner
console.log('Copying static assets...');
const staticPath = path.join(__dirname, 'application', '.next', 'static');
const distStaticPath = path.join(dist, '.next', 'static');
fs.mkdirSync(distStaticPath, { recursive: true });
run(`cp -r "${staticPath}/." "${distStaticPath}/"`);

console.log('Copying public folder...');
run(`cp -r "application/public" "${dist}/public"`);

// Copy our Unified Orchestrator and entry points
// This overwrites the Next.js default server.js in standalone folder
console.log('Adding Unified Orchestrator...');
run(`cp "server.js" "index.js" "package.json" ".npmrc" "${dist}/"`);

// Copy Backend dist into the bundle
console.log('Adding Backend services...');
const serverDistTarget = path.join(dist, 'packages', 'server', 'dist');
fs.mkdirSync(serverDistTarget, { recursive: true });
run(`cp -r "packages/server/dist/." "${serverDistTarget}/"`);

console.log('\n--- BUILD SUCCESSFUL ---');
console.log('Hostinger should now move the contents of "dist" to public_html.');
