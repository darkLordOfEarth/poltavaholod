const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'], // для dev HMR
      },
    ],
  },

  devServer: {
    static: { directory: path.join(__dirname, 'dist') },
    port: 3000,
    hot: true,
    open: true,
    watchFiles: ['assets/**/*'],
    devMiddleware: {
      writeToDisk: true, // записывает файлы на диск
    },
  },
});
