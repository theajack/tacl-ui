const execSync = require('child_process').execSync;
const config = require('../ebuild.config');
async function publish () {
    config.npmPaths.forEach((path) => {
        execSync(`npm publish ${path}`);
    });
}


(async () => {
    await publish();
})();