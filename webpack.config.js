const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        home: path.resolve(__dirname, './src/index.js'),
        otra: path.resolve(__dirname, './src/index.js')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: path.resolve(__dirname, 'dist') + '/',
        filename: './assets/js/[name].js',
        chunkFilename: './assets/js/[id].[chunkhash].js'
    },
    mode: 'production',
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-syntax-dynamic-import']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }]
            },
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(jpg|png|gif|woff|eot|ttf|svg)$/,
                use: {
                    loader: 'url-laoder',
                    options: {
                        fallback: 'file-loader',
                        limit: 1000000,
                        name: './assets/images/[name].[hash].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new extractTextPlugin('./assets/css/[name].css'),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            file: './index.html'
        }),
        new webpack.DllReferencePlugin({
            manifest: require('./modules-manifest.json')
        })
    ]
}