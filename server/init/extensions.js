var fs = require('fs');
var config = require('../config/environment');
var Extension = require('../api/extension/extension.model');
var ExtensionData = require('../api/extensiondata/extensiondata.model');
var helpers = require('../components/helpers');
var compileIndex = require('../components/index');

module.exports = function(callback) {

	console.log('checking for extensions...');

	var extensionsJSONS = helpers.retrieveExtensions(callback);
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

	// Insert the new links and scripts into the index.html page
	compileIndex(null, GLOBAL.meanbaseGlobals.extensions);

	function handleError(err) {
		if(callback) { callback(err); }
	  return console.log('Initializing extensions error: ', err);
	}
};