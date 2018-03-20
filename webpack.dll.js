const path    = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV; // Node环境 process 对象是一个全局的变量
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        vendor: [
            'react',
            'react-dom',
            'lodash'
        ]
    },
    output: {
        path: path.join(__dirname, 'public/dist'),
        filename: NODE_ENV === 'production' ?'[name].[chunkhash:8].dll.js':'[name].dll.js',
        library: '[name]_[chunkhash:8]'
    },
    plugins: [
        new CleanWebpackPlugin(['public/dist'], { }),
        new webpack.DllPlugin({

            path: path.join(__dirname, 'public/dist', '[name]-manifest.json'),
            name: '[name]_[chunkhash:8]'
        })
    ]
};

