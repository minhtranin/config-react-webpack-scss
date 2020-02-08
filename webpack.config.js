const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebPack = require('html-webpack-plugin');
const Vendor_List = [
    'axios'
];
const devServer = {
    port: 4000,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true,
    overlay: true,
    stats: 'minimal',
    inline: true,
    compress: true,
    contentBase: '/'
}
const config = {
    mode: 'development',
    entry: {
        bundle: './src/index.js',
        vendor: Vendor_List
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
    optimization: { // cache bundle & vendor
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                // use: ExtractTextPlugin.extract({
                //     use: 'css-loader',
                //     fallback: 'style-loader'
                // }),
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                test: [
                    /\.s[ac]ss$/i,
                    /\.css$/
                ]
            }
        ]
    },
    devServer,
    // resolve: {
    //     modules: [
    //         resolve('app'),
    //         resolve('app/css'),
    //         'node_modules'
    //     ],

    //     alias: {
    //         // external libraries
    //         jquerynotify: resolve('app/js/jquery.notify.min'),
    //         clipboard: resolve('app/js/clipboard.min'),

    //         // directory alias to shorten template paths
    //         templates: resolve('app/templates')
    //     }
    // },
    plugins: [
        new HtmlWebPack({
            template: 'src/index.html'
        })
    ]
    // plugins: [
    //     new ExtractTextPlugin('style.css')
    // ]
                        // plugins: [
                        //     new webpack.optimize.CommonsChunkPlugin({
                        //         name: 'vendor',
                        //         minChunks: Infinity
                        //     })
                        // ]
}
module.exports = config
// "babel-core": "^6.26.3",//get code- analyze -> 1 file
// "babel-loader": "^7.1.5",// how to work with webpack
// "babel-preset-env": "^1.7.0", // transform es67 -> es5
// "babel-preset-react": "^6.24.1",// transform jsx -> js
// "css-loader": "^3.4.2",// allow webpack understand syntax import css from entry
// "extract-text-webpack-plugin": "^4.0.0-beta.0", // detach 1 file external
// "node-sass": "^4.13.1",// scss, sass load
// "sass-loader": "^8.0.2",// scss, sass load
// "style-loader": "^1.1.3",// add css to html
