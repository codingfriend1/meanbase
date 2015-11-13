'use strict';

var _ = require('lodash');

// var DevelopmentMode = require('./development-mode.model');
// var DAO = require('../../components/DAO');
// var collection = new DAO(DevelopmentMode);
// var fse = require('fs-extra');
var fs = require('fs');
var chokidar = require('chokidar');
var compileIndex = require('../../components/index/index.js');
var config = require('../../config/environment');
var Themes = require('../themes/themes.model');
var app = config.app;
config.inThemeDevelopmentMode = false;

// Get some pages
exports.find = function(req, res) {
  res.status(200).send(config.inThemeDevelopmentMode);
};

// Creates a new pages in the DB.
exports.upsert = function(req, res) {
    Themes.find({active: true}).lean().exec(function(err, theme) {
      if(err) { return res.status(500).send('There was an error finding the active theme to watch.' + err); }
      if(!theme || !theme[0]) { return res.status(500).send('Could not find the active theme to watch.' + err); }
      theme = theme[0];

      if(req.body && req.body.theme === true) {
        if(theme.scriptsPath) {
          try {
            config.scriptsWatcher = chokidar.watch(app.get('appPath') + theme.scriptsPath, {
              ignored: /[\/\\]\./,
              persistent: true
            });

            config.scriptsWatcher.on('change', function(path, stats) {
              console.log('Detected change in scripts.html');
              compileIndex();
            });
          } catch(e) {
            console.log('Could not watch the scripts html file.', e);
            return res.status(500).send('Could not watch the scripts html file.', e);
          }
          
        }

        if(theme.stylesPath) {
          try {

            config.stylesWatcher = chokidar.watch(app.get('appPath') + theme.stylesPath, {
              ignored: /[\/\\]\./,
              persistent: true
            });

            config.stylesWatcher.on('change', function(path, stats) {
              console.log('Detected change in styles.html');
              compileIndex();
            });
          } catch(e) {
            console.log('Could not watch the styles html file.', e);
            return res.status(500).send('Could not watch the styles html file.', e);
          }
        }
        config.inThemeDevelopmentMode = true;
        compileIndex();
        res.status(200).send(config.inThemeDevelopmentMode);
      } else {
        config.scriptsWatcher.close();
        config.stylesWatcher.close();
        config.inThemeDevelopmentMode = false;
        res.status(200).send(config.inThemeDevelopmentMode);
      }
    });
};