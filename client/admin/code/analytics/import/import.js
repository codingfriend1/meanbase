'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.import', {
        url: '/import',
        templateUrl: 'app/import/import.html',
        controller: 'ImportCtrl',
        hasPermission: "importExportData",
        icon: 'fa-upload'
      });
  });
