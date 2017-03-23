const gm = require('gm');
const path = require('path');
const fse = require('fs-extra');
const hasGM = true;
// const exec = require('child_process').exec;
// exec("gm -help", function (error, stdout, stderr) {
//   console.log("stdout", stdout);
//   if(!error) { hasGM = true; } else {
//     console.log('!!!!! Graphics Magick is not installed, image thumbnails cannot be created !!!!!');
//   }
// });

export default options => {
  return hook => {

    return new Promise((resolve, reject) => {

      function throwError(err, folderName) {
        console.log('could not create thumbnails');
        fse.remove(hook.params.file.destination);
        reject(err);
      }

      const imagePath = path.join(hook.params.file.destination, hook.params.file.filename);
      const imagePathJPG = path.join(hook.params.file.destination, hook.params.file.filename).replace(/\.[^/.]+$/, ".jpg");
      const originalJPG = imagePathJPG;
      const thumbnailPath = imagePathJPG.replace('original', 'thumbnail');
      const smallPath = imagePathJPG.replace('original', 'small');
      const mediumPath = imagePathJPG.replace('original', 'medium');
      const largePath = imagePathJPG.replace('original', 'large');
      if(hasGM) {
        try {
          gm(imagePath).autoOrient().setFormat("jpg").quality(90).noProfile().write(originalJPG, function(err) {
            if(err) { return throwError(err) };
            gm(imagePath).autoOrient().setFormat("jpg").resize(992, 744).quality(90).noProfile().write(largePath, function(err) {
              if(err) { return throwError(err) };
              gm(imagePath).autoOrient().setFormat("jpg").resize(768, 576).quality(80).noProfile().write(mediumPath, function(err) {
                if(err) { return throwError(err) };
                gm(imagePath).autoOrient().setFormat("jpg").resize(480, 360).quality(70).noProfile().write(smallPath, function(err) {
                  if(err) { return throwError(err) };
                  gm(imagePath).autoOrient().setFormat("jpg").thumb(100, 100, thumbnailPath, 60, function(err) {
                    if(err) { return throwError(err) };
                    resolve(hook);
                  });
                });
              });
            });
          });
        } catch(err) {
          throwError(err);
          reject(err);
        }
      } else {
        return reject(new Error('Graphics Magick not installed, unable to upload images.'));
      }
    });
  }
}
