var isProduction = process.env.NODE_ENV === 'production'
var webpack = require('webpack')
var path = require('path')
var fs = require('fs');

var folders = {
  root: path.resolve(__dirname, 'public'),
  slash: path.resolve(__dirname, 'public') + '/',
  app: path.resolve(__dirname, 'public', 'app'),
  admin: path.resolve(__dirname, 'public', 'admin'),
  themes: path.resolve(__dirname, 'public', 'themes'),
  extensions: path.resolve(__dirname, 'public', 'extensions')
}

var nodeAndBower = /(node_modules|bower_components)/

var config = {
  devtool: isProduction? null: "sourcemap",
  resolve: {
    modules: ['node_modules']
  },
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
          presets: ['es2017', 'stage-1'],
          "plugins": [
            "ng-annotate",
            "transform-decorators-legacy",
            "transform-async-to-generator",
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
      { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
      { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
      { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
      { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
      { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' },

      { test: /\.(jpe?g|png|gif|svg)$/, loader:'url', include : folders.root },
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
