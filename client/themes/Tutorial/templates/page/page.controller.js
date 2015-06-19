angular.module('meanbaseApp')
  .controller('pageTemplateCtrl', function ($scope, endpoints, $rootScope, $timeout) {
  	var commentsApproved = new endpoints('comments/approved');
    var comments = new endpoints('comments');
  	// Everything needs to be wrapped in a timeout
  	$timeout(function() {

  	});
  });