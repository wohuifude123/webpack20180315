const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// 引入dev-server配置文件
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {

    output: { //打包路径
        //filename: '[name].bundle.js', //出口文件名
        // filename: '[name].[chunkhash].js',
        // 可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径
        path: path.resolve(__dirname, './public'), //打包路径
        publicPath:'dist/', // 指定publicPath
        filename: './dist/[name].bundle.js',
        chunkFilename: './dist/[name].bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: [path.join(__dirname, "./public")], // 本地服务器 加载页面 所在的目录
        host: '127.0.0.1',
        compress: true,
        port: 6600,
        open: false // 将自动打开浏览器
    },
    plugins:[
        new BundleAnalyzerPlugin({
            analyzerMode: 'server', // static/disabled
            analyzerHost: '127.0.0.1',
            analyzerPort: 9900,
            openAnalyzer: false
        })
    ]
});





