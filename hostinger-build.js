const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Standard Monorepo Build (Clean Version)
 * Builds both Frontend (Next.js) and Backend (Express API)
 */
function run(cmd, cwd) {
    console.log(`\n> [CLEAN-BUILD] ${cmd} (in ${cwd})`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit' });
    } catch (e) {
        process.exit(1);
    }
}

const root = __dirname;
const targetDir = path.join(root, 'dist'); 

console.log(`--- [MONOREPO-BUILD] STARTING ---`);

// 1. Build Backend
console.log(`> Building Backend...`);
run('npm install', path.join(root, 'packages', 'server'));
run('npm run build', path.join(root, 'packages', 'server'));

// 2. Build Frontend
console.log(`> Building Frontend...`);
run('npm install', path.join(root, 'application'));
run('npm run build', path.join(root, 'application'));

// 3. Consolidate into /dist
if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

const standalone = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standalone)) {
    console.log(`> Copying Standalone Engine...`);
    fs.cpSync(standalone, targetDir, { recursive: true });
}

const backendDist = path.join(root, 'packages', 'server', 'dist');
if (fs.existsSync(backendDist)) {
    console.log(`> Copying Backend...`);
    fs.cpSync(backendDist, path.join(targetDir, 'packages', 'server', 'dist'), { recursive: true });
}

// Injects assets
const appNext = path.join(root, 'application', '.next');
fs.cpSync(path.join(appNext, 'static'), path.join(targetDir, '.next', 'static'), { recursive: true });
fs.cpSync(path.join(root, 'application', 'public'), path.join(targetDir, 'public'), { recursive: true });

// Inject Entry Points
['server.js', 'package.json'].forEach(f => {
    fs.copyFileSync(path.join(root, f), path.join(targetDir, f));
});

console.log(`--- [MONOREPO-BUILD] SUCCESS ---`);
console.log(`Build consolidated in: ${targetDir}`);
