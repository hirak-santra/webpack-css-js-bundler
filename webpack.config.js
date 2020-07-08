const path = require('path');
const pr = require('os');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


const configuration = {
  imagePath: 'images',
  fontPath: 'fonts',
  outputJsPath: './js/',
  outputCssPath: './css/',
  js: {
      filename: '[name].bundle.js',
      bundles: {
          main: [
            './js/script.js'
          ]
      }
  },
  css: {
      filename: '[name].bundle.css',
      bundles: {
          style: [
            './css/global.css',
            './css/form.css',
        ]
      }
  }
};


const generateConfigJson = (configuration)=> {
    let mode = 'production';
    let minimize = true;
    let stats = {
        children: false
    };  
    return [
                {
                    target: 'web',
                    stats: stats,
                    optimization: {
                        minimize: minimize
                    },
                    entry: configuration.js.bundles,
                    output: {
                        path: path.join(__dirname, configuration.outputJsPath),
                        filename: configuration.js.filename
                    },
                    mode: mode
                },
                {
                    target: 'web',
                    stats: stats,
                    optimization: {
                        minimize: minimize,
                        minimizer: [new OptimizeCSSAssetsPlugin({})]
                    },
                    plugins: [
                        new ExtractTextPlugin(configuration.css.filename),
                    ],
                    entry: configuration.css.bundles,
                    output: {
                        path: path.join(__dirname, configuration.outputCssPath),
                        filename: configuration.css.filename
                    },
                    module: {
                        rules: [
                            {
                                test: /\.css$/,
                                use: ExtractTextPlugin.extract({
                                        fallback: 'style-loader',
                                        use: 'css-loader'
                                    })
                            },
                            {
                                test: /\.(woff|woff2|eot|ttf)$/,
                                exclude: /node_modules/,
                                loader: 'file-loader',
                                options: {
                                    name: '../[path][name].[ext]',
                                    emitFile: false,
                                }
                            },
                            {
                                test: /\.(svg|png|jpe?g|gif)$/,
                                exclude: /node_modules/,
                                loader: 'file-loader',
                                options: {
                                    name: '../[path][name].[ext]',
                                    emitFile: false,
                                }
                            },
                        ]
                    },
                    mode: mode
                }
            ];
};


module.exports = generateConfigJson(configuration);
