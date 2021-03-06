module.exports = {
    data: {
        // template
        'README.md': {
            gitRepo: 'https://github.com/theajack/tacl-ui',
            intro: '一套taost、confirm、loading、alert、drag的简单ui组件',
            npm: 'npm',
            install: 'tacl-ui',
            script: 'https://cdn.jsdelivr.net/gh/theajack/tacl-ui/cdn/taclui.latest.min.js',
            scriptVersion: 'https://cdn.jsdelivr.net/gh/theajack/tacl-ui/cdn/taclui.{version}.min.js',
            easydom: 'https://github.com/theajack/easy-dom'
        },
        'LICENSE': {
            author: 'theajack'
        },
    },
    output: {
        'README.md': ['./', './npm/'],
        'LICENSE': ['./', './npm/'],
        'package.json': './npm/',
        'version.js': './src/'
    }
};