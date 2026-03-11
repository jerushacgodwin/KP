const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd, cwd) {
    console.log(`\n> [BUILD] ${cmd}`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, NEXT_DISABLE_INTERACTIVE_INSTALL: '1' } });
    } catch (e) { 
        console.warn(`Build command failed, but continuing for diagnostic: ${cmd}`);
    }
}

const root = __dirname;
console.log(`\n--- [BUILD-V30] MINIMALIST PREP ---`);

// For V30, we don't even care if the build fails, we just want server.js and package.json at the root
try {
    run('npm run build', path.join(root, 'application'));
} catch (e) {}

console.log(`> Ensuring core files are at the root...`);
const files = ['server.js', 'index.js', 'package.json', '.npmrc'];
files.forEach(f => {
    if (!fs.existsSync(path.join(root, f))) {
        console.log(`> [WARN] ${f} missing at root!`);
    }
});

console.log(`\n--- [BUILD-V30] DIAGNOSTIC BUNDLE READY ---`);
