angular.module('meanbaseApp')
  .controller('AnalyticsCtrl', function ($scope, api, toastr) {
    $scope.$parent.pageTitle = 'Site Traffic and Stats';

    var appIdExists = false,
      clientIDExists = false,
      verificationIDExists = false,
      recaptchaKeyExists = false,
      recaptchaClientKeyExists = false;

    var appIDConfig = {
      name: 'appID',
      removeSuccessMessage: 'Removed Analytics App ID',
      doesExist: false,
      saveSuccessMessage: 'Set app id to <id>'
    }

    var clientIDConfig = {
      name: 'clientID',
      removeSuccessMessage: 'Removed Analytics Client ID',
      doesExist: false,
      saveSuccessMessage: 'Set analytics client ID to <id>'
    };

    var serverRecaptchaConfig = {
      name: 'recaptchaKey',
      removeSuccessMessage: 'Removed Analytics Server ID',
      doesExist: false,
      saveSuccessMessage: 'Set server recaptcha key to <id>'
    };

    var clientRecaptchaConfig = {
      name: 'recaptchaClientKey',
      removeSuccessMessage: 'Removed client recaptcha ID',
      doesExist: false,
      saveSuccessMessage: 'Set client recaptcha key to <id>'
    };

    var verificationIDConfig = {
      name: 'verificationID',
      removeSuccessMessage: 'Removed site verification ID',
      doesExist: false,
      saveSuccessMessage: 'Set site verification id to <id>'
    };

    api.settings.find({name: 'appID'}).then(function(res) {
      if(!res[0]) { return false; }
      appIDConfig.doesExist = true;
      $scope.appID = res[0].value;
    });

    api.settings.find({name: 'clientID'}).then(function(res) {
      if(!res[0]) { return false; }
      clientIDConfig.doesExist = true;
      $scope.clientID = res[0].value;
    });

    api.settings.find({name: 'verificationID'}).then(function(res) {
      if(!res[0]) { return false; }
      verificationIDConfig.doesExist = true;
      $scope.verificationID = res[0].value;
    });

    api.settings.find({name: 'recaptchaKey'}).then(function(res) {
      if(!res[0]) { return false; }
      serverRecaptchaConfig.doesExist = true;
      $scope.recaptchaKey = res[0].value;
    });

    api.settings.find({name: 'recaptchaClientKey'}).then(function(res) {
      if(!res[0]) { return false; }
      clientRecaptchaConfig.doesExist = true;
      $scope.recaptchaClientKey = res[0].value;
    });

    function route(options) {
      return function(id) {
        if(!id) {
          api.settings.delete({name: options.name}).then(function(response) {
            toastr.success(options.removeSuccessMessage);
            options.doesExist = false;
          }, function(err) {
            console.log("err", err);
          });
          return false;
        }

        var promise;
        if(!options.doesExist) {
          promise = api.settings.create({name: options.name, value: id});
        } else {
          promise = api.settings.update({name: options.name}, {value: id});
        }

        promise.then(function(response) {
          options.doesExist = true;
          var message = options.saveSuccessMessage.replace('<id>', id);
          toastr.success(message);
        });
      }
    }

    $scope.changeAppID = route(appIDConfig);

    $scope.changeClientID = route(clientIDConfig);

    $scope.changeRecaptcha = route(serverRecaptchaConfig);

    $scope.changeClientRecaptcha = route(clientRecaptchaConfig);

    $scope.changeVerificationID = route(verificationIDConfig);


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
