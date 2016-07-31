'use strict';

angular.module('meanbaseApp')
  .controller('ArchiveCtrl', function ($scope, endpoints, api) {
  	api.publishedPages.find({template: 'article'}).success(function(response) {
  		$scope.posts = response;
  	});
  });
