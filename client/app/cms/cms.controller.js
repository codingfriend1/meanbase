'use strict';
(function(){
	function CMSCtrl($scope, Auth, $rootScope, endpoints) {
		$scope.$parent.pageTitle = 'Manage Site';

		var server = {
			ban: new endpoints('comments/ban')
		};

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
				server.ban.find(identifier).success(function(response) {
					console.log("response", response);
				});
			}
		};

		$scope.isBanned({});
		console.log("$scope.isBanned", $scope.isBanned);


		$scope.ban = function(comment) {
			console.log('comment', comment);
			if(comment && comment.ip && comment.email) {
				server.ban.create({ip: comment.ip, email: comment.email}).success(function(response) {
					console.log("response", response);
				});
			}
		};
  }
	  
	angular.module('meanbaseApp').controller('cmsCtrl', CMSCtrl);
})();
