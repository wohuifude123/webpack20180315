const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const library = '[name]_[chunkhash:8]';
const NODE_ENV = process.env.NODE_ENV; // Node环境 process 对象是一个全局的变量

// the path(s) that should be cleaned
let pathsToClean = [
    'dist',
    'build'
]

// the clean options to use
let cleanOptions = {
    root:     '', //清理的路径
    exclude:  ['shared.js'],
    // Write logs to console.
    verbose:  true,
    // Use boolean "true" to test/emulate delete. (will not remove files). 模拟删除
    dry:      false
}

module.exports = {
    devtool: NODE_ENV === 'production' ? false : 'source-map',

    entry: {
        vender: [
            'react',
            'react-dom',
            'react-router-dom',
            'antd',
            'echarts'
        ]
    },
    output: {
        path: __dirname + 'public/dist',
        filename: '[name].[chunkhash:8].js',
        library: '[name]_[chunkhash:8]'
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], cleanOptions),
        new webpack.DllPlugin({
            path: '[name]-manifest.json',
            // This must match the output.library option above
            name: library,
            context: __dirname       // 解析包路径的上下文
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ],

};



