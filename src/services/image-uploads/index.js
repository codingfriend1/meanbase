'use strict';

const service = require('feathers-mongoose');
const images = require('../images/images-model');
const hooks = require('./hooks');
const blobService = require('feathers-blob');
const fbs = require('fs-blob-store');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

var gm = require('gm');
var hasGM = false;
var exec = require('child_process').exec;
// exec("gm -help", function (error, stdout, stderr) {
//   if(!error) { hasGM = true; } else {
//     console.log('!!!!! Graphics Magick is not installed, image thumbnails cannot be created !!!!!');
//   }
// });

module.exports = function() {
  const app = this;

  function createThumbnailsError(err, folderName) {
    console.log('could not create thumbnails');
    fse.remove(path.join( app.get('uploadsPath'), folderName ));
    res.status(500).json(err);
  }


  const uploadService = {
    create: function(data, params) {
      return new Promise(function(resolve, reject) {
        if(!params.file.filename.match(/\.(jpg|jpeg|png|gif)$/)) {
          data = {
            url: params.file.destination,
            filename: params.file.filename
          };

          app.service('images').create(data).then(function(error, found) {
            if(error) { return res.send(500, err); }
            if(!found) { return res.send(404); }
            res.status(201).json(found);
          }).catch(function(err) {
            console.log('uploading images error', err);
          });
        }

        data = {
          url: params.file.destination,
          filename: params.file.filename,
          galleries: data.galleries? [data.galleries]: []
        };

        var imagePath = path.join(params.file.destination, params.file.filename);
        var thumbnailPath = imagePath.replace('origional', 'thumbnail');
        var smallPath = imagePath.replace('origional', 'small');
        var mediumPath = imagePath.replace('origional', 'medium');
        var largePath = imagePath.replace('origional', 'large');
        // if(hasGM) {
        if(true) {
          try {
            gm(imagePath).autoOrient().setFormat("jpg").resize(992, 744).quality(90).noProfile().write(largePath, function(err) {
              if(err) { return createThumbnailsError(err, params.file.destination) };
              console.log("'made first'", 'made first');
              gm(imagePath).autoOrient().setFormat("jpg").resize(768, 576).quality(80).noProfile().write(mediumPath, function(err) {
                if(err) { return createThumbnailsError(err, params.file.destination) };
                gm(imagePath).autoOrient().setFormat("jpg").resize(480, 360).quality(70).noProfile().write(smallPath, function(err) {
                  if(err) { return createThumbnailsError(err, params.file.destination) };
                  gm(imagePath).autoOrient().setFormat("jpg").thumb(100, 100, thumbnailPath, 60, function(err) {
                    if(err) { return createThumbnailsError(err, params.file.destination) };
                    app.service('images').create(data).then(function(response) {
                      console.log('response', response);

                    }, function(err) {
                      console.log('promise rejected', err);
                    });
                    app.service('images').create(data).then(function(found) {
                      resolve(found);
                    }).catch(function(err) {
                      console.log("error uploading image", err);
                      reject(err);
                    });
                  });
                });
              });
            });
          } catch(err) {
            createThumbnailsError(err, params.file.destination);
          }
        } else {
          return reject(new Error('Graphics Magick not installed, unable to upload images.'));
        }
      });
      console.log("data", data);
      console.log("params", params);
    }
  };

  const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      let name = 'original';
      let extension = file.originalname.match(/\.[0-9a-z]+$/i);
      if(extension) {
        name += extension;
      }
      cb(null, name);
    },
    destination: function(req, file, cb) {
      req.feathers.file = req.file;
      let folderName = file.originalname.replace(/\W+/g, '-').toLowerCase() + '_' + Date.now();
      var destination = path.join(app.get('uploadsPath'), folderName, '/');
      if(!fs.existsSync(destination)) {
        fs.mkdirSync(destination, "0755", function(err){
          if(err){
            console.log('Error creating destination folder for image: ', err);
            cb("ERROR! Can't make the directory! \n");    // echo the result back
          }
        });
        cb(null, destination);
      }
    }
  });

  const upload = multer({ storage: storage });

  app.use('/image-uploads',
    upload.single('file'),
    function(req,res,next){
      req.feathers.file = req.file;
      next();
    },
    uploadService
  );

  // Get our initialize service to that we can bind hooks
  // const imageUploadsService = app.service('/image-uploads');
  //
  // // Set up our before hooks
  // imageUploadsService.before(hooks.before);
  //
  // // Set up our after hooks
  // imageUploadsService.after(hooks.after);
};
