'use strict';
/*
	* This is the highest level template that gets recreated upon each front-end route change.
	* It exists only on the front end.
	* It's within MainCtrl but oversees the individual theme template controllers

*/
(function(){
  angular.module('meanbaseApp').controller('TemplateCtrl', TemplateCtrl);

  TemplateCtrl.$inject = ['$scope'];
  function TemplateCtrl($scope) {
    $scope.page = window.meanbaseGlobals.page;
    console.log('$scope.page', $scope.page);
  }
})();
