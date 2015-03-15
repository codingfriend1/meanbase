/**
 * Main index file for app
 */

'use strict';

var config = require('../../config/environment');
var cheerio = require('cheerio');
var fs = require('fs');

// Get's the scripts and styles from the chosen theme and inserts them into the index.html
// PARAMS theme: 'String'
function compileIndex(theme) {
	// Get file paths
	var viewFilePath = config.root + '/server/views/index.html',
		themeJSPath = config.root + '/client/themes/' + theme + '/scripts.html',
		themeCSSPath = config.root + '/client/themes/' + theme + '/styles.html';

	// Get file contents
	var themeJS = fs.readFileSync(themeJSPath,'utf8'),
		themeCSS = fs.readFileSync(themeCSSPath,'utf8'),
		index = fs.readFileSync(viewFilePath,'utf8'),
		$ = cheerio.load(index);

	// Insert the theme's styles and scripts into the index.html
	$('head').append(themeCSS);
	$('body').append(themeJS);

	console.log('index', $.html());
	try {
		fs.writeFileSync(config.root + '/client/index.html', $.html(), 'utf8');
	} catch(error) {
		console.log('error: ', error);
	}
}

compileIndex('meanbase-secondary');