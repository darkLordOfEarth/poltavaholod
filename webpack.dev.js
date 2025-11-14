const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  devServer: {
    static: { directory: path.join(__dirname, 'dist') },
    port: 3000,
    hot: true,
    open: true,
    watchFiles: ['assets/**/*'],
    devMiddleware: {
      writeToDisk: true,
    },
  },
});
