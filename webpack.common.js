const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 第三方共有的
const manifest = require('./vender-manifest.json');
const _venderName = manifest.name.split('_');
const venderName = _venderName[0] + '.' + _venderName[1];


module.exports = {
    entry: {
        app: './src/main.js'
    },
    resolve: {
        // 定义别名
        alias: {
            'SRC_PATH': path.resolve(__dirname, 'src'),
        },
        // 告诉webpack解析模块时应该搜索哪些目录
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.less/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                //正则匹配后缀.js文件;
                test: /\.js$/,
                //需要排除的目录
                exclude: /(node_modules|bower_components)/,
                //加载babel-loader转译es6
                loaders: [
                    'babel-loader', // .babelrc 具体配置文件
                    //'eslint-loader'// 必须在 .babelrc 的后面

                ]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test:/\.(png|svg|jpg|gif|ico|woff|eot|ttf)$/,
                exclude: /(public)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {

                            limit:8000000,   //小于50K的 都打包

                            name:'[hash:8].[name].[ext]',
                            // publicPath:"img/",  //替换CSS引用的图片路径 可以替换成爱拍云上的路径
                            // outputPath:"../img/"        //生成之后存放的路径
                        }
                    }
                ]
            }

        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], { // 清除 dist 文件中的内容
            exclude: [venderName + '.js'] // 排除 提取出的 第三方的 js
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./vender-manifest.json') // 加载 manifest.json
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.html',
            //favicon: './src/favicon.ico',
            alwaysWriteToDisk: true // 是否开启 new HtmlWebpackHarddiskPlugin()
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [venderName + '.js'],
            append: false // 不会被 webpack 自动打包
        }),
        // new HtmlWebpackIncludeAssetsPlugin({
        //     assets: ['config/env-config.js'],
        //     append: false, // 不会被 webpack 自动打包
        //     hash: true
        // }),
        new HtmlWebpackHarddiskPlugin(), // 将[venderName + '.js']和['env-config.js']放进 index.html 中
        new webpack.DefinePlugin({ // 创建一个编译时可以配置的全局常量
            PRODUCTION: JSON.stringify(true),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
};
