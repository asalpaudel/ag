const fs = require('fs');
const { execSync } = require('child_process');

try {
    const out = execSync('npx prisma generate', { stdio: 'pipe', maxBuffer: 1024 * 1024 * 10 });
    fs.writeFileSync('err_dump.txt', 'SUCCESS:\n' + out.toString());
} catch (e) {
    const stdout = e.stdout ? e.stdout.toString() : '';
    const stderr = e.stderr ? e.stderr.toString() : '';
    fs.writeFileSync('err_dump.txt', `ERROR stdout:\n${stdout}\n\nERROR stderr:\n${stderr}`);
}
