var path = require('path');
var config = require('../../config/environment')
var validator = require(path.join(config.root, 'node_modules', 'mongoose-validators', 'node_modules', 'validator', 'validator'));

validator.extend('isTitle', function(str) {
	return /^[A-Za-z0-9@:?&=.\/ _\-]*$/.test(str);
});

validator.extend('isURI', function(str) {
	return /(((http|https|ftp):\/\/([\w-\d]+\.)+[\w-\d]+){0,1}((\/|#)[\w~,;\-\.\/?%&+#=]*))/.test(str);
});

validator.extend('isFilePath', function(str) {
	return /^[0-9A-Za-z\/*_.\\\-]*$/.test(str);
});

validator.extend('isCSSClass', function(str) {
	return /^[A-Za-z0-9_\-*]*$/.test(str);
});

validator.extend('isAnchorTarget', function(str) {
	// return false;
	return /^[_blank|_self|_parent|_top]*$/.test(str);
});

validator.extend('isText', function(str) {
	return true;
});

validator.extend('isHTML', function(str) {
	return true;
});
