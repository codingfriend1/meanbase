/*
	* The "init" folder is for dummy data
	* It's inserted upon server startup if no data already exists
*/

module.exports = function() {
	console.log('Initializing data in mongoDB');
	require('./menus')();
	require('./pages')();
	require('./users')();
	require('./roles')();
	require('./themes')();
};