const path = require('path');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        'bundle': __dirname + '/app/assets/main.scss',
    },
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/dist'
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
        })
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {minimize: true}
                }, {
                    loader: 'postcss-loader',
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: [path.resolve(__dirname, "node_modules")]
                    }
                }]
            })
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {minimize: true}
                }, {
                    loader: 'postcss-loader'
                }]
            })
        }]
    },
    resolve: {
        extensions: ['.js', '.css', 'scss'],
        modules: [
            path.resolve(__dirname, 'static'),
            path.resolve(__dirname, 'dist'),
            path.resolve(__dirname, 'node_modules')
        ]
    },
    performance: {
        hints: false
        // hints: 'error'
        // hints: 'warning'
    }
};