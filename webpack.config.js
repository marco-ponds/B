
const path = require('path');
const MODE = process.env.MODE;

const config = {
    entry: './src/index.js',
    output: {
        library: 'B',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
        filename: 'B.js',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ]
    },
    target: 'web'
};

module.exports = config;
