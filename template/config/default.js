let version = require('../../ebuild.config').version;

module.exports = {
    data: {
        // template
        'README.md': {
            gitRepo: 'https://github.com/theajack/tacl-ui',
            intro: '一套taost、confirm、loading、alert、drag的简单ui组件',
            npm: 'npm',
            install: 'tacl-ui',
            script: 'https://cdn.jsdelivr.net/gh/theajack/tacl-ui/cdn/tacl-ui.latest.min.js',
        },
        'LICENSE': {
            author: 'theajack'
        },
        'package.json': {
            author: 'theajack',
            name: 'tacl-ui',
            version,
            easydom: 'easy-dom-util',
            easyDomVersion: '0.0.24'
        },
        'version.js': {
            version,
        }
    },
    output: './npm/'
};

/**
 * output: 'xxx',
 * output: ['','','']
 * output: {a:'',b:''}
 * output: {a:['','',''],b:''}
 */