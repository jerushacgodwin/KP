const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * v73 Build: Monolithic Merge
 * Combines UI (Standalone) and Backend into a single high-reliability target.
 */
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

console.log(`--- [BUILD] v73 MONOLITHIC-MERGE ---`);

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

// Move STANDALONE contents to root of deploy_final
const standaloneDir = './application/.next/standalone';
if (fs.existsSync(standaloneDir)) {
    console.log(`> Processing Standalone...`);
    fs.readdirSync(standaloneDir).forEach(item => {
        const src = path.join(standaloneDir, item);
        const dest = path.join(targetDir, item);
        deployWithPermissions(src, dest);
    });
}

// 4. Backend Consolidation & Dependencies
console.log(`> Packing Backend API...`);
deployWithPermissions('./packages/server/dist', path.join(targetDir, 'packages/server/dist'));

// CRITICAL: Copy Backend Dependencies from Root
// Next Standalone only copies UI dependencies. We need these for the bridge.
const backendDeps = [
    'express', 'sequelize', 'mysql2', 'cors', 'dotenv', 'zod', 
    'bcrypt', 'bcryptjs', 'nodemailer', 'redis', 'validator', 'dompurify', 'multer'
];
console.log(`> Injecting Backend Dependencies...`);
const targetNodeModules = path.join(targetDir, 'node_modules');
if (!fs.existsSync(targetNodeModules)) fs.mkdirSync(targetNodeModules, { recursive: true });

backendDeps.forEach(dep => {
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
        console.log(`[WARN] Dependency ${dep} not found in root!`);
    }
});

// 5. Extract Standalone Config
console.log(`> Extracting Standalone Config...`);
const generatedServerPath = path.join(standaloneDir, 'application', 'server.js');
if (fs.existsSync(generatedServerPath)) {
    const content = fs.readFileSync(generatedServerPath, 'utf8');
    const match = content.match(/const nextConfig = (\{[\s\S]*?\})\n/);
    if (match) {
        fs.writeFileSync(path.join(targetDir, 'next-config-standalone.json'), match[1]);
        console.log(`[OK] next-config-standalone.json extracted.`);
    }
}

// 6. Inject Entry Point (index.js)
console.log(`> Injecting index.js...`);
const srcServer = './server.js';
if (fs.existsSync(srcServer)) {
    fs.copyFileSync(srcServer, path.join(targetDir, 'index.js'));
    fs.chmodSync(path.join(targetDir, 'index.js'), 0o644);
}

// Required Files
['package.json', '.env', '.env.local'].forEach(f => {
    if (fs.existsSync(f)) {
        fs.copyFileSync(f, path.join(targetDir, f));
        fs.chmodSync(path.join(targetDir, f), 0o644);
    }
});

// Final cleanup: Kill any root .htaccess
if (fs.existsSync('./.htaccess')) fs.unlinkSync('./.htaccess');

console.log(`--- [SUCCESS] v73 ---`);
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
