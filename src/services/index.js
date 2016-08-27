const staging = require('./staging');
const custom = require('./custom');
import themeUploads from './theme-uploads';
import extensionUploads from './extension-uploads'
import wordpressImport from './wordpress-import'

const imageUploads = require('./image-uploads');
const ban = require('./ban');
const extension = require('./extension');
const themes = require('./themes');
const sharedContent = require('./shared-content');
const roles = require('./roles');
const images = require('./images');
const settings = require('./settings');
const extensions = require('./extensions');
const comments = require('./comments');
const menus = require('./menus');
const pages = require('./pages');
const authentication = require('./authentication');
const user = require('./user');
const mongoose = require('mongoose');
module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(imageUploads);
  app.configure(themeUploads);
  app.configure(extensionUploads);
  app.configure(wordpressImport);
  app.configure(user);
  app.configure(pages);
  app.configure(menus);
  app.configure(comments);
  app.configure(extensions);
  app.configure(settings);
  app.configure(images);
  app.configure(roles);
  app.configure(sharedContent);
  app.configure(themes);
  app.configure(extension);
  app.configure(ban);
  app.configure(custom);
  app.configure(staging);
};
