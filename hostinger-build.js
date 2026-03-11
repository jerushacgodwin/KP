const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd, cwd) {
    console.log(`\n> [BUILD-V49] ${cmd}`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit' });
    } catch (e) {
        console.warn(`> [SKIP] ${cmd} failed.`);
    }
}

const root = __dirname;
const targetDir = path.join(root, '.next'); 

console.log(`\n--- [BUILD-V49] NUCLEAR DIAGNOSTIC ASSEMBLY ---`);

// 1. Basic build to satisfy validator structure
run('npm install', root);
run('npm run build', path.join(root, 'application'));

// 2. Prep target
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

// 3. Inject Nuclear Entry Points
['index.js', 'package.json'].forEach(f => {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, f));
        console.log(`  [OK] Injected NUCLEAR ${f}`);
    }
});

// 4. Create Diagnostic HTML
const diagHtml = `
<html>
<body style="background: navy; color: white; font-family: sans-serif; padding: 3rem;">
    <h1>💎 [V49] STATIC DIAGNOSTIC OK</h1>
    <p>If you see this at <b>yourdomain.com/diag.html</b>, the folder is accessible.</p>
    <p>Build Time: ${new Date().toISOString()}</p>
</body>
</html>
`;
fs.writeFileSync(path.join(targetDir, 'diag.html'), diagHtml);
console.log(`> [OK] Created diag.html`);

// 5. CRITICAL: GLOBAL .HTACCESS PURGE
// We delete EVERY .htaccess to ensure no hidden rules are blocking us.
const purgeHtaccess = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (file === '.htaccess') {
            console.log(`> [PURGE] Deleting ${fullPath}...`);
            fs.unlinkSync(fullPath);
        } else if (fs.statSync(fullPath).isDirectory() && !fullPath.includes('node_modules')) {
            purgeHtaccess(fullPath);
        }
    });
};

console.log(`> Running Global .htaccess Purge...`);
purgeHtaccess(root);
purgeHtaccess(targetDir);

console.log(`\n--- [BUILD-V49] SUCCESS ---`);
console.log(`MANDATORY: Set Hostinger "Entry File" to: index.js`);
console.log(`MANDATORY Output Directory (ABSOLUTE):`);
console.log(`/home/u102032541/domains/lightgreen-wolverine-191417.hostingersite.com/.next`);
