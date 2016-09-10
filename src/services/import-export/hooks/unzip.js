import path from 'path'
// const zip = require('decompress-unzip');
const formidable = require('formidable');
import feathersErrors from 'feathers-errors'
import fs from 'fs';
import fsExtra from 'fs-extra'
// const Decompress = require('decompress');
// const decompressUnzip = require('decompress-unzip')
const decompress = require('decompress')

export default function(req, res, next) {

  if(req.method !== "POST") { return next() }
  const app = this;

  if(!req.app || !req.app.get('exportPath')) {
    next(new Error('exportPath not found on server'));
  }

  var createdFolderName = '125098dsflkj1324';

  var createdFolderPath = path.join(req.app.get('exportPath'));
  try {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
      if(err) {
        console.log("Error parsing zip: ", err);
        return next(new feathersErrors.NotAcceptable('The zip folder must be compressed in the correct format.'));
      }
      if(!files || !files.file) {
        return next(new feathersErrors.NotAcceptable('The zip folder must be compressed.'));
      }

      var tempFilePath = files.file.path;
      var fileName  = files.file.name;
      var contentType   = files.file.type;


      // var compressType;
      // // var decompress = new Decompress();
      // switch(contentType) {
      //   case 'application/x-gzip':
      //     compressType = Decompress.targz;
      //     break;
      //   case 'application/zip':
      //     compressType = Decompress.zip;
      //     break;
      //   case 'application/x-tar':
      //     compressType = Decompress.tar;
      //     break;
      //   case 'application/x-bzip2':
      //     compressType = Decompress.tar;
      //     break;
      //   default:
      //     compressType = null;
      // }

      // if(!compressType) {
      //   return next(new feathersErrors.NotAcceptable('Please send a zip, gz, bz2, or tar file type.'));
      // }

      decompress(tempFilePath, req.app.get('exportPath')).then(files => {
        let currentPath = path.join(req.app.get('exportPath'), 'export')


        try {
          fsExtra.copySync(path.join(currentPath, 'images'), req.app.get('uploadsPath'))
          fsExtra.copySync(path.join(currentPath, 'themes'), req.app.get('themesPath'))
          fsExtra.copySync(path.join(currentPath, 'extensions'), req.app.get('extensionsPath'))
          console.log("success!")
        } catch (err) {
          console.error(err)
        }
        next()
      })

      // try {
      //   // Query the entry
      //   var stats = fs.lstatSync(createdFolderPath);
      //   // Is it a directory?
      //   if (stats.isDirectory()) {
      //     return next(new feathersErrors.NotAcceptable('A folder with that name has already been uploaded. Please choose a different folder name for your upload.'));
      //   }
      // } catch (err) {
      //   console.log("Checking if folder already exists error", err);
      // }

      // decompress(tempFilePath, 'dist', {
      //   plugins: [
      //     decompressUnzip()
      //   ]
      // }).then((err, files) => {
      //   console.log("err", err);
      //   console.log("files", files);
      //   console.log('Files decompressed');
      // });

      // decompress.src(tempFilePath)
      //   .dest(createdFolderPath)
      //   .use(compressType({strip: 1}));
      //
      // decompress.run(function (err, files) {
      //   console.log("err", err);
      //   console.log("files", files);
      //   if (err) {
      //     console.log("unzipping folder error: ", err);
      //     return next(new feathersErrors.Unprocessable(err));
      //   }
      //   return next();
      // });
      // try {
      //   fsExtra.copySync('/tmp/myfile', '/tmp/mynewfile')
      //   console.log("success!")
      // } catch (err) {
      //   console.error(err)
      // }
    });
  } catch(err) {
    return next(err);
  }
}
