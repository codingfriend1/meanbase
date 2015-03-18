module.exports = function() {
	console.log('creating pages...');
	var Pages = require('../api/pages/pages.model');

	var demoHome = {
		author: 'demo',
		visibility: 'Everyone',
		url: '/',
		tabTitle: 'meanbase',
		template: 'home',
		title: 'meanbase',
		content: {'content-1': 'Meanbase is a CMS built on the MEAN stack and made to be simple and intuitive for users and developers.'},
		description: 'A demo home page created automatically in meanbase.',
		summary: 'A demo home page created automatically in meanbase.',
		published: true,
	};

	// In case we need to delete any pages
	// Pages.findById('5508f3e60b00f2edae1bd61c', function (err, page) {
	//   if(err) { return handleError(err); }
	//   if(!page) { return false; }
	//   page.remove(function(err) {
	//     if(err) { return handleError(err); }
	//     console.log('removed page');
	//   });
	// });

	Pages.find(function (err, pages) {
	  if(err) { return handleError(err); }
	  if(pages.length === 0) {
	  	Pages.create(demoHome, function(err, page) {
  		  if(err) { return handleError(err); }
  		  console.log('initialize page: ', page);
  		});
	  }
	});

	function handleError(err) {
	  return console.log('Initializing data error: ', err);
	}
};