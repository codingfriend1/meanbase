'use strict';

const service = require('feathers-mongoose');
const images = require('../images/images-model');
const hooks = require('./hooks');
const blobService = require('feathers-blob');
const fs = require('fs-blob-store');
const multer = require('multer');
const path = require('path');

let folderName;

const multipartMiddleware = multer({
  rename: function (fieldname, filename) {
    folderName = filename.replace(/\W+/g, '-').toLowerCase() + '_' + Date.now();
    return 'origional';
  },
  changeDest: function(dest, req, res) {
    console.log("changeDest");
    var destination = path.join(app.get('uploadsPath'), folderName, '/');
    if(!fs.existsSync(destination)){
      fs.mkdirSync(destination, "0755", function(err){
        if(err){
          console.log(err);
          res.send("ERROR! Can't make the directory! \n");    // echo the result back
        }
      });
    }
    return destination;
  }
});

module.exports = function() {
  const app = this;

  const blobStorage = fs(app.get('uploadsPath'));

  app.use('/image-uploads',
    // multer parses the file named 'uri'.
    // Without extra params the data is
    // temporarely kept in memory
    multipartMiddleware.single('file'),

    // another middleware, this time to
    // transfer the received file to feathers
    function(req,res,next){
      req.feathers.file = req.file;
      console.log("req.feathers.file", req.feathers.file);
      next();
    },
    blobService({Model: blobStorage})
  );

  // Get our initialize service to that we can bind hooks
  const imageUploadsService = app.service('/image-uploads');

  // Set up our before hooks
  imageUploadsService.before(hooks.before);

  // Set up our after hooks
  imageUploadsService.after(hooks.after);
};
