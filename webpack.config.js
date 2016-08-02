var isProduction = process.env.NODE_ENV === 'production'
var webpack = require('webpack')
var path = require('path')
var fs = require('fs');

var folders = {
  root: path.resolve(__dirname, 'client'),
  slash: path.resolve(__dirname, 'client') + '/',
  app: path.resolve(__dirname, 'client', 'app'),
  admin: path.resolve(__dirname, 'client', 'admin'),
  themes: path.resolve(__dirname, 'client', 'themes'),
  extensions: path.resolve(__dirname, 'client', 'extensions')
}

var nodeAndBower = /(node_modules|bower_components)/

var config = {
  devtool: isProduction? null: "sourcemap",
  module : {
    noParse: [],
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     exclude: nodeAndBower,
    //     loaders: [ "babel-loader", "eslint-loader" ]
    //   }
    // ],
    loaders : [
      {
        test: /\.html$/,
        include : folders.root,
        exclude: nodeAndBower,
        loaders: ["ngtemplate?module=meanbaseApp&relativeTo=" + folders.slash, "html"]
      },
      {
        test: /\.jade$/,
        loaders: ["ngtemplate?module=meanbaseApp&relativeTo=" + folders.slash, "string", "jade-html"],
        include : folders.root,
        exclude: nodeAndBower
      },
      {
        test: /\.js$/,
        include: folders.root,
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
        include : folders.root,
        exclude: nodeAndBower,
        loaders: ['style', 'css', 'stylus']
      },
      {
        test: /\.css/,
        include : folders.root,
        exclude: nodeAndBower,
        loaders: ['style', 'css']
      },
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        loader: 'url',
        include:folders.root,
        exclude: nodeAndBower
      },
      { test: /\.(jpe?g|png|gif|svg)$/, loader:'file', include : folders.root, exclude: nodeAndBower }
      // {
      //   test: /\.jsx?$/,
      //   exclude: nodeAndBower,
      //   loaders: [ "babel-loader", "eslint-loader" ]
      // }
    ]
  },
  plugins: isProduction? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
  ]: []
}

var appConfig = Object.assign({}, config, {
  entry: folders.app,
  output: {
    path: folders.app,
    pathinfo: true,
    filename: 'bundle.js',
    sourceMapFilename: "[file].map"
  }
});

var adminConfig = Object.assign({}, config, {
  entry: folders.admin,
  output: {
    path: folders.admin,
    pathinfo: true,
    filename: 'bundle.js',
    sourceMapFilename: "[file].map"
  }
});

var configs = [appConfig, adminConfig]

var themes = fs.readdirSync(folders.themes).filter(function(file) {
 return fs.statSync(path.join(folders.themes, file)).isDirectory()
})

themes.forEach(function (file) {
  var theme = Object.assign({}, config, {
    entry: path.join(folders.themes, file, "index.js"),
    output: {
       path: path.join(folders.themes, file),
       filename: "theme.min.js"
    }
  });
	configs.push(theme);
})

var extensions = fs.readdirSync(folders.extensions).filter(function(file) {
 return fs.statSync(path.join(folders.extensions, file)).isDirectory()
})

extensions.forEach(function (file) {
  var theme = Object.assign({}, config, {
    entry: path.join(folders.extensions, file, "index.js"),
    output: {
       path: path.join(folders.extensions, file),
       filename: "extension.min.js"
    }
  });
	configs.push(theme);
})

// Return Array of Configurations
module.exports = configs
