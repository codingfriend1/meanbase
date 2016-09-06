const email = require('./email');
const staging = require('./staging');
const custom = require('./custom');
import themeUploads from './theme-uploads';
import extensionUploads from './extension-uploads'
import wordpressImport from './wordpress-import'

const verifyReset = require('feathers-service-verify-reset').service
const imageUploads = require('./image-uploads');
const ban = require('./ban');
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
  app.configure(ban);
  app.configure(custom);
  app.configure(staging);

  if(process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    app.configure(verifyReset({ emailer }));
    app.configure(email);
  }


  function emailer(action, user, params, cb) {
    console.log(`-- Sending email for ${action}`);
    const provider = params.provider;
    const route = provider === 'rest' ? 'rest' : 'socket';

    switch (action) {
      case 'resend': // send another email with link for verifying user's email addr
        let link
        if(app.get('port')) {
          link = `http://${app.get('host')}:${app.get('port')}/cms/account/verify/${user.verifyToken}`
        } else {
          link = `http://${app.get('host')}/cms/account/verify/${user.verifyToken}`
        }

        let email = {
           from: process.env.EMAIL,
           to: user.email,
           subject: 'Meanbase - Account Resend Verification Token',
           html: `Dear ${user.name}, please click this link to verify your account. ${link}`
        }

        app.service('emails').create(email).then(function (result) {
          console.log('Sent email', result);
          cb(null)
        }).catch(err => {
          cb(null)
          console.log('Error sending email', err);
        });

        break;
      case 'verify': // inform that user's email is now confirmed
        cb(null);
        break;
      case 'forgot': // send email with link for resetting forgotten password
        if(process.env.EMAIL) {

          let link
          if(app.get('port')) {
            link = `http://${app.get('host')}:${app.get('port')}/cms/account/reset/${user.resetToken}`
          } else {
            link = `http://${app.get('host')}/cms/account/reset/${user.resetToken}`
          }

          let email = {
             from: process.env.EMAIL,
             to: user.email,
             subject: 'Meanbase - Account Reset Password',
             html: `Dear ${user.name}, you received this email because you requested to reset your password. Click this link to reset. ${link}`
          }

          app.service('emails').create(email).then(function (result) {
            console.log('Sent email', result);
            cb(null)
          }).catch(err => {
            cb(null)
            console.log('Error sending email', err);
          });
        }
        console.log(`Dear ${user.name}, please click this link to reset your password.`);
        console.log(`  http://localhost:3030/${route}/reset/${user.resetToken}`);
        break;
      case 'reset': // inform that forgotten password has now been reset
        cb(null);
        break;
      default:
        cb(null);
        break;
    }

  }

};
