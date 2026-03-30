const { execSync } = require('child_process');
try {
    execSync('npx tsc --noEmit', { stdio: 'pipe' });
    console.log('TSC SUCCESS');
} catch (e) {
    console.log('TSC ERRORS:\n', e.stdout.toString(), '\n', e.stderr.toString());
}
