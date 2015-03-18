module.exports = function() {
	console.log('Initializing data in mongoDB');
	require('./pages')();
	require('./roles')();
	require('./themes')();
};