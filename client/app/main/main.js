'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        // templateProvider: ['endpoints', '$stateParams', function(endpoints, $stateParams) {
        //   var endpoint = new endpoints('pages');
        //   return endpoint.read({url: '/' + $stateParams.location()}).success(function(response) {
        //     console.log('response', 'themes/meanbase-starter/templates/' + response[0].template + '/' + response[0].template + '.html');
        //     return 'themes/meanbase-starter/templates/' + response[0].template + '/' + response[0].template + '.html';
        //   });
        // }],
        // templateUrl: function ($stateParams, $http){
        //   $http.get('/api/pages', {params: {url: '/'}}).success(function(page) {
        //     console.log('worked');
        //     page.template = 'themes/meanbase-starter/templates/home/home.html';
        //     return page.template;
        //   }).error(function(error) {
        //     console.log('/api/pages', error);
        //     page.template = 'themes/meanbase-starter/templates/home/home.html';
        //     return page.template;
        //   });
        //   // return 'themes/meanbase-starter/templates/home/home.html';
        // },
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
      templateProvider: ['endpoints', '$templateFactory', '$stateParams', '$q', function(endpoints, $templateFactory, $stateParams, $q) {

        // Instantiate a new endpoints service to communite with server database
        var endpoint = new endpoints('pages');

        // Prepare a promise to return to templateProvider
        var deferred = $q.defer();

        // Find a page with a url that matches the current url
        endpoint.read({url: '/' + $stateParams.page}).success(function(response) {
          var templatePath = 'themes/' + window.siteTheme + '/templates/' + response[0].template + '/' + response[0].template + '.html';
          console.log('templatePath', templatePath);
          $templateFactory.fromUrl(templatePath).then(function(data) {
            deferred.resolve(data);
          });
        }).error(function(error) {
          return $templateFactory.fromUrl('themes/meanbase-starter/templates/home/home.html').then(function(data) {
            deferred.reject(data);
          });
        });
        return deferred.promise;
      }],
  //     templateUrl: function ($stateParams){
  //       console.log('$stateParams.page', $stateParams.page);
  //     	$http.get('/api/pages', {params: {url: $stateParams.page}}).success(function(page) {
  //     		console.log('worked');
  //     		page.template = 'themes/meanbase-starter/templates/home/home.html';
  //     		return page.template;
  //     	}).error(function(error) {
  //   			console.log('/api/pages', error);
  //   			page.template = 'themes/meanbase-starter/templates/home/home.html';
  //   			return page.template;
  //   		});
		// 	// return 'themes/meanbase-starter/templates/home/home.html';
		// },
      // templateUrl: 'themes/meanbase-starter/templates/home/home.html',
      controller: 'HomeCtrl'
    });
});