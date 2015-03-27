'use strict';

angular.module('meanbaseApp')
  .controller('ArticleCtrl', function ($scope) {
    $scope.page = window.meanbaseGlobals.page;
  });
