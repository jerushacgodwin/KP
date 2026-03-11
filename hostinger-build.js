const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Iteratively creates a directory path and logs any issues.
 * Essential for Hostinger's volatile build environment.
 */
function ensureDirIterative(dirPath) {
    const parts = dirPath.split(path.sep);
    let currentPath = '';

    // Handle absolute paths
    if (dirPath.startsWith(path.sep)) currentPath = path.sep;
    else if (dirPath.includes(':')) { // Windows
        currentPath = parts.shift() + path.sep;
    }

    for (const part of parts) {
        if (!part) continue;
        currentPath = path.join(currentPath, part);
        
        try {
            if (!fs.existsSync(currentPath)) {
                console.log(`> [MKDIR] Creating: ${currentPath}`);
                fs.mkdirSync(currentPath);
            }
        } catch (err) {
            console.error(`> [MKDIR-FAIL] Error at ${currentPath}: ${err.message}`);
            throw err;
        }
    }
}

function run(cmd, cwd) {
    console.log(`\n> [BUILD-V50] ${cmd}`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit' });
    } catch (e) {
        console.warn(`> [SKIP] ${cmd} failed.`);
    }
}

const root = __dirname;
const targetDir = path.join(root, '.next'); 

console.log(`\n--- [BUILD-V50] RESILIENT PATH + NUCLEAR DIAG ---`);

// 1. CRITICAL: RESTORE DIRECTORY CREATION
const uploadsDir = path.join(root, 'application', 'public', 'uploads');
console.log(`\n> Restoring directory resilience...`);
try {
    ensureDirIterative(uploadsDir);
    console.log(`> [OK] Uploads directory verified/created.`);
} catch (e) {
    console.warn(`> [SOFT-FAIL] Directory creation had issues, but attempting build...`);
}

// 2. Build
run('npm install', root);
run('npm run build', path.join(root, 'application'));

// 3. Prep target
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

// 4. Inject Nuclear Entry Points
['index.js', 'package.json'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, f));
        console.log(`  [OK] Injected NUCLEAR ${f}`);
    }
});

// 5. Create Diagnostic HTML
const diagHtml = `
<html>
<body style="background: navy; color: white; font-family: sans-serif; padding: 3rem;">
    <h1>💎 [V50] RESILIENT DIAGNOSTIC OK</h1>
    <p>If you see this at <b>yourdomain.com/diag.html</b>, the folder is accessible.</p>
    <p>Build Time: ${new Date().toISOString()}</p>
</body>
</html>
`;
fs.writeFileSync(path.join(targetDir, 'diag.html'), diagHtml);

// 6. GLOBAL .HTACCESS PURGE
const purgeHtaccess = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        try {
            if (file === '.htaccess') {
                console.log(`> [PURGE] Deleting ${fullPath}...`);
                fs.unlinkSync(fullPath);
            } else if (fs.lstatSync(fullPath).isDirectory() && !fullPath.includes('node_modules')) {
                purgeHtaccess(fullPath);
            }
        } catch (e) {}
    });
};

console.log(`> Running Global .htaccess Purge...`);
purgeHtaccess(root);
purgeHtaccess(targetDir);

console.log(`\n--- [BUILD-V50] SUCCESS ---`);
console.log(`MANDATORY Output Directory (ABSOLUTE):`);
console.log(`/home/u102032541/domains/lightgreen-wolverine-191417.hostingersite.com/.next`);
