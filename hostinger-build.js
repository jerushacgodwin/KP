const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

/**
 * Hostinger Build: Monolithic Orchestrator (Fresh Start)
 * TARGET: ./dist
 */
console.log(`\n=== [BUILD] STARTING ===`);
console.log(`TIME: ${new Date().toISOString()}`);

// Utility: Resilient copy for Windows/Linux compatibility
function deployWithPermissions(src, dest) {
    try {
        if (!fs.existsSync(src)) return;
        const stats = fs.lstatSync(src);
        
        if (stats.isDirectory()) {
            if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
            fs.chmodSync(dest, 0o755); 
            fs.readdirSync(src).forEach(child => {
                deployWithPermissions(path.join(src, child), path.join(dest, child));
            });
        } else {
            // Skip problematic folders like 'uploads' if they cause issues
            if (src.includes('uploads')) return;
            
            fs.copyFileSync(src, dest);
            fs.chmodSync(dest, 0o644);
        }
    } catch (err) {
        console.error(`[ERR] ${src} -> ${dest}: ${err.message}`);
    }
}

function run(cmd, cwd) {
    const fullPath = path.resolve(process.cwd(), cwd);
    console.log(`\n--- [RUN] "${cmd}" in ${fullPath} ---`);
    try {
        execSync(cmd, { 
            cwd: fullPath, 
            stdio: 'inherit', 
            env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } 
        });
        console.log(`[PASS] ${cmd}`);
    } catch (e) { 
        console.error(`[FATAL] Command failed: ${cmd}`);
        process.exit(1); 
    }
}

// 1. Build Sub-packages
const packages = ['./packages/billing', './packages/shop', './packages/server', './application'];
packages.forEach(pkg => {
    if (fs.existsSync(path.join(pkg, 'package.json'))) {
        run('npm install', pkg);
        run('npm run build', pkg);
    }
});

// 2. Prepare Target Directory
const targetDir = './dist';
console.log(`\n> Preparing Target: ${targetDir}`);
if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

// 3. Create Hostinger Marker (.next/BUILD_ID)
console.log(`> Creating Hostinger discovery marker...`);
if (!fs.existsSync('./.next')) fs.mkdirSync('./.next', { recursive: true });
const buildIdSrc = './application/.next/BUILD_ID';
if (fs.existsSync(buildIdSrc)) {
    fs.copyFileSync(buildIdSrc, './.next/BUILD_ID');
    console.log(`[OK] Root .next/BUILD_ID created`);
} else {
    fs.writeFileSync('./.next/BUILD_ID', 'kp-build-' + Date.now());
}

// 4. Pack Application
const targetAppDir = path.join(targetDir, 'application');
deployWithPermissions('./application/.next', path.join(targetAppDir, '.next'));
deployWithPermissions('./application/public', path.join(targetAppDir, 'public'));
if (fs.existsSync('./application/package.json')) {
    fs.copyFileSync('./application/package.json', path.join(targetAppDir, 'package.json'));
}

// 5. Pack Backend
deployWithPermissions('./packages/server/dist', path.join(targetDir, 'packages/server/dist'));

// 6. Inject Dependencies (Minimal set for runtime)
console.log(`> Injecting node_modules...`);
const runtimeDeps = ['express', 'next', 'react', 'react-dom', 'sequelize', 'mysql2', 'dotenv'];
const targetNM = path.join(targetDir, 'node_modules');
fs.mkdirSync(targetNM, { recursive: true });
runtimeDeps.forEach(dep => {
    deployWithPermissions(path.join('./node_modules', dep), path.join(targetNM, dep));
});

// 7. Entry Point & Config
console.log(`> Injecting Entry Point...`);
if (fs.existsSync('./server.js')) {
    fs.copyFileSync('./server.js', path.join(targetDir, 'index.js'));
}

const deployPkg = {
    name: "kp-hostinger",
    main: "index.js",
    scripts: { start: "node index.js" },
    engines: { node: ">=18.0.0" }
};
fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(deployPkg, null, 2));

['.env', '.htaccess'].forEach(f => {
    if (fs.existsSync(f)) fs.copyFileSync(f, path.join(targetDir, f));
});

console.log(`\n=== [SUCCESS] Build Complete ===`);
console.log(`Target: ${path.resolve(targetDir)}`);
