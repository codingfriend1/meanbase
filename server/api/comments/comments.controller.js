'use strict';

var _ = require('lodash');
var Comments = require('./comments.model');
var Ban = require('./ban.model');
var Settings = require('../settings/settings.model');
var DAO = require('../../components/DAO');
var collection = new DAO(Comments);
var banCollection = new DAO(Ban);
var helpers = require('../../components/helpers');
var requestify = require('requestify');

var onlyApproved = false;
var creatingComment = false;
var autoApprove = false;
var disableComments = false;

collection.modifyBody = function(body) {
  if(body && body.url && body.url.charAt(0) !== '/') {
    body.url = '/' + body.url;
  }
  if(body && creatingComment) {
    if(body.approved) { body.approved = false; }
  }

  return body;
};

collection.modifyIdentifier = function(identifier) {
  if(identifier && identifier.url && identifier.url.charAt(0) !== '/') {
    identifier.url = '/' + identifier.url;
  }
  if(identifier && onlyApproved) {
    identifier.approved = true;
  }
  return identifier;
};

// Get list of pages
exports.findAll = function(req, res) {
  collection.findAll(req, res);
};

// Get some pages
exports.find = function(req, res) {
  collection.find(req, res, restructureResponse);
};

exports.findApproved = function(req, res) {
  onlyApproved = true;
  collection.find(req, res, restructureResponse);
  onlyApproved = false;
};

exports.search = function(req, res) {
  onlyApproved = true;
  collection.search(req, res, restructureResponse);
  onlyApproved = false;
};

exports.ban = function(req, res) {
  banCollection.create(req, res);
};

exports.unban = function(req, res) {
  banCollection.delete(req, res);
};

exports.isBanned = function(req, res) {
  banCollection.find(req, res);
};

// Creates a new pages in the DB.
exports.create = function(req, res) {
  Settings.findOne({name: 'disable-comments'}, function(err, found) {
    if(err || !found) { disableComments = false; }
    else { disableComments = found.value === 'true'; }

    if(!disableComments) {
      // For security purposes we want to modify the comment in modifyBody
      // to not have approved already set to true
      creatingComment = true;
      var find;
      if(req.body.email) {
        find = {$or: [ {ip: req.ip}, {email: req.body.email} ]};
      } else {
        find = {ip: req.ip};
      }
      banCollection.findRaw(find, function(allFound) {
        if(helpers.isEmpty(allFound)) {
          if(req.body && req.body.url) {
            req.body.ip = req.ip;
          }

          Settings.findOne({name: 'recaptchaKey'}, function(error, hasKey) {
            if(error || !hasKey) { hasKey = ''; }
            requestify.post('https://www.google.com/recaptcha/api/siteverify', {
              'g-recaptcha-response': req.body['g-recaptcha-response'],
              'remoteip': req.body.ip,
              'secret': hasKey.value
            })
            .then(function(response) {
                var recaptchaSuccess = response.getBody();
                console.log("recaptchaSuccess", recaptchaSuccess);
                Settings.findOne({name: 'auto-accept-comments'}, function(err, found) {
                  if(err || !found) { autoApprove = false; }
                  else { autoApprove = found.value === 'true'; }

                  if(req.body) {
                    req.body.approved = autoApprove;
                  }

                  collection.create(req, res);
                  creatingComment = false;
                });
            }, function(err) {
              console.log("Google Recaptcha Error", err);
              res.status(403).send('Sorry but this comment looks like spam.');
            });

          });
          creatingComment = false;
        } else {
          res.status(403).send('Sorry, but you cannot make comments on this site.');
        }
      });
    } else {
      res.send(204);
    }
  });
};

// Updates pages in the database
exports.update = function(req, res) {
  collection.update(req, res);
};

// Deletes a pages from the DB.
exports.delete = function(req, res) {
  collection.delete(req, res);
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
  collection.deleteById(req, res);
};

function restructureResponse(response) {
  if(!response) { return response; }
  if(!Array.isArray(response)) { response = [response]; }

  for (var i = 0; i < response.length; i++) {
    if(response[i]) {
      if(response[i].date) {
        response[i].date = response[i].date + '';
        // response[i].date = response[i].date.replace(/T/, ' ').replace(/\..+/, '');
      }
    }
  }
  return response;
}
