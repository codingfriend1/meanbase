'use strict';
(function(){
	angular.module('meanbaseApp').controller('UsersCtrl', UsersCtrl);

	UsersCtrl.$inject = ['$scope', 'endpoints'];
	function UsersCtrl($scope, endpoints) {

		$scope.$parent.pageTitle = "Users and Permissions";

	  var server = {
	  	roles: new endpoints('roles'),
	  	users: new endpoints('users')
	  };

	  // Get all roles and their permissions and set the roles panel selected role to the first one
	  server.roles.find({}).success(function(roles) {
	  	$scope.roles = roles;
	  	$scope.selectedRole = $scope.roles[0];
	  });

	  // Get all users
	  server.users.find({}).success(function(users) {
	  	$scope.users = users;
	  });

	  // Create a new role
	  $scope.createRole = function() {
	  	var pass = true;
	  	var roleName = prompt('Role Name?');
	  	if(!roleName || !$scope.selectedRole) { return false; }
	  	for(var i = 0; i < $scope.roles.length; i++) {
	  		if($scope.roles[i].role === roleName) { console.log('That role already exists just modify it.'); pass = false; return false; }
	  	}
	  	if(!pass) { return false; } 

	  	var newRole = {role: roleName, permissions: $scope.selectedRole.permissions};

  		server.roles.create(newRole).success(function(response) {
  			$scope.roles.push({role: roleName, permissions: $scope.selectedRole.permissions});
  			$scope.selectedRole = newRole;
  		});
	  };

	  // Update a role
	  $scope.updateRole = function(roleForm) {
	  	if(!$scope.selectedRole || $scope.selectedRole.role === 'admin') { return false; }
  		server.roles.update({_id: $scope.selectedRole._id}, {permissions: $scope.selectedRole.permissions}).then(function(response) {
  			console.log(response);
  		});
	  };

	  // Delete a role and move the users of that role to 'basic'
	  $scope.deleteRole = function() {
	  	var confirmed = confirm('Are you sure you want to delete this role? All users currently using this role will be switched to basic.');
	  	if(!confirmed) return false;
	  	if(!$scope.selectedRole || $scope.selectedRole.role === 'basic' || $scope.selectedRole.role === 'admin') { return false; }

  		server.users.update({role: $scope.selectedRole.role}, {role: 'basic'}).then(function(response) {
  			console.log('Moved users with ' + $scope.selectedRole.role + ' over to basic');
  		}).finally(function(response) {
  			server.roles.delete({_id: $scope.selectedRole._id}).then(function(response) {
  				$scope.roles.splice($scope.roles.indexOf($scope.selectedRole), 1);
  				$scope.selectedRole = $scope.roles[0];
				});
  		});
	  };

	  // Update a user
	  $scope.updateUser = function(user) {
	  	var newInfo = {};
	  	angular.copy(user, newInfo);
	  	if(!user) return false;
	  	server.users.update({_id: user._id}, newInfo).then(function(response) {
	  		console.log(response);
	  	});
	  };

	  // Delete a user
	  $scope.deleteUser = function(user, index) {
	  	if(!user) return false;
	  	server.users.deleteOne(user._id).then(function(response) {
	  		$scope.users.splice(index, 1);
	  	});
	  };

	  $scope.userFilter = '';
	  $scope.filterUsers = function(user) {
	  	return (user.name + user.email + user.role + user.lastVisited).toLowerCase().indexOf($scope.userFilter.toLowerCase()) >= 0;
	  };
	}
})();
