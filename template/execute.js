const render = require('./render/render');
const pkg = require('../package.json');


// const path = require('path');

// const fs = require('fs');
// let a = fs.readFileSync(path.resolve('./template', 'a.js'), {encoding: 'utf-8'});
// console.log(a);

function main () {
    let version = pkg.devDependencies['easy-dom-util'];
    if (version[0] === '^') {version = version.substring(1);}
    render(version);
}

main();