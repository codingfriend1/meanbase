module.exports = function() {
	console.log('creating roles...');
	var Roles = require('../api/roles/roles.model');

	var basicRoles = [];

	var basic = {
		role: 'Basic',
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
			allPrivilages: false
		}
	};

	var level1 = {
		role: 'Level 1',
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
			allPrivilages: false
		}
	};

	var level2 = {
		role: 'Level 2',
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
			allPrivilages: false
		}
	};

	var level3 = {
		role: 'Level 3',
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
			allPrivilages: false
		}
	};

	var level4 = {
		role: 'Level 4',
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
			allPrivilages: false
		}
	};

	var level5 = {
		role: 'Level 5',
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
			allPrivilages: false
		}
	};

	var master = {
		role: 'Master',
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
			allPrivilages: true
		}
	};

	basicRoles.push(basic, level1, level2, level3, level4, level5, master);

	Roles.find(function (err, roles) {
	  if(err) { return handleError(err); }
	  if(roles.length === 0) {
	  	Roles.create(basicRoles, function(err, roles) {
  		  if(err) { return handleError(err); }
  		  console.log('initialize roles: ', roles);
  		});
	  }
	});

	function handleError(err) {
	  return console.log('Initializing data error: ', err);
	}
};