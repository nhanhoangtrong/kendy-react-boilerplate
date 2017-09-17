const dotenv = require('dotenv');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const chalk = require('chalk');

dotenv.load({
    path: path.join(__dirname, '.env'),
});

const vendors = Object.keys(require('./package.json').dependencies);

module.exports = (env = {}) => {
    const isProduction = env.production == 'true' || process.env.NODE_ENV === 'production';

    const publicPath = env.publicPath || process.env.PUBLIC_PATH || '/';

    const devHost = env.host || process.env.DEV_HOST || 'localhost';
    const devPort = parseInt(env.port) || parseInt(process.env.DEV_PORT) || 8080;

    console.log(chalk.green('running webpack with isProduction:'), chalk.yellow(isProduction));

    const sourcePath = path.join(__dirname, 'src');
    const buildPath = path.join(__dirname, 'dist');

    const devtool = isProduction ? 'source-map' : 'eval-source-map';
    const devServer = {
        contentBase: buildPath,
        host: devHost,
        port: devPort,
        historyApiFallback: {
            // Fixing public path for generated HTML file in development
            index: publicPath,
            rewrites: {
                from: /./, to: publicPath,
            },
        },
        hot: true,
        inline: true,
        publicPath,
    };

    const extractCSSPlugin = new ExtractTextPlugin({
        filename: '[id].css',
        disable: !isProduction,
        ignoreOrder: true,
    });
    const extractStylusPlugin = new ExtractTextPlugin({
        filename: '[id].css',
        disable: !isProduction,
        ignoreOrder: true,
    });

    const plugins = [
        new HtmlWebpackPlugin({
            title: isProduction ? 'Production' : 'Development',
            template: path.resolve(__dirname, 'src/index.ejs'),
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
            __DEV__: !isProduction,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.bundle.js',
            minChunks: Infinity,
        }),
        new CleanWebpackPlugin(['dist']),
        extractCSSPlugin,
        extractStylusPlugin,
    ];
    if (!isProduction) {
        plugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
        ]);
    } else {
        plugins.concat([
            new UglifyJSPlugin({
                uglifyOptions: {
                    warnings: true,
                },
            }),
        ]);
    }

    const entry = isProduction ? {
        app: './index.ts',
        vendors: vendors,
    } : {
        app: [
            'react-hot-loader/patch',
            './index.ts',
        ],
        vendors: vendors,
    };

    const defaultConfig = {
        entry: entry,
        resolve: {
            modules: [
                'node_modules',
            ],
            extensions: [
                '.ts', '.tsx',
                '.js', '.jsx',
                '.json',
            ]
        },
        target: 'web',
        context: sourcePath,
        output: {
            filename: '[name].bundle.js',
            path: buildPath,
            publicPath: publicPath,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: isProduction ? 'awesome-typescript-loader?module=es6' : [
                        'react-hot-loader/webpack',
                        'awesome-typescript-loader',
                    ],
                },
                {
                    enforce: 'pre',
                    test: /\.tsx?$/,
                    use: {
                        loader: 'tslint-loader',
                        options: {
                            emitErrors: true,
                        },
                    },
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    use: [
                        'source-map-loader',
                    ],
                },
                {
                    test: /\.styl$/,
                    use: extractStylusPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                // Stylus CSS Modules config
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    sourceMap: !isProduction,
                                    importLoaders: 1,
                                    localIdentName: '[local]__[hash:base64:5]',
                                },
                            },
                            'stylus-loader',
                        ],
                    }),
                },
                {
                    test: /\.css$/,
                    use: extractCSSPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                // Simple CSS Modules without PostCSS
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    sourceMap: !isProduction,
                                    importLoaders: 1,
                                    localIdentName: '[local]__[hash:base64:5]',
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                            },
                        }
                    ],
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                            },
                        },
                    ],
                },
            ],
        },
    };

    return Object.assign({}, defaultConfig, {
        devtool,
        plugins,
    }, isProduction ? {} : { devServer });
};
