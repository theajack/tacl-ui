const config = require('./build');
const path = require('path');

delete config.externals;

config.output = {
    path: path.resolve('./', 'npm'),
    filename: 'taclui.min.js',
    library: 'TaclUI',
    libraryTarget: 'umd',
    globalObject: 'this',
    libraryExport: 'default',
},

module.exports = config;