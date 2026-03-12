const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

/**
 * v73.3 Build: Monolithic Merge (Safe Mode)
 * Combines UI (Standalone) and Backend into a single high-reliability target.
 * TARGET: ./dist (Standard Output)
 */
console.log(`\n=== [BUILD] v73.3 STARTING ===`);
console.log(`TIME: ${new Date().toISOString()}`);

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
            // Too much noise for thousands of files:
            // console.log(`[OK] ${dest}`);
        }
    } catch (err) {
        console.error(`[ERR] ${src} -> ${dest}: ${err.message}`);
    }
}

function run(cmd, cwd) {
    const fullPath = path.resolve(process.cwd(), cwd);
    console.log(`\n--- [RUN] "${cmd}" in ${fullPath} ---`);
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
        console.log(`[PASS] ${cmd}`);
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

// HOSTINGER OUTPUT DIRECTORY CHECK:
// Hostinger checks for a directory named "dist", "build", or ".next" at repo ROOT.
// We use "./dist" as our primary output.
const targetDir = './dist'; 
console.log(`\n> Preparing Target: ${targetDir}`);
if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

// Hostinger Specific: Creating root-level .next marker
console.log(`> Creating root-level .next marker for Hostinger discovery...`);
if (!fs.existsSync('./.next')) fs.mkdirSync('./.next', { recursive: true });
const buildIdSrc = './application/.next/BUILD_ID';
if (fs.existsSync(buildIdSrc)) {
    fs.copyFileSync(buildIdSrc, './.next/BUILD_ID');
    console.log(`[OK] Root .next/BUILD_ID created`);
} else {
    fs.writeFileSync('./.next/BUILD_ID', 'kp-build-' + Date.now());
    console.log(`[WARN] application/.next/BUILD_ID not found — wrote placeholder`);
}

// 2. Packing into ./dist
console.log(`\n> Packing into ${targetDir}...`);

// Copy Next.js build output into dist/application
const nextBuildDir = './application/.next';
const targetAppDir = path.join(targetDir, 'application');
if (!fs.existsSync(targetAppDir)) fs.mkdirSync(targetAppDir, { recursive: true });

if (fs.existsSync(nextBuildDir)) {
    console.log(`> Copying Next.js build output to ${targetAppDir}/.next...`);
    if (fs.cpSync) {
        fs.cpSync(nextBuildDir, path.join(targetAppDir, '.next'), { recursive: true, dereference: true });
    } else {
        deployWithPermissions(nextBuildDir, path.join(targetAppDir, '.next'));
    }
} else {
    console.error(`[ERR] Local application/.next not found!`);
}

// Copy public folder
const publicDir = './application/public';
if (fs.existsSync(publicDir)) {
    if (fs.cpSync) {
        fs.cpSync(publicDir, path.join(targetAppDir, 'public'), { recursive: true, dereference: true });
    } else {
        deployWithPermissions(publicDir, path.join(targetAppDir, 'public'));
    }
}

// Copy app package.json
if (fs.existsSync('./application/package.json')) {
    fs.copyFileSync('./application/package.json', path.join(targetAppDir, 'package.json'));
}

// 3. Backend Consolidation
console.log(`> Packing Backend API...`);
deployWithPermissions('./packages/server/dist', path.join(targetDir, 'packages/server/dist'));

// 4. Inject Runtime Dependencies
const allDeps = [
    'express', 'sequelize', 'mysql2', 'cors', 'dotenv', 'zod',
    'bcrypt', 'bcryptjs', 'nodemailer', 'redis', 'validator', 'dompurify', 'multer',
    'next', 'react', 'react-dom', 'styled-jsx'
];
console.log(`> Injecting dependencies into ${targetDir}/node_modules...`);
const targetNodeModules = path.join(targetDir, 'node_modules');
if (!fs.existsSync(targetNodeModules)) fs.mkdirSync(targetNodeModules, { recursive: true });

allDeps.forEach(dep => {
    const srcDep = path.join('./node_modules', dep);
    const destDep = path.join(targetNodeModules, dep);
    if (fs.existsSync(srcDep)) {
        if (fs.cpSync) {
            fs.cpSync(srcDep, destDep, { recursive: true, dereference: true });
        } else {
            deployWithPermissions(srcDep, destDep);
        }
    } else {
        console.warn(`[WARN] Missing root dep: ${dep}`);
    }
});

// 5. Inject Entry Point (index.js)
console.log(`> Injecting Entry Point...`);
const srcServer = './server.js';
if (fs.existsSync(srcServer)) {
    fs.copyFileSync(srcServer, path.join(targetDir, 'index.js'));
    fs.chmodSync(path.join(targetDir, 'index.js'), 0o644);
}

// Write Deployment package.json
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

// Copy .env and .htaccess
['.env', '.env.local', '.htaccess'].forEach(f => {
    if (fs.existsSync(f)) {
        fs.copyFileSync(f, path.join(targetDir, f));
        fs.chmodSync(path.join(targetDir, f), 0o644);
    }
});

console.log(`\n=== [SUCCESS] v73.3 ===`);
console.log(`OUTPUT: ${path.resolve(targetDir)}`);
console.log(`\n> IMPORTANT: In Hostinger Dashboard:`);
console.log(`1. Set "Output Directory" to "dist"`);
console.log(`2. If "dist" is not an option, set it to "." and ensure .htaccess is present.`);
