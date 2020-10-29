const paths = require('./paths');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: paths.dist,
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': paths.src
        }
    },
    plugins: [
        // Removes/cleans build folders and unused assets when rebuilding
        new CleanWebpackPlugin(),

        // Copies files from target to destination folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.static,
                    to: paths.distResolve('static'),
                    globOptions: {
                        ignore: ['*.DS_Store', '.*'],
                    },
                },
            ],
        }),

        // Generates an HTML file from a template
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
        }),
    ],
    module: {
        rules: [
            // JavaScript: Use Babel to transpile JavaScript files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },

            // Styles: Inject CSS into the head
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: {sourceMap: false, importLoaders: 1}},
                    {loader: 'postcss-loader', options: {sourceMap: false}},
                    {loader: 'sass-loader', options: {sourceMap: false}},
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: paths.distResolve('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: paths.distResolve('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: paths.distResolve('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
};