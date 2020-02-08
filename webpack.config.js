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
