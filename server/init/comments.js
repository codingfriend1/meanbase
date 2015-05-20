var Comments = require('../api/comments/comments.model');

module.exports = function() {

	var firstComment = {
	  "author": "Admin",
	  "url": "/why-cms",
	  "content": "Comments can be added to articles.",
	  "email": "admin@admin.com",
	  "ip": "172.31.255.255",
	  "approved": true,
	  "likes": 2
	};

	var secondComment = {
	  "author": "test",
	  "url": "/why-cms",
	  "content": "I can approve or reject comments",
	  "email": "test@test.com",
	  "ip": "172.97.114.255",
	  "approved": false,
	  "likes": 0
	};

	var defaultComments = [firstComment, secondComment];

	// Comments.remove({}, function (err, comments) {
	//   if(err) { return handleError(err); }
	//   if(!comments) { return false; }
	// });

	Comments.find(function (err, comments) {
	  if(err) { return handleError(err); }
	  if(comments.length === 0) {
	  	Comments.create(defaultComments, function(err, comments) {
  		  if(err) { return handleError(err); }
  		  console.log('comments initialized');
  		});
	  }
	});

	function handleError(err) {
	  return console.log('Initializing comments error: ', err);
	}
};