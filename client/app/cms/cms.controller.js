'use strict';
(function(){
	angular.module('meanbaseApp').controller('cmsCtrl', CMSCtrl);

	function CMSCtrl($scope, Auth, $rootScope) {
		$scope.$parent.pageTitle = 'Manage Site';

		$scope.user = Auth.getCurrentUser();

		$scope.toggleMenu = function() {
			$scope.menuOpen = !$scope.menuOpen;
		};

		$scope.pageTitle = 'Site Preferences';
  }
})();
