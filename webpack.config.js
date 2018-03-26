const dotenv = require('dotenv');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const chalk = require('chalk');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

dotenv.load({
    path: path.join(__dirname, '.env'),
});

const vendors = Object.keys(require('./package.json').dependencies);

module.exports = (env = {}) => {
    const isProduction =
        env.production == 'true' || process.env.NODE_ENV === 'production';

    const publicPath = env.publicPath || process.env.PUBLIC_PATH || '/';

    const devHost = env.host || process.env.DEV_HOST || 'localhost';
    const devPort =
        parseInt(env.port) || parseInt(process.env.DEV_PORT) || 8080;

    console.log(
        chalk.green('running webpack with isProduction:'),
        chalk.yellow(isProduction)
    );

    const sourcePath = path.join(__dirname, 'src');
    const buildPath = path.join(__dirname, 'dist');

    const devtool = isProduction
        ? 'source-map'
        : 'cheap-module-eval-source-map';
    const devServer = {
        contentBase: buildPath,
        host: devHost,
        port: devPort,
        historyApiFallback: {
            // Fixing public path for generated HTML file in development
            index: publicPath,
            rewrites: {
                from: /./,
                to: publicPath,
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
            template: path.resolve(__dirname, 'src/template.ejs'),
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(
                isProduction ? 'production' : 'development'
            ),
            __DEV__: !isProduction,
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendors',
        //     filename: 'vendors.bundle.js',
        //     minChunks: Infinity,
        // }),
        new CleanWebpackPlugin(['dist']),
        extractCSSPlugin,
        extractStylusPlugin,
    ];
    if (!isProduction) {
        plugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new ForkTsCheckerWebpackPlugin({
                tsconfig: path.resolve(__dirname, 'tsconfig.json'),
                tslint: path.resolve(__dirname, 'tslint.json'),
            }),
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

    const entry = isProduction
        ? {
              app: './index.ts',
              vendors: vendors,
          }
        : {
              app: ['react-hot-loader/patch', './index.ts'],
              vendors: vendors,
          };

    const defaultConfig = {
        mode: isProduction ? 'production' : 'development',
        entry: entry,
        resolve: {
            modules: ['node_modules'],
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            alias: {
                '@app': path.resolve(__dirname, 'src/'),
            },
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
                    include: sourcePath,
                    use: isProduction
                        ? {
                              loader: 'ts-loader',
                              options: {
                                  transpileOnly: true,
                              },
                          }
                        : [
                              {
                                  loader: 'babel-loader',
                                  options: {
                                      babelrc: true,
                                      plugins: ['react-hot-loader/babel'],
                                  },
                              },
                              {
                                  loader: 'ts-loader',
                                  options: {
                                      transpileOnly: true,
                                  },
                              },
                          ],
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    use: ['source-map-loader'],
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
                                    minimize: isProduction,
                                },
                            },
                            'stylus-loader',
                        ],
                    }),
                },
                {
                    test: /\.css$/,
                    exclude: sourcePath,
                    use: extractCSSPlugin.extract({
                        fallback: 'style-loader',
                        use: {
                            loader: 'css-loader',
                            options: {
                                minimize: isProduction,
                            },
                        },
                    }),
                },
                {
                    test: /\.css$/,
                    include: sourcePath,
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
                                    minimize: isProduction,
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.(png|jpe?g|gif|svg|eot|ttf|woff2?)$/,
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
        devServer,
    });
};
