'use strict';

import ImageUploadService from './image-uploads.service';
const hooks = require('./hooks');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

module.exports = function() {
  const app = this;

  if (!fs.existsSync(path.join(app.get('public'), 'assets'))) {
    fs.mkdirSync(path.join(app.get('public'), 'assets'));
  }

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
    new ImageUploadService()
  );

  // Get our initialize service to that we can bind hooks
  const imageUploadsService = app.service('/image-uploads');
  //
  // // Set up our before hooks
  imageUploadsService.before(hooks.before);
  //
  // // Set up our after hooks
  imageUploadsService.after(hooks.after);
};
