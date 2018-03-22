const merge = require('webpack-merge');

//  不要在开发环境下使用[chunkhash] 因为这会增加编译时间

const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const manifest = require('./public/dist/vendor-manifest.json');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const _venderName = manifest.name.split('_');
const venderName = _venderName[0] + '.' + _venderName[1];

module.exports = merge(common.baseConfig, {
    output: {
        filename: 'dist/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./public/dist/vendor-manifest.json')
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.html',
            favicon: './src/favicon.ico',
            alwaysWriteToDisk: true // 是否开启 new HtmlWebpackHarddiskPlugin()
        }),
        new CopyWebpackPlugin(
            [
                { from: 'server/config/setting.js', to: 'config/setting.js' },
                { from: 'server/virtual/', to: 'virtual/' }
            ],
            { copyUnmodified: true }
        ),
        new UglifyJSPlugin(),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['dist/'+ venderName  + '.dll.js'],
            append: false // 不会被 webpack 自动打包
        }),
        // new HtmlWebpackIncludeAssetsPlugin({
        //     assets: ['config/env-config.js'],
        //     append: false, // 不会被 webpack 自动打包
        //     hash: true
        // }),
        new HtmlWebpackHarddiskPlugin(), // 将[venderName + '.js']和['env-config.js']放进 index.html 中
    ],
});
