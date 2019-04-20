const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = {
    entry: {
        "home": path.resolve(__dirname, './src/index.js'),
        "load-service-worker": path.resolve(__dirname, './public/assets/js/load-service-worker.js')
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
        new HtmlWebpackPlugin({
            template: './public/index.html',
            file: './index.html'
        }),
        new AppManifestWebpackPlugin({
            logo: './public/assets/images/react.svg',
            prefix: 'https://whoisnegrello.github.io/react-hello-world/assets/images/icons/', // default '/'
            output: './assets/images/icons/', // default '/'. Can be absolute or relative
            emitStats: false,
            statsEncodeHtml: false,
            statsFilename: 'iconstats.json',
            persistentCache: true,
            inject: true,
            config: {
                appName: 'React Hello World', // Your application's name. `string`
                appDescription: "Testing App Manifest Webpack Plugin.", // Your application's description. `string`
                developerName: "Lucio Negrello", // Your (or your developer's) name. `string`
                developerURL: "https://lunestudio.com.ar/", // Your (or your developer's) URL. `string`
                background: '#fff', // Background colour for flattened icons. `string`
                theme_color: '#000', // Theme color for browser chrome. `string`
                display: 'standalone', // Android display: "browser" or "standalone". `string`
                start_url: '/react-hello-world/', // Android start application's URL. `string`
                scope: '/react-hello-world/',
                version: '1.0' // Your application's version number. `number`
            }
        }),
        new GenerateSW({
            swDest: 'service-worker.js',
            include: [/\.html$/, /\.js$/, /\.css$/],
            exclude: [/\.(?:png|jpg|jpeg|svg)$/],
            precacheManifestFilename: './assets/js/wb-manifest.[manifestHash].js',
            runtimeCaching: [
                {
                    urlPattern: /\.(?:html|js|css)$/,
                    handler: 'staleWhileRevalidate',
                    options: {
                        cacheName: 'assets',
                        expiration: {
                            maxAgeSeconds: 2 * 60 * 60
                        },
                    },
                },
                {
                    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'images',
                        expiration: {
                            maxAgeSeconds: 30 * 24 * 60 * 60
                        },
                    },
                },
                {
                    urlPattern: /^https?.*/,
                    handler: 'networkFirst',
                    options: {
                        cacheName: 'default',
                        expiration: {
                            maxAgeSeconds: 2 * 60 * 60
                        },
                    },
                }
            ]
        })
    ]
}