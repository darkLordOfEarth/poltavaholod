// webpack.prod.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: {
    app: './assets/js/index.js', // твой кастомный JS
  },

  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/i,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.hbs$/i,
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

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].min.js', // минифицированный JS из entry
  },

  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css', // минифицированный CSS
    }),

    new CopyPlugin({
      patterns: [
        { from: 'assets/images', to: 'images' },
        { from: 'assets/libs/bootstrap/*.js', to: 'js/bootstrap/[name].min.js' },
        { from: 'assets/libs/bootstrap/*.css', to: 'css/bootstrap/[name].min.css' },
        { from: 'assets/libs/owlcarousel/*.js', to: 'js/owlcarousel/[name].min.js' },
        { from: 'assets/libs/owlcarousel/*.css', to: 'css/owlcarousel/[name].min.css' },
        { from: 'assets/libs/slick/*.js', to: 'js/slick/[name].min.js' },
        { from: 'assets/libs/slick/*.css', to: 'css/slick/[name].min.css' },
        { from: 'assets/libs/jquery.min.js', to: 'js/jquery.min.js' },
        { from: 'assets/data/manifest.json', to: 'manifest.json' },
        { from: 'assets/data/browserconfig.xml', to: 'browserconfig.xml' },
      ],
    }),

    new HtmlWebpackPlugin({
      template: './assets/templates/index.hbs',
      filename: 'index.html',
      minify: true,
    }),
    new HtmlWebpackPlugin({
      template: './assets/templates/about.hbs',
      filename: 'about.html',
      minify: true,
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: false }), // минифицирует JS
      new CssMinimizerPlugin(), // минифицирует CSS
    ],
  },
};
