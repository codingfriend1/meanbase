var Menus = require('../api/menus/menus.model');

module.exports = function() {
	console.log('creating menus');

	// var home = {
	// 	"title": "Home",
	// 	"url": "/",
	// 	"position": "0"
	// };

	var tutorial = {
		"title": "Tutorial",
		"url": "/tutorial",
		"position": "1"
	};

	var login = {
		"title": "Login",
		"url": "/login",
		"group": "rightHand",
		"position": "2"
	};

	var mainMenus = [tutorial, login];

	// Menus.remove({}, function (err, menus) {
	//   if(err) { return handleError(err); }
	//   if(!menus) { return false; }
	// });

	Menus.find(function (err, menus) {
	  if(err) { return handleError(err); }
	  if(menus.length === 0) {
	  	Menus.create(mainMenus, function(err, menus) {
  		  if(err) { return handleError(err); }
  		  console.log('menus initialized');
  		});
	  }
	});

	function handleError(err) {
	  return console.log('Initializing data error: ', err);
	}
};