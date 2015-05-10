'use strict';

angular.module('meanbaseApp')
  .directive('extensionsSelector', function(endpoints, $modal, $rootScope, $timeout) {
    return {
      templateUrl: 'components/extensions-selector/extensions-selector.html',
      restrict: 'A',
      link: function (scope, element, attrs) {
      	var page = new endpoints('page');
      	var modalInstance;
      	scope.openModal = function () {
      	  modalInstance = $modal.open({
            templateUrl: 'extensions.modal.html',
      	    controller: 'extensions.modal.controller',
      	    size: 'md'
      	  });

	      	modalInstance.result.then(function (chosenExtensions) {
	      		if(!$rootScope.page || !$rootScope.page.url || !chosenExtensions || attrs.extensionsSelector < 1) { return false; }
            if(!$rootScope.page.extensions[attrs.extensionsSelector]) {
              $rootScope.page.extensions[attrs.extensionsSelector] = [];
            }
            var extensionsResponse = [];
            for (var i = 0; i < chosenExtensions.length; i++) {
              var extension = {
                group: attrs.extensionsSelector,
                position: $rootScope.page.extensions[attrs.extensionsSelector].length,
                text: chosenExtensions[i].text,
                name: chosenExtensions[i].name,
                config: chosenExtensions[i].config,
                data: chosenExtensions[i].data,
              };
              extensionsResponse.push(extension);
            };

            $rootScope.page.extensions[attrs.extensionsSelector] = extensionsResponse;
	  	    });
      	};

      }
    };
  });