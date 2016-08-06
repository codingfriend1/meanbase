/*
	* The "init" folder is for dummy data
	* It's inserted upon server startup if no data already exists
*/

var config = require('../config/environment');




var rolesModel = require('../api/roles/roles.model');
var rolesData = require('./roles');

var userData = require('./users');
var userModel = require('../api/user/user.model');

var pagesModel = require('../api/pages/pages.model');
var pagesData = require('./pages');

var menusModel = require('../api/menus/menus.model');
var menusData = require('./menus');

var extensionModel = require('../api/extension/extension.model');

var themeModel = require('../api/themes/themes.model');

var commentsModel = require('../api/comments/comments.model');
var commentsData = require('./comments');


module.exports = function() {
  console.log('Initializing data in mongoDB');

  ifEmptyCreate(rolesModel, rolesData);
  ifEmptyCreate(userModel, userData);

  if(config.resetData) {
    if(config.seedDB) {
      resetData(pagesModel, pagesData);
      resetData(menusModel, menusData);
      resetData(commentsModel, commentsData);
    }
  }

  require('./themes')();
  require('./extensions')();

  if(config.seedDB) {
    ifEmptyCreate(pagesModel, pagesData);
    ifEmptyCreate(menusModel, menusData);
  }
};

// ### ifEmptyCreate(model, data)
/**
 * If the model is empty then populate it's data
 * @param {object} model Mongoose Model
 * @param {object|object[]} data Object data or Array of Object data to insert
 * @return {function} Returns a method to be called by configure
 */
function ifEmptyCreate(model, data) {
  model.find({}, function (err, result) {
    console.log("if empty result", result);

    if(err) { return console.log('Testing ' + model.modelName + ' error: ', err); }

    if(result.length === 0) {

    	model.create(data, function(err, afterCreation) {
  		  if(err) { return console.log('Initializing ' + model.modelName + ' error: ', err); }
  		  console.log('default ' + model.modelName + ' created');
  		});

    }
  });
}

// ### resetData(model, data)
/**
 * Erases all data in the model and calls ifEmptyCreate
 * @param {object} model Mongoose model
 * @param {object|object[]} data Data to insert
 */
function resetData(model, data) {
  model.remove({}, function( error, reply) {
    ifEmptyCreate(model, data)();
  });
}

function removeData(model) {
  model.remove({});
}
