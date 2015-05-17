'use strict';

angular.module('meanbaseApp')
  .directive('extensiondataSelector', function ($modal, $rootScope) {
    return {
      templateUrl: 'components/extensiondata-selector/extensiondata-selector.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	var modalInstance;
      	scope.openModal = function (extension) {
	    	  modalInstance = $modal.open({
	          templateUrl: 'extensiondata.modal.html',
	    	    controller: 'extensiondata.modal.controller',
	    	    size: 'md',
	    	    resolve: {
	    	    	extension: function() {
	    	    		return extension || false;
	    	    	}
	    	    }
	    	  });

	      	modalInstance.result.then(function (chosenSource) {
	      		if(chosenSource) {
	      			scope.extension.useShared = true;
	      			scope.extension.sharedSource = chosenSource.name;
	      			scope.extension.data = chosenSource.data = $rootScope.extensiondata[chosenSource.name].data;
	      			
	      			if(!scope.extension.data) {
	      				scope.extension.data = {
	      					heading: '',
	      					body: ''
	      				};
	      			}

	      			// chosenSource.data = scope.extension.data = $rootScope.extensiondata[chosenSource.name].data;
	      		} else {
	      			scope.extension.useShared = false;
	      			scope.extension.sharedSource = '';
	      			scope.extension.data = angular.copy(scope.extension.data);
	      		}

	          modalInstance = null;
	  	    });
	      };
      }
    };
  });