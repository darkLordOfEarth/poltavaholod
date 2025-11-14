const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // ← добавлено!

module.exports = {
  entry: {
    app: ['./assets/js/index.js', './assets/scss/app.scss'],
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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

    new CopyPlugin({
      patterns: [
        { from: 'assets/images', to: 'images' }, // картинки
        { from: 'assets/libs/bootstrap/*.js', to: 'js/bootstrap/[name][ext]' },
        { from: 'assets/libs/bootstrap/*.css', to: 'css/bootstrap/[name][ext]' },
        { from: 'assets/libs/owlcarousel/*.js', to: 'js/owlcarousel/[name][ext]' },
        { from: 'assets/libs/owlcarousel/*.css', to: 'css/owlcarousel/[name][ext]' },
        { from: 'assets/libs/slick/*.js', to: 'js/slick/[name][ext]' },
        { from: 'assets/libs/slick/*.css', to: 'css/slick/[name][ext]' },
        { from: 'assets/libs/jquery.min.js', to: 'js/jquery.min.js' }, // jQuery отдельно
      ],
    }),

    // 🔥 Рендерим HBS → HTML через HtmlWebpackPlugin
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
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
};
