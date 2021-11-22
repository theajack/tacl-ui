const path = require('path');
require('../helper/copy-to-npm');
require('../helper/copy-version');

module.exports = {
    mode: 'production',
    entry: path.resolve('./', 'src/index.js'),
    externals: {
        'easy-dom-util': 'easy-dom-util',
    },
    output: {
        path: path.resolve('./', 'npm'),
        filename: 'index.min.js',
        libraryTarget: 'umd',
    },
    module: {
        rules: [{
            test: /(.js)$/,
            use: [{
                loader: 'babel-loader',
            }, {
                loader: path.resolve('./', 'helper/zipcssinjs-loader.js'),
            }]
        }]
    }
};