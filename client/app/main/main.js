'use strict';
(function() {
  // ###Controls the routes for the front end of the site
  // - Defines a parent route for the front end (compared to /cms parent for backend)
  // - All other routes beginning at root and not cms go to "main" children and search for a template url from the server

  // ####Parent route for front end site. 
  // - **Important! Don't give this route a url** since we want the ability to have routes without a prefix (/)

  angular.module('extensions', []);

  angular.module('meanbaseApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('main', {
          templateUrl: 'app/main/main.html',
          controller: 'MainCtrl'
        });
    });

  // ####Child Routes
  // - Handles every kind of route that doesn't begin with cms
  // - Contacts the server database to find which view to load
  angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.page', {
        url: '^/{page:(?!cms).*}',
        templateProvider: ['endpoints', '$templateFactory', '$stateParams', '$q', '$state', function(endpoints, $templateFactory, $stateParams, $q, $state) {
          // - Instantiate a new endpoints service to communite with server database
          var endpoint = new endpoints('pages');

          // - Prepare a promise to return to templateProvider
          var deferred = $q.defer();

          // - Find a page in the database with a url that matches the current url
          endpoint.find({url: '/' + $stateParams.page}).success(function(response) {

            // - If no page was found then redirect to a 404 page.
            if(!response[0]) { $state.go('main.missing'); return false; }


            // Loop through the template mapping stored in themeTemplates. 
            // That variable came from the theme's theme.json file. 
            // It finds which template to load based on the template that came back for the page
            // This is done to keep different themes' templates compatible
            var mappedTemplate = response[0].template;
            for (var property in meanbaseGlobals.themeTemplates) {
              if (meanbaseGlobals.themeTemplates.hasOwnProperty(property)) {
                if(meanbaseGlobals.themeTemplates[property].indexOf(response[0].template) > -1) {
                  mappedTemplate = property;
                  break;
                }
              }
            }
            var templatePath = window.meanbaseGlobals.themeTemplatePaths[mappedTemplate];            

            // - Construct a url string from the theme name and template name to pass into $templateFactory
            // - meanbaseGlobals.siteTheme is set inline on the index.html page and is compiled through server string manipulation
            // var templatePath = 'themes/' + meanbaseGlobals.siteTheme + '/templates/' + response[0].template + '/' + response[0].template;

            // - Save the rest of the page data on the meanbaseGlobals object for use in the rest of the app
            meanbaseGlobals.page = response[0];

            // - **The promise must return a html string instead of a url**
            $templateFactory.fromUrl(templatePath).then(function(html) {
              // - If html returned the index page instead of the template html then redirect to 404
              if(html.indexOf('<html') > -1) {  $state.go('main.missing'); return false; }
              // - else resolve with template html
              deferred.resolve(html);
            });

          }).error(function(error) {
            console.log('Could not request page template: ', error);
            $state.go('main.missing');
          });

          return deferred.promise;
        }]
      });
  });
})();
