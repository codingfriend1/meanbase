'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });

// Define the page routes for the front end
// Controller and template will be determined by the page logic
angular.module('meanbaseApp')
.config(function ($stateProvider) {
  $stateProvider
    .state('main.page', {
      url: '^/:page',
      templateUrl: function ($stateParams){
      	$http.get('/api/pages', {params: {url: $stateParams.page}}).success(function(page) {
      		console.log('worked');
      		page.template = 'themes/meanbase-starter/templates/home/home.html';
      		return page.template;
      	}).error(function(error) {
			console.log('/api/pages', error);
			page.template = 'themes/meanbase-starter/templates/home/home.html';
			return page.template;
		});
			// return 'themes/meanbase-starter/templates/home/home.html';
		},
      controller: 'HomeCtrl'
    });
});