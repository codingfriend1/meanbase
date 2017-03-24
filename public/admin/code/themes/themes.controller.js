angular.module('meanbaseApp')
  .controller('ThemesCtrl', function ($scope, endpoints, FileUploader, $cookieStore, $rootScope, toastr, api, $timeout, crud, $http, Auth) {

    $scope.$parent.pageTitle = 'Themes';

    $scope.t = new crud($scope, 'themes', api.themes);

    function findAll() {
      $scope.t.find({}, null, 'Could not get the themes').then(function(response) {
        for (var i = 0; i < $scope.themes.length; i++) {
          if(!$scope.themes[i].preview) {
            $scope.themes[i].preview = 'https://placehold.it/500x300';
          }
        }
      });
    }

    findAll();


    if (Auth.getToken()) {
      var uploader = $scope.uploader = new FileUploader({
          url: '/api/theme-uploads',
          headers: {
            'Authorization': 'Bearer ' + Auth.getToken()
          },
          autoUpload: true
      });

      uploader.onCompleteAll = function(e) {
        uploader.clearQueue();
        findAll();
      };

      uploader.onSuccessItem = function() {
        $rootScope.$emit('cms.themeUploaded');
        toastr.success('Theme successfully uploaded! Refreshing page to compile code.');
        api.themes.find({}).then(function(themes) {
          $scope.themes = themes;
        });
      };

      uploader.onErrorItem = function(item, response, status, headers) {
        console.log("Uploading theme error: ", response);
        toastr.error("Could not upload theme. " + response.message);
      };
    }

    $scope.saveSettings = function(theme, settings) {
      if(theme && theme._id) {
        $scope.t.update(theme, settings, theme.title + ' updated', 'Could not update ' + theme.title).then(function() {
          window.meanbaseGlobals.themeTemplates = theme.templates;
        });
      }

      $scope.t.toggleModal('isSettingsOpen', 'settings');
  	};

    $scope.filterThemes = function(theme) {
      return theme.title.toLowerCase().indexOf($rootScope.searchText.toLowerCase()) >= 0;
    };

    // $scope.deleteTheme = function(theme) {
    //   var message = theme.title + " deleted";
    //   var failure = 'Could not delete ' + theme.title;
    //   $scope.t.delete(theme, message, failure);
    //   $scope.t.toggleModal('isSettingsOpen');
  	// };

    $scope.deleteTheme = function(theme) {
      var message = 'Deleted ' + theme.title + ' theme.';
      var failure = 'Could not delete ' + theme.title;
      api.themes.delete({url: theme.url}, message, failure).then(function(response) {

        for (var i = 0; i < $scope.themes.length; i++) {
          if($scope.themes[i]._id === theme._id) {
            $scope.themes.splice(i, 1);
          }
        }

        toastr.clear(); toastr.success(message);
      }, function(err) {
        toastr.clear(); toastr.warning(message);
      });
      $scope.t.toggleModal('isDeleteOpen', 'themeToDelete');
  	};

    $scope.activateTheme = function(theme) {
      if(!theme.active) {
        api.themes.update({}, {active: false}).then(function(response) {
          api.themes.update({title: theme.title}, {active: true}).then(function() {
            $rootScope.$emit('activated theme', theme);
            for (var i = 0; i < $scope.themes.length; i++) {
              $scope.themes[i].active = false
            }
            theme.active = true;
          }, function(error) {
            console.log('Switching themes error: ', error);
          });
        }, function(err) {
          console.log('promise rejected', err);
        });

      }

    };
  });
