/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var multer  = require('multer');
var fs = require('fs');
var gm = require('gm');
var folderName;

var hasGM = false;
var exec = require('child_process').exec;
exec("gm -help", function (error, stdout, stderr) {
  if(!error) { hasGM = true; } else {
    console.log('!!!!! Graphics Magick is not installed, image thumbnails cannot be created !!!!!');
  }

});

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.set('view engine', 'jade');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  // Persist sessions with mongoStore
  // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongoose_connection: mongoose.connection })
  }));
  
  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
    app.set('frontEnd', 'public');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.set('frontEnd', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }


  app.use('/api/media', multer({ 
    dest: config.root + '/' + app.get('frontEnd') + '/assets/images/',
    onFileUploadStart: function(file) {
      var imagePath = file.path;
      var thumbnailPath = file.path.replace('origional', 'thumbnail');
      var smallPath = file.path.replace('origional', 'small');
      var mediumPath = file.path.replace('origional', 'medium');
      var largePath = file.path.replace('origional', 'large');
      
      if(hasGM) {
        try {
          gm(imagePath).autoOrient().setFormat("jpg").resize(992, 744).quality(90).noProfile().write(largePath, function() {
            gm(imagePath).autoOrient().setFormat("jpg").resize(768, 576).quality(80).noProfile().write(mediumPath, function() {
              gm(imagePath).autoOrient().setFormat("jpg").resize(480, 360).quality(70).noProfile().write(smallPath, function() {
                gm(imagePath).autoOrient().setFormat("jpg").thumb(100, 100, thumbnailPath, 60, function() {
                  process.emit("thumbnails created");
                });
              });
            });
          });
        } catch(e) {
          console.log('could not create thumbnails');
          process.emit("thumbnails created");
        }
      }
    },
    rename: function (fieldname, filename) {
      folderName = filename.replace(/\W+/g, '-').toLowerCase() + '_' + Date.now();
      return 'origional';
    },
    changeDest: function(dest, req, res) {
      var destination = dest + folderName + '/';
      if(!fs.existsSync(destination)){
        fs.mkdirSync(destination, "0766", function(err){
          if(err){ 
            console.log(err);
            res.send("ERROR! Can't make the directory! \n");    // echo the result back
          }
        });   
      }

      req.body = {
        url: 'assets/images/' + folderName + '/',
        galleries: req.body.galleries? [req.body.galleries]: []
      };

      return destination; 
    }
  }));
};