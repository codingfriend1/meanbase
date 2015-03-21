module.exports = function() {
	console.log('creating pages...');
	var Pages = require('../api/pages/pages.model');

	var demoHome = {
		"author": "demo",
		"visibility": "Everyone",
		"url": "/",
		"tabTitle": "meanbase",
		"template": "home",
		"title": "meanbase",
		"content": {"content-1": "Meanbase is a CMS built on the MEAN stack and made to be simple and intuitive for users and developers."},
		"description": "A demo home page created automatically in meanbase.",
		"summary": "A demo home page created automatically in meanbase.",
		"published": true
	};

	var tutorial = {
		"author": "demo",
		"visibility": "Everyone",
		"url": "/tutorial",
		"tabTitle": "meanbase - tutorial",
		"template": "page",
		"title": "Tutorial",
		"content": {"content-1": "Create your themes in client/themes/ folder. Use generator-angular-fullstack to understand project structure. "},
		"description": "A tutorial to get you running with meanbase.",
		"summary": "A tutorial to get you running with meanbase.",
		"published": true
	};

	// In case we need to delete any pages
	Pages.remove({}, function (err, page) {
	  if(err) { return handleError(err); }
	  if(!page) { return false; }
	});

	Pages.find(function (err, pages) {
	  if(err) { return handleError(err); }
	  if(pages.length === 0) {
	  	Pages.create([demoHome, tutorial], function(err, page) {
  		  if(err) { return handleError(err); }
  		  console.log('Pages initialized');
  		});
	  }
	});

	function handleError(err) {
	  return console.log('Initializing data error: ', err);
	}
};