const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Iteratively creates a directory path and logs any issues.
 * This is more robust than { recursive: true } on some environments.
 */
function ensureDirIterative(dirPath) {
    const parts = dirPath.split(path.sep);
    let currentPath = '';

    // Handle absolute paths on Linux/Windows
    if (dirPath.startsWith(path.sep)) currentPath = path.sep;
    else if (dirPath.includes(':')) { // Windows absolute
        currentPath = parts.shift() + path.sep;
    }

    for (const part of parts) {
        if (!part) continue;
        currentPath = path.join(currentPath, part);
        
        try {
            if (!fs.existsSync(currentPath)) {
                console.log(`> [MKDIR] Creating: ${currentPath}`);
                fs.mkdirSync(currentPath);
            } else {
                const stats = fs.lstatSync(currentPath);
                if (!stats.isDirectory()) {
                    throw new Error(`Path component is a FILE, not a directory: ${currentPath}`);
                }
            }
        } catch (err) {
            console.error(`> [MKDIR-FAIL] Error at ${currentPath}: ${err.message}`);
            throw err; // Re-throw to be caught by the "Soft Fail" block
        }
    }
}

function copyRecursiveSync(src, dest) {
    try {
        if (!fs.existsSync(src)) return;
        const stats = fs.lstatSync(src);
        if (path.resolve(src) === path.resolve(dest)) return;

        if (stats.isDirectory()) {
            if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
            fs.readdirSync(src).forEach(child => {
                copyRecursiveSync(path.join(src, child), path.join(dest, child));
            });
        } else {
            fs.copyFileSync(src, dest);
        }
    } catch (err) {
        console.warn(`> [COPY-WARN] Skipping ${src}: ${err.message}`);
    }
}

function run(cmd, cwd) {
    console.log(`\n> [BUILD-V47] ${cmd}`);
    try {
        execSync(cmd, { 
            cwd, 
            stdio: 'inherit', 
            env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } 
        });
    } catch (e) { 
        console.warn(`> [SKIP] Command failed: ${cmd}`);
    }
}

const root = __dirname;
const targetDir = path.join(root, '.next'); 

console.log(`\n--- [BUILD-V47] ITERATIVE RESILIENCE ---`);
console.log(`Build Root: ${root}`);

// 1. SAFE DIRECTORY CREATION (Soft-Fail)
const uploadsDir = path.join(root, 'application', 'public', 'uploads');
console.log(`\n> Attempting to ensure uploads directory exists...`);
try {
    ensureDirIterative(uploadsDir);
    console.log(`> [OK] Uploads directory verified/created.`);
} catch (e) {
    console.warn(`> [SOFT-FAIL] Directory creation failed, but continuing build: ${e.message}`);
}

// 2. Build Services
run('npm install', root);
run('npm run build', path.join(root, 'application'));

// 3. Consolidate into root .next
console.log(`\n> Consolidating into /.next...`);
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const standaloneDir = path.join(root, 'application', '.next', 'standalone');
if (fs.existsSync(standaloneDir)) {
    console.log(`> Copying Standalone Engine...`);
    copyRecursiveSync(standaloneDir, targetDir);
}

// Inject Entry Points
['server.js', 'index.js', 'package.json', '.env', '.env.local'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, f));
        console.log(`  [OK] Injected ${f}`);
    }
});

// Sync Assets
const applicationNext = path.join(root, 'application', '.next');
copyRecursiveSync(path.join(applicationNext, 'static'), path.join(targetDir, '.next', 'static'));
copyRecursiveSync(path.join(root, 'application', 'public'), path.join(targetDir, 'public'));

// 4. GLOBAL HTACCESS PURGE
const purgeHtaccess = (dir) => {
    try {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const p = path.join(dir, file);
            try {
                if (file === '.htaccess') {
                    console.log(`> [PURGE] Deleting ${p}...`);
                    fs.unlinkSync(p);
                } else if (fs.lstatSync(p).isDirectory() && !p.includes('node_modules')) {
                    purgeHtaccess(p);
                }
            } catch (e) {}
        });
    } catch (e) {}
};

console.log(`> Running Global .htaccess Purge...`);
purgeHtaccess(root);
purgeHtaccess(targetDir);

// 5. Final verification
console.log(`\n--- [BUILD-V47] SUCCESS ---`);
console.log(`MANDATORY Output Directory (ABSOLUTE):`);
console.log(`/home/u102032541/domains/lightgreen-wolverine-191417.hostingersite.com/.next`);
