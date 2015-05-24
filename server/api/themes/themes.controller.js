'use strict';

var _ = require('lodash');
var Themes = require('./themes.model');
var CRUD = require('../../components/CRUD');
var setGlobalTheme = require('../../components/themes');
var compileIndex = require('../../components/index');
var collection = new CRUD(Themes);
var fs = require('fs');
var config = require('../../config/environment');
var unzip = require('unzip');
var formidable = require('formidable');
var initThemes = require('../../init/themes.js');

// Get list of themes
exports.findAll = function(req, res) {
  collection.findAll(req, res);
};

exports.activate = function(req, res) {
	if(!req.body.id) { return res.send(500); }
	Themes.update({}, {active: false}, {multi: true}, function(err, found) {
	  if (err) { return res.send(500, err); }
	  Themes.update({_id: req.body.id}, {active: true}, function(error, found) {
	  	if (error) { return res.send(500, error); }
	  	if(!found) { return res.send(404); }
	  	compileIndex();
	  	return res.json(found);
	  });
	});
};

// Get some pages
exports.find = function(req, res) {
  collection.find(req, res);
};

// Creates a new pages in the DB.
exports.create = function(req, res) {
  collection.create(req, res);
};

// Extracts a new theme to the database.
exports.upload = function(req, res) {
	try {
		var form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.parse(req, function(err, fields, files) { 
    	var tempFilePath = files.file['path'];
    	var userFileName  = files.file['name'];
    	var contentType   = files.file['type'];
    	// fs.readFile( tempFilePath
    	// fs.createReadStream(tempFilePath)
    	console.log('files', files);
  		var readStream = fs.createReadStream(tempFilePath);
  		readStream.pipe(unzip.Extract({ path: './client/themes/' })).on('close', function (error, event) {
  			initThemes(function(error) {
  				if(error) { return uploadingThemeError(error); }
  				res.status(200).send();
  			});
  		});
	  });
	} catch(e) {
		uploadingThemeError(e);
	}
};


// Updates themes in the database
exports.update = function(req, res) {
  collection.update(req, res, updateFile);
};

// Deletes a themes from the DB.
exports.delete = function(req, res) {
  collection.delete(req, res);
};

// Get a single themes
exports.findById = function(req, res) {
  collection.findById(req, res);
};

// Updates an existing page in the DB.
exports.updateById = function(req, res) {
  collection.updateById(req, res);
};

// Deletes a themes from the DB.
exports.deleteById = function(req, res) {
  collection.deleteById(req, res);
};

function uploadingThemeError(e) {
	console.log('Could not upload theme.', e);
	res.status(500).send();
}

function updateFile(theme) {
	if(theme._id) { delete theme._id; }
	if(theme.__v) { delete theme.__v; }
	if(theme.active) { delete theme.active; }
	var themeJSON = JSON.stringify(theme, null, 2);
	fs.writeFileSync(config.root + '/client/themes/' + theme.url + '/theme.json', themeJSON);
}