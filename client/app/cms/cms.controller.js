'use strict';
angular.module('meanbaseApp').controller('cmsCtrl', function($scope, Auth, $rootScope, endpoints, api, $state) {
	$scope.$parent.pageTitle = 'Manage Site';
	$scope.user = Auth.getCurrentUser();

	var states = $state.get();
	$scope.cmsStates = [];
	for (var i = 0; i < states.length; i++) {
		if(states[i].name.indexOf('cms.') > -1) {
			var state = angular.copy(states[i]);
			if(!$scope.user.permissions || $scope.user.permissions.length === 0) {
				state.userHasPermission = false;
			} else {
				state.userHasPermission = $scope.user.permissions.indexOf(state.hasPermission) > -1;
			}
			state.friendlyName = state.url.replace('/', '');
			$scope.cmsStates.push(state);
		}
		}

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
