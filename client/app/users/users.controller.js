'use strict';
(function(){
	angular.module('meanbaseApp').controller('UsersCtrl', UsersCtrl);

	UsersCtrl.$inject = ['$scope', 'endpoints'];
	function UsersCtrl($scope, endpoints) {
	  var self = this;
	  var endpoints = {
	  	roles: new endpoints('roles'),
	  	users: new endpoints('users')
	  };

	  endpoints.roles.find({}).success(function(roles) {
	  	$scope.roles = roles
	  	$scope.selectedRole = $scope.roles[0];
	  	// $scope.selectedRole.permissions['allPrivilages'] = null;
	  	console.log('$scope.selectedRole', $scope.selectedRole);
	  });

	  endpoints.users.find({}).success(function(users) {
	  	$scope.users = users
	  });
	}
})();
