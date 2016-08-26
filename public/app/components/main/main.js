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
          templateUrl: require('./main.jade'),
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
        url: '^/{page:(?!cms|login|signup|settings).*}',
        templateProvider: ['endpoints', '$templateFactory', '$stateParams', '$q', '$state', '$rootScope', 'Auth', 'api', '$templateCache', function(endpoints, $templateFactory, $stateParams, $q, $state, $rootScope, Auth, api, $templateCache) {
          // - Prepare a promise to return to templateProvider
          var deferred = $q.defer();
          // Let's check if the user is logged in
           Auth.isLoggedInAsync(function(status) {
            $rootScope.isLoggedIn = status;

            // Get the current logged in user
            $rootScope.currentUser = Auth.getCurrentUser();

            var pages = api.publishedPages;
            // - Instantiate a new endpoints service to communite with server database
            if($rootScope.currentUser && $rootScope.currentUser.permissions && $rootScope.currentUser.permissions.indexOf('editContent') > -1) {
              pages = api.pages;
            }

            // - Find a page in the database with a url that matches the current url
            pages.find({url: '/' + $stateParams.page}).then(function(response) {
              $rootScope.page = {
                tabTitle: 404,
                description: 'Could not find page',
                extensions: {},
                content: {},
                url: 'missing'
              };
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
              // - Construct a url string from the theme name and template name to pass into $templateFactory
              if(!window.meanbaseGlobals.themeTemplatePaths[mappedTemplate]) {
                console.log('Could not find page template: ');
                return $state.go('main.missing');
              }

              var templatePath = window.meanbaseGlobals.themeTemplatePaths[mappedTemplate].template;

              if(!templatePath) {
                console.log('Could not find page template: ', templatePath);
                return $state.go('main.missing');
              }

              // - Save the rest of the page data on the meanbaseGlobals object for use in the rest of the app
              // meanbaseGlobals.page =
              $rootScope.page = response[0];
              if($rootScope.page.tabTitle) {
                document.title = $rootScope.page.tabTitle;
              }

              if($rootScope.page.description) {
                jQuery('meta[name=description]').attr('content', $rootScope.page.description);
              }

              var html = $templateCache.get(templatePath);
              if(html) {
                deferred.resolve(html);
              } else {
                $state.go('main.missing');
              }


            }).catch(function(error) {
              console.log('Could not request page template: ', error);
              $state.go('main.missing');
            });

          });

          return deferred.promise;
        }]
      });
  });
})();
