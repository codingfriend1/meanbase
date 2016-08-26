'use strict';

angular.module('meanbaseApp')
  .controller('ArticleCtrl', function ($scope, endpoints, $rootScope, $timeout, $http, api, vcRecaptchaService, toastr) {
  	$scope.sucessfulSend = false;

  	// Everything needs to be wrapped in a timeout
  	$timeout(function() {

  		api.approvedComments.find({url: $rootScope.page.url}).then(function(response) {
  			$scope.comments = response.data;
  		});

  	});
  });
