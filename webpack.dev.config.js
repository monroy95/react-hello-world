const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        home: path.resolve(__dirname, './src/index.js')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        port: 9000
    },
    mode: 'development',
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
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
        new HtmlWebpackPlugin({
            template: './public/index.html',
            file: './index.html'
        }),
        new extractTextPlugin('./assets/css/[name].css')
    ]
}