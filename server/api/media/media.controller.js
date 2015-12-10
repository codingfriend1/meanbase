'use strict';

var _ = require('lodash');
var Media = require('./media.model');
var DAO = require('../../components/DAO');
var collection = new DAO(Media);
var fse = require('fs-extra');
var config = require('../../config/environment');
var app = config.app;
var path = require('path');

var gm = require('gm');
var hasGM = false;
var exec = require('child_process').exec;
exec("gm -help", function (error, stdout, stderr) {
  if(!error) { hasGM = true; } else {
    console.log('!!!!! Graphics Magick is not installed, image thumbnails cannot be created !!!!!');
  }
});

var multer  = require('multer');
var fs = require('fs');
var folderName;
var upload = multer({
  dest: path.join(app.get('appPath'), 'assets', 'images', '/'),
  // onFileUploadStart: function(file, req, res) {
  //
  // },
  rename: function (fieldname, filename) {
    folderName = filename.replace(/\W+/g, '-').toLowerCase() + '_' + Date.now();
    return 'origional';
  },
  changeDest: function(dest, req, res) {
    var destination = path.join(dest, folderName, '/');
    if(!fs.existsSync(destination)){
      fs.mkdirSync(destination, "0766", function(err){
        if(err){
          console.log(err);
          res.send("ERROR! Can't make the directory! \n");    // echo the result back
        }
      });
    }

    req.body = {
      url: path.join('assets', 'images', folderName, '/'),
      galleries: req.body.galleries? [req.body.galleries]: []
    };

    return destination;
  }
});

// Get list of pages
exports.findAll = function(req, res) {
  collection.findAll(req, res);
};

// Get some pages
exports.find = function(req, res) {
  collection.find(req, res);
};

// Creates a new pages in the DB.
exports.create = function(req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json(err);
    }
    var imagePath = req.files.file.path;
    var thumbnailPath = req.files.file.path.replace('origional', 'thumbnail');
    var smallPath = req.files.file.path.replace('origional', 'small');
    var mediumPath = req.files.file.path.replace('origional', 'medium');
    var largePath = req.files.file.path.replace('origional', 'large');

    if(hasGM) {
      try {
        gm(imagePath).autoOrient().setFormat("jpg").resize(992, 744).quality(90).noProfile().write(largePath, function() {
          gm(imagePath).autoOrient().setFormat("jpg").resize(768, 576).quality(80).noProfile().write(mediumPath, function() {
            gm(imagePath).autoOrient().setFormat("jpg").resize(480, 360).quality(70).noProfile().write(smallPath, function() {
              gm(imagePath).autoOrient().setFormat("jpg").thumb(100, 100, thumbnailPath, 60, function() {
                Media.create(req.body, function(err, found) {
                  if(err) { return res.send(500, err); }
                  if(!found) { return res.send(404); }
                  res.status(201).json(found);
                });
              });
            });
          });
        });
      } catch(err) {
        console.log('could not create thumbnails');
        res.status(500).json(err);
      }
    } else {
      res.status(500).send('Graphics Magick not installed, unable to upload images.');
    }

    // Everything went fine
  });
};

// Updates pages in the database
exports.update = function(req, res) {
  collection.update(req, res);
};

// Deletes a pages from the DB.
exports.delete = function(req, res) {
  console.log('hi');
  var url = 'ahlsdfjh32k23jh532';
	// Since the identifier comes in from query instead of body we need to parse it
	if(req.query && req.query.where) {
    try {
      req.query.where = JSON.parse(req.query.where);
      if(req.query.where.url) {
        url = req.query.where.url;
      }
    } catch (err) {
      //Keep the url the same
    }

	}

  if(url) {
    try {
      if(url.$in) {
        for(var i = 0; i < url.$in.length; i++) {
          var folderName = url.$in[i] || 'al23gl239';
          fse.remove(path.join(app.get('appPath'), folderName));
        }
      } else {
        fse.remove(path.join(app.get('appPath'), url));
      }
      collection.delete(req, res, function() {});
    } catch(err) {
      console.log("err", err);
    }
  }
};

// Get a single pages
exports.findById = function(req, res) {
  collection.findById(req, res);
};

// Updates an existing page in the DB.
exports.updateById = function(req, res) {
  collection.updateById(req, res);
};

// Deletes a pages from the DB.
exports.deleteById = function(req, res) {
  console.log('by id');
  collection.deleteById(req, res);
};

// Handles the response to database errors
function handleError(res, err) {
  return res.send(500, err);
}
