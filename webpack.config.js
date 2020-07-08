const webpackLib = require('./webpack-custom')

const configuration = {
  imagePath: 'images',
  fontPath: 'fonts',
  outputJsPath: './js/',
  outputCssPath: './css/',
  js: {
      filename: '[name].bundle.js',
      bundles: {
          main: [
            './js/common-script.js'
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

module.exports = webpackLib.getWebpackJSON(configuration);
