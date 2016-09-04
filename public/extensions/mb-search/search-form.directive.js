'use strict';

// This directive uses the slug passed in to get the appropriate images and display them in a slider

angular.module('extensions')
  .directive('searchForm', function (endpoints, $rootScope, helpers, api) {
    return {
      templateUrl: require('./search-form.html'),
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	scope.searchString = '';
      	scope.search = function() {
      		api.pages.find({ $text: { $search: scope.searchString} }).then(function(response) {
      			scope.results = !_.isEmpty(response)? response: [{url: '', title: 'No results'}];
      		});
      	};
      }
    };
  });
