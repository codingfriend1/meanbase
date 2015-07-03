'use strict';

angular.module('meanbaseApp')
  .controller('ArchiveCtrl', function ($scope, endpoints) {
  	var posts = new endpoints('pages/published');

  	posts.find({template: 'article'}).success(function(response) {
  		$scope.posts = response;
  	});
  });
