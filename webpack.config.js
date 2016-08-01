var isProduction = process.env.NODE_ENV === 'production'
var webpack = require('webpack')
var path = require('path')

var folders = {
  root: path.resolve(__dirname, 'client'),
  root: path.resolve(__dirname, 'client', 'app'),
  bower: path.resolve(__dirname, 'client', 'app', 'bower_components')
}

var nodeAndBower = /(node_modules|bower_components)/

var config = {
  entry: folders.root,
  output: {
    path: folders.root,
    pathinfo: true,
    filename: 'bundle.js',
    sourceMapFilename: "[file].map"
  },
  devtool: isProduction? null: "eval",
  module : {
    noParse: [],
    loaders : [
      {
        test: /\.html$/,
        loader: "string",
        include : folders.app,
        exclude: nodeAndBower
      },
      { test: /\.jade$/, loader: "pug" },
      {
        test: /\.js$/,
        include: folders.app,
        loader: 'babel',
        exclude: nodeAndBower,
        query: {
          presets: ['es2015', 'stage-1'],
          "plugins": [
            "ng-annotate",
            "transform-decorators-legacy",
            "transform-class-properties",
            "transform-flow-strip-types",
            "transform-object-rest-spread"
          ]
        }
      },
      {
        test: /\.styl$/,
        include : folders.app,
        exclude: nodeAndBower,
        loaders: ['style', 'css', 'stylus']
      },
      {
        test: /\.css/,
        include : folders.app,
        exclude: nodeAndBower,
        loaders: ['style', 'css']
      },
      { test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/, loader: 'url', include : folders.app,
        exclude: nodeAndBower },
      { test: /\.(jpe?g|png|gif|svg)$/, loader:'file', include : folders.app, exclude: nodeAndBower }
      // {
      //   test: /\.jsx?$/,
      //   exclude: nodeAndBower,
      //   loaders: [ "babel-loader", "eslint-loader" ]
      // }
    ]
  },
  plugins: [
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
  ]
}

module.exports = config
