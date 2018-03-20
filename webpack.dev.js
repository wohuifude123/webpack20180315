const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const manifest = require('./public/dist/vendor-manifest.json');
const path = require('path');

module.exports = merge(common.baseConfig, {
    entry: {
        'app': ['./src/main.js']
    },
    output: { //打包路径
        //filename: '[name].bundle.js', //出口文件名
        // filename: '[name].[chunkhash].js',
        // 可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径
        path: __dirname + 'public/dist', //打包路径
        publicPath:'dist/', // 指定publicPath
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        library: manifest.name
    },
    devtool: 'source-map',

    plugins: [

    ],
    devServer: {
        contentBase: [path.join(__dirname, "./public")], // 本地服务器 加载页面 所在的目录
        host: '127.0.0.1',
        compress: true,
        port: 6600,
        open: false // 将自动打开浏览器


        // 需要webpack.HotModuleReplacementPlugin才能完全启用HMR。
        // 如果使用--hot选项启动webpack或webpack-dev-server，则会自动添加该插件，因
        // 此您可能不需要将其添加到webpack.config.js中
        // 注意：热更新(HMR)不能和[chunkhash]同时使用
        // hot: true
    }
})


