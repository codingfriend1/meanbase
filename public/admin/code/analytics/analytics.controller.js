'use strict';

angular.module('meanbaseApp')
  .controller('AnalyticsCtrl', function ($scope, api, toastr) {
    $scope.$parent.pageTitle = 'Site Traffic and Stats';

    api.settings.find({name: 'appID'}).then(function(res) {
      if(!res[0]) { return false; }
      $scope.appID = res[0].value;
    });

    api.settings.find({name: 'clientID'}).then(function(res) {
      if(!res[0]) { return false; }
      $scope.clientID = res[0].value;
    });

    api.settings.find({name: 'verificationID'}).then(function(res) {
      if(!res[0]) { return false; }
      $scope.verificationID = res[0].value;
    });

    api.settings.find({name: 'recaptchaKey'}).then(function(res) {
      if(!res[0]) { return false; }
      $scope.recaptchaKey = res[0].value;
    });

    api.settings.find({name: 'recaptchaClientKey'}).then(function(res) {
      if(!res[0]) { return false; }
      $scope.recaptchaClientKey = res[0].value;
    });

    $scope.changeAppID = function(id) {
      api.settings.update({name: 'appID'}, {value: id}).then(function(response) {
        toastr.success('Set app id to ' + id);
      });
    };

    $scope.changeClientID = function(clientID) {
      api.settings.update({name: 'clientID'}, {value: clientID}).then(function(response) {
        toastr.success('Set app clientID to ' + clientID);
      });
    };

    $scope.changeRecaptcha = function(key) {
      api.settings.update({name: 'recaptchaKey'}, {value: $scope.recaptchaKey}).then(function(response) {
        toastr.success('Set app recaptcha key to ' + $scope.recaptchaKey);
      });
    };

    $scope.changeClientRecaptcha = function() {
      api.settings.update({name: 'recaptchaClientKey'}, {value: $scope.recaptchaClientKey}).then(function(response) {
        toastr.success('Set app recaptcha key to ' + $scope.recaptchaClientKey);
      });
    };

    $scope.changeVerificationID = function(verificationID) {
      api.settings.update({name: 'verificationID'}, {value: verificationID}).then(function(response) {
        toastr.success('Set app verificationID to ' + verificationID);
      });
    };


    $scope.chart = {
      reportType: 'ga',
      query: {
        metrics: 'ga:sessions',
        dimensions: 'ga:date',
        'start-date': '30daysAgo',
        'end-date': 'yesterday',
        ids: 'ga:XXXXXX' // put your viewID here or leave it empty if connected with a viewSelector
      },
      chart: {
        container: 'chart', // id of the created DOM-element
        type: 'LINE',
        options: {
          width: '100%'
        }
      }
    };

    $scope.queries = [{
      query: {
          ids: 'view-selector',  // put your viewID here
          metrics: 'ga:sessions',
          dimensions: 'ga:city'
      }
    }];
  });
