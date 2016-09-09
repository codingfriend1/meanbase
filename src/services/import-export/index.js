'use strict';

const hooks = require('./hooks');
import path from 'path'
const exec = require('child_process').exec

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
  "user"
]

class Service {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app
  }

  find(params) {
    for (var i = 0; i < collections.length; i++) {
      const child = exec(`mongoexport --db meanbase-dev --collection ${collections[i]} --out ${path.join(this.app.get('exportPath'), collections[i] + '.json')} --jsonArray`)

      child.stdout.on('data', function(data) {
        console.log("stdout: " + data);
      })

      child.stderr.on('data', function(data) {
        console.log("stdout: " + data);
      })

      child.on('close', function(code) {
        console.log('closing code: ' + code);
      })
    }


    return Promise.resolve([]);
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

  // Initialize our service with any options it requires
  app.use('/import-export', new Service());

  // Get our initialize service to that we can bind hooks
  const importExportService = app.service('/import-export');

  // Set up our before hooks
  importExportService.before(hooks.before);

  // Set up our after hooks
  importExportService.after(hooks.after);
};

module.exports.Service = Service;
