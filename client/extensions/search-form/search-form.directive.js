'use strict';

// This directive uses the slug passed in to get the appropriate images and display them in a slider

angular.module('extensions')
  .directive('searchForm', function (endpoints, $rootScope, helpers) {
    return {
      templateUrl: 'extensions/search-form/search-form.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	var pages = new endpoints('pages/search');
      	scope.searchString = '';
      	scope.search = function() {
      		pages.find({searchText:scope.searchString}).success(function(response) {
      			scope.results = !helpers.isEmpty(response)? response: [{url: '', title: 'No results'}];
      		});
      	};
      }
    };
  });