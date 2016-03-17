/*
	* The "init" folder is for dummy data
	* It's inserted upon server startup if no data already exists
*/

module.exports = function() {
	console.log('Initializing data in mongoDB');
	// require('./delete_all')(initializeAllData());
	initializeAllData();
  resetData();
};

function resetData() {
  setTimeout(function() {
    require('./delete_all')(initializeAllData());
    resetData();
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
