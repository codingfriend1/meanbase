GLOBAL.meanbaseGlobals.roles = {};
var Roles = require('../../api/roles/roles.model');

// Get All items
module.exports = function getAllRoles(roles, callback) {
	if(roles) {
		populateGlobalRoles(roles);
		if(callback) callback();
		return roles;
	} else {
		Roles.find(function (err, found) {
		  if(err || !found) { return false; }
		  populateGlobalRoles(found);
		  if(callback) callback();
		  return found;
		});
	}
};

function populateGlobalRoles(roles) {
	if(typeof roles != 'object') return false;
	GLOBAL.meanbaseGlobals.roles = {}; //Clean up old values

	// Iterate through roles
	for(var i = 0; i < roles.length; i++) {
		GLOBAL.meanbaseGlobals.roles[roles[i].role] = [];

		// Iterate through permissions in each role
		for(var permission in roles[i].permissions) {
			if (roles[i].permissions.hasOwnProperty(permission)) {

				// If permission is set to true then add it to the Global.meanbaseGlobal.roles object
				if(roles[i].permissions[permission] == true) {
					GLOBAL.meanbaseGlobals.roles[roles[i].role].push(permission);
				}
	    }
		} //Iterate through permissions in each role
	} //Iterate through roles
	// console.log('GLOBAL.meanbaseGlobals.roles', GLOBAL.meanbaseGlobals.roles);
} //populateGlobalRoles()