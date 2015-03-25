'use strict';
(function(){
	angular.module('meanbaseApp').controller('cmsCtrl', CMSCtrl);

	CMSCtrl.$inject = ['$scope', 'Auth'];
	function CMSCtrl($scope, Auth) {
		$scope.user = Auth.getCurrentUser();
  }
})();
