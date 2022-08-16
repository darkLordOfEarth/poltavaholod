const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HandlebarsPlugin = require("handlebars-webpack-plugin")
// const Handlebars = require("handlebars")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: {
    app: ['./assets/js/index.js', './assets/scss/app.scss' ]
  },
  module: {
    rules: [
      { 
        test: /\.scss$/, 
        use: [ 
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],   
      },
      { 
        test: /\.(js)$/,
        use: 'babel-loader' 
      },
      {
        test: /\.hbs/,
        loader: 'handlebars-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.woff$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.eot$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        type: 'asset',
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].js',
  },
  devServer: {
    historyApiFallback: true,
    static: {
        directory: path.join(__dirname, 'app'),
      },
    open: true,
    compress: true,
    hot: true,
    port: 3000,
},
  plugins: [
    new CopyPlugin({
      patterns: [
        "./assets/data/browserconfig.xml",
        "./assets/data/manifest.json",
        {
          from: './assets/libs/jquery.maskedinput.js',
          to: './js/jquery.maskedinput.js'
      },
        {
          from: './assets/libs/jqueryUiTouchPunch.js',
          to: './js/jqueryUiTouchPunch.js'
      },
        {
          from: './assets/libs/jqueryUi.js',
          to: './js/jqueryUi.js'
      },
        {
          from: './assets/libs/owlcarousel/owl.carousel.min.js',
          to: './js/owlcarousel/owl.carousel.min.js'
      },
        {
          from: './assets/libs/owlcarousel/owl.carousel.min.css',
          to: './js/owlcarousel/owl.carousel.min.css'
      },
        {
          from: './assets/libs/owlcarousel/owl.theme.default.min.css',
          to: './js/owlcarousel/owl.theme.default.min.css'
      },
        {
          from: './assets/images',
          to: './images'
      },
        { 
          from: './assets/data/browserconfig.xml',
          to: "browserconfig.xml"
        },
        { 
          from: './assets/data/manifest.json',
          to: "manifest.json"
        },
      ],   
    }),
    new BrowserSyncPlugin({
      files: ["build/css/app.css", "build/[name].html", "build/js/app.js" ],
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['./build'], index: "terms.html" }
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), "assets", "templates", "*.hbs"),
      output: path.join(process.cwd(), "build", "[name].html"),
      data: require("./assets/data/project.json"),
      partials: [
        path.join(process.cwd(), "assets", "templates", "*", "*.hbs")
      ],
    }),
  ],
  mode: 'development',
}