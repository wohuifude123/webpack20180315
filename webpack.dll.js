const path    = require('path');
const webpack = require('webpack');

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
        filename: '[name].dll.js',
        /**
         * output.library
         * window.${output.library}に定義される
         * 今回の場合、`window.vendor_library`になる
         */
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            /**
             * path
             * manifestファイルの出力先
             * [name]の部分はentryの名前に変換される
             */
            path: path.join(__dirname, 'public/dist', '[name]-manifest.json'),
            /**
             * name
             * どの空間（global変数）にdll bundleがあるか
             * output.libraryに指定した値を使えばよい
             */
            name: '[name]_library'
        })
    ]
};
