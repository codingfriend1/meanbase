angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.import', {
        url: '/import',
        templateUrl: require('./import.jade'),
        controller: 'ImportCtrl',
        hasPermission: "importExportData",
        icon: 'file_download'
      });
  });
