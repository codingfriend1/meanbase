'use strict';
(function() {
  /*
    * Controls the routes for the front end of the site
    * Defines a parent route for the front end (compared to /cms/ for backend)
    * All other routes beginning at root and not cms go to main.child and search for a template in the page data
  */

  // Define parent route for front end site. Important! Don't give this route a url
  angular.module('meanbaseApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('main', {
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
        url: '^/*page',
        templateProvider: ['endpoints', '$templateFactory', '$stateParams', '$q', '$state', function(endpoints, $templateFactory, $stateParams, $q, $state) {

          // Instantiate a new endpoints service to communite with server database
          var endpoint = new endpoints('pages');

          // Prepare a promise to return to templateProvider
          var deferred = $q.defer();

          // Find a page with a url that matches the current url
          endpoint.read({url: '/' + $stateParams.page}).success(function(response) {

            // If no page was found then redirect to the 404 page. A hard refresh is necessary so the server will load the page.
            if(!response[0]) { window.location.href = '/404'; return false; }

            // window.siteTheme is set inline on the index.html page and is compiled through the server string manipulation
            var templatePath = 'themes/' + window.siteTheme + '/templates/' + response[0].template + '/' + response[0].template + '.html';

            // Ui Router templateProvider expects an html string instead of a url
            $templateFactory.fromUrl(templatePath).then(function(html) {
              if(!html) { window.location.href = '/404'; return false; }
              deferred.resolve(html);
            });

          }).error(function(error) {
            console.log('Could not request page template: ', error);
            window.location.href = '/404';
          });

          return deferred.promise;
        }]
      });
  });
})();
