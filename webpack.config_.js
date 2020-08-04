let webpack = require('webpack');
let path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    mode: "production",
    entry: './resources/js/app.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        // filename: 'app.js',
        filename: '[name].js',
        publicPath: './public'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({    // webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.
        //     names: ['vendor']
        // })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                // ecma: 5,
                // warnings: false,
                // ie8: false,
                // safari10: false,
                // dead_code: true,
                // comments: false,
                uglifyOptions: {
                    compress: {
                        inline: false
                    }
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            minRemainingSize: 0,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: '~',
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    // cacheGroupKey here is `vendor` as the key of the cacheGroup
                    name(module, chunks, cacheGroupKey) {
                        const moduleFileName = module.identifier().split('/').reduceRight(item => item);
                        const allChunksNames = chunks.map((item) => item.name).join('~');
                        return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                    },
                    chunks: 'all'
                }
            }
        }
    },
};

module.exports = {
    entry: './resources/js/app.js',
    output: {
      path: path.resolve(__dirname, 'public/js'),
      filename: 'app.js',
      publicPath: './public'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' для webpack 1
            // 'vue$': 'vue/dist/vue.common.js' // для webpack 1
        }
    },
    plugins: [],
};

// if (process.env.NODE_ENV === 'production') {
//     optimization.minimizer = [new UglifyJSPlugin({
//         sourcemap: true,
//         compress: {
//             warnings: false
//         }
//     })];
//
//
//     module.exports.plugins.push(
//         // new webpack.optimize.UglifyJsPlugin({
//         //     sourcemap: true,
//         //     compress: {
//         //         warnings: false
//         //     }
//         // })
//         // optimization.minimizer
//     )
// }
