'use strict';

const hooks = require('./hooks');
import path from 'path'
import zip from 'express-zip'
import fsExtra from 'fs-extra'
const childProcess = require('child_process')
import fs from 'fs'
const exec = require('child_process').exec
const spawn = require('child_process').spawn
const tar = require('tar')
const zlib = require('zlib')
const fstream = require('fstream')

import unzip from './hooks/unzip'

const collections = [
  "extensions",
  "themes",
  "ban",
  "comments",
  "custom",
  "images",
  "menus",
  "pages",
  "roles",
  "settings",
  "staging",
  // "users"
]

class Service {
  constructor(options) {
    this.options = options || {};
  }

  _find(collection) {
    return new Promise((resolve, reject) => {
      const child = exec(`mongoexport --db meanbase-dev --collection ${collection} --out ${path.join(this.app.get('dataExportPath'), collection + '.json')} --jsonArray`)

      // child.stdout.on('data', function(data) {
        // console.log("stdout: " + data);
      // })

      // child.stderr.on('data', function(data) {
      //   console.log("stderr", data);
      //   return reject('Export failed')
      // })

      child.on('close', function(code) {
        console.log(`Export of ${collection} was successful`);
        return resolve(`Export of ${collection} was successful`)
      })
    })

  }

  setup(app) {
    this.app = app
  }

  find(params) {
    const self = this
    return new Promise( async (resolve, reject) => {

      try {
        fsExtra.copySync(this.app.get('extensionsPath'), this.app.get('extensionsExportPath'))
        console.log("Copied extensions to exports folder")
      } catch (err) {
        console.error("Error copying extensions to exports folder.", err)
      }

      try {
        fsExtra.copySync(this.app.get('themesPath'), this.app.get('themesExportPath'))
        console.log("Copied themes to exports folder")
      } catch (err) {
        console.error("Error copying themes to exports folder.", err)
      }

      try {
        fsExtra.copySync(this.app.get('uploadsPath'), this.app.get('imagesExportPath'))
        console.log("Copied images to exports folder")
      } catch (err) {
        console.error("Error copying images to exports folder.", err)
      }

      let forZip = []
      for (var i = 0; i < collections.length; i++) {
        try {
          let response = await this._find(collections[i])
          let url = path.join(self.app.get('dataExportPath'), collections[i] + '.json')
          forZip.push({path: url, name: collections[i] + '.json'})
        } catch(err) {
          console.log("Error exporting data", err);
          return reject(err)
        }

        if(i === collections.length - 1) {
          console.log("self.app.get('exportPath')", self.app.get('exportPath'));
          const folderWeWantToZip = self.app.get('exportPath');

          params.res.writeHead(200, {
            'Content-Type'        : 'application/octet-stream',
            'Content-Disposition' : 'attachment; filename=site_data.zip',
            'Content-Encoding'    : 'gzip'
          });

          /* Read the source directory */
          fstream.Reader({ 'path' : folderWeWantToZip, 'type' : 'Directory' })
              .pipe(tar.Pack())/* Convert the directory to a .tar file */
              .pipe(zlib.Gzip())/* Compress the .tar file */
              .pipe(params.res); // Write back to the response, or wherever else...
        }
      }
    })
  }

  get(id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  create(data, params) {
    if(Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current)));
    }

    return Promise.resolve(data);
  }

  update(id, data, params) {
    return Promise.resolve(data);
  }

  patch(id, data, params) {
    return Promise.resolve(data);
  }

  remove(id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function(){
  const app = this;

  function getRes(req, res, next) {

    req.feathers.zip = res.zip;
    req.feathers.zip = req.feathers.zip.bind(res)
    req.feathers.res = res;
    next();
  }


  // Initialize our service with any options it requires

  app.use('/import-export', unzip, getRes)

  app.use('/import-export', new Service());
  // app.use('/import-export', getRes, new Service());

  // Get our initialize service to that we can bind hooks
  const importExportService = app.service('/import-export');

  // Set up our before hooks
  importExportService.before(hooks.before);

  // Set up our after hooks
  importExportService.after(hooks.after);
};

module.exports.Service = Service;
