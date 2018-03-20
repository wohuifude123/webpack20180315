const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let baseConfig = {

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
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./public/dist/vendor-manifest.json')
        })
    ]
};


exports.baseConfig = baseConfig;
