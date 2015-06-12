var fs = require('fs');
var config = require('../config/environment');
var Extension = require('../api/extension/extension.model');
var searchFolders = require('../components/search-folders');
var compileIndex = require('../components/index');

module.exports = function(callback) {

	console.log('checking for extensions...');

	var extensionsJSONS = searchFolders.retrieveExtensions(callback);
	// We are putting this on the global so that when the client/index.html is compiled it will include the extension links
	GLOBAL.meanbaseGlobals.extensions = extensionsJSONS;

	if(extensionsJSONS.length > 0) {
		Extension.remove(function(err) {
	 		if(err) { return handleError(err); }
	  	Extension.create(extensionsJSONS, function(err, extensions) {
			  if(err) { return handleError(err); }
			  console.log('Extensions initialized');
			  if(callback) { return callback(null); }
			});
		});
	}

	function handleError(err) {
		if(callback) { callback(err); }
	  return console.log('Initializing extensions error: ', err);
	}
};