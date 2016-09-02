angular.module('meanbaseApp')
  .controller('theme.modal.controller', function ($scope, theme, $modalInstance, $http, endpoints, toastr, $rootScope, api) {

    $scope.theme = theme;

    $scope.templates = $scope.theme.templates;


    $scope.ok = function () {
      $modalInstance.close($scope.theme);
    };

    $scope.activateTheme = function() {
      $scope.updateTheme();
      // $modalInstance.close($scope.theme);
      $http.post('api/themes/activate', {id: $scope.theme._id}).then(function(theme) {
        $rootScope.$emit('activated theme', $scope.theme);
        var reload = confirm('Themes changed please reload the page.');
        if(reload) {
          location.reload();
        }
      }, function(error) {
        console.log('Switching themes error: ', error);
      });
    };

    $scope.updateTheme = function() {
      $modalInstance.close($scope.theme);
      if(!$scope.theme._id) { return false; }
      api.themes.update({_id: $scope.theme._id}, $scope.theme).then(function(response) {
        toastr.success('Updated theme.');
        window.meanbaseGlobals.themeTemplates = $scope.theme.templates;
      });
    };

    $scope.deleteTheme = function() {
      if($scope.theme.url) {
        var sure = window.confirm('Are you sure you want to delete this theme?');
        if(sure) {
          api.themes.delete({url: $scope.theme.url}).then(function(response) {
            $rootScope.$emit('deleted theme');
            console.log('response', response);
          });
        }
        $modalInstance.close('deleted');
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
