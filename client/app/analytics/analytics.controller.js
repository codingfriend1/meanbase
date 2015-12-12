'use strict';

angular.module('meanbaseApp')
  .controller('AnalyticsCtrl', function ($scope, api, toastr) {
    $scope.$parent.pageTitle = 'Site Traffic and Stats';

    api.settings.find({name: 'appID'}).success(function(res) {
      $scope.appID = res[0].value;
    });

    $scope.changeAppID = function(id) {
      if(!id) { return false; }
      api.settings.update({name: 'appID'}, {value: id}).success(function(response) {
        toastr.success('Set app id to ' + id);
      });
    };
  });
