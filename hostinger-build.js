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

const root = __dirname;
const targetDir = path.join(root, 'deploy_ready');

console.log(`\n--- [BUILD-V31] TARGETED DEPLOYMENT PREP ---`);
console.log(`Working Directory: ${root}`);
console.log(`Deployment Target: ${targetDir}`);

// 1. Clean/Create target directory
if (fs.existsSync(targetDir)) {
    console.log(`> Cleaning existing target directory...`);
    fs.rmSync(targetDir, { recursive: true, force: true });
}
fs.mkdirSync(targetDir, { recursive: true });

// 2. Build Next.js (Minimalist for now to ensure speed/success)
// We only do this to ensure we HAVE a build, but our v31 server is still a diagnostic "Hello World"
console.log(`\n> Attempting Next.js build...`);
try {
    execSync('npm run build', { 
        cwd: path.join(root, 'application'), 
        stdio: 'inherit',
        env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' }
    });
} catch (e) {
    console.warn(`> [WARN] Next.js build failed or skipped. Continuing with diagnostic server only.`);
}

// 3. Assemble the "deploy_ready" package
console.log(`\n> Assembling deployment package in ${targetDir}...`);

// Copy orchestrator and core files
const coreFiles = ['server.js', 'package.json', '.npmrc'];
coreFiles.forEach(file => {
    const src = path.join(root, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, file));
        console.log(`  [OK] Copied ${file}`);
    } else {
        console.warn(`  [MISSING] ${file} not found at root!`);
    }
});

// Copy dependencies (Mandatory for Hostinger)
console.log(`> Copying node_modules (this may take a moment)...`);
const modulesSrc = path.join(root, 'node_modules');
if (fs.existsSync(modulesSrc)) {
    copyRecursiveSync(modulesSrc, path.join(targetDir, 'node_modules'));
    console.log(`  [OK] Copied node_modules`);
} else {
    console.error(`  [FATAL] node_modules not found at root! Run pnpm install first.`);
    process.exit(1);
}

// Create a validator marker
fs.writeFileSync(path.join(targetDir, 'deployment_status.txt'), `V31 Ready - ${new Date().toISOString()}`);

console.log(`\n--- [BUILD-V31] PREP COMPLETE ---`);
console.log(`PLEASE SET THE "OUTPUT DIRECTORY" IN HOSTINGER TO: deploy_ready`);
