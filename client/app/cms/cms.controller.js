'use strict';
(function(){
	function CMSCtrl($scope, Auth, $rootScope, endpoints, apiconfig) {
		$scope.$parent.pageTitle = 'Manage Site';

		$scope.user = Auth.getCurrentUser();

		$scope.toggleMenu = function() {
			$scope.menuOpen = !$scope.menuOpen;
		};

		$scope.pageTitle = 'Site Preferences';

		if($scope.$parent.pageTitle) {
		  document.title = $scope.$parent.pageTitle;
		}

		$scope.isBanned = function(identifier) {
			if(typeof identifier === 'object' || identifier) {
				apiconfig.bannedMembers.find(identifier).success(function(response) {
					console.log("response", response);
				});
			}
		};

		$scope.isBanned({});
		console.log("$scope.isBanned", $scope.isBanned);


		$scope.ban = function(comment) {
			console.log('comment', comment);
			if(comment && comment.ip && comment.email) {
				apiconfig.bannedMembers.create({ip: comment.ip, email: comment.email}).success(function(response) {
					console.log("response", response);
				});
			}
		};
  }

	angular.module('meanbaseApp').controller('cmsCtrl', CMSCtrl);
})();
