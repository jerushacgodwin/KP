const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

/**
 * v73.2 Build: Monolithic Merge (Safe Mode)
 * Combines UI (Standalone) and Backend into a single high-reliability target.
 */
console.log(`--- [BUILD] v73.2 STARTING ---`);

// Diagnostic Check
if (typeof path === 'undefined' || typeof fs === 'undefined') {
    console.error('[FATAL] Core modules (path/fs) failed to load!');
    process.exit(1);
}

function deployWithPermissions(src, dest) {
    try {
        if (!fs.existsSync(src)) return;
        const stats = fs.lstatSync(src);
        if (dest.startsWith(src) && dest !== src) return; 

        if (stats.isDirectory()) {
            if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
            fs.chmodSync(dest, 0o755); 
            fs.readdirSync(src).forEach(child => {
                deployWithPermissions(path.join(src, child), path.join(dest, child));
            });
        } else {
            fs.copyFileSync(src, dest);
            fs.chmodSync(dest, 0o644);
            console.log(`[OK] ${dest}`);
        }
    } catch (err) {
        console.error(`[ERR] ${src} -> ${dest}: ${err.message}`);
    }
}

function run(cmd, cwd) {
    const fullPath = path.resolve(process.cwd(), cwd);
    console.log(`> [RUN] "${cmd}" in ${fullPath}`);
    if (!fs.existsSync(fullPath)) {
        console.error(`[ERR] Directory does not exist: ${fullPath}`);
        process.exit(1);
    }
    try {
        execSync(cmd, { 
            cwd: fullPath, 
            stdio: 'inherit', 
            env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } 
        });
    } catch (e) { 
        console.error(`[FATAL] Command failed: ${cmd}`);
        console.error(`[TRACE] ${e.message}`);
        process.exit(1); 
    }
}

// 1. Core Build Steps
run('npm install', './packages/billing');
run('npm run build', './packages/billing');
run('npm install', './packages/shop');
run('npm run build', './packages/shop');
run('npm install', './packages/server');
run('npm run build', './packages/server');
run('npm install', './application');
run('npm run build', './application');

// CRITICAL: New un-ignored folder name
const targetDir = './deploy_final'; 

// 2. Prep Target
if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

// 3. Verbose Consolidation
console.log(`> Packing into UN-IGNORED ./deploy_final...`);

// Copy Next.js build output into deploy_final/application
// NOTE: distDir is '../.next' so next build outputs to ROOT-level .next
// Hostinger checks for .next at root — this satisfies that check.
// We then also copy it into deploy_final/application/.next for the runtime.
console.log(`> Copying Next.js build output...`);
const nextBuildDir = './.next';            // Root-level .next (distDir: '../.next')
const targetAppDir = path.join(targetDir, 'application');
if (!fs.existsSync(targetAppDir)) fs.mkdirSync(targetAppDir, { recursive: true });

if (fs.existsSync(nextBuildDir)) {
    console.log(`> Copying .next output to deploy_final/application/.next ...`);
    if (fs.cpSync) {
        fs.cpSync(nextBuildDir, path.join(targetAppDir, '.next'), { recursive: true, dereference: true });
    } else {
        deployWithPermissions(nextBuildDir, path.join(targetAppDir, '.next'));
    }
    console.log(`[OK] .next copied to deploy_final/application/.next`);
} else {
    console.error(`[ERR] Root-level .next not found! Build may have failed.`);
}

// Copy public folder if it exists
const publicDir = './application/public';
if (fs.existsSync(publicDir)) {
    if (fs.cpSync) {
        fs.cpSync(publicDir, path.join(targetAppDir, 'public'), { recursive: true, dereference: true });
    } else {
        deployWithPermissions(publicDir, path.join(targetAppDir, 'public'));
    }
    console.log(`[OK] public/ copied`);
}

// Copy application source files Next.js needs to serve pages
['package.json'].forEach(f => {
    const src = path.join('./application', f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetAppDir, f));
        console.log(`[OK] application/${f} copied`);
    }
});


// 4. Backend + Next.js Dependency Consolidation
console.log(`> Packing Backend API...`);
deployWithPermissions('./packages/server/dist', path.join(targetDir, 'packages/server/dist'));

// Inject ALL required runtime dependencies into deploy_final/node_modules
const allDeps = [
    // Backend deps
    'express', 'sequelize', 'mysql2', 'cors', 'dotenv', 'zod',
    'bcrypt', 'bcryptjs', 'nodemailer', 'redis', 'validator', 'dompurify', 'multer',
    // Next.js / React deps
    'next', 'react', 'react-dom', 'styled-jsx'
];
console.log(`> Injecting runtime dependencies...`);
const targetNodeModules = path.join(targetDir, 'node_modules');
if (!fs.existsSync(targetNodeModules)) fs.mkdirSync(targetNodeModules, { recursive: true });

allDeps.forEach(dep => {
    const srcDep = path.join('./node_modules', dep);
    const destDep = path.join(targetNodeModules, dep);
    if (fs.existsSync(srcDep)) {
        console.log(`[DEP] Injecting ${dep}...`);
        if (fs.cpSync) {
            fs.cpSync(srcDep, destDep, { recursive: true, dereference: true });
        } else {
            deployWithPermissions(srcDep, destDep);
        }
    } else {
        console.log(`[WARN] Next.js dep ${dep} not found in root node_modules!`);
    }
});

// 6. Inject Entry Point (index.js)
console.log(`> Injecting index.js...`);
const srcServer = './server.js';
if (fs.existsSync(srcServer)) {
    fs.copyFileSync(srcServer, path.join(targetDir, 'index.js'));
    fs.chmodSync(path.join(targetDir, 'index.js'), 0o644);
}

// Write a CLEAN package.json for deploy_final (NOT the root one)
// The root package.json has workspaces/wrong start script which breaks Hostinger
const deployPackageJson = {
    "name": "kp-deploy",
    "version": "1.0.0",
    "private": true,
    "main": "index.js",
    "scripts": {
        "start": "node index.js"
    },
    "engines": {
        "node": ">=18.0.0"
    }
};
fs.writeFileSync(
    path.join(targetDir, 'package.json'),
    JSON.stringify(deployPackageJson, null, 2)
);
fs.chmodSync(path.join(targetDir, 'package.json'), 0o644);
console.log(`[OK] Clean package.json written for deploy_final`);

// Copy .env files if they exist
['.env', '.env.local'].forEach(f => {
    if (fs.existsSync(f)) {
        fs.copyFileSync(f, path.join(targetDir, f));
        fs.chmodSync(path.join(targetDir, f), 0o644);
    }
});

// Final cleanup: Kill any root .htaccess
if (fs.existsSync('./.htaccess')) fs.unlinkSync('./.htaccess');

console.log(`--- [SUCCESS] v73.2 ---`);
console.log(`TARGET: ./deploy_final`);
console.log(`ENTRY: index.js`);

// Full Validator Map
function listTree(dir, indent = '') {
    try {
        fs.readdirSync(dir).forEach(file => {
            const p = path.join(dir, file);
            const isDir = fs.lstatSync(p).isDirectory();
            console.log(`${indent}${isDir ? 'DIR' : 'FILE'}: ${file}`);
            if (isDir && !file.includes('node_modules') && indent.length < 8) {
                listTree(p, indent + '  ');
            }
        });
    } catch (e) {}
}
console.log(`> VALIDATOR MAP:`);
listTree(targetDir);
