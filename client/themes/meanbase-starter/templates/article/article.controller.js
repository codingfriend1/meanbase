'use strict';

angular.module('meanbaseApp')
  .controller('ArticleCtrl', function ($scope, endpoints, $rootScope, $timeout) {
  	var comments = new endpoints('comments/approved');
  	// Everything needs to be wrapped in a timeout
  	$timeout(function() {

  		comments.find({url: $rootScope.page.url}).then(function(response) {
  			$scope.comments = response.data;
  		});

  	});
  });
