'use strict';
(function(){
	angular.module('meanbaseApp').controller('cmsCtrl', CMSCtrl);

	CMSCtrl.$inject = ['$scope', 'Auth'];
	function CMSCtrl($scope, Auth) {
		$scope.$parent.pageTitle = 'Manage Site';

		$scope.user = Auth.getCurrentUser();

		$scope.toggleMenu = function() {
			$scope.menuOpen = !$scope.menuOpen;
		};


		$scope.pageTitle = 'Site Preferences';
  }
})();
