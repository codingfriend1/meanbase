var Themes = require('../../api/themes/themes.model');

// Get All items
module.exports = function getActiveTheme(callback) {
	Themes.find({active: true}, function (err, found) {
	  if(err || !found) { return false; }
	  GLOBAL.meanbaseGlobals.theme = found;
	  if(callback) callback(found);
	  return found;
	});
};