'use strict';
(function(){
	function CMSCtrl($scope, Auth, $rootScope) {
		$scope.$parent.pageTitle = 'Manage Site';

		$scope.user = Auth.getCurrentUser();

		$scope.toggleMenu = function() {
			$scope.menuOpen = !$scope.menuOpen;
		};

		$scope.pageTitle = 'Site Preferences';

		if($scope.$parent.pageTitle) {
		  document.title = $scope.$parent.pageTitle;
		}
  }
	  
	angular.module('meanbaseApp').controller('cmsCtrl', CMSCtrl);
})();
