/*
	* The "init" folder is for dummy data
	* It's inserted upon server startup if no data already exists
*/

var config = require('../config/environment');

module.exports = function() {
	console.log('Initializing data in mongoDB');
	// require('./delete_all')(initializeAllData());
	initializeAllData();
  if(config.resetData) {
    resetData();
  }
};

function resetData() {
  setTimeout(function() {
    require('./delete_all')(initializeAllData());
    resetMostData();
  }, (1000*60)*30);
}

function initializeAllData() {
	require('./menus')();
	require('./pages')();
	require('./comments')();
	require('./users')();
	require('./roles')();
	require('./themes')();
	require('./extensions')();
}

function resetMostData() {
	require('./menus')();
	require('./pages')();
	require('./comments')();
	require('./extensions')();
}
