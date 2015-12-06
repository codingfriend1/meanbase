'use strict';

angular.module('meanbaseApp')
  .controller('ArchiveCtrl', function ($scope, endpoints, apiconfig) {
  	apiconfig.publishedPages.find({template: 'article'}).success(function(response) {
  		$scope.posts = response;
  	});
  });
