'use strict';
angular.module('meanbaseApp').controller('cmsCtrl', function($scope, Auth, $rootScope, endpoints, api, $state) {

	var states = $state.get();
	$scope.cmsStates = [];
	$scope.$parent.pageTitle = 'Manage Site';
	Auth.isLoggedInAsync(function(status) {
	 $rootScope.isLoggedIn = status;
	 $rootScope.currentUser = Auth.getCurrentUser();

	 for (var i = 0; i < states.length; i++) {
 		if(states[i].name.indexOf('cms.') > -1) {
 			var state = angular.copy(states[i]);
 			if(!$rootScope.currentUser.permissions || $rootScope.currentUser.permissions.length === 0) {
 				state.userHasPermission = false;
 			} else {
 				state.userHasPermission = $rootScope.currentUser.permissions.indexOf(state.hasPermission) > -1;
 			}
 			state.friendlyName = state.url.replace('/', '');
 			$scope.cmsStates.push(state);
 		}
 	}

 });
	$rootScope.currentUser = Auth.getCurrentUser();
	console.log("$rootScope.currentUser.permissions", $rootScope.currentUser.permissions);

	$scope.toggleMenu = function() {
		$scope.menuOpen = !$scope.menuOpen;
	};

	$scope.pageTitle = 'Site Preferences';

	if($scope.$parent.pageTitle) {
	  document.title = $scope.$parent.pageTitle;
	}

	$scope.isBanned = function(identifier) {
		if(typeof identifier === 'object' || identifier) {
			api.bannedMembers.find(identifier).success(function(response) {
				console.log("response", response);
			});
		}
	};

	$scope.isBanned({});
	console.log("$scope.isBanned", $scope.isBanned);


	$scope.ban = function(comment) {
		console.log('comment', comment);
		if(comment && comment.ip && comment.email) {
			api.bannedMembers.create({ip: comment.ip, email: comment.email}).success(function(response) {
				console.log("response", response);
			});
		}
	};
});
