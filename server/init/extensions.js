var fs = require('fs');
var config = require('../config/environment');

module.exports = function() {
	console.log('checking for extensions...');
	var Extension = require('../api/extension/extension.model');
	var extensionsFolderUrl = 'client/extensions/';

	// Loop through themes in extensionsFolderUrl and get the extension.json file out of the root of each one
	var extensionsFolder = fs.readdirSync(extensionsFolderUrl);
	var extensionsJSONS = [];
	for(var ii = 0; ii < extensionsFolder.length; ii++) {
		if(extensionsFolder[ii][0] !== '.') {
			var stat = fs.statSync(extensionsFolderUrl + extensionsFolder[ii]);
			if(stat.isDirectory()) {
				try {
					var extensionJSON = JSON.parse(fs.readFileSync(extensionsFolderUrl + extensionsFolder[ii] + '/extension.json', 'utf8'));
					extensionJSON.html = fs.readFileSync(extensionsFolderUrl + extensionsFolder[ii] + '/index.html', 'utf8');
					extensionsJSONS.push(extensionJSON);
				} catch(error) {
					console.log('Could not parse extension.json in root of extension', error);
				}
			}
		}
	} //for



	// Gets the scripts and styles from the extension and insert them into the client/index.html
	function compileIndex(extensionJSONS) {
		// Get file paths for the server/views/index and the chosen theme's scripts and styles templates
		var clientIndexPath = config.root + '/client/index.html';

		// Try to read the file contents
		try {
			var clientIndex = fs.readFileSync(clientIndexPath, 'utf8');
		} catch(error) {
			console.log('Error compiling the index.html with the chosen theme: ', error);
			return false;
		}

		for (var i = 0; i < extensionJSONS.length; i++) {
			for (var x = 0; x < extensionJSONS[i].urls.length; x++) {
				var cssPattern = new RegExp("\.(css)$");
				var jsPattern = new RegExp("\.(js)$");

				if(cssPattern.test(extensionJSONS[i].urls[x])) {
					console.log('linking css');
					clientIndex = clientIndex.replace('<!-- extensions:css -->', '<link rel="stylesheet" href="' + extensionJSONS[i].urls[x] + '">' + '\n <!-- extensions:css -->');
				} else if(jsPattern.test(extensionJSONS[i].urls[x])) {
					console.log('linking js');
					clientIndex = clientIndex.replace('<!-- extensions:js -->', '<script src="' + extensionJSONS[i].urls[x] + '"></script>' + '\n <!-- extensions:js -->');
				}
			};
		};
		try {
			// Write the results back to client/index.html
			fs.writeFileSync(clientIndexPath, clientIndex, 'utf8');
			console.log(fs.readFileSync(clientIndexPath, 'utf8'));
		} catch(error) {
			console.log('error: ', error);
		}
	}



	compileIndex(extensionsJSONS);





	// Remove all found themes
	// Extension.remove(function(err) {
 // 		if(err) { return handleError(err); }
	// });

	
	if(extensionsJSONS.length > 0) {
		// Find all extensions in database
		Extension.find(function (err, extensions) {
		  if(err) { return handleError(err); }
		  if(extensions.length > 0) { return false; }

		  // If no extensions exist create them
	  	Extension.create(extensionsJSONS, function(err, extensions) {
			  if(err) { return handleError(err); }
			  console.log('Extensions initialized');
			});
		});
	}
	

	function handleError(err) {
	  return console.log('Initializing extensions error: ', err);
	}
};