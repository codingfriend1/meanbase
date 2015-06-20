'use strict';

var _ = require('lodash');

// var DevelopmentMode = require('./development-mode.model');
// var DAO = require('../../components/DAO');
// var collection = new DAO(DevelopmentMode);
// var fse = require('fs-extra');
var inThemeDevelopmentMode = false;
var fs = require('fs');
var compileIndex = require('../../components/index/index.js');
var config = require('../../config/environment');
var Themes = require('../themes/themes.model');
var app = config.app;

// Get some pages
exports.find = function(req, res) {
  res.status(200).send(inThemeDevelopmentMode);
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
            fs.watchFile(app.get('appPath') + theme.scriptsPath, function (curr, prev) {
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
            fs.watchFile(app.get('appPath') + theme.stylesPath, function (curr, prev) {
              console.log('Detected change in styles.html');
              compileIndex();
            });
          } catch(e) {
            console.log('Could not watch the styles html file.', e);
            return res.status(500).send('Could not watch the styles html file.', e);
          }
        }
        inThemeDevelopmentMode = true;
        compileIndex();
        res.status(200).send(inThemeDevelopmentMode);
      } else {
        if(theme.scriptsPath) {
          try {
            fs.unwatchFile(app.get('appPath') + theme.scriptsPath);
          } catch(e) {
            console.log('Could not unwatch the scripts.html file', e);
            return res.status(500).send('Could not unwatch the scripts.html file', e);
          }
        }

        if(theme.stylesPath) {
          try {
            fs.unwatchFile(app.get('appPath') + theme.stylesPath);
          } catch(e) {
            console.log('Could not unwatch the styles.html file', e);
            return res.status(500).send('Could not unwatch the styles.html file', e);
          }
        }
        inThemeDevelopmentMode = false;
        res.status(200).send(inThemeDevelopmentMode);
      }
    });
};