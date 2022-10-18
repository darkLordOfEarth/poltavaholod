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
          from: './assets/libs/bootstrap/*.js',
          to: './js/bootstrap/[name].js'
      },
        {
          from: './assets/libs/bootstrap/*.css',
          to: './css/bootstrap/[name].css'
      },
        {
          from: './assets/libs/slick/*.js',
          to: './js/slick/[name].js'
      },
        {
          from: './assets/libs/slick/*.css',
          to: './css/slick/[name].css'
      },
        {
          from: './assets/libs/slick/*.gif',
          to: './css/slick/[name].gif'
      },
        {
          from: './assets/libs/*.js',
          to: './js/[name].js'
      },
        {
          from: './assets/libs/owlcarousel/*.js',
          to: './js/owlcarousel/[name].js'
      },
        {
          from: './assets/libs/owlcarousel/*.css',
          to: './css/owlcarousel/[name].css'
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
      server: { baseDir: ['./build'], index: "index.html" }
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