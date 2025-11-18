const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: ['./assets/js/index.js', './assets/scss/app.scss'],
  },

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: { filename: 'images/[name][ext]' },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/app.min.css' }),

    new CopyPlugin({
      patterns: [
        { from: 'assets/images', to: 'images', noErrorOnMissing: true },
        { from: 'assets/libs/jquery.min.js', to: 'js/jquery.min.js', noErrorOnMissing: true },
        {
          from: 'assets/libs/owlcarousel/*.js',
          to: 'js/owlcarousel/[name][ext]',
          noErrorOnMissing: true,
        },
        {
          from: 'assets/libs/owlcarousel/*.css',
          to: 'css/owlcarousel/[name][ext]',
          noErrorOnMissing: true,
        },
        { from: 'assets/libs/slick/*.js', to: 'js/slick/[name][ext]', noErrorOnMissing: true },
        { from: 'assets/libs/slick/*.css', to: 'css/slick/[name][ext]', noErrorOnMissing: true },
      ],
    }),

    new HtmlWebpackPlugin({ template: './assets/templates/index.hbs', filename: 'index.html' }),
    // new HtmlWebpackPlugin({ template: './assets/templates/about.hbs', filename: 'about.html' }),
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/app.min.js',
    clean: true, // удаляем старые файлы
  },
};
