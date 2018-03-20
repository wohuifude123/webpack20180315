const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const manifest = require('./public/dist/vendor-manifest.json');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        filename: 'dist/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index-package.html',
            template: './src/index.html',
            favicon: './src/favicon.ico',
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['dist/'+ manifest.name + '.dll.js'],
            append: false // 不会被 webpack 自动打包
        }),
        new HtmlWebpackHarddiskPlugin(), // 将[venderName + '.js']和['env-config.js']放进 index.html 中
    ],
};





