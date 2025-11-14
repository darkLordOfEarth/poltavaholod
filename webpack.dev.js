const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./assets/js/index.js', './assets/scss/app.scss'],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new HtmlWebpackPlugin({
      template: './assets/templates/index.hbs',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './assets/templates/about.hbs',
      filename: 'about.html',
    }),
  ],

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    devMiddleware: {
      writeToDisk: false,
    },
    compress: true,
    port: 3000,
    hot: true, // горячая перезагрузка
    open: true, // открывает браузер автоматически
    watchFiles: ['assets/**/*'], // следим за изменениями в этих файлах
  },
};
