module.exports = function() {
	console.log('creating roles...');
	var Roles = require('../api/roles/roles.model');
	// var populateGlobalRoles = require('../components/roles');

	var basicRoles = [];

	var basic = {
		role: 'basic',
		permissions: {
			editContent: false,
			publishContent: false,
			deleteContent: false,
			manageMedia: false,
			restrictAccess: false,
			manageExtensions: false,
			moderateComments: false,
			manageUsers: false,
			manageRoles: false,
			changeSiteSettings: false,
			importExportData: false,
			deleteSite: false,
			viewAnalytics: false,
			allPrivilages: false
		}
	};

	var level1 = {
		role: 'level 1',
		permissions: {
			editContent: true,
			publishContent: false,
			deleteContent: false,
			manageMedia: false,
			restrictAccess: false,
			manageExtensions: false,
			moderateComments: false,
			manageUsers: false,
			manageRoles: false,
			changeSiteSettings: false,
			importExportData: false,
			deleteSite: false,
			viewAnalytics: false,
			allPrivilages: false
		}
	};

	var level2 = {
		role: 'level 2',
		permissions: {
			editContent: true,
			publishContent: true,
			deleteContent: false,
			manageMedia: true,
			restrictAccess: false,
			manageExtensions: false,
			moderateComments: false,
			manageUsers: false,
			manageRoles: false,
			changeSiteSettings: false,
			importExportData: false,
			deleteSite: false,
			viewAnalytics: false,
			allPrivilages: false
		}
	};

	var level3 = {
		role: 'level 3',
		permissions: {
			editContent: true,
			publishContent: true,
			deleteContent: true,
			manageMedia: true,
			restrictAccess: true,
			manageExtensions: true,
			moderateComments: true,
			manageUsers: false,
			manageRoles: false,
			changeSiteSettings: false,
			importExportData: false,
			deleteSite: false,
			viewAnalytics: false,
			allPrivilages: false
		}
	};

	var level4 = {
		role: 'level 4',
		permissions: {
			editContent: true,
			publishContent: true,
			deleteContent: true,
			manageMedia: true,
			restrictAccess: true,
			manageExtensions: true,
			moderateComments: true,
			manageUsers: true,
			manageRoles: true,
			changeSiteSettings: false,
			importExportData: false,
			deleteSite: false,
			viewAnalytics: true,
			allPrivilages: false
		}
	};

	var level5 = {
		role: 'level 5',
		permissions: {
			editContent: true,
			publishContent: true,
			deleteContent: true,
			manageMedia: true,
			restrictAccess: true,
			manageExtensions: true,
			moderateComments: true,
			manageUsers: true,
			manageRoles: true,
			changeSiteSettings: true,
			importExportData: true,
			deleteSite: false,
			viewAnalytics: true,
			allPrivilages: false
		}
	};

	var admin = {
		role: 'admin',
		permissions: {
			editContent: true,
			publishContent: true,
			deleteContent: true,
			manageMedia: true,
			restrictAccess: true,
			manageExtensions: true,
			moderateComments: true,
			manageUsers: true,
			manageRoles: true,
			changeSiteSettings: true,
			importExportData: true,
			deleteSite: true,
			viewAnalytics: true,
			allPrivilages: true
		}
	};

	basicRoles.push(basic, level1, level2, level3, level4, level5, admin);

	// Roles.remove({}, function(err, roles) {
	//   if(err) { return handleError(err); }
	//   console.log('deleted roles');
	// });

	Roles.find(function (err, roles) {
	  if(err) { return handleError(err); }
	  if(roles.length === 0) {
	  	Roles.create(basicRoles, function(err, roles) {
  		  if(err) { return handleError(err); }
  		  roles = getArguments(arguments);
  		  // populateGlobalRoles(roles);
  		  console.log('roles initialized');
  		});
	  } else {
	  	// populateGlobalRoles(roles);
	  }
	});

	function handleError(err) {
	  return console.log('Initializing data error: ', err);
	}

	function getArguments(args) {
	  // Since mongoose returns created items as list of params we must iterate through them
	  var allFound = [];
	  for (var i = 1; i < args.length; ++i) {
	    allFound.push(args[i]);
	  }
	  return allFound;
	}
};
