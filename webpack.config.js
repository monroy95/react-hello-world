const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin')

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
        // new FaviconsWebpackPlugin({
        //     logo: './public/assets/images/react.svg',
        //     prefix: './assets/images/icons/',
        //     title: 'React Hello World',
        //     background: '#000'
        // }),
        new AppManifestWebpackPlugin({
            logo: './public/assets/images/react.svg',
            prefix: './assets/images/icons/', // default '/'
            output: './assets/images/icons/', // default '/'. Can be absolute or relative
            emitStats: false,
            statsFilename: 'iconstats.json', // can be absolute path
            statsEncodeHtml: false,
            persistentCache: false,
            inject: true,
            config: {
                appName: 'React hello World', // Your application's name. `string`
                appDescription: "Prueba de React Base", // Your application's description. `string`
                developerName: "Lucio Negrello", // Your (or your developer's) name. `string`
                developerURL: "https://lunestudio.com.ar/", // Your (or your developer's) URL. `string`
                background: '#000', // Background colour for flattened icons. `string`
                theme_color: '#fff', // Theme color for browser chrome. `string`
                display: 'standalone', // Android display: "browser" or "standalone". `string`
                start_url: '/', // Android start application's URL. `string`
                version: '1.0', // Your application's version number. `number`
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            file: './index.html'
        })
    ]
}