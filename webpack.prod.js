const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

//  不要在开发环境下使用[chunkhash] 因为这会增加编译时间
module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin()
    ]
});
