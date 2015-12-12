'use strict';

angular.module('meanbaseApp')
  .controller('AnalyticsCtrl', function ($scope, api, toastr) {
    $scope.$parent.pageTitle = 'Site Traffic and Stats';

    api.settings.find({name: 'appID'}).success(function(res) {
      if(!res[0]) { return false; }
      $scope.appID = res[0].value;
    });

    api.settings.find({name: 'clientID'}).success(function(res) {
      if(!res[0]) { return false; }
      $scope.clientID = res[0].value;
    });

    $scope.changeAppID = function(id) {
      if(!id) { return false; }
      api.settings.update({name: 'appID'}, {value: id}).success(function(response) {
        toastr.success('Set app id to ' + id);
      });
    };

    $scope.changeClientID = function(clientID) {
      if(!clientID) { return false; }
      api.settings.update({name: 'clientID'}, {value: clientID}).success(function(response) {
        toastr.success('Set app clientID to ' + clientID);
      });
    };
  });
