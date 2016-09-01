'use strict';

angular.module('meanbaseApp')
  .directive('listSelector', function(endpoints, $modal, $rootScope, $timeout) {
    return {
      templateUrl: require('./list-selector.jade'),
      restrict: 'A',
      link: function (scope, element, attrs) {
      	var modalInstance;
      	scope.openModal = function () {
      	  modalInstance = $modal.open({
            templateUrl: require('./list.modal.jade'),
      	    controller: 'list.modal.controller',
      	    size: 'md',
            resolve: {
              group: function() {
                return attrs.listSelector
              }
            }
      	  });

	      	modalInstance.result.then(function (chosenExtension) {
	      		if(!$rootScope.page || !$rootScope.page.url || !chosenExtension || attrs.listSelector < 1) { return false; }
            if(!$rootScope.page.lists[attrs.listSelector]) {
              $rootScope.page.lists[attrs.listSelector] = [];
            }
            var listResponse = [];
            var listItem = {
              group: attrs.listSelector,
              position: ($rootScope.page.lists[attrs.listSelector].length - 1 < 0)? 0: $rootScope.page.lists[attrs.listSelector].length - 1,
              label: chosenExtension.label,
              key: chosenExtension.key,
              html: chosenExtension.html,
              data: chosenExtension.data || {
                items: []
              }
            };
            listResponse.push(listItem);

            $rootScope.page.lists[attrs.listSelector] = $rootScope.page.lists[attrs.listSelector].concat(listResponse);

            modalInstance = null;
	  	    });
      	};

      }
    };
  });
