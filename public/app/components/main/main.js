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
        templateProvider: ['endpoints', '$templateFactory', '$stateParams', '$q', '$state', '$rootScope', 'Auth', 'api', '$templateCache', 'toastr', async function(endpoints, $templateFactory, $stateParams, $q, $state, $rootScope, Auth, api, $templateCache, toastr) {

          try {
            $rootScope.isLoggedIn = await Auth.isLoggedInAsync();
            // $rootScope.currentUser = Auth.getCurrentUser();


            let matchingPages = await api.pages.find({url: '/' + $stateParams.page})

            let stagingData
            try {
              let hasPermission = await Auth.hasPermission('editContent')
              if(hasPermission) {
                try {
                  stagingData = await api.staging.find({key: '/' + $stateParams.page})
                  stagingData = stagingData[0]
                } catch(err) {
                  console.log('Trouble getting staging data', err);
                }
              }
            } catch(err) {
              console.log('User does not have edit permission', err);
            }

            if(!matchingPages[0]) {
              throw 'Sorry but we could not find a page with that url'
            }

            $rootScope.page = matchingPages[0]


            // Loop through the template mapping stored in themeTemplates.
            // That variable came from the theme's theme.json file.
            // It finds which template to load based on the template that came back for the page
            // This is done to keep different themes' templates compatible
            var mappedTemplate
            if(stagingData && stagingData.data && stagingData.data.template) {
              mappedTemplate = stagingData.data.template
            } else {
              mappedTemplate = $rootScope.page.template;
            }

            for (var property in meanbaseGlobals.themeTemplates) {
              if (meanbaseGlobals.themeTemplates.hasOwnProperty(property)) {
                if(meanbaseGlobals.themeTemplates[property].indexOf(mappedTemplate) > -1) {
                  mappedTemplate = property;
                  break;
                }
              }
            }
            // - Construct a url string from the theme name and template name to pass into $templateFactory
            if(!window.meanbaseGlobals.themeTemplatePaths[mappedTemplate]) {
              throw `Could not find template: ${$rootScope.page.template}, try adding it to your theme template mapping`
            }

            var templatePath = window.meanbaseGlobals.themeTemplatePaths[mappedTemplate].template;

            if(!templatePath) {
              throw `Hmmm the ${$rootScope.page.template} template is missing, make sure to add it to your theme's template mapping`
            }

            // - Save the rest of the page data on the meanbaseGlobals object for use in the rest of the app
            if($rootScope.page.tabTitle) {
              document.title = $rootScope.page.tabTitle;
            }

            if($rootScope.page.description) {
              jQuery('meta[name=description]').attr('content', $rootScope.page.description);
            }

            var html = $templateCache.get(templatePath);
            if(html) {
              return html;
            } else {
              throw 'The html for this page does not exist.'
            }

          } catch(err) {
            console.log('Error loading template', err);
            console.log("err", err);
            toastr.error(err);
            $rootScope.page = {
              tabTitle: 404,
              description: 'Could not find page',
              extensions: {},
              content: {},
              url: 'missing'
            };
            // - If no page was found then redirect to a 404 page.
            $state.go('main.missing');
          }
        }]
      });
  });
})();
