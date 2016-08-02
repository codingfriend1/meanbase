module.exports = function() {
	var User = require('../api/user/user.model');

	var userPile = [];
	var basic = {
    provider: 'local',
    role: 'basic',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  };

  var admin = {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  };

  userPile.push(admin);
  userPile.push(basic);

  // In case we need to delete any users
  // User.remove({}, function (err, users) {
  //   if(err) { return handleError(err); }
  //   if(!users) { return false; }
  // });

	User.find(function (err, users) {
	  if(err) { return handleError(err); }
	  if(users.length === 0) {
	  	User.create(userPile, function(err, users) {
  		  if(err) { return handleError(err); }
  		  console.log('users initialized');
  		});
	  }
	});

	function handleError(err) {
	  return console.log('Initializing data error: ', err);
	}
};
