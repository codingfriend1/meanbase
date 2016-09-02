

angular.module('meanbaseApp')
  .controller('ArchiveCtrl', function ($scope, endpoints, api) {
  	api.publishedPages.find({template: 'article'}).then(function(response) {
  		$scope.posts = response;
  	});
  });
