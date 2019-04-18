const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        home: path.resolve(__dirname, './src/index.js')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './assets/js/[name].js',
        chunkFilename: './assets/js/vendor.js'
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
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
                    loader: 'url-loader',
                    options: {
                        fallback: 'file-loader',
                        limit: 1000,
                        name: './assets/images/[name].[ext]'
                    }
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 1
        }
    },
    plugins: [
        new extractTextPlugin('./assets/css/[name].css'),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {discardComments:{removeAll:true}}]
            },
            canPrint: true
        }),
        new FaviconsWebpackPlugin('./src/assets/images/react.svg'),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            file: './index.html'
        })
    ]
}