let config = require('./render.local');

let tnpm = config.tnpm;
let target = ['npm'];
if (tnpm) { target.push('tnpm');}

module.exports = {
    target,
    tpl: [
        'README.md',
        'LICENSE',
        'package.json',
        'version.js'
    ]
};