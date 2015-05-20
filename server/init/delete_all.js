var Comments = require('../api/comments/comments.model');
var ExtensionData = require('../api/extensiondata/extensiondata.model');
var Menus = require('../api/menus/menus.model');
var Pages = require('../api/pages/pages.model');
var Roles = require('../api/roles/roles.model');
var Themes = require('../api/themes/themes.model');
var User = require('../api/user/user.model');

module.exports = function(cb) {
	Comments.remove({}, function (err, comments) {
	  if(err) { return handleError(err); }
	  if(!comments) { return false; }
	  console.log('deleted comments');
	});

	ExtensionData.remove({}, function (err, data) {
	  if(err) { return handleError(err); }
	  if(!data) { return false; }
	  console.log('deleted extension data');
	});

	Menus.remove({}, function (err, menus) {
	  if(err) { return handleError(err); }
	  if(!menus) { return false; }
	  console.log('deleted menus');
	});

	Pages.remove({}, function (err, page) {
	  if(err) { return handleError(err); }
	  if(!page) { return false; }
	  console.log('deleted pages');

	  if(cb) {
	  	cb();
	  }
	});

	Roles.remove({}, function(err, roles) {
	  if(err) { return handleError(err); }
	  console.log('deleted roles');
	});

	Themes.remove(function(err) {
		if(err) { return handleError(err); }
		console.log('deleted themes');
	});

	User.remove({}, function (err, users) {
	  if(err) { return handleError(err); }
	  if(!users) { return false; }
	  console.log('deleted users');
	});
};